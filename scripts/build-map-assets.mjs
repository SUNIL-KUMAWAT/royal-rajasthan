// Builds the 3D map's terrain assets into public/map/:
//   satellite.jpg / satellite-sm.jpg — NASA Blue Marble Next Generation (cloud-free true colour), via NASA GIBS
//   elevation.png                    — SRTM-derived elevation from AWS Terrain Tiles (Terrarium encoding)
// Both cover TERRAIN_BBOX (lib/map/geo.ts) in plain lat/lng (equirectangular) space.
//
// Run once (needs network):  node scripts/build-map-assets.mjs
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const BBOX = { west: 68.4, east: 79.4, south: 22.3, north: 30.9 }; // keep in sync with lib/map/geo.ts
const OUT = path.join(process.cwd(), "public", "map");
const TILE_ZOOM = 8;
const DEM_W = 770; // ~0.014° per pixel (~1.6 km)
const DEM_H = 602;
const SAT_W = 2600; // ≈ native 500 m Blue Marble resolution
const SAT_H = Math.round((SAT_W * (BBOX.north - BBOX.south)) / (BBOX.east - BBOX.west));

async function fetchBuffer(url, tries = 3) {
    for (let i = 0; i < tries; i++) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`${res.status} ${url}`);
            return Buffer.from(await res.arrayBuffer());
        } catch (e) {
            if (i === tries - 1) throw e;
        }
    }
}

// ---------- satellite ----------
async function buildSatellite() {
    const url =
        "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0" +
        "&LAYERS=BlueMarble_NextGeneration&STYLES=&CRS=EPSG:4326" +
        `&BBOX=${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east}&WIDTH=${SAT_W}&HEIGHT=${SAT_H}&FORMAT=image/png`;
    const raw = await fetchBuffer(url);
    // Blue Marble is muted; lift contrast and saturation a little for a richer, warmer desert
    const graded = sharp(raw).modulate({ saturation: 1.28, brightness: 1.04 }).linear(1.12, -12);
    await graded.clone().jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(OUT, "satellite.jpg"));
    await graded.clone().resize(1300).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT, "satellite-sm.jpg"));
    console.log(`satellite ${SAT_W}x${SAT_H}`);
}

// ---------- elevation ----------
const lon2px = (lon, z) => ((lon + 180) / 360) * 256 * 2 ** z;
const lat2px = (lat, z) => ((1 - Math.asinh(Math.tan((lat * Math.PI) / 180)) / Math.PI) / 2) * 256 * 2 ** z;

async function buildElevation() {
    const z = TILE_ZOOM;
    const x0 = Math.floor(lon2px(BBOX.west, z) / 256);
    const x1 = Math.floor(lon2px(BBOX.east, z) / 256);
    const y0 = Math.floor(lat2px(BBOX.north, z) / 256);
    const y1 = Math.floor(lat2px(BBOX.south, z) / 256);
    const mw = (x1 - x0 + 1) * 256;
    const mh = (y1 - y0 + 1) * 256;
    const mosaic = new Float32Array(mw * mh);

    const jobs = [];
    for (let ty = y0; ty <= y1; ty++) {
        for (let tx = x0; tx <= x1; tx++) {
            jobs.push(
                (async () => {
                    const png = await fetchBuffer(`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${tx}/${ty}.png`);
                    const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
                    for (let py = 0; py < 256; py++) {
                        for (let px = 0; px < 256; px++) {
                            const i = (py * 256 + px) * info.channels;
                            const elev = data[i] * 256 + data[i + 1] + data[i + 2] / 256 - 32768;
                            mosaic[((ty - y0) * 256 + py) * mw + (tx - x0) * 256 + px] = elev;
                        }
                    }
                })()
            );
        }
    }
    await Promise.all(jobs);

    const sample = (gx, gy) => {
        const x = Math.min(Math.max(gx - x0 * 256 - 0.5, 0), mw - 1.001);
        const y = Math.min(Math.max(gy - y0 * 256 - 0.5, 0), mh - 1.001);
        const xi = Math.floor(x);
        const yi = Math.floor(y);
        const fx = x - xi;
        const fy = y - yi;
        const a = mosaic[yi * mw + xi];
        const b = mosaic[yi * mw + xi + 1];
        const c = mosaic[(yi + 1) * mw + xi];
        const d = mosaic[(yi + 1) * mw + xi + 1];
        return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
    };

    // Re-project Web-Mercator tiles onto the plain lat/lng grid
    const elev = new Float32Array(DEM_W * DEM_H);
    for (let j = 0; j < DEM_H; j++) {
        const lat = BBOX.north - ((j + 0.5) / DEM_H) * (BBOX.north - BBOX.south);
        const gy = lat2px(lat, z);
        for (let i = 0; i < DEM_W; i++) {
            const lon = BBOX.west + ((i + 0.5) / DEM_W) * (BBOX.east - BBOX.west);
            elev[j * DEM_W + i] = Math.max(0, sample(lon2px(lon, z), gy));
        }
    }

    // Encode whole metres as 16 bits in R (high) and G (low) — lossless in PNG
    const rgb = Buffer.alloc(DEM_W * DEM_H * 3);
    let max = 0;
    for (let k = 0; k < elev.length; k++) {
        const v = Math.min(65535, Math.round(elev[k]));
        max = Math.max(max, elev[k]);
        rgb[k * 3] = v >> 8;
        rgb[k * 3 + 1] = v & 255;
    }
    await sharp(rgb, { raw: { width: DEM_W, height: DEM_H, channels: 3 } })
        .png({ compressionLevel: 9 })
        .toFile(path.join(OUT, "elevation.png"));
    console.log(`elevation ${DEM_W}x${DEM_H}, max ${Math.round(max)} m`);
}

await fs.mkdir(OUT, { recursive: true });
await Promise.all([buildSatellite(), buildElevation()]);
