"use client";
import Image from "next/image";
import { Grid } from "lucide-react";
import type { Place } from "@/types";
import type { DetailText } from "./text";

type Props = {
    place: Place;
    isOpen: boolean;
    activeImage: number;
    onScrollImage: (index: number) => void;
    onOpenLightbox: (index: number) => void;
    t: DetailText;
};

/** Swipe slider on mobile, bento grid on desktop. */
export function Gallery({ place, isOpen, activeImage, onScrollImage, onOpenLightbox, t }: Props) {
    const statusBadge = (desktop: boolean) => (
        <span
            className={`text-white font-bold rounded-full shadow-lg backdrop-blur-md border border-white/20 ${
                desktop ? "text-xs px-3 py-1.5" : "text-[10px] px-2.5 py-1"
            } ${isOpen ? "bg-emerald-500/90" : "bg-red-500/90"}`}
        >
            {desktop ? (isOpen ? t.openNow : t.currentlyClosed) : isOpen ? t.open : t.closed}
        </span>
    );

    const unescoBadge = (desktop: boolean) =>
        place.isUNESCO && (
            <span
                className={`bg-blue-600/90 backdrop-blur-md text-white font-bold rounded-full shadow-lg border border-white/20 ${
                    desktop ? "text-xs px-3 py-1.5" : "text-[10px] px-2.5 py-1"
                }`}
            >
                {desktop ? t.unescoHeritage : "UNESCO"}
            </span>
        );

    // Desktop bento layout: one large tile + up to three smaller ones
    const tiles = [
        { index: 0, cls: "col-span-2 row-span-2" },
        { index: 1, cls: "col-span-2 row-span-1" },
        { index: 2, cls: "col-span-1 row-span-1" },
        { index: 3, cls: "col-span-1 row-span-1" },
    ].filter((tile) => tile.index < place.images.length);

    return (
        <section className="bg-white dark:bg-gray-950 md:py-6 lg:py-8">
            {/* Mobile swipe slider */}
            <div className="md:hidden relative w-full h-[350px] sm:h-[450px]">
                <div
                    className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                    onScroll={(e) => {
                        const el = e.currentTarget;
                        onScrollImage(Math.round(el.scrollLeft / el.clientWidth));
                    }}
                >
                    {place.images.map((img, i) => (
                        <button
                            type="button"
                            key={`${i}-${img}`}
                            className="w-full h-full flex-shrink-0 snap-center relative"
                            onClick={() => onOpenLightbox(i)}
                            aria-label={t.photoOf(place.name, i + 1)}
                        >
                            <Image
                                src={img}
                                alt={t.photoOf(place.name, i + 1)}
                                fill
                                priority={i === 0}
                                sizes="100vw"
                                className="object-cover"
                            />
                            <span className="absolute inset-0 bg-black/10" />
                        </button>
                    ))}
                </div>

                <div className="absolute top-4 left-4 flex gap-2 z-10">
                    {unescoBadge(false)}
                    {statusBadge(false)}
                </div>

                {place.images.length > 1 && (
                    <div
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full"
                        aria-hidden="true"
                    >
                        {place.images.map((img, i) => (
                            <span
                                key={`${i}-${img}`}
                                className={`h-1.5 rounded-full transition-all ${
                                    i === activeImage ? "w-4 bg-white" : "w-1.5 bg-white/50"
                                }`}
                            />
                        ))}
                    </div>
                )}

                <button
                    type="button"
                    onClick={() => onOpenLightbox(activeImage)}
                    className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold border border-white/20 flex items-center gap-1.5"
                >
                    <Grid size={14} />
                    {t.allPhotos}
                </button>
            </div>

            {/* Desktop bento grid */}
            <div className="hidden md:block max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-4 grid-rows-2 gap-3 lg:gap-4 h-[55vh] lg:h-[65vh] rounded-3xl overflow-hidden relative shadow-2xl">
                    {tiles.map(({ index, cls }) => (
                        <button
                            type="button"
                            key={index}
                            className={`${cls} relative cursor-pointer overflow-hidden group`}
                            onClick={() => onOpenLightbox(index)}
                            aria-label={t.photoOf(place.name, index + 1)}
                        >
                            <Image
                                src={place.images[index]}
                                alt={t.photoOf(place.name, index + 1)}
                                fill
                                priority={index === 0}
                                sizes={index === 0 ? "50vw" : "25vw"}
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <span
                                className={`absolute inset-0 transition-colors duration-500 ${
                                    index === 3 ? "bg-black/30 group-hover:bg-black/20" : "bg-black/10 group-hover:bg-transparent"
                                }`}
                            />
                            {index === 0 && (
                                <span className="absolute top-5 left-5 flex gap-2 flex-wrap z-10">
                                    {unescoBadge(true)}
                                    {statusBadge(true)}
                                </span>
                            )}
                        </button>
                    ))}

                    <button
                        type="button"
                        onClick={() => onOpenLightbox(0)}
                        className="absolute bottom-6 right-6 bg-white/95 dark:bg-gray-900/95 hover:bg-white dark:hover:bg-black backdrop-blur-xl text-gray-900 dark:text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200/50 dark:border-gray-700/50 z-20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                    >
                        <Grid size={18} />
                        {t.showAllPhotos}
                    </button>
                </div>
            </div>
        </section>
    );
}
