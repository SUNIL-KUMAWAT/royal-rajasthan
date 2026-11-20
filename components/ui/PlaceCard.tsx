"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Heart, MapPin, Star } from "lucide-react";
import Link from "@/components/LocalizedLink";
import type { PlaceCard as PlaceCardData } from "@/lib/places";

export type PlaceCardText = {
    free: string;
    openNow: string;
    closed: string;
    addFav: string;
    removeFav: string;
    viewDetails: string;
};

type Props = {
    place: PlaceCardData;
    t: PlaceCardText;
    isOpen: boolean;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    /** "card": image + text below. "feature": large bento tile, text over the image. */
    variant?: "card" | "feature";
    priority?: boolean;
    sizes?: string;
    className?: string;
};

/** Shared place card used on the home page and the places listing. */
export function PlaceCard({
    place,
    t,
    isOpen,
    isFavorite,
    onToggleFavorite,
    variant = "card",
    priority,
    sizes = "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
    className = "",
}: Props) {
    const href = `/places/${place.slug}`;
    const price = place.ticket.isFree ? t.free : `₹${place.ticket.indian}`;

    const favButton = (
        <button
            type="button"
            onClick={onToggleFavorite}
            aria-label={isFavorite ? t.removeFav : t.addFav}
            aria-pressed={isFavorite}
            className="absolute right-3 top-3 z-20 grid h-11 w-11 place-items-center rounded-full glass-dark transition-transform duration-300 hover:scale-110 active:scale-95"
        >
            <motion.span key={String(isFavorite)} initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 14 }}>
                <Heart size={17} className={isFavorite ? "fill-rose-500 text-rose-500" : "text-white"} />
            </motion.span>
        </button>
    );

    const badges = (
        <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap gap-1.5 pr-14">
            {place.isUNESCO && (
                <span className="rounded-full glass-dark px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    UNESCO
                </span>
            )}
            <span className="rounded-full glass-dark px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                {place.category}
            </span>
        </div>
    );

    if (variant === "feature") {
        return (
            <article className={`group relative isolate h-full min-h-[22rem] overflow-hidden rounded-[2rem] bg-ink-900 shadow-float-lg ${className}`}>
                <Image
                    src={place.images[0]}
                    alt={`${place.name}, ${place.city}`}
                    fill
                    priority={priority}
                    sizes={sizes}
                    className="-z-10 object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 -z-10 scrim-b" />
                {badges}
                {favButton}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <div className="flex items-center gap-2 text-xs text-ivory-100/80">
                        <MapPin size={12} className="text-gold-300" />
                        {place.city}
                        <span className="opacity-40">•</span>
                        <Star size={12} className="fill-gold-300 text-gold-300" />
                        {place.rating}
                    </div>
                    <h3 className="mt-2 font-display text-3xl font-medium leading-tight text-ivory-50 md:text-4xl">
                        <Link href={href} className="after:absolute after:inset-0 after:content-['']">
                            {place.name}
                        </Link>
                    </h3>
                    <p className="mt-3 line-clamp-2 max-w-md text-sm text-ivory-100/75">{place.description}</p>
                    <div className="mt-5 flex items-center justify-between">
                        <span className="rounded-full glass-dark px-3 py-1.5 text-xs font-semibold text-white">{price}</span>
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-ivory-50 text-ink-900 transition-transform duration-500 ease-lux group-hover:rotate-45">
                            <ArrowUpRight size={18} />
                        </span>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <article
            className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] glass p-2 transition-all duration-500 ease-lux hover:-translate-y-1.5 hover:shadow-float-lg ${className}`}
        >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-ink-100 dark:bg-ink-800">
                <Image
                    src={place.images[0]}
                    alt={`${place.name}, ${place.city}`}
                    fill
                    priority={priority}
                    sizes={sizes}
                    className="object-cover transition-transform duration-[1200ms] ease-lux group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
                {badges}
                {favButton}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full glass-dark px-2.5 py-1 text-xs font-semibold text-white">
                    <Star size={12} className="fill-gold-300 text-gold-300" />
                    {place.rating}
                </div>
            </div>

            <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
                <div className="flex items-center gap-1.5 text-xs text-ink-400 dark:text-ivory-200/60">
                    <MapPin size={12} className="text-gold-600 dark:text-gold-400" />
                    {place.city}
                </div>
                <h3 className="mt-1.5 font-display text-2xl font-medium leading-tight text-ink-900 dark:text-ivory-50">
                    <Link href={href} className="after:absolute after:inset-0 after:z-0 after:content-['']">
                        {place.name}
                    </Link>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500 dark:text-ivory-200/65">{place.description}</p>

                <div className="mt-auto pt-5">
                    <div className="hairline mb-4" />
                    <div className="flex items-center justify-between gap-3 text-xs">
                        <div className="flex min-w-0 items-center gap-3 text-ink-500 dark:text-ivory-200/70">
                            <span className="font-semibold text-ink-900 dark:text-ivory-50">{price}</span>
                            <span className="flex min-w-0 items-center gap-1 truncate">
                                <Clock size={12} className="shrink-0" />
                                <span className="truncate">{place.visitDuration.recommended}</span>
                            </span>
                        </div>
                        <span className={`flex shrink-0 items-center gap-1.5 font-medium ${isOpen ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                            {isOpen ? t.openNow : t.closed}
                        </span>
                    </div>
                </div>
            </div>
            <span className="sr-only">{t.viewDetails}</span>
        </article>
    );
}
