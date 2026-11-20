// lib/i18n.ts
// URL-based language handling: English lives at "/...", Hindi at "/hi/...".
// Safe to import from both server and client code (no data imports).
import type { Metadata } from "next";

export type Language = "en" | "hi";

export const SITE_URL = "https://rajasthanplaces.in";
export const HINDI_PREFIX = "/hi";

/** Sections that have a Hindi version under /hi. Legal pages stay English-only. */
const HINDI_SECTIONS = [
    "/about",
    "/contact",
    "/culture",
    "/destinations",
    "/festivals",
    "/gallery",
    "/places",
    "/plan-trip",
    "/shopping",
];

export function languageFromPath(pathname: string): Language {
    return pathname === HINDI_PREFIX || pathname.startsWith(`${HINDI_PREFIX}/`) ? "hi" : "en";
}

/** "/hi/places/x" -> "/places/x", "/hi" -> "/" */
export function stripLanguage(pathname: string): string {
    if (languageFromPath(pathname) === "en") return pathname || "/";
    return pathname.slice(HINDI_PREFIX.length) || "/";
}

export function hasHindiVersion(pathname: string): boolean {
    const path = stripLanguage(pathname);
    return path === "/" || HINDI_SECTIONS.some((s) => path === s || path.startsWith(`${s}/`));
}

/**
 * Returns the internal href for the given language. External links, hashes,
 * mailto: etc. are returned unchanged; pages without a Hindi version stay English.
 */
export function localizePath(href: string, lang: Language): string {
    if (!href.startsWith("/") || href.startsWith("//")) return href;
    const cut = href.search(/[?#]/);
    const path = cut === -1 ? href : href.slice(0, cut);
    const rest = cut === -1 ? "" : href.slice(cut);
    const base = stripLanguage(path);
    if (lang === "hi" && hasHindiVersion(base)) {
        return (base === "/" ? HINDI_PREFIX : `${HINDI_PREFIX}${base}`) + rest;
    }
    return base + rest;
}

/** canonical + hreflang alternates for an English path such as "/places". */
export function alternatesFor(path: string, lang: Language = "en"): NonNullable<Metadata["alternates"]> {
    const en = `${SITE_URL}${path === "/" ? "" : path}`;
    const hi = `${SITE_URL}${localizePath(path, "hi")}`;
    const hasHi = hasHindiVersion(path);
    return {
        canonical: lang === "hi" && hasHi ? hi : en,
        languages: hasHi ? { "en-IN": en, "hi-IN": hi, "x-default": en } : undefined,
    };
}

/**
 * Builds Hindi-page metadata from the English page's metadata: Hindi title/description,
 * /hi canonical, hreflang and hi_IN Open Graph locale.
 */
export function hindiMetadata(
    en: Metadata,
    path: string,
    hi: { title?: string; description?: string } = {}
): Metadata {
    const url = `${SITE_URL}${localizePath(path, "hi")}`;
    const title = hi.title ?? en.title;
    const description = hi.description ?? en.description;
    return {
        ...en,
        title,
        description,
        alternates: alternatesFor(path, "hi"),
        openGraph: {
            ...(en.openGraph ?? {}),
            ...(typeof title === "string" ? { title } : {}),
            ...(description ? { description } : {}),
            url,
            locale: "hi_IN",
        },
        twitter: {
            ...(en.twitter ?? {}),
            ...(typeof title === "string" ? { title } : {}),
            ...(description ? { description } : {}),
        },
    };
}
