import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | Rajasthan Tourism Places",
    description: "Read our Terms of Service to understand the rules, guidelines, and agreements for using our website and services.",
    alternates: {
        canonical: "https://rajasthanplaces.in/terms-of-service",
    },
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
        <main className="min-h-screen bg-palace-white dark:bg-[#070b16] pt-32 pb-20 transition-colors duration-300">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-yellow-600 dark:text-yellow-400 text-xs md:text-sm font-semibold tracking-widest uppercase">
                        Legal Agreement
                    </span>
                    <h1 className="font-playfair text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mt-3">
                        Terms of Service
                    </h1>
                    <p className="text-gray-500 dark:text-white/60 mt-3 text-sm">
                        Last updated: August 9, 2026
                    </p>
                </div>

                <div className="bg-white dark:bg-white/5 rounded-3xl p-6 md:p-10 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-gray-700 dark:text-white/80 space-y-6 leading-relaxed text-sm md:text-base">
                    <section>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3">1. Agreement to Terms</h2>
                        <p>
                            By accessing or using our website <span className="font-semibold text-yellow-600 dark:text-yellow-400">rajasthanplaces.in</span>, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3">2. Intellectual Property Rights</h2>
                        <p>
                            All content, features, and functionality on this website (including but not limited to information, text, displays, images, video, audio, designs, and software) are owned by us, our licensors, or other providers of such material and are protected by copyright, trademark, and other intellectual property laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3">3. Use License</h2>
                        <p>
                            Permission is granted to temporarily download or view one copy of the materials on our website for personal, non-commercial transitory viewing only. Under this license, you may not:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Modify or copy the materials.</li>
                            <li>Use the materials for any commercial purpose or public display.</li>
                            <li>Attempt to decompile or reverse engineer any software contained on the website.</li>
                            <li>Remove any copyright or other proprietary notations from the materials.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3">4. Disclaimer of Warranties</h2>
                        <p>
                            The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties, including without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3">5. Limitations of Liability</h2>
                        <p>
                            In no event shall Rajasthan Tourism Places or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we have been notified orally or in writing of the possibility of such damage.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-3">6. Governing Law</h2>
                        <p>
                            These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
