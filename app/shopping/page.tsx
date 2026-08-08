// app/shopping/page.tsx
import type { Metadata } from "next";
import ShoppingClient from "./ShoppingClient";
import { RAJASTHAN_SHOPPING } from "@/constants/shopping";

export const metadata: Metadata = {
    title: "Shopping in Rajasthan - Best Markets, Bazaars & Souvenirs | Royal Rajasthan",
    description:
        "Explore the ultimate shopping guide to Rajasthan. Discover Johari Bazaar in Jaipur, Bapu Bazaar, Hathi Pol in Udaipur, Sardar Market in Jodhpur, and buy authentic Kundan jewelry, block-prints, mojaris & spices.",
    keywords: [
        "shopping in rajasthan",
        "rajasthan markets",
        "rajasthan bazaars",
        "best things to buy in rajasthan",
        "jaipur shopping",
        "jodhpur shopping",
        "udaipur shopping",
        "kundan jewelry rajasthan",
        "mojaris rajasthan",
        "rajasthani handicrafts",
        "bapu bazaar jaipur",
        "johari bazaar jaipur",
        "sardar market jodhpur",
        "blue pottery rajasthan",
    ],
    openGraph: {
        title: "Shopping in Rajasthan - Best Markets, Bazaars & Souvenirs",
        description:
            "Explore the ultimate shopping guide to Rajasthan's famous bazaars. Find out where to buy authentic textiles, jewelry, and handicrafts.",
        images: [
            {
                url: "https://picsum.photos/seed/raj-1141/800/600",
                width: 1200,
                height: 630,
                alt: "Shopping in Rajasthan - Royal Rajasthan Tourism",
            },
        ],
        type: "website",
        siteName: "Royal Rajasthan Tourism",
        locale: "en_IN",
        url: "https://rajasthanplaces.in/shopping",
    },
    twitter: {
        card: "summary_large_image",
        title: "Shopping in Rajasthan - Best Markets, Bazaars & Souvenirs",
        description:
            "Explore the ultimate shopping guide to Rajasthan's famous bazaars.",
        images: [
            "https://picsum.photos/seed/raj-1142/800/600",
        ],
        site: "@RoyalRajasthan",
        creator: "@RoyalRajasthan",
    },
    alternates: {
        canonical: "https://rajasthanplaces.in/shopping",
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

export default function ShoppingPage() {
    // JSON-LD Schema for Shopping Guide
    const shoppingSchema = {
        "@context": "https://schema.org",
        "@type": "Guide",
        name: "Royal Rajasthan Shopping Guide",
        description:
            "Guide to the best shopping places, bazaars, and traditional specialties in Rajasthan, India.",
        url: "https://rajasthanplaces.in/shopping",
        about: {
            "@type": "Thing",
            name: "Shopping in Rajasthan",
        },
        author: {
            "@type": "Organization",
            name: "Royal Rajasthan Tourism",
            url: "https://rajasthanplaces.in",
        },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://rajasthanplaces.in",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Shopping",
                item: "https://rajasthanplaces.in/shopping",
            },
        ],
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "What is famous in Rajasthan for shopping?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Rajasthan is world-famous for Kundan and Meenakari jewelry, block-printed textiles (Bandhani, Sanganeri), Mojari leather footwear, blue pottery, brassware, and authentic local spices.",
                },
            },
            {
                "@type": "Question",
                name: "Which is the best market in Jaipur for shopping?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Johari Bazaar is the most famous for jewelry and gemstones. Bapu Bazaar is best for fabrics, prints, and leather juttis, while Tripolia Bazaar is ideal for lac bangles.",
                },
            },
            {
                "@type": "Question",
                name: "Can I bargain in Rajasthani markets?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, bargaining is highly expected and common in the traditional street bazaars of Rajasthan. You can usually start negotiations around 50-60% of the initial quoted price.",
                },
            },
            {
                "@type": "Question",
                name: "Where can I buy authentic handicrafts with fixed prices?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "For authentic handicrafts with fixed prices, you should visit Rajasthali, the official government-run emporium located in Jaipur.",
                },
            },
        ],
    };

    // Dynamically build ItemList for all shopping places to optimize Search Engine crawling
    const allShoppingPlaces = RAJASTHAN_SHOPPING.districts.flatMap((d) => 
        d.shoppingPlaces.map((p) => ({
            "@type": "LocalBusiness",
            "name": p.name,
            "description": p.description,
            "category": p.type,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": d.district,
                "addressRegion": "Rajasthan",
                "addressCountry": "IN"
            },
            "priceRange": p.priceRange
        }))
    );

    const marketListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Famous Shopping Markets and Bazaars in Rajasthan",
        "numberOfItems": allShoppingPlaces.length,
        "itemListElement": allShoppingPlaces.map((place, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "item": place
        }))
    };

    return (
        <>
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(shoppingSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(marketListSchema),
                }}
            />

            {/* Client Component */}
            <ShoppingClient />
        </>
    );
}