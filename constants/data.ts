// constants/data.ts
import { Place, Destination } from "../types";
export type { Place, Destination };

export { PLACES } from './places';
export { PLACES_HINDI } from './places-hindi';
export { RAJASTHAN_SHOPPING } from './shopping';
export { RAJASTHAN_SHOPPING_HINDI } from './shopping-hindi';
export { FESTIVALS } from './festivals';
export { FESTIVALS_HINDI } from './festivals-hindi';
export { DESTINATIONS } from './destinations';

export const CATEGORIES = [
    "All",
    "Fort",
    "Palace",
    "Temple",
    "Lake",
    "Desert",
    "Wildlife",
    "Hill Station",
    "Heritage",
    "Museum",
    "Adventure",
    "Festival",
    "Spiritual",
    "UNESCO"
];

export const CITIES = [
    "All Cities",

    // District Headquarters
    "Ajmer",
    "Alwar",
    "Anupgarh",
    "Balotra",
    "Banswara",
    "Baran",
    "Barmer",
    "Beawar",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittorgarh",
    "Churu",
    "Dausa",
    "Deeg",
    "Dholpur",
    "Didwana-Kuchaman",
    "Dungarpur",
    "Gangapur City",
    "Hanumangarh",
    "Jaipur",
    "Jaisalmer",
    "Jalore",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Karauli",
    "Kekri",
    "Khairthal-Tijara",
    "Kota",
    "Kotputli-Behror",
    "Nagaur",
    "Neem Ka Thana",
    "Pali",
    "Phalodi",
    "Pratapgarh",
    "Rajsamand",
    "Salumbar",
    "Sanchore",
    "Sawai Madhopur",
    "Shahpura",
    "Sikar",
    "Sirohi",
    "Sri Ganganagar",
    "Tonk",
    "Udaipur",

    // Popular Tourist Towns
    "Pushkar",
    "Mount Abu",
    "Nathdwara",
    "Ranakpur",
    "Kumbhalgarh",
    "Osian",
    "Mandawa",
    "Nawalgarh",
    "Fatehpur",
    "Sam",
    "Pokaran",
    "Abhaneri",
    "Deogarh",
    "Rawla",
    "Lachhmangarh",
    "Rishabhdeo",
    "Kolayat",
    "Deshnok",
    "Ramdevra"
];

export const STATISTICS = [
    {
        label: "Destinations",
        value: 1200,
        suffix: "+",
    },
    {
        label: "Royal Forts",
        value: 250,
        suffix: "+",
    },
    {
        label: "Magnificent Palaces",
        value: 150,
        suffix: "+",
    },
    {
        label: "Colorful Festivals",
        value: 100,
        suffix: "+",
    },
    {
        label: "UNESCO Heritage Sites",
        value: 6,
        suffix: "",
    },
    {
        label: "Annual Tourists",
        value: 55,
        suffix: "M+",
    }
];

export const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Places", href: "/places" },
    { name: "Plan Trip", href: "/plan-trip" },
    { name: "Shopping", href: "/shopping" },
    { name: "Festivals", href: "/culture" },
];

export const HERO_SLIDES = [
    {
        id: 1,
        image: "https://picsum.photos/seed/raj-1/800/600",
        title: "Discover the Land of Kings",
        subtitle: "Amber Fort, Jaipur",
        description:
            "Experience timeless palaces, golden deserts, vibrant festivals, and unforgettable journeys",
    },
    {
        id: 2,
        image: "https://picsum.photos/seed/raj-2/800/600",
        title: "The Blue City Awaits",
        subtitle: "Mehrangarh Fort, Jodhpur",
        description:
            "Rise above the blue-painted streets and witness the majesty of Rajputana",
    },
    {
        id: 3,
        image: "https://picsum.photos/seed/raj-3/800/600",
        title: "City of Lakes & Dreams",
        subtitle: "Lake Pichola, Udaipur",
        description:
            "Float on mirror-calm waters surrounded by palaces that touch the sky",
    },
    {
        id: 4,
        image: "https://picsum.photos/seed/raj-4/800/600",
        title: "Golden City of the Desert",
        subtitle: "Jaisalmer Fort, Jaisalmer",
        description:
            "Where the golden sandstone fort glows at sunset over the vast Thar Desert",
    },
    {
        id: 5,
        image: "https://picsum.photos/seed/raj-5/800/600",
        title: "Palace of the Winds",
        subtitle: "Hawa Mahal, Jaipur",
        description:
            "Marvel at the iconic 953-windowed honeycomb facade of the magnificent Palace of the Winds",
    },
    {
        id: 6,
        image: "https://picsum.photos/seed/raj-6/800/600",
        title: "Fortress of Valor & Sacrifice",
        subtitle: "Chittorgarh Fort, Chittorgarh",
        description:
            "Walk through the legendary fortress that echoes tales of Rajput bravery and sacrifice",
    },
    {
        id: 7,
        image: "https://picsum.photos/seed/raj-7/800/600",
        title: "Wilderness of the Royal Bengal",
        subtitle: "Ranthambore National Park, Sawai Madhopur",
        description:
            "Witness the majestic Royal Bengal Tiger roaming freely in its natural jungle habitat",
    },
    {
        id: 8,
        image: "https://picsum.photos/seed/raj-8/800/600",
        title: "Sacred Heart of Rajasthan",
        subtitle: "Pushkar Lake, Pushkar",
        description:
            "Discover the holy ghats and sacred waters of one of India's most divine pilgrimage sites",
    }
];

export const GALLERY_IMAGES = [
    { id: 1, src: "https://picsum.photos/seed/raj-9/800/600", alt: "Amber Fort", category: "Forts", location: "Jaipur" },
    { id: 2, src: "https://picsum.photos/seed/raj-10/800/600", alt: "Hawa Mahal", category: "Palaces", location: "Jaipur" },
    { id: 3, src: "https://picsum.photos/seed/raj-11/800/600", alt: "Mehrangarh Fort", category: "Forts", location: "Jodhpur" },
    { id: 4, src: "https://picsum.photos/seed/raj-12/800/600", alt: "Lake Pichola", category: "Lakes", location: "Udaipur" },
    { id: 5, src: "https://picsum.photos/seed/raj-13/800/600", alt: "Jaisalmer Fort", category: "Forts", location: "Jaisalmer" },
    { id: 6, src: "https://picsum.photos/seed/raj-14/800/600", alt: "Ranthambore Tiger", category: "Wildlife", location: "Sawai Madhopur" },
    { id: 7, src: "https://picsum.photos/seed/raj-15/800/600", alt: "Pushkar Lake", category: "Temples", location: "Pushkar" },
    { id: 8, src: "https://picsum.photos/seed/raj-16/800/600", alt: "Udaipur Palace", category: "Palaces", location: "Udaipur" },
    { id: 9, src: "https://picsum.photos/seed/raj-17/800/600", alt: "Desert Dunes", category: "Desert", location: "Jaisalmer" },
    { id: 10, src: "https://picsum.photos/seed/raj-18/800/600", alt: "Jaipur City", category: "Cities", location: "Jaipur" },
    { id: 11, src: "https://picsum.photos/seed/raj-19/800/600", alt: "Festival", category: "Festivals", location: "Rajasthan" },
    { id: 12, src: "https://picsum.photos/seed/raj-20/800/600", alt: "Bikaner Fort", category: "Forts", location: "Bikaner" }
];

export const CATEGORIES_HINDI = [
    "सभी",
    "किला",
    "पैलेस",
    "मंदिर",
    "झील",
    "रेगिस्तान",
    "वन्यजीव",
    "हिल स्टेशन",
    "विरासत",
    "संग्रहालय",
    "रोमांच",
    "त्यौहार",
    "आध्यात्मिक",
    "यूनेस्को"
];

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

export const HOTELS: Hotel[] = [
    {
        id: 1,
        name: "Rambagh Palace",
        location: "Jaipur",
        category: "Luxury Palace Hotel",
        stars: 5,
        rating: 4.9,
        reviews: 3456,
        price: 25000,
        image:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        amenities: ["Pool", "Spa", "Restaurant", "Bar", "Gym", "WiFi"],
        description:
            "The jewel of Jaipur, a luxury palace hotel that was once the residence of the Maharaja of Jaipur.",
        isFeatured: true,
    },
    {
        id: 2,
        name: "Taj Lake Palace",
        location: "Udaipur",
        category: "Heritage Palace Hotel",
        stars: 5,
        rating: 5.0,
        reviews: 4521,
        price: 35000,
        image:
            "https://images.unsplash.com/photo-1571003123771-bd6a099d28ab?w=800",
        amenities: ["Lake View", "Pool", "Spa", "Fine Dining", "Boat Ride", "WiFi"],
        description:
            "The world's most romantic hotel floating on Lake Pichola, built in 1746 as a summer palace.",
        isFeatured: true,
    },
    {
        id: 3,
        name: "Umaid Bhawan Palace",
        location: "Jodhpur",
        category: "Luxury Palace Hotel",
        stars: 5,
        rating: 4.9,
        reviews: 2890,
        price: 28000,
        image:
            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
        amenities: ["Museum", "Pool", "Spa", "Restaurant", "Tennis", "WiFi"],
        description:
            "A magnificent Art Deco palace still home to the Jodhpur royal family, now a luxury hotel.",
        isFeatured: true,
    },
    {
        id: 4,
        name: "Suryagarh Jaisalmer",
        location: "Jaisalmer",
        category: "Desert Luxury Resort",
        stars: 5,
        rating: 4.8,
        reviews: 1876,
        price: 18000,
        image:
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
        amenities: ["Desert View", "Pool", "Spa", "Cultural Shows", "Safari", "WiFi"],
        description:
            "A luxury desert fortress hotel offering an immersive Rajasthani experience.",
        isFeatured: true,
    },
];

export const STATISTICS_HINDI = [
    {
        "label": "पर्यटन स्थल",
        "value": 1200,
        "suffix": "+"
    },
    {
        "label": "शाही किले",
        "value": 250,
        "suffix": "+"
    },
    {
        "label": "शानदार महल",
        "value": 150,
        "suffix": "+"
    },
    {
        "label": "रंगीन त्यौहार",
        "value": 100,
        "suffix": "+"
    },
    {
        "label": "यूनेस्को धरोहर",
        "value": 6,
        "suffix": ""
    },
    {
        "label": "सालाना पर्यटक",
        "value": 55,
        "suffix": "M+"
    }
];

export const NAV_LINKS_HINDI = [
    {
        "name": "Home",
        "href": "/"
    },
    {
        "name": "जगहें",
        "href": "/places"
    },
    {
        "name": "ट्रिप प्लान",
        "href": "/plan-trip"
    },
    {
        "name": "शॉपिंग",
        "href": "/shopping"
    },
    {
        "name": "त्यौहार",
        "href": "/culture"
    }
];






export const PACKAGES = [
    {
        id: 1,
        name: "Royal Rajasthan Heritage Tour",
        slug: "royal-heritage-tour",
        category: "Heritage Tours",
        duration: "10 Days / 9 Nights",
        cities: ["Jaipur", "Jodhpur", "Jaisalmer", "Udaipur"],
        price: 45000,
        originalPrice: 60000,
        discount: 25,
        groupSize: "2-15 People",
        image:
            "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
        rating: 4.9,
        reviews: 342,
        inclusions: [
            "AC Hotel Accommodation",
            "Daily Breakfast",
            "All Transfers",
            "Expert Guide",
            "Monument Fees",
        ],
        exclusions: ["Flights", "Lunch & Dinner", "Personal Expenses"],
        highlights: [
            "Amber Fort",
            "Hawa Mahal",
            "Mehrangarh Fort",
            "Jaisalmer Fort",
            "City Palace",
            "Lake Pichola",
        ],
        itinerary: [
            {
                day: 1,
                title: "Arrive in Jaipur",
                description:
                    "Arrival at Jaipur airport, hotel check-in, evening at leisure.",
            },
            {
                day: 2,
                title: "Jaipur Sightseeing",
                description: "Visit Amber Fort, Hawa Mahal, City Palace, Jantar Mantar.",
            },
            {
                day: 3,
                title: "Jaipur to Jodhpur",
                description: "Drive to Jodhpur. Evening visit to Mehrangarh Fort.",
            },
            {
                day: 4,
                title: "Jodhpur Exploration",
                description: "Jaswant Thada, Umaid Bhawan Palace, Clock Tower Bazaar.",
            },
            {
                day: 5,
                title: "Jodhpur to Jaisalmer",
                description: "Drive to Jaisalmer, explore the Golden Fort.",
            },
            {
                day: 6,
                title: "Desert Safari",
                description: "Sam Sand Dunes camel safari, desert camping.",
            },
            {
                day: 7,
                title: "Jaisalmer to Udaipur",
                description: "Fly to Udaipur, check-in at lake-facing hotel.",
            },
            {
                day: 8,
                title: "Udaipur City Tour",
                description: "City Palace, Lake Pichola boat ride, Saheliyon Ki Bari.",
            },
            {
                day: 9,
                title: "Udaipur Leisure",
                description: "Sajjangarh Palace, local markets, farewell dinner.",
            },
            {
                day: 10,
                title: "Departure",
                description: "Transfer to airport. Tour ends.",
            },
        ],
        isFeatured: true,
        isPopular: true,
        badge: "Best Seller",
    },
    {
        id: 2,
        name: "Desert Safari Adventure",
        slug: "desert-safari-adventure",
        category: "Desert Safari Tours",
        duration: "5 Days / 4 Nights",
        cities: ["Jaisalmer", "Bikaner"],
        price: 22000,
        originalPrice: 28000,
        discount: 21,
        groupSize: "2-10 People",
        image:
            "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
        rating: 4.8,
        reviews: 215,
        inclusions: [
            "Desert Camp Stay",
            "Camel Safari",
            "Jeep Safari",
            "All Meals",
            "Cultural Programs",
        ],
        exclusions: ["Flights", "Personal Expenses", "Travel Insurance"],
        highlights: [
            "Sam Dunes",
            "Camel Safari",
            "Desert Camping",
            "Folk Music",
            "Star Gazing",
        ],
        itinerary: [
            {
                day: 1,
                title: "Arrive in Jaisalmer",
                description: "Airport pickup, hotel check-in, fort exploration.",
            },
            {
                day: 2,
                title: "Jaisalmer City Tour",
                description: "Jaisalmer Fort, Patwon Ki Haveli, Gadisar Lake.",
            },
            {
                day: 3,
                title: "Desert Safari Day",
                description: "Sam Sand Dunes, camel safari, desert camp, cultural evening.",
            },
            {
                day: 4,
                title: "Bikaner Transfer",
                description: "Drive to Bikaner, Junagarh Fort, camel farm.",
            },
            {
                day: 5,
                title: "Departure",
                description: "Morning transfer to station/airport.",
            },
        ],
        isFeatured: true,
        isPopular: true,
        badge: "Adventure",
    },
    {
        id: 3,
        name: "Romantic Udaipur Honeymoon",
        slug: "udaipur-honeymoon",
        category: "Honeymoon Packages",
        duration: "5 Days / 4 Nights",
        cities: ["Udaipur"],
        price: 35000,
        originalPrice: 45000,
        discount: 22,
        groupSize: "2 People (Couples)",
        image:
            "https://images.unsplash.com/photo-1586183189334-f83f4929f5c7?w=800",
        rating: 4.9,
        reviews: 498,
        inclusions: [
            "Luxury Lake View Hotel",
            "Candlelight Dinners",
            "Boat Rides",
            "Spa Treatment",
            "Floral Decorations",
        ],
        exclusions: ["Flights", "Personal Shopping", "Extra Activities"],
        highlights: [
            "Lake Palace",
            "City Palace",
            "Boat Rides",
            "Spa",
            "Sunset Views",
        ],
        itinerary: [
            {
                day: 1,
                title: "Romantic Arrival",
                description: "Couple's welcome, lake view hotel, candlelight dinner.",
            },
            {
                day: 2,
                title: "City Palace & Lake Cruise",
                description: "City Palace, Lake Pichola boat ride, sunset cruise.",
            },
            {
                day: 3,
                title: "Spa & Leisure",
                description: "Couple's spa, Sajjangarh Palace, local market shopping.",
            },
            {
                day: 4,
                title: "Hidden Gems",
                description: "Ranakpur Temples, Kumbhalgarh Fort, farewell dinner.",
            },
            {
                day: 5,
                title: "Departure",
                description: "Breakfast, transfer to airport.",
            },
        ],
        isFeatured: true,
        isPopular: true,
        badge: "Honeymoon",
    },
    {
        id: 4,
        name: "Luxury Rajasthan Grand Tour",
        slug: "luxury-grand-tour",
        category: "Luxury Rajasthan Tours",
        duration: "14 Days / 13 Nights",
        cities: ["Jaipur", "Jodhpur", "Jaisalmer", "Udaipur", "Pushkar", "Bikaner"],
        price: 120000,
        originalPrice: 150000,
        discount: 20,
        groupSize: "2-8 People",
        image:
            "https://images.unsplash.com/photo-1477587458883-47145ed94a3e?w=800",
        rating: 5.0,
        reviews: 89,
        inclusions: [
            "5-Star Palace Hotels",
            "Private Transfers",
            "All Meals",
            "Private Guide",
            "Helicopter Ride",
            "Elephant Experience",
        ],
        exclusions: ["International Flights", "Visa"],
        highlights: [
            "Palace Hotels",
            "Private Tours",
            "Helicopter Ride",
            "Exclusive Experiences",
        ],
        itinerary: [],
        isFeatured: true,
        isPopular: false,
        badge: "Luxury",
    },
    {
        id: 5,
        name: "Rajasthan Wildlife Safari",
        slug: "wildlife-safari",
        category: "Wildlife Tours",
        duration: "7 Days / 6 Nights",
        cities: ["Ranthambore", "Bharatpur", "Sariska"],
        price: 38000,
        originalPrice: 48000,
        discount: 21,
        groupSize: "2-12 People",
        image:
            "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=800",
        rating: 4.7,
        reviews: 156,
        inclusions: [
            "Wildlife Resort",
            "Safari Charges",
            "All Meals",
            "Naturalist Guide",
            "Park Fees",
        ],
        exclusions: ["Flights", "Tips", "Personal Expenses"],
        highlights: [
            "Tiger Safari",
            "Bird Watching",
            "Jeep Safari",
            "Nature Walks",
        ],
        itinerary: [],
        isFeatured: false,
        isPopular: true,
        badge: "Wildlife",
    },
    {
        id: 6,
        name: "Rajasthan Family Adventure",
        slug: "family-adventure",
        category: "Family Tours",
        duration: "8 Days / 7 Nights",
        cities: ["Jaipur", "Ranthambore", "Udaipur"],
        price: 32000,
        originalPrice: 42000,
        discount: 24,
        groupSize: "Family (4-6 People)",
        image:
            "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
        rating: 4.8,
        reviews: 267,
        inclusions: [
            "Family Rooms",
            "Kids Activities",
            "All Transfers",
            "Daily Breakfast",
            "Entry Fees",
        ],
        exclusions: ["Flights", "Lunch & Dinner", "Camel Rides"],
        highlights: [
            "Elephant Experience",
            "Tiger Safari",
            "Fort Visits",
            "Cultural Shows",
        ],
        itinerary: [],
        isFeatured: false,
        isPopular: true,
        badge: "Family",
    },
];
