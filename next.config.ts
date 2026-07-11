import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ============ IMAGE OPTIMIZATION ============
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org", // ✅ Add this for Wikipedia images
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
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
        source: "/(.*)",
        headers: [
          // Security
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
          // Cache Control for static assets
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // HTML pages - shorter cache
        source: "/:path*",
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

  // ============ EXPERIMENTAL ============
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;