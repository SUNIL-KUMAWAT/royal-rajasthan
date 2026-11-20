// Builds HD satellite tiles for close zoom: public/map/tiles/{row}_{col}.webp + manifest.json
//
// Source: Sentinel-2 cloudless 2016 by EOX IT Services GmbH (contains modified Copernicus Sentinel data 2016),
// licensed CC BY 4.0 — https://s2maps.eu. ~10 m imagery, saved at ~54 m/px (1024 px per 0.5° tile).
// Each tile is colour-matched to the overview image (public/map/satellite.jpg) so the two blend
// when the map swaps to HD on zoom, and the 2016 mosaic's scene seams are evened out.
//
// Only tiles touching Rajasthan are built. Re-running skips tiles that already exist.
//   node scripts/build-map-tiles.mjs
//
// Detail level: 0.125° tiles (~13 m/px) around every marker on the map -> public/map/tiles/d/.
// Needs the 0.5° tiles first (used for colour matching) and the site running, to read the markers:
//   node scripts/build-map-tiles.mjs --detail [http://localhost:3000/]
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const BBOX = { west: 68.4, east: 79.4, south: 22.3, north: 30.9 }; // == TERRAIN_BBOX in lib/map/geo.ts
const DETAIL = process.argv.includes("--detail");
const STEP = DETAIL ? 0.125 : 0.5; // degrees per tile
const SIZE = 1024; // px per tile
const L1_STEP = 0.5;
const L1_DIR = path.join(ROOT, "public", "map", "tiles");
const OUT = DETAIL ? path.join(L1_DIR, "d") : L1_DIR;
/** Detail tiles cover this far (degrees) around each marker. */
const DETAIL_RADIUS = 0.06;
const UA = "RajasthanPlacesMapBuilder/1.0 (build script)";

// --- the state outline, read from lib/map/outline.ts ---
const outlineSrc = await fs.readFile(path.join(ROOT, "lib/map/outline.ts"), "utf8");
const OUTLINE = [...outlineSrc.matchAll(/\[(-?[\d.]+),\s*(-?[\d.]+)\]/g)].map((m) => [Number(m[1]), Number(m[2])]);

function inside(lng, lat) {
    let hit = false;
    for (let i = 0, j = OUTLINE.length - 1; i < OUTLINE.length; j = i++) {
        const [xi, yi] = OUTLINE[i];
        const [xj, yj] = OUTLINE[j];
        if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) hit = !hit;
    }
    return hit;
}

/** Tile touches the state (sampled on a 9×9 grid, padded by a quarter tile so border areas stay sharp). */
function touchesState(west, north) {
    const pad = STEP * 0.25;
    for (let a = 0; a <= 8; a++) {
        for (let b = 0; b <= 8; b++) {
            if (inside(west - pad + ((STEP + 2 * pad) * a) / 8, north + pad - ((STEP + 2 * pad) * b) / 8)) return true;
        }
    }
    return false;
}

async function fetchTile(west, south, east, north) {
    const url =
        "https://tiles.maps.eox.at/wms?service=WMS&request=GetMap&version=1.1.1&layers=s2cloudless&styles=&srs=EPSG:4326" +
        `&bbox=${west},${south},${east},${north}&width=${SIZE}&height=${SIZE}&format=image/jpeg`;
    for (let i = 0; i < 5; i++) {
        try {
            const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(90000) });
            if (res.ok && /image/.test(res.headers.get("content-type") || "")) return Buffer.from(await res.arrayBuffer());
            if (res.status === 429) await new Promise((r) => setTimeout(r, 30000));
        } catch {
            // retry
        }
        await new Promise((r) => setTimeout(r, 4000 * (i + 1)));
    }
    throw new Error(`tile failed: ${west},${south}`);
}

// Overview image, for colour matching
const base = sharp(path.join(ROOT, "public/map/satellite.jpg"));
const baseMeta = await base.metadata();
const baseRaw = await base.clone().removeAlpha().raw().toBuffer();

/** Detail tiles match the 0.5° tile under them (already matched to the overview). */
async function l1Mean(west, north) {
    const r = Math.floor((BBOX.north - north + 1e-9) / L1_STEP);
    const c = Math.floor((west - BBOX.west + 1e-9) / L1_STEP);
    const file = path.join(L1_DIR, `${r}_${c}.webp`);
    try {
        await fs.access(file);
    } catch {
        return baseMean(west, north);
    }
    const px = SIZE / L1_STEP; // px per degree in the L1 tile
    const left = Math.round((west - (BBOX.west + c * L1_STEP)) * px);
    const top = Math.round((BBOX.north - r * L1_STEP - north) * px);
    const side = Math.round(STEP * px);
    const st = await sharp(file).extract({ left, top, width: side, height: side }).stats();
    return st.channels.slice(0, 3).map((ch) => ch.mean);
}

function baseMean(west, north) {
    const x0 = Math.floor(((west - BBOX.west) / (BBOX.east - BBOX.west)) * baseMeta.width);
    const y0 = Math.floor(((BBOX.north - north) / (BBOX.north - BBOX.south)) * baseMeta.height);
    const w = Math.round((STEP / (BBOX.east - BBOX.west)) * baseMeta.width);
    const h = Math.round((STEP / (BBOX.north - BBOX.south)) * baseMeta.height);
    const sum = [0, 0, 0];
    let n = 0;
    for (let y = y0; y < y0 + h; y++) {
        for (let x = x0; x < x0 + w; x++) {
            const k = (y * baseMeta.width + x) * 3;
            sum[0] += baseRaw[k];
            sum[1] += baseRaw[k + 1];
            sum[2] += baseRaw[k + 2];
            n++;
        }
    }
    return sum.map((s) => s / n);
}

await fs.mkdir(OUT, { recursive: true });
const cols = Math.ceil((BBOX.east - BBOX.west) / STEP);
const rows = Math.ceil((BBOX.north - BBOX.south) / STEP);
const jobs = [];
if (DETAIL) {
    // Marker coordinates from the running site's homepage payload
    const site = process.argv.find((a) => a.startsWith("http")) || "http://localhost:3000/";
    const html = (await (await fetch(site)).text()).replace(/\\"/g, '"');
    const keys = new Set();
    for (const m of html.matchAll(/"id":"[^"]+","mode":"\w+"[^{}]*?"lat":([\d.]+),"lng":([\d.]+)/g)) {
        const [lat, lng] = [Number(m[1]), Number(m[2])];
        for (const dx of [-DETAIL_RADIUS, 0, DETAIL_RADIUS]) {
            for (const dy of [-DETAIL_RADIUS, 0, DETAIL_RADIUS]) {
                const c = Math.floor((lng + dx - BBOX.west) / STEP);
                const r = Math.floor((BBOX.north - lat - dy) / STEP);
                if (r >= 0 && c >= 0 && r < rows && c < cols) keys.add(`${r}_${c}`);
            }
        }
    }
    if (!keys.size) throw new Error(`no markers found at ${site} — is the site running?`);
    for (const k of keys) {
        const [r, c] = k.split("_").map(Number);
        jobs.push({ r, c, west: BBOX.west + c * STEP, north: BBOX.north - r * STEP });
    }
} else {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const west = BBOX.west + c * STEP;
            const north = BBOX.north - r * STEP;
            if (touchesState(west, north)) jobs.push({ r, c, west, north });
        }
    }
}
console.log(`${jobs.length} tiles to build`);

const done = [];
let next = 0;
async function worker() {
    while (next < jobs.length) {
        const j = jobs[next++];
        const file = path.join(OUT, `${j.r}_${j.c}.webp`);
        try {
            await fs.access(file);
            done.push(`${j.r}_${j.c}`);
            continue;
        } catch {
            // build it
        }
        const raw = await fetchTile(j.west, j.north - STEP, j.west + STEP, j.north);
        const stats = await sharp(raw).stats();
        const target = DETAIL ? await l1Mean(j.west, j.north) : baseMean(j.west, j.north);
        const gain = stats.channels.slice(0, 3).map((ch, i) => Math.min(1.6, Math.max(0.6, target[i] / Math.max(ch.mean, 1))));
        await sharp(raw).linear(gain, [0, 0, 0]).webp({ quality: 74 }).toFile(file);
        done.push(`${j.r}_${j.c}`);
        console.log(`${done.length}/${jobs.length} ${j.r}_${j.c}`);
        await new Promise((r) => setTimeout(r, 300));
    }
}
await Promise.all([worker(), worker(), worker()]);

await fs.writeFile(
    path.join(OUT, "manifest.json"),
    JSON.stringify({ west: BBOX.west, north: BBOX.north, step: STEP, size: SIZE, tiles: done.sort() })
);
console.log(`manifest: ${done.length} tiles`);
