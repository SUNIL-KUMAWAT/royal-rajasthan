"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    MapPin,
    Star,
    Clock,
    ArrowRight,
    Heart,
    Ticket,
    Calendar,
} from "lucide-react";
import { PLACES, CATEGORIES } from "@/constants/data";

export function FeaturedPlaces() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [favorites, setFavorites] = useState<number[]>([]);

    const filtered =
        activeFilter === "All"
            ? PLACES
            : PLACES.filter((p) => p.category === activeFilter);

    const toggleFavorite = (id: number) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
        );
    };

    return (
        <section className="py-24 bg-palace-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-yellow-600 text-sm font-semibold tracking-widest uppercase">
                        Explore Rajasthan
                    </span>
                    <h2 className="font-playfair text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mt-3 mb-6">
                        Famous Places to Visit
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        From majestic forts to serene lakes, discover the most iconic places
                        across the Land of Kings
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === cat
                                ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg"
                                : "bg-white border border-gray-200 text-gray-600 hover:border-yellow-400 hover:text-yellow-600"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((place, i) => (
                            <motion.div
                                key={place.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: i * 0.05 }}
                                className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md dark:shadow-gray-900/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={place.images[0]}
                                        alt={place.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        {place.isUNESCO && (
                                            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                UNESCO
                                            </span>
                                        )}
                                        {place.ticket.isFree && (
                                            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                Free Entry
                                            </span>
                                        )}
                                        {!place.ticket.isFree && (
                                            <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                ₹{place.ticket.indian}
                                            </span>
                                        )}
                                    </div>

                                    {/* Favorite */}
                                    <button
                                        onClick={() => toggleFavorite(place.id)}
                                        className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all"
                                    >
                                        <Heart
                                            size={16}
                                            className={
                                                favorites.includes(place.id)
                                                    ? "text-red-500 fill-red-500"
                                                    : "text-white"
                                            }
                                        />
                                    </button>

                                    {/* Info Overlay */}
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <div className="font-playfair font-bold text-xl text-white">
                                            {place.name}
                                        </div>
                                        <div className="flex items-center gap-2 text-white/80 text-xs mt-1">
                                            <MapPin size={10} />
                                            <span>{place.city}</span>
                                            <span>•</span>
                                            <span>{place.category}</span>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                                        <Star
                                            size={12}
                                            className="text-yellow-400 fill-yellow-400"
                                        />
                                        <span className="text-white text-xs font-bold">
                                            {place.rating}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                                        {place.description}
                                    </p>

                                    {/* Quick Info */}
                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500 text-xs">
                                            <Clock size={12} />
                                            <span>
                                                {place.timing.open} - {place.timing.close}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500 text-xs">
                                            <Calendar size={12} />
                                            <span>{place.bestTimeToVisit.months}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500 text-xs">
                                            <Ticket size={12} />
                                            <span>
                                                {place.ticket.isFree
                                                    ? "Free Entry"
                                                    : `₹${place.ticket.indian} / ₹${place.ticket.foreigner}`}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500 text-xs">
                                            <Clock size={12} />
                                            <span>{place.visitDuration.recommended}</span>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {place.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <div
                                            className={`w-2 h-2 rounded-full ${place.isOpen ? "bg-green-500" : "bg-red-500"
                                                }`}
                                        />
                                        <span className="text-xs text-gray-500">
                                            {place.isOpen ? "Open Now" : "Closed"} •{" "}
                                            {place.timing.closedOn}
                                        </span>
                                    </div>

                                    <Link
                                        href={`/places/${place.slug}`}
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

                {/* See All */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/places"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
                    >
                        View All {PLACES.length} Places
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}