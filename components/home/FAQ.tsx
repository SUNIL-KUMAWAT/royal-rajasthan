"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQS = [
    {
        question: "What is the best time to visit Rajasthan?",
        answer:
            "The best time to visit Rajasthan is from October to March when the weather is pleasant (10°C-25°C). Winter months (November-February) are ideal for sightseeing. Avoid May-June as temperatures can reach 45°C+. Monsoon (July-September) brings lush greenery but some areas may be inaccessible.",
    },
    {
        question: "Which are the most famous forts in Rajasthan?",
        answer:
            "The most famous forts in Rajasthan include Amber Fort (Jaipur), Mehrangarh Fort (Jodhpur), Jaisalmer Fort (Jaisalmer), Chittorgarh Fort, Kumbhalgarh Fort, Ranthambore Fort, and Junagarh Fort (Bikaner). Amber Fort, Mehrangarh Fort, and Jaisalmer Fort are among the most visited UNESCO and heritage sites.",
    },
    {
        question: "How many days are enough to cover Rajasthan?",
        answer:
            "For a complete Rajasthan tour covering major cities, 12-15 days is recommended. For a short trip covering Jaipur-Jodhpur-Jaisalmer, 7-8 days is sufficient. For the Golden Triangle (Delhi-Agra-Jaipur), 5-6 days is enough. Use our Trip Planner to create a customized itinerary.",
    },
    {
        question: "What is the entry fee for Amber Fort Jaipur?",
        answer:
            "The entry fee for Amber Fort is ₹100 for Indian nationals and ₹500 for foreign nationals. Children below 7 years are free. The fort is open from 8:00 AM to 5:30 PM daily. A Light & Sound Show is also held in the evenings for an additional charge.",
    },
    {
        question: "Is Rajasthan safe for tourists?",
        answer:
            "Yes, Rajasthan is generally very safe for tourists including solo female travelers. The state is one of the most tourist-friendly in India. Standard precautions apply - keep your belongings safe, use registered transport, and be aware of common tourist scams. The police maintain a strong presence at major tourist sites.",
    },
    {
        question: "What are the top places to visit in Udaipur?",
        answer:
            "Top places to visit in Udaipur include City Palace (most comprehensive palace complex in Rajasthan), Lake Pichola (boat rides at sunset), Jag Mandir Island Palace, Sajjangarh (Monsoon Palace), Saheliyon Ki Bari, Bagore Ki Haveli, and Jagdish Temple. Udaipur is also called the Venice of the East.",
    },
    {
        question: "How to reach Jaisalmer from Jaipur?",
        answer:
            "You can reach Jaisalmer from Jaipur by: (1) Train - Several trains run from Jaipur to Jaisalmer (10-12 hours), the most popular being the Jaisalmer Express. (2) Bus - Rajasthan State Transport buses run daily (12-14 hours). (3) Car/Taxi - Road trip of approximately 575 km (8-9 hours via NH-11). (4) Flight - Via Jodhpur, then road to Jaisalmer.",
    },
    {
        question: "What is special about Pushkar?",
        answer:
            "Pushkar is one of the oldest cities in India with the only Brahma Temple in the world. It sits around a sacred lake (Pushkar Lake) with 52 bathing ghats. The city is famous for the annual Pushkar Camel Fair (November), which is one of the world's largest camel fairs. Pushkar is a meat-free and alcohol-free holy city, popular with both pilgrims and international travelers.",
    },
    {
        question: "What are UNESCO World Heritage Sites in Rajasthan?",
        answer:
            "Rajasthan has 6 UNESCO World Heritage Sites: (1) Hill Forts of Rajasthan (2013) - includes Amber Fort, Jaisalmer Fort, Kumbhalgarh Fort, Ranthambore Fort, Gagron Fort, and Chittorgarh Fort. (2) Jantar Mantar, Jaipur (2010). (3) Keladevi Wildlife Sanctuary (part of Tiger Reserves). These sites are recognized for their outstanding universal value.",
    },
    {
        question: "What should I pack for a Rajasthan trip?",
        answer:
            "For Rajasthan: Lightweight cotton clothes (summers), warm layers (winters), comfortable walking shoes, sunscreen (SPF 50+), sunglasses, hat/scarf, water bottle, basic medications, insect repellent (for wildlife areas), modest clothing for temple visits (cover shoulders and knees), and a power bank. Always carry cash as rural areas may not accept cards.",
    },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // FAQ Schema for rich results
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <section className="py-24 bg-white dark:bg-gray-900">
            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-yellow-600 text-sm font-semibold tracking-widest uppercase">
                        Common Questions
                    </span>
                    <h2 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        Everything you need to know about visiting Rajasthan
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {FAQS.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                            >
                                <h3 className="font-semibold text-gray-800 dark:text-white pr-4 text-lg">
                                    {faq.question}
                                </h3>
                                <div className="flex-shrink-0">
                                    {openIndex === i ? (
                                        <ChevronUp
                                            size={20}
                                            className="text-yellow-500"
                                        />
                                    ) : (
                                        <ChevronDown
                                            size={20}
                                            className="text-gray-400"
                                        />
                                    )}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Still have questions? We&apos;re here to help!
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
}