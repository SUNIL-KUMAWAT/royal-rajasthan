"use client";
// Text alternative to the 3D map: every destination as a plain, crawlable link list.
import { useMemo } from "react";
import Link from "@/components/LocalizedLink";
import { useLanguage } from "@/components/LanguageProvider";
import type { MapMarker, MapMode } from "@/lib/map/types";
import { GROUP_STYLE } from "./markerStyle";

const COPY = {
    en: {
        title: "Explore Rajasthan",
        sub: "Every destination on the map, as a list.",
        modes: { places: "Places by city", festivals: "Festivals", shopping: "Shopping by district" } as Record<MapMode, string>,
        viewAll: { places: "All places", festivals: "All festivals", shopping: "Shopping guide" } as Record<MapMode, string>,
    },
    hi: {
        title: "राजस्थान खोजें",
        sub: "नक्शे के सभी स्थान, सूची के रूप में।",
        modes: { places: "शहरवार स्थान", festivals: "त्यौहार", shopping: "ज़िलेवार खरीदारी" } as Record<MapMode, string>,
        viewAll: { places: "सभी स्थान", festivals: "सभी त्यौहार", shopping: "शॉपिंग गाइड" } as Record<MapMode, string>,
    },
};

const MODE_HREF: Record<MapMode, string> = { places: "/places", festivals: "/festivals", shopping: "/shopping" };

export default function MapListSection({ markers }: { markers: MapMarker[] }) {
    const { language } = useLanguage();
    const hi = language === "hi";
    const c = COPY[language];

    const placesByCity = useMemo(() => {
        const map = new Map<string, MapMarker[]>();
        for (const m of markers.filter((x) => x.mode === "places").sort((a, b) => b.priority - a.priority)) {
            const k = hi ? m.cityHi : m.city;
            if (!map.has(k)) map.set(k, []);
            map.get(k)!.push(m);
        }
        return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length);
    }, [markers, hi]);

    const festivals = useMemo(() => markers.filter((m) => m.mode === "festivals").sort((a, b) => b.priority - a.priority), [markers]);
    const shopping = useMemo(() => markers.filter((m) => m.mode === "shopping").sort((a, b) => b.priority - a.priority), [markers]);

    const linkCls = "text-sm text-[#cfd6e2] transition hover:text-[#D6A85C] focus-visible:text-[#D6A85C] focus-visible:outline-none";
    const name = (m: MapMarker) => (hi ? m.nameHi : m.name);

    return (
        <section id="explore-list" className="relative scroll-mt-4 bg-[#080C14] px-4 pb-20 pt-16 text-[#F5EBDD] md:px-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D6A85C]/40 to-transparent" />
            <div className="mx-auto max-w-7xl">
                <h2 className="font-playfair text-3xl md:text-4xl">{c.title}</h2>
                <p className="mt-2 text-[#9aa7bb]">{c.sub}</p>

                <div className="mt-10">
                    <div className="mb-4 flex items-baseline justify-between gap-4">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D6A85C]">{c.modes.places}</h3>
                        <Link href={MODE_HREF.places} className="text-xs text-[#9aa7bb] hover:text-[#D6A85C]">
                            {c.viewAll.places} →
                        </Link>
                    </div>
                    <div className="columns-1 gap-8 sm:columns-2 lg:columns-4">
                        {placesByCity.map(([city, list]) => (
                            <div key={city} className="mb-6 break-inside-avoid">
                                <h4 className="mb-2 font-playfair text-lg text-[#F5EBDD]">{city}</h4>
                                <ul className="space-y-1.5">
                                    {list.map((m) => {
                                        const Icon = GROUP_STYLE[m.group].icon;
                                        return (
                                            <li key={m.id} className="flex items-center gap-2">
                                                <Icon size={12} style={{ color: GROUP_STYLE[m.group].color }} className="shrink-0" aria-hidden />
                                                <Link href={m.href} className={linkCls}>
                                                    {name(m)}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 grid gap-10 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="mb-4 flex items-baseline justify-between gap-4">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E07F8A]">{c.modes.festivals}</h3>
                            <Link href={MODE_HREF.festivals} className="text-xs text-[#9aa7bb] hover:text-[#D6A85C]">
                                {c.viewAll.festivals} →
                            </Link>
                        </div>
                        <ul className="columns-1 gap-8 space-y-1.5 sm:columns-2">
                            {festivals.map((m) => (
                                <li key={m.id} className="break-inside-avoid">
                                    <Link href={m.href} className={linkCls}>
                                        {name(m)}
                                    </Link>
                                    <span className="text-xs text-[#6f7c91]"> · {hi ? m.cityHi : m.city}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="mb-4 flex items-baseline justify-between gap-4">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B79BDB]">{c.modes.shopping}</h3>
                            <Link href={MODE_HREF.shopping} className="text-xs text-[#9aa7bb] hover:text-[#D6A85C]">
                                {c.viewAll.shopping} →
                            </Link>
                        </div>
                        <ul className="columns-2 gap-6 space-y-1.5">
                            {shopping.map((m) => (
                                <li key={m.id} className="break-inside-avoid">
                                    <Link href={m.href} className={linkCls}>
                                        {hi ? m.cityHi : m.city}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
