"use client";
import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import {
    Search,
    MapPin,
    Clock,
    ArrowRight,
    Heart,
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
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 220, damping: 26 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 220, damping: 26 });

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
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.22 } },
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
        <div className="relative isolate min-h-screen pb-24">

            {/* ══ HERO ══════════════════════════════════════════════════════ */}
            <PageHero
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/1280px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg"
                imageAlt="Rajasthan Bazaars"
                eyebrow="Royal Shopping Experience"
                title={
                    <>
                        Bazaars &amp; Treasures of <em>Rajasthan</em>
                    </>
                }
                subtitle={
                    <>
                        Discover hand block-printed textiles, precious jewelry, blue pottery, spices &amp; authentic
                        local crafts in the famous markets of the Land of Kings.
                    </>
                }
                breadcrumbs={[
                    { label: language === "hi" ? "होम" : "Home", href: "/" },
                    { label: language === "hi" ? "शॉपिंग" : "Shopping" },
                ]}
            >
                <div className="max-w-3xl space-y-4">
                    {/* Search + district dropdown */}
                    <div className="glass-dark flex flex-col gap-2 rounded-[1.75rem] p-2 sm:flex-row sm:items-center sm:rounded-full">
                        <div className="relative flex flex-1 items-center px-4 py-2.5">
                            <Search className="text-gold-300 flex-shrink-0 mr-3" size={17} />
                            <input
                                type="text"
                                placeholder="Search markets, cities, items…"
                                value={search}
                                onChange={(e) => setSearchWithReset(e.target.value)}
                                className="w-full bg-transparent border-none outline-none text-ivory-50 placeholder:text-ivory-100/45 text-sm font-medium"
                            />
                            <AnimatePresence>
                                {search && (
                                    <motion.button
                                        type="button"
                                        aria-label="Clear search"
                                        initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
                                        onClick={() => setSearch("")}
                                        className="ml-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 transition-colors flex-shrink-0"
                                    >
                                        <X size={12} className="text-ivory-50" />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* All-districts dropdown */}
                        <div className="relative flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2.5 sm:min-w-[210px] transition-colors hover:border-gold-300/50">
                            <MapPin size={14} className="text-gold-300 flex-shrink-0 mr-2" />
                            <select
                                value={selectedDistrict}
                                onChange={(e) => setDistrictWithReset(e.target.value)}
                                aria-label="District"
                                className="w-full bg-transparent border-none outline-none text-ivory-50 text-sm font-medium appearance-none cursor-pointer"
                                style={{ WebkitAppearance: "none" }}
                            >
                                <option value="All" className="bg-ink-900 text-ivory-50">All Districts</option>
                                {districtOptions.map((d) => (
                                    <option key={d.slug} value={d.district} className="bg-ink-900 text-ivory-50">
                                        {d.district}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="flex-shrink-0 ml-1 text-ivory-100/60 pointer-events-none" />
                        </div>
                    </div>

                    {/* District chips */}
                    <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {popularDistricts.map((dist) => {
                            const isActive = selectedDistrict === dist;
                            return (
                                <motion.button
                                    key={dist}
                                    type="button"
                                    whileTap={{ scale: 0.95 }}
                                    aria-pressed={isActive}
                                    onClick={() => setDistrictWithReset(dist)}
                                    className={`chip flex-shrink-0 ${isActive
                                        ? "bg-gold-400 text-ink-900 shadow-gold"
                                        : "glass-dark text-ivory-100/85 hover:bg-white/20 hover:text-ivory-50"
                                        }`}
                                >
                                    {dist}
                                </motion.button>
                            );
                        })}
                        <AnimatePresence>
                            {hasFilter && (
                                <motion.button
                                    type="button"
                                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={clearFilters}
                                    className="chip flex-shrink-0 border border-maroon-300/40 bg-maroon-500/40 text-maroon-100 backdrop-blur-md hover:bg-maroon-500/60"
                                >
                                    <X size={11} /> Clear
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </PageHero>

            {/* ══ GRID SECTION ══════════════════════════════════════════════ */}
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 md:mt-20">
                {/* Ambient light */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute -top-20 -left-40 h-[30rem] w-[30rem] rounded-full bg-gold-500/10 blur-[150px]" />
                    <div className="absolute top-1/2 -right-40 h-[30rem] w-[30rem] rounded-full bg-maroon-500/10 blur-[150px]" />
                </div>

                {/* Count row */}
                <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
                    <div>
                        <span className="eyebrow">{language === "hi" ? "बाज़ार" : "The bazaars"}</span>
                        <h2 className="mt-4 display-title text-4xl sm:text-5xl">
                            {language === "hi" ? <>शाही <em className="italic font-normal text-gold-sheen">बाज़ार</em></> : <>Markets worth the <em className="italic font-normal text-gold-sheen">detour</em></>}
                        </h2>
                    </div>
                    <p className="text-sm text-ink-500 dark:text-ivory-200/60">
                        Showing{" "}
                        <strong className="text-ink-900 dark:text-ivory-50 font-semibold">{Math.min(visibleCount, filteredPlaces.length)}</strong>
                        {" "}of{" "}
                        <strong className="text-ink-900 dark:text-ivory-50 font-semibold">{filteredPlaces.length}</strong>
                        {" "}shopping places
                        {selectedDistrict !== "All" && (
                            <span className="text-gold-700 dark:text-gold-400 font-semibold"> · {selectedDistrict}</span>
                        )}
                    </p>
                </Reveal>

                {/* Empty state */}
                {filteredPlaces.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="glass rounded-[2rem] px-6 py-20 text-center"
                    >
                        <div className="text-gold-700 dark:text-gold-400 mb-5 inline-flex p-5 bg-gold-500/10 rounded-full">
                            <ShoppingBag size={40} />
                        </div>
                        <h2 className="font-display text-3xl font-medium text-ink-900 dark:text-ivory-50 mb-2">No Markets Found</h2>
                        <p className="text-ink-500 dark:text-ivory-200/60 max-w-md mx-auto text-sm leading-relaxed">
                            No shopping places match your current filters. Try resetting or different keywords.
                        </p>
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="btn-primary mt-7"
                        >
                            Reset Filters
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants} initial="hidden" animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6"
                    >
                        <AnimatePresence initial={false}>
                            {visiblePlaces.map((place) => {
                                const isFav = favorites.includes(place.id);
                                return (
                                    <motion.div key={place.id} variants={cardVariants} exit="exit">
                                        <TiltCard className="group h-full">
                                            <div className="glass h-full rounded-[1.75rem] overflow-hidden flex flex-col transition-shadow duration-500 ease-lux hover:shadow-float-lg">

                                                {/* ── Image ── */}
                                                <div className="relative h-60 m-2 mb-0 overflow-hidden rounded-[1.4rem] flex-shrink-0 bg-ink-900">
                                                    <Image
                                                        src={place.image} alt={place.name}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                                        className="object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 scrim-b opacity-70" />

                                                    {/* Favourite */}
                                                    <motion.button
                                                        type="button"
                                                        whileTap={{ scale: 0.82 }}
                                                        aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
                                                        aria-pressed={isFav}
                                                        onClick={(e) => { e.stopPropagation(); toggleFavorite(place.id); }}
                                                        className="glass-dark absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/25"
                                                    >
                                                        <Heart size={15} className={isFav ? "text-maroon-300 fill-maroon-300" : "text-ivory-50"} />
                                                    </motion.button>

                                                    {/* Type badge */}
                                                    <div className="glass-dark absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-300">
                                                        {place.type}
                                                    </div>

                                                    {/* Photo is not of this exact market */}
                                                    {place.imageRepresentative && (
                                                        <div className="glass-dark absolute bottom-3 right-3 text-ivory-100/90 text-[9px] font-semibold px-2.5 py-0.5 rounded-full">
                                                            {language === "hi" ? "प्रतीकात्मक चित्र" : "Representative photo"}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* ── Content ── */}
                                                <div className="p-5 md:p-6 flex-grow flex flex-col justify-between">
                                                    <div>
                                                        {/* District */}
                                                        <div className="flex items-center gap-1.5 text-[11px] mb-2 font-semibold uppercase tracking-[0.18em] text-ink-400 dark:text-ivory-200/50">
                                                            <MapPin size={11} className="text-gold-600 dark:text-gold-400" />
                                                            <span>{place.district}</span>
                                                        </div>

                                                        {/* Name */}
                                                        <h2 className="font-display text-2xl font-medium mb-2 leading-tight tracking-tight text-ink-900 dark:text-ivory-50 transition-colors duration-300 group-hover:text-gold-700 dark:group-hover:text-gold-300">
                                                            {place.name}
                                                        </h2>

                                                        {/* Description */}
                                                        <p className="text-sm line-clamp-2 leading-relaxed mb-4 text-ink-500 dark:text-ivory-200/65">
                                                            {place.description}
                                                        </p>

                                                        {/* Tags */}
                                                        <div className="flex flex-wrap gap-1.5 mb-5">
                                                            {place.famousFor.slice(0, 3).map((item, idx) => (
                                                                <span key={idx}
                                                                    className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-gold-500/25 bg-gold-500/5 text-ink-700 dark:text-ivory-100/80"
                                                                >
                                                                    {item}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* ── Footer ── */}
                                                    <div className="relative pt-4 flex justify-between items-center gap-3 text-xs">
                                                        <div className="hairline absolute top-0 inset-x-0" />
                                                        <div className="flex flex-col gap-1 text-ink-500 dark:text-ivory-200/60">
                                                            <span className="flex items-center gap-1.5">
                                                                <Tag size={11} className="text-gold-600 dark:text-gold-400" />
                                                                {place.priceRange.split("–")[0] || place.priceRange.split("-")[0]}
                                                            </span>
                                                            <span className="flex items-center gap-1.5">
                                                                <Clock size={11} className="text-gold-600 dark:text-gold-400" />
                                                                {place.timings.split("–")[0] || place.timings.split("-")[0]}
                                                            </span>
                                                        </div>
                                                        <Link
                                                            href={`/shopping/${place.slug}`}
                                                            className="btn-primary !px-4 !py-2 !text-xs group/details"
                                                        >
                                                            Details <ArrowRight size={13} className="transition-transform duration-500 ease-lux group-hover/details:translate-x-0.5" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </TiltCard>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* ── Load More button ── */}
                {hasMore && filteredPlaces.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="mt-14 flex flex-col items-center gap-4"
                    >
                        <p className="text-xs uppercase tracking-eyebrow font-semibold text-ink-400 dark:text-ivory-200/50">
                            Showing {visiblePlaces.length} of {filteredPlaces.length} places
                        </p>
                        <motion.button
                            type="button"
                            whileTap={{ scale: 0.97 }}
                            onClick={loadMore}
                            className="btn-glass"
                        >
                            <ShoppingBag size={16} className="text-gold-600 dark:text-gold-400" />
                            Load More Places
                            <span className="bg-gold-500/15 text-gold-700 dark:text-gold-300 px-2 py-0.5 rounded-full text-xs font-bold">
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
        <section className="relative mt-20 md:mt-28 pt-16 md:pt-24">
            <div className="hairline absolute top-0 inset-x-0" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <Reveal className="text-center mb-10 md:mb-12">
                    <span className="eyebrow">FAQ</span>
                    <h2 className="mt-4 display-title text-4xl md:text-5xl">
                        {title}
                    </h2>
                </Reveal>
                <RevealGroup className="space-y-3">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <motion.div
                                key={idx}
                                variants={revealItem}
                                className={`glass rounded-[1.5rem] overflow-hidden transition-shadow duration-500 ease-lux ${isOpen ? "shadow-float-lg" : ""}`}
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    aria-expanded={isOpen}
                                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left text-ink-900 dark:text-ivory-50 font-display text-lg md:text-xl font-medium transition-colors hover:text-gold-700 dark:hover:text-gold-300"
                                >
                                    <span>{faq.question}</span>
                                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-lux ${isOpen ? "rotate-180 border-gold-500/50 bg-gold-500/10 text-gold-700 dark:text-gold-300" : "border-ink-900/10 text-ink-400 dark:border-white/10 dark:text-ivory-200/60"}`}>
                                        <ChevronDown size={16} />
                                    </span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: EASE }}
                                        >
                                            <div className="px-6 pb-6 pt-1 text-ink-500 dark:text-ivory-200/70 text-sm md:text-base leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </RevealGroup>
            </div>
        </section>
    );
}
