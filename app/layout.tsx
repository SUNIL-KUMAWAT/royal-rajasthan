import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

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
        url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=630&fit=crop",
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
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200",
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

  // ============ VERIFICATION ============
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-code",
    yahoo: "your-yahoo-code",
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

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
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
      <body className="bg-palace-white dark:bg-gray-950 transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import "./globals.css";
// import { Navbar } from "@/components/layout/Navbar";
// import { Footer } from "@/components/layout/Footer";
// import { ThemeProvider } from "@/components/ThemeProvider";

// export const metadata: Metadata = {
//   title: "Royal Rajasthan - Explore Famous Places of Rajasthan",
//   description:
//     "Discover famous tourist places of Rajasthan with timing, tickets, location, history, and complete details.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         {/* Prevent dark mode flash */}
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               try {
//                 const theme = localStorage.getItem('theme');
//                 if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//                   document.documentElement.classList.add('dark');
//                 } else {
//                   document.documentElement.classList.remove('dark');
//                 }
//               } catch (e) {}
//             `,
//           }}
//         />
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link
//           rel="preconnect"
//           href="https://fonts.gstatic.com"
//           crossOrigin=""
//         />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body className="bg-palace-white dark:bg-gray-950 transition-colors duration-300">
//         <ThemeProvider>
//           <Navbar />
//           <main>{children}</main>
//           <Footer />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }