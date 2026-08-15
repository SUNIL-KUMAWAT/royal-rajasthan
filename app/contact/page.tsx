// app/contact/page.tsx — Server Component with SEO metadata
import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: "Contact Us - Plan Your Rajasthan Trip | Rajasthan Tourism Places",
    description:
        "Get in touch with Rajasthan Tourism Places. Call, email or WhatsApp us to plan your perfect Rajasthan trip. Expert travel consultants available Mon-Sat 9AM-7PM IST.",
    keywords: [
        "contact Rajasthan Tourism Places",
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
                url: "https://picsum.photos/seed/raj-1096/800/600",
                width: 1200,
                height: 630,
                alt: "Contact Rajasthan Tourism Places",
            },
        ],
        type: "website",
        siteName: "Rajasthan Tourism Places",
        locale: "en_IN",
        url: "https://rajasthanplaces.in/contact",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Us - Plan Your Rajasthan Trip",
        description:
            "Get in touch with our expert travel consultants for your Rajasthan trip.",
        images: ["https://picsum.photos/seed/raj-1097/800/600"],
        site: "@rajasthanplaces",
        creator: "@rajasthanplaces",
    },
    alternates: {
        canonical: "https://rajasthanplaces.in/contact",
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
        name: "Contact Rajasthan Tourism Places",
        url: "https://rajasthanplaces.in/contact",
        mainEntity: {
            "@type": "TravelAgency",
            name: "Rajasthan Tourism Places",
            telephone: "+91-99999-99999",
            email: "sunilkumawat.india@gmail.com",
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
                telephone: "+91-99999-99999",
                contactType: "customer service",
                availableLanguage: ["English", "Hindi"],
            },
        },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://rajasthanplaces.in" },
            { "@type": "ListItem", position: 2, name: "Contact", item: "https://rajasthanplaces.in/contact" },
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