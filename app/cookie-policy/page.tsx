import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n";

export const metadata: Metadata = {
    title: "Cookie Policy",
    description: "Read our Cookie Policy to learn how we use cookies and similar tracking technologies to improve your experience.",
    alternates: alternatesFor("/cookie-policy"),
    robots: {
        index: true,
        follow: true,
    },
};

export default function CookiePolicyPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://rajasthanplaces.in" },
            { "@type": "ListItem", position: 2, name: "Cookie Policy", item: "https://rajasthanplaces.in/cookie-policy" },
        ],
    };

    return (
        <div className="relative isolate min-h-screen overflow-hidden pb-24 pt-28 md:pt-36">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-40 left-1/3 h-[32rem] w-[32rem] rounded-full bg-gold-500/15 blur-[140px] dark:bg-gold-500/10" />
                <div className="absolute top-1/2 -right-40 h-[28rem] w-[28rem] rounded-full bg-maroon-500/10 blur-[140px] dark:bg-maroon-500/20" />
            </div>
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 md:mb-16">
                    <span className="eyebrow">
                        Cookie Information
                    </span>
                    <h1 className="display-title mt-5 text-5xl sm:text-6xl md:text-7xl">
                        Cookie Policy
                    </h1>
                    <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-900/10 px-4 py-1.5 text-xs text-ink-500 dark:border-white/10 dark:text-ivory-200/60">
                        Last updated: August 9, 2026
                    </p>
                </div>

                <div className="glass-strong space-y-10 rounded-[2rem] p-6 text-[15px] leading-relaxed text-ink-600 sm:p-10 md:p-14 md:text-base md:leading-loose dark:text-ivory-200/75 [&>section+section]:border-t [&>section+section]:border-ink-900/10 [&>section+section]:pt-10 dark:[&>section+section]:border-white/10">
                    <section>
                        <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-ink-900 md:text-3xl dark:text-ivory-50">1. What Are Cookies?</h2>
                        <p>
                            Cookies are small text files placed on your device (computer, tablet, or mobile) by websites you visit. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-ink-900 md:text-3xl dark:text-ivory-50">2. How We Use Cookies</h2>
                        <p>
                            We use cookies to understand how you interact with our website <span className="font-semibold text-gold-700 dark:text-gold-400">rajasthanplaces.in</span>, store your preferences (such as language selection), and compile anonymous traffic data so we can enhance our overall platform experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-ink-900 md:text-3xl dark:text-ivory-50">3. Types of Cookies We Use</h2>
                        <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-gold-500">
                            <li><strong>Essential Cookies:</strong> Necessary for the basic functionality of our website, enabling core features like security and accessibility.</li>
                            <li><strong>Preference Cookies:</strong> Used to remember choices you make (such as language or region preferences) to provide a more personalized experience.</li>
                            <li><strong>Performance and Analytics Cookies:</strong> Primarily Google Analytics, which helps us understand how visitors interact with our content anonymously.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-ink-900 md:text-3xl dark:text-ivory-50">4. Controlling Cookies</h2>
                        <p>
                            Most web browsers allow you to control cookies through their settings preferences. You can configure your browser to reject cookies, delete existing cookies, or notify you when a new cookie is placed. Note that disabling cookies may affect the usability of certain parts of our website.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-ink-900 md:text-3xl dark:text-ivory-50">5. Policy Updates</h2>
                        <p>
                            We may update this Cookie Policy from time to time to reflect changes in our usage of tracking technologies. Any updates will be posted on this page with a revised date.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
