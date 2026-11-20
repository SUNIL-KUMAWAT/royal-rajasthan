// app/destinations/page.tsx — Server Component with SEO metadata
import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n";
import DestinationsClient, { type DestinationCard } from "./DestinationsClient";
import { DESTINATIONS } from "@/constants/destinations";

const DESTINATION_CARDS: DestinationCard[] = DESTINATIONS.map((d) => ({
    id: d.id,
    name: d.name,
    slug: d.slug,
    nickname: d.nickname,
    description: d.description,
    image: d.image,
    rating: d.rating,
    category: d.category,
    distance: d.distance,
    duration: d.duration,
    price: d.price,
    isFeatured: !!d.isFeatured,
}));

export const metadata: Metadata = {
    title: "Rajasthan Destinations - Best Cities & Places to Visit",
    description:
        "Explore the best destinations in Rajasthan — Jaipur (Pink City), Udaipur (Lake City), Jodhpur (Blue City), Jaisalmer (Golden City), Pushkar & more. Complete guide with ratings, prices & highlights.",
    keywords: [
        "Rajasthan destinations",
        "best cities in Rajasthan",
        "Jaipur travel",
        "Udaipur tourism",
        "Jodhpur travel guide",
        "Jaisalmer tourism",
        "Pushkar travel",
        "Mount Abu tourism",
        "Rajasthan city guide",
        "places to visit Rajasthan",
    ],
    openGraph: {
        title: "Rajasthan Destinations - Best Cities & Places to Visit",
        description:
            "Explore Jaipur, Udaipur, Jodhpur, Jaisalmer & more. Complete guide to the best destinations in Rajasthan.",
        images: [
            {
                url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Jaisalmer_forteresse.jpg/960px-Jaisalmer_forteresse.jpg",
                width: 960,
                height: 640,
                alt: "Rajasthan Destinations - Rajasthan Tourism Places",
            },
        ],
        type: "website",
        siteName: "Rajasthan Tourism Places",
        locale: "en_IN",
        url: "https://rajasthanplaces.in/destinations",
    },
    twitter: {
        card: "summary_large_image",
        title: "Rajasthan Destinations - Best Cities to Visit",
        description:
            "Explore Jaipur, Udaipur, Jodhpur, Jaisalmer & more. Best Rajasthan cities guide.",
        images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Jaisalmer_forteresse.jpg/960px-Jaisalmer_forteresse.jpg"],
        site: "@rajasthanplaces",
        creator: "@rajasthanplaces",
    },
    alternates: alternatesFor("/destinations"),
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

export default function DestinationsPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://rajasthanplaces.in" },
            { "@type": "ListItem", position: 2, name: "Destinations", item: "https://rajasthanplaces.in/destinations" },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <DestinationsClient destinations={DESTINATION_CARDS} />
        </>
    );
}