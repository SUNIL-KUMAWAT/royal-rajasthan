// app/places/[slug]/PlaceDetailClient.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    MapPin,
    Star,
    Clock,
    Calendar,
    ChevronLeft,
    ChevronRight,
    X,
    Heart,
    Share2,
    Check,
    AlertCircle,
} from "lucide-react";
import type { Place } from "@/constants/data";

interface Props {
    place: Place;
}

function getTimeSlotBadge(isFree: boolean, price: number) {
    if (isFree) return { text: "Free Entry", color: "bg-green-500" };
    return { text: `₹${price}`, color: "bg-yellow-500" };
}

export function PlaceDetailClient({ place }: Props) {
    const [activeImage, setActiveImage] = useState(0);
    const [showLightbox, setShowLightbox] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [isFavorite, setIsFavorite] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "timing", label: "Timing & Tickets" },
        { id: "location", label: "Location" },
        { id: "history", label: "History" },
        { id: "tips", label: "Tips" },
        { id: "nearby", label: "Nearby" },
    ];

    const handleShare = async () => {
        const url = window.location.href;
        const text = `Check out ${place.name} in ${place.city}, Rajasthan! Rating: ${place.rating}/5`;

        if (navigator.share) {
            try {
                await navigator.share({ title: place.name, text, url });
            } catch { }
        } else {
            await navigator.clipboard.writeText(url);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
        setShowShareMenu(false);
    };

    // JSON-LD Schema for SEO
    const placeSchema = {
        "@context": "https://schema.org",
        "@type": "TouristAttraction",
        name: place.name,
        description: place.description,
        image: place.images,
        url: `https://royalrajasthan.com/places/${place.slug}`,
        address: {
            "@type": "PostalAddress",
            streetAddress: place.location.address,
            addressLocality: place.location.city,
            addressRegion: "Rajasthan",
            postalCode: place.location.pincode,
            addressCountry: "IN",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: place.location.latitude,
            longitude: place.location.longitude,
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: place.rating,
            reviewCount: place.reviews,
            bestRating: 5,
        },
        isAccessibleForFree: place.ticket.isFree,
    };

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
            />

            <div className="mt-16 bg-palace-white dark:bg-gray-950 min-h-screen">
                {/* Breadcrumb */}
                <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-3">
                    <div className="max-w-7xl mx-auto px-4 text-sm text-gray-400 flex items-center gap-2 flex-wrap">
                        <Link href="/" className="hover:text-yellow-600 transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link
                            href="/places"
                            className="hover:text-yellow-600 transition-colors"
                        >
                            Places
                        </Link>
                        <span>/</span>
                        <span className="text-gray-700 dark:text-gray-200 font-medium">
                            {place.name}
                        </span>
                    </div>
                </div>

                {/* Image Gallery */}
                <section className="bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Main Image */}
                            <div
                                className="lg:col-span-2 relative h-72 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden cursor-pointer group"
                                onClick={() => setShowLightbox(true)}
                            >
                                <img
                                    src={place.images[activeImage]}
                                    alt={`${place.name} - ${place.city}, Rajasthan`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                {/* Navigation Arrows */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImage(
                                            (p) =>
                                                (p - 1 + place.images.length) % place.images.length
                                        );
                                    }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImage(
                                            (p) => (p + 1) % place.images.length
                                        );
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all"
                                >
                                    <ChevronRight size={20} />
                                </button>

                                {/* Image Counter */}
                                <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                                    {activeImage + 1} / {place.images.length}
                                </div>

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                                    {place.isUNESCO && (
                                        <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                                            UNESCO Heritage
                                        </span>
                                    )}
                                    <span
                                        className={`text-white text-sm font-bold px-3 py-1 rounded-full ${place.isOpen ? "bg-green-500" : "bg-red-500"
                                            }`}
                                    >
                                        {place.isOpen ? "Open Now" : "Currently Closed"}
                                    </span>
                                </div>

                                {/* Zoom hint */}
                                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    Click to zoom
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="grid grid-cols-4 lg:grid-cols-1 gap-2 lg:gap-3">
                                {place.images.slice(0, 4).map((img, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`relative rounded-xl overflow-hidden cursor-pointer h-20 lg:h-28 transition-all ${i === activeImage
                                                ? "ring-3 ring-yellow-500 ring-offset-2"
                                                : "opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${place.name} photo ${i + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        {i === 3 && place.images.length > 4 && (
                                            <div
                                                className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-sm cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowLightbox(true);
                                                }}
                                            >
                                                +{place.images.length - 4}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left - Main Info */}
                        <div className="lg:col-span-2">
                            {/* Title Section */}
                            <div className="flex items-start justify-between mb-6 gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-medium px-2 py-1 rounded-full">
                                            {place.category}
                                        </span>
                                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium px-2 py-1 rounded-full">
                                            {place.subcategory}
                                        </span>
                                        {place.isUNESCO && (
                                            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium px-2 py-1 rounded-full">
                                                UNESCO ✓
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                        {place.name}
                                    </h1>
                                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 flex-wrap">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} className="text-yellow-500" />
                                            <span>{place.city}, {place.state}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star
                                                size={16}
                                                className="text-yellow-400 fill-yellow-400"
                                            />
                                            <span className="font-bold text-gray-800 dark:text-gray-200">
                                                {place.rating}
                                            </span>
                                            <span className="text-sm">
                                                ({place.reviews.toLocaleString()} reviews)
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => setIsFavorite(!isFavorite)}
                                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${isFavorite
                                                ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-500"
                                                : "border-gray-200 dark:border-gray-700 text-gray-400 hover:border-red-200 hover:text-red-400"
                                            }`}
                                    >
                                        <Heart
                                            size={18}
                                            className={isFavorite ? "fill-red-500" : ""}
                                        />
                                    </button>

                                    <div className="relative">
                                        <button
                                            onClick={() => setShowShareMenu(!showShareMenu)}
                                            className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 text-gray-400 flex items-center justify-center hover:border-blue-200 hover:text-blue-400 transition-all"
                                        >
                                            {copySuccess ? (
                                                <Check size={18} className="text-green-500" />
                                            ) : (
                                                <Share2 size={18} />
                                            )}
                                        </button>

                                        <AnimatePresence>
                                            {showShareMenu && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9, y: 5 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.9, y: 5 }}
                                                    className="absolute right-0 top-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 min-w-[180px] overflow-hidden"
                                                >
                                                    <button
                                                        onClick={handleShare}
                                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                                                    >
                                                        📋 Copy Link
                                                    </button>
                                                    <a
                                                        href={`https://wa.me/?text=${encodeURIComponent(
                                                            `Check out ${place.name} in ${place.city}! ${window.location.href}`
                                                        )}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
                                                        onClick={() => setShowShareMenu(false)}
                                                    >
                                                        💬 WhatsApp
                                                    </a>
                                                    <a
                                                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                                            `Visiting ${place.name} in ${place.city}, Rajasthan! ⭐ ${place.rating}/5 #Rajasthan #Travel`
                                                        )}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all"
                                                        onClick={() => setShowShareMenu(false)}
                                                    >
                                                        🐦 Twitter
                                                    </a>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                                <div className="flex gap-0 overflow-x-auto scrollbar-hide">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all flex-shrink-0 ${activeTab === tab.id
                                                    ? "border-yellow-500 text-yellow-600 dark:text-yellow-400"
                                                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                                }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tab Content */}
                            <AnimatePresence mode="wait">
                                {/* Overview Tab */}
                                {activeTab === "overview" && (
                                    <motion.div
                                        key="overview"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                                            {place.description}
                                        </p>

                                        {/* Quick Facts */}
                                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-6 mb-6">
                                            <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">
                                                Quick Facts
                                            </h2>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {[
                                                    { label: "Built In", value: place.yearBuilt },
                                                    { label: "Built By", value: place.builtBy },
                                                    { label: "Architecture", value: place.architecture },
                                                    { label: "Category", value: `${place.category} - ${place.subcategory}` },
                                                    { label: "Visit Duration", value: place.visitDuration.recommended },
                                                    { label: "Best Time", value: place.bestTimeToVisit.months },
                                                ].map((fact) => (
                                                    <div key={fact.label}>
                                                        <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                                                            {fact.label}
                                                        </div>
                                                        <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                                                            {fact.value}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Highlights */}
                                        <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">
                                            Highlights
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                                            {place.highlights.map((h) => (
                                                <div
                                                    key={h}
                                                    className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                                                >
                                                    <Star
                                                        size={14}
                                                        className="text-yellow-500 mt-0.5 flex-shrink-0 fill-yellow-500"
                                                    />
                                                    <span className="text-sm">{h}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Facilities */}
                                        <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">
                                            Facilities Available
                                        </h2>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {place.facilities.map((f) => (
                                                <span
                                                    key={f}
                                                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full"
                                                >
                                                    <Check size={12} className="text-green-500" />
                                                    {f}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Significance */}
                                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                                            <div className="flex items-start gap-2">
                                                <AlertCircle
                                                    size={16}
                                                    className="text-blue-500 mt-0.5 flex-shrink-0"
                                                />
                                                <p className="text-blue-700 dark:text-blue-400 text-sm">
                                                    <strong>Significance:</strong> {place.significance}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Timing & Tickets Tab */}
                                {activeTab === "timing" && (
                                    <motion.div
                                        key="timing"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-6"
                                    >
                                        {/* Timing */}
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                                            <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 text-lg">
                                                <Clock size={20} className="text-yellow-500" />
                                                Opening Hours
                                            </h2>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                                                    <span className="text-gray-500 dark:text-gray-400">
                                                        Opens At
                                                    </span>
                                                    <span className="font-bold text-green-600 text-xl">
                                                        {place.timing.open}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                                                    <span className="text-gray-500 dark:text-gray-400">
                                                        Closes At
                                                    </span>
                                                    <span className="font-bold text-red-500 text-xl">
                                                        {place.timing.close}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                                                    <span className="text-gray-500 dark:text-gray-400">
                                                        Closed On
                                                    </span>
                                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                                        {place.timing.closedOn}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center py-3">
                                                    <span className="text-gray-500 dark:text-gray-400">
                                                        Current Status
                                                    </span>
                                                    <span
                                                        className={`font-bold flex items-center gap-1 ${place.isOpen
                                                                ? "text-green-600"
                                                                : "text-red-500"
                                                            }`}
                                                    >
                                                        <div
                                                            className={`w-2 h-2 rounded-full ${place.isOpen
                                                                    ? "bg-green-500 animate-pulse"
                                                                    : "bg-red-500"
                                                                }`}
                                                        />
                                                        {place.isOpen ? "Open Now" : "Closed"}
                                                    </span>
                                                </div>
                                            </div>
                                            {place.timing.note && (
                                                <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-blue-700 dark:text-blue-400 text-sm flex items-start gap-2">
                                                    <AlertCircle
                                                        size={16}
                                                        className="mt-0.5 flex-shrink-0"
                                                    />
                                                    {place.timing.note}
                                                </div>
                                            )}
                                        </div>

                                        {/* Tickets */}
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                                            <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">
                                                🎫 Entry Tickets
                                            </h2>

                                            {place.ticket.isFree ? (
                                                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center mb-4">
                                                    <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-1">
                                                        FREE ENTRY
                                                    </div>
                                                    <div className="text-green-500 dark:text-green-500 text-sm">
                                                        No ticket required for entry
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
                                                        <div className="text-xs text-orange-400 mb-1">
                                                            Indian Adult
                                                        </div>
                                                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                                            ₹{place.ticket.indian}
                                                        </div>
                                                    </div>
                                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                                                        <div className="text-xs text-blue-400 mb-1">
                                                            Foreigner Adult
                                                        </div>
                                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                            ₹{place.ticket.foreigner}
                                                        </div>
                                                    </div>
                                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                                                        <div className="text-xs text-green-400 mb-1">
                                                            Indian Child
                                                        </div>
                                                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                            {place.ticket.childIndian === 0
                                                                ? "Free"
                                                                : `₹${place.ticket.childIndian}`}
                                                        </div>
                                                    </div>
                                                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
                                                        <div className="text-xs text-purple-400 mb-1">
                                                            Camera Fee
                                                        </div>
                                                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                                            {place.ticket.camera === 0
                                                                ? "Free"
                                                                : `₹${place.ticket.camera}`}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {place.ticket.note && (
                                                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 text-yellow-700 dark:text-yellow-400 text-sm flex items-start gap-2">
                                                    <AlertCircle
                                                        size={16}
                                                        className="mt-0.5 flex-shrink-0"
                                                    />
                                                    {place.ticket.note}
                                                </div>
                                            )}
                                        </div>

                                        {/* Visit Duration */}
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                                            <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">
                                                ⏱ Recommended Visit Duration
                                            </h2>
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                                                    <div className="text-xs text-gray-400 mb-1">
                                                        Minimum
                                                    </div>
                                                    <div className="font-bold text-gray-700 dark:text-gray-300">
                                                        {place.visitDuration.minimum}
                                                    </div>
                                                </div>
                                                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 text-center border-2 border-yellow-300 dark:border-yellow-700">
                                                    <div className="text-xs text-yellow-600 dark:text-yellow-400 mb-1">
                                                        ⭐ Recommended
                                                    </div>
                                                    <div className="font-bold text-yellow-700 dark:text-yellow-400">
                                                        {place.visitDuration.recommended}
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                                                    <div className="text-xs text-gray-400 mb-1">
                                                        Extended
                                                    </div>
                                                    <div className="font-bold text-gray-700 dark:text-gray-300">
                                                        {place.visitDuration.extended}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Location Tab */}
                                {activeTab === "location" && (
                                    <motion.div
                                        key="location"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-6"
                                    >
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                                            <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 text-lg">
                                                <MapPin size={20} className="text-yellow-500" />
                                                Location Details
                                            </h2>
                                            <div className="space-y-3">
                                                {[
                                                    { label: "Address", value: place.location.address },
                                                    { label: "City", value: `${place.location.city}, ${place.state}` },
                                                    { label: "Pincode", value: place.location.pincode },
                                                    { label: "From City Center", value: place.location.distanceFromCity },
                                                    { label: "Nearest Airport", value: place.location.nearestAirport },
                                                    { label: "Nearest Railway", value: place.location.nearestRailway },
                                                ].map((item) => (
                                                    <div
                                                        key={item.label}
                                                        className="flex justify-between items-start py-2 border-b border-gray-50 dark:border-gray-700"
                                                    >
                                                        <span className="text-gray-500 dark:text-gray-400 text-sm flex-shrink-0">
                                                            {item.label}
                                                        </span>
                                                        <span className="font-medium text-gray-800 dark:text-gray-200 text-sm text-right ml-4">
                                                            {item.value}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            <a
                                                href={place.location.googleMapUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                                            >
                                                <MapPin size={18} />
                                                Open in Google Maps
                                            </a>
                                        </div>

                                        {/* Map Embed */}
                                        <div className="rounded-2xl overflow-hidden h-64 md:h-80 border border-gray-200 dark:border-gray-700">
                                            <iframe
                                                src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5000!2d${place.location.longitude}!3d${place.location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin`}
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                title={`${place.name} Map Location`}
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {/* History Tab */}
                                {activeTab === "history" && (
                                    <motion.div
                                        key="history"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                                            <h2 className="font-playfair text-2xl font-bold text-gray-800 dark:text-white mb-6">
                                                📜 History of {place.name}
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base mb-6">
                                                {place.history}
                                            </p>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {[
                                                    { label: "Year Built", value: place.yearBuilt, color: "yellow" },
                                                    { label: "Built By", value: place.builtBy, color: "maroon" },
                                                    { label: "Architecture", value: place.architecture, color: "blue" },
                                                    {
                                                        label: "Heritage Status",
                                                        value: place.isUNESCO ? "UNESCO World Heritage" : "State Heritage",
                                                        color: "green",
                                                    },
                                                ].map((item) => (
                                                    <div
                                                        key={item.label}
                                                        className={`bg-${item.color}-50 dark:bg-${item.color}-900/20 rounded-xl p-3 text-center`}
                                                    >
                                                        <div className={`text-xs text-${item.color}-400 mb-1`}>
                                                            {item.label}
                                                        </div>
                                                        <div className={`font-bold text-${item.color}-700 dark:text-${item.color}-400 text-sm`}>
                                                            {item.value}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Tips Tab */}
                                {activeTab === "tips" && (
                                    <motion.div
                                        key="tips"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-6"
                                    >
                                        {/* Do's */}
                                        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
                                            <h2 className="font-bold text-green-800 dark:text-green-400 mb-4 text-lg">
                                                ✅ Do&apos;s
                                            </h2>
                                            <div className="space-y-2">
                                                {place.dos.map((d) => (
                                                    <div
                                                        key={d}
                                                        className="flex items-start gap-2 text-green-700 dark:text-green-400"
                                                    >
                                                        <Check
                                                            size={16}
                                                            className="mt-0.5 flex-shrink-0"
                                                        />
                                                        <span className="text-sm">{d}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Don'ts */}
                                        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
                                            <h2 className="font-bold text-red-800 dark:text-red-400 mb-4 text-lg">
                                                ❌ Don&apos;ts
                                            </h2>
                                            <div className="space-y-2">
                                                {place.donts.map((d) => (
                                                    <div
                                                        key={d}
                                                        className="flex items-start gap-2 text-red-700 dark:text-red-400"
                                                    >
                                                        <X
                                                            size={16}
                                                            className="mt-0.5 flex-shrink-0"
                                                        />
                                                        <span className="text-sm">{d}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Best Time */}
                                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
                                            <h2 className="font-bold text-blue-800 dark:text-blue-400 mb-4 text-lg">
                                                🌤 Best Time to Visit
                                            </h2>
                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    { label: "Best Months", value: place.bestTimeToVisit.months },
                                                    { label: "Season", value: place.bestTimeToVisit.season },
                                                    { label: "Weather", value: place.bestTimeToVisit.weather },
                                                    { label: "Pro Tip", value: place.bestTimeToVisit.tip },
                                                ].map((item) => (
                                                    <div key={item.label}>
                                                        <div className="text-xs text-blue-400 mb-1">
                                                            {item.label}
                                                        </div>
                                                        <div className="font-medium text-blue-800 dark:text-blue-300 text-sm">
                                                            {item.value}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Nearby Tab */}
                                {activeTab === "nearby" && (
                                    <motion.div
                                        key="nearby"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                                            <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">
                                                📍 Nearby Places
                                            </h2>
                                            <div className="space-y-3">
                                                {place.nearbyPlaces.map((np) => (
                                                    <div
                                                        key={np}
                                                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all"
                                                    >
                                                        <MapPin
                                                            size={16}
                                                            className="text-yellow-500 flex-shrink-0"
                                                        />
                                                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                                                            {np}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Right Sidebar */}
                        <div>
                            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
                                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-5 text-lg">
                                    Quick Info
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Clock size={18} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                                                Timing
                                            </div>
                                            <div className="text-gray-500 dark:text-gray-400 text-sm">
                                                {place.timing.open} - {place.timing.close}
                                            </div>
                                            <div className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">
                                                {place.timing.closedOn}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-lg flex-shrink-0 mt-0.5">🎫</span>
                                        <div>
                                            <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                                                Entry Fee
                                            </div>
                                            {place.ticket.isFree ? (
                                                <div className="text-green-600 dark:text-green-400 font-bold text-sm">
                                                    FREE ENTRY
                                                </div>
                                            ) : (
                                                <div className="text-gray-500 dark:text-gray-400 text-sm">
                                                    ₹{place.ticket.indian} (Indian)
                                                    <br />₹{place.ticket.foreigner} (Foreign)
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Calendar size={18} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                                                Best Time
                                            </div>
                                            <div className="text-gray-500 dark:text-gray-400 text-sm">
                                                {place.bestTimeToVisit.months}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-lg flex-shrink-0 mt-0.5">⏱</span>
                                        <div>
                                            <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                                                Visit Duration
                                            </div>
                                            <div className="text-gray-500 dark:text-gray-400 text-sm">
                                                {place.visitDuration.recommended}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <MapPin size={18} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                                                Distance
                                            </div>
                                            <div className="text-gray-500 dark:text-gray-400 text-sm">
                                                {place.location.distanceFromCity}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Star size={18} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                                                Rating
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-500 font-bold">
                                                    {place.rating}
                                                </span>
                                                <span className="text-gray-400 text-xs">
                                                    / 5 ({place.reviews.toLocaleString()} reviews)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Directions Button */}
                                <a
                                    href={place.location.googleMapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-[1.02]"
                                >
                                    <MapPin size={18} />
                                    Get Directions
                                </a>

                                {/* Tags */}
                                <div className="mt-5">
                                    <div className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                                        Tags
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {place.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Back Button */}
                                <Link
                                    href="/places"
                                    className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 py-3 rounded-xl font-medium hover:border-yellow-400 hover:text-yellow-600 transition-all text-sm"
                                >
                                    ← Back to All Places
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {showLightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                        onClick={() => setShowLightbox(false)}
                    >
                        <button
                            onClick={() => setShowLightbox(false)}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 z-10"
                        >
                            <X size={20} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveImage(
                                    (p) =>
                                        (p - 1 + place.images.length) % place.images.length
                                );
                            }}
                            className="absolute left-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 z-10"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <motion.img
                            key={activeImage}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            src={place.images[activeImage]}
                            alt={`${place.name} - Photo ${activeImage + 1}`}
                            className="max-w-5xl w-full max-h-[85vh] object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveImage((p) => (p + 1) % place.images.length);
                            }}
                            className="absolute right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 z-10"
                        >
                            <ChevronRight size={24} />
                        </button>

                        <div className="absolute bottom-6 flex gap-2 z-10">
                            {place.images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImage(i);
                                    }}
                                    className={`rounded-full transition-all ${i === activeImage
                                            ? "w-6 h-2 bg-yellow-500"
                                            : "w-2 h-2 bg-white/40"
                                        }`}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Click outside share menu */}
            {showShareMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowShareMenu(false)}
                />
            )}
        </>
    );
}