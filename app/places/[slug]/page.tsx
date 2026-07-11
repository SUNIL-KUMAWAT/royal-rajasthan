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
    params: { slug: string };
}): Promise<Metadata> {
    const place = PLACES.find((p) => p.slug === params.slug);

    if (!place) {
        return {
            title: "Place Not Found | Royal Rajasthan Tourism",
            description: "The requested place could not be found.",
        };
    }

    return {
        title: `${place.name} - Timing, Tickets & Travel Guide | Royal Rajasthan`,
        description: `Visit ${place.name} in ${place.city}, Rajasthan. Timing: ${place.timing.open}-${place.timing.close}. Entry: ${place.ticket.isFree ? "Free" : `₹${place.ticket.indian}`
            }. Complete travel guide with history, tips & Google Maps.`,
        keywords: [
            place.name,
            `${place.name} timing`,
            `${place.name} entry fee`,
            `${place.name} ticket price`,
            `${place.name} history`,
            `${place.city} tourist places`,
            `places to visit in ${place.city}`,
            `${place.category} in Rajasthan`,
            ...place.tags,
        ],
        openGraph: {
            title: `${place.name} - ${place.city}, Rajasthan`,
            description: place.description.substring(0, 155),
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
            title: `${place.name} - ${place.city}`,
            description: place.description.substring(0, 155),
            images: [place.images[0]],
        },
        alternates: {
            canonical: `https://royalrajasthan.com/places/${place.slug}`,
        },
    };
}

// ✅ Server Component passes data to Client Component
export default function PlaceDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const place = PLACES.find((p) => p.slug === params.slug);

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

    // Pass JSON data to client component
    return <PlaceDetailClient place={place} />;
}