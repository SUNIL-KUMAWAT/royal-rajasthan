"use client";
import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import {
    Search,
    MapPin,
    Clock,
    ArrowRight,
    Heart,
    Sparkles,
    ShoppingBag,
    Tag,
    X,
    ChevronDown,
} from "lucide-react";
import { SHOPPING_FAQS_ENGLISH, SHOPPING_FAQS_HINDI } from "@/constants/faqs";
import { useLanguage } from "@/components/LanguageProvider";
import { localizePath } from "@/lib/i18n";
import Link from "@/components/LocalizedLink";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { ShoppingCard } from "@/lib/shopping";

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 280, damping: 28 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 280, damping: 28 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    }, [x, y]);

    const handleMouseLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.22 } },
};

// ─── Main Component ───────────────────────────────────────────────────────────
interface Props {
    places: ShoppingCard[];
    placesHi: ShoppingCard[];
}

export default function ShoppingClient({ places: placesEn, placesHi }: Props) {
    const { language } = useLanguage();
    const router = useRouter();
    const allPlaces = language === "hi" ? placesHi : placesEn;
    const districtOptions = useMemo(() => {
        // (lucide's `Map` icon shadows the global Map in this file, so use a plain object)
        const seen: Record<string, string> = {};
        allPlaces.forEach((p) => { if (!(p.districtSlug in seen)) seen[p.districtSlug] = p.district; });
        return Object.entries(seen).map(([slug, district]) => ({ slug, district }));
    }, [allPlaces]);

    const [search, setSearch] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("All");
    const [favorites, setFavorites] = useState<string[]>([]);
    const [visibleCount, setVisibleCount] = useState(12);

    // Legacy deep links (/shopping?market=slug) now go to the market's own page
    useEffect(() => {
        const marketSlug = new URLSearchParams(window.location.search).get("market");
        if (marketSlug) router.replace(localizePath(`/shopping/${marketSlug}`, language));
    }, [router, language]);

    const popularDistricts = ["All", "Jaipur", "Udaipur", "Jodhpur", "Jaisalmer", "Bikaner", "Ajmer", "Pushkar"];

    const filteredPlaces = useMemo(() => {
        let places = allPlaces;
        if (search) {
            const q = search.toLowerCase();
            places = places.filter((p) =>
                p.name.toLowerCase().includes(q) ||
                (p.description && p.description.toLowerCase().includes(q)) ||
                p.famousFor.some((item) => item.toLowerCase().includes(q)) ||
                p.district.toLowerCase().includes(q)
            );
        }
        if (selectedDistrict !== "All") {
            places = places.filter((p) => p.district.toLowerCase() === selectedDistrict.toLowerCase());
        }
        return places;
    }, [search, selectedDistrict, allPlaces]);

    // Reset visible count whenever filters change
    const setSearchWithReset = (val: string) => { setSearch(val); setVisibleCount(12); };
    const setDistrictWithReset = (val: string) => { setSelectedDistrict(val); setVisibleCount(12); };

    const visiblePlaces = filteredPlaces.slice(0, visibleCount);
    const hasMore = visibleCount < filteredPlaces.length;
    const loadMore = () => setVisibleCount((prev) => prev + 12);

    const toggleFavorite = (id: string) =>
        setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);

    const hasFilter = selectedDistrict !== "All" || !!search;
    const clearFilters = () => { setSelectedDistrict("All"); setSearch(""); setVisibleCount(12); };

    return (
        /* ── Page wrapper: cream in light, near-black in dark ── */
        <div className="min-h-screen bg-amber-50/60 dark:bg-gray-950 transition-colors duration-300 pb-24">

            {/* ══ HERO ══════════════════════════════════════════════════════ */}
            {/* Hero is always dark (image backdrop) regardless of theme */}
            <section className="relative min-h-[580px] flex items-center justify-center overflow-hidden text-white pt-24 pb-12">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/1280px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg"
                        alt="Rajasthan Bazaars"
                        fill
                        className="w-full h-full object-cover opacity-45 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/75 to-slate-950/95" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,rgba(251,191,36,0.1),transparent)]" />
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4 sm:px-6">
                    {/* Badge */}
                    <motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-widest uppercase mb-5 backdrop-blur-sm">
                            <Sparkles size={13} className="animate-pulse" />
                            Royal Shopping Experience
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight"
                    >
                        Bazaars &amp; Treasures of{" "}
                        <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                            Rajasthan
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.3 }}
                        className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-light"
                    >
                        Discover hand block-printed textiles, precious jewelry, blue pottery, spices &amp; authentic
                        local crafts in the famous markets of the Land of Kings.
                    </motion.p>

                    {/* Search */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                        className="max-w-lg mx-auto mb-6"
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl group-focus-within:bg-amber-400/30 transition-all duration-500" />
                            <div className="relative flex items-center bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full px-5 py-3.5 focus-within:border-amber-400/50 transition-all duration-300">
                                <Search className="text-amber-400 flex-shrink-0 mr-3" size={17} />
                                <input
                                    type="text"
                                    placeholder="Search markets, cities, items…"
                                    value={search}
                                    onChange={(e) => setSearchWithReset(e.target.value)}
                                    className="w-full bg-transparent border-none outline-none text-white placeholder-white/45 text-sm font-medium"
                                />
                                <AnimatePresence>
                                    {search && (
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
                                            onClick={() => setSearch("")}
                                            className="ml-2 w-6 h-6 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 transition-colors flex-shrink-0"
                                        >
                                            <X size={12} className="text-white" />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                    {/* District chips */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.6 }}
                    >
                        <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 scrollbar-none justify-start sm:justify-center px-1">
                            {popularDistricts.map((dist) => {
                                const isActive = selectedDistrict === dist;
                                return (
                                    <motion.button
                                        key={dist}
                                        whileTap={{ scale: 0.93 }}
                                        onClick={() => setDistrictWithReset(dist)}
                                        className={`relative flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${isActive
                                            ? "bg-amber-500 text-white shadow-lg shadow-amber-500/35"
                                            : "bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:bg-white/18 hover:text-white"
                                            }`}
                                    >
                                        {dist}
                                    </motion.button>
                                );
                            })}
                            <AnimatePresence>
                                {hasFilter && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                                        onClick={clearFilters}
                                        className="flex-shrink-0 px-3 py-2 rounded-full text-xs font-semibold bg-red-500/20 border border-red-400/30 text-red-300 hover:bg-red-500/35 transition-all flex items-center gap-1"
                                    >
                                        <X size={10} /> Clear
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* All-districts dropdown */}
                        <div className="mt-4 flex justify-center">
                            <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 min-w-[200px] hover:border-amber-400/40 transition-colors">
                                <MapPin size={13} className="text-amber-400 flex-shrink-0 mr-2" />
                                <select
                                    value={selectedDistrict}
                                    onChange={(e) => setDistrictWithReset(e.target.value)}
                                    className="w-full bg-transparent border-none outline-none text-white text-xs sm:text-sm font-medium appearance-none cursor-pointer"
                                    style={{ WebkitAppearance: "none" }}
                                >
                                    <option value="All" className="bg-gray-900 text-white">All Districts</option>
                                    {districtOptions.map((d) => (
                                        <option key={d.slug} value={d.district} className="bg-gray-900 pl-3  text-white">
                                            {d.district}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={12} className="flex-shrink-0 ml-1 text-white/50 pointer-events-none" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══ GRID SECTION ══════════════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">

                {/* Count row */}
                <div className="flex items-center justify-between mb-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Showing{" "}
                        <strong className="text-gray-800 dark:text-gray-100 font-bold">{Math.min(visibleCount, filteredPlaces.length)}</strong>
                        {" "}of{" "}
                        <strong className="text-gray-800 dark:text-gray-100 font-bold">{filteredPlaces.length}</strong>
                        {" "}shopping places
                        {selectedDistrict !== "All" && (
                            <span className="text-amber-600 dark:text-amber-400 font-semibold"> · {selectedDistrict}</span>
                        )}
                    </p>
                </div>

                {/* Empty state */}
                {filteredPlaces.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        /* Light: white card. Dark: subtle glass */
                        className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-20 text-center shadow-sm dark:shadow-none"
                    >
                        <div className="text-amber-500 dark:text-amber-400 mb-4 inline-block p-5 bg-amber-50 dark:bg-amber-500/10 rounded-full">
                            <ShoppingBag size={44} />
                        </div>
                        <h2 className="font-playfair text-2xl font-bold text-gray-800 dark:text-white mb-2">No Markets Found</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
                            No shopping places match your current filters. Try resetting or different keywords.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="mt-6 px-6 py-2.5 bg-amber-500 text-white rounded-full text-sm font-semibold hover:bg-amber-600 transition-colors"
                        >
                            Reset Filters
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants} initial="hidden" animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    >
                        <AnimatePresence initial={false}>
                            {visiblePlaces.map((place) => (
                                <motion.div key={place.id} variants={cardVariants} exit="exit">
                                    <TiltCard className="group h-full">
                                        {/*
                                         * LIGHT: white card, gray-100 border, light shadow
                                         * DARK:  near-transparent glass card
                                         */}
                                        <div className="h-full bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 rounded-3xl overflow-hidden shadow-md hover:shadow-xl dark:shadow-none hover:border-amber-300 dark:hover:border-amber-500/40 transition-all duration-300 flex flex-col">

                                            {/* ── Image ── */}
                                            <div className="relative h-52 overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={place.image} alt={place.name}
                                                    fill
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                                                {/* Favourite */}
                                                <motion.button
                                                    whileTap={{ scale: 0.82 }}
                                                    onClick={(e) => { e.stopPropagation(); toggleFavorite(place.id); }}
                                                    className="absolute top-3 left-3 w-8 h-8 bg-black/30 backdrop-blur-md hover:bg-black/55 rounded-full flex items-center justify-center transition-all"
                                                >
                                                    <Heart size={14} className={favorites.includes(place.id) ? "text-red-400 fill-red-400" : "text-white"} />
                                                </motion.button>

                                                {/* Type badge */}
                                                <div className="absolute bottom-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-extrabold tracking-wide uppercase px-2.5 py-1 rounded-full shadow">
                                                    {place.type}
                                                </div>

                                                {/* Photo is not of this exact market */}
                                                {place.imageRepresentative && (
                                                    <div className="absolute bottom-3 right-3 bg-black/55 backdrop-blur-sm text-white/90 text-[9px] font-semibold px-2 py-0.5 rounded-full">
                                                        {language === "hi" ? "प्रतीकात्मक चित्र" : "Representative photo"}
                                                    </div>
                                                )}
                                            </div>

                                            {/* ── Content ── */}
                                            <div className="p-5 flex-grow flex flex-col justify-between">
                                                <div>
                                                    {/* District */}
                                                    <div className="flex items-center gap-1 text-xs mb-1.5 font-semibold text-gray-400 dark:text-gray-500">
                                                        <MapPin size={11} className="text-amber-500 dark:text-amber-400" />
                                                        <span>{place.district}</span>
                                                    </div>

                                                    {/* Name */}
                                                    <h2 className="font-playfair text-lg font-bold mb-2 leading-snug
                                                        text-gray-900 dark:text-white
                                                        group-hover:text-amber-600 dark:group-hover:text-amber-300
                                                        transition-colors duration-300">
                                                        {place.name}
                                                    </h2>

                                                    {/* Description */}
                                                    <p className="text-xs line-clamp-2 leading-relaxed mb-4 text-gray-500 dark:text-gray-400">
                                                        {place.description}
                                                    </p>

                                                    {/* Tags */}
                                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                                        {place.famousFor.slice(0, 3).map((item, idx) => (
                                                            <span key={idx}
                                                                className="px-2 py-0.5 rounded-full text-[10px] font-medium
                                                                    bg-amber-50 text-amber-700 border border-amber-200
                                                                    dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/15"
                                                            >
                                                                {item}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* ── Footer ── */}
                                                <div className="pt-4 border-t border-gray-100 dark:border-gray-700/50 flex justify-between items-center text-xs">
                                                    <div className="flex flex-col gap-0.5 text-gray-400 dark:text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <Tag size={11} className="text-amber-500 dark:text-amber-400" />
                                                            {place.priceRange.split("–")[0] || place.priceRange.split("-")[0]}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock size={11} />
                                                            {place.timings.split("–")[0] || place.timings.split("-")[0]}
                                                        </span>
                                                    </div>
                                                    <Link
                                                        href={`/shopping/${place.slug}`}
                                                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold text-xs transition-all duration-250
                                                            bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-500 hover:text-white hover:border-amber-500
                                                            dark:bg-amber-500/10 dark:text-amber-400 dark:border-transparent dark:hover:bg-amber-500 dark:hover:text-white"
                                                    >
                                                        Details <ArrowRight size={12} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* ── Load More button ── */}
                {hasMore && filteredPlaces.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12 flex flex-col items-center gap-3"
                    >
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                            Showing {visiblePlaces.length} of {filteredPlaces.length} places
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={loadMore}
                            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300
                                bg-white dark:bg-gray-800 border-2 border-amber-400 dark:border-amber-500
                                text-amber-600 dark:text-amber-400
                                hover:bg-amber-500 hover:text-white hover:border-amber-500
                                dark:hover:bg-amber-500 dark:hover:text-white
                                shadow-md hover:shadow-amber-400/30 dark:shadow-none"
                        >
                            <ShoppingBag size={16} />
                            Load More Places
                            <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full text-xs font-bold">
                                +{Math.min(12, filteredPlaces.length - visibleCount)} more
                            </span>
                        </motion.button>
                    </motion.div>
                )}
            </section>

            {/* Visual FAQ Section */}
            <FAQSection 
                faqs={language === "hi" ? SHOPPING_FAQS_HINDI : SHOPPING_FAQS_ENGLISH} 
                title={language === "hi" ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"} 
            />

            {/* Dynamic JSON-LD FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": (language === "hi" ? SHOPPING_FAQS_HINDI : SHOPPING_FAQS_ENGLISH).map(faq => ({
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
        </div>
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