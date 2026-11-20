/** Card-sized festival records for listing sections (keeps the multi-MB datasets out of client bundles). */
export interface FestivalCard {
    id: number;
    name: string;
    /** English name, used to build the /festivals/<slug> link in either language */
    engName: string;
    image: string;
    location: string;
    month: string;
    duration: string;
    description: string;
    highlights: string[];
    rating: number;
    nextDate?: string;
    isFeatured?: boolean;
}

/** The fields read from either the English or Hindi festival dataset. */
type FestivalSource = Omit<FestivalCard, "engName" | "highlights"> & { highlights?: string[] };

export function toFestivalCards(list: FestivalSource[], english: FestivalSource[] = list): FestivalCard[] {
    return list.map((f) => ({
        id: f.id,
        name: f.name,
        engName: english.find((e) => e.id === f.id)?.name || f.name,
        image: f.image,
        location: f.location,
        month: f.month,
        duration: f.duration,
        description: f.description,
        highlights: f.highlights || [],
        rating: f.rating,
        nextDate: f.nextDate,
        isFeatured: f.isFeatured,
    }));
}
