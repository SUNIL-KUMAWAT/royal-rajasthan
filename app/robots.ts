// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/_next/",
                    "/admin/",
                ],
            },
            {
                userAgent: "Googlebot",
                allow: "/",
                crawlDelay: 2,
            },
        ],
        sitemap: "https://royalrajasthan.com/sitemap.xml",
        host: "https://royalrajasthan.com",
    };
}