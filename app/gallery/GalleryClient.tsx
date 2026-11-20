// app/gallery/GalleryClient.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { CATEGORIES, CATEGORIES_HINDI, GALLERY_IMAGES } from "@/constants/ui";
import { useLanguage } from "@/components/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function GalleryClient() {
    const { language } = useLanguage();
    const currentCategories = language === 'hi' ? CATEGORIES_HINDI : CATEGORIES;
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

    // Lightbox keyboard support (Esc closes, ←/→ navigate) + body scroll lock
    useEffect(() => {
        if (lightboxIndex === null) return;
        const count = filtered.length;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightboxIndex(null);
            if (e.key === "ArrowRight") setLightboxIndex((p) => (p === null ? p : (p + 1) % count));
            if (e.key === "ArrowLeft") setLightboxIndex((p) => (p === null ? p : (p - 1 + count) % count));
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [lightboxIndex, filtered.length]);

    return (
        <>
            <PageHero
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Udaipur_Lake_India.JPG/1280px-Udaipur_Lake_India.JPG"
                imageAlt="Lake Pichola, Udaipur"
                eyebrow="Visual Journal"
                title={
                    <>
                        Photo <em>Gallery</em>
                    </>
                }
                subtitle="A visual journey through Rajasthan's royal grandeur"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
            />

            {/* Floating category chips */}
            <div className="sticky top-20 z-40 px-4 pt-4 md:top-24">
                <div className="glass-strong mx-auto flex w-fit max-w-full gap-2 overflow-x-auto rounded-full p-1.5 scrollbar-hide">
                    {currentCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            aria-pressed={activeCategory === cat}
                            className={activeCategory === cat ? "chip-active" : "chip chip-idle !border-transparent !bg-transparent !shadow-none"}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <section className="py-14 md:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="columns-2 gap-4 space-y-4 sm:columns-3 md:gap-5 md:space-y-5 lg:columns-4">
                        <AnimatePresence>
                            {filtered.map((img, i) => (
                                <motion.div
                                    key={img.id}
                                    layout
                                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: Math.min(i, 8) * 0.04, duration: 0.7, ease: EASE }}
                                    className="group relative cursor-pointer overflow-hidden rounded-[1.5rem] bg-ink-900/5 shadow-float break-inside-avoid transition-shadow duration-500 ease-lux hover:shadow-float-lg dark:bg-white/5"
                                    onClick={() => setLightboxIndex(i)}
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        width={0}
                                        height={0}
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                        style={{ width: '100%', height: 'auto' }}
                                        className="transition-transform duration-[1200ms] ease-lux group-hover:scale-[1.06]"
                                    />
                                    <div className="absolute inset-0 scrim-b opacity-0 transition-opacity duration-500 ease-lux group-hover:opacity-100">
                                        <div className="absolute inset-x-3 bottom-3 translate-y-2 text-white transition-transform duration-500 ease-lux group-hover:translate-y-0">
                                            <div className="font-display text-lg font-medium leading-tight">{img.alt}</div>
                                            <div className="mt-1 flex items-center gap-1 text-xs text-ivory-100/70">
                                                <MapPin size={10} />
                                                {img.location}
                                            </div>
                                        </div>
                                        <div className="glass-dark absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full">
                                            <Maximize2 size={15} className="text-white" />
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
                        transition={{ duration: 0.4, ease: EASE }}
                        role="dialog"
                        aria-modal="true"
                        aria-label={filtered[lightboxIndex].alt}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur-2xl"
                    >
                        <button
                            onClick={() => setLightboxIndex(null)}
                            aria-label="Close"
                            className="btn-glass-dark absolute right-4 top-4 z-10 !h-11 !w-11 !p-0"
                        >
                            <X size={20} />
                        </button>
                        <button
                            onClick={() =>
                                setLightboxIndex(
                                    (p) => (p! - 1 + filtered.length) % filtered.length
                                )
                            }
                            aria-label="Previous image"
                            className="btn-glass-dark absolute left-3 z-10 !h-12 !w-12 !p-0 md:left-6"
                        >
                            <ChevronLeft size={22} />
                        </button>
                        <motion.div
                            key={lightboxIndex}
                            initial={{ scale: 0.96, opacity: 0, y: 12 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: EASE }}
                            className="w-full max-w-5xl"
                        >
                            <Image
                                src={filtered[lightboxIndex].src.replace("600", "1200")}
                                alt={filtered[lightboxIndex].alt}
                                width={1200}
                                height={800}
                                className="max-h-[74vh] w-full rounded-[1.5rem] object-contain"
                            />
                            <div className="mt-6 text-center text-white">
                                <h2 className="font-display text-2xl font-medium md:text-3xl">
                                    {filtered[lightboxIndex].alt}
                                </h2>
                                <div className="mt-2 flex items-center justify-center gap-1 text-sm text-ivory-100/60">
                                    <MapPin size={12} />
                                    {filtered[lightboxIndex].location}
                                </div>
                            </div>
                        </motion.div>
                        <button
                            onClick={() =>
                                setLightboxIndex((p) => (p! + 1) % filtered.length)
                            }
                            aria-label="Next image"
                            className="btn-glass-dark absolute right-3 z-10 !h-12 !w-12 !p-0 md:right-6"
                        >
                            <ChevronRight size={22} />
                        </button>
                        <div className="glass-dark absolute bottom-6 rounded-full px-4 py-1.5 font-display text-sm tracking-wide text-ivory-100/80">
                            {lightboxIndex + 1} / {filtered.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
