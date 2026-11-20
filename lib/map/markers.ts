// Server-only: turns the big content datasets into lean map markers.
import { PLACES } from "@/constants/places";
import { PLACES_HINDI } from "@/constants/places-hindi";
import { FESTIVALS } from "@/constants/festivals";
import { FESTIVALS_HINDI } from "@/constants/festivals-hindi";
import { RAJASTHAN_SHOPPING } from "@/constants/shopping";
import { RAJASTHAN_SHOPPING_HINDI } from "@/constants/shopping-hindi";
import { cityCoords, inRajasthan } from "./geo";
import type { MapMarker, MarkerGroup } from "./types";

const DESC_LIMIT = 170;

/** Random stock-photo services used as stand-ins in the datasets: never show them on the map. */
const PLACEHOLDER_IMAGE = /^https?:\/\/(picsum\.photos|placehold|via\.placeholder|dummyimage|loremflickr|source\.unsplash\.com)/i;

/** Maps, logos and diagrams are not photos of a place. */
const NOT_A_PHOTO = /(schematic|_map_|map_of|locator|logo|emblem|diagram)/i;

/** A real photo, or undefined (the pin then shows its category icon). */
function realImage(url: string | undefined): string | undefined {
    return url && !PLACEHOLDER_IMAGE.test(url) && !NOT_A_PHOTO.test(url) ? url : undefined;
}

function clip(text: string | undefined): string {
    const t = (text || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (t.length <= DESC_LIMIT) return t;
    return t.slice(0, t.lastIndexOf(" ", DESC_LIMIT)).replace(/[,;:.]$/, "") + "…";
}

/** Same slug rule the festival pages use (app/page.tsx, app/festivals/[slug]). */
function festivalSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

function placeGroup(category: string): MarkerGroup {
    switch (category) {
        case "Fort":
        case "Palace":
        case "Heritage":
        case "Museum":
            return "heritage";
        case "Lake":
            return "lake";
        case "Nature":
        case "Wildlife":
            return "nature";
        case "Spiritual":
        case "Temple":
            return "spiritual";
        case "Desert":
            return "desert";
        default:
            return "heritage";
    }
}

/**
 * Spreads markers that share one city centre around it on a small golden-angle spiral,
 * so they separate when the camera zooms in instead of stacking on one point.
 */
function spread(lat: number, lng: number, index: number): [number, number] {
    if (index === 0) return [lat, lng];
    const r = 0.035 * Math.sqrt(index);
    const a = index * 2.39996;
    return [lat + r * Math.sin(a), lng + r * Math.cos(a)];
}

function km(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const r = Math.PI / 180;
    const x = (lng2 - lng1) * r * Math.cos(((lat1 + lat2) / 2) * r);
    const y = (lat2 - lat1) * r;
    return Math.sqrt(x * x + y * y) * 6371;
}

/** Many place records carry this placeholder instead of their real coordinates. */
const PLACEHOLDER_COORDS: [number, number] = [26.922, 75.806];

/**
 * Best-known coordinates for a place. Falls back to its city's centre when the record
 * has the placeholder, is outside Rajasthan, or is implausibly far from its own city.
 */
function placeCoords(p: (typeof PLACES)[number]): [number, number] | null {
    const lat = p.location?.latitude;
    const lng = p.location?.longitude;
    const city = cityCoords(p.city);
    const valid =
        typeof lat === "number" &&
        typeof lng === "number" &&
        !(lat === PLACEHOLDER_COORDS[0] && lng === PLACEHOLDER_COORDS[1]) &&
        inRajasthan(lat, lng) &&
        (!city || km(lat, lng, city[0], city[1]) < 80);
    if (valid) return [lat, lng];
    return city ?? null;
}

function placeMarkers(): MapMarker[] {
    const hiById = new Map(PLACES_HINDI.map((p) => [p.id, p]));
    // Places that land on the same point get fanned out around it
    const stacked = new Map<string, number>();
    const ordered = [...PLACES].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || b.rating - a.rating);
    return ordered.flatMap((p) => {
        const c = placeCoords(p);
        if (!c) return [];
        const key = `${c[0].toFixed(3)},${c[1].toFixed(3)}`;
        const n = stacked.get(key) ?? 0;
        stacked.set(key, n + 1);
        const [lat, lng] = spread(c[0], c[1], n);
        const hi = hiById.get(p.id);
        const marker: MapMarker = {
            id: `place-${p.id}`,
            mode: "places",
            group: placeGroup(p.category),
            href: `/places/${p.slug}`,
            name: p.name,
            nameHi: hi?.name || p.name,
            city: p.city,
            cityHi: hi?.city || p.city,
            category: p.category,
            categoryHi: hi?.category || p.category,
            description: clip(p.description),
            descriptionHi: clip(hi?.description || p.description),
            image: (p.images || []).map(realImage).find(Boolean),
            rating: p.rating,
            bestTime: p.bestTimeToVisit?.months,
            bestTimeHi: hi?.bestTimeToVisit?.months || p.bestTimeToVisit?.months,
            lat,
            lng,
            priority: (p.isFeatured ? 100 : 0) + (p.isUNESCO ? 30 : 0) + p.rating * 10 + Math.log10((p.reviews || 0) + 1) * 4,
            featured: p.isFeatured,
        };
        return [marker];
    });
}

function festivalMarkers(): MapMarker[] {
    const hiById = new Map((FESTIVALS_HINDI as typeof FESTIVALS).map((f) => [f.id, f]));
    const perCity = new Map<string, number>();
    return FESTIVALS.flatMap((f) => {
        const c = cityCoords(f.location);
        if (!c) return [];
        const n = perCity.get(f.location) ?? 0;
        perCity.set(f.location, n + 1);
        const [lat, lng] = spread(c[0], c[1], n);
        const hi = hiById.get(f.id);
        const marker: MapMarker = {
            id: `festival-${f.id}`,
            mode: "festivals",
            group: "festival",
            href: `/festivals/${festivalSlug(f.name)}`,
            name: f.name,
            nameHi: hi?.name || f.name,
            city: f.location,
            cityHi: hi?.location || f.location,
            category: f.month,
            categoryHi: hi?.month || f.month,
            description: clip(f.description),
            descriptionHi: clip(hi?.description || f.description),
            image: realImage(f.image),
            rating: f.rating,
            bestTime: [f.month, f.duration].filter(Boolean).join(" · "),
            bestTimeHi: [hi?.month || f.month, hi?.duration || f.duration].filter(Boolean).join(" · "),
            month: f.month,
            nextDate: f.nextDate,
            lat,
            lng,
            priority: (f.isFeatured ? 100 : 0) + (f.rating || 0) * 10,
            featured: f.isFeatured,
        };
        return [marker];
    });
}

function shoppingMarkers(): MapMarker[] {
    const hiById = new Map(RAJASTHAN_SHOPPING_HINDI.districts.map((d) => [d.id, d]));
    return RAJASTHAN_SHOPPING.districts.flatMap((d) => {
        const c = cityCoords(d.district);
        if (!c) return [];
        const hi = hiById.get(d.id);
        const markets = d.shoppingPlaces;
        const top = markets.slice(0, 3).map((m) => m.name).join(", ");
        const topHi = (hi?.shoppingPlaces || markets).slice(0, 3).map((m) => m.name).join(", ");
        const image = markets.find((m) => "image" in m && m.image) as { image?: string } | undefined;
        const marker: MapMarker = {
            id: `shopping-${d.id}`,
            mode: "shopping",
            group: "shopping",
            href: `/shopping/${d.slug}`,
            name: `${d.district} Markets`,
            nameHi: `${hi?.district || d.district} बाज़ार`,
            city: d.district,
            cityHi: hi?.district || d.district,
            category: `${markets.length} markets`,
            categoryHi: `${markets.length} बाज़ार`,
            description: clip(`${d.description}. Top picks: ${top}.`),
            descriptionHi: clip(`${hi?.description || d.description}। प्रमुख: ${topHi}।`),
            image: realImage(image?.image),
            lat: c[0],
            lng: c[1],
            priority: markets.length + (/rural/i.test(d.district) ? 0 : 20),
        };
        return [marker];
    });
}

/**
 * A photo reused by 8+ records of one layer is a generic fallback (e.g. one Pushkar photo on 17 festivals),
 * not a photo of that place
 * (shared venue photos — e.g. three festivals at Mehrangarh — stay).
 * Those pins show their category icon instead (never a misleading picture).
 */
function dropStockPhotos(markers: MapMarker[]): MapMarker[] {
    const key = (m: MapMarker) => `${m.mode}|${m.image}`;
    const uses = new Map<string, number>();
    for (const m of markers) if (m.image && m.mode !== "shopping") uses.set(key(m), (uses.get(key(m)) ?? 0) + 1);
    return markers.map((m) => (m.image && m.mode !== "shopping" && (uses.get(key(m)) ?? 0) >= 8 ? { ...m, image: undefined } : m));
}

export function getMapMarkers(): MapMarker[] {
    return dropStockPhotos([...placeMarkers(), ...festivalMarkers(), ...shoppingMarkers()]);
}
