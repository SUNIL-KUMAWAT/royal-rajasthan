"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";

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
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const { language } = useLanguage();
    const isHi = language === "hi";

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
        <section className="relative py-24 md:py-32">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
                {/* Sticky editorial intro */}
                <Reveal className="lg:col-span-4">
                    <div className="lg:sticky lg:top-32">
                        <span className="eyebrow">{isHi ? "सामान्य प्रश्न" : "Common questions"}</span>
                        <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink-900 dark:text-ivory-50 md:text-6xl">
                            {isHi ? (
                                <>
                                    यात्रा से <em className="italic font-normal text-gold-sheen">पहले</em> जानें
                                </>
                            ) : (
                                <>
                                    Before you <em className="italic font-normal text-gold-sheen">go</em>
                                </>
                            )}
                        </h2>
                        <p className="mt-5 max-w-sm text-ink-500 dark:text-ivory-200/70">
                            {isHi
                                ? "राजस्थान यात्रा के बारे में सबसे ज़्यादा पूछे जाने वाले सवाल।"
                                : "Everything you need to know about visiting Rajasthan — seasons, tickets, routes and etiquette."}
                        </p>
                    </div>
                </Reveal>

                {/* Accordion */}
                <div className="space-y-3 lg:col-span-8">
                    {FAQS.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <Reveal
                                key={i}
                                delay={Math.min(i, 6) * 0.04}
                                className={`overflow-hidden rounded-[1.5rem] transition-all duration-500 ease-lux ${isOpen ? "glass-strong" : "glass"}`}
                            >
                                <h3>
                                    <button
                                        type="button"
                                        id={`home-faq-q-${i}`}
                                        aria-expanded={isOpen}
                                        aria-controls={`home-faq-a-${i}`}
                                        onClick={() => setOpenIndex(isOpen ? null : i)}
                                        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-sans text-base font-semibold text-ink-900 dark:text-ivory-50 md:text-lg"
                                    >
                                        <span>{faq.question}</span>
                                        <span
                                            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-500 ease-lux ${
                                                isOpen
                                                    ? "rotate-45 bg-ink-900 text-ivory-50 dark:bg-gold-400 dark:text-ink-900"
                                                    : "bg-ink-900/5 text-ink-700 dark:bg-white/10 dark:text-ivory-100"
                                            }`}
                                        >
                                            <Plus size={16} />
                                        </span>
                                    </button>
                                </h3>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={`home-faq-a-${i}`}
                                            role="region"
                                            aria-labelledby={`home-faq-q-${i}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <p className="px-6 pb-6 leading-relaxed text-ink-600 dark:text-ivory-200/75">{faq.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
