"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Clock, ArrowRight, Heart } from "lucide-react";
import { DESTINATIONS } from "@/constants/data";

export function DestinationsSection() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [favorites, setFavorites] = useState<number[]>([]);

    const filters = [
        "All",
        "Heritage City",
        "Lake City",
        "Desert City",
        "Wildlife",
        "Spiritual City",
        "Hill Station",
    ];

    const filtered =
        activeFilter === "All"
            ? DESTINATIONS
            : DESTINATIONS.filter((d: any) => d.category === activeFilter);

    const toggleFavorite = (id: number) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
        );
    };

    return (
        <section className="py-24 bg-palace-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-gold-500 text-sm font-semibold tracking-widest uppercase">
                        Explore Rajasthan
                    </span>
                    <h2 className="font-playfair text-4xl md:text-6xl font-bold text-gray-900 mt-3 mb-6">
                        Popular Destinations
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        From the pink streets of Jaipur to the golden sands of Jaisalmer,
                        discover Rajasthan&apos;s most enchanting destinations
                    </p>
                </motion.div>

                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === filter
                                ? "bg-gold-gradient text-white shadow-gold"
                                : "bg-white border border-gray-200 text-gray-600 hover:border-gold-400 hover:text-gold-500"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((dest: any, i: any) => (
                            <motion.div
                                key={dest.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: i * 0.05 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-royal transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <Image
                                        src={dest.image}
                                        alt={dest.name}
                                        fill
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    {dest.isFeatured && (
                                        <div className="absolute top-3 left-3 bg-gold-gradient text-white text-xs font-bold px-2 py-1 rounded-full">
                                            Featured
                                        </div>
                                    )}
                                    <button
                                        onClick={() => toggleFavorite(dest.id)}
                                        className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all"
                                    >
                                        <Heart
                                            size={16}
                                            className={
                                                favorites.includes(dest.id)
                                                    ? "text-red-500 fill-red-500"
                                                    : "text-white"
                                            }
                                        />
                                    </button>
                                    <div className="absolute bottom-3 left-3 text-white">
                                        <div className="font-playfair font-bold text-xl">
                                            {dest.name}
                                        </div>
                                        <div className="text-white/80 text-xs flex items-center gap-1">
                                            <MapPin size={10} />
                                            {dest.nickname}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                                        <Star
                                            size={12}
                                            className="text-yellow-400 fill-yellow-400"
                                        />
                                        <span className="text-white text-xs font-bold">
                                            {dest.rating}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                        {dest.description}
                                    </p>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                                            <Clock size={14} />
                                            <span>{dest.duration}</span>
                                        </div>
                                        <div className="text-maroon-500 font-bold">
                                            ₹{dest.price.toLocaleString()}
                                            <span className="text-gray-400 text-xs font-normal">
                                                /person
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {dest.tags.slice(0, 3).map((tag: any) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-gold-50 text-gold-700 text-xs rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                                        <span>🗓 Best: {dest.bestTime}</span>
                                    </div>
                                    <Link
                                        href={`/destinations/${dest.slug}`}
                                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-500 to-maroon-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all hover:gap-3"
                                    >
                                        View Details
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/destinations"
                        className="inline-flex items-center gap-2 bg-gold-gradient text-white px-8 py-4 rounded-full font-semibold hover:shadow-gold-lg transition-all hover:scale-105"
                    >
                        View All Destinations
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}