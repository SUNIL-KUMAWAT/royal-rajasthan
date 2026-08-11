// app/festivals/page.tsx
import type { Metadata } from "next";
import { FestivalsSection } from "@/components/home/FestivalsSection";
import { ExploreMoreSection } from "@/components/shared/ExploreMoreSection";

export const metadata: Metadata = {
    title: "Rajasthan Festivals & Culture - Complete Guide | Rajasthan Tourism Places",
    description:
        "Discover the vibrant festivals of Rajasthan - Pushkar Camel Fair, Desert Festival, Teej, Gangaur & more. Complete guide with dates, highlights, timings & travel tips.",
    keywords: [
        "Rajasthan festivals",
        "Pushkar Camel Fair",
        "Desert Festival Jaisalmer",
        "Teej Festival Jaipur",
        "Gangaur Festival Udaipur",
        "Rajasthan culture",
        "festivals in Rajasthan 2024",
        "Rajasthan cultural events",
        "best festivals in Rajasthan",
        "Rajasthan folk dance",
        "Rajasthan traditions",
        "colorful festivals India",
        "Rajasthan celebrations",
    ],
    openGraph: {
        title: "Rajasthan Festivals & Culture - Celebrate with the Land of Kings",
        description:
            "Experience centuries-old traditions, vibrant celebrations, royal processions and unforgettable cultural festivals of Rajasthan.",
        images: [
            {
                url: "https://picsum.photos/seed/raj-1107/800/600",
                width: 1200,
                height: 630,
                alt: "Rajasthan Festivals - Rajasthan Tourism Places",
            },
        ],
        type: "website",
        siteName: "Rajasthan Tourism Places",
        locale: "en_IN",
        url: "https://rajasthanplaces.in/culture",
    },
    twitter: {
        card: "summary_large_image",
        title: "Rajasthan Festivals & Culture Guide",
        description:
            "Discover vibrant Rajasthan festivals - Pushkar Camel Fair, Desert Festival, Teej & Gangaur.",
        images: [
            "https://picsum.photos/seed/raj-1108/800/600",
        ],
        site: "@RoyalRajasthan",
    },
    alternates: {
        canonical: "https://rajasthanplaces.in/culture",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function CulturePage() {
    // JSON-LD Schemas
    const festivalEventSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Famous Festivals of Rajasthan",
        description:
            "A list of the most famous and vibrant festivals celebrated in Rajasthan, India.",
        url: "https://rajasthanplaces.in/culture",
        numberOfItems: 4,
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                item: {
                    "@type": "Event",
                    name: "Pushkar Camel Fair",
                    description:
                        "The world's largest camel fair held annually in Pushkar, Rajasthan. Features camel trading, folk music, cultural performances and hot air balloon rides.",
                    url: "https://rajasthanplaces.in/festivals/pushkar-camel-fair",
                    location: {
                        "@type": "Place",
                        name: "Pushkar",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Pushkar",
                            addressRegion: "Rajasthan",
                            addressCountry: "IN",
                        },
                    },
                    startDate: "2025-11-15",
                    endDate: "2025-11-20",
                    eventStatus: "https://schema.org/EventScheduled",
                    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                    organizer: {
                        "@type": "Organization",
                        name: "Department of Tourism, Government of Rajasthan",
                        url: "https://www.tourism.rajasthan.gov.in",
                    },
                    performer: {
                        "@type": "PerformingGroup",
                        name: "Local Folk Artists",
                    },
                    offers: {
                        "@type": "Offer",
                        price: "0",
                        priceCurrency: "INR",
                        availability: "https://schema.org/InStock",
                        url: "https://rajasthanplaces.in/festivals/pushkar-camel-fair",
                    },
                    image:
                        "https://picsum.photos/seed/raj-1109/800/600",
                },
            },
            {
                "@type": "ListItem",
                position: 2,
                item: {
                    "@type": "Event",
                    name: "Desert Festival Jaisalmer",
                    description:
                        "A vibrant 3-day celebration of Rajasthan's desert culture featuring folk music, camel races, turban-tying competition and fire dance in Jaisalmer.",
                    url: "https://rajasthanplaces.in/festivals/desert-festival",
                    location: {
                        "@type": "Place",
                        name: "Jaisalmer",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Jaisalmer",
                            addressRegion: "Rajasthan",
                            addressCountry: "IN",
                        },
                    },
                    startDate: "2026-02-08",
                    endDate: "2026-02-10",
                    eventStatus: "https://schema.org/EventScheduled",
                    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                    organizer: {
                        "@type": "Organization",
                        name: "Department of Tourism, Government of Rajasthan",
                        url: "https://www.tourism.rajasthan.gov.in",
                    },
                    performer: {
                        "@type": "PerformingGroup",
                        name: "Local Folk Artists",
                    },
                    offers: {
                        "@type": "Offer",
                        price: "0",
                        priceCurrency: "INR",
                        availability: "https://schema.org/InStock",
                        url: "https://rajasthanplaces.in/festivals/desert-festival",
                    },
                    image:
                        "https://picsum.photos/seed/raj-1110/800/600",
                },
            },
            {
                "@type": "ListItem",
                position: 3,
                item: {
                    "@type": "Event",
                    name: "Teej Festival",
                    description:
                        "A vibrant monsoon festival celebrated by women in Jaipur featuring colorful processions, traditional songs, swing rides and henna designs.",
                    url: "https://rajasthanplaces.in/festivals/teej-festival",
                    location: {
                        "@type": "Place",
                        name: "Jaipur",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Jaipur",
                            addressRegion: "Rajasthan",
                            addressCountry: "IN",
                        },
                    },
                    startDate: "2025-08-08",
                    endDate: "2025-08-10",
                    eventStatus: "https://schema.org/EventScheduled",
                    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                    organizer: {
                        "@type": "Organization",
                        name: "Department of Tourism, Government of Rajasthan",
                        url: "https://www.tourism.rajasthan.gov.in",
                    },
                    performer: {
                        "@type": "PerformingGroup",
                        name: "Local Folk Artists",
                    },
                    offers: {
                        "@type": "Offer",
                        price: "0",
                        priceCurrency: "INR",
                        availability: "https://schema.org/InStock",
                        url: "https://rajasthanplaces.in/festivals/teej-festival",
                    },
                    image:
                        "https://picsum.photos/seed/raj-1111/800/600",
                },
            },
            {
                "@type": "ListItem",
                position: 4,
                item: {
                    "@type": "Event",
                    name: "Gangaur Festival",
                    description:
                        "The most important festival of Rajasthan celebrating Lord Shiva and Goddess Gauri with 18 days of elaborate processions and traditional rituals in Udaipur.",
                    url: "https://rajasthanplaces.in/festivals/gangaur-festival",
                    location: {
                        "@type": "Place",
                        name: "Udaipur",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Udaipur",
                            addressRegion: "Rajasthan",
                            addressCountry: "IN",
                        },
                    },
                    startDate: "2026-03-28",
                    endDate: "2026-04-14",
                    eventStatus: "https://schema.org/EventScheduled",
                    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                    organizer: {
                        "@type": "Organization",
                        name: "Department of Tourism, Government of Rajasthan",
                        url: "https://www.tourism.rajasthan.gov.in",
                    },
                    performer: {
                        "@type": "PerformingGroup",
                        name: "Local Folk Artists",
                    },
                    offers: {
                        "@type": "Offer",
                        price: "0",
                        priceCurrency: "INR",
                        availability: "https://schema.org/InStock",
                        url: "https://rajasthanplaces.in/festivals/gangaur-festival",
                    },
                    image:
                        "https://picsum.photos/seed/raj-1112/800/600",
                },
            },
        ],
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://rajasthanplaces.in",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Culture & Festivals",
                item: "https://rajasthanplaces.in/culture",
            },
        ],
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "When is the Pushkar Camel Fair?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "The Pushkar Camel Fair is held annually in November, coinciding with the Kartik Purnima (full moon). The 2025 fair is scheduled for November 15-20. It is the world's largest camel fair attracting over 200,000 visitors.",
                },
            },
            {
                "@type": "Question",
                name: "What is the Desert Festival of Jaisalmer?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "The Desert Festival is a 3-day cultural event held in Jaisalmer in February. It features folk music and dance, camel races, turban-tying competition, fire dance, puppet shows and the famous Mr. Desert competition.",
                },
            },
            {
                "@type": "Question",
                name: "What is the Gangaur Festival?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Gangaur is the most important festival of Rajasthan, celebrated over 18 days in March-April. It celebrates the divine love of Lord Shiva and Goddess Gauri (Parvati). Women fast and worship for marital bliss. Udaipur has the grandest Gangaur celebrations with royal processions.",
                },
            },
            {
                "@type": "Question",
                name: "Which is the best festival to visit in Rajasthan?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "The Pushkar Camel Fair (November) is the most iconic Rajasthan festival. The Desert Festival in Jaisalmer (February) is perfect for experiencing desert culture. Holi in Rajasthan (March) and Diwali are also spectacular. Each festival offers a unique cultural experience.",
                },
            },
        ],
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "TouristInformationCenter",
        name: "Rajasthan Tourism Places - Culture & Festivals",
        url: "https://rajasthanplaces.in/culture",
        description:
            "Complete guide to Rajasthan festivals, cultural events, folk traditions and celebrations.",
        areaServed: {
            "@type": "State",
            name: "Rajasthan",
            addressCountry: "IN",
        },
    };

    return (
        <>
            {/* All JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(festivalEventSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />

            {/* Client Component */}
            <FestivalsSection />

            {/* SEO Interlinks — Explore More */}
            <ExploreMoreSection currentPage="festivals" />
        </>
    );
}