"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@/components/LocalizedLink";
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
    SlidersHorizontal,
    X,
    ChevronDown,
    Hourglass,
} from "lucide-react";
import type { PlaceCard } from "@/lib/places";
import { CATEGORIES, CITIES, CATEGORIES_HINDI, CITIES_HINDI } from "@/constants/ui";
import { PLACES_FAQS_ENGLISH, PLACES_FAQS_HINDI } from "@/constants/faqs";
import { useLanguage } from "@/components/LanguageProvider";
import { ExploreMoreSection } from "@/components/shared/ExploreMoreSection";
import { isOpenAt } from "@/lib/openStatus";
import { useFavorites, useNow } from "@/lib/useClientHooks";

// ============ CONSTANTS ============
// Filter state always stores the English key (e.g. "Fort", "Jaipur") so it
// survives language switches and stays usable in URLs. Labels are looked up per language.
const ALL_CATEGORY = CATEGORIES[0];
const ALL_CITY = CITIES[0];
const PAGE_SIZE = 12;

// Extra Hindi category spellings used in the Hindi data set
const CATEGORY_ALIASES: Record<string, string[]> = {
    Palace: ["महल"],
    Spiritual: ["धार्मिक स्थल"],
};

const SORT_OPTIONS = [
    { value: "featured", en: "Featured First", hi: "विशेष पहले" },
    { value: "rating", en: "Highest Rated", hi: "सर्वोच्च रेटिंग" },
    { value: "reviews", en: "Most Reviewed", hi: "सबसे अधिक समीक्षाएं" },
    { value: "name-az", en: "Name A-Z", hi: "नाम A-Z" },
    { value: "name-za", en: "Name Z-A", hi: "नाम Z-A" },
    { value: "price-low", en: "Price: Low to High", hi: "कीमत: कम से ज़्यादा" },
    { value: "price-high", en: "Price: High to Low", hi: "कीमत: ज़्यादा से कम" },
] as const;
const SORT_VALUES: string[] = SORT_OPTIONS.map((o) => o.value);

const ENTRY_OPTIONS = [
    { value: "All", en: "All Entry Types", hi: "सभी प्रकार" },
    { value: "Free", en: "Free Entry", hi: "निःशुल्क प्रवेश" },
    { value: "Paid", en: "Paid Entry", hi: "सशुल्क प्रवेश" },
] as const;

const T = {
    en: {
        explore: "Explore",
        places: "Places",
        discover: (n: number) => `Discover ${n} famous places across Rajasthan`,
        searchPlaceholder: "Search places, cities, categories...",
        clearSearch: "Clear search",
        filters: "Filters",
        clear: "Clear",
        clearAll: "Clear All Filters",
        showResults: (n: number) => `Show ${n} places`,
        placesCount: (n: number) => `${n} places`,
        showing: "Showing",
        of: (n: number) => `of ${n} places`,
        forQuery: "for",
        free: "Free",
        freeEntry: "Free Entry",
        openNow: "Open Now",
        closed: "Closed",
        est: "Est.",
        viewDetails: "View Details",
        noResults: "No places found",
        noResultsHint: "Try adjusting your search or filters",
        goHome: "Go to Home",
        category: "Category",
        city: "City",
        entry: "Entry",
        sortBy: "Sort by",
        addFav: "Add to favorites",
        removeFav: "Remove from favorites",
        showingOf: (a: number, b: number) => `Showing ${a} of ${b} places`,
        loadMore: "Load More Places",
        more: (n: number) => `+${n} more`,
        faqTitle: "Frequently Asked Questions",
    },
    hi: {
        explore: "जानें",
        places: "पर्यटन स्थल",
        discover: (n: number) => `राजस्थान के ${n} प्रसिद्ध स्थानों की खोज करें`,
        searchPlaceholder: "स्थान, शहर, श्रेणी खोजें...",
        clearSearch: "खोज साफ़ करें",
        filters: "फ़िल्टर",
        clear: "साफ़ करें",
        clearAll: "सभी फ़िल्टर हटाएं",
        showResults: (n: number) => `${n} स्थान देखें`,
        placesCount: (n: number) => `${n} स्थान`,
        showing: "दिखाए जा रहे हैं",
        of: (n: number) => `/ ${n} स्थान`,
        forQuery: "खोज",
        free: "निःशुल्क",
        freeEntry: "निःशुल्क प्रवेश",
        openNow: "अभी खुला है",
        closed: "बंद है",
        est: "स्थापना",
        viewDetails: "विवरण देखें",
        noResults: "कोई स्थान नहीं मिला",
        noResultsHint: "अपनी खोज या फ़िल्टर बदलकर देखें",
        goHome: "होम पर जाएं",
        category: "श्रेणी",
        city: "शहर",
        entry: "प्रवेश",
        sortBy: "क्रमबद्ध करें",
        addFav: "पसंदीदा में जोड़ें",
        removeFav: "पसंदीदा से हटाएं",
        showingOf: (a: number, b: number) => `${b} स्थानों में से ${a} दिखाई दे रहे हैं`,
        loadMore: "और स्थान लोड करें",
        more: (n: number) => `+${n} और`,
        faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    },
};

const selectClass =
    "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 cursor-pointer";

// ============ MAIN COMPONENT ============
export function PlacesClient({ places, placesHi }: { places: PlaceCard[]; placesHi: PlaceCard[] }) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<string>(ALL_CATEGORY);
    const [city, setCity] = useState<string>(ALL_CITY);
    const [sortBy, setSortBy] = useState("featured");
    const [entryType, setEntryType] = useState("All");
    const [showFilters, setShowFilters] = useState(false);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const { isFavorite, toggleFavorite } = useFavorites();
    const now = useNow();
    const hydrated = useRef(false);

    const { language } = useLanguage();
    const isHi = language === "hi";
    const t = isHi ? T.hi : T.en;

    // Read initial filters from the URL (client only)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlCity = params.get("city");
        const urlCategory = params.get("category");
        const urlSearch = params.get("search");
        const urlEntry = params.get("entry");
        const urlSort = params.get("sort");

        if (urlCity) {
            const idx = Math.max(
                CITIES.findIndex((c) => c.toLowerCase() === urlCity.toLowerCase()),
                CITIES_HINDI.indexOf(urlCity)
            );
            setCity(idx >= 0 ? CITIES[idx] : urlCity);
        }
        if (urlCategory) {
            const idx = Math.max(
                CATEGORIES.findIndex((c) => c.toLowerCase() === urlCategory.toLowerCase()),
                CATEGORIES_HINDI.indexOf(urlCategory)
            );
            if (idx >= 0) setCategory(CATEGORIES[idx]);
        }
        if (urlSearch) setSearch(urlSearch);
        if (urlEntry === "Free" || urlEntry === "Paid") setEntryType(urlEntry);
        if (urlSort && SORT_VALUES.includes(urlSort)) setSortBy(urlSort);

        hydrated.current = true;
    }, []);

    // Keep URL in sync with filters so the view is shareable
    useEffect(() => {
        if (!hydrated.current) return;
        const params = new URLSearchParams(window.location.search);
        const setParam = (key: string, value: string, def: string) =>
            value && value !== def ? params.set(key, value) : params.delete(key);
        setParam("search", search.trim(), "");
        setParam("category", category, ALL_CATEGORY);
        setParam("city", city, ALL_CITY);
        setParam("entry", entryType, "All");
        setParam("sort", sortBy, "featured");
        const qs = params.toString();
        const url = `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`;
        window.history.replaceState(window.history.state, "", url);
    }, [search, category, city, entryType, sortBy]);

    // Reset pagination when any filter changes
    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [search, category, city, sortBy, entryType]);

    // Lock body scroll while the mobile filter sheet is open
    useEffect(() => {
        if (!showFilters) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowFilters(false);
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [showFilters]);

    const activePlaces = isHi ? placesHi : places;
    const categoryLabel = (key: string) => {
        const idx = CATEGORIES.indexOf(key);
        return isHi && idx >= 0 ? CATEGORIES_HINDI[idx] : key;
    };
    const cityLabel = (key: string) => {
        const idx = CITIES.indexOf(key);
        return isHi && idx >= 0 ? CITIES_HINDI[idx] : key;
    };
    const entryLabel = (v: string) => {
        const o = ENTRY_OPTIONS.find((e) => e.value === v);
        return o ? (isHi ? o.hi : o.en) : v;
    };

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        const catIdx = CATEGORIES.indexOf(category);
        const catNames = [
            category,
            catIdx >= 0 ? CATEGORIES_HINDI[catIdx] : "",
            ...(CATEGORY_ALIASES[category] ?? []),
        ]
            .filter(Boolean)
            .map((c) => c.toLowerCase());
        const cityIdx = CITIES.indexOf(city);
        const cityNames = [city, cityIdx >= 0 ? CITIES_HINDI[cityIdx] : ""].filter(Boolean);

        return activePlaces
            .filter((p) => {
                const matchSearch =
                    !q ||
                    p.name?.toLowerCase().includes(q) ||
                    p.city?.toLowerCase().includes(q) ||
                    p.category?.toLowerCase().includes(q) ||
                    p.description?.toLowerCase().includes(q) ||
                    p.tags?.some((tag) => tag.toLowerCase().includes(q));
                const matchCategory =
                    category === ALL_CATEGORY ||
                    (category === "UNESCO" && p.isUNESCO) ||
                    (!!p.category && catNames.includes(p.category.toLowerCase())) ||
                    !!p.tags?.some((tag) => catNames.includes(tag.toLowerCase()));
                const matchCity = city === ALL_CITY || cityNames.includes(p.city);
                const matchEntry =
                    entryType === "All" ||
                    (entryType === "Free" && p.ticket.isFree) ||
                    (entryType === "Paid" && !p.ticket.isFree);
                return matchSearch && matchCategory && matchCity && matchEntry;
            })
            .sort((a, b) => {
                if (sortBy === "rating") return b.rating - a.rating;
                if (sortBy === "name-az") return a.name.localeCompare(b.name);
                if (sortBy === "name-za") return b.name.localeCompare(a.name);
                if (sortBy === "price-low") return a.ticket.indian - b.ticket.indian;
                if (sortBy === "price-high") return b.ticket.indian - a.ticket.indian;
                if (sortBy === "reviews") return b.reviews - a.reviews;
                return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
            });
    }, [activePlaces, search, category, city, sortBy, entryType]);

    const visiblePlaces = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);

    const clearFilters = () => {
        setSearch("");
        setCategory(ALL_CATEGORY);
        setCity(ALL_CITY);
        setSortBy("featured");
        setEntryType("All");
    };

    const activeFilterCount = [
        category !== ALL_CATEGORY,
        city !== ALL_CITY,
        entryType !== "All",
        search !== "",
    ].filter(Boolean).length;

    // ---- Reusable filter controls ----
    const categoryChips = (mobile: boolean) =>
        CATEGORIES.map((cat) => {
            const active = category === cat;
            return (
                <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    aria-pressed={active}
                    className={`shrink-0 whitespace-nowrap rounded-full font-medium transition-all ${
                        mobile ? "px-3.5 py-2 text-sm" : "px-4 py-2 text-xs"
                    } ${
                        active
                            ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md"
                            : "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-yellow-400 hover:text-yellow-600"
                    }`}
                >
                    {categoryLabel(cat)}
                </button>
            );
        });

    const citySelect = (extra = "") => (
        <select
            aria-label={t.city}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`${selectClass} ${extra}`}
        >
            {CITIES.map((c) => (
                <option key={c} value={c}>
                    {cityLabel(c)}
                </option>
            ))}
        </select>
    );

    const entrySelect = (extra = "") => (
        <select
            aria-label={t.entry}
            value={entryType}
            onChange={(e) => setEntryType(e.target.value)}
            className={`${selectClass} ${extra}`}
        >
            {ENTRY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                    {isHi ? o.hi : o.en}
                </option>
            ))}
        </select>
    );

    const sortSelect = (extra = "") => (
        <select
            aria-label={t.sortBy}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`${selectClass} ${extra}`}
        >
            {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                    {isHi ? o.hi : o.en}
                </option>
            ))}
        </select>
    );

    const activeFilterTags = activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
            {search && (
                <FilterTag color="gray" label={`"${search}"`} onRemove={() => setSearch("")} removeLabel={t.clearSearch} />
            )}
            {category !== ALL_CATEGORY && (
                <FilterTag color="yellow" label={categoryLabel(category)} onRemove={() => setCategory(ALL_CATEGORY)} removeLabel={t.clear} />
            )}
            {city !== ALL_CITY && (
                <FilterTag color="blue" label={cityLabel(city)} onRemove={() => setCity(ALL_CITY)} removeLabel={t.clear} />
            )}
            {entryType !== "All" && (
                <FilterTag color="green" label={entryLabel(entryType)} onRemove={() => setEntryType("All")} removeLabel={t.clear} />
            )}
        </div>
    );

    return (
        <>
            {/* Hero */}
            <section className="h-80 md:h-96 relative flex items-end justify-center pb-10 md:pb-12 mt-16 overflow-hidden">
                <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg/1280px-20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg"
                    alt="Rajasthan tourist places"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
                <div className="relative z-10 text-center px-4 w-full max-w-2xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-playfair text-4xl md:text-6xl font-bold text-white mb-3 md:mb-4"
                    >
                        {t.explore} <span className="text-yellow-400">{t.places}</span>
                    </motion.h1>
                    <p className="text-white/80 text-base md:text-lg mb-6">{t.discover(activePlaces.length)}</p>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input
                            type="search"
                            aria-label={t.searchPlaceholder}
                            placeholder={t.searchPlaceholder}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/95 backdrop-blur-sm text-gray-800 outline-none focus:ring-2 focus:ring-yellow-400 shadow-xl text-base [&::-webkit-search-cancel-button]:hidden"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                aria-label={t.clearSearch}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="sticky top-16 md:top-20 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur shadow-md py-3 md:py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Desktop Filters */}
                    <div className="hidden md:flex flex-col gap-3">
                        {/* Category row: single line, scrolls horizontally */}
                        <div className="relative">
                            <div className="flex gap-2 overflow-x-auto scrollbar-hide pr-8" role="group" aria-label={t.category}>
                                {categoryChips(false)}
                            </div>
                            <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white dark:from-gray-900" />
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                            {citySelect()}
                            {entrySelect()}
                            {sortSelect()}
                            <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                                {t.placesCount(filtered.length)}
                            </span>
                            {activeFilterCount > 0 && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="flex items-center gap-1 text-red-500 text-sm hover:text-red-700 transition-colors"
                                >
                                    <X size={14} />
                                    {t.clear} ({activeFilterCount})
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile: quick category scroll + filter button */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setShowFilters(true)}
                            aria-haspopup="dialog"
                            aria-expanded={showFilters}
                            className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium"
                        >
                            <SlidersHorizontal size={16} />
                            {t.filters}
                            {activeFilterCount > 0 && (
                                <span className="bg-yellow-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mr-4 pr-4" role="group" aria-label={t.category}>
                            {categoryChips(true)}
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Filter Bottom Sheet */}
            <AnimatePresence>
                {showFilters && (
                    <div className="md:hidden fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={t.filters}>
                        <motion.div
                            className="absolute inset-0 bg-black/50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowFilters(false)}
                        />
                        <motion.div
                            className="absolute bottom-0 inset-x-0 max-h-[85vh] flex flex-col bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        >
                            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100 dark:border-gray-800">
                                <div className="absolute left-1/2 -translate-x-1/2 top-2 w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t.filters}</h2>
                                <button
                                    type="button"
                                    onClick={() => setShowFilters(false)}
                                    aria-label="Close"
                                    className="w-10 h-10 -mr-2 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="overflow-y-auto px-5 py-4 space-y-5">
                                <div>
                                    <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">{t.category}</h3>
                                    <div className="flex flex-wrap gap-2">{categoryChips(true)}</div>
                                </div>
                                <div>
                                    <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">{t.city}</h3>
                                    {citySelect("w-full py-2.5")}
                                </div>
                                <div>
                                    <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">{t.entry}</h3>
                                    {entrySelect("w-full py-2.5")}
                                </div>
                                <div>
                                    <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">{t.sortBy}</h3>
                                    {sortSelect("w-full py-2.5")}
                                </div>
                            </div>

                            <div className="flex gap-3 px-5 py-4 border-t border-gray-100 dark:border-gray-800 pb-[max(1rem,env(safe-area-inset-bottom))]">
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    disabled={activeFilterCount === 0 && sortBy === "featured"}
                                    className="flex-1 py-3 text-red-500 border border-red-200 dark:border-red-800 rounded-xl text-sm font-medium disabled:opacity-40"
                                >
                                    {t.clearAll}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowFilters(false)}
                                    className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl text-sm font-semibold"
                                >
                                    {t.showResults(filtered.length)}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Results */}
            <section className="py-8 bg-palace-white dark:bg-gray-950 min-h-[60vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Results Header */}
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                        <p className="text-gray-500 dark:text-gray-400 text-sm" aria-live="polite">
                            {t.showing}{" "}
                            <strong className="text-gray-800 dark:text-white">{filtered.length}</strong>{" "}
                            <span>{t.of(activePlaces.length)}</span>
                            {search && (
                                <span>
                                    {" "}
                                    {t.forQuery} &quot;
                                    <strong className="text-yellow-600 dark:text-yellow-400">{search}</strong>
                                    &quot;
                                </span>
                            )}
                        </p>
                        {activeFilterTags}
                    </div>

                    {/* Places Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {visiblePlaces.map((place, i) => {
                            const isFav = isFavorite(place.id);
                            const open = isOpenAt(place.timing, now, place.isOpen);
                            const href = `/places/${place.slug}`;
                            return (
                                <motion.article
                                    key={place.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: Math.min((i % PAGE_SIZE) * 0.04, 0.3) }}
                                    className="group relative flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md dark:shadow-gray-900/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                                >
                                    {/* Image (clickable) */}
                                    <Link href={href} className="relative block h-52 overflow-hidden" tabIndex={-1} aria-hidden="true">
                                        <Image
                                            src={place.images[0]}
                                            alt={`${place.name} ${place.city} Rajasthan`}
                                            fill
                                            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                                        {/* Top Badges */}
                                        <div className="absolute top-3 left-3 right-14 flex gap-1.5 flex-wrap">
                                            {place.isUNESCO && (
                                                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                    UNESCO
                                                </span>
                                            )}
                                            <span
                                                className={`text-white text-xs font-bold px-2 py-0.5 rounded-full ${
                                                    place.ticket.isFree ? "bg-green-500" : "bg-yellow-500"
                                                }`}
                                            >
                                                {place.ticket.isFree ? t.free : `₹${place.ticket.indian}`}
                                            </span>
                                            <span className="bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                                                {place.category}
                                            </span>
                                        </div>

                                        {/* Bottom Info */}
                                        <div className="absolute bottom-3 left-3 right-16 text-white">
                                            <div className="flex items-center gap-1 text-white/80 text-xs">
                                                <MapPin size={10} />
                                                {place.city}
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
                                            <Star size={10} className="text-yellow-400 fill-yellow-400" />
                                            <span className="text-white text-xs font-bold">{place.rating}</span>
                                        </div>
                                    </Link>

                                    {/* Favorite (outside link so it doesn't navigate) */}
                                    <button
                                        type="button"
                                        onClick={() => toggleFavorite(place.id)}
                                        aria-label={isFav ? t.removeFav : t.addFav}
                                        aria-pressed={isFav}
                                        className="absolute top-2 right-2 z-10 w-11 h-11 flex items-center justify-center"
                                    >
                                        <span className="w-9 h-9 bg-black/25 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/40 transition-all">
                                            <motion.span
                                                key={String(isFav)}
                                                initial={{ scale: 0.6 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                            >
                                                <Heart
                                                    size={16}
                                                    className={isFav ? "text-red-500 fill-red-500" : "text-white"}
                                                />
                                            </motion.span>
                                        </span>
                                    </button>

                                    {/* Card Body */}
                                    <div className="p-4 flex flex-col flex-1">
                                        <h2 className="font-playfair font-bold text-lg leading-tight text-gray-900 dark:text-white mb-1.5">
                                            <Link href={href} className="hover:text-maroon-600 dark:hover:text-yellow-400 transition-colors">
                                                {place.name}
                                            </Link>
                                        </h2>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 mb-3">
                                            {place.description}
                                        </p>

                                        {/* Info Grid */}
                                        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 mb-3 text-xs text-gray-500 dark:text-gray-400">
                                            <InfoItem icon={Clock}>
                                                {place.timing.open} - {place.timing.close}
                                            </InfoItem>
                                            <InfoItem icon={Calendar}>{place.bestTimeToVisit.months}</InfoItem>
                                            <InfoItem icon={Ticket}>
                                                {place.ticket.isFree
                                                    ? t.freeEntry
                                                    : `₹${place.ticket.indian}/₹${place.ticket.foreigner}`}
                                            </InfoItem>
                                            <InfoItem icon={Hourglass}>{place.visitDuration.recommended}</InfoItem>
                                        </div>

                                        {/* Status */}
                                        <div className="flex items-center gap-2 mb-4 mt-auto">
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${
                                                    open ? "bg-green-500 animate-pulse" : "bg-red-500"
                                                }`}
                                            />
                                            <span className={`text-xs font-medium ${open ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
                                                {open ? t.openNow : t.closed}
                                            </span>
                                            {place.yearBuilt && (
                                                <>
                                                    <span className="text-xs text-gray-300 dark:text-gray-700">•</span>
                                                    <span className="text-xs text-gray-400 dark:text-gray-500">
                                                        {t.est} {place.yearBuilt}
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        {/* CTA Button */}
                                        <Link
                                            href={href}
                                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-500 to-maroon-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:opacity-90 transition-all group/btn"
                                        >
                                            {t.viewDetails}
                                            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>

                    {/* Load More Places Button */}
                    {visibleCount < filtered.length && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center gap-4 mt-12 mb-8"
                        >
                            <p className="text-sm text-gray-400 dark:text-gray-500">
                                {t.showingOf(visiblePlaces.length, filtered.length)}
                            </p>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300
                                    bg-white dark:bg-gray-800 border-2 border-amber-400 dark:border-amber-500
                                    text-amber-600 dark:text-amber-400
                                    hover:bg-amber-500 hover:text-white hover:border-amber-500
                                    dark:hover:bg-amber-500 dark:hover:text-white
                                    shadow-md hover:shadow-amber-400/30 dark:shadow-none"
                            >
                                <Star size={16} className="fill-current" />
                                {t.loadMore}
                                <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full text-xs font-bold">
                                    {t.more(Math.min(PAGE_SIZE, filtered.length - visibleCount))}
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
                            <div className="text-6xl mb-4" aria-hidden="true">🔍</div>
                            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">{t.noResults}</h3>
                            <p className="text-gray-400 dark:text-gray-500 mb-6">{t.noResultsHint}</p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="px-6 py-3 bg-yellow-500 text-white rounded-full text-sm font-medium hover:bg-yellow-600 transition-all"
                                >
                                    {t.clearAll}
                                </button>
                                <Link
                                    href="/"
                                    className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium hover:border-yellow-400 transition-all"
                                >
                                    {t.goHome}
                                </Link>
                            </div>
                        </motion.div>
                    )}

                    {/* Visual FAQ Section */}
                    <FAQSection faqs={isHi ? PLACES_FAQS_HINDI : PLACES_FAQS_ENGLISH} title={t.faqTitle} />
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
                        mainEntity: (isHi ? PLACES_FAQS_HINDI : PLACES_FAQS_ENGLISH).map((faq) => ({
                            "@type": "Question",
                            name: faq.question,
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: faq.answer,
                            },
                        })),
                    }),
                }}
            />
        </>
    );
}

// ============ SMALL PRESENTATIONAL HELPERS ============
function InfoItem({
    icon: Icon,
    children,
}: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-center gap-1 min-w-0">
            <Icon size={11} className="flex-shrink-0 text-yellow-500" />
            <span className="truncate">{children}</span>
        </div>
    );
}

const TAG_COLORS = {
    gray: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
    yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    green: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
};

function FilterTag({
    label,
    color,
    onRemove,
    removeLabel,
}: {
    label: string;
    color: keyof typeof TAG_COLORS;
    onRemove: () => void;
    removeLabel: string;
}) {
    return (
        <span className={`flex items-center gap-1 text-xs pl-2.5 pr-1 py-0.5 rounded-full ${TAG_COLORS[color]}`}>
            {label}
            <button
                type="button"
                onClick={onRemove}
                aria-label={`${removeLabel}: ${label}`}
                className="w-5 h-5 flex items-center justify-center rounded-full hover:text-red-500 transition-colors"
            >
                <X size={12} />
            </button>
        </span>
    );
}

// ============ REUSABLE FAQ SECTION COMPONENT ============
function FAQSection({ faqs, title }: { faqs: { question: string; answer: string }[]; title: string }) {
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
                        const panelId = `places-faq-panel-${idx}`;
                        const buttonId = `places-faq-button-${idx}`;
                        return (
                            <div
                                key={idx}
                                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm transition-all"
                            >
                                <h3>
                                    <button
                                        id={buttonId}
                                        type="button"
                                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
                                        className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left text-gray-900 dark:text-white font-semibold text-sm md:text-base hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <span>{faq.question}</span>
                                        <ChevronDown
                                            size={18}
                                            className={`shrink-0 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                </h3>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={panelId}
                                            role="region"
                                            aria-labelledby={buttonId}
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
