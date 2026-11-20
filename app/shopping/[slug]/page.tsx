import { notFound } from "next/navigation";
import { alternatesFor } from "@/lib/i18n";
import ShoppingDetailClient from "./ShoppingDetailClient";
import DistrictShoppingClient from "./DistrictShoppingClient";
import { Metadata } from "next";
import { RAJASTHAN_SHOPPING } from "@/constants/shopping";
import { RAJASTHAN_SHOPPING_HINDI } from "@/constants/shopping-hindi";

/** Finds the Hindi translation of a market by id (same lookup the client used to do). */
function findHindiMarket(id: string, districtSlug: string): ShoppingDetail | null {
    for (const d of RAJASTHAN_SHOPPING_HINDI.districts) {
        const p = d.shoppingPlaces.find((x) => x.id === id);
        // The Hindi dataset mirrors the English record shape (translated text, same keys)
        if (p) return { ...p, district: d.district, districtSlug } as unknown as ShoppingDetail;
    }
    return null;
}
import {
    SITE_URL,
    getAllShoppingEntries,
    getDistrictFaqs,
    getDistrictSiblings,
    getPlaceSlug,
    getRelatedLinks,
    getShoppingDistrict,
    getShoppingEntry,
    type ShoppingDetail,
} from "@/lib/shopping";

// Common aliases map for old or shortened URLs
const ALIASES: Record<string, string> = {
    "sardar-market": "sardar-market-clock-tower",
    "hathi-pol": "hathi-pol-bazaar",
};

// Resolve a slug to either a District or a Shopping Place
function findBySlug(slug: string) {
    const district = getShoppingDistrict(slug);
    if (district) return { type: "district" as const, data: district };

    const entry = getShoppingEntry(ALIASES[slug] || slug);
    if (entry) return { type: "place" as const, data: entry };

    return null;
}

/** Name with district appended when the bare name doesn't already say where it is. */
function displayName(name: string, district: string) {
    return name.toLowerCase().includes(district.toLowerCase()) ? name : `${name}, ${district}`;
}

const INDEX_ROBOTS = {
    index: true,
    follow: true,
    googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
    },
};

const NOINDEX_ROBOTS = { index: false, follow: true };

export async function generateStaticParams() {
    return [
        ...RAJASTHAN_SHOPPING.districts.map((d) => ({ slug: d.slug })),
        ...getAllShoppingEntries().map((e) => ({ slug: e.slug })),
    ];
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
        const title = `Shopping in ${district.district}, Rajasthan - Best Markets, Bazaars & Guide`;
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
            robots: INDEX_ROBOTS,
            other: {
                "geo.region": "IN-RJ",
                "geo.placename": `${district.district}, Rajasthan, India`,
            },
            openGraph: {
                title,
                description,
                images: [`${SITE_URL}/og-image.jpg`],
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [`${SITE_URL}/og-image.jpg`],
            },
            alternates: alternatesFor(`/shopping/${district.slug}`),
        };
    }

    // Place type
    const entry = match.data;
    const place = entry.place;
    const fullName = displayName(place.name, entry.district);
    // Generic SEO titles ("Gandhi Chowk Shopping Guide...") don't say which city; build one that does
    const seoTitle: string | undefined = place.seo?.title;
    const title =
        seoTitle && seoTitle.toLowerCase().includes(entry.district.toLowerCase())
            ? seoTitle
            : `${fullName} - Shopping Guide, Timings & What to Buy`;
    const famous = (place.famousFor || []).slice(0, 3).join(", ");
    const description =
        `${fullName}, Rajasthan: ${place.type}${famous ? ` known for ${famous}` : ""}. ` +
        `Timings ${place.timings}, budget ${place.priceRange}, shopping tips, FAQs and nearby markets.`;

    return {
        title,
        description,
        keywords: place.seo?.keywords || place.keywords || [],
        robots: entry.indexable ? INDEX_ROBOTS : NOINDEX_ROBOTS,
        other: {
            "geo.region": "IN-RJ",
            "geo.placename": `${entry.district}, Rajasthan, India`,
        },
        openGraph: {
            title,
            description,
            images: [place.image],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [place.image],
        },
        alternates: alternatesFor(`/shopping/${entry.slug}`),
    };
}

const JsonLd = ({ data }: { data: object }) => (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

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
        const placeSlugs: Record<string, string> = Object.fromEntries(
            district.shoppingPlaces.map((p) => [p.id, getPlaceSlug(p.id, p.name)])
        );

        const districtShoppingSchema = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `Shopping Markets in ${district.district}, Rajasthan`,
            description: district.description,
            url: `${SITE_URL}/shopping/${district.slug}`,
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
                    url: `${SITE_URL}/shopping/${placeSlugs[p.id]}`,
                },
            })),
        };

        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Shopping", item: `${SITE_URL}/shopping` },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: district.district,
                    item: `${SITE_URL}/shopping/${district.slug}`,
                },
            ],
        };

        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: getDistrictFaqs(district, false).map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
        };

        const otherDistricts = RAJASTHAN_SHOPPING.districts
            .filter((d) => d.slug !== district.slug)
            .map((d) => ({ name: d.district, slug: d.slug }));

        return (
            <>
                <JsonLd data={districtShoppingSchema} />
                <JsonLd data={breadcrumbSchema} />
                <JsonLd data={faqSchema} />
                <DistrictShoppingClient
                    district={district}
                    placeSlugs={placeSlugs}
                    otherDistricts={otherDistricts}
                />
            </>
        );
    }

    // Place type
    const entry = match.data;
    const place = entry.place;
    const pageUrl = `${SITE_URL}/shopping/${entry.slug}`;

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: place.name,
        description: place.description,
        image: place.image,
        url: pageUrl,
        address: {
            "@type": "PostalAddress",
            addressLocality: entry.district,
            addressRegion: "Rajasthan",
            addressCountry: "IN",
        },
        priceRange: place.priceRange || "$$",
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Shopping", item: `${SITE_URL}/shopping` },
            {
                "@type": "ListItem",
                position: 3,
                name: entry.district,
                item: `${SITE_URL}/shopping/${entry.districtSlug}`,
            },
            { "@type": "ListItem", position: 4, name: place.name, item: pageUrl },
        ],
    };

    const faqs: { question: string; answer: string }[] = place.faqs || [];
    const faqSchema =
        faqs.length > 0
            ? {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faqs.map((f) => ({
                      "@type": "Question",
                      name: f.question,
                      acceptedAnswer: { "@type": "Answer", text: f.answer },
                  })),
              }
            : null;

    return (
        <>
            <JsonLd data={localBusinessSchema} />
            <JsonLd data={breadcrumbSchema} />
            {faqSchema && <JsonLd data={faqSchema} />}
            <ShoppingDetailClient
                place={{ ...place, district: entry.district, districtSlug: entry.districtSlug }}
                hindiPlace={findHindiMarket(place.id, entry.districtSlug)}
                relatedLinks={getRelatedLinks(entry)}
                districtSiblings={getDistrictSiblings(entry)}
            />
        </>
    );
}
