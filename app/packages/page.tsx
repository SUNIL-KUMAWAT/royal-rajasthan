// app/packages/page.tsx — Server Component with SEO metadata
import type { Metadata } from "next";
import PackagesPage from "./PackagesClient";

export const metadata: Metadata = {
    title: "Rajasthan Tour Packages - Best Holiday Packages 2025 | Royal Rajasthan",
    description:
        "Explore curated Rajasthan tour packages — Golden Triangle, Royal Heritage, Desert Safari, Honeymoon & Wildlife tours. All-inclusive packages with forts, palaces & desert camps.",
    keywords: [
        "Rajasthan tour packages",
        "Rajasthan holiday packages",
        "Jaipur Udaipur Jodhpur package",
        "Golden Triangle tour",
        "Rajasthan heritage tour",
        "Rajasthan desert safari package",
        "Rajasthan honeymoon package",
        "Rajasthan wildlife tour",
        "Rajasthan family packages",
        "cheap Rajasthan tour packages",
        "luxury Rajasthan tour",
    ],
    openGraph: {
        title: "Rajasthan Tour Packages - Best Holiday Packages 2025",
        description:
            "Explore curated Rajasthan tour packages. Golden Triangle, Royal Heritage, Desert Safari, Honeymoon & Wildlife tours.",
        images: [
            {
                url: "https://picsum.photos/seed/raj-1125/800/600",
                width: 1200,
                height: 630,
                alt: "Rajasthan Tour Packages - Royal Rajasthan Tourism",
            },
        ],
        type: "website",
        siteName: "Royal Rajasthan Tourism",
        locale: "en_IN",
        url: "https://rajasthanplaces.in/packages",
    },
    twitter: {
        card: "summary_large_image",
        title: "Rajasthan Tour Packages - Best Holiday Packages 2025",
        description:
            "Explore curated Rajasthan holiday packages — Heritage, Desert, Wildlife & Honeymoon tours.",
        images: ["https://picsum.photos/seed/raj-1126/800/600"],
        site: "@RoyalRajasthan",
        creator: "@RoyalRajasthan",
    },
    alternates: {
        canonical: "https://rajasthanplaces.in/packages",
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

export default function PackagesServerPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://rajasthanplaces.in" },
            { "@type": "ListItem", position: 2, name: "Tour Packages", item: "https://rajasthanplaces.in/packages" },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <PackagesPage />
        </>
    );
}
