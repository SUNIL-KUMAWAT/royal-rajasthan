// app/sitemap.ts
import { MetadataRoute } from "next";
import { PLACES } from "@/constants/places";
import { FESTIVALS } from "@/constants/festivals";
import { RAJASTHAN_SHOPPING } from "@/constants/shopping";
import { getAllShoppingEntries } from "@/lib/shopping";
import { hasHindiVersion, localizePath } from "@/lib/i18n";

/**
 * Adds the Hindi (/hi) URL for every page that has one, and links each pair with
 * hreflang alternates so Google serves the right language.
 */
function withHindiVersions(entries: MetadataRoute.Sitemap, baseUrl: string): MetadataRoute.Sitemap {
    return entries.flatMap((entry) => {
        const path = entry.url.slice(baseUrl.length) || "/";
        if (!hasHindiVersion(path)) return [entry];
        const hiUrl = `${baseUrl}${localizePath(path, "hi")}`;
        const alternates = { languages: { "en-IN": entry.url, "hi-IN": hiUrl } };
        return [
            { ...entry, alternates },
            { ...entry, url: hiUrl, alternates },
        ];
    });
}

// Helper: Convert name to URL slug
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
            url: `${baseUrl}/destinations`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.75,
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
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.4,
        },
        {
            url: `${baseUrl}/terms-of-service`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.4,
        },
        {
            url: `${baseUrl}/cookie-policy`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.4,
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
        priority: 0.75,
    }));

    // Dynamic shopping pages (district level - 33 districts)
    const shoppingDistrictPages: MetadataRoute.Sitemap = RAJASTHAN_SHOPPING.districts.map((district) => ({
        url: `${baseUrl}/shopping/${district.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    // Dynamic shopping place pages (individual markets & bazaars).
    // Generic names shared by many districts are noindex, so they stay out of the sitemap.
    const shoppingMarketPages: MetadataRoute.Sitemap = getAllShoppingEntries()
        .filter((e) => e.indexable)
        .map(({ slug }) => ({
        url: `${baseUrl}/shopping/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.65,
    }));

    return withHindiVersions(
        [
            ...staticPages,
            ...placesPages,
            ...festivalPages,
            ...shoppingDistrictPages,
            ...shoppingMarketPages,
        ],
        baseUrl
    );
}