"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, MapControls, Sparkles } from "@react-three/drei";
import type { MapControls as MapControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { BOUNDS, REGIONS, project, unproject } from "@/lib/map/geo";
import type { MapMarker } from "@/lib/map/types";
import {
    buildPatchGeometry,
    buildTerrainGeometry,
    createBorderWall,
    createTerrainMaterial,
    createTerrainUniforms,
    drapedOutline,
    heightAtXZ,
    loadElevation,
    stateMaskTexture,
    type TerrainUniforms,
} from "./terrain";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type SceneCommand =
    | { type: "reset"; nonce: number }
    | { type: "north"; nonce: number }
    | { type: "zoom"; factor: number; nonce: number }
    | { type: "level"; level: 1 | 2 | 3 | 4; nonce: number }
    | { type: "fly"; lat: number; lng: number; distance: number; nonce: number };

export type ZoomLevel = 1 | 2 | 3 | 4;

export interface CameraInfo {
    heading: number;
    level: ZoomLevel;
    distance: number;
    lat: number;
    lng: number;
}

export interface ClusterInfo {
    /** Anchor marker id (highest priority member). */
    id: string;
    memberIds: string[];
}

/** DOM elements in the HUD overlay that the scene positions every frame. */
export interface OverlayStore {
    els: Map<string, HTMLElement>;
    regionEls: (HTMLElement | null)[];
}

export interface SceneProps {
    markers: MapMarker[];
    selectedId: string | null;
    language: "en" | "hi";
    command: SceneCommand | null;
    quality: "high" | "low";
    reducedMotion: boolean;
    /** Where the preview panel sits, so a selected marker is framed beside it. */
    panelSide: "right" | "bottom";
    onSelect: (id: string | null) => void;
    overlay: OverlayStore;
    onClusters: (c: ClusterInfo[]) => void;
    onCamera: (info: CameraInfo) => void;
    onReady: () => void;
}

// ---------------------------------------------------------------------------
// Look
// ---------------------------------------------------------------------------

/** Background / far haze. Terrain edges and fog dissolve into it. */
const HAZE = "#121823";

// ---------------------------------------------------------------------------
// Camera
// ---------------------------------------------------------------------------

const MIN_DIST = 3;
const MAX_DIST = 240;
const LEVEL_DIST: Record<ZoomLevel, number> = { 1: 0, 2: 40, 3: 16, 4: 6 };

export function levelFor(distance: number): ZoomLevel {
    if (distance > 62) return 1;
    if (distance > 26) return 2;
    if (distance > 10) return 3;
    return 4;
}

/**
 * Game-style auto tilt: near top-down when zoomed out (a readable map),
 * leaning toward the horizon as you zoom in (a world you're inside).
 */
export function polarFor(distance: number): number {
    const t = THREE.MathUtils.smoothstep(distance, 5, 120);
    return THREE.MathUtils.lerp(1.13, 0.42, t);
}

const CENTER = new THREE.Vector3((BOUNDS.minX + BOUNDS.maxX) / 2, 0, (BOUNDS.minZ + BOUNDS.maxZ) / 2 + 3);

function overviewDistance(aspect: number, fovDeg: number) {
    const half = Math.tan(THREE.MathUtils.degToRad(fovDeg / 2));
    const fitWidth = 44 / (half * Math.max(aspect, 0.3));
    const fitHeight = 50 / half;
    const portrait = aspect < 0.8;
    return THREE.MathUtils.clamp(Math.max(fitWidth * (portrait ? 0.8 : 0.82), fitHeight * 0.7), 60, 235);
}

interface FlyOptions {
    azimuth?: number;
    duration?: number;
    /** Lift the camera mid-flight so long hops feel like a glide. */
    arc?: boolean;
    /** Shift framing so the point sits beside a panel: [right, toward-camera] × distance. */
    offset?: [number, number];
}

interface RigApi {
    flyTo: (target: THREE.Vector3, distance: number, opts?: FlyOptions) => void;
    distance: () => number;
}

interface FlyAnim {
    fromT: THREE.Vector3;
    toT: THREE.Vector3;
    fromR: number;
    toR: number;
    fromTheta: number;
    toTheta: number;
    lift: number;
    start: number;
    dur: number;
}

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function CameraRig({
    rig,
    command,
    reducedMotion,
    focus,
    onCamera,
}: {
    rig: RefObject<RigApi | null>;
    command: SceneCommand | null;
    reducedMotion: boolean;
    /** Selected marker: zooming scales around it, so it stays where it is on screen. */
    focus: THREE.Vector3 | null;
    onCamera: (info: CameraInfo) => void;
}) {
    const controls = useRef<MapControlsImpl>(null);
    const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
    const size = useThree((s) => s.size);
    const scene = useThree((s) => s.scene);
    const anim = useRef<FlyAnim | null>(null);
    const lastReport = useRef({ t: 0, key: "" });
    const tmp = useMemo(() => ({ v: new THREE.Vector3(), s: new THREE.Spherical() }), []);

    const overview = () => ({ target: CENTER.clone(), distance: overviewDistance(size.width / size.height, camera.fov) });

    const place = (target: THREE.Vector3, r: number, theta: number) => {
        tmp.s.set(r, polarFor(r), theta);
        camera.position.copy(target).add(tmp.v.setFromSpherical(tmp.s));
        camera.lookAt(target);
    };

    const api: RigApi = {
        distance: () => (controls.current ? camera.position.distanceTo(controls.current.target) : 100),
        flyTo: (target, distance, opts = {}) => {
            const c = controls.current;
            if (!c) return;
            const from = new THREE.Spherical().setFromVector3(tmp.v.copy(camera.position).sub(c.target));
            let theta = opts.azimuth ?? from.theta;
            while (theta - from.theta > Math.PI) theta -= Math.PI * 2;
            while (theta - from.theta < -Math.PI) theta += Math.PI * 2;
            const toR = THREE.MathUtils.clamp(distance, MIN_DIST, MAX_DIST);

            const toT = target.clone();
            if (opts.offset) {
                const right = new THREE.Vector3(Math.cos(theta), 0, -Math.sin(theta));
                const back = new THREE.Vector3(Math.sin(theta), 0, Math.cos(theta));
                toT.addScaledVector(right, opts.offset[0] * toR).addScaledVector(back, opts.offset[1] * toR);
            }

            const travel = c.target.distanceTo(toT);
            const radial = Math.abs(from.radius - toR);
            // Already framed: don't animate for nothing
            if (travel < 0.3 && radial < 0.5 && Math.abs(from.theta - theta) < 0.03) return;

            const dur = reducedMotion ? 0 : opts.duration ?? THREE.MathUtils.clamp(0.9 + travel / 30 + radial / 120, 1, 2.5);
            if (dur === 0) {
                c.target.copy(toT);
                place(toT, toR, theta);
                c.update();
                return;
            }
            anim.current = {
                fromT: c.target.clone(),
                toT,
                fromR: from.radius,
                toR,
                fromTheta: from.theta,
                toTheta: theta,
                lift: opts.arc && travel > 8 ? Math.min(travel * 0.6, 45) : 0,
                start: performance.now(),
                dur: dur * 1000,
            };
        },
    };
    rig.current = api;

    // Intro: drop in from high above with a slow swing, then settle on the overview
    useEffect(() => {
        const c = controls.current;
        if (!c) return;
        const o = overview();
        c.target.copy(o.target);
        if (reducedMotion) {
            place(o.target, o.distance, 0);
        } else {
            place(o.target, Math.min(o.distance * 2.1, MAX_DIST), -1.0);
            api.flyTo(o.target, o.distance, { azimuth: 0, duration: 3.6 });
        }
        c.update();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // User input interrupts any flight
    useEffect(() => {
        const c = controls.current;
        if (!c) return;
        const stop = () => {
            anim.current = null;
        };
        c.addEventListener("start", stop);
        return () => c.removeEventListener("start", stop);
    }, []);

    // HUD commands
    useEffect(() => {
        if (!command || !controls.current) return;
        const c = controls.current;
        const cur = new THREE.Spherical().setFromVector3(tmp.v.copy(camera.position).sub(c.target));
        const zoomTo = (r: number, duration: number) => {
            const toR = THREE.MathUtils.clamp(r, MIN_DIST, MAX_DIST);
            const t = focus ? focus.clone().lerp(c.target, toR / cur.radius) : c.target;
            api.flyTo(t, toR, { duration });
        };
        switch (command.type) {
            case "reset": {
                const o = overview();
                api.flyTo(o.target, o.distance, { azimuth: 0, arc: true });
                break;
            }
            case "north":
                api.flyTo(c.target, cur.radius, { azimuth: 0, duration: 0.8 });
                break;
            case "zoom":
                zoomTo(cur.radius * command.factor, 0.6);
                break;
            case "level": {
                if (command.level === 1) {
                    const o = overview();
                    api.flyTo(o.target, o.distance, { arc: true });
                } else {
                    zoomTo(LEVEL_DIST[command.level], 1.1);
                }
                break;
            }
            case "fly": {
                const [x, z] = project(command.lng, command.lat);
                api.flyTo(new THREE.Vector3(x, heightAtXZ(x, z), z), command.distance, { arc: true });
                break;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [command?.nonce]);

    useFrame(() => {
        const c = controls.current;
        if (!c) return;
        const a = anim.current;
        if (a) {
            const t = Math.min(1, (performance.now() - a.start) / a.dur);
            const e = easeInOutCubic(t);
            c.target.lerpVectors(a.fromT, a.toT, e);
            const r = THREE.MathUtils.lerp(a.fromR, a.toR, e) + Math.sin(Math.PI * e) * a.lift;
            place(c.target, r, THREE.MathUtils.lerp(a.fromTheta, a.toTheta, e));
            if (t >= 1) anim.current = null;
        }

        const distance = camera.position.distanceTo(c.target);
        // Tilt follows zoom; the user only rotates around (azimuth)
        const polar = polarFor(distance);
        c.minPolarAngle = polar;
        c.maxPolarAngle = polar;

        // Keep the map in reach: clamp the orbit target to the state's bounds
        const pad = 6;
        const cx = THREE.MathUtils.clamp(c.target.x, BOUNDS.minX - pad, BOUNDS.maxX + pad);
        const cz = THREE.MathUtils.clamp(c.target.z, BOUNDS.minZ - pad, BOUNDS.maxZ + pad);
        if (cx !== c.target.x || cz !== c.target.z) {
            camera.position.x += cx - c.target.x;
            camera.position.z += cz - c.target.z;
            c.target.x = cx;
            c.target.z = cz;
        }

        // Atmospheric perspective that scales with zoom
        const fog = scene.fog as THREE.Fog | null;
        if (fog) {
            fog.near = distance * 1.15;
            fog.far = distance * 3.6 + 20;
        }

        // Report to the HUD at ~10 Hz, only when something visible changed
        const now = performance.now();
        if (now - lastReport.current.t < 100) return;
        const dir = tmp.v.copy(c.target).sub(camera.position);
        let heading = THREE.MathUtils.radToDeg(Math.atan2(dir.x, -dir.z));
        if (heading < 0) heading += 360;
        const [lng, lat] = unproject(c.target.x, c.target.z);
        const key = `${Math.round(heading)}|${distance.toFixed(1)}|${lat.toFixed(2)}|${lng.toFixed(2)}`;
        if (key === lastReport.current.key) return;
        lastReport.current = { t: now, key };
        onCamera({ heading, level: levelFor(distance), distance, lat, lng });
    });

    return (
        <MapControls
            ref={controls}
            makeDefault
            enableDamping
            dampingFactor={0.09}
            screenSpacePanning={false}
            minDistance={MIN_DIST}
            maxDistance={MAX_DIST}
            zoomSpeed={1}
            rotateSpeed={0.5}
            panSpeed={1}
        />
    );
}

// ---------------------------------------------------------------------------
// World
// ---------------------------------------------------------------------------

function Terrain({ map, step, uniformsRef }: { map: THREE.Texture; step: number; uniformsRef: RefObject<TerrainUniforms | null> }) {
    const geo = useMemo(() => buildTerrainGeometry(step), [step]);
    const uniforms = useMemo(() => createTerrainUniforms(stateMaskTexture(), HAZE), []);
    const material = useMemo(() => createTerrainMaterial(map, uniforms), [map, uniforms]);
    uniformsRef.current = uniforms;
    useEffect(
        () => () => {
            geo.dispose();
            material.dispose();
        },
        [geo, material]
    );
    return <mesh geometry={geo} material={material} castShadow receiveShadow />;
}

const wallMaterial = () =>
    new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color("#E9B865") }, uOpacity: { value: 0.22 } },
        vertexShader: `attribute float alpha; varying float vA;
            void main() { vA = alpha; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `uniform vec3 uColor; uniform float uOpacity; varying float vA;
            void main() { gl_FragColor = vec4(uColor, vA * vA * uOpacity); }`,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
    });

/** The state border: a crisp gold line, a soft glow, and a low "zone wall" like a game's play area. */
function Border() {
    const points = useMemo(() => drapedOutline(), []);
    const wall = useMemo(() => createBorderWall(points, 0.32), [points]);
    const mat = useMemo(wallMaterial, []);
    return (
        <group>
            <mesh geometry={wall} material={mat} renderOrder={2} />
            <Line points={points} color="#F2C46D" lineWidth={6} transparent opacity={0.12} depthWrite={false} />
            <Line points={points} color="#F2C46D" lineWidth={1.8} transparent opacity={0.95} />
        </group>
    );
}

// ---------------------------------------------------------------------------
// HD imagery: Sentinel-2 tiles (public/map/tiles, scripts/build-map-tiles.mjs) streamed in around the
// camera as you zoom, drawn over the overview imagery and faded in.
// ---------------------------------------------------------------------------

interface TileManifest {
    west: number;
    north: number;
    step: number;
    size: number;
    tiles: string[];
}

interface LiveTile {
    mesh: THREE.Mesh;
    material: THREE.MeshStandardMaterial;
    texture: THREE.Texture;
    born: number;
}

/** One level of HD imagery: shown fully below `near` camera distance, faded out by `far`. */
interface HDLevel {
    dir: string;
    near: number;
    far: number;
    /** Load radius in degrees for a camera distance. */
    radius: (d: number) => number;
    /** Drawn above lower levels. */
    order: number;
}

const HD_LEVELS: HDLevel[] = [
    // 0.5° tiles (~54 m/px) for the whole state
    { dir: "/map/tiles", near: 16, far: 34, radius: (d) => Math.max(0.6, d * 0.065), order: 1 },
    // 0.125° tiles (~13 m/px) around the places on the map
    { dir: "/map/tiles/d", near: 6, far: 10, radius: (d) => Math.max(0.2, d * 0.07), order: 2 },
];

function HDTiles({
    uniformsRef,
    step,
    maxTiles,
    level,
}: {
    uniformsRef: RefObject<TerrainUniforms | null>;
    step: number;
    maxTiles: number;
    level: HDLevel;
}) {
    const controls = useThree((s) => s.controls) as unknown as MapControlsImpl | null;
    const camera = useThree((s) => s.camera);
    const gl = useThree((s) => s.gl);
    const group = useRef<THREE.Group>(null);
    const st = useRef({
        manifest: null as (TileManifest & { set: Set<string> }) | null,
        live: new Map<string, LiveTile>(),
        loading: new Set<string>(),
        last: 0,
    });
    const v = useMemo(() => new THREE.Vector3(), []);

    useEffect(() => {
        let alive = true;
        fetch(`${level.dir}/manifest.json`)
            .then((r) => (r.ok ? r.json() : null))
            .then((m: TileManifest | null) => {
                if (alive && m?.tiles?.length) st.current.manifest = { ...m, set: new Set(m.tiles) };
            })
            .catch(() => {});
        const state = st.current;
        return () => {
            alive = false;
            state.live.forEach((t) => {
                t.mesh.geometry.dispose();
                t.material.dispose();
                t.texture.dispose();
            });
            state.live.clear();
        };
    }, [level.dir]);

    const drop = (id: string) => {
        const t = st.current.live.get(id);
        if (!t) return;
        group.current?.remove(t.mesh);
        t.mesh.geometry.dispose();
        t.material.dispose();
        t.texture.dispose();
        st.current.live.delete(id);
    };

    useFrame(({ clock }) => {
        const state = st.current;
        const m = state.manifest;
        const uniforms = uniformsRef.current;
        if (!m || !controls || !uniforms || !group.current) return;
        const now = clock.getElapsedTime();
        const d = camera.position.distanceTo(controls.target);
        const amount = 1 - THREE.MathUtils.smoothstep(d, level.near, level.far);

        // Fade every live tile with zoom (and in, when it has just arrived)
        state.live.forEach((t) => {
            t.material.opacity = amount * Math.min(1, (now - t.born) / 0.6);
            t.mesh.visible = t.material.opacity > 0.01;
        });

        if (now - state.last < 0.3) return;
        state.last = now;

        if (amount <= 0) {
            // Far away: free GPU memory
            if (d > level.far * 1.8) Array.from(state.live.keys()).forEach(drop);
            return;
        }

        // Look a little ahead of the target: a tilted camera sees more ground in front of it
        v.copy(controls.target).sub(camera.position).setY(0).normalize().multiplyScalar(d * 0.45).add(controls.target);
        const [lng, lat] = unproject(v.x, v.z);
        const radius = level.radius(d); // degrees
        const cosLat = Math.cos((lat * Math.PI) / 180);

        const wanted: { id: string; dist: number; w: number; n: number }[] = [];
        for (const id of m.tiles) {
            const [r, c] = id.split("_").map(Number);
            const w = m.west + c * m.step;
            const n = m.north - r * m.step;
            const dist = Math.hypot((w + m.step / 2 - lng) * cosLat, n - m.step / 2 - lat);
            if (dist < radius) wanted.push({ id, dist, w, n });
        }
        wanted.sort((a, b) => a.dist - b.dist);
        const keep = new Set(wanted.slice(0, maxTiles).map((t) => t.id));

        // Unload tiles that drifted out of range
        Array.from(state.live.keys()).forEach((id) => {
            if (!keep.has(id)) drop(id);
        });

        // Load the nearest missing ones, a few at a time
        for (const t of wanted.slice(0, maxTiles)) {
            if (state.live.has(t.id) || state.loading.has(t.id) || state.loading.size >= 4) continue;
            state.loading.add(t.id);
            new THREE.TextureLoader().load(
                `${level.dir}/${t.id}.webp`,
                (texture) => {
                    state.loading.delete(t.id);
                    if (!group.current || state.live.has(t.id)) {
                        texture.dispose();
                        return;
                    }
                    texture.colorSpace = THREE.SRGBColorSpace;
                    texture.anisotropy = gl.capabilities.getMaxAnisotropy();
                    const material = createTerrainMaterial(texture, uniforms, { hd: level.order });
                    material.opacity = 0;
                    const mesh = new THREE.Mesh(buildPatchGeometry(t.w, t.n, m.step, step), material);
                    mesh.receiveShadow = true;
                    mesh.renderOrder = level.order;
                    group.current.add(mesh);
                    state.live.set(t.id, { mesh, material, texture, born: clock.getElapsedTime() });
                },
                undefined,
                () => state.loading.delete(t.id)
            );
        }
    });

    return <group ref={group} />;
}

/** Pulsing ring + light beam over the selected marker — the "drop zone" cue. */
function Beacon({ position }: { position: THREE.Vector3 }) {
    const group = useRef<THREE.Group>(null);
    const ring = useRef<THREE.Mesh>(null);
    const ring2 = useRef<THREE.Mesh>(null);
    useFrame(({ clock, camera }) => {
        // Keep a steady on-screen size whatever the zoom
        group.current?.scale.setScalar(THREE.MathUtils.clamp(camera.position.distanceTo(position) / 26, 0.2, 2.5));
        const t = clock.getElapsedTime();
        for (const [r, off] of [
            [ring.current, 0],
            [ring2.current, 0.5],
        ] as const) {
            if (!r) continue;
            const p = (t * 0.7 + off) % 1;
            r.scale.setScalar(0.3 + p * 1.6);
            (r.material as THREE.MeshBasicMaterial).opacity = 0.75 * (1 - p);
        }
    });
    return (
        <group ref={group} position={position}>
            {[ring, ring2].map((r, i) => (
                <mesh key={i} ref={r} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
                    <ringGeometry args={[0.85, 1, 48]} />
                    <meshBasicMaterial color="#F2C46D" transparent depthWrite={false} side={THREE.DoubleSide} />
                </mesh>
            ))}
            <mesh position={[0, 3, 0]}>
                <cylinderGeometry args={[0.06, 0.18, 6, 16, 1, true]} />
                <meshBasicMaterial color="#F2C46D" transparent opacity={0.3} depthWrite={false} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}

// ---------------------------------------------------------------------------
// Markers: clustered in screen space; the DOM pins live in an overlay outside the
// canvas (one React root) and are positioned here every frame.
// ---------------------------------------------------------------------------

function MarkerProjector({
    markers,
    selectedId,
    overlay,
    onClusters,
}: {
    markers: MapMarker[];
    selectedId: string | null;
    overlay: OverlayStore;
    onClusters: (c: ClusterInfo[]) => void;
}) {
    const camera = useThree((s) => s.camera);
    const size = useThree((s) => s.size);
    const world = useMemo(
        () =>
            markers
                .map((m) => {
                    const [x, z] = project(m.lng, m.lat);
                    return { id: m.id, priority: m.priority, pos: new THREE.Vector3(x, heightAtXZ(x, z), z) };
                })
                .sort((a, b) => b.priority - a.priority),
        [markers]
    );
    const byId = useMemo(() => new Map(world.map((w) => [w.id, w.pos])), [world]);
    const current = useRef<ClusterInfo[]>([]);
    const sig = useRef("");
    const last = useRef(0);
    const lastCam = useRef(new THREE.Matrix4());
    const dirty = useRef(true);
    const v = useMemo(() => new THREE.Vector3(), []);

    useEffect(() => {
        dirty.current = true;
    }, [world, selectedId, size.width, size.height]);

    useFrame(() => {
        // 1) Re-cluster at most ~9×/s, and only when the camera or data changed
        const now = performance.now();
        if (now - last.current > 110 && (dirty.current || !lastCam.current.equals(camera.matrixWorld))) {
            last.current = now;
            lastCam.current.copy(camera.matrixWorld);
            dirty.current = false;

            const radius = size.width < 640 ? 62 : 74;
            const margin = 80;
            const out: { id: string; memberIds: string[]; sx: number; sy: number; locked: boolean }[] = [];
            const ordered = selectedId ? [...world].sort((a, b) => Number(b.id === selectedId) - Number(a.id === selectedId)) : world;
            for (const w of ordered) {
                v.copy(w.pos).project(camera);
                if (v.z > 1) continue;
                const sx = ((v.x + 1) / 2) * size.width;
                const sy = ((1 - v.y) / 2) * size.height;
                if (sx < -margin || sy < -margin || sx > size.width + margin || sy > size.height + margin) continue;
                const isSel = w.id === selectedId;
                let joined = false;
                if (!isSel) {
                    for (const c of out) {
                        if (!c.locked && Math.hypot(c.sx - sx, c.sy - sy) < radius) {
                            c.memberIds.push(w.id);
                            joined = true;
                            break;
                        }
                    }
                }
                if (!joined) out.push({ id: w.id, memberIds: [w.id], sx, sy, locked: isSel });
            }
            const key = out.map((c) => c.memberIds.join(",")).join("|");
            if (key !== sig.current) {
                sig.current = key;
                current.current = out.map(({ id, memberIds }) => ({ id, memberIds }));
                onClusters(current.current);
            }
        }

        // 2) Every frame: move the pins with the camera
        for (const c of current.current) {
            const el = overlay.els.get(c.id);
            const p = byId.get(c.id);
            if (!el || !p) continue;
            v.copy(p).project(camera);
            if (v.z > 1) {
                el.style.visibility = "hidden";
                continue;
            }
            const x = ((v.x + 1) / 2) * size.width;
            const y = ((1 - v.y) / 2) * size.height;
            el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
            el.style.zIndex = c.id === selectedId ? "100000" : String(Math.round((1 - v.z) * 50000));
            el.style.visibility = "visible";
        }
    });

    return null;
}

/** Moves the region-name labels (DOM, in the overlay) and fades them as the camera closes in. */
function RegionProjector({ overlay }: { overlay: OverlayStore }) {
    const camera = useThree((s) => s.camera);
    const size = useThree((s) => s.size);
    const controls = useThree((s) => s.controls) as unknown as MapControlsImpl | null;
    const items = useMemo(
        () =>
            REGIONS.map((r) => {
                const [x, z] = project(r.lng, r.lat);
                return new THREE.Vector3(x, heightAtXZ(x, z) + 0.4, z);
            }),
        []
    );
    const v = useMemo(() => new THREE.Vector3(), []);
    useFrame(() => {
        const d = controls ? camera.position.distanceTo(controls.target) : 100;
        const opacity = THREE.MathUtils.clamp((d - 28) / 16, 0, 1) * 0.7;
        items.forEach((p, i) => {
            const el = overlay.regionEls[i];
            if (!el) return;
            v.copy(p).project(camera);
            if (v.z > 1 || opacity === 0) {
                el.style.opacity = "0";
                return;
            }
            const x = ((v.x + 1) / 2) * size.width;
            const y = ((1 - v.y) / 2) * size.height;
            el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
            el.style.opacity = String(opacity);
        });
    });
    return null;
}

/** Per-frame shader inputs: drifting clouds, grid fading with zoom. */
function TerrainAnimator({ uniformsRef }: { uniformsRef: RefObject<TerrainUniforms | null> }) {
    const controls = useThree((s) => s.controls) as unknown as MapControlsImpl | null;
    useFrame(({ clock, camera }) => {
        const u = uniformsRef.current;
        if (!u) return;
        u.uTime.value = clock.getElapsedTime();
        const d = controls ? camera.position.distanceTo(controls.target) : 100;
        u.uGrid.value = THREE.MathUtils.smoothstep(d, 22, 70);
        u.uDetail.value = 1 - THREE.MathUtils.smoothstep(d, 8, 45);
    });
    return null;
}

// ---------------------------------------------------------------------------
// Scene root
// ---------------------------------------------------------------------------

function useTerrainAssets(quality: "high" | "low") {
    const gl = useThree((s) => s.gl);
    const [map, setMap] = useState<THREE.Texture | null>(null);
    useEffect(() => {
        let alive = true;
        const url = quality === "high" ? "/map/satellite.jpg" : "/map/satellite-sm.jpg";
        Promise.all([loadElevation(), new THREE.TextureLoader().loadAsync(url)]).then(([, tex]) => {
            if (!alive) return;
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.anisotropy = gl.capabilities.getMaxAnisotropy();
            setMap(tex);
        });
        return () => {
            alive = false;
        };
    }, [quality, gl]);
    return map;
}

function SceneContent(props: SceneProps) {
    const { markers, selectedId, command, quality, reducedMotion, panelSide, overlay, onClusters, onCamera, onReady } = props;
    const rig = useRef<RigApi | null>(null);
    const uniforms = useRef<TerrainUniforms | null>(null);
    const map = useTerrainAssets(quality);
    const loaded = !!map;
    /** Grid cell (degrees) for terrain and HD patches; must divide the 0.5° tile size. */
    const terrainStep = quality === "high" ? 0.025 : 0.05;

    const selected = useMemo(() => {
        if (!loaded) return null;
        const m = markers.find((x) => x.id === selectedId);
        if (!m) return null;
        const [x, z] = project(m.lng, m.lat);
        return new THREE.Vector3(x, heightAtXZ(x, z), z);
    }, [markers, selectedId, loaded]);

    // Fly to a newly selected marker, framed beside the preview panel
    useEffect(() => {
        if (!selected || !rig.current) return;
        const d = Math.min(rig.current.distance(), 14);
        // Desktop: sit left of the side panel. Mobile: sit in the upper half, above the bottom sheet.
        rig.current.flyTo(selected, d, panelSide === "right" ? { offset: [0.2, 0], arc: true } : { offset: [0, 0.15], arc: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    useEffect(() => {
        if (!loaded) return;
        let id = requestAnimationFrame(() => {
            id = requestAnimationFrame(onReady);
        });
        return () => cancelAnimationFrame(id);
    }, [loaded, onReady]);

    return (
        <>
            <color attach="background" args={[HAZE]} />
            <fog attach="fog" args={[HAZE, 120, 400]} />

            <hemisphereLight args={["#e6eeff", "#6b5940", 1.0]} />
            <directionalLight
                position={[-55, 42, -32]}
                intensity={2.9}
                color="#ffe6c2"
                castShadow={quality === "high"}
                shadow-mapSize={[4096, 4096]}
                shadow-camera-left={-55}
                shadow-camera-right={55}
                shadow-camera-top={50}
                shadow-camera-bottom={-50}
                shadow-camera-near={1}
                shadow-camera-far={220}
                shadow-bias={-0.0002}
                shadow-normalBias={0.04}
            />
            <directionalLight position={[50, 20, 40]} intensity={0.25} color="#8fb3d9" />

            <CameraRig rig={rig} command={command} reducedMotion={reducedMotion} focus={selected} onCamera={onCamera} />

            {map && (
                <>
                    <Terrain map={map} step={terrainStep} uniformsRef={uniforms} />
                    {HD_LEVELS.map((l) => (
                        <HDTiles key={l.dir} level={l} uniformsRef={uniforms} step={terrainStep} maxTiles={quality === "high" ? 20 : 9} />
                    ))}
                    <TerrainAnimator uniformsRef={uniforms} />
                    <Border />
                    {!reducedMotion && (
                        <Sparkles count={quality === "high" ? 90 : 40} scale={[80, 8, 75]} position={[CENTER.x, 5, CENTER.z]} size={2} speed={0.2} opacity={0.4} color="#E7C27D" />
                    )}
                    <RegionProjector overlay={overlay} />
                    <MarkerProjector markers={markers} selectedId={selectedId} overlay={overlay} onClusters={onClusters} />
                    {selected && <Beacon position={selected} />}
                </>
            )}
        </>
    );
}

export default function Scene(props: SceneProps) {
    return (
        <Canvas
            shadows={props.quality === "high"}
            dpr={props.quality === "high" ? [1, 2] : [1, 1.5]}
            camera={{ fov: 40, near: 0.3, far: 1200, position: [0, 220, 40] }}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            onCreated={({ gl }) => {
                gl.toneMapping = THREE.NeutralToneMapping;
                gl.toneMappingExposure = 1.22;
            }}
            onPointerMissed={() => props.onSelect(null)}
        >
            <SceneContent {...props} />
        </Canvas>
    );
}
