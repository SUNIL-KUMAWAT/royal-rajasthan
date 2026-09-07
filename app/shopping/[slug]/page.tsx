import { RAJASTHAN_SHOPPING } from "@/constants/shopping";
import { notFound } from "next/navigation";
import ShoppingDetailClient from "./ShoppingDetailClient";
import DistrictShoppingClient from "./DistrictShoppingClient";
import { Metadata } from "next";

const getSlug = (name: string) =>
    name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

// Common aliases map for old or shortened URLs
const ALIASES: Record<string, string> = {
    "sardar-market": "sardar-market-clock-tower",
    "hathi-pol": "hathi-pol-bazaar",
};

// Helper to resolve a slug to either a District or a Shopping Place
function findBySlug(slug: string) {
    const resolvedSlug = ALIASES[slug] || slug;

    // 1. Check if it's a district slug
    const foundDistrict = RAJASTHAN_SHOPPING.districts.find(
        (d) => d.slug === slug || getSlug(d.district) === slug
    );
    if (foundDistrict) {
        return { type: "district" as const, data: foundDistrict };
    }

    // 2. Check if it's an individual shopping place
    for (const d of RAJASTHAN_SHOPPING.districts) {
        const p = d.shoppingPlaces.find(
            (x) => getSlug(x.name) === resolvedSlug || getSlug(x.name) === slug
        );
        if (p) {
            return {
                type: "place" as const,
                data: { ...p, district: d.district, districtSlug: d.slug },
            };
        }
    }

    return null;
}

export async function generateStaticParams() {
    const districtSlugs = RAJASTHAN_SHOPPING.districts.map((d) => ({
        slug: d.slug,
    }));
    const placeSlugs = RAJASTHAN_SHOPPING.districts.flatMap((d) =>
        d.shoppingPlaces.map((p) => ({
            slug: getSlug(p.name),
        }))
    );
    return [...districtSlugs, ...placeSlugs];
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const match = findBySlug(slug);

    if (!match) return { title: "Market Not Found" };

    if (match.type === "district") {
        const district = match.data;
        const title = `Shopping in ${district.district}, Rajasthan - Best Markets, Bazaars & Guide | Rajasthan Tourism Places`;
        const description = `Discover the best shopping places, local bazaars, handicrafts, and markets in ${district.district}, Rajasthan. Complete guide with timings and famous specialties.`;

        return {
            title,
            description,
            keywords: [
                `shopping in ${district.district}`,
                `${district.district} markets`,
                `${district.district} bazaars`,
                `${district.district} shopping guide`,
                "Rajasthan shopping",
                "handicrafts Rajasthan",
            ],
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
            other: {
                "geo.region": "IN-RJ",
                "geo.placename": `${district.district}, Rajasthan, India`,
            },
            openGraph: {
                title,
                description,
                images: ["https://rajasthanplaces.in/og-image.jpg"],
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: ["https://rajasthanplaces.in/og-image.jpg"],
            },
            alternates: {
                canonical: `https://rajasthanplaces.in/shopping/${district.slug}`,
            },
        };
    }

    // Place type
    const foundPlace = match.data;
    const placeSlug = getSlug(foundPlace.name);
    const title =
        foundPlace.seo?.title ||
        `${foundPlace.name} - Timing, Location & Shopping Guide | Rajasthan Tourism Places`;
    const description = foundPlace.seo?.description || foundPlace.description;

    return {
        title,
        description,
        keywords: foundPlace.seo?.keywords || foundPlace.keywords || [],
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
        other: {
            "geo.region": "IN-RJ",
            "geo.placename": `${foundPlace.district}, Rajasthan, India`,
        },
        openGraph: {
            title,
            description,
            images: [foundPlace.image],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [foundPlace.image],
        },
        alternates: {
            canonical: `https://rajasthanplaces.in/shopping/${placeSlug}`,
        },
    };
}

export default async function ShoppingDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const match = findBySlug(slug);

    if (!match) {
        notFound();
    }

    if (match.type === "district") {
        const district = match.data;

        // JSON-LD Schemas for District Shopping
        const districtShoppingSchema = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `Shopping Markets in ${district.district}, Rajasthan`,
            description: district.description,
            url: `https://rajasthanplaces.in/shopping/${district.slug}`,
            numberOfItems: district.shoppingPlaces.length,
            itemListElement: district.shoppingPlaces.map((p, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                item: {
                    "@type": "LocalBusiness",
                    name: p.name,
                    description: p.description,
                    image: p.image,
                    address: {
                        "@type": "PostalAddress",
                        addressLocality: district.district,
                        addressRegion: "Rajasthan",
                        addressCountry: "IN",
                    },
                    priceRange: p.priceRange || "$$",
                    url: `https://rajasthanplaces.in/shopping/${getSlug(p.name)}`,
                },
            })),
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
                {
                    "@type": "ListItem",
                    position: 3,
                    name: district.district,
                    item: `https://rajasthanplaces.in/shopping/${district.slug}`,
                },
            ],
        };

        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(districtShoppingSchema),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(breadcrumbSchema),
                    }}
                />
                <DistrictShoppingClient district={district} />
            </>
        );
    }

    // Place type
    const foundPlace = match.data;
    const placeSlug = getSlug(foundPlace.name);

    // JSON-LD Schemas for Local Business & Rich Snippets
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: foundPlace.name,
        description: foundPlace.description,
        image: foundPlace.image,
        address: {
            "@type": "PostalAddress",
            addressLocality: foundPlace.district,
            addressRegion: "Rajasthan",
            addressCountry: "IN",
        },
        priceRange: foundPlace.priceRange || "$$",
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
            {
                "@type": "ListItem",
                position: 3,
                name: foundPlace.name,
                item: `https://rajasthanplaces.in/shopping/${placeSlug}`,
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(localBusinessSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            <ShoppingDetailClient place={foundPlace} />
        </>
    );
}
