"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Heart, MapPin, Share2, Star } from "lucide-react";
import type { Place } from "@/types";
import { useFavorites } from "@/lib/useClientHooks";
import type { DetailText } from "./text";

type Props = { place: Place; t: DetailText; locale: string };

/** Title, category chips, rating, favorite (saved) and share menu. */
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
        "w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-left";

    return (
        <div className="flex items-start justify-between mb-6 gap-4">
            <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-medium px-2 py-1 rounded-full">
                        {place.category}
                    </span>
                    {place.subcategory && (
                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium px-2 py-1 rounded-full">
                            {place.subcategory}
                        </span>
                    )}
                    {place.isUNESCO && (
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium px-2 py-1 rounded-full">
                            UNESCO ✓
                        </span>
                    )}
                </div>
                <h1 className="font-playfair text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {place.name}
                </h1>
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 flex-wrap">
                    <div className="flex items-center gap-1">
                        <MapPin size={16} className="text-yellow-500" />
                        <span>
                            {place.city}, {place.state}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-gray-800 dark:text-gray-200">{place.rating}</span>
                        <span className="text-sm">{t.reviews(place.reviews.toLocaleString(locale))}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 flex-shrink-0">
                <button
                    type="button"
                    onClick={() => toggleFavorite(place.id)}
                    aria-label={fav ? t.removeFav : t.addFav}
                    aria-pressed={fav}
                    className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                        fav
                            ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-500"
                            : "border-gray-200 dark:border-gray-700 text-gray-400 hover:border-red-200 hover:text-red-400"
                    }`}
                >
                    <Heart size={18} className={fav ? "fill-red-500" : ""} />
                </button>

                <div className="relative" ref={menuRef}>
                    <button
                        type="button"
                        onClick={onShareClick}
                        aria-label={copied ? t.linkCopied : t.share}
                        aria-haspopup="menu"
                        aria-expanded={menuOpen}
                        className="w-11 h-11 rounded-full border border-gray-200 dark:border-gray-700 text-gray-400 flex items-center justify-center hover:border-blue-200 hover:text-blue-400 transition-all"
                    >
                        {copied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
                    </button>

                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                role="menu"
                                initial={{ opacity: 0, scale: 0.9, y: 5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 5 }}
                                className="absolute right-0 top-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 min-w-[180px] overflow-hidden"
                            >
                                <button type="button" role="menuitem" onClick={copyLink} className={menuItemCls}>
                                    📋 {t.copyLink}
                                </button>
                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={() =>
                                        openShare(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${pageUrl()}`)}`)
                                    }
                                    className={menuItemCls}
                                >
                                    💬 WhatsApp
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
                                    🐦 X / Twitter
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
