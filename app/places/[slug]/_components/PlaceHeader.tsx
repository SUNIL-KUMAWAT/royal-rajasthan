"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Heart, MapPin, MessageCircle, Send, Share2, Star } from "lucide-react";
import type { Place } from "@/types";
import { useFavorites } from "@/lib/useClientHooks";
import type { DetailText } from "./text";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = { place: Place; t: DetailText; locale: string };

/** Editorial title block: eyebrow, huge serif name, rating, favorite (saved) and share menu. */
export function PlaceHeader({ place, t, locale }: Props) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const fav = isFavorite(place.id);
    const [menuOpen, setMenuOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close the share menu on outside click / Escape
    useEffect(() => {
        if (!menuOpen) return;
        const onDown = (e: MouseEvent) => {
            if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
        };
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [menuOpen]);

    const shareText = t.shareText(place.name, place.city);
    const pageUrl = () => window.location.href;

    const onShareClick = async () => {
        // Native share sheet where available (mostly mobile), otherwise our menu
        if (navigator.share) {
            try {
                await navigator.share({ title: place.name, text: shareText, url: pageUrl() });
            } catch {
                /* user cancelled */
            }
            return;
        }
        setMenuOpen((o) => !o);
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(pageUrl());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard blocked */
        }
        setMenuOpen(false);
    };

    const openShare = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
        setMenuOpen(false);
    };

    const menuItemCls =
        "flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-medium text-ink-700 transition-colors hover:bg-ink-900/5 dark:text-ivory-100 dark:hover:bg-white/10";
    const roundBtn =
        "grid h-12 w-12 place-items-center rounded-full glass transition-all duration-500 ease-lux hover:-translate-y-0.5 hover:shadow-float active:scale-95";

    return (
        <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
            <div className="min-w-0">
                <span className="eyebrow">
                    {place.category}
                    {place.subcategory && <span className="opacity-60">· {place.subcategory}</span>}
                    <span className="opacity-60">· {place.city}</span>
                </span>

                <h1 className="mt-4 max-w-4xl font-display text-5xl font-medium leading-[1.02] tracking-tight text-ink-900 dark:text-ivory-50 sm:text-6xl lg:text-7xl xl:text-8xl">
                    {place.name}
                </h1>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-ink-500 dark:text-ivory-200/70">
                    <span className="flex items-center gap-1.5">
                        <MapPin size={15} className="text-gold-600 dark:text-gold-400" />
                        {place.city}, {place.state}
                    </span>
                    <span className="h-4 w-px bg-ink-900/15 dark:bg-white/15" aria-hidden="true" />
                    <span className="flex items-center gap-1.5">
                        <Star size={15} className="fill-gold-500 text-gold-500" />
                        <span className="font-display text-lg font-semibold text-ink-900 dark:text-ivory-50">{place.rating}</span>
                        <span>{t.reviews(place.reviews.toLocaleString(locale))}</span>
                    </span>
                    {place.isUNESCO && (
                        <span className="rounded-full bg-gold-400/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-700 ring-1 ring-gold-500/30 dark:text-gold-300">
                            UNESCO ✓
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-shrink-0 gap-2.5">
                <button
                    type="button"
                    onClick={() => toggleFavorite(place.id)}
                    aria-label={fav ? t.removeFav : t.addFav}
                    aria-pressed={fav}
                    className={`${roundBtn} ${fav ? "text-rose-500" : "text-ink-600 hover:text-rose-500 dark:text-ivory-100"}`}
                >
                    <motion.span
                        key={String(fav)}
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 14 }}
                    >
                        <Heart size={18} className={fav ? "fill-rose-500" : ""} />
                    </motion.span>
                </button>

                <div className="relative" ref={menuRef}>
                    <button
                        type="button"
                        onClick={onShareClick}
                        aria-label={copied ? t.linkCopied : t.share}
                        aria-haspopup="menu"
                        aria-expanded={menuOpen}
                        className={`${roundBtn} text-ink-600 hover:text-gold-700 dark:text-ivory-100 dark:hover:text-gold-300`}
                    >
                        {copied ? <Check size={18} className="text-emerald-500" /> : <Share2 size={18} />}
                    </button>

                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                role="menu"
                                initial={{ opacity: 0, scale: 0.94, y: 6 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.94, y: 6 }}
                                transition={{ duration: 0.35, ease: EASE }}
                                className="absolute right-0 top-14 z-50 min-w-[210px] origin-top-right rounded-2xl glass-strong p-1.5 shadow-float-lg"
                            >
                                <button type="button" role="menuitem" onClick={copyLink} className={menuItemCls}>
                                    <Copy size={16} className="text-gold-600 dark:text-gold-400" />
                                    {t.copyLink}
                                </button>
                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={() =>
                                        openShare(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${pageUrl()}`)}`)
                                    }
                                    className={menuItemCls}
                                >
                                    <MessageCircle size={16} className="text-gold-600 dark:text-gold-400" />
                                    WhatsApp
                                </button>
                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={() =>
                                        openShare(
                                            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl())}`
                                        )
                                    }
                                    className={menuItemCls}
                                >
                                    <Send size={16} className="text-gold-600 dark:text-gold-400" />
                                    X / Twitter
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.header>
    );
}
