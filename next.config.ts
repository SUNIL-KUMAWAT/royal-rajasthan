import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // ============ SEO METADATA ============
  htmlLimitedBots: /.*/,

  // ============ IMAGE OPTIMIZATION ============
  images: {
    // Optimized: Next resizes + converts remote photos to AVIF/WebP per device (needs `sharp`, bundled with Next).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        // Wikipedia now serves its thumbnails from here
        protocol: "https",
        hostname: "thumb.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.tripplannersindia.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ============ COMPRESSION ============
  compress: true,

  // ============ HEADERS FOR SEO & SECURITY ============
  async headers() {
    const isProd = process.env.NODE_ENV === "production";
    return [
      {
        // Security headers for ALL routes
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
      // Static assets ONLY — immutable long-term cache. Production only: in `next dev` chunk names
      // are not content-hashed, so "immutable" makes browsers keep running stale code after edits.
      ...(isProd
        ? [
            {
              source: "/_next/static/(.*)",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=31536000, immutable",
                },
              ],
            },
          ]
        : [
            {
              // Dev only: browsers that cached dev chunks under the old "immutable" header would keep
              // running stale code forever. This tells them to drop this site's HTTP cache on page load.
              source: "/((?!_next/).*)",
              headers: [{ key: "Clear-Site-Data", value: '"cache"' }],
            },
          ]),
      {
        // HTML pages & API routes — short cache so Google gets fresh content
        source: "/((?!_next/static).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },

  // ============ REDIRECTS ============
  async redirects() {
    return [
      // 301 Permanent Redirects for SEO clean-up
      {
        source: "/$",
        destination: "/",
        permanent: true,
      },
      {
        source: "/&",
        destination: "/",
        permanent: true,
      },
      // Festivals Redirects
      {
        source: "/festivals/mewar",
        destination: "/festivals/mewar-festival",
        permanent: true,
      },
      {
        source: "/festivals/teej",
        destination: "/festivals/teej-festival",
        permanent: true,
      },
      // Shopping Redirects
      {
        source: "/shopping/sardar-market",
        destination: "/shopping/sardar-market-clock-tower",
        permanent: true,
      },
      {
        source: "/shopping/hathi-pol",
        destination: "/shopping/hathi-pol-bazaar",
        permanent: true,
      },
      // Same clean-up redirects for the Hindi (/hi) versions
      { source: "/hi/festivals/mewar", destination: "/hi/festivals/mewar-festival", permanent: true },
      { source: "/hi/festivals/teej", destination: "/hi/festivals/teej-festival", permanent: true },
      { source: "/hi/shopping/sardar-market", destination: "/hi/shopping/sardar-market-clock-tower", permanent: true },
      { source: "/hi/shopping/hathi-pol", destination: "/hi/shopping/hathi-pol-bazaar", permanent: true },
      // Legacy redirects
      {
        source: "/hotels",
        destination: "/places",
        permanent: true,
      },
    ];
  },

  // ============ PERFORMANCE ============
  poweredByHeader: false, // Remove X-Powered-By header
  reactStrictMode: true,

  // ============ EXPERIMENTAL & OUTPUT ============
  outputFileTracingRoot: process.cwd(),

  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;