"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@/components/LocalizedLink";
import { ArrowUpRight, Search, X } from "lucide-react";
import { CATEGORIES, CATEGORIES_HINDI } from "@/constants/ui";
import { useLanguage } from "@/components/LanguageProvider";
import type { PlaceCard as PlaceCardData } from "@/lib/places";
import { isOpenAt } from "@/lib/openStatus";
import { useFavorites, useNow } from "@/lib/useClientHooks";
import { PlaceCard } from "@/components/ui/PlaceCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const PAGE_SIZE = 8;
const ALL = CATEGORIES[0];

// Hindi data uses a few extra category spellings
const CATEGORY_ALIASES: Record<string, string[]> = {
    Palace: ["महल"],
    Spiritual: ["धार्मिक स्थल"],
};

const T = {
    en: {
        eyebrow: "Curated places",
        titleA: "Places worth the",
        titleB: "journey",
        subtitle: "Forts carved into cliffs, palaces afloat on lakes, temples of marble lace — the essential Rajasthan, hand-picked.",
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
        removeFavGeneric: "Remove from favorites",
        addFavGeneric: "Add to favorites",
    },
    hi: {
        eyebrow: "चुनिंदा स्थान",
        titleA: "यात्रा के लायक",
        titleB: "स्थान",
        subtitle: "पहाड़ियों पर बने किले, झीलों पर तैरते महल, संगमरमर के मंदिर — राजस्थान की सबसे ख़ास जगहें, आपके लिए चुनी हुई।",
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
        removeFavGeneric: "पसंदीदा से हटाएं",
        addFavGeneric: "पसंदीदा में जोड़ें",
    },
};

export function FeaturedPlaces({ places, placesHi }: { places: PlaceCardData[]; placesHi: PlaceCardData[] }) {
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

    const cardText = {
        free: t.free,
        openNow: t.openNow,
        closed: t.closed,
        addFav: t.addFavGeneric,
        removeFav: t.removeFavGeneric,
        viewDetails: t.details,
    };

    const resetFilters = () => {
        setActiveFilter(ALL);
        setSearchQuery("");
        setVisibleCount(PAGE_SIZE);
    };

    return (
        <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow={t.eyebrow}
                    title={
                        <>
                            {t.titleA} <em>{t.titleB}</em>
                        </>
                    }
                    subtitle={t.subtitle}
                    action={
                        <Link href="/places" className="btn-glass">
                            {t.viewAll(places.length)}
                            <ArrowUpRight size={16} />
                        </Link>
                    }
                />

                {/* Search + categories */}
                <Reveal className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center">
                    <label className="relative flex h-12 w-full items-center rounded-full glass lg:max-w-sm">
                        <Search size={17} className="pointer-events-none absolute left-4 text-ink-400 dark:text-ivory-200/60" />
                        <input
                            className="h-full w-full rounded-full bg-transparent pl-11 pr-10 text-sm text-ink-900 outline-none placeholder:text-ink-400 dark:text-ivory-50 dark:placeholder:text-ivory-200/50 [&::-webkit-search-cancel-button]:hidden"
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
                                className="absolute right-2 grid h-8 w-8 place-items-center rounded-full text-ink-400 hover:bg-ink-900/5 dark:hover:bg-white/10"
                            >
                                <X size={15} />
                            </button>
                        )}
                    </label>

                    <div
                        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-hide lg:mx-0 lg:flex-wrap lg:px-0"
                        role="group"
                        aria-label={t.categories}
                    >
                        {CATEGORIES.map((cat, i) => {
                            const isActive = activeFilter === cat;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() => {
                                        setActiveFilter(cat);
                                        setVisibleCount(PAGE_SIZE);
                                    }}
                                    className={`relative ${isActive ? "chip text-ivory-50 dark:text-ink-900" : "chip-idle"}`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="featured-cat"
                                            className="absolute inset-0 -z-10 rounded-full bg-ink-900 shadow-float dark:bg-gold-400"
                                            transition={{ type: "spring", stiffness: 420, damping: 34 }}
                                        />
                                    )}
                                    {isHi ? CATEGORIES_HINDI[i] : cat}
                                </button>
                            );
                        })}
                    </div>
                </Reveal>

                {/* Bento grid: first result is a large feature tile */}
                <motion.div layout className="grid auto-rows-auto grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <AnimatePresence mode="popLayout">
                        {visiblePlaces.map((place, i) => {
                            const feature = i === 0;
                            return (
                                <motion.div
                                    key={place.id}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: Math.min(i, 6) * 0.05 }}
                                    className={feature ? "sm:col-span-2 lg:row-span-2" : ""}
                                >
                                    <PlaceCard
                                        place={place}
                                        t={cardText}
                                        variant={feature ? "feature" : "card"}
                                        isOpen={isOpenAt(place.timing, now, place.isOpen)}
                                        isFavorite={isFavorite(place.id)}
                                        onToggleFavorite={() => toggleFavorite(place.id)}
                                        sizes={feature ? "(min-width: 1024px) 50vw, 100vw" : undefined}
                                        className={feature ? "min-h-[26rem] lg:min-h-full" : ""}
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {filtered.length === 0 && (
                    <div className="mx-auto max-w-md rounded-[2rem] glass p-10 text-center">
                        <p className="font-display text-2xl text-ink-900 dark:text-ivory-50">{t.noResults}</p>
                        <button type="button" onClick={resetFilters} className="btn-primary mt-6">
                            {t.reset}
                        </button>
                    </div>
                )}

                <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
                    {visibleCount < filtered.length && (
                        <button
                            type="button"
                            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                            className="btn-glass"
                        >
                            {t.more}
                        </button>
                    )}
                    <Link href="/places" className="btn-primary">
                        {t.viewAll(places.length)}
                        <ArrowUpRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
