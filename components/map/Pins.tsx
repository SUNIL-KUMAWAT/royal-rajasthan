"use client";
// Photo map pins. They live in a plain DOM overlay above the canvas; Scene positions them every frame.
import { memo, useState } from "react";
import type { MapMarker } from "@/lib/map/types";
import { thumb } from "@/lib/map/thumb";
import { GROUP_STYLE } from "./markerStyle";

function Photo({ marker, size }: { marker: MapMarker; size: number }) {
    const [failed, setFailed] = useState(false);
    const style = GROUP_STYLE[marker.group];
    const Icon = style.icon;
    const src = thumb(marker.image, 96);
    if (!src || failed) {
        return (
            // No real photo: a game-style POI badge in the category colour (never a stand-in picture)
            <span
                className="flex h-full w-full items-center justify-center text-white"
                style={{ background: `radial-gradient(circle at 32% 28%, ${style.color} 0%, ${style.color}cc 38%, #1a1206 100%)` }}
            >
                <Icon size={Math.round(size * 0.46)} strokeWidth={2.3} style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.6))" }} />
            </span>
        );
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" loading="lazy" decoding="async" draggable={false} onError={() => setFailed(true)} className="h-full w-full object-cover" />;
}

export const Pin = memo(function Pin({
    marker: m,
    count,
    selected,
    dimmed,
    showLabel,
    compact = false,
    language,
    onClick,
    onDoubleClick,
}: {
    marker: MapMarker;
    count: number;
    selected: boolean;
    dimmed: boolean;
    showLabel: boolean;
    /** Small screens: slightly smaller pins. */
    compact?: boolean;
    language: "en" | "hi";
    onClick: () => void;
    onDoubleClick: () => void;
}) {
    const style = GROUP_STYLE[m.group];
    const Icon = style.icon;
    const hi = language === "hi";
    const name = hi ? m.nameHi : m.name;
    const city = hi ? m.cityHi : m.city;
    const cluster = count > 1;
    const size = selected ? (compact ? 50 : 58) : cluster ? (compact ? 36 : 50) : compact ? 30 : 40;
    const ring = selected ? "#F2C46D" : style.color;

    // Cluster label: "Jaipur · 23 places"; single label: the place name (on hover, focus, zoom or selection)
    const labelAlways = cluster || selected || showLabel;
    const label = cluster ? city : name;
    const sub = cluster ? `${count} ${hi ? "स्थान" : "places"}` : `${hi ? m.categoryHi : m.category} · ${city}`;

    return (
        <button
            type="button"
            onClick={onClick}
            onDoubleClick={cluster ? undefined : onDoubleClick}
            aria-label={cluster ? `${city}: ${count} ${hi ? "स्थान — ज़ूम करें" : "places — zoom in"}` : `${name}, ${city}`}
            aria-pressed={cluster ? undefined : selected}
            className="group pointer-events-auto absolute left-0 top-0 flex -translate-x-1/2 -translate-y-full flex-col items-center outline-none"
            style={{ opacity: dimmed ? 0.5 : 1 }}
        >
            {/* Label */}
            <span
                className={`mb-1.5 flex flex-col items-center whitespace-nowrap rounded-xl border text-center ${compact ? "px-2 py-0.5" : "px-2.5 py-1"} leading-tight shadow-[0_6px_20px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-200 ${
                    selected ? "border-[#D6A85C]/80 bg-[#101722]/90" : "border-white/10 bg-[#101722]/80"
                } ${
                    labelAlways
                        ? "opacity-100"
                        : "pointer-events-none translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                }`}
            >
                <span className={`font-semibold text-[#F5EBDD] ${compact ? "text-[11px]" : "text-[12px]"}`}>{label}</span>
                <span
                    className={`text-[10px] text-[#a9b3c4] ${(cluster && !compact) || selected ? "block" : "hidden group-hover:block group-focus-visible:block"}`}
                >
                    {sub}
                </span>
            </span>

            {/* Photo disc (+ count badge for clusters) */}
            <span className="relative block">
                <span
                    className={`relative block overflow-hidden rounded-full transition-all duration-200 group-hover:scale-110 group-focus-visible:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-[#F5EBDD] ${
                        selected ? "shadow-[0_0_0_3px_#F2C46D,0_0_28px_8px_rgba(242,196,109,0.55)]" : "shadow-[0_6px_18px_rgba(0,0,0,0.55)]"
                    }`}
                    style={{ width: size, height: size, border: `2.5px solid ${ring}` }}
                >
                    <Photo marker={m} size={size} />
                    {!cluster && (
                        <span
                            className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full border border-[#101722]"
                            style={{ background: style.color, color: "#101722" }}
                        >
                            <Icon size={10} strokeWidth={2.6} />
                        </span>
                    )}
                </span>
                {cluster && (
                    <span
                        className="absolute -right-2 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border border-[#101722] px-1 text-[10px] font-bold text-[#101722]"
                        style={{ background: style.color }}
                    >
                        +{count - 1}
                    </span>
                )}
            </span>

            {/* Stem down to the exact spot */}
            <span className="h-3 w-0.5 rounded-full" style={{ background: ring }} />
            <span className="h-2 w-2 rounded-full border border-[#101722]" style={{ background: ring, boxShadow: `0 0 8px ${ring}` }} />
        </button>
    );
});
