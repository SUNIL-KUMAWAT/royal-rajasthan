// app/places/[slug]/page.tsx
// NO "use client" here
import type { Metadata } from "next";
import { PLACES } from "@/constants/data";
import { PlaceDetailClient } from "./PlaceDetailClient";

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

    const title = place.seo?.title || `${place.name} - Timing, Tickets & Travel Guide | Rajasthan Tourism Places`;
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
        alternates: {
            canonical: `https://rajasthanplaces.in/places/${place.slug}`,
        },
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

    if (!place) {
        return (
            <div className="min-h-screen flex items-center justify-center mt-16">
                <div className="text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                        Place Not Found
                    </h1>
                    <p className="text-gray-500 mb-6">
                        The place you are looking for does not exist.
                    </p>
                    <a
                        href="/places"
                        className="bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 transition-all"
                    >
                        ← Back to Places
                    </a>
                </div>
            </div>
        );
    }

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
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "opens": place.timing.open,
                "closes": place.timing.close,
                "dayOfWeek": "https://schema.org/Everyday"
            }
        ]
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
            <PlaceDetailClient place={place} />
        </>
    );
}