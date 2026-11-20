"use client";
import Image from "next/image";
import { Expand, Images } from "lucide-react";
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

/** Swipe slider on mobile, cinematic bento grid on desktop. */
export function Gallery({ place, isOpen, activeImage, onScrollImage, onOpenLightbox, t }: Props) {
    const statusBadge = (desktop: boolean) => (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full glass-dark font-semibold text-white ${
                desktop ? "px-3.5 py-1.5 text-xs" : "px-3 py-1 text-[11px]"
            }`}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`} />
            {desktop ? (isOpen ? t.openNow : t.currentlyClosed) : isOpen ? t.open : t.closed}
        </span>
    );

    const unescoBadge = (desktop: boolean) =>
        place.isUNESCO && (
            <span
                className={`rounded-full bg-gold-400/90 font-bold uppercase tracking-wider text-ink-900 backdrop-blur ${
                    desktop ? "px-3.5 py-1.5 text-[11px]" : "px-3 py-1 text-[10px]"
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

    const count = place.images.length;

    return (
        <section className="relative">
            {/* Mobile swipe slider */}
            <div className="relative mx-3 h-[58svh] max-h-[560px] min-h-[360px] overflow-hidden rounded-[2rem] bg-ink-900 shadow-float-lg sm:mx-5 md:hidden">
                <div
                    className="flex h-full w-full snap-x snap-mandatory overflow-x-auto scrollbar-hide"
                    onScroll={(e) => {
                        const el = e.currentTarget;
                        onScrollImage(Math.round(el.scrollLeft / el.clientWidth));
                    }}
                >
                    {place.images.map((img, i) => (
                        <button
                            type="button"
                            key={`${i}-${img}`}
                            className="relative h-full w-full flex-shrink-0 snap-center overflow-hidden"
                            onClick={() => onOpenLightbox(i)}
                            aria-label={t.photoOf(place.name, i + 1)}
                        >
                            <span className={`absolute inset-0 ${i === 0 ? "animate-kenburns" : ""}`}>
                                <Image
                                    src={img}
                                    alt={t.photoOf(place.name, i + 1)}
                                    fill
                                    priority={i === 0}
                                    sizes="100vw"
                                    className="object-cover"
                                />
                            </span>
                            <span className="absolute inset-0 scrim-cinematic opacity-80" />
                        </button>
                    ))}
                </div>

                <div className="pointer-events-none absolute left-4 top-4 z-10 flex gap-2">
                    {unescoBadge(false)}
                    {statusBadge(false)}
                </div>

                {count > 1 && (
                    <div
                        className="pointer-events-none absolute bottom-5 left-5 z-10 flex gap-1.5 rounded-full glass-dark px-3 py-2"
                        aria-hidden="true"
                    >
                        {place.images.map((img, i) => (
                            <span
                                key={`${i}-${img}`}
                                className={`h-1.5 rounded-full transition-all duration-500 ease-lux ${
                                    i === activeImage ? "w-5 bg-gold-300" : "w-1.5 bg-white/50"
                                }`}
                            />
                        ))}
                    </div>
                )}

                <button
                    type="button"
                    onClick={() => onOpenLightbox(activeImage)}
                    className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-full glass-dark px-4 py-2.5 text-xs font-semibold text-white"
                >
                    <Images size={14} />
                    {t.allPhotos}
                    <span className="font-display text-sm italic text-gold-300" aria-hidden="true">{count}</span>
                </button>
            </div>

            {/* Desktop bento grid */}
            <div className="mx-auto hidden max-w-7xl px-4 sm:px-6 md:block lg:px-8">
                <div className="relative grid h-[58vh] grid-cols-4 grid-rows-2 gap-3 lg:h-[72vh] lg:max-h-[760px] lg:gap-4">
                    {tiles.map(({ index, cls }) => (
                        <button
                            type="button"
                            key={index}
                            className={`${cls} group relative cursor-pointer overflow-hidden bg-ink-900 shadow-float ${
                                index === 0 ? "rounded-[2rem]" : "rounded-[1.75rem]"
                            }`}
                            onClick={() => onOpenLightbox(index)}
                            aria-label={t.photoOf(place.name, index + 1)}
                        >
                            <span className={`absolute inset-0 ${index === 0 ? "animate-kenburns" : ""}`}>
                                <Image
                                    src={place.images[index]}
                                    alt={t.photoOf(place.name, index + 1)}
                                    fill
                                    priority={index === 0}
                                    sizes={index === 0 ? "50vw" : "25vw"}
                                    className="object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.06]"
                                />
                            </span>
                            <span
                                className={`absolute inset-0 transition-opacity duration-700 ease-lux ${
                                    index === 0
                                        ? "scrim-cinematic opacity-70 group-hover:opacity-50"
                                        : "bg-ink-950/20 group-hover:opacity-0"
                                }`}
                            />
                            {index === 0 && (
                                <span className="absolute left-6 top-6 z-10 flex flex-wrap gap-2">
                                    {unescoBadge(true)}
                                    {statusBadge(true)}
                                </span>
                            )}
                            {index !== 0 && (
                                <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full glass-dark text-white opacity-0 transition-all duration-500 ease-lux group-hover:opacity-100">
                                    <Expand size={14} />
                                </span>
                            )}
                        </button>
                    ))}

                    <button
                        type="button"
                        onClick={() => onOpenLightbox(0)}
                        className="btn-glass-dark absolute bottom-6 right-6 z-20 !bg-ink-950/45 !px-5 shadow-float"
                    >
                        <Images size={17} />
                        {t.showAllPhotos}
                        <span className="font-display text-base italic text-gold-300" aria-hidden="true">{count}</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
