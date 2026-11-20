import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Read our privacy policy to understand how we collect, use, and protect your personal information when using our website.",
    alternates: alternatesFor("/privacy-policy"),
    robots: {
        index: true,
        follow: true,
    },
};

export default function PrivacyPolicyPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://rajasthanplaces.in" },
            { "@type": "ListItem", position: 2, name: "Privacy Policy", item: "https://rajasthanplaces.in/privacy-policy" },
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
                        Legal Information
                    </span>
                    <h1 className="display-title mt-5 text-5xl sm:text-6xl md:text-7xl">
                        Privacy Policy
                    </h1>
                    <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-900/10 px-4 py-1.5 text-xs text-ink-500 dark:border-white/10 dark:text-ivory-200/60">
                        Last updated: August 9, 2026
                    </p>
                </div>

                <div className="glass-strong space-y-10 rounded-[2rem] p-6 text-[15px] leading-relaxed text-ink-600 sm:p-10 md:p-14 md:text-base md:leading-loose dark:text-ivory-200/75 [&>section+section]:border-t [&>section+section]:border-ink-900/10 [&>section+section]:pt-10 dark:[&>section+section]:border-white/10">
                    <section>
                        <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-ink-900 md:text-3xl dark:text-ivory-50">1. Introduction</h2>
                        <p>
                            Welcome to Rajasthan Tourism Places (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <span className="font-semibold text-gold-700 dark:text-gold-400">rajasthanplaces.in</span>.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-ink-900 md:text-3xl dark:text-ivory-50">2. Information We Collect</h2>
                        <p>
                            We collect information that you provide directly to us (such as when subscribing to our newsletter, sending contact requests, or using our trip planner), as well as automatically collected log and usage data (such as IP addresses, browser types, page views, and device details via cookies and analytics tools).
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-ink-900 md:text-3xl dark:text-ivory-50">3. How We Use Your Information</h2>
                        <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-gold-500">
                            <li>To provide, maintain, and improve our services, trip planning tools, and cultural guides.</li>
                            <li>To send you updates, newsletters, and promotional materials that may interest you.</li>
                            <li>To monitor and analyze usage trends and enhance user experience.</li>
                            <li>To protect our website against security threats, abuse, or fraudulent activities.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-ink-900 md:text-3xl dark:text-ivory-50">4. Cookies and Tracking Technologies</h2>
                        <p>
                            We use cookies and similar tracking technologies (like Google Analytics) to customize your browsing experience and analyze site traffic. You can manage or disable cookies in your browser settings; however, some features of our site may not function properly as a result.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-ink-900 md:text-3xl dark:text-ivory-50">5. Data Sharing and Disclosure</h2>
                        <p>
                            We do not sell, trade, or rent your personal information to third parties. We may share generic aggregated demographic data with trusted partners, analytics providers, and sponsors for the sole purpose of improving our site features and services.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-ink-900 md:text-3xl dark:text-ivory-50">6. Security</h2>
                        <p>
                            We use industry-standard security measures (such as SSL encryption) to protect your personal data. However, no electronic transmission or storage method is 100% secure, and we cannot guarantee absolute data security.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-ink-900 md:text-3xl dark:text-ivory-50">7. Contact Us</h2>
                        <p>
                            If you have questions or concerns about this Privacy Policy, please contact us at <span className="font-semibold text-gold-700 dark:text-gold-400">sunilkumawat.india@gmail.com</span> or visit our Contact page.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
