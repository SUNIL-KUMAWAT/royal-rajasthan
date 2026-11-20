// app/shopping/page.tsx
import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n";
import ShoppingClient from "./ShoppingClient";
import { RAJASTHAN_SHOPPING } from "@/constants/shopping";
import { RAJASTHAN_SHOPPING_HINDI } from "@/constants/shopping-hindi";
import { toShoppingCards } from "@/lib/shopping";
import { ExploreMoreSection } from "@/components/shared/ExploreMoreSection";
import Link from "@/components/LocalizedLink";

export const metadata: Metadata = {
    title: "Shopping in Rajasthan - Best Markets, Bazaars & Souvenirs",
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
                url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/960px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
                width: 960,
                height: 640,
                alt: "Shopping in Rajasthan - Rajasthan Tourism Places",
            },
        ],
        type: "website",
        siteName: "Rajasthan Tourism Places",
        locale: "en_IN",
        url: "https://rajasthanplaces.in/shopping",
    },
    twitter: {
        card: "summary_large_image",
        title: "Shopping in Rajasthan - Best Markets, Bazaars & Souvenirs",
        description:
            "Explore the ultimate shopping guide to Rajasthan's famous bazaars.",
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/960px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
        ],
        site: "@rajasthanplaces",
        creator: "@rajasthanplaces",
    },
    alternates: alternatesFor("/shopping"),
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
            name: "Rajasthan Tourism Places",
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
                    __html: JSON.stringify(marketListSchema),
                }}
            />

            {/* Client Component */}
            <ShoppingClient
                places={toShoppingCards(RAJASTHAN_SHOPPING)}
                placesHi={toShoppingCards(RAJASTHAN_SHOPPING_HINDI)}
            />

            {/* Server-rendered district links so every district guide (and through it every market) is crawlable */}
            <section className="relative py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <span className="eyebrow">Districts</span>
                        <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink-900 dark:text-ivory-50 sm:text-5xl">
                            Shopping guides by <em className="italic font-normal text-gold-sheen">district</em>
                        </h2>
                    </div>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {RAJASTHAN_SHOPPING.districts.map((d) => (
                            <li key={d.slug}>
                                <Link
                                    href={`/shopping/${d.slug}`}
                                    className="group block h-full rounded-[1.5rem] glass px-5 py-4 transition-all duration-500 ease-lux hover:-translate-y-1 hover:shadow-float"
                                >
                                    <span className="block font-display text-xl font-medium text-ink-900 transition-colors group-hover:text-gold-700 dark:text-ivory-50 dark:group-hover:text-gold-300">
                                        Shopping in {d.district}
                                    </span>
                                    <span className="mt-1 block text-xs text-ink-500 dark:text-ivory-200/60">
                                        {d.shoppingPlaces.length} markets
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* SEO Interlinks — Explore More */}
            <ExploreMoreSection currentPage="shopping" />
        </>
    );
}