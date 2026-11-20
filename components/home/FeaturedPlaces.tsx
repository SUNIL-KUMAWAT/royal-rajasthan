"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@/components/LocalizedLink";
import { MapPin, Star, Clock, ArrowRight, Heart, Ticket, Calendar, Sparkles, Search, X } from "lucide-react";
import { CATEGORIES, CATEGORIES_HINDI } from "@/constants/ui";
import { useLanguage } from "@/components/LanguageProvider";
import type { PlaceCard } from "@/lib/places";
import { isOpenAt } from "@/lib/openStatus";
import { useFavorites, useNow } from "@/lib/useClientHooks";
import { TiltCard } from "./TiltCard";

const PAGE_SIZE = 8;
const ALL = CATEGORIES[0];

// Hindi data uses a few extra category spellings
const CATEGORY_ALIASES: Record<string, string[]> = {
    Palace: ["महल"],
    Spiritual: ["धार्मिक स्थल"],
};

const T = {
    en: {
        title: "Famous Places to Visit",
        search: "Search for a place or city...",
        clearSearch: "Clear search",
        categories: "Categories",
        free: "Free Entry",
        openNow: "Open Now",
        closed: "Closed",
        details: "View Details",
        more: "Show More",
        viewAll: (n: number) => `View All ${n} Places`,
        addFav: (name: string) => `Save ${name} to favorites`,
        removeFav: (name: string) => `Remove ${name} from favorites`,
        imageAlt: (name: string, city: string) => `${name}, ${city}, Rajasthan`,
        noResults: "No places match your search.",
        reset: "Clear filters",
    },
    hi: {
        title: "घूमने लायक प्रसिद्ध स्थान",
        search: "जगह का नाम या शहर खोजें...",
        clearSearch: "खोज साफ़ करें",
        categories: "श्रेणियां",
        free: "निःशुल्क प्रवेश",
        openNow: "अभी खुला है",
        closed: "बंद है",
        details: "विवरण देखें",
        more: "और दिखाएं",
        viewAll: (n: number) => `सभी ${n} स्थान देखें`,
        addFav: (name: string) => `${name} को पसंदीदा में जोड़ें`,
        removeFav: (name: string) => `${name} को पसंदीदा से हटाएं`,
        imageAlt: (name: string, city: string) => `${name}, ${city}, राजस्थान`,
        noResults: "आपकी खोज से कोई स्थान नहीं मिला।",
        reset: "फ़िल्टर हटाएं",
    },
};

export function FeaturedPlaces({ places, placesHi }: { places: PlaceCard[]; placesHi: PlaceCard[] }) {
    const { language } = useLanguage();
    const isHi = language === "hi";
    const t = isHi ? T.hi : T.en;
    const { isFavorite, toggleFavorite } = useFavorites();
    const now = useNow();

    // Filter state stores the English category key so it survives language switches
    const [activeFilter, setActiveFilter] = useState<string>(ALL);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [searchQuery, setSearchQuery] = useState("");

    const sorted = useMemo(
        () =>
            [...(isHi ? placesHi : places)].sort((a, b) => {
                if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
                return (b.rating || 0) - (a.rating || 0);
            }),
        [isHi, places, placesHi]
    );

    const filtered = useMemo(() => {
        const idx = CATEGORIES.indexOf(activeFilter);
        const names = [activeFilter, CATEGORIES_HINDI[idx], ...(CATEGORY_ALIASES[activeFilter] ?? [])]
            .filter(Boolean)
            .map((n) => n.toLowerCase());
        const query = searchQuery.toLowerCase().trim();
        return sorted.filter((p) => {
            const matchesFilter =
                activeFilter === ALL ||
                (activeFilter === "UNESCO" && p.isUNESCO) ||
                names.includes(p.category?.toLowerCase()) ||
                p.tags?.some((tag) => names.includes(tag.toLowerCase()));
            if (!matchesFilter) return false;
            return !query || p.name.toLowerCase().includes(query) || p.city.toLowerCase().includes(query);
        });
    }, [sorted, activeFilter, searchQuery]);

    const visiblePlaces = filtered.slice(0, visibleCount);

    const resetFilters = () => {
        setActiveFilter(ALL);
        setSearchQuery("");
        setVisibleCount(PAGE_SIZE);
    };

    return (
        <section className="relative py-4 md:py-10 bg-palace-white dark:bg-gray-950 overflow-hidden">

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-4 md:mb-10"
                >

                    <h2 className="font-playfair text-2xl md:text-6xl font-bold text-gray-900 dark:text-white mt-2  relative inline-block">
                        <span className="relative z-10 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 bg-clip-text text-transparent">
                            {t.title}
                        </span>
                    </h2>
                </motion.div>

                {/* Search Bar */}
                <div className="relative max-w-md mx-auto mb-4 md:mb-6 px-4 sm:px-0">
                    <div className="relative flex items-center w-full h-10 md:h-12 rounded-full shadow-sm bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden focus-within:ring-2 focus-within:ring-gold-500 focus-within:border-transparent transition-all">
                        <div className="grid place-items-center h-full w-12 text-gray-400">
                            <Search size={20} />
                        </div>
                        <input
                            className="peer h-full w-full outline-none text-sm text-gray-700 dark:text-gray-200 bg-transparent pr-4 [&::-webkit-search-cancel-button]:hidden"
                            type="search"
                            aria-label={t.search}
                            placeholder={t.search}
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setVisibleCount(PAGE_SIZE);
                            }}
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                aria-label={t.clearSearch}
                                className="grid place-items-center h-full w-10 text-gray-400 hover:text-gray-600"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Filters */}
                <div className="relative flex flex-wrap gap-1 md:gap-3 justify-center mb-4 md:mb-12" role="group" aria-label={t.categories}>
                    {CATEGORIES.map((cat, i) => {
                        const isActive = activeFilter === cat;
                        return (
                            <motion.button
                                key={cat}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: Math.min(i, 8) * 0.05 }}
                                type="button"
                                aria-pressed={isActive}
                                onClick={() => {
                                    setActiveFilter(cat);
                                    setVisibleCount(PAGE_SIZE);
                                }}
                                className={`relative px-2.5 md:px-5 py-1 rounded-full text-xs md:text-sm font-semibold transition-colors duration-300 z-10 ${isActive
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
                                {isHi ? CATEGORIES_HINDI[i] : cat}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    <AnimatePresence mode="popLayout">
                        {visiblePlaces.map((place) => {
                            const fav = isFavorite(place.id);
                            const open = isOpenAt(place.timing, now, place.isOpen);
                            return (
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
                                                alt={t.imageAlt(place.name, place.city)}
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
                                                        {t.free}
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
                                                type="button"
                                                onClick={() => toggleFavorite(place.id)}
                                                aria-label={fav ? t.removeFav(place.name) : t.addFav(place.name)}
                                                aria-pressed={fav}
                                                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:bg-white/40 hover:scale-110 transition-all z-50 cursor-pointer"
                                                style={{ transform: "translateZ(30px)" }}
                                            >
                                                <Heart
                                                    size={18}
                                                    className={
                                                        fav
                                                            ? "text-red-500 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                                                            : "text-white drop-shadow-md"
                                                    }
                                                />
                                            </button>

                                            {/* Info Overlay */}
                                            <div className="absolute bottom-4 left-4 right-4" style={{ transform: "translateZ(25px)" }}>
                                                <h3 className="font-playfair font-bold text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                                    <Link href={`/places/${place.slug}`} className="hover:underline underline-offset-4">
                                                        {place.name}
                                                    </Link>
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
                                                        ? t.free
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
                                                className={`w-2 h-2 rounded-full ${open ? "bg-green-500" : "bg-red-500"
                                                    } animate-pulse shadow-[0_0_8px_currentColor]`}
                                            />
                                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                                {open ? t.openNow : t.closed} <span className="mx-1 text-gray-300 dark:text-gray-600">•</span>{" "}
                                                {place.timing.closedOn}
                                            </span>
                                        </div>

                                        <Link
                                            href={`/places/${place.slug}`}
                                            className="mt-auto w-full flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-500 to-maroon-500 text-white py-3.5 rounded-2xl text-sm font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_16px_rgba(153,27,27,0.3)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_24px_rgba(153,27,27,0.4)] hover:-translate-y-1 active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-300 group/btn"
                                        >
                                            <span>{t.details}</span>
                                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">{t.noResults}</p>
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="px-6 py-2.5 rounded-full bg-gold-500 text-white text-sm font-semibold hover:bg-gold-600 transition-colors"
                        >
                            {t.reset}
                        </button>
                    </div>
                )}

                {/* See All / Load More Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    {visibleCount < filtered.length && (
                        <button
                            type="button"
                            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                            className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 border border-gold-500 text-gold-600 dark:text-gold-400 px-8 py-4 rounded-full font-semibold hover:bg-gold-50 dark:hover:bg-gray-700 transition-all hover:scale-105 shadow-md"
                        >
                            {t.more}
                        </button>
                    )}
                    <Link
                        href="/places"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-gold-lg transition-all hover:scale-105"
                    >
                        {t.viewAll(places.length)}
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
