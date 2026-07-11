// app/culture/page.tsx
import type { Metadata } from "next";
import { FestivalsSection } from "@/components/home/FestivalsSection";

export const metadata: Metadata = {
    // ✅ FIXED - No pipe | at end, template will add it automatically
    title: "Rajasthan Festivals & Culture - Complete Travel Guide",
    description:
        "Discover vibrant festivals of Rajasthan - Pushkar Camel Fair, Desert Festival, Teej, Gangaur & more. Complete guide with dates, highlights & travel tips.",
    keywords: [
        "Rajasthan festivals",
        "Pushkar Camel Fair",
        "Desert Festival Jaisalmer",
        "Teej Festival Jaipur",
        "Gangaur Festival Udaipur",
        "Rajasthan culture",
        "festivals in Rajasthan 2025",
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
                url: "https://images.unsplash.com/photo-1544015759-237f2a0a8176?w=1200&h=630&fit=crop",
                width: 1200,
                height: 630,
                alt: "Rajasthan Festivals - Royal Rajasthan Tourism",
            },
        ],
        type: "website",
        siteName: "Royal Rajasthan Tourism",
        locale: "en_IN",
        url: "https://royalrajasthan.com/culture",
    },
    twitter: {
        card: "summary_large_image",
        title: "Rajasthan Festivals & Culture Guide | Royal Rajasthan Tourism",
        description:
            "Discover vibrant Rajasthan festivals - Pushkar Camel Fair, Desert Festival, Teej & Gangaur.",
        images: [
            "https://images.unsplash.com/photo-1544015759-237f2a0a8176?w=1200",
        ],
        site: "@RoyalRajasthan",
        creator: "@RoyalRajasthan",
    },
    alternates: {
        canonical: "https://royalrajasthan.com/culture",
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
    const festivalEventSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Famous Festivals of Rajasthan",
        description:
            "A list of the most famous and vibrant festivals celebrated in Rajasthan, India.",
        url: "https://royalrajasthan.com/culture",
        numberOfItems: 4,
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                item: {
                    "@type": "Event",
                    name: "Pushkar Camel Fair",
                    description:
                        "The world's largest camel fair held annually in Pushkar, Rajasthan.",
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
                    organizer: {
                        "@type": "Organization",
                        name: "Rajasthan Tourism",
                    },
                    image:
                        "https://images.unsplash.com/photo-1544015759-237f2a0a8176?w=800",
                },
            },
            {
                "@type": "ListItem",
                position: 2,
                item: {
                    "@type": "Event",
                    name: "Desert Festival Jaisalmer",
                    description:
                        "A vibrant 3-day celebration of Rajasthan desert culture.",
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
                    image:
                        "https://images.unsplash.com/photo-1502786129293-79981df4e689?w=800",
                },
            },
            {
                "@type": "ListItem",
                position: 3,
                item: {
                    "@type": "Event",
                    name: "Teej Festival",
                    description:
                        "A vibrant monsoon festival celebrated by women in Jaipur.",
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
                    image:
                        "https://images.unsplash.com/photo-1575377427642-087cf684ad0c?w=800",
                },
            },
            {
                "@type": "ListItem",
                position: 4,
                item: {
                    "@type": "Event",
                    name: "Gangaur Festival",
                    description:
                        "The most important festival of Rajasthan with 18 days of celebrations.",
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
                    image:
                        "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800",
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
                item: "https://royalrajasthan.com",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Culture & Festivals",
                item: "https://royalrajasthan.com/culture",
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
                    text: "The Pushkar Camel Fair is held annually in November, coinciding with Kartik Purnima. The 2025 fair is November 15-20. It attracts over 200,000 visitors worldwide.",
                },
            },
            {
                "@type": "Question",
                name: "What is the Desert Festival of Jaisalmer?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "The Desert Festival is a 3-day event held in Jaisalmer every February featuring folk music, camel races, turban-tying competition, fire dance and the Mr. Desert competition.",
                },
            },
            {
                "@type": "Question",
                name: "What is the Gangaur Festival?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Gangaur is Rajasthan most important festival celebrated over 18 days in March-April, honoring Lord Shiva and Goddess Gauri. Udaipur has the grandest celebrations.",
                },
            },
            {
                "@type": "Question",
                name: "Which is the best festival to visit in Rajasthan?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Pushkar Camel Fair in November is the most iconic. Desert Festival in Jaisalmer in February is best for desert culture. Holi and Diwali in Rajasthan are also spectacular.",
                },
            },
        ],
    };

    return (
        <>
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
            <FestivalsSection />
        </>
    );
}