import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // ============ SEO METADATA ============
  htmlLimitedBots: /.*/,
  // Disable ESLint during builds due to version incompatibility
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ============ IMAGE OPTIMIZATION ============
  images: {
    unoptimized: true,
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
      {
        // Static assets ONLY — immutable long-term cache
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
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
      // Redirect old URLs if any
      {
        source: "/destinations",
        destination: "/places",
        permanent: true, // 301 redirect - good for SEO
      },
      {
        source: "/destinations/:slug",
        destination: "/places/:slug",
        permanent: true,
      },
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