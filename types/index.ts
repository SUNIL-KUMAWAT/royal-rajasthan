export interface Destination {
    id: number;
    name: string;
    slug: string;
    nickname: string;
    description: string;
    longDescription: string;
    image: string;
    coverImage: string;
    gallery: string[];
    rating: number;
    reviews: number;
    bestTime: string;
    temperature: string;
    category: string;
    attractions: string[];
    highlights: string[];
    distance: string;
    duration: string;
    price: number;
    tags: string[];
    isFeatured: boolean;
    isPopular: boolean;
    coordinates: { lat: number; lng: number };
}

export interface Attraction {
    id: number;
    name: string;
    slug: string;
    location: string;
    category: string;
    description: string;
    image: string;
    rating: number;
    reviews: number;
    entryFee: { indian: number; foreigner: number };
    timing: string;
    bestTime: string;
    duration: string;
    tags: string[];
    highlights: string[];
    isFeatured: boolean;
}

export interface Package {
    id: number;
    name: string;
    slug: string;
    category: string;
    duration: string;
    cities: string[];
    price: number;
    originalPrice: number;
    discount: number;
    groupSize: string;
    image: string;
    rating: number;
    reviews: number;
    inclusions: string[];
    exclusions: string[];
    highlights: string[];
    itinerary: ItineraryDay[];
    isFeatured: boolean;
    isPopular: boolean;
    badge: string;
}

export interface ItineraryDay {
    day: number;
    title: string;
    description: string;
}

export interface Festival {
    id: number;
    name: string;
    location: string;
    month: string;
    duration: string;
    description: string;
    image: string;
    highlights: string[];
    nextDate: string;
    rating: number;
    isFeatured: boolean;
}

export interface Hotel {
    id: number;
    name: string;
    location: string;
    category: string;
    stars: number;
    rating: number;
    reviews: number;
    price: number;
    image: string;
    amenities: string[];
    description: string;
    isFeatured: boolean;
}

export interface Testimonial {
    id: number;
    name: string;
    country: string;
    avatar: string;
    rating: number;
    tour: string;
    review: string;
    date: string;
    isFeatured: boolean;
}

export interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    category: string;
    location: string;
}

export interface Experience {
    id: number;
    title: string;
    icon: string;
    description: string;
    color: string;
}

export interface Statistic {
    label: string;
    value: number;
    suffix: string;
}