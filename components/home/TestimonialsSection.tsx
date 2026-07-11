"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

export function TestimonialsSection() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((p) => (p + 1) % TESTIMONIALS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 bg-gradient-to-br from-palace-white via-sand/20 to-gold-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-gold-500 text-sm font-semibold tracking-widest uppercase">
                        Traveler Stories
                    </span>
                    <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mt-3">
                        What Our Guests Say
                    </h2>
                </motion.div>

                <div className="relative max-w-4xl mx-auto mb-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="bg-white rounded-3xl p-8 md:p-12 shadow-royal relative overflow-hidden"
                        >
                            <Quote
                                size={80}
                                className="text-gold-100 absolute top-6 right-6"
                            />
                            <div className="flex gap-1 mb-6">
                                {Array.from({ length: TESTIMONIALS[current].rating }).map(
                                    (_, i) => (
                                        <Star
                                            key={i}
                                            size={20}
                                            className="text-yellow-400 fill-yellow-400"
                                        />
                                    )
                                )}
                            </div>
                            <p className="text-gray-600 text-xl leading-relaxed mb-8 relative z-10">
                                &ldquo;{TESTIMONIALS[current].review}&rdquo;
                            </p>
                            <div className="flex items-center gap-4">
                                <img
                                    src={TESTIMONIALS[current].avatar}
                                    alt={TESTIMONIALS[current].name}
                                    className="w-14 h-14 rounded-full object-cover border-4 border-gold-400"
                                />
                                <div>
                                    <div className="font-bold text-gray-900">
                                        {TESTIMONIALS[current].name}
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        {TESTIMONIALS[current].country}
                                    </div>
                                    <div className="text-gold-500 text-sm font-medium mt-1">
                                        {TESTIMONIALS[current].tour}
                                    </div>
                                </div>
                                <div className="ml-auto text-gray-300 text-sm">
                                    {TESTIMONIALS[current].date}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-center gap-3 mt-6">
                        <button
                            onClick={() =>
                                setCurrent(
                                    (p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                                )
                            }
                            className="w-10 h-10 rounded-full border-2 border-gold-400 text-gold-500 hover:bg-gold-400 hover:text-white flex items-center justify-center transition-all"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`rounded-full transition-all ${i === current
                                    ? "bg-gold-500 w-8 h-3"
                                    : "bg-gray-200 w-3 h-3"
                                    }`}
                            />
                        ))}
                        <button
                            onClick={() =>
                                setCurrent((p) => (p + 1) % TESTIMONIALS.length)
                            }
                            className="w-10 h-10 rounded-full border-2 border-gold-400 text-gold-500 hover:bg-gold-400 hover:text-white flex items-center justify-center transition-all"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TESTIMONIALS.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setCurrent(i)}
                            className={`bg-white rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-1 shadow-sm hover:shadow-md ${i === current ? "ring-2 ring-gold-400" : ""
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <img
                                    src={t.avatar}
                                    alt={t.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-semibold text-sm text-gray-800">
                                        {t.name}
                                    </div>
                                    <div className="text-gray-400 text-xs">{t.country}</div>
                                </div>
                            </div>
                            <div className="flex gap-0.5 mb-2">
                                {Array.from({ length: t.rating }).map((_, j) => (
                                    <Star
                                        key={j}
                                        size={12}
                                        className="text-yellow-400 fill-yellow-400"
                                    />
                                ))}
                            </div>
                            <p className="text-gray-500 text-xs line-clamp-3">{t.review}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export const TESTIMONIALS = [
    {
        id: 1,
        name: "Sarah Mitchell",
        country: "United Kingdom",
        avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        rating: 5,
        tour: "Royal Heritage Tour",
        review:
            "An absolutely breathtaking journey through Rajasthan! The palaces, forts, and deserts exceeded all our expectations. A truly royal experience!",
        date: "November 2024",
        isFeatured: true,
    },
    {
        id: 2,
        name: "James & Emma Wilson",
        country: "Australia",
        avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        rating: 5,
        tour: "Udaipur Honeymoon Package",
        review:
            "Our honeymoon in Udaipur was pure magic! Lake Pichola at sunset and the City Palace made it unforgettable. We will definitely return!",
        date: "October 2024",
        isFeatured: true,
    },
    {
        id: 3,
        name: "Rajesh Kumar",
        country: "India",
        avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        rating: 5,
        tour: "Desert Safari Adventure",
        review:
            "The desert safari experience was phenomenal! Camping under the stars in Jaisalmer with folk music was a dream come true!",
        date: "December 2024",
        isFeatured: true,
    },
    {
        id: 4,
        name: "Priya Nakamura",
        country: "Japan",
        avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        rating: 4,
        tour: "Rajasthan Family Tour",
        review:
            "Our family trip was incredible. The kids loved the elephant rides at Amber Fort and the tiger safari at Ranthambore!",
        date: "January 2025",
        isFeatured: true,
    },
];