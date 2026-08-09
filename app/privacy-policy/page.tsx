import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Rajasthan Tourism Places",
    description: "Read our privacy policy to understand how we collect, use, and protect your personal information when using our website.",
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
        <main className="min-h-screen bg-palace-white dark:bg-[#070b16] pt-32 pb-20 transition-colors duration-300">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-yellow-600 dark:text-yellow-400 text-xs md:text-sm font-semibold tracking-widest uppercase">
                        Legal Information
                    </span>
                    <h1 className="font-playfair text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mt-3">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-500 dark:text-white/60 mt-3 text-sm">
                        Last updated: August 9, 2026
                    </p>
                </div>

                <div className="bg-white dark:bg-white/5 rounded-3xl p-6 md:p-10 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-gray-700 dark:text-white/80 space-y-6 leading-relaxed text-sm md:text-base">
                    <section>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3">1. Introduction</h2>
                        <p>
                            Welcome to Rajasthan Tourism Places ("we," "our," or "us"). We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <span className="font-semibold text-yellow-600 dark:text-yellow-400">rajasthanplaces.in</span>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3">2. Information We Collect</h2>
                        <p>
                            We collect information that you provide directly to us (such as when subscribing to our newsletter, sending contact requests, or using our trip planner), as well as automatically collected log and usage data (such as IP addresses, browser types, page views, and device details via cookies and analytics tools).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3">3. How We Use Your Information</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>To provide, maintain, and improve our services, trip planning tools, and cultural guides.</li>
                            <li>To send you updates, newsletters, and promotional materials that may interest you.</li>
                            <li>To monitor and analyze usage trends and enhance user experience.</li>
                            <li>To protect our website against security threats, abuse, or fraudulent activities.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3">4. Cookies and Tracking Technologies</h2>
                        <p>
                            We use cookies and similar tracking technologies (like Google Analytics) to customize your browsing experience and analyze site traffic. You can manage or disable cookies in your browser settings; however, some features of our site may not function properly as a result.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3">5. Data Sharing and Disclosure</h2>
                        <p>
                            We do not sell, trade, or rent your personal information to third parties. We may share generic aggregated demographic data with trusted partners, analytics providers, and sponsors for the sole purpose of improving our site features and services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3">6. Security</h2>
                        <p>
                            We use industry-standard security measures (such as SSL encryption) to protect your personal data. However, no electronic transmission or storage method is 100% secure, and we cannot guarantee absolute data security.
                        </p>
                    </section>

                    {/* <section>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3">7. Contact Us</h2>
                        <p>
                            If you have questions or concerns about this Privacy Policy, please contact us at <span className="font-semibold text-yellow-600 dark:text-yellow-400">info@rajasthanplaces.in</span> or visit our Contact page.
                        </p>
                    </section> */}
                </div>
            </div>
        </main>
    );
}
