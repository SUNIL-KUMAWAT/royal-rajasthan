// Shared types for the 3D map (no data imports — safe for client bundles).

export type MapMode = "places" | "festivals" | "shopping";

/** Visual family of a marker — drives its colour and icon. */
export type MarkerGroup = "heritage" | "nature" | "spiritual" | "lake" | "desert" | "festival" | "shopping";

export interface MapMarker {
    id: string;
    mode: MapMode;
    group: MarkerGroup;
    /** Language-neutral link, e.g. "/places/amber-fort" (LocalizedLink adds /hi). */
    href: string;
    name: string;
    nameHi: string;
    city: string;
    cityHi: string;
    /** Category label (places), month (festivals) or "Market" (shopping). */
    category: string;
    categoryHi: string;
    description: string;
    descriptionHi: string;
    image?: string;
    rating?: number;
    /** Best time to visit (places) or next date / duration (festivals). */
    bestTime?: string;
    bestTimeHi?: string;
    /** Festivals: month name in English, used for the month filter. */
    month?: string;
    /** Festivals: ISO next date when known. */
    nextDate?: string;
    lat: number;
    lng: number;
    /** Higher wins when markers cluster on screen. */
    priority: number;
    featured?: boolean;
}
