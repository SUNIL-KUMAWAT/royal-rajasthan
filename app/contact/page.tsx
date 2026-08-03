// app/contact/page.tsx — Server Component with SEO metadata
import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: "Contact Us - Plan Your Rajasthan Trip | Royal Rajasthan Tourism",
    description:
        "Get in touch with Royal Rajasthan Tourism. Call, email or WhatsApp us to plan your perfect Rajasthan trip. Expert travel consultants available Mon-Sat 9AM-7PM IST.",
    keywords: [
        "contact Royal Rajasthan Tourism",
        "Rajasthan travel inquiry",
        "plan Rajasthan trip",
        "Rajasthan tour booking",
        "Jaipur travel agent contact",
        "Rajasthan tourism help",
        "book Rajasthan tour",
    ],
    openGraph: {
        title: "Contact Us - Plan Your Rajasthan Trip",
        description:
            "Get in touch with our expert travel consultants to plan your perfect Rajasthan adventure.",
        images: [
            {
                url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=630&fit=crop",
                width: 1200,
                height: 630,
                alt: "Contact Royal Rajasthan Tourism",
            },
        ],
        type: "website",
        siteName: "Royal Rajasthan Tourism",
        locale: "en_IN",
        url: "https://royalrajasthan.com/contact",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Us - Plan Your Rajasthan Trip",
        description:
            "Get in touch with our expert travel consultants for your Rajasthan trip.",
        images: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200"],
        site: "@RoyalRajasthan",
        creator: "@RoyalRajasthan",
    },
    alternates: {
        canonical: "https://royalrajasthan.com/contact",
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

export default function ContactPage() {
    const contactSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Royal Rajasthan Tourism",
        url: "https://royalrajasthan.com/contact",
        mainEntity: {
            "@type": "TravelAgency",
            name: "Royal Rajasthan Tourism",
            telephone: "+91-98765-43210",
            email: "info@royalrajasthan.com",
            address: {
                "@type": "PostalAddress",
                streetAddress: "MI Road",
                addressLocality: "Jaipur",
                addressRegion: "Rajasthan",
                postalCode: "302001",
                addressCountry: "IN",
            },
            openingHours: "Mo-Sa 09:00-19:00",
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-98765-43210",
                contactType: "customer service",
                availableLanguage: ["English", "Hindi"],
            },
        },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://royalrajasthan.com" },
            { "@type": "ListItem", position: 2, name: "Contact", item: "https://royalrajasthan.com/contact" },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ContactClient />
        </>
    );
}