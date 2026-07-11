"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Clock, MapPin } from "lucide-react";
import { ATTRACTIONS } from "@/constants/data";

export function AttractionsSlider() {
    const [current, setCurrent] = useState(0);
    const visibleCount = 3;

    const next = () =>
        setCurrent((p) => Math.min(p + 1, ATTRACTIONS.length - visibleCount));
    const prev = () => setCurrent((p) => Math.max(p - 1, 0));

    return (
        <section className="py-24 bg-gradient-to-br from-sand/30 via-palace-white to-gold-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-gold-500 text-sm font-semibold tracking-widest uppercase">
                            Must Visit
                        </span>
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mt-2">
                            Featured Attractions
                        </h2>
                    </motion.div>
                    <div className="flex gap-3">
                        <button
                            onClick={prev}
                            disabled={current === 0}
                            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${current === 0
                                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                                    : "border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white"
                                }`}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={next}
                            disabled={current >= ATTRACTIONS.length - visibleCount}
                            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${current >= ATTRACTIONS.length - visibleCount
                                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                                    : "border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white"
                                }`}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden">
                    <motion.div
                        animate={{ x: `-${current * (100 / visibleCount)}%` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="flex gap-6"
                        style={{ width: `${(ATTRACTIONS.length * 100) / visibleCount}%` }}
                    >
                        {ATTRACTIONS.map((attraction) => (
                            <div
                                key={attraction.id}
                                style={{ width: `${100 / ATTRACTIONS.length}%` }}
                                className="flex-shrink-0"
                            >
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-royal transition-all duration-500 h-full"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={attraction.image}
                                            alt={attraction.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-gold-gradient text-white text-xs font-bold px-3 py-1 rounded-full">
                                                {attraction.category}
                                            </span>
                                        </div>
                                        <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                                            <Star
                                                size={12}
                                                className="text-yellow-400 fill-yellow-400"
                                            />
                                            <span className="text-white text-xs font-bold">
                                                {attraction.rating}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h3 className="font-playfair font-bold text-xl">
                                                {attraction.name}
                                            </h3>
                                            <div className="flex items-center gap-1 text-white/80 text-sm">
                                                <MapPin size={12} />
                                                {attraction.location}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                            {attraction.description}
                                        </p>
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="bg-gold-50 rounded-lg p-2 text-center">
                                                <div className="text-xs text-gray-400">Entry (₹)</div>
                                                <div className="text-gold-600 font-bold text-sm">
                                                    {attraction.entryFee.indian} /{" "}
                                                    {attraction.entryFee.foreigner}
                                                </div>
                                            </div>
                                            <div className="bg-maroon-50 rounded-lg p-2 text-center">
                                                <div className="text-xs text-gray-400">Duration</div>
                                                <div className="text-maroon-600 font-bold text-sm">
                                                    {attraction.duration}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                                            <Clock size={14} />
                                            <span>{attraction.timing}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}