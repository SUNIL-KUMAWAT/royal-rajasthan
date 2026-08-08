import { RAJASTHAN_SHOPPING } from "@/constants/shopping";
import { notFound } from "next/navigation";
import ShoppingDetailClient from "./ShoppingDetailClient";
import { Metadata } from "next";

const getSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function generateStaticParams() {
    const paths = RAJASTHAN_SHOPPING.districts.flatMap(d =>
        d.shoppingPlaces.map(p => ({
            slug: getSlug(p.name)
        }))
    );
    return paths;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    
    let foundPlace: any = null;
    for (const d of RAJASTHAN_SHOPPING.districts) {
        const p = d.shoppingPlaces.find(x => getSlug(x.name) === slug);
        if (p) {
            foundPlace = { ...p, district: d.district };
            break;
        }
    }
    
    if (!foundPlace) return { title: "Market Not Found" };
    
    const title = foundPlace.seo?.title || `${foundPlace.name} - Timing, Location & Shopping Guide | Royal Rajasthan`;
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
            canonical: `https://rajasthanplaces.in/shopping/${slug}`,
        },
    };
}

export default async function ShoppingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    let foundPlace: any = null;
    for (const d of RAJASTHAN_SHOPPING.districts) {
        const p = d.shoppingPlaces.find(x => getSlug(x.name) === slug);
        if (p) {
            foundPlace = { ...p, district: d.district };
            break;
        }
    }

    if (!foundPlace) {
        notFound();
    }

    return <ShoppingDetailClient place={foundPlace} />;
}
