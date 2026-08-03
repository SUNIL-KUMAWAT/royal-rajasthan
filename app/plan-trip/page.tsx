// app/plan-trip/page.tsx
// NO "use client" here
import type { Metadata } from "next";
import PlanTripClient from "./PlanTripClient";

export const metadata: Metadata = {
    title: "Plan Your Rajasthan Trip - Free Itinerary Planner | Royal Rajasthan",
    description:
        "Plan your perfect Rajasthan trip with our free itinerary planner. Select cities, set duration, choose interests and get a personalized day-by-day travel plan for Jaipur, Udaipur, Jodhpur, Jaisalmer & more.",
    keywords: [
        "Rajasthan trip planner",
        "Rajasthan itinerary",
        "plan Rajasthan trip",
        "Rajasthan travel planner",
        "Jaipur Udaipur Jodhpur itinerary",
        "Rajasthan tour plan",
        "free Rajasthan itinerary planner",
        "Rajasthan travel guide",
        "best Rajasthan tour plan",
        "Rajasthan 7 days itinerary",
        "Rajasthan 10 days itinerary",
        "Rajasthan 5 days trip plan",
        "customized Rajasthan tour",
        "Rajasthan holiday planner",
    ],
    openGraph: {
        title: "Plan Your Perfect Rajasthan Trip - Free Itinerary Planner",
        description:
            "Create a personalized Rajasthan itinerary in minutes. Select cities, duration & interests to get your perfect day-by-day travel plan.",
        images: [
            {
                url: "https://picsum.photos/seed/raj-1130/800/600",
                width: 1200,
                height: 630,
                alt: "Plan Your Rajasthan Trip - Royal Rajasthan Tourism",
            },
        ],
        type: "website",
        siteName: "Royal Rajasthan Tourism",
        locale: "en_IN",
        url: "https://royalrajasthan.com/plan-trip",
    },
    twitter: {
        card: "summary_large_image",
        title: "Plan Your Perfect Rajasthan Trip - Free Itinerary Planner",
        description:
            "Create a personalized Rajasthan itinerary in minutes. Select cities, duration & interests.",
        images: [
            "https://picsum.photos/seed/raj-1131/800/600",
        ],
        site: "@RoyalRajasthan",
        creator: "@RoyalRajasthan",
    },
    alternates: {
        canonical: "https://royalrajasthan.com/plan-trip",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function PlanTripPage() {
    // JSON-LD Schema for Trip Planner
    const plannerSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Royal Rajasthan Trip Planner",
        description:
            "Free online tool to plan your Rajasthan trip itinerary. Select cities, duration and interests to get a personalized travel plan.",
        url: "https://royalrajasthan.com/plan-trip",
        applicationCategory: "TravelApplication",
        operatingSystem: "Web Browser",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "INR",
        },
        featureList: [
            "City Selection",
            "Custom Duration Planning",
            "Interest-based Recommendations",
            "Day-by-Day Itinerary",
            "PDF Download",
            "Share Itinerary",
        ],
        provider: {
            "@type": "Organization",
            name: "Royal Rajasthan Tourism",
            url: "https://royalrajasthan.com",
        },
    };

    const breadcrumbSchema = {
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
                name: "Plan Trip",
                item: "https://royalrajasthan.com/plan-trip",
            },
        ],
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "How many days are enough for a Rajasthan trip?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "For a complete Rajasthan tour, 10-15 days is ideal. For a short trip covering Jaipur-Jodhpur-Jaisalmer, 7-8 days is sufficient. For Jaipur only, 3-4 days is enough.",
                },
            },
            {
                "@type": "Question",
                name: "What is the best time to visit Rajasthan?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "The best time to visit Rajasthan is October to March when the weather is pleasant (10°C-25°C). Avoid May-June as temperatures can exceed 45°C.",
                },
            },
            {
                "@type": "Question",
                name: "Which cities should I include in my Rajasthan itinerary?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "The must-visit cities in Rajasthan are Jaipur (Pink City), Udaipur (Lake City), Jodhpur (Blue City), and Jaisalmer (Golden City). Pushkar, Mount Abu, and Ranthambore are also popular additions.",
                },
            },
            {
                "@type": "Question",
                name: "Is it safe to travel to Rajasthan?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Rajasthan is generally very safe for tourists including solo female travelers. It is one of India's most tourist-friendly states with a strong police presence at major attractions.",
                },
            },
        ],
    };

    return (
        <>
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(plannerSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />

            {/* Client Component */}
            <PlanTripClient />
        </>
    );
}