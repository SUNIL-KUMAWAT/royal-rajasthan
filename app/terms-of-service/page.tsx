import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Read our Terms of Service to understand the rules, guidelines, and agreements for using our website and services.",
    alternates: alternatesFor("/terms-of-service"),
    robots: {
        index: true,
        follow: true,
    },
};

export default function TermsOfServicePage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://rajasthanplaces.in" },
            { "@type": "ListItem", position: 2, name: "Terms of Service", item: "https://rajasthanplaces.in/terms-of-service" },
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
                        Legal Agreement
                    </span>
                    <h1 className="display-title mt-5 text-5xl sm:text-6xl md:text-7xl">
                        Terms of Service
                    </h1>
                    <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-900/10 px-4 py-1.5 text-xs text-ink-500 dark:border-white/10 dark:text-ivory-200/60">
                        Last updated: August 9, 2026
                    </p>
                </div>

                <div className="glass-strong space-y-10 rounded-[2rem] p-6 text-[15px] leading-relaxed text-ink-600 sm:p-10 md:p-14 md:text-base md:leading-loose dark:text-ivory-200/75 [&>section+section]:border-t [&>section+section]:border-ink-900/10 [&>section+section]:pt-10 dark:[&>section+section]:border-white/10">
                    <section>
                        <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-ink-900 md:text-3xl dark:text-ivory-50">1. Agreement to Terms</h2>
                        <p>
                            By accessing or using our website <span className="font-semibold text-gold-700 dark:text-gold-400">rajasthanplaces.in</span>, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-ink-900 md:text-3xl dark:text-ivory-50">2. Intellectual Property Rights</h2>
                        <p>
                            All content, features, and functionality on this website (including but not limited to information, text, displays, images, video, audio, designs, and software) are owned by us, our licensors, or other providers of such material and are protected by copyright, trademark, and other intellectual property laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-ink-900 md:text-3xl dark:text-ivory-50">3. Use License</h2>
                        <p>
                            Permission is granted to temporarily download or view one copy of the materials on our website for personal, non-commercial transitory viewing only. Under this license, you may not:
                        </p>
                        <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-gold-500">
                            <li>Modify or copy the materials.</li>
                            <li>Use the materials for any commercial purpose or public display.</li>
                            <li>Attempt to decompile or reverse engineer any software contained on the website.</li>
                            <li>Remove any copyright or other proprietary notations from the materials.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-ink-900 md:text-3xl dark:text-ivory-50">4. Disclaimer of Warranties</h2>
                        <p>
                            The materials on our website are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties, including without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-ink-900 md:text-3xl dark:text-ivory-50">5. Limitations of Liability</h2>
                        <p>
                            In no event shall Rajasthan Tourism Places or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we have been notified orally or in writing of the possibility of such damage.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-ink-900 md:text-3xl dark:text-ivory-50">6. Governing Law</h2>
                        <p>
                            These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
