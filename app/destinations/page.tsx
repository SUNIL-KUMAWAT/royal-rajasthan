// app/destinations/page.tsx — Server Component with SEO metadata
import type { Metadata } from "next";
import DestinationsClient from "./DestinationsClient";

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
                url: "https://picsum.photos/seed/raj-1105/800/600",
                width: 1200,
                height: 630,
                alt: "Rajasthan Destinations - Royal Rajasthan Tourism",
            },
        ],
        type: "website",
        siteName: "Royal Rajasthan Tourism",
        locale: "en_IN",
        url: "https://rajasthanplaces.in/destinations",
    },
    twitter: {
        card: "summary_large_image",
        title: "Rajasthan Destinations - Best Cities to Visit",
        description:
            "Explore Jaipur, Udaipur, Jodhpur, Jaisalmer & more. Best Rajasthan cities guide.",
        images: ["https://picsum.photos/seed/raj-1106/800/600"],
        site: "@RoyalRajasthan",
        creator: "@RoyalRajasthan",
    },
    alternates: {
        canonical: "https://rajasthanplaces.in/destinations",
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
            <DestinationsClient />
        </>
    );
}