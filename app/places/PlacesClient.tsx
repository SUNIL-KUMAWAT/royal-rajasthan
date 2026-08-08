"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
} from "framer-motion";
import Link from "next/link";
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
    Sparkles,
    Zap,
    Crown,
    Flame,
} from "lucide-react";
import { PLACES, CATEGORIES, CITIES } from "@/constants/data";
import { TiltCard } from "@/components/home/TiltCard";

/* ---------- Floating particles ---------- */
function Particles() {
    const items = Array.from({ length: 18 });
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {items.map((_, i) => {
                const left = (i * 53) % 100;
                const delay = (i * 0.7) % 5;
                const duration = 6 + (i % 4);
                const size = 2 + (i % 3);
                return (
                    <motion.span
                        key={i}
                        className="absolute rounded-full bg-gold-400/40"
                        style={{
                            left: `${left}%`,
                            bottom: "-10px",
                            width: size,
                            height: size,
                        }}
                        animate={{
                            y: [0, -400],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration,
                            delay,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                );
            })}
        </div>
    );
}

/* ---------- HUD corner bracket ---------- */
function CornerBracket({ position }: { position: string }) {
    const base = "absolute w-5 h-5 border-gold-400/60";
    const map: Record<string, string> = {
        tl: "top-2 left-2 border-t-2 border-l-2",
        tr: "top-2 right-2 border-t-2 border-r-2",
        bl: "bottom-2 left-2 border-b-2 border-l-2",
        br: "bottom-2 right-2 border-b-2 border-r-2",
    };
    return <div className={`${base} ${map[position]}`} />;
}

/* ---------- Animated counter ---------- */
function Counter({ value }: { value: number }) {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
        let frame: number;
        const start = performance.now();
        const animate = (now: number) => {
            const progress = Math.min((now - start) / 600, 1);
            setDisplay(Math.floor(progress * value));
            if (progress < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [value]);
    return <>{display}</>;
}

export function PlacesClient() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [city, setCity] = useState("All Cities");
    const [sortBy, setSortBy] = useState("featured");
    const [entryType, setEntryType] = useState("All");
    const [favorites, setFavorites] = useState<number[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [visibleCount, setVisibleCount] = useState(12);

    // Reset pagination when any filter changes
    useEffect(() => {
        setVisibleCount(12);
    }, [search, category, city, sortBy, entryType]);
    const activePlaces = PLACES;
    const currentCategories = CATEGORIES;
    const currentCities = CITIES;

    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);

    const filtered = useMemo(() => {
        return activePlaces.filter((p) => {
            const matchSearch =
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.city.toLowerCase().includes(search.toLowerCase()) ||
                p.category.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase()) ||
                p.tags.some((t) =>
                    t.toLowerCase().includes(search.toLowerCase())
                );
            const matchCategory = category === "All" || p.category === category;
            const matchCity = city === "All Cities" || p.city === city;
            const matchEntry =
                entryType === "All" ||
                (entryType === "Free" && p.ticket.isFree) ||
                (entryType === "Paid" && !p.ticket.isFree);
            return matchSearch && matchCategory && matchCity && matchEntry;
        }).sort((a, b) => {
            if (sortBy === "rating") return b.rating - a.rating;
            if (sortBy === "name-az") return a.name.localeCompare(b.name);
            if (sortBy === "name-za") return b.name.localeCompare(a.name);
            if (sortBy === "price-low") return a.ticket.indian - b.ticket.indian;
            if (sortBy === "price-high") return b.ticket.indian - a.ticket.indian;
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
        setCity("All Cities");
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
        <div className="bg-palace-white dark:bg-gray-950">
            {/* ===== CINEMATIC HERO ===== */}
            <section
                ref={heroRef}
                className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-center justify-center"
            >
                {/* Parallax bg */}
                <motion.div
                    style={{ y: heroY, scale: heroScale }}
                    className="absolute inset-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920"
                        alt="Rajasthan"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-gray-950/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/40 via-transparent to-gold-900/30" />

                {/* Scan line effect */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(212,175,55,0.03) 3px, rgba(212,175,55,0.03) 4px)",
                    }}
                />

                {/* Particles */}
                <Particles />

                {/* Floating glow orbs */}
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-gold-500/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-maroon-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

                {/* Content */}
                <motion.div
                    style={{ y: contentY, opacity: heroOpacity }}
                    className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-gold-400/30 mb-6"
                    >
                        <Crown size={14} className="text-gold-400" />
                        <span className="text-gold-300 text-xs font-semibold tracking-widest uppercase">
                            Land of Kings
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="font-playfair text-5xl md:text-7xl font-bold text-white mb-4"
                    >
                        Explore{" "}
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent">
                                Places
                            </span>
                            <motion.span
                                className="absolute -inset-1 bg-gold-400/30 blur-xl"
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-white/70 text-lg mb-8"
                    >
                        Discover{" "}
                        <span className="text-gold-400 font-bold">
                            <Counter value={PLACES.length} />
                        </span>{" "}
                        legendary destinations across Rajasthan
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="relative group"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-500 via-gold-400 to-maroon-500 rounded-2xl blur opacity-30 group-focus-within:opacity-60 transition duration-500" />
                        <div className="relative flex items-center">
                            <Search
                                size={20}
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-gold-400 z-10"
                            />
                            <input
                                type="text"
                                placeholder="Search forts, palaces, lakes..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="relative w-full pl-14 pr-12 py-4 rounded-2xl bg-gray-900/80 backdrop-blur-xl text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-gold-400/50 border border-gold-400/20 text-base"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gold-400 transition-colors z-10"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* Quick stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex items-center justify-center gap-6 mt-8"
                    >
                        {[
                            { icon: Star, label: "Avg Rating", value: "4.7" },
                            { icon: Zap, label: "Destinations", value: `${PLACES.length}+` },
                            { icon: Flame, label: "UNESCO Sites", value: `${PLACES.filter(p => p.isUNESCO).length}` },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <stat.icon size={16} className="text-gold-400" />
                                <span className="text-white/80 text-sm font-semibold">{stat.value}</span>
                                <span className="text-white/40 text-xs">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 rounded-full border-2 border-gold-400/40 flex items-start justify-center p-1.5"
                    >
                        <div className="w-1 h-2 rounded-full bg-gold-400" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ===== STICKY FILTER BAR ===== */}
            <section className="sticky top-16 md:top-20 z-40 bg-gray-900/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gold-400/20 py-4">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-transparent to-maroon-500/5 pointer-events-none" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Desktop Filters */}
                    <div className="hidden md:flex flex-wrap gap-3 items-center">
                        {/* Category Buttons */}
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((cat, i) => (
                                <motion.button
                                    key={cat}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    onClick={() => setCategory(cat)}
                                    className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${category === cat
                                        ? "text-white"
                                        : "text-gray-400 hover:text-gold-400"
                                        }`}
                                >
                                    {category === cat && (
                                        <motion.span
                                            layoutId="cat-bg"
                                            className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 shadow-gold"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{cat}</span>
                                </motion.button>
                            ))}
                        </div>

                        <div className="w-px h-8 bg-gold-400/20" />

                        {/* City Dropdown */}
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="border border-gold-400/20 bg-gray-800 text-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gold-400 cursor-pointer"
                        >
                            {CITIES.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>

                        {/* Entry Type */}
                        <select
                            value={entryType}
                            onChange={(e) => setEntryType(e.target.value)}
                            className="border border-gold-400/20 bg-gray-800 text-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gold-400 cursor-pointer"
                        >
                            <option value="All">{language === 'hi' ? "सभी प्रकार" : "All Entry Types"}</option>
                            <option value="Free">{language === 'hi' ? "निःशुल्क प्रवेश" : "Free Entry"}</option>
                            <option value="Paid">{language === 'hi' ? "सशुल्क प्रवेश" : "Paid Entry"}</option>
                        </select>

                        {/* Sort By */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gold-400/20 bg-gray-800 text-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gold-400 cursor-pointer"
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
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={clearFilters}
                                className="flex items-center gap-1 text-red-400 text-sm hover:text-red-300 transition-colors"
                            >
                                <X size={14} />
                                Clear ({activeFilterCount})
                            </motion.button>
                        )}
                    </div>

                    {/* Mobile Filter Toggle */}
                    <div className="md:hidden">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 text-gray-200 font-medium"
                            >
                                <Filter size={18} className="text-gold-400" />
                                Filters
                                {activeFilterCount > 0 && (
                                    <span className="bg-gold-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                        {activeFilterCount}
                                    </span>
                                )}
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`}
                                />
                            </button>
                            <span className="text-sm text-gray-400">{filtered.length} places</span>
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
                                        <div className="flex flex-wrap gap-2">
                                            {currentCategories.map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setCategory(cat)}
                                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${category === cat
                                                        ? "bg-gold-500 text-white"
                                                        : "border border-gold-400/20 text-gray-400"
                                                        }`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <select
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                className="border border-gold-400/20 bg-gray-800 text-gray-200 rounded-xl px-3 py-2 text-sm"
                                            >
                                                {CITIES.map((c) => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={entryType}
                                                onChange={(e) => setEntryType(e.target.value)}
                                                className="border border-gold-400/20 bg-gray-800 text-gray-200 rounded-xl px-3 py-2 text-sm"
                                            >
                                                <option value="All">All Entry</option>
                                                <option value="Free">Free Entry</option>
                                                <option value="Paid">Paid Entry</option>
                                            </select>
                                        </div>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="w-full border border-gold-400/20 bg-gray-800 text-gray-200 rounded-xl px-3 py-2 text-sm"
                                        >
                                            <option value="featured">Featured First</option>
                                            <option value="rating">Highest Rated</option>
                                            <option value="reviews">Most Reviewed</option>
                                            <option value="name-az">Name A-Z</option>
                                            <option value="price-low">Price: Low to High</option>
                                        </select>
                                        {activeFilterCount > 0 && (
                                            <button
                                                onClick={clearFilters}
                                                className="w-full py-2 text-red-400 border border-red-400/20 rounded-xl text-sm font-medium hover:bg-red-500/10 transition-all"
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

            {/* ===== RESULTS GRID ===== */}
            <section className="py-12 min-h-[60vh] relative overflow-hidden">
                {/* Ambient bg */}
                <div className="pointer-events-none absolute top-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-maroon-500/5 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Results Header */}
                    <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
                        <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
                            <Sparkles size={14} className="text-gold-500" />
                            Showing{" "}
                            <strong className="text-gold-600 dark:text-gold-400 text-base">
                                <Counter value={filtered.length} />
                            </strong>{" "}
                            <span className="hidden sm:inline">
                                of {activePlaces.length} places
                            </span>
                            {search && (
                                <span>
                                    {" "}for &quot;
                                    <strong className="text-gold-600 dark:text-gold-400">{search}</strong>
                                    &quot;
                                </span>
                            )}
                        </p>

                        {/* Active Filter Tags */}
                        {activeFilterCount > 0 && (
                            <div className="hidden md:flex items-center gap-2 flex-wrap">
                                {category !== "All" && (
                                    <span className="flex items-center gap-1 bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 text-xs px-2 py-1 rounded-full">
                                        {category}
                                        <button onClick={() => setCategory("All")} className="hover:text-red-500 transition-colors">
                                            <X size={12} />
                                        </button>
                                    </span>
                                )}
                                {city !== "All Cities" && city !== "सभी शहर" && (
                                    <span className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                                        {city}
                                        <button onClick={() => setCity("All Cities")} className="hover:text-red-500 transition-colors">
                                            <X size={12} />
                                        </button>
                                    </span>
                                )}
                                {entryType !== "All" && (
                                    <span className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                                        {entryType} Entry
                                        <button onClick={() => setEntryType("All")} className="hover:text-red-500 transition-colors">
                                            <X size={12} />
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((place, i) => (
                                <motion.div
                                    key={place.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.85, rotateY: -20, y: 30 }}
                                    animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.85, rotateY: 20, y: -20 }}
                                    transition={{
                                        delay: Math.min(i * 0.05, 0.4),
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 22,
                                    }}
                                    style={{ perspective: 1200 }}
                                >
                                    <TiltCard
                                        maxTilt={12}
                                        className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md dark:shadow-gray-900/50 hover:shadow-gold-lg transition-shadow duration-500 border border-gray-100 dark:border-gray-800"
                                    >
                                        {/* HUD Corner Brackets */}
                                        <CornerBracket position="tl" />
                                        <CornerBracket position="tr" />
                                        <CornerBracket position="bl" />
                                        <CornerBracket position="br" />

                                        {/* Image with parallax depth */}
                                        <div
                                            className="relative h-56 overflow-hidden"
                                            style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
                                        >
                                            <img
                                                src={place.images[0]}
                                                alt={`${place.name} ${place.city} Rajasthan`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                            {/* Holographic shimmer sweep */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-300/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                                            </div>

                                            {/* Top Badges */}
                                            <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap" style={{ transform: "translateZ(30px)" }}>
                                                {place.isUNESCO && (
                                                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                                                        UNESCO
                                                    </span>
                                                )}
                                                <span className={`text-white text-xs font-bold px-2 py-0.5 rounded-full backdrop-blur-sm ${place.ticket.isFree ? "bg-green-500" : "bg-gold-500"}`}>
                                                    {place.ticket.isFree ? "Free" : `₹${place.ticket.indian}`}
                                                </span>
                                                <span className="bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                                                    {place.category}
                                                </span>
                                            </div>

                                            {/* Favorite */}
                                            <button
                                                onClick={() =>
                                                    setFavorites((p) =>
                                                        p.includes(place.id) ? p.filter((f) => f !== place.id) : [...p, place.id]
                                                    )
                                                }
                                                aria-label={`${favorites.includes(place.id) ? "Remove from" : "Add to"} favorites`}
                                                className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 hover:scale-110 transition-all"
                                                style={{ transform: "translateZ(30px)" }}
                                            >
                                                <Heart
                                                    size={16}
                                                    className={favorites.includes(place.id) ? "text-red-500 fill-red-500" : "text-white"}
                                                />
                                            </button>

                                            {/* Bottom Info */}
                                            <div className="absolute bottom-3 left-3 right-3" style={{ transform: "translateZ(25px)" }}>
                                                <div className="font-playfair font-bold text-xl text-white drop-shadow-lg">
                                                    {place.name}
                                                </div>
                                                <div className="flex items-center gap-1 text-white/80 text-xs mt-1">
                                                    <MapPin size={10} />
                                                    {place.city}
                                                </div>
                                            </div>

                                            {/* Rating */}
                                            <div
                                                className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1"
                                                style={{ transform: "translateZ(25px)" }}
                                            >
                                                <Star size={12} className="text-gold-400 fill-gold-400" />
                                                <span className="text-white text-xs font-bold">{place.rating}</span>
                                            </div>
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-5" style={{ transform: "translateZ(20px)" }}>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                                                {place.description}
                                            </p>

                                            {/* Info Grid */}
                                            <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-400 dark:text-gray-500">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock size={11} className="flex-shrink-0 text-gold-500" />
                                                    <span className="truncate">{place.timing.open} - {place.timing.close}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar size={11} className="flex-shrink-0 text-gold-500" />
                                                    <span className="truncate">{place.bestTimeToVisit.months}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Ticket size={11} className="flex-shrink-0 text-gold-500" />
                                                    <span>
                                                        {place.ticket.isFree ? "Free Entry" : `₹${place.ticket.indian}/₹${place.ticket.foreigner}`}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock size={11} className="flex-shrink-0 text-gold-500" />
                                                    <span>{place.visitDuration.recommended}</span>
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {place.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-0.5 bg-gold-50 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 text-xs rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Status */}
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className={`w-2 h-2 rounded-full ${place.isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {place.isOpen ? "Open Now" : "Closed"}
                                                </span>
                                                <span className="text-xs text-gray-300 dark:text-gray-700">•</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">Est. {place.yearBuilt}</span>
                                            </div>

                                            {/* CTA Button */}
                                            <Link
                                                href={`/places/${place.slug}`}
                                                className="relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-500 to-maroon-600 text-white py-3 rounded-xl text-sm font-semibold hover:shadow-lg transition-all hover:gap-3 group/btn overflow-hidden"
                                            >
                                                <span className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                                                <span className="relative z-10">View Details</span>
                                                <ArrowRight size={16} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            ))}
                        </AnimatePresence>
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
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-100 dark:bg-gold-900/30 mb-6">
                                <Search size={32} className="text-gold-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                                No places found
                            </h3>
                            <p className="text-gray-400 dark:text-gray-500 mb-6">
                                Try adjusting your search or filters
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-full text-sm font-medium hover:shadow-gold-lg transition-all"
                                >
                                    Clear All Filters
                                </button>
                                <Link
                                    href="/"
                                    className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium hover:border-gold-400 transition-all"
                                >
                                    Go to Home
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}
