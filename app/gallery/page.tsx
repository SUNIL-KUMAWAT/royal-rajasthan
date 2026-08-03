// app/gallery/page.tsx — Server Component with SEO metadata
import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
    title: "Rajasthan Photo Gallery - Forts, Palaces, Deserts & Wildlife",
    description:
        "Explore stunning photos of Rajasthan — Amber Fort, Hawa Mahal, Mehrangarh, Lake Pichola, Jaisalmer Fort, Ranthambore tigers and more. A visual journey through the Land of Kings.",
    keywords: [
        "Rajasthan photos",
        "Rajasthan gallery",
        "Amber Fort photos",
        "Hawa Mahal photos",
        "Mehrangarh Fort photos",
        "Jaisalmer photos",
        "Rajasthan forts images",
        "Rajasthan palaces photos",
        "Rajasthan desert photos",
        "Rajasthan wildlife photos",
        "Rajasthan travel photos",
    ],
    openGraph: {
        title: "Rajasthan Photo Gallery - Forts, Palaces, Deserts & Wildlife",
        description:
            "Stunning photos of Rajasthan's royal forts, magnificent palaces, golden deserts and exotic wildlife.",
        images: [
            {
                url: "https://picsum.photos/seed/raj-1114/800/600",
                width: 1200,
                height: 630,
                alt: "Rajasthan Photo Gallery - Royal Rajasthan Tourism",
            },
        ],
        type: "website",
        siteName: "Royal Rajasthan Tourism",
        locale: "en_IN",
        url: "https://royalrajasthan.com/gallery",
    },
    twitter: {
        card: "summary_large_image",
        title: "Rajasthan Photo Gallery - Forts, Palaces & Deserts",
        description:
            "Stunning photos of Rajasthan's royal forts, palaces, golden deserts and wildlife.",
        images: ["https://picsum.photos/seed/raj-1115/800/600"],
        site: "@RoyalRajasthan",
        creator: "@RoyalRajasthan",
    },
    alternates: {
        canonical: "https://royalrajasthan.com/gallery",
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

export default function GalleryPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://royalrajasthan.com" },
            { "@type": "ListItem", position: 2, name: "Gallery", item: "https://royalrajasthan.com/gallery" },
        ],
    };

    const imageGallerySchema = {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        name: "Rajasthan Photo Gallery",
        description: "A stunning collection of photos from Rajasthan — forts, palaces, deserts, wildlife and culture.",
        url: "https://royalrajasthan.com/gallery",
        about: {
            "@type": "State",
            name: "Rajasthan",
            addressCountry: "IN",
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
            />
            <GalleryClient />
        </>
    );
}