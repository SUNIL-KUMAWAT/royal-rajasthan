"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, ArrowRight, Wifi, Dumbbell, Coffee } from "lucide-react";
import { HOTELS } from "@/constants/data";

export default function HotelsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const categories = [
        "All",
        "Luxury Palace Hotel",
        "Heritage Palace Hotel",
        "Desert Luxury Resort",
    ];

    const filtered =
        activeCategory === "All"
            ? HOTELS
            : HOTELS.filter((h) => h.category === activeCategory);

    return (
        <>
            <section
                className="h-64 md:h-80 relative flex items-end justify-center pb-12 mt-16"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4">
                        Luxury <span className="text-gold-400">Hotels</span>
                    </h1>
                    <p className="text-white/80 text-lg">
                        Stay like royalty across Rajasthan
                    </p>
                </div>
            </section>

            <div className="bg-white py-4 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-2 justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                ? "bg-gold-gradient text-white"
                                : "border border-gray-200 text-gray-600 hover:border-gold-400"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <section className="py-16 bg-palace-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filtered.map((hotel, i) => (
                            <motion.div
                                key={hotel.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-royal transition-all duration-500 flex flex-col md:flex-row"
                            >
                                <div className="relative w-full md:w-64 h-56 md:h-auto flex-shrink-0 overflow-hidden">
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-3 left-3 flex gap-0.5">
                                        {Array.from({ length: hotel.stars }).map((_, j) => (
                                            <Star
                                                key={j}
                                                size={12}
                                                className="text-yellow-400 fill-yellow-400"
                                            />
                                        ))}
                                    </div>
                                    <div className="absolute top-3 right-3 bg-gold-gradient text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {hotel.category}
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-playfair font-bold text-xl text-gray-900">
                                                {hotel.name}
                                            </h3>
                                            <div className="flex items-center gap-1 ml-2">
                                                <Star
                                                    size={14}
                                                    className="text-yellow-400 fill-yellow-400"
                                                />
                                                <span className="font-bold text-sm">{hotel.rating}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                                            <MapPin size={12} />
                                            <span>{hotel.location}, Rajasthan</span>
                                        </div>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                            {hotel.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {hotel.amenities.map((amenity) => (
                                                <span
                                                    key={amenity}
                                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                                >
                                                    {amenity}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-2xl font-bold text-maroon-500">
                                                ₹{hotel.price.toLocaleString()}
                                            </div>
                                            <div className="text-gray-400 text-xs">per night</div>
                                        </div>
                                        <button className="flex items-center gap-2 bg-gold-gradient text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:shadow-gold transition-all">
                                            Book Now
                                            <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
