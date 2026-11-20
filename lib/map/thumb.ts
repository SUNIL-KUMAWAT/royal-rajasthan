// Small, optimised image URLs for map pins and previews, via Next's image optimiser.
// Hosts must match images.remotePatterns in next.config.ts; anything else is used as-is.
const OPTIMISABLE = [
    /^images\.unsplash\.com$/,
    /^plus\.unsplash\.com$/,
    /^upload\.wikimedia\.org$/,
    /\.cloudinary\.com$/,
    /^images\.pexels\.com$/,
    /^cdn\.pixabay\.com$/,
    /^picsum\.photos$/,
    /^www\.tripplannersindia\.com$/,
];

/** Wikimedia's own pre-rendered thumbnail widths (served straight from their CDN). */
const WIKIMEDIA_STEPS = [120, 250, 330, 500, 960, 1280];

/** `width` must be one of next.config's imageSizes/deviceSizes (e.g. 96, 128, 384, 828). */
export function thumb(url: string | undefined, width: 96 | 128 | 384 | 828): string | undefined {
    if (!url) return undefined;
    if (url.startsWith("/")) return `/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=72`;
    try {
        const parsed = new URL(url);
        const host = parsed.hostname;
        // Wikimedia rate-limits server-side fetches (the Next optimiser gets 429s), so use its thumbnail URLs instead
        if (host === "upload.wikimedia.org" || host === "thumb.wikimedia.org") {
            const step = WIKIMEDIA_STEPS.find((s) => s >= width * 1.2) ?? 1280;
            const p = parsed.pathname;
            // Already a thumbnail: .../thumb/a/ab/Name.jpg/960px-Name.jpg
            if (/\/thumb\//.test(p) && /\/\d+px-[^/]+$/.test(p)) return `${parsed.origin}${p.replace(/\/\d+px-([^/]+)$/, `/${step}px-$1`)}`;
            // Original file: .../commons/a/ab/Name.jpg -> .../commons/thumb/a/ab/Name.jpg/<step>px-Name.jpg
            const m = p.match(/^(\/wikipedia\/[^/]+)\/([0-9a-f])\/([0-9a-f]{2})\/([^/]+\.(?:jpe?g|png|webp))$/i);
            if (m) return `${parsed.origin}${m[1]}/thumb/${m[2]}/${m[3]}/${m[4]}/${step}px-${m[4]}`;
            return url;
        }
        if (OPTIMISABLE.some((re) => re.test(host))) return `/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=72`;
    } catch {
        // fall through
    }
    return url;
}
