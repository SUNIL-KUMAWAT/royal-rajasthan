// app/places/[slug]/page.tsx
// NO "use client" here
import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { toSchemaTime } from "@/lib/openStatus";
import { PLACES } from "@/constants/places";
import { PlaceDetailClient } from "./PlaceDetailClient";
import { PLACES_HINDI } from "@/constants/places-hindi";

// Only what the client needs to turn "related place" names into links
const PLACE_LINKS = {
    en: PLACES.map((p) => ({ name: p.name, slug: p.slug })),
    hi: (PLACES_HINDI as { name: string; slug: string }[]).map((p) => ({ name: p.name, slug: p.slug })),
};

// ✅ generateStaticParams works in Server Component
export async function generateStaticParams() {
    return PLACES.map((place) => ({
        slug: place.slug,
    }));
}

// ✅ Dynamic metadata for each place
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const place = PLACES.find((p) => p?.slug === slug);

    if (!place) {
        return {
            title: "Place Not Found | Rajasthan Tourism Places",
            description: "The requested place could not be found.",
        };
    }

    const customKeywords = place.seo?.keywords || place.keywords || [];
    const baseKeywords = [
        place.name,
        `${place.name} timing`,
        `${place.name} entry fee`,
        `${place.name} ticket price`,
        `${place.name} history`,
        `${place.city} tourist places`,
        `places to visit in ${place.city}`,
        `${place.category} in Rajasthan`,
        ...place.tags,
        ...customKeywords,
    ];

    const title = place.seo?.title || `${place.name} - Timing, Tickets & Travel Guide`;
    const description = place.seo?.description || `Visit ${place.name} in ${place.city}, Rajasthan. Timing: ${place.timing.open}-${place.timing.close}. Entry: ${place.ticket.isFree ? "Free" : `₹${place.ticket.indian}`
        }. Complete travel guide with history, tips & Google Maps.`;

    return {
        title,
        description,
        keywords: baseKeywords,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        other: {
            "geo.region": "IN-RJ",
            "geo.placename": `${place.city}, Rajasthan, India`,
            "geo.position": `${place.location.latitude};${place.location.longitude}`,
            "ICBM": `${place.location.latitude}, ${place.location.longitude}`,
        },
        openGraph: {
            title: place.seo?.title || `${place.name} - ${place.city}, Rajasthan`,
            description: description.substring(0, 155),
            images: [
                {
                    url: place.images[0],
                    width: 1200,
                    height: 630,
                    alt: `${place.name} - ${place.city}, Rajasthan`,
                },
            ],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: place.seo?.title || `${place.name} - ${place.city}`,
            description: description.substring(0, 155),
            images: [place.images[0]],
        },
        alternates: alternatesFor(`/places/${place.slug}`),
    };
}

// ✅ Server Component passes data to Client Component
export default async function PlaceDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const place = PLACES.find((p) => p?.slug === slug);

    // Real 404 status (not a "soft 404" page with 200) so search engines drop bad URLs
    if (!place) notFound();

    const opens = toSchemaTime(place.timing.open);
    const closes = toSchemaTime(place.timing.close);

    // JSON-LD Schemas for AI Search Engines & Google Rich Snippets
    const touristAttractionSchema = {
        "@context": "https://schema.org",
        "@type": ["TouristAttraction", "LocalBusiness"],
        "name": place.name,
        "description": place.description,
        "image": place.images,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": place.location.city,
            "addressRegion": "Rajasthan",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": place.location.latitude,
            "longitude": place.location.longitude
        },
        // schema.org needs 24h "HH:MM"; skip the block when timing isn't a plain time range
        ...(opens && closes
            ? {
                  openingHoursSpecification: [
                      {
                          "@type": "OpeningHoursSpecification",
                          opens,
                          closes,
                          dayOfWeek: [
                              "https://schema.org/Monday",
                              "https://schema.org/Tuesday",
                              "https://schema.org/Wednesday",
                              "https://schema.org/Thursday",
                              "https://schema.org/Friday",
                              "https://schema.org/Saturday",
                              "https://schema.org/Sunday",
                          ],
                      },
                  ],
              }
            : {}),
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://rajasthanplaces.in"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Places",
                "item": "https://rajasthanplaces.in/places"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": place.name,
                "item": `https://rajasthanplaces.in/places/${place.slug}`
            }
        ]
    };

    const faqSchema = place.faqs && place.faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": place.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    } : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttractionSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <PlaceDetailClient
                place={place}
                hindiPlace={PLACES_HINDI.find((p) => p.slug === place.slug) ?? null}
                placeLinks={PLACE_LINKS}
            />
        </>
    );
}