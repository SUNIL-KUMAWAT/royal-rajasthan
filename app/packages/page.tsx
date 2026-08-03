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
                url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=630&fit=crop",
                width: 1200,
                height: 630,
                alt: "Rajasthan Tour Packages - Royal Rajasthan Tourism",
            },
        ],
        type: "website",
        siteName: "Royal Rajasthan Tourism",
        locale: "en_IN",
        url: "https://royalrajasthan.com/packages",
    },
    twitter: {
        card: "summary_large_image",
        title: "Rajasthan Tour Packages - Best Holiday Packages 2025",
        description:
            "Explore curated Rajasthan holiday packages — Heritage, Desert, Wildlife & Honeymoon tours.",
        images: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200"],
        site: "@RoyalRajasthan",
        creator: "@RoyalRajasthan",
    },
    alternates: {
        canonical: "https://royalrajasthan.com/packages",
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
            { "@type": "ListItem", position: 1, name: "Home", item: "https://royalrajasthan.com" },
            { "@type": "ListItem", position: 2, name: "Tour Packages", item: "https://royalrajasthan.com/packages" },
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
