"use client";
import { useState, useMemo, useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@/components/LocalizedLink";
import { Search, SlidersHorizontal, X, ChevronDown, Plus, Compass, ArrowDown } from "lucide-react";
import type { PlaceCard as PlaceCardData } from "@/lib/places";
import { CATEGORIES, CITIES, CATEGORIES_HINDI, CITIES_HINDI } from "@/constants/ui";
import { PLACES_FAQS_ENGLISH, PLACES_FAQS_HINDI } from "@/constants/faqs";
import { useLanguage } from "@/components/LanguageProvider";
import { ExploreMoreSection } from "@/components/shared/ExploreMoreSection";
import { isOpenAt } from "@/lib/openStatus";
import { useFavorites, useNow } from "@/lib/useClientHooks";
import { PageHero } from "@/components/ui/PageHero";
import { PlaceCard } from "@/components/ui/PlaceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

// ============ CONSTANTS ============
// Filter state always stores the English key (e.g. "Fort", "Jaipur") so it
// survives language switches and stays usable in URLs. Labels are looked up per language.
const ALL_CATEGORY = CATEGORIES[0];
const ALL_CITY = CITIES[0];
const PAGE_SIZE = 12;
const EASE = [0.22, 1, 0.36, 1] as const;

const HERO_IMAGE =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg/1280px-20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg";

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
        home: "Home",
        eyebrow: "Forts · Palaces · Lakes · Temples",
        explore: "Explore",
        places: "Places",
        discover: (n: number) => `Discover ${n} famous places across Rajasthan`,
        searchPlaceholder: "Search places, cities, categories...",
        clearSearch: "Clear search",
        filters: "Filters",
        close: "Close",
        clear: "Clear",
        clearAll: "Clear All Filters",
        showResults: (n: number) => `Show ${n} places`,
        placesCount: (n: number) => `${n} places`,
        showing: "Showing",
        of: (n: number) => `of ${n} places`,
        forQuery: "for",
        collection: "The collection",
        free: "Free",
        openNow: "Open Now",
        closed: "Closed",
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
        faqEyebrow: "Good to know",
        faqTitle: "Frequently Asked Questions",
    },
    hi: {
        home: "होम",
        eyebrow: "किले · महल · झीलें · मंदिर",
        explore: "जानें",
        places: "पर्यटन स्थल",
        discover: (n: number) => `राजस्थान के ${n} प्रसिद्ध स्थानों की खोज करें`,
        searchPlaceholder: "स्थान, शहर, श्रेणी खोजें...",
        clearSearch: "खोज साफ़ करें",
        filters: "फ़िल्टर",
        close: "बंद करें",
        clear: "साफ़ करें",
        clearAll: "सभी फ़िल्टर हटाएं",
        showResults: (n: number) => `${n} स्थान देखें`,
        placesCount: (n: number) => `${n} स्थान`,
        showing: "दिखाए जा रहे हैं",
        of: (n: number) => `/ ${n} स्थान`,
        forQuery: "खोज",
        collection: "संग्रह",
        free: "निःशुल्क",
        openNow: "अभी खुला है",
        closed: "बंद है",
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
        faqEyebrow: "उपयोगी जानकारी",
        faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    },
};

// ============ MAIN COMPONENT ============
export function PlacesClient({ places, placesHi }: { places: PlaceCardData[]; placesHi: PlaceCardData[] }) {
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

    // With no filters the first result becomes a large editorial "feature" tile
    const showFeature = activeFilterCount === 0 && visiblePlaces.length > 2;
    const cardText = {
        free: t.free,
        openNow: t.openNow,
        closed: t.closed,
        addFav: t.addFav,
        removeFav: t.removeFav,
        viewDetails: t.viewDetails,
    };

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
                    className={`shrink-0 ${active ? "chip-active" : "chip-idle"} ${mobile ? "!px-4 !py-2.5 !text-sm" : ""}`}
                >
                    {categoryLabel(cat)}
                </button>
            );
        });

    const citySelect = (extra = "") => (
        <SelectField label={t.city} value={city} onChange={setCity} className={extra}>
            {CITIES.map((c) => (
                <option key={c} value={c}>
                    {cityLabel(c)}
                </option>
            ))}
        </SelectField>
    );

    const entrySelect = (extra = "") => (
        <SelectField label={t.entry} value={entryType} onChange={setEntryType} className={extra}>
            {ENTRY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                    {isHi ? o.hi : o.en}
                </option>
            ))}
        </SelectField>
    );

    const sortSelect = (extra = "") => (
        <SelectField label={t.sortBy} value={sortBy} onChange={setSortBy} className={extra}>
            {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                    {isHi ? o.hi : o.en}
                </option>
            ))}
        </SelectField>
    );

    const activeFilterTags = activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
            {search && <FilterTag label={`"${search}"`} onRemove={() => setSearch("")} removeLabel={t.clearSearch} />}
            {category !== ALL_CATEGORY && (
                <FilterTag label={categoryLabel(category)} onRemove={() => setCategory(ALL_CATEGORY)} removeLabel={t.clear} />
            )}
            {city !== ALL_CITY && <FilterTag label={cityLabel(city)} onRemove={() => setCity(ALL_CITY)} removeLabel={t.clear} />}
            {entryType !== "All" && (
                <FilterTag label={entryLabel(entryType)} onRemove={() => setEntryType("All")} removeLabel={t.clear} />
            )}
        </div>
    );

    return (
        <>
            {/* Hero */}
            <PageHero
                image={HERO_IMAGE}
                imageAlt="Rajasthan tourist places"
                eyebrow={t.eyebrow}
                title={
                    <>
                        {t.explore} <em>{t.places}</em>
                    </>
                }
                subtitle={t.discover(activePlaces.length)}
                breadcrumbs={[{ label: t.home, href: "/" }, { label: t.places }]}
            >
                {/* Search Bar */}
                <div className="group relative max-w-2xl">
                    <div className="pointer-events-none absolute -inset-1 rounded-full bg-gold-400/0 blur-xl transition-colors duration-700 ease-lux group-focus-within:bg-gold-400/25" />
                    <div className="relative flex items-center rounded-full glass-dark shadow-float-lg transition-colors duration-500 ease-lux group-focus-within:bg-ink-950/45">
                        <Search size={20} className="pointer-events-none absolute left-6 text-gold-300" />
                        <input
                            type="search"
                            aria-label={t.searchPlaceholder}
                            placeholder={t.searchPlaceholder}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-16 w-full rounded-full bg-transparent pl-14 pr-16 text-base text-ivory-50 outline-none placeholder:text-ivory-100/55 md:h-[4.25rem] md:text-lg [&::-webkit-search-cancel-button]:hidden"
                        />
                        <AnimatePresence>
                            {search && (
                                <motion.button
                                    type="button"
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.7 }}
                                    transition={{ duration: 0.3, ease: EASE }}
                                    onClick={() => setSearch("")}
                                    aria-label={t.clearSearch}
                                    className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-ivory-50 transition-colors hover:bg-white/20"
                                >
                                    <X size={18} />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </PageHero>

            {/* Filters — floating glass bar */}
            <section className="sticky top-20 z-30 -mt-8 px-3 sm:px-5 md:top-24 md:-mt-10">
                <div className="mx-auto max-w-7xl rounded-[1.75rem] glass-strong px-3 py-3 shadow-float md:px-5 md:py-4">
                    {/* Desktop Filters */}
                    <div className="hidden flex-col gap-3 md:flex">
                        {/* Category row: single line, scrolls horizontally */}
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide mask-fade-x px-1 py-0.5" role="group" aria-label={t.category}>
                            {categoryChips(false)}
                        </div>

                        <div className="hairline" />

                        <div className="flex flex-wrap items-center gap-3">
                            {citySelect("w-48")}
                            {entrySelect("w-48")}
                            {sortSelect("w-56")}
                            <span className="ml-auto text-sm text-ink-500 dark:text-ivory-200/70">
                                <span className="font-display text-xl font-medium text-ink-900 dark:text-ivory-50">
                                    {t.placesCount(filtered.length)}
                                </span>
                            </span>
                            {activeFilterCount > 0 && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-maroon-500 transition-colors hover:bg-maroon-500/10 dark:text-maroon-300"
                                >
                                    <X size={14} />
                                    {t.clear} ({activeFilterCount})
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile: quick category scroll + filter button */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            type="button"
                            onClick={() => setShowFilters(true)}
                            aria-haspopup="dialog"
                            aria-expanded={showFilters}
                            className="chip shrink-0 bg-ink-900 !py-2.5 !text-sm text-ivory-50 dark:bg-ivory-100 dark:text-ink-900"
                        >
                            <SlidersHorizontal size={15} />
                            {t.filters}
                            {activeFilterCount > 0 && (
                                <span className="grid h-5 w-5 place-items-center rounded-full bg-gold-400 text-[11px] font-bold text-ink-900">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                        <div className="-mr-3 flex gap-2 overflow-x-auto scrollbar-hide pr-3" role="group" aria-label={t.category}>
                            {categoryChips(true)}
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Filter Bottom Sheet */}
            <AnimatePresence>
                {showFilters && (
                    <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label={t.filters}>
                        <motion.div
                            className="absolute inset-0 bg-ink-950/55 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowFilters(false)}
                        />
                        <motion.div
                            className="absolute inset-x-2 bottom-2 flex max-h-[85vh] flex-col overflow-hidden rounded-[2rem] glass-strong shadow-float-lg"
                            initial={{ y: "110%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "110%" }}
                            transition={{ type: "spring", damping: 32, stiffness: 300 }}
                        >
                            <div className="relative flex items-center justify-between px-6 pb-3 pt-6">
                                <div className="absolute left-1/2 top-2.5 h-1 w-10 -translate-x-1/2 rounded-full bg-ink-900/15 dark:bg-white/20" />
                                <div>
                                    <span className="eyebrow">{t.placesCount(filtered.length)}</span>
                                    <h2 className="mt-1 font-display text-3xl font-medium tracking-tight text-ink-900 dark:text-ivory-50">
                                        {t.filters}
                                    </h2>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowFilters(false)}
                                    aria-label={t.close}
                                    className="-mr-2 grid h-11 w-11 place-items-center rounded-full glass text-ink-700 dark:text-ivory-100"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="hairline" />

                            <div className="space-y-6 overflow-y-auto px-6 py-5">
                                <div>
                                    <h3 className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-400 dark:text-ivory-200/60">
                                        {t.category}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">{categoryChips(true)}</div>
                                </div>
                                <div>
                                    <h3 className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-400 dark:text-ivory-200/60">
                                        {t.city}
                                    </h3>
                                    {citySelect()}
                                </div>
                                <div>
                                    <h3 className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-400 dark:text-ivory-200/60">
                                        {t.entry}
                                    </h3>
                                    {entrySelect()}
                                </div>
                                <div>
                                    <h3 className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-400 dark:text-ivory-200/60">
                                        {t.sortBy}
                                    </h3>
                                    {sortSelect()}
                                </div>
                            </div>

                            <div className="flex gap-3 border-t border-ink-900/5 px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:border-white/5">
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    disabled={activeFilterCount === 0 && sortBy === "featured"}
                                    className="btn-glass flex-1 !px-4 disabled:!translate-y-0"
                                >
                                    {t.clearAll}
                                </button>
                                <button type="button" onClick={() => setShowFilters(false)} className="btn-primary flex-1 !px-4">
                                    {t.showResults(filtered.length)}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Results */}
            <section className="relative min-h-[60vh] pb-28 pt-12 md:pb-16 md:pt-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Results Header */}
                    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
                        <div>
                            <span className="eyebrow">{t.collection}</span>
                            <p className="mt-3 text-sm text-ink-500 dark:text-ivory-200/70" aria-live="polite">
                                {t.showing}{" "}
                                <strong className="font-display text-3xl font-medium text-ink-900 dark:text-ivory-50 md:text-4xl">
                                    {filtered.length}
                                </strong>{" "}
                                <span>{t.of(activePlaces.length)}</span>
                                {search && (
                                    <span>
                                        {" "}
                                        {t.forQuery} &quot;
                                        <strong className="font-semibold text-gold-700 dark:text-gold-400">{search}</strong>
                                        &quot;
                                    </span>
                                )}
                            </p>
                        </div>
                        {activeFilterTags}
                    </div>

                    {/* Places Grid (bento: first result spans 2×2 when unfiltered) */}
                    <div className="grid grid-flow-row-dense grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                        {visiblePlaces.map((place, i) => {
                            const feature = showFeature && i === 0;
                            return (
                                <motion.div
                                    key={place.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: EASE, delay: Math.min((i % PAGE_SIZE) * 0.05, 0.35) }}
                                    className={feature ? "sm:col-span-2 lg:row-span-2" : undefined}
                                >
                                    <PlaceCard
                                        place={place}
                                        t={cardText}
                                        isOpen={isOpenAt(place.timing, now, place.isOpen)}
                                        isFavorite={isFavorite(place.id)}
                                        onToggleFavorite={() => toggleFavorite(place.id)}
                                        variant={feature ? "feature" : "card"}
                                        sizes={
                                            feature
                                                ? "(min-width: 1280px) 50vw, (min-width: 640px) 66vw, 100vw"
                                                : undefined
                                        }
                                        className={feature ? "!min-h-[26rem] md:!min-h-[32rem]" : ""}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Load More Places Button */}
                    {visibleCount < filtered.length && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: EASE }}
                            className="mb-8 mt-14 flex flex-col items-center gap-4"
                        >
                            <div className="h-px w-40 bg-ink-900/10 dark:bg-white/10">
                                <div
                                    className="h-full bg-gold-500 transition-[width] duration-700 ease-lux"
                                    style={{ width: `${(visiblePlaces.length / filtered.length) * 100}%` }}
                                />
                            </div>
                            <p className="text-xs uppercase tracking-[0.18em] text-ink-400 dark:text-ivory-200/55">
                                {t.showingOf(visiblePlaces.length, filtered.length)}
                            </p>
                            <button
                                type="button"
                                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                                className="btn-glass group !py-3.5 !pl-7 !pr-3"
                            >
                                {t.loadMore}
                                <span className="inline-flex items-center gap-1 rounded-full bg-ink-900 px-3 py-1 text-xs font-bold text-ivory-50 dark:bg-gold-400 dark:text-ink-900">
                                    {t.more(Math.min(PAGE_SIZE, filtered.length - visibleCount))}
                                    <ArrowDown size={12} className="transition-transform duration-500 ease-lux group-hover:translate-y-0.5" />
                                </span>
                            </button>
                        </motion.div>
                    )}

                    {/* No Results State */}
                    {filtered.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: EASE }}
                            className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] glass px-6 py-16 text-center md:px-12"
                        >
                            <div className="pointer-events-none absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold-400/20 blur-3xl" />
                            <div className="relative mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full glass-strong animate-float" aria-hidden="true">
                                <Compass size={26} className="text-gold-600 dark:text-gold-400" />
                            </div>
                            <h3 className="relative font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink-900 dark:text-ivory-50">
                                {t.noResults}
                            </h3>
                            <p className="relative mb-8 mt-3 text-ink-500 dark:text-ivory-200/70">{t.noResultsHint}</p>
                            <div className="relative flex flex-col justify-center gap-3 sm:flex-row">
                                <button type="button" onClick={clearFilters} className="btn-primary">
                                    {t.clearAll}
                                </button>
                                <Link href="/" className="btn-glass">
                                    {t.goHome}
                                </Link>
                            </div>
                        </motion.div>
                    )}

                    {/* Visual FAQ Section */}
                    <FAQSection
                        faqs={isHi ? PLACES_FAQS_HINDI : PLACES_FAQS_ENGLISH}
                        title={t.faqTitle}
                        eyebrow={t.faqEyebrow}
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
/** Native <select> styled as a glass field with a custom chevron. */
function SelectField({
    label,
    value,
    onChange,
    className = "",
    children,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
    children: ReactNode;
}) {
    return (
        <div className={`relative ${className}`}>
            <select
                aria-label={label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="field cursor-pointer appearance-none !rounded-full !py-2.5 pr-10 font-medium [&>option]:bg-ivory-50 [&>option]:text-ink-900 dark:[&>option]:bg-ink-800 dark:[&>option]:text-ivory-100"
            >
                {children}
            </select>
            <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ivory-200/60"
            />
        </div>
    );
}

function FilterTag({ label, onRemove, removeLabel }: { label: string; onRemove: () => void; removeLabel: string }) {
    return (
        <motion.span
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="inline-flex items-center gap-1 rounded-full glass py-1 pl-3.5 pr-1 text-xs font-medium text-ink-700 dark:text-ivory-100"
        >
            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
            {label}
            <button
                type="button"
                onClick={onRemove}
                aria-label={`${removeLabel}: ${label}`}
                className="grid h-7 w-7 place-items-center rounded-full text-ink-400 transition-colors hover:bg-ink-900/5 hover:text-maroon-500 dark:text-ivory-200/60 dark:hover:bg-white/10 dark:hover:text-maroon-300"
            >
                <X size={12} />
            </button>
        </motion.span>
    );
}

// ============ REUSABLE FAQ SECTION COMPONENT ============
function FAQSection({
    faqs,
    title,
    eyebrow,
}: {
    faqs: { question: string; answer: string }[];
    title: string;
    eyebrow: string;
}) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="relative mt-24 md:mt-32">
            <div className="hairline mb-16 md:mb-24" />
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-32">
                        <SectionHeading eyebrow={eyebrow} title={title} className="!mb-0" />
                    </div>
                </div>
                <Reveal className="space-y-3 lg:col-span-8">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        const panelId = `places-faq-panel-${idx}`;
                        const buttonId = `places-faq-button-${idx}`;
                        return (
                            <div
                                key={idx}
                                className={`overflow-hidden rounded-[1.5rem] transition-all duration-500 ease-lux ${
                                    isOpen ? "glass-strong shadow-float" : "glass"
                                }`}
                            >
                                <h3 className="font-sans">
                                    <button
                                        id={buttonId}
                                        type="button"
                                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
                                        className="flex w-full items-center gap-4 px-5 py-5 text-left text-sm font-semibold text-ink-900 transition-colors dark:text-ivory-50 md:px-7 md:text-base"
                                    >
                                        <span className="w-7 shrink-0 font-display text-lg font-medium italic text-gold-600 dark:text-gold-400" aria-hidden="true">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <span className="flex-1">{faq.question}</span>
                                        <span
                                            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-500 ease-lux ${
                                                isOpen
                                                    ? "rotate-45 bg-ink-900 text-ivory-50 dark:bg-gold-400 dark:text-ink-900"
                                                    : "bg-ink-900/5 text-ink-600 dark:bg-white/10 dark:text-ivory-100"
                                            }`}
                                            aria-hidden="true"
                                        >
                                            <Plus size={16} />
                                        </span>
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
                                            transition={{ duration: 0.4, ease: EASE }}
                                        >
                                            <div className="px-5 pb-6 pl-16 text-sm leading-relaxed text-ink-500 dark:text-ivory-200/70 md:px-7 md:pl-[4.75rem] md:text-[15px]">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </Reveal>
            </div>
        </section>
    );
}
