import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { MotionProvider } from "@/components/MotionProvider";
import { Cormorant_Garamond, Manrope, Tiro_Devanagari_Hindi, Noto_Sans_Devanagari } from "next/font/google";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

const Google_Analytics = 'G-BETYQHSK14'

// Display: classical editorial serif. Body: clean geometric sans.
// Devanagari faces follow in the font stack so Hindi text gets proper glyphs.
const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const displayHi = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  variable: "--font-display-hi",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

const bodyHi = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-body-hi",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F3EA" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0A08" },
  ],
};

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
  keywords: "Rajasthan tourism, places to visit in Rajasthan, Rajasthan tourist places, Jaipur tourist places, Udaipur tourist places, Jodhpur tourist places, Jaisalmer tourist places, Amber Fort Jaipur, Hawa Mahal, Mehrangarh Fort, Lake Pichola, Rajasthan travel guide, Rajasthan trip planner",

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

  // Canonical/hreflang are set per page (see lib/i18n alternatesFor). Setting one here
  // would make every page without its own canonical point at the homepage.

  // ============ APP INFO ============
  applicationName: "Rajasthan Tourism Places",
  authors: [{ name: "Rajasthan Tourism Places", url: "https://rajasthanplaces.in" }],
  creator: "Rajasthan Tourism Places",
  publisher: "Rajasthan Tourism Places",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

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

        {/* LLM & AI Search Engine Discovery */}
        <link rel="alternate" type="text/markdown" title="LLMs.txt" href="https://rajasthanplaces.in/llms.txt" />

        {/* ============ STRUCTURED DATA (JSON-LD) ============ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Rajasthan Tourism Places",
              url: "https://rajasthanplaces.in",
              logo: "https://rajasthanplaces.in/english-logo.png",
              description:
                "Complete travel guide for Rajasthan, India: forts, palaces, lakes, deserts, festivals and markets with timings, tickets and maps.",
              areaServed: {
                "@type": "State",
                name: "Rajasthan",
              },
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

      </head>
      <body className={`${display.variable} ${body.variable} ${displayHi.variable} ${bodyHi.variable} font-sans`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K9BN2J7Z"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K9BN2J7Z');
          `}
        </Script>
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
        <Script id="microsoft-clarity" strategy="lazyOnload">
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
            <MotionProvider>
              <AmbientBackground />
              <Navbar />
              <main className="relative">{children}</main>
              <Footer />
            </MotionProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
