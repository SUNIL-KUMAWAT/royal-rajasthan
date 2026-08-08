// app/gallery/GalleryClient.tsx
"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES, GALLERY_IMAGES } from "@/constants/data";

export default function GalleryClient() {
    const currentCategories = CATEGORIES;
    const [activeCategory, setActiveCategory] = useState("All");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filtered = useMemo(() => {
        if (activeCategory === "All" || activeCategory === "सभी") return GALLERY_IMAGES;
        
        const catIndex = currentCategories.indexOf(activeCategory);
        const englishCategory = CATEGORIES[catIndex];

        return GALLERY_IMAGES.filter((img) => 
            img.category === activeCategory || (englishCategory && img.category === englishCategory)
        );
    }, [activeCategory, currentCategories]);

    return (
        <>
            <section
                className="h-64 md:h-80 relative flex items-end justify-center pb-12 mt-16"
                style={{
                    backgroundImage:
                        "url(https://picsum.photos/seed/raj-1113/800/600",
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
                        Photo <span className="text-gold-400">Gallery</span>
                    </motion.h1>
                    <p className="text-white/80 text-lg">
                        A visual journey through Rajasthan&apos;s royal grandeur
                    </p>
                </div>
            </section>

            <div className="bg-white py-4 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-2 justify-center">
                    {currentCategories.map((cat) => (
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

            <section className="py-12 bg-palace-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
                        <AnimatePresence>
                            {filtered.map((img, i) => (
                                <motion.div
                                    key={img.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid"
                                    onClick={() => setLightboxIndex(i)}
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        referrerPolicy="no-referrer"
                                        className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-3 left-3 text-white">
                                            <div className="font-medium text-sm">{img.alt}</div>
                                            <div className="flex items-center gap-1 text-white/70 text-xs">
                                                <MapPin size={10} />
                                                {img.location}
                                            </div>
                                        </div>
                                        <div className="absolute top-3 right-3">
                                            <ZoomIn size={20} className="text-white" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                    >
                        <button
                            onClick={() => setLightboxIndex(null)}
                            className="absolute top-4 right-4 text-white w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all z-10"
                        >
                            <X size={20} />
                        </button>
                        <button
                            onClick={() =>
                                setLightboxIndex(
                                    (p) => (p! - 1 + filtered.length) % filtered.length
                                )
                            }
                            className="absolute left-4 text-white w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all z-10"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <motion.div
                            key={lightboxIndex}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="max-w-4xl w-full"
                        >
                            <img
                                src={filtered[lightboxIndex].src.replace("600", "1200")}
                                alt={filtered[lightboxIndex].alt}
                                referrerPolicy="no-referrer"
                                className="w-full max-h-[80vh] object-contain rounded-lg"
                            />
                            <div className="text-center mt-4 text-white">
                                <div className="font-playfair text-xl font-bold">
                                    {filtered[lightboxIndex].alt}
                                </div>
                                <div className="flex items-center gap-1 justify-center text-white/60 text-sm mt-1">
                                    <MapPin size={12} />
                                    {filtered[lightboxIndex].location}
                                </div>
                            </div>
                        </motion.div>
                        <button
                            onClick={() =>
                                setLightboxIndex((p) => (p! + 1) % filtered.length)
                            }
                            className="absolute right-4 text-white w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all z-10"
                        >
                            <ChevronRight size={24} />
                        </button>
                        <div className="absolute bottom-4 text-white/60 text-sm">
                            {lightboxIndex + 1} / {filtered.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
