// app/places/page.tsx
import type { Metadata } from "next";
import { PlacesClient } from "./PlacesClient";

export const metadata: Metadata = {
    title: "Famous Places to Visit in Rajasthan - Complete Guide",
    description:
        "Explore 12+ famous tourist places in Rajasthan with complete details - timing, ticket prices, history, best time to visit & Google Maps location.",
    keywords: [
        "places to visit in Rajasthan",
        "Rajasthan tourist places",
        "famous places in Rajasthan",
        "Rajasthan tourism",
        "forts in Rajasthan",
        "palaces in Rajasthan",
        "lakes in Rajasthan",
        "Rajasthan travel guide 2025",
    ],
    openGraph: {
        title: "Famous Places to Visit in Rajasthan",
        description:
            "Complete guide to 12+ famous tourist places in Rajasthan with timing, tickets & maps.",
        images: [
            {
                url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200",
                width: 1200,
                height: 630,
                alt: "Famous Places in Rajasthan",
            },
        ],
        type: "website",
        siteName: "Royal Rajasthan Tourism",
        locale: "en_IN",
        url: "https://royalrajasthan.com/places",
    },
    twitter: {
        card: "summary_large_image",
        title: "Famous Places to Visit in Rajasthan",
        description:
            "Complete guide to tourist places in Rajasthan with timing, tickets & maps.",
        images: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200"],
        site: "@RoyalRajasthan",
        creator: "@RoyalRajasthan",
    },
    alternates: {
        canonical: "https://royalrajasthan.com/places",
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

export default function PlacesPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://royalrajasthan.com" },
            { "@type": "ListItem", position: 2, name: "Places", item: "https://royalrajasthan.com/places" },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <PlacesClient />
        </>
    );
}