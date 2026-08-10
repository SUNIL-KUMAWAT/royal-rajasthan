"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    Search,
    Star,
    MapPin,
    Clock,
    ArrowRight,
    Heart,
    Ticket,
    Calendar,
    Filter,
    X,
    ChevronDown,
} from "lucide-react";
import { PLACES, PLACES_HINDI, CATEGORIES, CITIES, CATEGORIES_HINDI, CITIES_HINDI, PLACES_FAQS_ENGLISH, PLACES_FAQS_HINDI } from "@/constants/data";
import { useLanguage } from "@/components/LanguageProvider";
import { ExploreMoreSection } from "@/components/shared/ExploreMoreSection";

export function PlacesClient() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [city, setCity] = useState("All Cities");
    const [sortBy, setSortBy] = useState("featured");
    const [entryType, setEntryType] = useState("All");
    const [favorites, setFavorites] = useState<number[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [visibleCount, setVisibleCount] = useState(12);

    const { language } = useLanguage();

    // Reset pagination when any filter changes
    useEffect(() => {
        setVisibleCount(12);
    }, [search, category, city, sortBy, entryType]);
    const activePlaces = language === "hi" ? PLACES_HINDI : PLACES;
    const currentCategories = language === 'hi' ? CATEGORIES_HINDI : CATEGORIES;
    const currentCities = language === 'hi' ? CITIES_HINDI : CITIES;

    const filtered = useMemo(() => {
        return activePlaces.filter((p) => {
            const matchSearch =
                (p.name && p.name.toLowerCase().includes(search.toLowerCase())) ||
                (p.city && p.city.toLowerCase().includes(search.toLowerCase())) ||
                (p.category && p.category.toLowerCase().includes(search.toLowerCase())) ||
                (p.description && p.description.toLowerCase().includes(search.toLowerCase())) ||
                (p.tags && p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())));
            const matchCategory =
                category === "All" || category === "सभी" ||
                (p.category && p.category.toLowerCase() === category.toLowerCase()) ||
                (p.tags && p.tags.some((t) => t.toLowerCase() === category.toLowerCase())) ||
                (category.toLowerCase() === "unesco" && p.isUNESCO);
            const matchCity =
                city === "All Cities" || city === "सभी शहर" || p.city === city;
            const matchEntry =
                entryType === "All" ||
                (entryType === "Free" && p.ticket.isFree) ||
                (entryType === "Paid" && !p.ticket.isFree);
            return matchSearch && matchCategory && matchCity && matchEntry;
        }).sort((a, b) => {
            if (sortBy === "rating") return b.rating - a.rating;
            if (sortBy === "name-az") return a.name.localeCompare(b.name);
            if (sortBy === "name-za") return b.name.localeCompare(a.name);
            if (sortBy === "price-low")
                return a.ticket.indian - b.ticket.indian;
            if (sortBy === "price-high")
                return b.ticket.indian - a.ticket.indian;
            if (sortBy === "reviews") return b.reviews - a.reviews;
            return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        });
    }, [activePlaces, search, category, city, sortBy, entryType]);

    const visiblePlaces = useMemo(() => {
        return filtered.slice(0, visibleCount);
    }, [filtered, visibleCount]);

    const clearFilters = () => {
        setSearch("");
        setCategory("All");
        setCity(language === 'hi' ? "सभी शहर" : "All Cities");
        setSortBy("featured");
        setEntryType("All");
    };

    const activeFilterCount = [
        category !== "All" && category !== "सभी",
        city !== "All Cities" && city !== "सभी शहर",
        entryType !== "All",
        search !== "",
    ].filter(Boolean).length;

    return (
        <>
            {/* Hero */}
            <section
                className="h-72 md:h-96 relative flex items-end justify-center pb-12 mt-16"
                style={{
                    backgroundImage:
                        "url(https://picsum.photos/seed/raj-1129/800/600",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
                <div className="relative z-10 text-center px-4 w-full max-w-2xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4"
                    >
                        Explore{" "}
                        <span className="text-yellow-400">Places</span>
                    </motion.h1>
                    <p className="text-white/80 text-lg mb-6">
                        Discover {activePlaces.length} famous places across Rajasthan
                    </p>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Search places, cities, categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/95 backdrop-blur-sm text-gray-800 outline-none focus:ring-2 focus:ring-yellow-400 shadow-xl text-base"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="sticky top-16 md:top-20 z-40 bg-white dark:bg-gray-900 shadow-md py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Desktop Filters */}
                    <div className="hidden md:flex flex-wrap gap-3 items-center">
                        {/* Category Buttons */}
                        <div className="flex flex-wrap gap-2">
                            {currentCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${category === cat
                                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md"
                                        : "border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-yellow-400 hover:text-yellow-600"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />

                        {/* City Dropdown */}
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-yellow-400 bg-white cursor-pointer"
                        >
                            {currentCities.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>

                        {/* Entry Type */}
                        <select
                            value={entryType}
                            onChange={(e) => setEntryType(e.target.value)}
                            className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-yellow-400 bg-white cursor-pointer"
                        >
                            <option value="All">{language === 'hi' ? "सभी प्रकार" : "All Entry Types"}</option>
                            <option value="Free">{language === 'hi' ? "निःशुल्क प्रवेश" : "Free Entry"}</option>
                            <option value="Paid">{language === 'hi' ? "सशुल्क प्रवेश" : "Paid Entry"}</option>
                        </select>

                        {/* Sort By */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-yellow-400 bg-white cursor-pointer"
                        >
                            <option value="featured">Featured First</option>
                            <option value="rating">Highest Rated</option>
                            <option value="reviews">Most Reviewed</option>
                            <option value="name-az">Name A-Z</option>
                            <option value="name-za">Name Z-A</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>

                        {/* Clear Filters */}
                        {activeFilterCount > 0 && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-1 text-red-500 text-sm hover:text-red-700 transition-colors"
                            >
                                <X size={14} />
                                Clear ({activeFilterCount})
                            </button>
                        )}
                    </div>

                    {/* Mobile Filter Toggle */}
                    <div className="md:hidden">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium"
                            >
                                <Filter size={18} />
                                Filters
                                {activeFilterCount > 0 && (
                                    <span className="bg-yellow-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                        {activeFilterCount}
                                    </span>
                                )}
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-300 ${showFilters ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Mobile Search Results Count */}
                            <span className="text-sm text-gray-400">
                                {filtered.length} places
                            </span>
                        </div>

                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-4 space-y-3 pb-2">
                                        {/* Category Buttons */}
                                        <div className="flex flex-wrap gap-2">
                                            {currentCategories.map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setCategory(cat)}
                                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${category === cat
                                                        ? "bg-yellow-500 text-white"
                                                        : "border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                                                        }`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>

                                        {/* City & Entry Type */}
                                        <div className="grid grid-cols-2 gap-2">
                                            <select
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-xl px-3 py-2 text-sm bg-white"
                                            >
                                                {currentCities.map((c) => (
                                                    <option key={c} value={c}>
                                                        {c}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                value={entryType}
                                                onChange={(e) => setEntryType(e.target.value)}
                                                className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-xl px-3 py-2 text-sm bg-white"
                                            >
                                                <option value="All">All Entry</option>
                                                <option value="Free">Free Entry</option>
                                                <option value="Paid">Paid Entry</option>
                                            </select>
                                        </div>

                                        {/* Sort */}
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-xl px-3 py-2 text-sm bg-white"
                                        >
                                            <option value="featured">Featured First</option>
                                            <option value="rating">Highest Rated</option>
                                            <option value="reviews">Most Reviewed</option>
                                            <option value="name-az">Name A-Z</option>
                                            <option value="price-low">Price: Low to High</option>
                                        </select>

                                        {/* Clear Button */}
                                        {activeFilterCount > 0 && (
                                            <button
                                                onClick={clearFilters}
                                                className="w-full py-2 text-red-500 border border-red-200 dark:border-red-800 rounded-xl text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                                            >
                                                Clear All Filters ({activeFilterCount})
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Results */}
            <section className="py-8 bg-palace-white dark:bg-gray-950 min-h-[60vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Results Header */}
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Showing{" "}
                            <strong className="text-gray-800 dark:text-white">
                                {filtered.length}
                            </strong>{" "}
                            <span className="hidden sm:inline">
                                of {activePlaces.length} places
                            </span>
                            {search && (
                                <span>
                                    {" "}for &quot;
                                    <strong className="text-yellow-600 dark:text-yellow-400">
                                        {search}
                                    </strong>
                                    &quot;
                                </span>
                            )}
                        </p>

                        {/* Active Filter Tags */}
                        {activeFilterCount > 0 && (
                            <div className="hidden md:flex items-center gap-2 flex-wrap">
                                {category !== "All" && category !== "सभी" && (
                                    <span className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs px-2 py-1 rounded-full">
                                        {category}
                                        <button
                                            onClick={() => setCategory("All")}
                                            className="hover:text-red-500 transition-colors"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                )}
                                {city !== "All Cities" && city !== "सभी शहर" && (
                                    <span className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                                        {city}
                                        <button
                                            onClick={() => setCity(language === 'hi' ? "सभी शहर" : "All Cities")}
                                            className="hover:text-red-500 transition-colors"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                )}
                                {entryType !== "All" && (
                                    <span className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                                        {entryType} Entry
                                        <button
                                            onClick={() => setEntryType("All")}
                                            className="hover:text-red-500 transition-colors"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Places Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {visiblePlaces.map((place, i) => (
                            <motion.div
                                key={place.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(i * 0.04, 0.3) }}
                                className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md dark:shadow-gray-900/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* Image */}
                                <div className="relative h-52 overflow-hidden">
                                    <Image
                                        src={place.images[0]}
                                        alt={`${place.name} ${place.city} Rajasthan`}
                                        fill
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Top Badges */}
                                    <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                                        {place.isUNESCO && (
                                            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                UNESCO
                                            </span>
                                        )}
                                        <span
                                            className={`text-white text-xs font-bold px-2 py-0.5 rounded-full ${place.ticket.isFree
                                                ? "bg-green-500"
                                                : "bg-yellow-500"
                                                }`}
                                        >
                                            {place.ticket.isFree
                                                ? "Free"
                                                : `₹${place.ticket.indian}`}
                                        </span>
                                        <span className="bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                                            {place.category}
                                        </span>
                                    </div>

                                    {/* Favorite */}
                                    <button
                                        onClick={() =>
                                            setFavorites((p) =>
                                                p.includes(place.id)
                                                    ? p.filter((f) => f !== place.id)
                                                    : [...p, place.id]
                                            )
                                        }
                                        aria-label={`${favorites.includes(place.id)
                                            ? "Remove from"
                                            : "Add to"
                                            } favorites`}
                                        className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all"
                                    >
                                        <Heart
                                            size={14}
                                            className={
                                                favorites.includes(place.id)
                                                    ? "text-red-500 fill-red-500"
                                                    : "text-white"
                                            }
                                        />
                                    </button>

                                    {/* Bottom Info */}
                                    <div className="absolute bottom-3 left-3 text-white">
                                        <div className="font-playfair font-bold text-lg leading-tight">
                                            {place.name}
                                        </div>
                                        <div className="flex items-center gap-1 text-white/80 text-xs mt-0.5">
                                            <MapPin size={10} />
                                            {place.city}
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5">
                                        <Star
                                            size={10}
                                            className="text-yellow-400 fill-yellow-400"
                                        />
                                        <span className="text-white text-xs font-bold">
                                            {place.rating}
                                        </span>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-4">
                                    <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 mb-3">
                                        {place.description}
                                    </p>

                                    {/* Info Grid */}
                                    <div className="grid grid-cols-2 gap-1.5 mb-3 text-xs text-gray-400 dark:text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Clock
                                                size={10}
                                                className="flex-shrink-0 text-yellow-500"
                                            />
                                            <span className="truncate">
                                                {place.timing.open} - {place.timing.close}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar
                                                size={10}
                                                className="flex-shrink-0 text-yellow-500"
                                            />
                                            <span className="truncate">
                                                {place.bestTimeToVisit.months}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Ticket
                                                size={10}
                                                className="flex-shrink-0 text-yellow-500"
                                            />
                                            <span>
                                                {place.ticket.isFree
                                                    ? "Free Entry"
                                                    : `₹${place.ticket.indian}/₹${place.ticket.foreigner}`}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock
                                                size={10}
                                                className="flex-shrink-0 text-yellow-500"
                                            />
                                            <span>{place.visitDuration.recommended}</span>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <div
                                            className={`w-1.5 h-1.5 rounded-full ${place.isOpen
                                                ? "bg-green-500 animate-pulse"
                                                : "bg-red-500"
                                                }`}
                                        />
                                        <span className="text-xs text-gray-400 dark:text-gray-500">
                                            {place.isOpen ? "Open Now" : "Closed"}
                                        </span>
                                        <span className="text-xs text-gray-200 dark:text-gray-700">
                                            •
                                        </span>
                                        <span className="text-xs text-gray-400 dark:text-gray-500">
                                            Est. {place.yearBuilt}
                                        </span>
                                    </div>

                                    {/* CTA Button */}
                                    <Link
                                        href={`/places/${place.slug}`}
                                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-500 to-maroon-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:opacity-90 transition-all group/btn"
                                    >
                                        View Details
                                        <ArrowRight
                                            size={14}
                                            className="group-hover/btn:translate-x-1 transition-transform"
                                        />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Load More Places Button */}
                    {visibleCount < filtered.length && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center gap-4 mt-12 mb-8"
                        >
                            <p className="text-sm text-gray-400 dark:text-gray-500">
                                {language === "hi" 
                                    ? `${filtered.length} स्थानों में से ${visiblePlaces.length} दिखाई दे रहे हैं`
                                    : `Showing ${visiblePlaces.length} of ${filtered.length} places`}
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => setVisibleCount((prev) => prev + 12)}
                                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300
                                    bg-white dark:bg-gray-800 border-2 border-amber-400 dark:border-amber-500
                                    text-amber-600 dark:text-amber-400
                                    hover:bg-amber-500 hover:text-white hover:border-amber-500
                                    dark:hover:bg-amber-500 dark:hover:text-white
                                    shadow-md hover:shadow-amber-400/30 dark:shadow-none"
                            >
                                <Star size={16} className="fill-current" />
                                {language === "hi" ? "और स्थान लोड करें" : "Load More Places"}
                                <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full text-xs font-bold">
                                    +{Math.min(12, filtered.length - visibleCount)} more
                                </span>
                            </motion.button>
                        </motion.div>
                    )}

                    {/* No Results State */}
                    {filtered.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20"
                        >
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                                No places found
                            </h3>
                            <p className="text-gray-400 dark:text-gray-500 mb-6">
                                Try adjusting your search or filters
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-3 bg-yellow-500 text-white rounded-full text-sm font-medium hover:bg-yellow-600 transition-all"
                                >
                                    Clear All Filters
                                </button>
                                <Link
                                    href="/"
                                    className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium hover:border-yellow-400 transition-all"
                                >
                                    Go to Home
                                </Link>
                            </div>
                        </motion.div>
                    )}

                    {/* Visual FAQ Section */}
                    <FAQSection 
                        faqs={language === "hi" ? PLACES_FAQS_HINDI : PLACES_FAQS_ENGLISH} 
                        title={language === "hi" ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"} 
                    />
                </div>
            </section>

            {/* SEO Interlinks — Explore More */}
            <ExploreMoreSection currentPage="places" language={language} />

            {/* Dynamic JSON-LD FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": (language === "hi" ? PLACES_FAQS_HINDI : PLACES_FAQS_ENGLISH).map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })
                }}
            />
        </>
    );
}

// ============ REUSABLE FAQ SECTION COMPONENT ============
function FAQSection({ faqs, title }: { faqs: { question: string, answer: string }[], title: string }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-16 border-t border-gray-200 dark:border-white/10 mt-16">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
                    {title}
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div 
                                key={idx}
                                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm transition-all"
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left text-gray-900 dark:text-white font-semibold text-sm md:text-base hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                >
                                    <span>{faq.question}</span>
                                    <ChevronDown 
                                        size={18} 
                                        className={`text-gray-500 dark:text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="px-6 pb-5 pt-1 text-gray-600 dark:text-white/70 text-xs md:text-sm border-t border-gray-100 dark:border-white/5 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}