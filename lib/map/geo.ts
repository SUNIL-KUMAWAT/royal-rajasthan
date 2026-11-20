// Geography helpers for the 3D map. Pure data + math, safe on server and client.
import { RAJASTHAN_OUTLINE } from "./outline";

export { RAJASTHAN_OUTLINE };

/** World units per degree of latitude. The whole state is roughly 78 × 71 units. */
export const UNITS_PER_DEG = 10;
const LAT0 = 26.6;
const LNG0 = 73.87;
const COS_LAT0 = Math.cos((LAT0 * Math.PI) / 180);

/** Equirectangular projection centred on Rajasthan. Returns [x, z] (z grows southward). */
export function project(lng: number, lat: number): [number, number] {
    return [(lng - LNG0) * UNITS_PER_DEG * COS_LAT0, -(lat - LAT0) * UNITS_PER_DEG];
}

export function unproject(x: number, z: number): [number, number] {
    return [x / (UNITS_PER_DEG * COS_LAT0) + LNG0, -z / UNITS_PER_DEG + LAT0];
}

/** Area covered by the satellite + elevation assets (scripts/build-map-assets.mjs). */
export const TERRAIN_BBOX = { west: 68.4, east: 79.4, south: 22.3, north: 30.9 };

/** Projected outline as [x, z]. */
export const OUTLINE_XZ: [number, number][] = RAJASTHAN_OUTLINE.map(([lng, lat]) => project(lng, lat));

export const BOUNDS = (() => {
    const xs = OUTLINE_XZ.map((p) => p[0]);
    const zs = OUTLINE_XZ.map((p) => p[1]);
    return { minX: Math.min(...xs), maxX: Math.max(...xs), minZ: Math.min(...zs), maxZ: Math.max(...zs) };
})();

/** Ray-casting point-in-polygon on the projected outline. */
export function insideState(x: number, z: number): boolean {
    let inside = false;
    const poly = OUTLINE_XZ;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const [xi, zi] = poly[i];
        const [xj, zj] = poly[j];
        if (zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
    }
    return inside;
}


export function inRajasthan(lat: number, lng: number): boolean {
    const [x, z] = project(lng, lat);
    return insideState(x, z);
}

/** City / town centres [lat, lng]. Used for festivals, shopping districts and as a fallback for places. */
export const CITY_COORDS: Record<string, [number, number]> = {
    jaipur: [26.9124, 75.7873],
    "jaipur rural": [27.17, 75.72],
    udaipur: [24.5854, 73.7125],
    jodhpur: [26.2389, 73.0243],
    "jodhpur rural": [26.45, 72.85],
    jaisalmer: [26.9157, 70.9083],
    bikaner: [28.0229, 73.3119],
    ajmer: [26.4499, 74.6399],
    pushkar: [26.4897, 74.5511],
    "mount abu": [24.5926, 72.7156],
    chittorgarh: [24.8887, 74.6269],
    kota: [25.2138, 75.8648],
    bundi: [25.4305, 75.6499],
    alwar: [27.553, 76.6346],
    "sawai madhopur": [25.9928, 76.3526],
    ranthambore: [26.0173, 76.5026],
    kumbhalgarh: [25.1528, 73.587],
    bharatpur: [27.2152, 77.493],
    barmer: [25.7521, 71.3967],
    banswara: [23.5461, 74.435],
    dungarpur: [23.843, 73.7147],
    sikar: [27.6094, 75.1399],
    pali: [25.7711, 73.3234],
    rajsamand: [25.071, 73.88],
    sambhar: [26.908, 75.191],
    karauli: [26.498, 77.015],
    jhalawar: [24.5973, 76.161],
    baran: [25.1, 76.5166],
    rawatbhata: [24.929, 75.585],
    pokhran: [26.92, 71.92],
    neemrana: [27.9886, 76.385],
    nawalgarh: [27.85, 75.27],
    nagaur: [27.202, 73.7339],
    kishangarh: [26.59, 74.86],
    hanumangarh: [29.5818, 74.3294],
    dholpur: [26.7025, 77.8934],
    deshnok: [27.79, 73.34],
    deeg: [27.47, 77.33],
    dausa: [26.8932, 76.3375],
    churu: [28.29, 74.95],
    bijolia: [25.16, 75.33],
    bhilwara: [25.3407, 74.6313],
    bagru: [26.81, 75.54],
    abhaneri: [27.0074, 76.6067],
    alsisar: [28.3, 75.28],
    "badi sadri": [24.41, 74.47],
    jalore: [25.345, 72.625],
    jalor: [25.345, 72.625],
    jhunjhunu: [28.1289, 75.3995],
    nathdwara: [24.9382, 73.822],
    osian: [26.73, 72.91],
    pratapgarh: [24.03, 74.78],
    ramdevra: [27.01, 72.05],
    shahpura: [25.63, 74.93],
    sirohi: [24.8853, 72.8616],
    tonk: [26.1664, 75.7885],
    ganganagar: [29.9038, 73.8772],
    "sri ganganagar": [29.9038, 73.8772],
};

export function cityCoords(name: string): [number, number] | undefined {
    return CITY_COORDS[name.trim().toLowerCase()];
}

/** Cultural / geographic regions shown as large labels at overview zoom. */
export const REGIONS: { name: string; nameHi: string; lat: number; lng: number }[] = [
    { name: "Thar Desert", nameHi: "थार मरुस्थल", lat: 27.25, lng: 71.1 },
    { name: "Marwar", nameHi: "मारवाड़", lat: 25.95, lng: 72.75 },
    { name: "Jangladesh", nameHi: "जांगलदेश", lat: 28.75, lng: 73.4 },
    { name: "Shekhawati", nameHi: "शेखावाटी", lat: 28.05, lng: 75.35 },
    { name: "Dhundhar", nameHi: "ढूंढाड़", lat: 26.55, lng: 75.95 },
    { name: "Braj", nameHi: "ब्रज", lat: 27.1, lng: 77.25 },
    { name: "Mewar", nameHi: "मेवाड़", lat: 24.95, lng: 74.15 },
    { name: "Hadoti", nameHi: "हाड़ौती", lat: 24.75, lng: 76.2 },
    { name: "Vagad", nameHi: "वागड़", lat: 23.75, lng: 74.15 },
];
