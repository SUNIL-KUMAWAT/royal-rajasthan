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
        "Rajasthan travel guide 2024",
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
    },
};

export default function PlacesPage() {
    return <PlacesClient />;
}