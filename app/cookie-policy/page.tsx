import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cookie Policy | Rajasthan Tourism Places",
    description: "Read our Cookie Policy to learn how we use cookies and similar tracking technologies to improve your experience.",
    alternates: {
        canonical: "https://rajasthanplaces.in/cookie-policy",
    },
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
        <main className="min-h-screen bg-palace-white dark:bg-[#070b16] pt-32 pb-20 transition-colors duration-300">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-yellow-600 dark:text-yellow-400 text-xs md:text-sm font-semibold tracking-widest uppercase">
                        Cookie Information
                    </span>
                    <h1 className="font-playfair text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mt-3">
                        Cookie Policy
                    </h1>
                    <p className="text-gray-500 dark:text-white/60 mt-3 text-sm">
                        Last updated: August 9, 2026
                    </p>
                </div>

                <div className="bg-white dark:bg-white/5 rounded-3xl p-6 md:p-10 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-gray-700 dark:text-white/80 space-y-6 leading-relaxed text-sm md:text-base">
                    <section>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3">1. What Are Cookies?</h2>
                        <p>
                            Cookies are small text files placed on your device (computer, tablet, or mobile) by websites you visit. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3">2. How We Use Cookies</h2>
                        <p>
                            We use cookies to understand how you interact with our website <span className="font-semibold text-yellow-600 dark:text-yellow-400">rajasthanplaces.in</span>, store your preferences (such as language selection), and compile anonymous traffic data so we can enhance our overall platform experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3">3. Types of Cookies We Use</h2>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li><strong>Essential Cookies:</strong> Necessary for the basic functionality of our website, enabling core features like security and accessibility.</li>
                            <li><strong>Preference Cookies:</strong> Used to remember choices you make (such as language or region preferences) to provide a more personalized experience.</li>
                            <li><strong>Performance and Analytics Cookies:</strong> Primarily Google Analytics, which helps us understand how visitors interact with our content anonymously.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3">4. Controlling Cookies</h2>
                        <p>
                            Most web browsers allow you to control cookies through their settings preferences. You can configure your browser to reject cookies, delete existing cookies, or notify you when a new cookie is placed. Note that disabling cookies may affect the usability of certain parts of our website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3">5. Policy Updates</h2>
                        <p>
                            We may update this Cookie Policy from time to time to reflect changes in our usage of tracking technologies. Any updates will be posted on this page with a revised date.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
