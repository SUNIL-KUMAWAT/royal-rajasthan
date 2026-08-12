// app/places/[slug]/PlaceDetailClient.tsx
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
    Grid,
} from "lucide-react";
import { PLACES } from "@/constants/places";
import type { Place } from "@/types";
import { useLanguage } from "@/components/LanguageProvider";
import { ExploreMoreSection } from "@/components/shared/ExploreMoreSection";
interface Props {
    place: Place;
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-50/50 dark:hover:bg-gray-700 transition-colors"
            >
                <span className="text-sm sm:text-base pr-4">{question}</span>
                <span className={`text-xs transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    ▼
                </span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="p-5 pt-0 text-gray-600 dark:text-gray-400 border-t border-gray-50 dark:border-gray-700 leading-relaxed text-sm">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function getTimeSlotBadge(isFree: boolean, price: number) {
    if (isFree) return { text: "Free Entry", color: "bg-green-500" };
    return { text: `₹${price}`, color: "bg-yellow-500" };
}

export function PlaceDetailClient({ place: initialPlace }: Props) {
    const { language } = useLanguage();
    const [hindiPlace, setHindiPlace] = useState<Place | null>(null);
    const [allHindiPlaces, setAllHindiPlaces] = useState<Place[]>([]);

    useEffect(() => {
        if (language === "hi") {
            import("@/constants/places-hindi").then((mod) => {
                setAllHindiPlaces(mod.PLACES_HINDI);
                const found = mod.PLACES_HINDI.find((p) => p.slug === initialPlace.slug);
                if (found) setHindiPlace(found);
            });
        }
    }, [language, initialPlace.slug]);

    const place = (language === "hi" && hindiPlace) ? hindiPlace : initialPlace;
    const activePlaces = (language === "hi" && allHindiPlaces.length > 0) ? allHindiPlaces : PLACES;

    const [activeImage, setActiveImage] = useState(0);
    const [showLightbox, setShowLightbox] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [isFavorite, setIsFavorite] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const t = {
        quickFacts: language === "hi" ? "महत्वपूर्ण तथ्य" : "Quick Facts",
        builtIn: language === "hi" ? "निर्माण वर्ष" : "Built In",
        builtBy: language === "hi" ? "निर्माता" : "Built By",
        designedBy: language === "hi" ? "वास्तुकार" : "Designed By",
        district: language === "hi" ? "जिला" : "District",
        architecture: language === "hi" ? "वास्तुकला" : "Architecture",
        category: language === "hi" ? "श्रेणी" : "Category",
        visitDuration: language === "hi" ? "घूमने की अवधि" : "Visit Duration",
        bestTime: language === "hi" ? "सर्वोत्तम समय" : "Best Time",
        highlights: language === "hi" ? "मुख्य आकर्षण" : "Highlights",
        facilities: language === "hi" ? "उपलब्ध सुविधाएं" : "Facilities Available",
        significance: language === "hi" ? "महत्व" : "Significance",
        activities: language === "hi" ? "मुख्य गतिविधियाँ" : "Activities to Do",
        accessibility: language === "hi" ? "पहुंच व सुगमता" : "Accessibility",
        photography: language === "hi" ? "फोटोग्राफी नियम व जानकारी" : "Photography Rules & Info",
        faqs: language === "hi" ? "अक्सर पूछे जाने वाले प्रश्न" : "FAQs",
        relatedPlaces: language === "hi" ? "संबंधित स्थल" : "Related Places"
    };

    const tabs = [
        { id: "overview", label: language === "hi" ? "अवलोकन" : "Overview" },
        { id: "timing", label: language === "hi" ? "समय और टिकट" : "Timing & Tickets" },
        { id: "location", label: language === "hi" ? "स्थान" : "Location" },
        { id: "history", label: language === "hi" ? "इतिहास" : "History" },
        { id: "tips", label: language === "hi" ? "सुझाव" : "Tips" },
        { id: "nearby", label: language === "hi" ? "आसपास" : "Nearby" },
    ];

    if (place.faqs && place.faqs.length > 0) {
        tabs.push({ id: "faqs", label: language === "hi" ? "प्रश्न-उत्तर" : "FAQs" });
    }

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
        "@type": ["TouristAttraction", "LocalBusiness"],
        name: place.name,
        description: place.description,
        image: place.images,
        url: `https://rajasthanplaces.in/places/${place.slug}`,
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

    // JSON-LD FAQ Schema
    const faqSchema = place.faqs && place.faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": place.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    } : null;

    // JSON-LD Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://rajasthanplaces.in"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Places",
                "item": "https://rajasthanplaces.in/places"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": place.name,
                "item": `https://rajasthanplaces.in/places/${place.slug}`
            }
        ]
    };

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}

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
                <section className="bg-white dark:bg-gray-950 md:py-6 lg:py-8">
                    {/* Mobile Native Swipe Slider (Visible only on mobile) */}
                    <div className="md:hidden relative w-full h-[350px] sm:h-[450px]">
                        <div
                            className="w-full h-full flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            onScroll={(e) => {
                                const target = e.target as HTMLDivElement;
                                const index = Math.round(target.scrollLeft / target.clientWidth);
                                setActiveImage(index);
                            }}
                        >
                            {place.images.map((img, i) => (
                                <div key={i} className="w-full h-full flex-shrink-0 snap-center relative" onClick={() => setShowLightbox(true)}>
                                    <Image src={img} alt={place.name} fill className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/10" />
                                </div>
                            ))}
                        </div>

                        {/* Mobile Badges */}
                        <div className="absolute top-4 left-4 flex gap-2 z-10">
                            {place.isUNESCO && (
                                <span className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg border border-white/20">
                                    UNESCO
                                </span>
                            )}
                            <span className={`text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm border border-white/20 ${place.isOpen ? "bg-emerald-500/90" : "bg-red-500/90"}`}>
                                {place.isOpen ? "Open" : "Closed"}
                            </span>
                        </div>

                        {/* Mobile Image Counter/Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                            {place.images.map((_, i) => (
                                <div key={i} className={`h-1.5 rounded-full transition-all ${i === activeImage ? "w-4 bg-white" : "w-1.5 bg-white/50"}`} />
                            ))}
                        </div>

                        {/* Mobile View All Button */}
                        <button
                            onClick={() => setShowLightbox(true)}
                            className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold border border-white/20 flex items-center gap-1.5"
                        >
                            <Grid size={14} />
                            All
                        </button>
                    </div>

                    {/* Desktop Modern Bento Grid (Visible only on md and up) */}
                    <div className="hidden md:block max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-4 grid-rows-2 gap-3 lg:gap-4 h-[55vh] lg:h-[65vh] rounded-3xl overflow-hidden group/gallery relative shadow-2xl">

                            {/* Main Large Image */}
                            <div
                                className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden group"
                                onClick={() => { setActiveImage(0); setShowLightbox(true); }}
                            >
                                <Image
                                    src={place.images[0]}
                                    alt={place.name}
                                    fill
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

                                {/* Desktop Badges */}
                                <div className="absolute top-5 left-5 flex gap-2 flex-wrap z-10">
                                    {place.isUNESCO && (
                                        <span className="bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                                            UNESCO Heritage
                                        </span>
                                    )}
                                    <span className={`text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md border border-white/20 ${place.isOpen ? "bg-emerald-500/90" : "bg-red-500/90"}`}>
                                        {place.isOpen ? "Open Now" : "Currently Closed"}
                                    </span>
                                </div>
                            </div>

                            {/* Top Right Image */}
                            {place.images.length > 1 && (
                                <div
                                    className="col-span-2 row-span-1 relative cursor-pointer overflow-hidden group"
                                    onClick={() => { setActiveImage(1); setShowLightbox(true); }}
                                >
                                    <Image
                                        src={place.images[1]}
                                        alt={place.name}
                                        fill
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                            )}

                            {/* Bottom Right 1 */}
                            {place.images.length > 2 && (
                                <div
                                    className="col-span-1 row-span-1 relative cursor-pointer overflow-hidden group"
                                    onClick={() => { setActiveImage(2); setShowLightbox(true); }}
                                >
                                    <Image
                                        src={place.images[2]}
                                        alt={place.name}
                                        fill
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                            )}

                            {/* Bottom Right 2 */}
                            {place.images.length > 3 && (
                                <div
                                    className="col-span-1 row-span-1 relative cursor-pointer overflow-hidden group"
                                    onClick={() => { setActiveImage(3); setShowLightbox(true); }}
                                >
                                    <Image
                                        src={place.images[3]}
                                        alt={place.name}
                                        fill
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
                                </div>
                            )}

                            {/* Desktop View All Photos Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); setActiveImage(0); setShowLightbox(true); }}
                                className="absolute bottom-6 right-6 bg-white/95 dark:bg-gray-900/95 hover:bg-white dark:hover:bg-black backdrop-blur-xl text-gray-900 dark:text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200/50 dark:border-gray-700/50 z-20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                            >
                                <Grid size={18} />
                                Show all photos
                            </button>
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
                                <div className="flex flex-wrap w-full gap-y-1">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`px-3 sm:px-6 py-2.5 sm:py-3 text-[13px] sm:text-base font-semibold whitespace-nowrap border-b-2 transition-all flex-shrink-0 ${activeTab === tab.id
                                                ? "border-yellow-500 text-yellow-600 dark:text-yellow-400"
                                                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                                }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tab Content */}
                            <AnimatePresence mode="wait">
                                {/* Overview Tab — shows ALL sections on scroll */}
                                {activeTab === "overview" && (
                                    <motion.div
                                        key="overview"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-10"
                                    >
                                        {/* ── Description ── */}
                                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                                            {place.description}
                                        </p>

                                        {/* ── Quick Facts ── */}
                                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-6">
                                            <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">
                                                {t.quickFacts}
                                            </h2>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {[
                                                    { label: t.builtIn, value: place.yearBuilt },
                                                    { label: t.builtBy, value: place.builtBy },
                                                    ...(place.designedBy ? [{ label: t.designedBy, value: place.designedBy }] : []),
                                                    { label: t.architecture, value: place.architecture },
                                                    { label: t.category, value: `${place.category} - ${place.subcategory}` },
                                                    ...(place.district ? [{ label: t.district, value: place.district }] : []),
                                                    { label: t.visitDuration, value: place.visitDuration.recommended },
                                                    { label: t.bestTime, value: place.bestTimeToVisit.months },
                                                ].map((fact) => (
                                                    <div key={fact.label}>
                                                        <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">{fact.label}</div>
                                                        <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">{fact.value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* ── Highlights ── */}
                                        <div>
                                            <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">{t.highlights}</h2>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {place.highlights.map((h) => (
                                                    <div key={h} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                                                        <Star size={14} className="text-yellow-500 mt-0.5 flex-shrink-0 fill-yellow-500" />
                                                        <span className="text-sm">{h}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* ── Activities ── */}
                                        {place.activities && place.activities.length > 0 && (
                                            <div>
                                                <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">{t.activities}</h2>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {place.activities.map((act) => (
                                                        <div key={act} className="flex items-start gap-2.5 p-3 bg-yellow-500/5 dark:bg-yellow-500/10 border border-yellow-500/10 dark:border-yellow-500/20 rounded-xl text-gray-700 dark:text-gray-300">
                                                            <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">🎯</span>
                                                            <span className="text-sm font-medium">{act}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* ── Facilities ── */}
                                        <div>
                                            <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">{t.facilities}</h2>
                                            <div className="flex flex-wrap gap-2">
                                                {place.facilities.map((f) => (
                                                    <span key={f} className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full">
                                                        <Check size={12} className="text-green-500" />
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* ── Accessibility ── */}
                                        {place.accessibility && place.accessibility.length > 0 && (
                                            <div>
                                                <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">{t.accessibility}</h2>
                                                <div className="space-y-2.5">
                                                    {place.accessibility.map((acc) => (
                                                        <div key={acc} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                                                            <span className="text-blue-500 mt-0.5">♿</span>
                                                            <span className="text-sm">{acc}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* ── Significance ── */}
                                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                                            <div className="flex items-start gap-2">
                                                <AlertCircle size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                                                <p className="text-blue-700 dark:text-blue-400 text-sm">
                                                    <strong>{t.significance}:</strong> {place.significance}
                                                </p>
                                            </div>
                                        </div>

                                        {/* ══════════ TIMING & TICKETS ══════════ */}
                                        <div className="border-t-2 border-dashed border-gray-200 dark:border-gray-700 pt-8">
                                            <h2 className="font-playfair text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                                                <Clock size={22} className="text-yellow-500" />
                                                {language === "hi" ? "समय और टिकट" : "Timing & Tickets"}
                                            </h2>
                                            <div className="space-y-6">
                                                {/* Timing */}
                                                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                                                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 text-base">
                                                        <Clock size={18} className="text-yellow-500" />
                                                        {language === "hi" ? "खुलने का समय" : "Opening Hours"}
                                                    </h3>
                                                    <div className="space-y-3">
                                                        {[
                                                            { label: language === "hi" ? "खुलता है" : "Opens At", value: place.timing.open, cls: "text-green-600 font-bold text-xl" },
                                                            { label: language === "hi" ? "बंद होता है" : "Closes At", value: place.timing.close, cls: "text-red-500 font-bold text-xl" },
                                                            { label: language === "hi" ? "बंद रहता है" : "Closed On", value: place.timing.closedOn, cls: "font-medium text-gray-800 dark:text-gray-200" },
                                                        ].map((row) => (
                                                            <div key={row.label} className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                                                                <span className="text-gray-500 dark:text-gray-400">{row.label}</span>
                                                                <span className={row.cls}>{row.value}</span>
                                                            </div>
                                                        ))}
                                                        <div className="flex justify-between items-center py-3">
                                                            <span className="text-gray-500 dark:text-gray-400">{language === "hi" ? "अभी की स्थिति" : "Current Status"}</span>
                                                            <span className={`font-bold flex items-center gap-1 ${place.isOpen ? "text-green-600" : "text-red-500"}`}>
                                                                <div className={`w-2 h-2 rounded-full ${place.isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                                                                {place.isOpen ? (language === "hi" ? "अभी खुला है" : "Open Now") : (language === "hi" ? "बंद है" : "Closed")}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {place.timing.note && (
                                                        <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-blue-700 dark:text-blue-400 text-sm flex items-start gap-2">
                                                            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                                            {place.timing.note}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Tickets */}
                                                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                                                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-base">
                                                        🎫 {language === "hi" ? "प्रवेश टिकट" : "Entry Tickets"}
                                                    </h3>
                                                    {place.ticket.isFree ? (
                                                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center">
                                                            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-1">FREE ENTRY</div>
                                                            <div className="text-green-500 text-sm">{language === "hi" ? "प्रवेश के लिए कोई टिकट नहीं" : "No ticket required for entry"}</div>
                                                        </div>
                                                    ) : (
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                            {[
                                                                { label: language === "hi" ? "भारतीय वयस्क" : "Indian Adult", value: `₹${place.ticket.indian}`, color: "orange" },
                                                                { label: language === "hi" ? "विदेशी वयस्क" : "Foreigner Adult", value: `₹${place.ticket.foreigner}`, color: "blue" },
                                                                { label: language === "hi" ? "भारतीय बच्चा" : "Indian Child", value: place.ticket.childIndian === 0 ? "Free" : `₹${place.ticket.childIndian}`, color: "green" },
                                                                { label: language === "hi" ? "कैमरा शुल्क" : "Camera Fee", value: place.ticket.camera === 0 ? "Free" : `₹${place.ticket.camera}`, color: "purple" },
                                                            ].map((t) => (
                                                                <div key={t.label} className={`bg-${t.color}-50 dark:bg-${t.color}-900/20 rounded-xl p-4 text-center`}>
                                                                    <div className={`text-xs text-${t.color}-400 mb-1`}>{t.label}</div>
                                                                    <div className={`text-2xl font-bold text-${t.color}-600 dark:text-${t.color}-400`}>{t.value}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {place.ticket.note && (
                                                        <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 text-yellow-700 dark:text-yellow-400 text-sm flex items-start gap-2">
                                                            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                                            {place.ticket.note}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Visit Duration */}
                                                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                                                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-base">
                                                        ⏱ {language === "hi" ? "घूमने की अनुशंसित अवधि" : "Recommended Visit Duration"}
                                                    </h3>
                                                    <div className="grid grid-cols-3 gap-3">
                                                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                                                            <div className="text-xs text-gray-400 mb-1">{language === "hi" ? "न्यूनतम" : "Minimum"}</div>
                                                            <div className="font-bold text-gray-700 dark:text-gray-300">{place.visitDuration.minimum}</div>
                                                        </div>
                                                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 text-center border-2 border-yellow-300 dark:border-yellow-700">
                                                            <div className="text-xs text-yellow-600 dark:text-yellow-400 mb-1">⭐ {language === "hi" ? "अनुशंसित" : "Recommended"}</div>
                                                            <div className="font-bold text-yellow-700 dark:text-yellow-400">{place.visitDuration.recommended}</div>
                                                        </div>
                                                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                                                            <div className="text-xs text-gray-400 mb-1">{language === "hi" ? "विस्तारित" : "Extended"}</div>
                                                            <div className="font-bold text-gray-700 dark:text-gray-300">{place.visitDuration.extended}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ══════════ LOCATION ══════════ */}
                                        <div className="border-t-2 border-dashed border-gray-200 dark:border-gray-700 pt-8">
                                            <h2 className="font-playfair text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                                                <MapPin size={22} className="text-yellow-500" />
                                                {language === "hi" ? "स्थान" : "Location"}
                                            </h2>
                                            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-4">
                                                <div className="space-y-3">
                                                    {[
                                                        { label: language === "hi" ? "पता" : "Address", value: place.location.address },
                                                        { label: language === "hi" ? "शहर" : "City", value: `${place.location.city}, ${place.state}` },
                                                        { label: language === "hi" ? "पिनकोड" : "Pincode", value: place.location.pincode },
                                                        { label: language === "hi" ? "शहर से दूरी" : "From City Center", value: place.location.distanceFromCity },
                                                        { label: language === "hi" ? "नजदीकी हवाई अड्डा" : "Nearest Airport", value: place.location.nearestAirport },
                                                        { label: language === "hi" ? "नजदीकी रेलवे" : "Nearest Railway", value: place.location.nearestRailway },
                                                    ].map((item) => (
                                                        <div key={item.label} className="flex justify-between items-start py-2 border-b border-gray-50 dark:border-gray-700 last:border-0">
                                                            <span className="text-gray-500 dark:text-gray-400 text-sm flex-shrink-0">{item.label}</span>
                                                            <span className="font-medium text-gray-800 dark:text-gray-200 text-sm text-right ml-4">{item.value}</span>
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
                                                    {language === "hi" ? "Google Maps में खोलें" : "Open in Google Maps"}
                                                </a>
                                            </div>
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
                                        </div>

                                        {/* ══════════ HISTORY ══════════ */}
                                        <div className="border-t-2 border-dashed border-gray-200 dark:border-gray-700 pt-8">
                                            <h2 className="font-playfair text-2xl font-bold text-gray-800 dark:text-white mb-6">
                                                📜 {language === "hi" ? `${place.name} का इतिहास` : `History of ${place.name}`}
                                            </h2>
                                            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                                                <div
                                                    className="[&_p]:text-gray-600 dark:[&_p]:text-gray-300 [&_p]:leading-relaxed sm:[&_p]:leading-loose [&_p]:mb-4 sm:[&_p]:mb-6 [&_h3]:text-gold-600 dark:[&_h3]:text-gold-400 [&_h3]:font-playfair [&_h3]:text-lg sm:[&_h3]:text-2xl [&_h3]:mt-8 sm:[&_h3]:mt-10 [&_h3]:mb-3 sm:[&_h3]:mb-4 max-w-none text-justify text-sm sm:text-lg transition-colors"
                                                    dangerouslySetInnerHTML={{ __html: place.history }}
                                                />
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                                                    {[
                                                        { label: language === "hi" ? "निर्माण वर्ष" : "Year Built", value: place.yearBuilt, color: "yellow" },
                                                        { label: language === "hi" ? "निर्माता" : "Built By", value: place.builtBy, color: "maroon" },
                                                        { label: language === "hi" ? "वास्तुकला" : "Architecture", value: place.architecture, color: "blue" },
                                                        { label: language === "hi" ? "धरोहर स्थिति" : "Heritage Status", value: place.isUNESCO ? "UNESCO World Heritage" : "State Heritage", color: "green" },
                                                    ].map((item) => (
                                                        <div key={item.label} className={`bg-${item.color}-50 dark:bg-${item.color}-900/20 rounded-xl p-3 text-center`}>
                                                            <div className={`text-xs text-${item.color}-400 mb-1`}>{item.label}</div>
                                                            <div className={`font-bold text-${item.color}-700 dark:text-${item.color}-400 text-sm`}>{item.value}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* ══════════ TIPS ══════════ */}
                                        <div className="border-t-2 border-dashed border-gray-200 dark:border-gray-700 pt-8">
                                            <h2 className="font-playfair text-2xl font-bold text-gray-800 dark:text-white mb-6">
                                                💡 {language === "hi" ? "सुझाव" : "Tips"}
                                            </h2>
                                            <div className="space-y-6">
                                                <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
                                                    <h3 className="font-bold text-green-800 dark:text-green-400 mb-4 text-base">✅ {language === "hi" ? "क्या करें" : "Do's"}</h3>
                                                    <div className="space-y-2">
                                                        {place.dos.map((d) => (
                                                            <div key={d} className="flex items-start gap-2 text-green-700 dark:text-green-400">
                                                                <Check size={16} className="mt-0.5 flex-shrink-0" />
                                                                <span className="text-sm">{d}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
                                                    <h3 className="font-bold text-red-800 dark:text-red-400 mb-4 text-base">❌ {language === "hi" ? "क्या न करें" : "Don'ts"}</h3>
                                                    <div className="space-y-2">
                                                        {place.donts.map((d) => (
                                                            <div key={d} className="flex items-start gap-2 text-red-700 dark:text-red-400">
                                                                <X size={16} className="mt-0.5 flex-shrink-0" />
                                                                <span className="text-sm">{d}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
                                                    <h3 className="font-bold text-blue-800 dark:text-blue-400 mb-4 text-base">🌤 {t.bestTime}</h3>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {[
                                                            { label: language === "hi" ? "सर्वोत्तम महीने" : "Best Months", value: place.bestTimeToVisit.months },
                                                            { label: language === "hi" ? "मौसम" : "Season", value: place.bestTimeToVisit.season },
                                                            { label: language === "hi" ? "मौसम जानकारी" : "Weather", value: place.bestTimeToVisit.weather },
                                                            { label: language === "hi" ? "महत्वपूर्ण टिप" : "Pro Tip", value: place.bestTimeToVisit.tip },
                                                        ].map((item) => (
                                                            <div key={item.label}>
                                                                <div className="text-xs text-blue-400 mb-1">{item.label}</div>
                                                                <div className="font-medium text-blue-800 dark:text-blue-300 text-sm">{item.value}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {place.photography && (
                                                    <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-2xl p-6">
                                                        <h3 className="font-bold text-yellow-800 dark:text-yellow-400 mb-3 text-base flex items-center gap-2">
                                                            📸 {t.photography}
                                                        </h3>
                                                        <p className="text-sm text-yellow-950/80 dark:text-yellow-300/80 leading-relaxed">{place.photography}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* ══════════ NEARBY ══════════ */}
                                        <div className="border-t-2 border-dashed border-gray-200 dark:border-gray-700 pt-8">
                                            <h2 className="font-playfair text-2xl font-bold text-gray-800 dark:text-white mb-6">
                                                📍 {language === "hi" ? "आसपास" : "Nearby"}
                                            </h2>
                                            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                                                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-base">
                                                    {language === "hi" ? "आसपास के स्थल" : "Nearby Places"}
                                                </h3>
                                                <div className="space-y-3">
                                                    {place.nearbyPlaces.map((np) => (
                                                        <div key={np} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all">
                                                            <MapPin size={16} className="text-yellow-500 flex-shrink-0" />
                                                            <span className="text-gray-700 dark:text-gray-300 text-sm">{np}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            {place.relatedPlaces && place.relatedPlaces.length > 0 && (
                                                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mt-6">
                                                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-base">🔗 {t.relatedPlaces}</h3>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {place.relatedPlaces.map((rp) => {
                                                            const matchedPlace = activePlaces.find(
                                                                (p: any) => p.name.toLowerCase() === rp.toLowerCase() ||
                                                                    (language === "hi" && p.name === rp)
                                                            );
                                                            if (matchedPlace) {
                                                                return (
                                                                    <Link
                                                                        key={rp}
                                                                        href={`/places/${matchedPlace.slug}`}
                                                                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all border border-transparent hover:border-yellow-200"
                                                                    >
                                                                        <span className="text-lg">🏛️</span>
                                                                        <span className="text-gray-800 dark:text-gray-200 text-sm font-semibold hover:text-yellow-600 transition-colors">{rp}</span>
                                                                    </Link>
                                                                );
                                                            }
                                                            return (
                                                                <div key={rp} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                                                    <span className="text-lg">🏛️</span>
                                                                    <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{rp}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* ══════════ FAQs ══════════ */}
                                        {place.faqs && place.faqs.length > 0 && (
                                            <div className="border-t-2 border-dashed border-gray-200 dark:border-gray-700 pt-8">
                                                <h2 className="font-playfair text-2xl font-bold text-gray-800 dark:text-white mb-6">
                                                    🙋 {t.faqs}
                                                </h2>
                                                <div className="space-y-4">
                                                    {place.faqs.map((faq, i) => (
                                                        <FAQItem key={i} question={faq.question} answer={faq.answer} />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
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
                                            <div
                                                className="[&_p]:text-gray-600 dark:[&_p]:text-gray-300 [&_p]:leading-relaxed sm:[&_p]:leading-loose [&_p]:mb-4 sm:[&_p]:mb-6 [&_h3]:text-gold-600 dark:[&_h3]:text-gold-400 [&_h3]:font-playfair [&_h3]:text-lg sm:[&_h3]:text-2xl [&_h3]:mt-8 sm:[&_h3]:mt-10 [&_h3]:mb-3 sm:[&_h3]:mb-4 max-w-none text-justify text-sm sm:text-lg transition-colors"
                                                dangerouslySetInnerHTML={{ __html: place.history }}
                                            />

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
                                                🌤 {t.bestTime}
                                            </h2>
                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    { label: language === "hi" ? "सर्वोत्तम महीने" : "Best Months", value: place.bestTimeToVisit.months },
                                                    { label: language === "hi" ? "मौसम" : "Season", value: place.bestTimeToVisit.season },
                                                    { label: language === "hi" ? "मौसम जानकारी" : "Weather", value: place.bestTimeToVisit.weather },
                                                    { label: language === "hi" ? "महत्वपूर्ण टिप" : "Pro Tip", value: place.bestTimeToVisit.tip },
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

                                        {/* Photography Rules */}
                                        {place.photography && (
                                            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-2xl p-6">
                                                <h2 className="font-bold text-yellow-800 dark:text-yellow-405 mb-3 text-lg flex items-center gap-2">
                                                    📸 {t.photography}
                                                </h2>
                                                <p className="text-sm text-yellow-950/80 dark:text-yellow-300/80 leading-relaxed">
                                                    {place.photography}
                                                </p>
                                            </div>
                                        )}
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
                                                📍 {language === "hi" ? "आसपास के स्थल" : "Nearby Places"}
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

                                        {/* Related Places */}
                                        {place.relatedPlaces && place.relatedPlaces.length > 0 && (
                                            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mt-6">
                                                <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">
                                                    🔗 {t.relatedPlaces}
                                                </h2>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {place.relatedPlaces.map((rp) => {
                                                        const matchedPlace = activePlaces.find(
                                                            (p: any) => p.name.toLowerCase() === rp.toLowerCase() ||
                                                                (language === "hi" && p.name === rp)
                                                        );

                                                        if (matchedPlace) {
                                                            return (
                                                                <Link
                                                                    key={rp}
                                                                    href={`/places/${matchedPlace.slug}`}
                                                                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all border border-transparent hover:border-yellow-200"
                                                                >
                                                                    <span className="text-lg">🏛️</span>
                                                                    <span className="text-gray-800 dark:text-gray-200 text-sm font-semibold hover:text-yellow-600 transition-colors">
                                                                        {rp}
                                                                    </span>
                                                                </Link>
                                                            );
                                                        }

                                                        return (
                                                            <div
                                                                key={rp}
                                                                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
                                                            >
                                                                <span className="text-lg">🏛️</span>
                                                                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                                                                    {rp}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {/* FAQs Tab */}
                                {activeTab === "faqs" && place.faqs && place.faqs.length > 0 && (
                                    <motion.div
                                        key="faqs"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-4"
                                    >
                                        <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-6 text-xl">
                                            🙋 {t.faqs}
                                        </h2>
                                        <div className="space-y-4">
                                            {place.faqs.map((faq, i) => (
                                                <FAQItem key={i} question={faq.question} answer={faq.answer} />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Right Sidebar */}
                        <div>
                            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
                                <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-5 text-lg">
                                    Quick Info
                                </h2>

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
                {/* SEO Interlinks — Explore More */}
                <ExploreMoreSection currentPage="places" language={language} />
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