import type { Place } from "@/types";

/** Card-sized place record for listing pages (no history / gallery), keeps client bundles small. */
export type PlaceCard = Pick<
    Place,
    | "id" | "name" | "slug" | "city" | "category" | "description" | "rating"
    | "tags" | "isUNESCO" | "isOpen" | "visitDuration" | "bestTimeToVisit"
    | "reviews" | "isFeatured" | "yearBuilt" | "images"
> & {
    // Long "note" texts are only shown on the detail page
    timing: Omit<Place["timing"], "note">;
    ticket: Omit<Place["ticket"], "note">;
};

export function toPlaceCards(places: Place[]): PlaceCard[] {
    return places.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        city: p.city,
        category: p.category,
        description: p.description,
        rating: p.rating,
        reviews: p.reviews,
        isFeatured: p.isFeatured,
        timing: { open: p.timing.open, close: p.timing.close, closedOn: p.timing.closedOn },
        ticket: {
            isFree: p.ticket.isFree,
            indian: p.ticket.indian,
            foreigner: p.ticket.foreigner,
            childIndian: p.ticket.childIndian,
            childForeigner: p.ticket.childForeigner,
            camera: p.ticket.camera,
        },
        tags: p.tags || [],
        isUNESCO: p.isUNESCO,
        isOpen: p.isOpen,
        visitDuration: p.visitDuration,
        bestTimeToVisit: p.bestTimeToVisit,
        yearBuilt: p.yearBuilt,
        images: (p.images || []).slice(0, 1),
    }));
}

/** Fields the trip planner needs to build an itinerary. */
export type TripPlace = Pick<
    Place,
    "id" | "name" | "slug" | "city" | "category" | "rating" | "ticket" | "timing" | "visitDuration" | "location" | "images"
>;

export function toTripPlaces(places: Place[]): TripPlace[] {
    return places.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        city: p.city,
        category: p.category,
        rating: p.rating,
        ticket: p.ticket,
        timing: p.timing,
        visitDuration: p.visitDuration,
        location: p.location,
        images: (p.images || []).slice(0, 1),
    }));
}
