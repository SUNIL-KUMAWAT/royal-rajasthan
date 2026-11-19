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

type AnyFestival = { id: number; name: string } & Record<string, any>;

export function toFestivalCards(list: AnyFestival[], english: AnyFestival[] = list): FestivalCard[] {
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
