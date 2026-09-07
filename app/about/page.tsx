// app/about/page.tsx — Server Component with SEO metadata
import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "About Us - Rajasthan Tourism Places | Official Travel & Heritage Guide",
    description:
        "Learn about Rajasthan Tourism Places (rajasthanplaces.in). Discover our mission to provide authentic travel guides, fort histories, festival dates, and market shopping insights across 33 districts of Rajasthan.",
    keywords: [
        "About Rajasthan Tourism Places",
        "Rajasthan travel guide",
        "Rajasthan tourism information",
        "Rajasthan places about us",
        "Rajasthan heritage guide",
        "Rajasthan trip planning",
        "authentic Rajasthan travel",
    ],
    openGraph: {
        title: "About Us - Rajasthan Tourism Places",
        description:
            "Discover the story and mission behind Rajasthan Tourism Places — your premier portal for royal heritage, forts, culture, and travel.",
        images: [
            {
                url: "https://rajasthanplaces.in/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "About Rajasthan Tourism Places",
            },
        ],
        type: "website",
        siteName: "Rajasthan Tourism Places",
        locale: "en_IN",
        url: "https://rajasthanplaces.in/about",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Us - Rajasthan Tourism Places",
        description:
            "Your premier portal for royal Rajasthan forts, palaces, culture, shopping, and travel guides.",
        images: ["https://rajasthanplaces.in/og-image.jpg"],
        site: "@rajasthanplaces",
        creator: "@rajasthanplaces",
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
    const aboutSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About Rajasthan Tourism Places",
        url: "https://rajasthanplaces.in/about",
        description:
            "Complete digital guide to Rajasthan's forts, palaces, culture, and bazaars across all 33 districts.",
        mainEntity: {
            "@type": "Organization",
            name: "Rajasthan Tourism Places",
            url: "https://rajasthanplaces.in",
            logo: "https://rajasthanplaces.in/english-logo-bg.png",
            sameAs: [
                "https://facebook.com/rajasthan-places",
                "https://twitter.com/rajasthan-places",
                "https://instagram.com/rajasthan-places",
            ],
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-99999-99999",
                contactType: "customer support",
                email: "sunilkumawat.india@gmail.com",
            },
        },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://rajasthanplaces.in" },
            { "@type": "ListItem", position: 2, name: "About Us", item: "https://rajasthanplaces.in/about" },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <AboutClient />
        </>
    );
}
