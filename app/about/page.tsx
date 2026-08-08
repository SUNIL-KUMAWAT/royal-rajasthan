// app/about/page.tsx — Server Component with SEO metadata
import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "About Rajasthan - History, Culture & Heritage | Rajasthan Tourism Places",
    description:
        "Learn about Rajasthan — India's largest state. Discover its rich history, vibrant culture, magnificent forts & palaces, geography, and why it's India's most visited tourist destination.",
    keywords: [
        "about Rajasthan",
        "Rajasthan history",
        "Rajasthan culture",
        "Land of Kings",
        "Rajasthan heritage",
        "Rajasthan tourism",
        "Rajasthan geography",
        "Rajasthan Rajput history",
        "Jaipur Pink City",
        "Rajasthan UNESCO sites",
    ],
    openGraph: {
        title: "About Rajasthan - The Land of Kings",
        description:
            "Discover Rajasthan's magnificent history, vibrant culture, royal forts & palaces. India's most visited state with 6000+ years of heritage.",
        images: [
            {
                url: "https://picsum.photos/seed/raj-1093/800/600",
                width: 1200,
                height: 630,
                alt: "About Rajasthan - Rajasthan Tourism Places",
            },
        ],
        type: "website",
        siteName: "Rajasthan Tourism Places",
        locale: "en_IN",
        url: "https://rajasthanplaces.in/about",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Rajasthan - The Land of Kings",
        description:
            "Discover Rajasthan's magnificent history, vibrant culture, royal forts & palaces.",
        images: ["https://picsum.photos/seed/raj-1094/800/600"],
        site: "@RoyalRajasthan",
        creator: "@RoyalRajasthan",
    },
    alternates: {
        canonical: "https://rajasthanplaces.in/about",
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

export default function AboutPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://rajasthanplaces.in" },
            { "@type": "ListItem", position: 2, name: "About", item: "https://rajasthanplaces.in/about" },
        ],
    };

    const aboutSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About Rajasthan - Rajasthan Tourism Places",
        description: "Complete information about Rajasthan — history, culture, geography and tourism.",
        url: "https://rajasthanplaces.in/about",
        mainEntity: {
            "@type": "State",
            name: "Rajasthan",
            description: "India's largest state known as the Land of Kings, famous for forts, palaces, deserts and vibrant culture.",
            addressCountry: "IN",
            geo: {
                "@type": "GeoCoordinates",
                latitude: "27.0238",
                longitude: "74.2179",
            },
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
            />
            <AboutClient />
        </>
    );
}