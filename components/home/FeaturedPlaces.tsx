"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
    MapPin,
    Star,
    Clock,
    ArrowRight,
    Heart,
    Ticket,
    Calendar,
    Sparkles,
} from "lucide-react";
import { PLACES, PLACES_HINDI, CATEGORIES, CATEGORIES_HINDI } from "@/constants/data";
import { useLanguage } from "@/components/LanguageProvider";
import { TiltCard } from "./TiltCard";

export function FeaturedPlaces() {
    const { language } = useLanguage();
    const activePlaces = language === "hi" ? PLACES_HINDI : PLACES;
    const currentCategories = language === "hi" ? CATEGORIES_HINDI : CATEGORIES;

    const [activeFilter, setActiveFilter] = useState("All");
    const [favorites, setFavorites] = useState<number[]>([]);
    const [visibleCount, setVisibleCount] = useState(8);

    const filtered =
        activeFilter === "All" || activeFilter === "सभी"
            ? activePlaces
            : activePlaces.filter(
                (p) =>
                    (p.category && p.category.toLowerCase() === activeFilter.toLowerCase()) ||
                    (p.tags && p.tags.some((t) => t.toLowerCase() === activeFilter.toLowerCase())) ||
                    (activeFilter.toLowerCase() === "unesco" && p.isUNESCO)
            );

    const visiblePlaces = filtered.slice(0, visibleCount);

    const toggleFavorite = (id: number) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
        );
    };

    return (
        <section className="relative py-4 md:py-10 bg-palace-white dark:bg-gray-950 overflow-hidden">
            {/* Ambient glow blobs */}
            {/* <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 bg-gold-500/10 dark:bg-gold-500/5 rounded-full blur-3xl animate-float" /> */}
            {/* <div className="pointer-events-none absolute top-1/2 -right-20 w-80 h-80 bg-maroon-500/10 dark:bg-maroon-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} /> */}

            {/* Decorative mandala SVG */}
            {/* <div className="pointer-events-none absolute top-8 right-8 w-40 h-40 opacity-[0.04] dark:opacity-[0.06] animate-float" style={{ animationDelay: "2s" }}>
                <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-gold-600">
                    <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" />
                    <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" />
                    <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" />
                    <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="1" />
                    {Array.from({ length: 16 }).map((_, i) => (
                        <line
                            key={i}
                            x1="100"
                            y1="10"
                            x2="100"
                            y2="190"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            transform={`rotate(${i * 22.5} 100 100)`}
                        />
                    ))}
                </svg>
            </div> */}

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-6 md:mb-16"
                >
                    {/* <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center gap-2 text-gold-600 text-sm font-semibold tracking-widest uppercase"
                    >
                        <Sparkles size={16} className="animate-pulse" />
                        <span>Explore Rajasthan</span>
                    </motion.span> */}

                    <h2 className="font-playfair text-2xl md:text-6xl font-bold text-gray-900 dark:text-white mt-3  relative inline-block">
                        <span className="relative z-10 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 bg-clip-text text-transparent">
                            Famous Places to Visit
                        </span>
                    </h2>
                    {/* <p className="text-gray-500 dark:text-gray-400 text-lg mx-auto">
                        From majestic forts to serene lakes, discover the most iconic places
                        across the Land of Kings
                    </p> */}
                </motion.div>

                {/* Filters */}
                <div className="relative flex flex-wrap gap-1 md:gap-3 justify-center mb-6 md:mb-12">
                    {currentCategories.map((cat, i) => {
                        const isActive = activeFilter === cat;
                        return (
                            <motion.button
                                key={cat}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => {
                                    setActiveFilter(cat);
                                    setVisibleCount(12);
                                }}
                                className={`relative px-4 md:px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-colors duration-300 z-10 ${isActive
                                    ? "text-white"
                                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gold-400 hover:text-gold-600 hover:shadow-md"
                                    }`}
                                style={{
                                    border: isActive ? "1px solid transparent" : undefined
                                }}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full shadow-gold -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                {cat}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    <AnimatePresence mode="popLayout">
                        {visiblePlaces.map((place, i) => (
                            <motion.div
                                key={place.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8, y: 60, rotateX: -15 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                                style={{ perspective: 1200 }}
                                className="h-full"
                            >
                                <div
                                    className="group relative bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl border border-gray-200/80 dark:border-gray-600/60 rounded-[2rem] shadow-[10px_10px_20px_rgba(0,0,0,0.03),-10px_-10px_20px_rgba(255,255,255,0.8)] dark:shadow-[10px_10px_20px_rgba(0,0,0,0.3),-10px_-10px_20px_rgba(255,255,255,0.02)] hover:shadow-[15px_15px_30px_rgba(0,0,0,0.08),-15px_-15px_30px_rgba(255,255,255,0.9)] dark:hover:shadow-[15px_15px_30px_rgba(0,0,0,0.4),-15px_-15px_30px_rgba(255,255,255,0.05)] transition-all duration-500 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/60 before:to-white/0 dark:before:from-white/5 dark:before:to-white/0 before:-z-10 before:rounded-[2rem] flex flex-col h-full"
                                >
                                    {/* Image with parallax depth */}
                                    <TiltCard maxTilt={20} className="relative h-60 overflow-hidden m-3 rounded-3xl shadow-inner transform-gpu cursor-crosshair z-10">
                                        <div className="w-full h-full relative" style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
                                            <Image
                                                src={place.images[0]}
                                                alt={`${place.name} - Historic heritage tourist spot in ${place.city}, Rajasthan`}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                                                className="object-cover group-hover:scale-125 group-hover:rotate-3 transition-transform duration-1000 ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                            {/* Shimmer sweep on hover */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                                            </div>

                                            {/* Badges */}
                                            <div className="absolute top-4 left-4 flex flex-col gap-2" style={{ transform: "translateZ(30px)" }}>
                                                {place.isUNESCO && (
                                                    <span className="bg-blue-600/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                                                        UNESCO
                                                    </span>
                                                )}
                                                {place.ticket.isFree && (
                                                    <span className="bg-emerald-500/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                                                        Free Entry
                                                    </span>
                                                )}
                                                {!place.ticket.isFree && (
                                                    <span className="bg-gradient-to-r from-gold-500/90 to-gold-600/90 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                                                        ₹{place.ticket.indian}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Favorite */}
                                            <button
                                                onClick={() => toggleFavorite(place.id)}
                                                aria-label={`Save ${place.name} to favorites`}
                                                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:bg-white/40 hover:scale-110 transition-all z-50 cursor-pointer"
                                                style={{ transform: "translateZ(30px)" }}
                                            >
                                                <Heart
                                                    size={18}
                                                    className={
                                                        favorites.includes(place.id)
                                                            ? "text-red-500 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                                                            : "text-white drop-shadow-md"
                                                    }
                                                />
                                            </button>

                                            {/* Info Overlay */}
                                            <div className="absolute bottom-4 left-4 right-4" style={{ transform: "translateZ(25px)" }}>
                                                <h3 className="font-playfair font-bold text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                                    {place.name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-white/90 text-sm mt-1 drop-shadow-md">
                                                    <MapPin size={12} className="text-gold-400" />
                                                    <span className="font-medium">{place.city}</span>
                                                    <span className="text-white/50">•</span>
                                                    <span className="font-medium">{place.category}</span>
                                                </div>
                                            </div>

                                            {/* Rating */}
                                            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1 shadow-lg" style={{ transform: "translateZ(25px)" }}>
                                                <Star
                                                    size={14}
                                                    className="text-gold-400 fill-gold-400 drop-shadow-sm"
                                                />
                                                <span className="text-white text-sm font-bold">
                                                    {place.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </TiltCard>

                                    {/* Content */}
                                    <div className="p-6 pt-2 relative z-10 flex flex-col flex-grow">
                                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4 leading-relaxed font-medium">
                                            {place.description}
                                        </p>

                                        {/* Quick Info */}
                                        <div className="grid grid-cols-2 gap-3 mb-5 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/80 dark:border-gray-600/60 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-300">
                                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-xs font-medium">
                                                <div className="p-1.5 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                                                    <Clock size={12} className="text-blue-500" />
                                                </div>
                                                <span>
                                                    {place.timing.open} - {place.timing.close}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-xs font-medium">
                                                <div className="p-1.5 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                                                    <Calendar size={12} className="text-green-500" />
                                                </div>
                                                <span>{place.bestTimeToVisit.months}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-xs font-medium">
                                                <div className="p-1.5 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                                                    <Ticket size={12} className="text-gold-500" />
                                                </div>
                                                <span>
                                                    {place.ticket.isFree
                                                        ? (language === 'hi' ? "निःशुल्क प्रवेश" : "Free Entry")
                                                        : `₹${place.ticket.indian}`}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-xs font-medium">
                                                <div className="p-1.5 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                                                    <Sparkles size={12} className="text-purple-500" />
                                                </div>
                                                <span>{place.visitDuration.recommended}</span>
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-5">
                                            {place.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/50 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-xl shadow-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Status */}
                                        <div className="flex items-center gap-2 mb-5">
                                            <div
                                                className={`w-2 h-2 rounded-full ${place.isOpen ? "bg-green-500" : "bg-red-500"
                                                    } animate-pulse shadow-[0_0_8px_currentColor]`}
                                            />
                                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                                {place.isOpen ? (language === 'hi' ? "अभी खुला है" : "Open Now") : (language === 'hi' ? "बंद है" : "Closed")} <span className="mx-1 text-gray-300 dark:text-gray-600">•</span>{" "}
                                                {place.timing.closedOn}
                                            </span>
                                        </div>

                                        <Link
                                            href={`/places/${place.slug}`}
                                            className="mt-auto w-full flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-500 to-maroon-500 text-white py-3.5 rounded-2xl text-sm font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_16px_rgba(153,27,27,0.3)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_24px_rgba(153,27,27,0.4)] hover:-translate-y-1 active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-300 group/btn"
                                        >
                                            <span>{language === 'hi' ? "विवरण देखें" : "View Details"}</span>
                                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* See All / Load More Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    {visibleCount < filtered.length && (
                        <button
                            onClick={() => setVisibleCount((prev) => prev + 12)}
                            className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 border border-gold-500 text-gold-600 dark:text-gold-400 px-8 py-4 rounded-full font-semibold hover:bg-gold-50 dark:hover:bg-gray-700 transition-all hover:scale-105 shadow-md"
                        >
                            {language === 'hi' ? "और दिखाएं" : "More"}
                        </button>
                    )}
                    <Link
                        href="/places"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-gold-lg transition-all hover:scale-105"
                    >
                        {language === 'hi' ? `सभी ${PLACES.length} स्थान देखें` : `View All ${PLACES.length} Places`}
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
