// app/sitemap.ts
import { MetadataRoute } from "next";
import { PLACES } from "@/constants/data";
import { FESTIVALS } from "@/constants/festivals";
import { RAJASTHAN_SHOPPING } from "@/constants/shopping";

// Helper: Convert festival name to URL slug
function toSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://rajasthanplaces.in";

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/places`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/culture`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/shopping`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/plan-trip`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms-of-service`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/cookie-policy`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/gallery`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.65,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
    ];

    // Dynamic place pages
    const placesPages: MetadataRoute.Sitemap = PLACES.map((place) => ({
        url: `${baseUrl}/places/${place.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.85,
    }));

    // Dynamic festival pages
    const festivalPages: MetadataRoute.Sitemap = FESTIVALS.map((festival) => ({
        url: `${baseUrl}/festivals/${toSlug(festival.name)}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    // Dynamic shopping pages (district level)
    const shoppingPages: MetadataRoute.Sitemap = RAJASTHAN_SHOPPING.districts.map((district) => ({
        url: `${baseUrl}/shopping/${district.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.65,
    }));

    return [...staticPages, ...placesPages, ...festivalPages, ...shoppingPages];
}