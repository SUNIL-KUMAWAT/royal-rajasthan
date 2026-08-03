import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Playfair_Display, Inter } from "next/font/google";

const Google_Analytics = 'G-BETYQHSK14'
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  // ============ BASIC SEO ============
  title: {
    default: "Royal Rajasthan Tourism - Explore Famous Places of Rajasthan",
    template: "%s | Royal Rajasthan Tourism",
  },
  description:
    "Discover the most famous tourist places in Rajasthan with complete details - timing, ticket prices, history, location & travel tips. Plan your perfect Rajasthan trip today!",
  keywords: [
    "Rajasthan tourism",
    "places to visit in Rajasthan",
    "Rajasthan tourist places",
    "Jaipur tourist places",
    "Udaipur tourist places",
    "Jodhpur tourist places",
    "Jaisalmer tourist places",
    "Amber Fort Jaipur",
    "Hawa Mahal",
    "Mehrangarh Fort",
    "Lake Pichola",
    "Rajasthan travel guide",
    "Rajasthan trip planner",
    "best places in Rajasthan",
    "Rajasthan heritage sites",
    "Rajasthan forts and palaces",
    "Rajasthan desert safari",
    "Ranthambore tiger safari",
    "Pushkar camel fair",
    "Rajasthan UNESCO sites",
  ],

  // ============ OPEN GRAPH (Facebook/WhatsApp) ============
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://royalrajasthan.com",
    siteName: "Royal Rajasthan Tourism",
    title: "Royal Rajasthan Tourism - Explore the Land of Kings",
    description:
      "Discover 500+ historic forts, golden deserts, royal palaces & wildlife sanctuaries. Complete travel guide with timing, tickets & trip planner.",
    images: [
      {
        url: "https://picsum.photos/seed/raj-1116/800/600",
        width: 1200,
        height: 630,
        alt: "Amber Fort Jaipur - Royal Rajasthan Tourism",
      },
    ],
  },

  // ============ TWITTER CARD ============
  twitter: {
    card: "summary_large_image",
    site: "@RoyalRajasthan",
    creator: "@RoyalRajasthan",
    title: "Royal Rajasthan Tourism - Explore the Land of Kings",
    description:
      "Discover 500+ historic forts, golden deserts, and royal palaces. Plan your perfect Rajasthan trip!",
    images: [
      "https://picsum.photos/seed/raj-1117/800/600",
    ],
  },

  // ============ ROBOTS ============
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

  // ============ CANONICAL URL ============
  alternates: {
    canonical: "https://royalrajasthan.com",
    languages: {
      "en-IN": "https://royalrajasthan.com",
      "hi-IN": "https://royalrajasthan.com/hi",
    },
  },

  // ============ APP INFO ============
  applicationName: "Royal Rajasthan Tourism",
  authors: [{ name: "Royal Rajasthan Tourism" }],
  generator: "Next.js",
  creator: "Royal Rajasthan Tourism",
  publisher: "Royal Rajasthan Tourism",

  // ============ ICONS ============
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // ============ MANIFEST ============
  manifest: "/site.webmanifest",

  // ============ CATEGORY ============
  category: "travel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent dark mode flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />

        {/* ============ STRUCTURED DATA (JSON-LD) ============ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Royal Rajasthan Tourism",
              url: "https://royalrajasthan.com",
              logo: "https://royalrajasthan.com/logo.png",
              description:
                "Complete travel guide for Rajasthan, India. Explore 500+ historic forts, golden deserts, royal palaces, and wildlife sanctuaries.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "MI Road",
                addressLocality: "Jaipur",
                addressRegion: "Rajasthan",
                postalCode: "302001",
                addressCountry: "IN",
              },
              telephone: "+91-98765-43210",
              email: "info@royalrajasthan.com",
              sameAs: [
                "https://facebook.com/royalrajasthan",
                "https://twitter.com/royalrajasthan",
                "https://instagram.com/royalrajasthan",
                "https://youtube.com/royalrajasthan",
              ],
              areaServed: {
                "@type": "State",
                name: "Rajasthan",
                addressCountry: "IN",
              },
              hasMap: "https://maps.google.com/?q=Jaipur+Rajasthan",
              openingHours: "Mo-Sa 09:00-18:00",
              priceRange: "₹₹",
            }),
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Royal Rajasthan Tourism",
              url: "https://royalrajasthan.com",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://royalrajasthan.com/places?search={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://royalrajasthan.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Places",
                  item: "https://royalrajasthan.com/places",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} bg-palace-white dark:bg-gray-950 transition-colors duration-300`}>
        {Google_Analytics && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${Google_Analytics}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${Google_Analytics}');
              `}
            </Script>
          </>
        )}
        <LanguageProvider>
          <ThemeProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
