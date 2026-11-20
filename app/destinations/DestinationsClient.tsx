// app/destinations/DestinationsClient.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, MapPin, Clock, ArrowUpRight, Heart, ChevronDown } from "lucide-react";
import Link from "@/components/LocalizedLink";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { ExploreMoreSection } from "@/components/shared/ExploreMoreSection";
import { PageHero } from "@/components/ui/PageHero";

/** Card-sized destination record built on the server (see ./page.tsx). */
export type DestinationCard = {
    id: number;
    name: string;
    slug: string;
    nickname: string;
    description: string;
    image: string;
    rating: number;
    category: string;
    distance: string;
    duration: string;
    price: number;
    isFeatured: boolean;
};

/**
 * Asymmetric bento rhythm: repeats every 7 cards so the grid feels
 * editorial rather than uniform. Spans only apply from `lg` up.
 */
const BENTO_PATTERN = [
    "lg:col-span-2 lg:row-span-2",
    "",
    "",
    "lg:row-span-2",
    "lg:col-span-2",
    "",
    "",
];

export default function DestinationsClient({ destinations }: { destinations: DestinationCard[] }) {
    const DESTINATIONS = destinations;
    const { language } = useLanguage();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [favorites, setFavorites] = useState<number[]>([]);
    const [sortBy, setSortBy] = useState("featured");

    const categories = [
        "All",
        "Heritage City",
        "Lake City",
        "Desert City",
        "Wildlife",
        "Spiritual City",
        "Hill Station",
    ];

    const filtered = DESTINATIONS.filter((d) => {
        const matchSearch =
            d.name.toLowerCase().includes(search.toLowerCase()) ||
            d.nickname.toLowerCase().includes(search.toLowerCase());
        const matchCategory =
            category === "All" || d.category === category;
        return matchSearch && matchCategory;
    }).sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        return b.isFeatured ? 1 : -1;
    });

    return (
        <>
            <PageHero
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Jaisalmer_forteresse.jpg/1280px-Jaisalmer_forteresse.jpg"
                imageAlt="Jaisalmer Fort rising above the Thar desert"
                eyebrow="The Land of Kings"
                title={
                    <>
                        Explore <em>Destinations</em>
                    </>
                }
                subtitle="Discover the most enchanting places across the Land of Kings"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
            />

            {/* Floating glass filter bar */}
            <section className="sticky top-20 z-40 px-4 pt-4 md:top-24 sm:px-6 lg:px-8">
                <div className="glass-strong mx-auto max-w-7xl rounded-[1.75rem] p-3 md:p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        <div className="flex flex-col gap-3 sm:flex-row lg:w-auto">
                            <div className="relative flex-1 sm:min-w-[16rem]">
                                <Search
                                    size={16}
                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ivory-200/50"
                                />
                                <input
                                    type="text"
                                    placeholder="Search destinations..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="field !rounded-full !py-2.5 pl-11"
                                />
                            </div>
                            <div className="relative sm:w-52">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="field cursor-pointer appearance-none !rounded-full !py-2.5 pr-10"
                                >
                                    <option value="featured">Featured First</option>
                                    <option value="rating">Highest Rated</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                                <ChevronDown
                                    size={16}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ivory-200/50"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide lg:flex-wrap lg:overflow-visible">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    aria-pressed={category === cat}
                                    className={category === cat ? "chip-active" : "chip-idle"}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-16 md:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 flex items-end justify-between gap-6">
                        <p className="text-sm text-ink-500 dark:text-ivory-200/70">
                            Showing{" "}
                            <strong className="font-display text-2xl font-medium text-ink-900 dark:text-ivory-50">
                                {filtered.length}
                            </strong>{" "}
                            destinations
                        </p>
                        <div className="hairline hidden max-w-md md:block" />
                    </div>

                    <div className="grid grid-flow-dense auto-rows-[26rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[19rem] lg:grid-cols-4">
                        {filtered.map((dest, i) => {
                            const span = BENTO_PATTERN[i % BENTO_PATTERN.length];
                            const isLarge = span.includes("row-span-2") && span.includes("col-span-2");
                            const isFav = favorites.includes(dest.id);
                            return (
                                <motion.article
                                    key={dest.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: Math.min(i, 8) * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    className={`group relative isolate overflow-hidden rounded-[1.75rem] bg-ink-900 shadow-float transition-all duration-700 ease-lux hover:-translate-y-1.5 hover:shadow-float-lg ${span}`}
                                >
                                    <Image
                                        src={dest.image}
                                        alt={dest.name}
                                        fill
                                        sizes={isLarge ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
                                        className="-z-10 object-cover transition-transform duration-[1200ms] ease-lux group-hover:scale-[1.06]"
                                    />
                                    <div className="absolute inset-0 -z-10 scrim-b" />

                                    {/* Top row */}
                                    <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
                                        <div className="flex flex-wrap gap-2">
                                            {dest.isFeatured && (
                                                <span className="rounded-full bg-gold-400 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-900 shadow-gold">
                                                    Featured
                                                </span>
                                            )}
                                            <span className="glass-dark inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-white">
                                                <Star size={11} className="fill-gold-400 text-gold-400" />
                                                {dest.rating}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() =>
                                                setFavorites((p) =>
                                                    p.includes(dest.id)
                                                        ? p.filter((f) => f !== dest.id)
                                                        : [...p, dest.id]
                                                )
                                            }
                                            aria-label={isFav ? `Remove ${dest.name} from favourites` : `Save ${dest.name} to favourites`}
                                            aria-pressed={isFav}
                                            className="glass-dark flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 ease-lux hover:scale-110"
                                        >
                                            <Heart
                                                size={15}
                                                className={isFav ? "fill-maroon-400 text-maroon-400" : "text-white"}
                                            />
                                        </button>
                                    </div>

                                    {/* Bottom content */}
                                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                                        <span className="text-[10px] font-semibold uppercase tracking-eyebrow text-gold-300">
                                            {dest.nickname}
                                        </span>
                                        <h2
                                            className={`mt-1 font-display font-medium leading-none tracking-tight text-ivory-50 ${
                                                isLarge ? "text-4xl md:text-6xl" : "text-3xl"
                                            }`}
                                        >
                                            {dest.name}
                                        </h2>
                                        <p
                                            className={`mt-2 text-sm leading-relaxed text-ivory-100/75 ${
                                                isLarge ? "line-clamp-3 max-w-lg" : "line-clamp-2"
                                            }`}
                                        >
                                            {dest.description}
                                        </p>

                                        <div className="glass-dark mt-4 flex items-center justify-between gap-3 rounded-2xl p-2 pl-4">
                                            <div className="flex min-w-0 flex-col gap-0.5 text-[11px] text-ivory-100/75">
                                                <span className="flex items-center gap-1.5">
                                                    <Clock size={11} />
                                                    <span className="truncate">{dest.duration}</span>
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin size={11} />
                                                    <span className="truncate">{dest.distance}</span>
                                                </span>
                                            </div>
                                            <div className="flex shrink-0 items-center gap-3">
                                                <span className="font-display text-xl font-medium text-gold-300">
                                                    ₹{dest.price.toLocaleString()}
                                                </span>
                                                <Link
                                                    href={`/places?city=${encodeURIComponent(dest.name)}`}
                                                    aria-label={`View Details — ${dest.name}`}
                                                    className="inline-flex items-center gap-1.5 rounded-full bg-ivory-50 px-3.5 py-2 text-xs font-semibold text-ink-900 transition-all duration-500 ease-lux hover:bg-gold-300"
                                                >
                                                    <span className={isLarge ? "" : "sr-only sm:not-sr-only"}>View Details</span>
                                                    <ArrowUpRight size={14} className="transition-transform duration-500 ease-lux group-hover:rotate-45" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* SEO Interlinks — Explore More */}
            <ExploreMoreSection currentPage="places" language={language} />
        </>
    );
}
