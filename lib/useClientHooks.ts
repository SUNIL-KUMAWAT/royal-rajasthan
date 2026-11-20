"use client";
// Small client hooks shared by the places list, home page and place detail page.
import { useCallback, useEffect, useState } from "react";

const FAVORITES_KEY = "favorite-places";
const FAVORITES_EVENT = "favorite-places-change";

function readFavorites(): number[] {
    try {
        const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
        return Array.isArray(stored) ? stored.filter((n): n is number => typeof n === "number") : [];
    } catch {
        return [];
    }
}

/**
 * Favorite place ids saved in localStorage and kept in sync across every
 * component (and browser tab) that uses this hook.
 */
export function useFavorites() {
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        const sync = () => setFavorites(readFavorites());
        sync();
        window.addEventListener(FAVORITES_EVENT, sync);
        window.addEventListener("storage", sync);
        return () => {
            window.removeEventListener(FAVORITES_EVENT, sync);
            window.removeEventListener("storage", sync);
        };
    }, []);

    const toggleFavorite = useCallback((id: number) => {
        const current = readFavorites();
        const next = current.includes(id) ? current.filter((f) => f !== id) : [...current, id];
        try {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
        } catch {
            /* storage unavailable */
        }
        setFavorites(next);
        window.dispatchEvent(new Event(FAVORITES_EVENT));
    }, []);

    const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites]);

    return { favorites, isFavorite, toggleFavorite };
}

/**
 * Current time on the client, refreshed every minute; null during the server
 * render so markup matches on hydration.
 */
export function useNow(intervalMs = 60_000): Date | null {
    const [now, setNow] = useState<Date | null>(null);
    useEffect(() => {
        setNow(new Date());
        const timer = setInterval(() => setNow(new Date()), intervalMs);
        return () => clearInterval(timer);
    }, [intervalMs]);
    return now;
}
