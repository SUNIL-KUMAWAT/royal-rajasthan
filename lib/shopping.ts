import { RAJASTHAN_SHOPPING } from "@/constants/shopping";
import { slugify } from "@/lib/shopping-utils";

export { SITE_URL, slugify, mapsSearchUrl, getDistrictFaqs } from "@/lib/shopping-utils";

type District = (typeof RAJASTHAN_SHOPPING.districts)[number];
type Place = District["shoppingPlaces"][number];

export interface ShoppingEntry {
    slug: string;
    place: Place;
    district: string;
    districtSlug: string;
    /** false for generic names ("City Center", "Sadar Bazaar"...) shared by many districts */
    indexable: boolean;
}

/** A base slug used in this many districts or more is a generic placeholder name. */
const GENERIC_DISTRICT_THRESHOLD = 3;

function build() {
    const districtsByBase = new Map<string, Set<string>>();
    for (const d of RAJASTHAN_SHOPPING.districts) {
        for (const p of d.shoppingPlaces) {
            const base = slugify(p.name);
            if (!districtsByBase.has(base)) districtsByBase.set(base, new Set());
            districtsByBase.get(base)!.add(d.slug);
        }
    }

    const districtSlugs = new Set(RAJASTHAN_SHOPPING.districts.map((d) => d.slug));
    const bySlug = new Map<string, ShoppingEntry>();
    const slugById = new Map<string, string>();
    // base slug -> district that owns the un-prefixed URL
    const baseOwner = new Map<string, string>();

    for (const d of RAJASTHAN_SHOPPING.districts) {
        for (const p of d.shoppingPlaces) {
            const base = slugify(p.name);
            const owner = baseOwner.get(base);
            let slug: string;
            if (owner === undefined) {
                // First occurrence keeps the original URL so existing links keep working
                baseOwner.set(base, d.slug);
                slug = base;
            } else if (owner === d.slug) {
                // Duplicate entry within the same district: point it at the existing page
                slugById.set(p.id, base);
                continue;
            } else {
                slug = `${d.slug}-${base}`;
            }

            if (bySlug.has(slug) || districtSlugs.has(slug)) {
                slugById.set(p.id, slug);
                continue;
            }

            bySlug.set(slug, {
                slug,
                place: p,
                district: d.district,
                districtSlug: d.slug,
                indexable: districtsByBase.get(base)!.size < GENERIC_DISTRICT_THRESHOLD,
            });
            slugById.set(p.id, slug);
        }
    }

    return { bySlug, slugById };
}

const { bySlug, slugById } = build();

export const getShoppingEntry = (slug: string) => bySlug.get(slug);

export const getAllShoppingEntries = () => Array.from(bySlug.values());

/** URL slug for a shopping place id (works for English and Hindi data, ids are shared). */
export const getPlaceSlug = (id: string, fallbackName: string) =>
    slugById.get(id) ?? slugify(fallbackName);

export const getShoppingDistrict = (slug: string) =>
    RAJASTHAN_SHOPPING.districts.find((d) => d.slug === slug || slugify(d.district) === slug);

/** Link targets for names listed in a place's relatedPlaces (same district preferred). */
export function getRelatedLinks(entry: ShoppingEntry) {
    const names: string[] = (entry.place as any).relatedPlaces || [];
    const all = getAllShoppingEntries();
    return names
        .map((name) => {
            const base = slugify(name);
            const match =
                all.find((e) => slugify(e.place.name) === base && e.districtSlug === entry.districtSlug) ||
                all.find((e) => slugify(e.place.name) === base);
            return match && match.slug !== entry.slug ? { name: match.place.name, slug: match.slug } : null;
        })
        .filter((x): x is { name: string; slug: string } => x !== null);
}

/** Other markets in the same district. */
export function getDistrictSiblings(entry: ShoppingEntry, limit = 8) {
    return getAllShoppingEntries()
        .filter((e) => e.districtSlug === entry.districtSlug && e.slug !== entry.slug)
        .slice(0, limit)
        .map((e) => ({ name: e.place.name, slug: e.slug }));
}

/** Card-sized record for listing pages; keeps heavy fields (faqs, history...) out of client bundles. */
export interface ShoppingCard {
    id: string;
    slug: string;
    name: string;
    district: string;
    districtSlug: string;
    type: string;
    description: string;
    famousFor: string[];
    timings: string;
    priceRange: string;
    image: string;
    imageRepresentative: boolean;
}

type AnyShoppingData = { districts: { district: string; slug: string; shoppingPlaces: any[] }[] };

export function toShoppingCards(data: AnyShoppingData): ShoppingCard[] {
    return data.districts.flatMap((d) =>
        d.shoppingPlaces.map((p) => ({
            id: p.id,
            slug: getPlaceSlug(p.id, p.name),
            name: p.name,
            district: d.district,
            districtSlug: d.slug,
            type: p.type,
            description: p.description,
            famousFor: p.famousFor || [],
            timings: p.timings || "",
            priceRange: p.priceRange || "",
            image: p.image,
            imageRepresentative: !!p.imageRepresentative,
        }))
    );
}
