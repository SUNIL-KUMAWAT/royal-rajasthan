// app/destinations/DestinationsClient.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, MapPin, Clock, ArrowRight, Heart } from "lucide-react";
import { DESTINATIONS } from "@/constants/data";
import Link from "next/link";
import Image from "next/image";

export default function DestinationsClient() {
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

    const filtered = DESTINATIONS.filter((d: any) => {
        const matchSearch =
            d.name.toLowerCase().includes(search.toLowerCase()) ||
            d.nickname.toLowerCase().includes(search.toLowerCase());
        const matchCategory =
            category === "All" || d.category === category;
        return matchSearch && matchCategory;
    }).sort((a: any, b: any) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        return b.isFeatured ? 1 : -1;
    });

    return (
        <>
            <section
                className="h-64 md:h-96 relative flex items-end justify-center pb-12 mt-16"
                style={{
                    backgroundImage:
                        "url(https://picsum.photos/seed/raj-1104/800/600",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4"
                    >
                        Explore <span className="text-gold-400">Destinations</span>
                    </motion.h1>
                    <p className="text-white/80 text-lg">
                        Discover the most enchanting places across the Land of Kings
                    </p>
                </div>
            </section>

            <section className="sticky top-0 z-40 bg-white shadow-md py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-1 max-w-sm">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Search destinations..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:border-gold-400 outline-none text-sm"
                            />
                        </div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-gold-400 outline-none"
                        >
                            <option value="featured">Featured First</option>
                            <option value="rating">Highest Rated</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${category === cat
                                        ? "bg-gold-gradient text-white"
                                        : "border border-gray-200 text-gray-500 hover:border-gold-400"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-palace-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-gray-500 mb-8">
                        Showing <strong>{filtered.length}</strong> destinations
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filtered.map((dest: any, i: any) => (
                            <motion.div
                                key={dest.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-royal transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <Image
                                        src={dest.image}
                                        alt={dest.name}
                                        fill
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    {dest.isFeatured && (
                                        <div className="absolute top-3 left-3 bg-gold-gradient text-white text-xs font-bold px-2 py-1 rounded-full">
                                            Featured
                                        </div>
                                    )}
                                    <button
                                        onClick={() =>
                                            setFavorites((p) =>
                                                p.includes(dest.id)
                                                    ? p.filter((f) => f !== dest.id)
                                                    : [...p, dest.id]
                                            )
                                        }
                                        className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                                    >
                                        <Heart
                                            size={14}
                                            className={
                                                favorites.includes(dest.id)
                                                    ? "text-red-500 fill-red-500"
                                                    : "text-white"
                                            }
                                        />
                                    </button>
                                    <div className="absolute bottom-3 left-3 text-white">
                                        <h2 className="font-playfair font-bold text-xl">
                                            {dest.name}
                                        </h2>
                                        <div className="text-white/80 text-xs">{dest.nickname}</div>
                                    </div>
                                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                                        <Star
                                            size={10}
                                            className="text-yellow-400 fill-yellow-400"
                                        />
                                        <span className="text-white text-xs">{dest.rating}</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                                        {dest.description}
                                    </p>
                                    <div className="flex items-center justify-between mb-3 text-sm">
                                        <div className="flex items-center gap-1 text-gray-400">
                                            <Clock size={12} />
                                            <span>{dest.duration}</span>
                                        </div>
                                        <div className="text-maroon-500 font-bold">
                                            ₹{dest.price.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                                        <MapPin size={10} />
                                        <span>{dest.distance}</span>
                                    </div>
                                    <Link
                                        href={`/destinations/${dest.slug}`}
                                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-500 to-maroon-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
                                    >
                                        View Details
                                        <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
