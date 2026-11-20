// app/places/page.tsx
import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n";
import { PlacesClient } from "./PlacesClient";
import { PLACES } from "@/constants/places";
import { PLACES_HINDI } from "@/constants/places-hindi";
import { toPlaceCards } from "@/lib/places";

// Round down to a tidy "N+" figure so copy stays true as places are added
const PLACE_COUNT_LABEL = `${Math.floor(PLACES.length / 10) * 10}+`;

export const metadata: Metadata = {
    title: "Famous Places to Visit in Rajasthan - Complete Guide",
    description:
        `Explore ${PLACE_COUNT_LABEL} famous tourist places in Rajasthan with complete details - timing, ticket prices, history, best time to visit & Google Maps location.`,
    keywords: [
        "places to visit in Rajasthan",
        "Rajasthan tourist places",
        "famous places in Rajasthan",
        "Rajasthan tourism",
        "forts in Rajasthan",
        "palaces in Rajasthan",
        "lakes in Rajasthan",
        "Rajasthan travel guide",
    ],
    openGraph: {
        title: "Famous Places to Visit in Rajasthan",
        description:
            `Complete guide to ${PLACE_COUNT_LABEL} famous tourist places in Rajasthan with timing, tickets & maps.`,
        images: [
            {
                url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg/960px-20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg",
                width: 960,
                height: 640,
                alt: "Famous Places in Rajasthan",
            },
        ],
        type: "website",
        siteName: "Rajasthan Tourism Places",
        locale: "en_IN",
        url: "https://rajasthanplaces.in/places",
    },
    twitter: {
        card: "summary_large_image",
        title: "Famous Places to Visit in Rajasthan",
        description:
            "Complete guide to tourist places in Rajasthan with timing, tickets & maps.",
        images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg/960px-20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg"],
        site: "@rajasthanplaces",
        creator: "@rajasthanplaces",
    },
    alternates: alternatesFor("/places"),
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
            { "@type": "ListItem", position: 1, name: "Home", item: "https://rajasthanplaces.in" },
            { "@type": "ListItem", position: 2, name: "Places", item: "https://rajasthanplaces.in/places" },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <PlacesClient places={toPlaceCards(PLACES)} placesHi={toPlaceCards(PLACES_HINDI)} />
        </>
    );
}