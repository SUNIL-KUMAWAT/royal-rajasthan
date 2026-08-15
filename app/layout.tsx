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
  // ============ BASE URL (Required for OG image resolution) ============
  metadataBase: new URL("https://rajasthanplaces.in"),

  // ============ BASIC SEO ============
  title: {
    default: "Rajasthan Tourism Places - Explore Famous Places of Rajasthan",
    template: "%s | Rajasthan Tourism Places",
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
    "famous places in Rajasthan",
    "top places to visit in Rajasthan",
    "famous tourist places in Rajasthan",
    "must visit places in Rajasthan",
    "Rajasthan historical places"
  ],

  // ============ OPEN GRAPH (Facebook/WhatsApp) ============
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://rajasthanplaces.in",
    siteName: "Rajasthan Tourism Places",
    title: "Rajasthan Tourism Places - Explore the Land of Kings",
    description:
      "Discover 500+ historic forts, golden deserts, royal palaces & wildlife sanctuaries. Complete travel guide with timing, tickets & trip planner.",
    images: [
      {
        url: "https://rajasthanplaces.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Amber Fort Jaipur - Rajasthan Tourism Places",
      },
    ],
  },

  // ============ TWITTER CARD ============
  twitter: {
    card: "summary_large_image",
    site: "@Rajasthan-places",
    creator: "@Rajasthan-places",
    title: "Rajasthan Tourism Places - Explore the Land of Kings",
    description:
      "Discover 500+ historic forts, golden deserts, and royal palaces. Plan your perfect Rajasthan trip!",
    images: [
      "https://rajasthanplaces.in/og-image.jpg",
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
    canonical: "https://rajasthanplaces.in",
  },

  // ============ APP INFO ============
  applicationName: "Rajasthan Tourism Places",
  authors: [{ name: "Rajasthan Tourism Places" }],
  generator: "Next.js",
  creator: "Rajasthan Tourism Places",
  publisher: "Rajasthan Tourism Places",

  // ============ ICONS ============
  icons: {
    icon: "/english-logo-bg.png",
    shortcut: "/english-logo-bg.png",
    apple: "/english-logo-bg.png",
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
              name: "Rajasthan Tourism Places",
              url: "https://rajasthanplaces.in",
              logo: "https://rajasthanplaces.in/logo.png",
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
              telephone: "+91-99999-99999",
              email: "sunilkumawat.india@gmail.com",
              sameAs: [
                "https://facebook.com/rajasthan-places",
                "https://twitter.com/rajasthan-places",
                "https://instagram.com/rajasthan-places",
                "https://youtube.com/rajasthan-places",
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
              name: "Rajasthan Tourism Places",
              url: "https://rajasthanplaces.in",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://rajasthanplaces.in/places?search={search_term_string}",
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
                  item: "https://rajasthanplaces.in",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Places",
                  item: "https://rajasthanplaces.in/places",
                },
              ],
            }),
          }}
        />
        {/* Moved GTM script to body to prevent Next.js head hydration errors */}
      </head>
      <body className={`${inter.variable} ${playfair.variable} bg-palace-white dark:bg-gray-950 transition-colors duration-300`}>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K9BN2J7Z');
          `}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K9BN2J7Z"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xz3u5w08vs");
          `}
        </Script>
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
