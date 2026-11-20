// Real terrain for the 3D map: SRTM elevation + NASA Blue Marble satellite imagery
// (baked by scripts/build-map-assets.mjs into public/map/).
import * as THREE from "three";
import { RAJASTHAN_OUTLINE, TERRAIN_BBOX, UNITS_PER_DEG, project, unproject } from "@/lib/map/geo";

const { west, east, south, north } = TERRAIN_BBOX;
const SPAN_LNG = east - west;
const SPAN_LAT = north - south;

/** 1 world unit ≈ 11.1 km horizontally. Relief is exaggerated so the Aravalli read as mountains. */
const METRES_PER_UNIT = 111_000 / UNITS_PER_DEG;
const EXAGGERATION = 16;
const M_TO_UNITS = EXAGGERATION / METRES_PER_UNIT;

/** Tame the Himalayan corner of the bbox so it doesn't tower over Rajasthan (max ~1.7 km there). */
const compress = (m: number) => (m <= 1300 ? m : 1300 + (m - 1300) * 0.1);

// ---------------------------------------------------------------------------
// Elevation data
// ---------------------------------------------------------------------------

let dem: { w: number; h: number; data: Float32Array } | null = null;
let loading: Promise<void> | null = null;

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load ${src}`));
        img.src = src;
    });
}

/** Loads /map/elevation.png once (16-bit metres in R/G) and lightly smooths it. */
export function loadElevation(): Promise<void> {
    if (loading) return loading;
    loading = loadImage("/map/elevation.png").then((img) => {
        const w = img.width;
        const h = img.height;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
        ctx.drawImage(img, 0, 0);
        const px = ctx.getImageData(0, 0, w, h).data;
        const raw = new Float32Array(w * h);
        for (let k = 0; k < raw.length; k++) raw[k] = compress(px[k * 4] * 256 + px[k * 4 + 1]);
        // 3×3 box blur removes the 1 m quantisation steps (they show up as terracing in the lighting)
        const data = new Float32Array(w * h);
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                let sum = 0;
                let n = 0;
                for (let dy = -1; dy <= 1; dy++) {
                    const yy = y + dy;
                    if (yy < 0 || yy >= h) continue;
                    for (let dx = -1; dx <= 1; dx++) {
                        const xx = x + dx;
                        if (xx < 0 || xx >= w) continue;
                        sum += raw[yy * w + xx];
                        n++;
                    }
                }
                data[y * w + x] = sum / n;
            }
        }
        dem = { w, h, data };
    });
    return loading;
}

/** Elevation in metres (0 until loaded). */
export function elevationAt(lng: number, lat: number): number {
    if (!dem) return 0;
    const { w, h, data } = dem;
    const x = Math.min(Math.max(((lng - west) / SPAN_LNG) * w - 0.5, 0), w - 1.001);
    const y = Math.min(Math.max(((north - lat) / SPAN_LAT) * h - 0.5, 0), h - 1.001);
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = x - xi;
    const fy = y - yi;
    const a = data[yi * w + xi];
    const b = data[yi * w + xi + 1];
    const c = data[(yi + 1) * w + xi];
    const d = data[(yi + 1) * w + xi + 1];
    return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
}

export function heightAtXZ(x: number, z: number): number {
    const [lng, lat] = unproject(x, z);
    return elevationAt(lng, lat) * M_TO_UNITS;
}

export function heightAtLatLng(lat: number, lng: number): number {
    return elevationAt(lng, lat) * M_TO_UNITS;
}

// ---------------------------------------------------------------------------
// Geometry
// ---------------------------------------------------------------------------

/**
 * A displaced lat/lng grid. Vertex (I, J) is always at (west + I·step, north − J·step), so the base terrain
 * and HD patches built with the same step share identical vertices (no cracks, no z-fighting gaps).
 * `uv` is for the patch's own texture; `gUv` is the position in the whole terrain bbox (mask, grid, haze).
 */
function buildGrid(i0: number, j0: number, nx: number, nz: number, step: number): THREE.BufferGeometry {
    const count = (nx + 1) * (nz + 1);
    const pos = new Float32Array(count * 3);
    const uv = new Float32Array(count * 2);
    const guv = new Float32Array(count * 2);
    for (let j = 0; j <= nz; j++) {
        const lat = north - (j0 + j) * step;
        for (let i = 0; i <= nx; i++) {
            const lng = west + (i0 + i) * step;
            const k = j * (nx + 1) + i;
            const [x, z] = project(lng, lat);
            pos[k * 3] = x;
            pos[k * 3 + 1] = elevationAt(lng, lat) * M_TO_UNITS;
            pos[k * 3 + 2] = z;
            uv[k * 2] = i / nx;
            uv[k * 2 + 1] = 1 - j / nz;
            guv[k * 2] = (lng - west) / SPAN_LNG;
            guv[k * 2 + 1] = (lat - south) / SPAN_LAT;
        }
    }
    const idx = new Uint32Array(nx * nz * 6);
    let p = 0;
    for (let j = 0; j < nz; j++) {
        for (let i = 0; i < nx; i++) {
            const a = j * (nx + 1) + i;
            const b = a + 1;
            const c = a + nx + 1;
            const d = c + 1;
            idx[p++] = a;
            idx[p++] = c;
            idx[p++] = b;
            idx[p++] = b;
            idx[p++] = c;
            idx[p++] = d;
        }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    geo.setAttribute("gUv", new THREE.BufferAttribute(guv, 2));
    geo.setIndex(new THREE.BufferAttribute(idx, 1));
    geo.computeVertexNormals();
    return geo;
}

/** The whole terrain bbox. `step` (degrees) must divide 0.5 so HD patches line up. */
export function buildTerrainGeometry(step: number): THREE.BufferGeometry {
    return buildGrid(0, 0, Math.round(SPAN_LNG / step), Math.round(SPAN_LAT / step), step);
}

/** One HD tile's patch: `size`° square with its north-west corner at (tileWest, tileNorth). */
export function buildPatchGeometry(tileWest: number, tileNorth: number, size: number, step: number): THREE.BufferGeometry {
    const n = Math.round(size / step);
    return buildGrid(Math.round((tileWest - west) / step), Math.round((north - tileNorth) / step), n, n, step);
}

/** The state border, densified and draped on the terrain. */
export function drapedOutline(step = 0.25, lift = 0.05): THREE.Vector3[] {
    const pts: THREE.Vector3[] = [];
    const ring = RAJASTHAN_OUTLINE.map(([lng, lat]) => project(lng, lat));
    for (let i = 0; i < ring.length; i++) {
        const [ax, az] = ring[i];
        const [bx, bz] = ring[(i + 1) % ring.length];
        const n = Math.max(1, Math.ceil(Math.hypot(bx - ax, bz - az) / step));
        for (let s = 0; s < n; s++) {
            const x = ax + ((bx - ax) * s) / n;
            const z = az + ((bz - az) * s) / n;
            pts.push(new THREE.Vector3(x, heightAtXZ(x, z) + lift, z));
        }
    }
    pts.push(pts[0].clone());
    return pts;
}

/** White-inside / black-outside mask of the state, in the terrain's UV space. */
export function stateMaskTexture(): THREE.CanvasTexture {
    const W = 1024;
    const H = Math.round((W * SPAN_LAT) / (SPAN_LNG * Math.cos((26.6 * Math.PI) / 180)));
    const draw = (blur: number, grow: number) => {
        const c = document.createElement("canvas");
        c.width = W;
        c.height = H;
        const ctx = c.getContext("2d", { willReadFrequently: true })!;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, W, H);
        ctx.filter = `blur(${blur}px)`;
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = grow;
        ctx.lineJoin = "round";
        ctx.beginPath();
        RAJASTHAN_OUTLINE.forEach(([lng, lat], i) => {
            const x = ((lng - west) / SPAN_LNG) * W;
            const y = ((north - lat) / SPAN_LAT) * H;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fill();
        if (grow > 0) ctx.stroke();
        return ctx.getImageData(0, 0, W, H).data;
    };
    const sharp = draw(2, 0);
    const halo = draw(48, 90);
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const out = canvas.getContext("2d")!;
    const img = out.createImageData(W, H);
    for (let k = 0; k < W * H; k++) {
        img.data[k * 4] = sharp[k * 4];
        img.data[k * 4 + 1] = halo[k * 4];
        img.data[k * 4 + 3] = 255;
    }
    out.putImageData(img, 0, 0);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.NoColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return tex;
}

// ---------------------------------------------------------------------------
// Material
// ---------------------------------------------------------------------------

export interface TerrainUniforms {
    uTime: { value: number };
    uGrid: { value: number };
    uDetail: { value: number };
    uMask: { value: THREE.Texture };
    /** sRGB (display) values: blended after tone mapping, so it matches the CSS-coloured background exactly. */
    uEdgeColor: { value: THREE.Vector3 };
    uBBox: { value: THREE.Vector4 };
}

/**
 * Satellite-textured standard material with:
 *  - everything outside Rajasthan desaturated and darkened (the state "lights up")
 *  - slow drifting cloud shadows
 *  - a faint 1° lat/lng grid (game-map feel) that fades as you zoom in
 *  - edges of the data dissolving into the background haze
 */
export function createTerrainUniforms(mask: THREE.Texture, edgeColor: string): TerrainUniforms {
    return {
        uTime: { value: 0 },
        uGrid: { value: 1 },
        uDetail: { value: 0 },
        uMask: { value: mask },
        uEdgeColor: { value: new THREE.Vector3(...[1, 3, 5].map((i) => parseInt(edgeColor.slice(i, i + 2), 16) / 255)) },
        uBBox: { value: new THREE.Vector4(west, east, south, north) },
    };
}

/**
 * `uniforms` are shared by the base terrain and every HD patch, so one per-frame update drives all.
 * HD patches (`hd`: level, 1 = lowest) draw over the base and lower levels (polygon offset) and fade in through `material.opacity`.
 */
export function createTerrainMaterial(map: THREE.Texture, uniforms: TerrainUniforms, opts: { hd?: number } = {}) {
    const material = new THREE.MeshStandardMaterial({ map, roughness: 0.96, metalness: 0 });
    // HD imagery is already sharp: much less synthetic micro-detail
    material.defines = { RP_MICRO: opts.hd ? "0.3" : "1.0" };
    if (opts.hd) {
        material.transparent = true;
        material.depthWrite = false;
        material.polygonOffset = true;
        material.polygonOffsetFactor = -2 * opts.hd;
        material.polygonOffsetUnits = -4 * opts.hd;
    }
    material.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, uniforms);
        shader.vertexShader = shader.vertexShader
            .replace("#include <common>", "#include <common>\nvarying vec3 vWorldPos;\nattribute vec2 gUv;\nvarying vec2 vGUv;")
            .replace("#include <project_vertex>", "#include <project_vertex>\nvWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvGUv = gUv;");
        shader.fragmentShader = shader.fragmentShader
            .replace(
                "#include <common>",
                `#include <common>
varying vec3 vWorldPos;
varying vec2 vGUv;
uniform float uTime;
uniform float uGrid;
uniform float uDetail;
uniform sampler2D uMask;
uniform vec3 uEdgeColor;
uniform vec4 uBBox;
float rpHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float rpNoise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(rpHash(i), rpHash(i + vec2(1.0, 0.0)), u.x), mix(rpHash(i + vec2(0.0, 1.0)), rpHash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float rpFbm(vec2 p) { float s = 0.0; float a = 0.5; for (int i = 0; i < 4; i++) { s += a * rpNoise(p); p *= 2.07; a *= 0.5; } return s; }`
            )
            .replace(
                "#include <map_fragment>",
                `#include <map_fragment>
{
    vec2 mk = texture2D(uMask, vGUv).rg;
    float inside = mk.r;
    float nearState = smoothstep(0.03, 0.75, mk.g);
    vec3 col = diffuseColor.rgb;
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    vec3 outsideCol = mix(vec3(lum), col, 0.3) * vec3(0.40, 0.42, 0.47);
    outsideCol *= mix(0.55, 1.0, nearState);
    col = mix(outsideCol, col * vec3(1.14, 1.09, 1.02), inside);
    // Micro-detail so close-ups (beyond the 500 m imagery) read as ground, not blur
    float micro = rpFbm(vWorldPos.xz * 2.6) * 0.65 + rpNoise(vWorldPos.xz * 11.0) * 0.35;
    col *= mix(1.0, 0.82 + micro * 0.36, uDetail * RP_MICRO);
    float cl = rpFbm(vWorldPos.xz * 0.05 + uTime * vec2(0.010, 0.004));
    col *= 1.0 - 0.26 * smoothstep(0.5, 0.78, cl);
    vec2 ll = vec2(mix(uBBox.x, uBBox.y, vGUv.x), mix(uBBox.z, uBBox.w, vGUv.y));
    vec2 g = abs(fract(ll + 0.5) - 0.5) / max(fwidth(ll), vec2(1e-5));
    float line = 1.0 - min(min(g.x, g.y), 1.0);
    col = mix(col, vec3(1.0, 0.92, 0.78), line * 0.16 * uGrid * nearState);
    diffuseColor.rgb = col;
}`
            )
            .replace(
                "#include <fog_fragment>",
                `#include <fog_fragment>
{
    float e = smoothstep(0.0, 0.14, vGUv.x) * smoothstep(1.0, 0.86, vGUv.x)
            * smoothstep(0.0, 0.15, vGUv.y) * smoothstep(1.0, 0.85, vGUv.y);
    float halo = smoothstep(0.02, 0.6, texture2D(uMask, vGUv).g);
    gl_FragColor.rgb = mix(uEdgeColor, gl_FragColor.rgb, e * halo);
}`
            );
    };
    return material;
}

/** Additive gold "zone wall" along the border — fades upward. */
export function createBorderWall(points: THREE.Vector3[], height: number): THREE.BufferGeometry {
    const pos = new Float32Array(points.length * 2 * 3);
    const alpha = new Float32Array(points.length * 2);
    points.forEach((p, i) => {
        pos.set([p.x, p.y - 0.05, p.z], i * 6);
        pos.set([p.x, p.y + height, p.z], i * 6 + 3);
        alpha[i * 2] = 1;
        alpha[i * 2 + 1] = 0;
    });
    const idx: number[] = [];
    for (let i = 0; i < points.length - 1; i++) {
        const a = i * 2;
        idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("alpha", new THREE.BufferAttribute(alpha, 1));
    geo.setIndex(idx);
    return geo;
}

export { project };
