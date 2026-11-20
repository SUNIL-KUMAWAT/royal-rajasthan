"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bookmark, Calendar, ChevronDown, Compass, List, MapPin, Minus, Plus, RotateCcw, Search, Star, X } from "lucide-react";
import Link from "@/components/LocalizedLink";
import { useLanguage } from "@/components/LanguageProvider";
import { CITY_COORDS, REGIONS } from "@/lib/map/geo";
import type { MapMarker, MapMode, MarkerGroup } from "@/lib/map/types";
import type { CameraInfo, ClusterInfo, OverlayStore, SceneCommand, SceneProps, ZoomLevel } from "./Scene";
import { GROUP_STYLE } from "./markerStyle";
import { thumb } from "@/lib/map/thumb";
import { Pin } from "./Pins";

/** A scene command without its nonce (distributes over the union). */
type CommandInput = SceneCommand extends infer C ? (C extends SceneCommand ? Omit<C, "nonce"> : never) : never;

const Scene = memo(dynamic<SceneProps>(() => import("./Scene"), { ssr: false }));

// ---------------------------------------------------------------------------
// Copy
// ---------------------------------------------------------------------------

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHS_HI = ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];

const T = {
    en: {
        modes: { places: "Places", festivals: "Festivals", shopping: "Shopping" },
        search: "Search cities, forts, lakes, festivals…",
        searchShort: "Search",
        list: "List view",
        all: "All",
        upcoming: "Upcoming",
        layers: "Layers",
        explore: "Explore",
        save: "Save",
        soon: "Coming soon",
        close: "Close",
        bestTime: "Best time to visit",
        when: "When",
        markets: "Markets",
        nearby: "Nearby",
        reset: "Reset view",
        north: "Face north",
        zoomIn: "Zoom in",
        zoomOut: "Zoom out",
        levels: { 1: "State", 2: "Region", 3: "City", 4: "Spot" } as Record<ZoomLevel, string>,
        loading: "Entering Rajasthan",
        hint: "Drag to move · Scroll to zoom in (the view tilts) · Right-drag to turn · Click a photo pin",
        top: {
            places: "Top destinations",
            festivals: "Upcoming festivals",
            shopping: "Top shopping cities",
        },
        credit: "Imagery: NASA Blue Marble; Sentinel-2 cloudless 2016 by EOX (Copernicus data, CC BY 4.0) · Elevation: SRTM via AWS Terrain Tiles",
        hintTouch: "Drag to move · Pinch to zoom · Two fingers to turn · Tap a photo",
        browse: "Browse as list",
        noWebgl: "Your browser can't show the 3D map. Browse every destination as a list below.",
        noResults: "No matches",
        city: "City",
        allIn: (n: number, mode: string) => `${n} ${mode}`,
        listTitle: {
            places: "All places",
            festivals: "All festivals",
            shopping: "Markets by district",
        },
        open: "Open page",
    },
    hi: {
        modes: { places: "स्थान", festivals: "त्यौहार", shopping: "खरीदारी" },
        search: "शहर, किले, झीलें, त्यौहार खोजें…",
        searchShort: "खोजें",
        list: "सूची",
        all: "सभी",
        upcoming: "आने वाले",
        layers: "परतें",
        explore: "देखें",
        save: "सेव",
        soon: "जल्द आ रहा है",
        close: "बंद करें",
        bestTime: "घूमने का सही समय",
        when: "कब",
        markets: "बाज़ार",
        nearby: "आस-पास",
        reset: "पूरा नक्शा",
        north: "उत्तर दिशा",
        zoomIn: "ज़ूम इन",
        zoomOut: "ज़ूम आउट",
        levels: { 1: "राज्य", 2: "क्षेत्र", 3: "शहर", 4: "स्थल" } as Record<ZoomLevel, string>,
        loading: "राजस्थान में प्रवेश",
        hint: "खींचें · स्क्रॉल से ज़ूम (नज़ारा झुकेगा) · राइट-ड्रैग से घुमाएँ · फ़ोटो पिन पर क्लिक करें",
        top: {
            places: "प्रमुख स्थल",
            festivals: "आने वाले त्यौहार",
            shopping: "प्रमुख खरीदारी शहर",
        },
        credit: "चित्र: NASA Blue Marble; Sentinel-2 cloudless 2016, EOX (Copernicus डेटा, CC BY 4.0) · ऊँचाई: SRTM (AWS Terrain Tiles)",
        hintTouch: "खींचें · पिंच से ज़ूम · मार्कर पर टैप करें",
        browse: "सूची में देखें",
        noWebgl: "आपका ब्राउज़र 3D नक्शा नहीं दिखा सकता। नीचे सूची में सभी स्थान देखें।",
        noResults: "कुछ नहीं मिला",
        city: "शहर",
        allIn: (n: number, mode: string) => `${n} ${mode}`,
        listTitle: {
            places: "सभी स्थान",
            festivals: "सभी त्यौहार",
            shopping: "ज़िलेवार बाज़ार",
        },
        open: "पेज खोलें",
    },
};

type Copy = (typeof T)["en"];

// ---------------------------------------------------------------------------
// Filters
// ---------------------------------------------------------------------------

const PLACE_GROUPS: MarkerGroup[] = ["heritage", "lake", "nature", "spiritual", "desert"];

function useToday() {
    const [today, setToday] = useState<Date | null>(null);
    useEffect(() => setToday(new Date()), []);
    return today;
}

function matchesFilter(m: MapMarker, filter: string, today: Date | null): boolean {
    if (filter === "all") return true;
    if (m.mode === "places") return m.group === filter;
    if (m.mode === "festivals") {
        if (filter === "upcoming") {
            if (!m.nextDate || !today) return false;
            const d = new Date(m.nextDate).getTime();
            const t = today.getTime() - 86400000;
            return d >= t && d <= t + 120 * 86400000;
        }
        return (m.month || "").toLowerCase().includes(filter.toLowerCase());
    }
    return true;
}

// ---------------------------------------------------------------------------
// Small hooks
// ---------------------------------------------------------------------------

function useMedia(query: string, initial = false) {
    const [match, setMatch] = useState(initial);
    useEffect(() => {
        const mq = window.matchMedia(query);
        const on = () => setMatch(mq.matches);
        on();
        mq.addEventListener("change", on);
        return () => mq.removeEventListener("change", on);
    }, [query]);
    return match;
}

function distanceKm(a: MapMarker, b: MapMarker) {
    const r = Math.PI / 180;
    const x = (b.lng - a.lng) * r * Math.cos(((a.lat + b.lat) / 2) * r);
    const y = (b.lat - a.lat) * r;
    return Math.sqrt(x * x + y * y) * 6371;
}

// ---------------------------------------------------------------------------
// HUD pieces
// ---------------------------------------------------------------------------

const glass = "border border-white/10 bg-[#101722]/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]";

function CompassTape({ heading }: { heading: number }) {
    const ppd = 2.2; // px per degree
    const width = 300;
    const ticks = useMemo(() => {
        const out: { deg: number; label?: string }[] = [];
        const names: Record<number, string> = {
            0: "N",
            45: "NE",
            90: "E",
            135: "SE",
            180: "S",
            225: "SW",
            270: "W",
            315: "NW",
        };
        for (let d = -180; d <= 540; d += 15) out.push({ deg: d, label: names[((d % 360) + 360) % 360] });
        return out;
    }, []);
    return (
        <div className="relative h-9 overflow-hidden" style={{ width }} aria-hidden>
            <div
                className="absolute top-0 h-full"
                style={{
                    transform: `translateX(${width / 2 - (heading + 180) * ppd}px)`,
                    width: 720 * ppd,
                }}
            >
                {ticks.map((t) => (
                    <div key={t.deg} className="absolute top-0 flex flex-col items-center" style={{ left: (t.deg + 180) * ppd, transform: "translateX(-50%)" }}>
                        <span className={`w-px ${t.label ? "h-2.5 bg-[#F5EBDD]/80" : "h-1.5 bg-[#F5EBDD]/35"}`} />
                        {t.label && (
                            <span className={`mt-0.5 text-[10px] font-semibold tracking-wider ${t.label === "N" ? "text-[#D6A85C]" : "text-[#F5EBDD]/75"}`}>
                                {t.label}
                            </span>
                        )}
                    </div>
                ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0c121c] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0c121c] to-transparent" />
            <div className="absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 border-x-[5px] border-t-[6px] border-x-transparent border-t-[#D6A85C]" />
        </div>
    );
}

function RailButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            title={label}
            className="flex h-10 w-10 items-center justify-center text-[#F5EBDD]/85 transition hover:bg-white/5 hover:text-[#D6A85C] focus-visible:text-[#D6A85C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D6A85C]/70"
        >
            {children}
        </button>
    );
}

function SearchBox({
    markers,
    language,
    copy,
    onPickMarker,
    onPickCity,
    autoFocus,
    onClose,
}: {
    markers: MapMarker[];
    language: "en" | "hi";
    copy: Copy;
    onPickMarker: (m: MapMarker) => void;
    onPickCity: (name: string, lat: number, lng: number) => void;
    autoFocus?: boolean;
    onClose?: () => void;
}) {
    const [q, setQ] = useState("");
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const hi = language === "hi";

    const results = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (s.length < 2) return [];
        type R = { kind: "marker"; m: MapMarker; score: number } | { kind: "city"; name: string; lat: number; lng: number; score: number };
        const out: R[] = [];
        const seenCities = new Set<string>();
        for (const m of markers) {
            const names = [m.name, m.nameHi].map((x) => x.toLowerCase());
            const cities = [m.city, m.cityHi].map((x) => x.toLowerCase());
            let score = 0;
            if (names.some((n) => n.startsWith(s))) score = 3;
            else if (names.some((n) => n.includes(s))) score = 2;
            else if (cities.some((c) => c.includes(s))) score = 1;
            if (score) out.push({ kind: "marker", m, score: score + m.priority / 1000 });
        }
        for (const [name, [lat, lng]] of Object.entries(CITY_COORDS)) {
            if (name.startsWith(s) && !name.includes("rural") && !seenCities.has(name)) {
                seenCities.add(name);
                out.push({
                    kind: "city",
                    name: name.replace(/\b\w/g, (c) => c.toUpperCase()),
                    lat,
                    lng,
                    score: 3.5,
                });
            }
        }
        return out.sort((a, b) => b.score - a.score).slice(0, 8);
    }, [q, markers]);

    const pick = (i: number) => {
        const r = results[i];
        if (!r) return;
        if (r.kind === "marker") onPickMarker(r.m);
        else onPickCity(r.name, r.lat, r.lng);
        setQ("");
        setOpen(false);
        onClose?.();
    };

    return (
        <div className="relative w-full">
            <div className={`flex h-11 items-center gap-2 rounded-full px-4 ${glass} focus-within:border-[#D6A85C]/60`}>
                <Search size={16} className="shrink-0 text-[#D6A85C]" />
                <input
                    autoFocus={autoFocus}
                    value={q}
                    onChange={(e) => {
                        setQ(e.target.value);
                        setOpen(true);
                        setActive(0);
                    }}
                    onFocus={() => setOpen(true)}
                    onBlur={() => setTimeout(() => setOpen(false), 150)}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setActive((a) => Math.min(a + 1, results.length - 1));
                        } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            setActive((a) => Math.max(a - 1, 0));
                        } else if (e.key === "Enter") {
                            pick(active);
                        } else if (e.key === "Escape") {
                            setOpen(false);
                            onClose?.();
                        }
                    }}
                    placeholder={copy.search}
                    aria-label={copy.search}
                    role="combobox"
                    aria-expanded={open && results.length > 0}
                    aria-controls="map-search-results"
                    className="w-full bg-transparent text-sm text-[#F5EBDD] placeholder:text-[#8e9bb0] focus:outline-none"
                />
                {onClose && (
                    <button type="button" onClick={onClose} aria-label={copy.close} className="text-[#8e9bb0] hover:text-[#F5EBDD]">
                        <X size={16} />
                    </button>
                )}
            </div>
            {open && q.trim().length >= 2 && (
                <ul
                    id="map-search-results"
                    role="listbox"
                    className={`absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl py-1.5 ${glass} bg-[#101722]/95`}
                >
                    {results.length === 0 && <li className="px-4 py-3 text-sm text-[#8e9bb0]">{copy.noResults}</li>}
                    {results.map((r, i) => {
                        const isCity = r.kind === "city";
                        const style = isCity ? null : GROUP_STYLE[r.m.group];
                        const Icon = style ? style.icon : MapPin;
                        return (
                            <li key={isCity ? `c-${r.name}` : r.m.id} role="option" aria-selected={i === active}>
                                <button
                                    type="button"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => pick(i)}
                                    onMouseEnter={() => setActive(i)}
                                    className={`flex w-full items-center gap-3 px-4 py-2 text-left transition ${i === active ? "bg-white/[0.06]" : ""}`}
                                >
                                    <span
                                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border"
                                        style={{
                                            borderColor: style?.color ?? "#D6A85C",
                                            color: style?.color ?? "#D6A85C",
                                        }}
                                    >
                                        <Icon size={14} />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate text-sm text-[#F5EBDD]">{isCity ? r.name : hi ? r.m.nameHi : r.m.name}</span>
                                        <span className="block truncate text-[11px] text-[#8e9bb0]">
                                            {isCity ? copy.city : `${hi ? r.m.cityHi : r.m.city} · ${copy.modes[r.m.mode]}`}
                                        </span>
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

function PreviewPanel({
    marker,
    nearby,
    copy,
    language,
    mobile,
    onClose,
    onSelect,
}: {
    marker: MapMarker;
    nearby: MapMarker[];
    copy: Copy;
    language: "en" | "hi";
    mobile: boolean;
    onClose: () => void;
    onSelect: (id: string) => void;
}) {
    const hi = language === "hi";
    const style = GROUP_STYLE[marker.group];
    const Icon = style.icon;
    const timeLabel = marker.mode === "places" ? copy.bestTime : marker.mode === "festivals" ? copy.when : copy.markets;
    const timeValue = marker.mode === "shopping" ? (hi ? marker.categoryHi : marker.category) : hi ? marker.bestTimeHi : marker.bestTime;

    return (
        <motion.aside
            key={marker.id}
            role="dialog"
            aria-label={hi ? marker.nameHi : marker.name}
            initial={mobile ? { y: "100%" } : { x: 40, opacity: 0 }}
            animate={mobile ? { y: 0 } : { x: 0, opacity: 1 }}
            exit={mobile ? { y: "100%" } : { x: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            drag={mobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
                if (info.offset.y > 90) onClose();
            }}
            className={`pointer-events-auto absolute z-40 flex flex-col overflow-hidden ${glass} bg-[#101722]/85 ${
                mobile ? "inset-x-0 bottom-0 max-h-[54dvh] rounded-t-3xl" : "bottom-5 right-5 top-24 w-[380px] rounded-3xl"
            }`}
        >
            {mobile && <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-white/25" />}
            <div className={`relative shrink-0 ${mobile ? "mx-3 mt-2 h-36 overflow-hidden rounded-2xl" : "h-52"}`}>
                {marker.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumb(marker.image, 828)} alt={hi ? marker.nameHi : marker.name} className="h-full w-full object-cover" />
                ) : (
                    <div
                        className="flex h-full w-full flex-col items-center justify-center gap-2 text-white"
                        style={{
                            background: `radial-gradient(circle at 30% 25%, ${style.color}dd 0%, ${style.color}55 45%, #101722 100%)`,
                        }}
                    >
                        <Icon size={44} strokeWidth={1.8} style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }} />
                        <span className="text-[11px] uppercase tracking-[0.2em] text-white/70">{hi ? "फ़ोटो जल्द" : "Photo coming soon"}</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101722] via-[#101722]/10 to-transparent" />
                <button
                    type="button"
                    onClick={onClose}
                    aria-label={copy.close}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition hover:border-[#D6A85C]/70 hover:text-[#D6A85C]"
                >
                    <X size={16} />
                </button>
                <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-2.5 py-1 text-[11px] font-medium text-[#F5EBDD] backdrop-blur-md">
                    <Icon size={12} style={{ color: style.color }} />
                    {hi ? marker.categoryHi : marker.category}
                </span>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pb-5 pt-3">
                <div>
                    <h2 className="font-playfair text-2xl font-semibold leading-tight text-[#F5EBDD]">{hi ? marker.nameHi : marker.name}</h2>
                    <p className="mt-1 flex items-center gap-3 text-[13px] text-[#9aa7bb]">
                        <span className="flex items-center gap-1">
                            <MapPin size={13} className="text-[#D6A85C]" />
                            {hi ? marker.cityHi : marker.city}
                        </span>
                        {marker.rating ? (
                            <span className="flex items-center gap-1">
                                <Star size={13} className="fill-[#D6A85C] text-[#D6A85C]" />
                                {marker.rating.toFixed(1)}
                            </span>
                        ) : null}
                    </p>
                </div>

                <p className="text-sm leading-relaxed text-[#cfd6e2]">{hi ? marker.descriptionHi : marker.description}</p>

                {timeValue && (
                    <div className="flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-3">
                        <Calendar size={16} className="mt-0.5 shrink-0 text-[#D6A85C]" />
                        <div>
                            <div className="text-[11px] uppercase tracking-wider text-[#8e9bb0]">{timeLabel}</div>
                            <div className="text-sm text-[#F5EBDD]">{timeValue}</div>
                        </div>
                    </div>
                )}

                {nearby.length > 0 && (
                    <div>
                        <div className="mb-2 text-[11px] uppercase tracking-wider text-[#8e9bb0]">{copy.nearby}</div>
                        <div className="flex flex-col gap-1">
                            {nearby.map((n) => {
                                const s = GROUP_STYLE[n.group];
                                const NIcon = s.icon;
                                return (
                                    <button
                                        key={n.id}
                                        type="button"
                                        onClick={() => onSelect(n.id)}
                                        className="flex items-center gap-3 rounded-xl px-2 py-1.5 text-left transition hover:bg-white/[0.05]"
                                    >
                                        <NIcon size={14} style={{ color: s.color }} className="shrink-0" />
                                        <span className="min-w-0 flex-1 truncate text-sm text-[#e3e8f0]">{hi ? n.nameHi : n.name}</span>
                                        <span className="shrink-0 text-[11px] text-[#8e9bb0]">{Math.max(1, Math.round(distanceKm(marker, n)))} km</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="mt-auto flex gap-2 pt-1">
                    <Link
                        href={marker.href}
                        className="group flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#e9c37f] text-sm font-semibold text-[#101722] shadow-[0_6px_24px_rgba(214,168,92,0.35)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5EBDD]"
                    >
                        {copy.explore}
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <button
                        type="button"
                        disabled
                        title={copy.soon}
                        aria-label={`${copy.save} — ${copy.soon}`}
                        className="flex h-11 items-center gap-1.5 rounded-full border border-white/10 px-4 text-sm text-[#8e9bb0] opacity-70"
                    >
                        <Bookmark size={15} />
                        {copy.save}
                    </button>
                </div>
            </div>
        </motion.aside>
    );
}

/** Closest camera distance (Scene's MIN_DIST); kept here so this file doesn't pull in three.js. */
const MIN_ZOOM_DIST = 3;

function ListPanel({
    markers,
    mode,
    copy,
    language,
    mobile,
    title,
    onSelect,
    onClose,
}: {
    markers: MapMarker[];
    mode: MapMode;
    copy: Copy;
    language: "en" | "hi";
    mobile: boolean;
    /** Overrides the layer title (a cluster's place name). */
    title?: string;
    onSelect: (id: string) => void;
    onClose: () => void;
}) {
    const hi = language === "hi";
    const groups = useMemo(() => {
        const map = new Map<string, MapMarker[]>();
        for (const m of [...markers].sort((a, b) => b.priority - a.priority)) {
            const key = hi ? m.cityHi : m.city;
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(m);
        }
        return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length);
    }, [markers, hi]);

    return (
        <motion.aside
            initial={mobile ? { y: "100%" } : { x: -40, opacity: 0 }}
            animate={mobile ? { y: 0 } : { x: 0, opacity: 1 }}
            exit={mobile ? { y: "100%" } : { x: -40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            aria-label={title ?? copy.listTitle[mode]}
            className={`pointer-events-auto absolute z-40 flex flex-col overflow-hidden ${glass} bg-[#101722]/90 ${
                mobile ? "inset-x-0 bottom-0 max-h-[70dvh] rounded-t-3xl" : "bottom-5 left-5 top-24 w-[340px] rounded-3xl"
            }`}
        >
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                <div>
                    <h2 className="font-playfair text-lg text-[#F5EBDD]">{title ?? copy.listTitle[mode]}</h2>
                    <p className="text-[11px] text-[#8e9bb0]">{copy.allIn(markers.length, copy.modes[mode])}</p>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label={copy.close}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#8e9bb0] hover:bg-white/5 hover:text-[#F5EBDD]"
                >
                    <X size={16} />
                </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-3 py-2">
                {groups.map(([city, list]) => (
                    <div key={city} className="mb-2">
                        <div className="sticky top-0 z-10 bg-[#101722]/95 px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#D6A85C]">
                            {city} <span className="text-[#8e9bb0]">· {list.length}</span>
                        </div>
                        {list.map((m) => {
                            const s = GROUP_STYLE[m.group];
                            const Icon = s.icon;
                            return (
                                <button
                                    key={m.id}
                                    type="button"
                                    onClick={() => onSelect(m.id)}
                                    className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-white/[0.05] focus-visible:bg-white/[0.06] focus-visible:outline-none"
                                >
                                    <Icon size={15} style={{ color: s.color }} className="shrink-0" />
                                    <span className="min-w-0 flex-1 truncate text-sm text-[#e3e8f0]">{hi ? m.nameHi : m.name}</span>
                                    <span className="shrink-0 text-[11px] text-[#8e9bb0]">{hi ? m.categoryHi : m.category}</span>
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
        </motion.aside>
    );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

export default function MapExperience({ markers }: { markers: MapMarker[] }) {
    const { language, toggleLanguage } = useLanguage();
    const copy = T[language];
    const hi = language === "hi";
    const today = useToday();

    const [mode, setMode] = useState<MapMode>("places");
    const [filter, setFilter] = useState("all");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [listOpen, setListOpen] = useState(false);
    /** When set, the list shows only these markers (a cluster that can't be split by zooming). */
    const [listIds, setListIds] = useState<string[] | null>(null);
    const [mobileSearch, setMobileSearch] = useState(false);
    const [command, setCommand] = useState<SceneCommand | null>(null);
    const [cam, setCam] = useState<CameraInfo>({
        heading: 0,
        level: 1,
        distance: 100,
        lat: 26.6,
        lng: 73.87,
    });
    const [ready, setReady] = useState(false);
    const [webgl, setWebgl] = useState<boolean | null>(null);
    const [interacted, setInteracted] = useState(false);
    const [clusters, setClusters] = useState<ClusterInfo[]>([]);
    const overlay = useRef<OverlayStore>({
        els: new Map(),
        regionEls: [],
    }).current;

    const mobile = useMedia("(max-width: 767px)");
    const coarse = useMedia("(pointer: coarse)");
    const reducedMotion = useMedia("(prefers-reduced-motion: reduce)");
    const quality: "high" | "low" = mobile || coarse ? "low" : "high";

    const nonce = useRef(0);
    const send = useCallback((c: CommandInput) => {
        nonce.current += 1;
        setCommand({ ...c, nonce: nonce.current } as SceneCommand);
    }, []);

    const markerById = useMemo(() => new Map(markers.map((m) => [m.id, m])), [markers]);

    /**
     * Fly in until a cluster's members separate. At full zoom they can still overlap (places in the
     * same spot), so then list them instead.
     */
    const zoomInto = useCallback(
        (ids: string[], currentDistance: number) => {
            const list = ids.map((id) => markerById.get(id)).filter((m): m is MapMarker => !!m);
            if (!list.length) return;
            const lats = list.map((m) => m.lat);
            const lngs = list.map((m) => m.lng);
            const lat = (Math.min(...lats) + Math.max(...lats)) / 2;
            const lng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
            const spanUnits = Math.max(Math.max(...lats) - Math.min(...lats), Math.max(...lngs) - Math.min(...lngs)) * 10;
            const distance = Math.max(Math.min(Math.max(spanUnits * 2.4, 4.5), currentDistance * 0.55), MIN_ZOOM_DIST);
            if (distance > currentDistance * 0.85) {
                setSelectedId(null);
                setListIds(list.map((m) => m.id));
                setListOpen(true);
                return;
            }
            send({ type: "fly", lat, lng, distance });
        },
        [markerById, send],
    );

    useEffect(() => {
        try {
            const c = document.createElement("canvas");
            setWebgl(!!(c.getContext("webgl2") || c.getContext("webgl")));
        } catch {
            setWebgl(false);
        }
    }, []);

    const visible = useMemo(() => markers.filter((m) => m.mode === mode && matchesFilter(m, filter, today)), [markers, mode, filter, today]);
    const selected = useMemo(() => markers.find((m) => m.id === selectedId) ?? null, [markers, selectedId]);
    const listMarkers = useMemo(() => (listIds ? visible.filter((m) => listIds.includes(m.id)) : visible), [visible, listIds]);

    /** Bottom strip: the best of the current layer (upcoming first for festivals). */
    const featured = useMemo(() => {
        let list = [...visible].sort((a, b) => b.priority - a.priority);
        if (mode === "festivals" && today) {
            const t = today.getTime() - 86400000;
            const upcoming = list
                .filter((m) => m.nextDate && new Date(m.nextDate).getTime() >= t)
                .sort((a, b) => new Date(a.nextDate!).getTime() - new Date(b.nextDate!).getTime());
            list = [...upcoming, ...list.filter((m) => !upcoming.includes(m))];
        }
        return list.slice(0, 12);
    }, [visible, mode, today]);
    const nearby = useMemo(() => {
        if (!selected) return [];
        return markers
            .filter((m) => m.mode === selected.mode && m.id !== selected.id)
            .map((m) => ({ m, d: distanceKm(selected, m) }))
            .sort((a, b) => a.d - b.d)
            .slice(0, 3)
            .map((x) => x.m);
    }, [markers, selected]);

    const filters = useMemo(() => {
        if (mode === "places") {
            return [
                {
                    id: "all",
                    label: copy.all,
                    color: "#D6A85C",
                    count: markers.filter((m) => m.mode === "places").length,
                },
                ...PLACE_GROUPS.map((g) => ({
                    id: g,
                    label: hi ? GROUP_STYLE[g].labelHi : GROUP_STYLE[g].label,
                    color: GROUP_STYLE[g].color,
                    count: markers.filter((m) => m.mode === "places" && m.group === g).length,
                })).filter((f) => f.count > 0),
            ];
        }
        if (mode === "festivals") {
            const fest = markers.filter((m) => m.mode === "festivals");
            return [
                { id: "all", label: copy.all, color: "#E07F8A", count: fest.length },
                {
                    id: "upcoming",
                    label: copy.upcoming,
                    color: "#D6A85C",
                    count: fest.filter((m) => matchesFilter(m, "upcoming", today)).length,
                },
                ...MONTHS.map((mo, i) => ({
                    id: mo,
                    label: hi ? MONTHS_HI[i] : mo.slice(0, 3),
                    color: "#E07F8A",
                    count: fest.filter((m) => matchesFilter(m, mo, today)).length,
                })).filter((f) => f.count > 0),
            ];
        }
        return [];
    }, [mode, markers, copy, hi, today]);

    const handleSelect = useCallback((id: string | null) => {
        setSelectedId(id);
        if (id) setListOpen(false);
    }, []);

    const pickMarker = useCallback((m: MapMarker) => {
        setMode(m.mode);
        setFilter("all");
        setSelectedId(m.id);
        setListOpen(false);
    }, []);

    const switchMode = (m: MapMode) => {
        if (m === mode) return;
        setMode(m);
        setFilter("all");
        setSelectedId(null);
    };

    const onCamera = useCallback((info: CameraInfo) => setCam(info), []);
    const onReady = useCallback(() => setReady(true), []);

    // The controls hint is a first-visit nudge: hide it after a few seconds
    useEffect(() => {
        if (!ready) return;
        const t = setTimeout(() => setInteracted(true), 11000);
        return () => clearTimeout(t);
    }, [ready]);

    // Esc closes the topmost layer
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== "Escape") return;
            if (mobileSearch) setMobileSearch(false);
            else if (selectedId) setSelectedId(null);
            else if (listOpen) setListOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [mobileSearch, selectedId, listOpen]);

    const panelOpen = !!selected;
    const levelName = copy.levels[cam.level];

    return (
        <section
            aria-label={hi ? "राजस्थान का 3D नक्शा" : "Interactive 3D map of Rajasthan"}
            className="relative h-[100dvh] min-h-[560px] w-full select-none overflow-hidden bg-[#080C14] text-[#F5EBDD]"
            onPointerDown={() => !interacted && setInteracted(true)}
        >
            {/* 3D world */}
            <div className="absolute inset-0 z-0">
                {webgl && (
                    <Scene
                        markers={visible}
                        selectedId={selectedId}
                        language={language}
                        command={command}
                        quality={quality}
                        reducedMotion={reducedMotion}
                        panelSide={mobile ? "bottom" : "right"}
                        onSelect={handleSelect}
                        overlay={overlay}
                        onClusters={setClusters}
                        onCamera={onCamera}
                        onReady={onReady}
                    />
                )}
            </div>

            {/* Region names + map pins (positioned by the scene every frame) */}
            <div className="pointer-events-none absolute inset-0 z-[6] overflow-hidden">
                {REGIONS.map((r, i) => (
                    <span
                        key={r.name}
                        ref={(el) => {
                            overlay.regionEls[i] = el;
                        }}
                        aria-hidden
                        className="absolute left-0 top-0 select-none whitespace-nowrap font-playfair text-[12px] uppercase tracking-[0.35em] text-[#F5EBDD] md:text-[15px]"
                        style={{ opacity: 0, textShadow: "0 1px 8px rgba(8,12,20,0.9)" }}
                    >
                        {hi ? r.nameHi : r.name}
                    </span>
                ))}
                {clusters.map((c) => {
                    const m = markerById.get(c.id);
                    if (!m) return null;
                    const count = c.memberIds.length;
                    // A cluster wears the photo of its best member that has a real one (same city label)
                    const face = count > 1 ? (c.memberIds.map((id) => markerById.get(id)).find((x) => x?.image && x.city === m.city) ?? m) : m;
                    return (
                        <div
                            key={c.id}
                            ref={(el) => {
                                if (el) overlay.els.set(c.id, el);
                                else overlay.els.delete(c.id);
                            }}
                            className="absolute left-0 top-0 will-change-transform"
                            style={{ visibility: "hidden" }}
                        >
                            <Pin
                                marker={face}
                                count={count}
                                selected={c.id === selectedId && count === 1}
                                dimmed={!!selectedId && c.id !== selectedId}
                                showLabel={cam.distance < 16}
                                compact={mobile}
                                language={language}
                                onClick={() => (count > 1 ? zoomInto(c.memberIds, cam.distance) : handleSelect(c.id))}
                                onDoubleClick={() => send({ type: "fly", lat: m.lat, lng: m.lng, distance: 6 })}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Vignette for cinematic depth */}
            <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(8,12,20,0.75)_100%)]" />

            {/* ---------------- Top HUD ---------------- */}
            <header className="pointer-events-none absolute inset-x-0 top-0 z-[45] px-3 pt-3 md:px-5 md:pt-4">
                <div className="flex items-center justify-between gap-3">
                    <Link
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            setSelectedId(null);
                            send({ type: "reset" });
                        }}
                        className="group pointer-events-auto relative -my-1 block shrink-0 rounded-2xl border border-[#D6A85C]/70 bg-[#F8F0E3]/95 px-1.5 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A85C]"
                        aria-label="Rajasthan Places and Festivals — reset map"
                    >
                        {/* The logo is drawn for a light background: show it on a cream plaque so its maroon lettering reads */}
                        <Image
                            src={hi ? "/hindi-logo-bg.png" : "/english-logo-bg.png"}
                            alt={hi ? "राजस्थान प्लेसेज़ एंड फ़ेस्टिवल्स" : "Rajasthan Places and Festivals"}
                            width={hi ? 516 : 509}
                            height={hi ? 484 : 490}
                            priority
                            sizes="96px"
                            className="h-12 w-auto object-contain md:h-[76px]"
                        />
                    </Link>

                    {/* Mode tabs (desktop center) */}
                    <nav aria-label={hi ? "नक्शा मोड" : "Map mode"} className={`pointer-events-auto hidden rounded-full p-1 md:flex ${glass}`}>
                        {(["places", "festivals", "shopping"] as MapMode[]).map((m) => (
                            <button
                                key={m}
                                type="button"
                                onClick={() => switchMode(m)}
                                aria-pressed={mode === m}
                                className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A85C]/70 ${
                                    mode === m ? "text-[#101722]" : "text-[#F5EBDD]/80 hover:text-[#F5EBDD]"
                                }`}
                            >
                                {mode === m && (
                                    <motion.span
                                        layoutId="map-mode-pill"
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#e9c37f] shadow-[0_0_20px_rgba(214,168,92,0.45)]"
                                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                                    />
                                )}
                                <span className="relative">{copy.modes[m]}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="pointer-events-auto flex items-center gap-2">
                        <div className="hidden w-72 lg:block">
                            <SearchBox
                                markers={markers}
                                language={language}
                                copy={copy}
                                onPickMarker={pickMarker}
                                onPickCity={(_, lat, lng) => send({ type: "fly", lat, lng, distance: 16 })}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setMobileSearch(true)}
                            aria-label={copy.searchShort}
                            className={`flex h-11 w-11 items-center justify-center rounded-full text-[#D6A85C] lg:hidden ${glass}`}
                        >
                            <Search size={18} />
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setListOpen((o) => !o);
                                setListIds(null);
                                setSelectedId(null);
                            }}
                            aria-pressed={listOpen}
                            aria-label={copy.list}
                            title={copy.list}
                            className={`flex h-11 w-11 items-center justify-center rounded-full transition ${glass} ${listOpen ? "text-[#D6A85C] ring-1 ring-[#D6A85C]/60" : "text-[#F5EBDD]/85"}`}
                        >
                            <List size={18} />
                        </button>
                        <button
                            type="button"
                            onClick={toggleLanguage}
                            aria-label={hi ? "Switch to English" : "हिंदी में देखें"}
                            className={`flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-xs font-bold tracking-wider text-[#F5EBDD]/85 hover:text-[#D6A85C] ${glass}`}
                        >
                            {hi ? "EN" : "हिं"}
                        </button>
                    </div>
                </div>

                {/* Mobile tabs */}
                <nav aria-label={hi ? "नक्शा मोड" : "Map mode"} className={`pointer-events-auto mt-2.5 flex rounded-full p-1 md:hidden ${glass}`}>
                    {(["places", "festivals", "shopping"] as MapMode[]).map((m) => (
                        <button
                            key={m}
                            type="button"
                            onClick={() => switchMode(m)}
                            aria-pressed={mode === m}
                            className={`relative flex-1 rounded-full py-2 text-[13px] font-semibold ${mode === m ? "text-[#101722]" : "text-[#F5EBDD]/80"}`}
                        >
                            {mode === m && (
                                <motion.span
                                    layoutId="map-mode-pill-m"
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#e9c37f]"
                                />
                            )}
                            <span className="relative">{copy.modes[m]}</span>
                        </button>
                    ))}
                </nav>

                {/* Compass (desktop) */}
                <div className="mt-3 hidden justify-center md:flex">
                    <button
                        type="button"
                        onClick={() => send({ type: "north" })}
                        title={copy.north}
                        aria-label={`${copy.north} (${Math.round(cam.heading)}°)`}
                        className={`pointer-events-auto flex flex-col items-center rounded-2xl px-2 pb-1 pt-1.5 ${glass} bg-[#0c121c]/60`}
                    >
                        <CompassTape heading={cam.heading} />
                        <span className="text-[10px] font-semibold tabular-nums text-[#D6A85C]">{String(Math.round(cam.heading) % 360).padStart(3, "0")}°</span>
                    </button>
                </div>

                {/* Mobile filter chips */}
                {filters.length > 0 && (
                    <div className="pointer-events-auto -mx-3 mt-2 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] md:hidden">
                        {filters.map((f) => (
                            <button
                                key={f.id}
                                type="button"
                                onClick={() => setFilter(f.id)}
                                aria-pressed={filter === f.id}
                                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs backdrop-blur-xl transition ${
                                    filter === f.id ? "border-[#D6A85C]/70 bg-[#D6A85C]/15 text-[#F5EBDD]" : "border-white/10 bg-[#101722]/70 text-[#F5EBDD]/75"
                                }`}
                            >
                                <span className="h-1.5 w-1.5 rounded-full" style={{ background: f.color }} />
                                {f.label}
                            </button>
                        ))}
                    </div>
                )}
            </header>

            {/* ---------------- Layers panel (desktop) ---------------- */}
            <AnimatePresence>
                {!listOpen && filters.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        className={`pointer-events-auto absolute left-5 top-[124px] z-20 hidden w-56 rounded-2xl p-2 md:block ${glass}`}
                    >
                        <div className="flex items-center justify-between px-2 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8e9bb0]">
                            {copy.layers}
                            <ChevronDown size={12} />
                        </div>
                        <div className="flex max-h-[46vh] flex-col gap-0.5 overflow-y-auto">
                            {filters.map((f) => (
                                <button
                                    key={f.id}
                                    type="button"
                                    onClick={() => setFilter(f.id)}
                                    aria-pressed={filter === f.id}
                                    className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-[13px] transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D6A85C]/70 ${
                                        filter === f.id ? "bg-[#D6A85C]/[0.14] text-[#F5EBDD]" : "text-[#F5EBDD]/70 hover:bg-white/[0.04] hover:text-[#F5EBDD]"
                                    }`}
                                >
                                    <span
                                        className="h-2 w-2 shrink-0 rounded-full"
                                        style={{
                                            background: f.color,
                                            boxShadow: filter === f.id ? `0 0 10px ${f.color}` : undefined,
                                        }}
                                    />
                                    <span className="flex-1 truncate">{f.label}</span>
                                    <span className="text-[11px] tabular-nums text-[#8e9bb0]">{f.count}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ---------------- Right rail: zoom / level / north / reset ---------------- */}
            <div
                className={`pointer-events-auto absolute z-20 flex flex-col overflow-hidden rounded-2xl transition-all duration-300 ${glass} ${
                    mobile
                        ? `right-3 top-[46%] -translate-y-1/2 ${panelOpen || listOpen ? "hidden" : ""}`
                        : panelOpen
                          ? "right-[410px] top-1/2 -translate-y-1/2"
                          : "right-5 top-1/2 -translate-y-1/2"
                }`}
            >
                <RailButton label={copy.zoomIn} onClick={() => send({ type: "zoom", factor: 0.6 })}>
                    <Plus size={18} />
                </RailButton>
                <div className="hidden flex-col items-center gap-1.5 border-y border-white/[0.07] py-2 md:flex">
                    {([1, 2, 3, 4] as ZoomLevel[]).map((l) => (
                        <button
                            key={l}
                            type="button"
                            onClick={() => send({ type: "level", level: l })}
                            title={copy.levels[l]}
                            aria-label={copy.levels[l]}
                            aria-current={cam.level === l}
                            className="group flex h-4 w-10 items-center justify-center"
                        >
                            <span
                                className={`h-1.5 rounded-full transition-all ${cam.level === l ? "w-5 bg-[#D6A85C]" : "w-1.5 bg-white/30 group-hover:bg-white/60"}`}
                            />
                        </button>
                    ))}
                </div>
                <RailButton label={copy.zoomOut} onClick={() => send({ type: "zoom", factor: 1.6 })}>
                    <Minus size={18} />
                </RailButton>
                <div className="border-t border-white/[0.07]">
                    <RailButton label={copy.north} onClick={() => send({ type: "north" })}>
                        <Compass size={18} style={{ transform: `rotate(${-cam.heading - 45}deg)` }} className="transition-transform" />
                    </RailButton>
                </div>
                <div className="border-t border-white/[0.07]">
                    <RailButton
                        label={copy.reset}
                        onClick={() => {
                            setSelectedId(null);
                            send({ type: "reset" });
                        }}
                    >
                        <RotateCcw size={17} />
                    </RailButton>
                </div>
            </div>

            {/* ---------------- Bottom HUD ---------------- */}
            <div
                className={`pointer-events-none absolute bottom-5 left-5 z-20 hidden flex-col gap-1.5 transition-opacity xl:flex ${listOpen ? "opacity-0" : "opacity-100"}`}
            >
                <div className={`flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-[11px] tabular-nums text-[#F5EBDD]/80 ${glass}`}>
                    <span className="font-semibold uppercase tracking-wider text-[#D6A85C]">{levelName}</span>
                    <span className="h-3 w-px bg-white/15" />
                    <span>
                        {cam.lat.toFixed(2)}°N · {cam.lng.toFixed(2)}°E
                    </span>
                </div>
                <p className="pl-1 text-[10px] text-[#F5EBDD]/40">{copy.credit}</p>
            </div>

            <div
                className={`pointer-events-none absolute inset-x-0 bottom-3 z-20 flex flex-col items-center gap-2 transition-all duration-300 md:bottom-5 ${
                    panelOpen || listOpen ? "translate-y-4 opacity-0" : "opacity-100"
                }`}
            >
                <AnimatePresence>
                    {ready && !interacted && (
                        <motion.p
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 3.4 } }}
                            exit={{ opacity: 0 }}
                            className="mx-3 rounded-full bg-black/45 px-4 py-1.5 text-center text-[11px] text-[#F5EBDD]/85 backdrop-blur-md sm:text-xs"
                        >
                            {coarse ? copy.hintTouch : copy.hint}
                        </motion.p>
                    )}
                </AnimatePresence>
                {ready && !panelOpen && !listOpen && featured.length > 0 && (
                    <div className={`pointer-events-auto w-[calc(100vw-24px)] max-w-[860px] rounded-2xl p-1.5 md:p-2 ${glass}`}>
                        <div className="hidden items-center justify-between px-2 pb-1.5 pt-0.5 md:flex">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D6A85C]">{copy.top[mode]}</span>
                            <a href="#explore-list" className="flex items-center gap-1 text-[11px] text-[#F5EBDD]/60 transition hover:text-[#D6A85C]">
                                {copy.browse}
                                <ChevronDown size={12} />
                            </a>
                        </div>
                        <div className="flex snap-x gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none]">
                            {featured.map((m) => {
                                const gs = GROUP_STYLE[m.group];
                                const GIcon = gs.icon;
                                const src = thumb(m.image, 96);
                                return (
                                    <button
                                        key={m.id}
                                        type="button"
                                        onClick={() => pickMarker(m)}
                                        className="group flex w-[138px] shrink-0 snap-start items-center gap-2 rounded-xl p-1 text-left transition hover:bg-white/[0.06] focus-visible:bg-white/[0.08] focus-visible:outline-none md:w-[180px]"
                                    >
                                        <span
                                            className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg md:h-11 md:w-11"
                                            style={{ boxShadow: `0 0 0 1.5px ${gs.color}` }}
                                        >
                                            {src ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={src}
                                                    alt=""
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                            ) : (
                                                <span className="flex h-full w-full items-center justify-center bg-[#0d131d]" style={{ color: gs.color }}>
                                                    <GIcon size={16} />
                                                </span>
                                            )}
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block truncate text-[12px] font-semibold text-[#F5EBDD] md:text-[13px]">
                                                {hi ? m.nameHi : m.name}
                                            </span>
                                            <span className="block truncate text-[10px] text-[#9aa7bb] md:text-[11px]">{hi ? m.cityHi : m.city}</span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* ---------------- Panels ---------------- */}
            <AnimatePresence>
                {selected && (
                    <PreviewPanel
                        marker={selected}
                        nearby={nearby}
                        copy={copy}
                        language={language}
                        mobile={mobile}
                        onClose={() => setSelectedId(null)}
                        onSelect={(id) => {
                            const m = markers.find((x) => x.id === id);
                            if (m) pickMarker(m);
                        }}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {listOpen && !selected && (
                    <ListPanel
                        markers={listMarkers}
                        title={listIds && listMarkers[0] ? (hi ? listMarkers[0].cityHi : listMarkers[0].city) : undefined}
                        mode={mode}
                        copy={copy}
                        language={language}
                        mobile={mobile}
                        onSelect={(id) => handleSelect(id)}
                        onClose={() => {
                            setListOpen(false);
                            setListIds(null);
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Mobile search overlay */}
            <AnimatePresence>
                {mobileSearch && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-[#080C14]/80 p-3 backdrop-blur-sm lg:hidden"
                        onClick={(e) => e.target === e.currentTarget && setMobileSearch(false)}
                    >
                        <SearchBox
                            markers={markers}
                            language={language}
                            copy={copy}
                            autoFocus
                            onClose={() => setMobileSearch(false)}
                            onPickMarker={pickMarker}
                            onPickCity={(_, lat, lng) => send({ type: "fly", lat, lng, distance: 16 })}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ---------------- Loader / fallback ---------------- */}
            <AnimatePresence>
                {webgl !== false && !ready && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.8 } }}
                        className="absolute inset-0 z-[60] flex flex-col items-center justify-center gap-5 bg-[#080C14]"
                    >
                        <Image
                            src={hi ? "/hindi-logo-bg.png" : "/english-logo-bg.png"}
                            alt={hi ? "राजस्थान प्लेसेज़ एंड फ़ेस्टिवल्स" : "Rajasthan Places and Festivals"}
                            width={hi ? 516 : 509}
                            height={hi ? 484 : 490}
                            priority
                            sizes="200px"
                            className="h-36 w-auto object-contain drop-shadow-[0_10px_30px_rgba(214,168,92,0.25)] md:h-44"
                        />
                        <div className="relative h-0.5 w-48 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#D6A85C] to-transparent"
                                animate={{ x: ["-100%", "300%"] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1.4,
                                    ease: "easeInOut",
                                }}
                            />
                        </div>
                        <div className="text-[11px] uppercase tracking-[0.35em] text-[#8e9bb0]">{copy.loading}</div>
                    </motion.div>
                )}
            </AnimatePresence>
            {webgl === false && (
                <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-[#080C14] px-6 text-center">
                    <p className="max-w-md text-[#F5EBDD]/85">{copy.noWebgl}</p>
                    <a href="#explore-list" className="rounded-full bg-[#D6A85C] px-5 py-2.5 text-sm font-semibold text-[#101722]">
                        {copy.browse}
                    </a>
                </div>
            )}
        </section>
    );
}
