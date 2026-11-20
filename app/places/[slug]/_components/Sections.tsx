"use client";
// Content sections of the place detail page. Each section is written once and used
// both in the "Overview" tab (all sections stacked) and in its own tab.
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Accessibility,
    ArrowUpRight,
    Camera,
    Check,
    Clock,
    Hourglass,
    Info,
    Landmark,
    Lightbulb,
    MapPin,
    MessagesSquare,
    Navigation,
    Plus,
    ScrollText,
    Sparkles,
    Star,
    SunMedium,
    Ticket,
    X,
} from "lucide-react";
import Link from "@/components/LocalizedLink";
import { Reveal } from "@/components/ui/Reveal";
import type { Place } from "@/types";
import type { DetailText } from "./text";

export type PlaceLink = { name: string; slug: string };

type SectionProps = { place: Place; t: DetailText };

const EASE = [0.22, 1, 0.36, 1] as const;

// Tailwind only generates classes it can see in source, so tones are spelled out in full.
const TONES = {
    gold: { label: "text-gold-700 dark:text-gold-400", value: "text-ink-900 dark:text-ivory-50", dot: "bg-gold-500" },
    maroon: { label: "text-maroon-500 dark:text-maroon-300", value: "text-ink-900 dark:text-ivory-50", dot: "bg-maroon-500 dark:bg-maroon-300" },
    ink: { label: "text-ink-500 dark:text-ivory-200/70", value: "text-ink-900 dark:text-ivory-50", dot: "bg-ink-400" },
    sage: { label: "text-emerald-700 dark:text-emerald-400", value: "text-ink-900 dark:text-ivory-50", dot: "bg-emerald-500" },
} as const;
type Tone = keyof typeof TONES;

/** Glass panel used for every content card on the page. */
const card = "relative rounded-[1.75rem] glass p-6 md:p-8";
/** Small label above values (uppercase, tracked). */
const label = "text-[11px] font-semibold uppercase tracking-[0.16em]";
/** Sub-heading inside a panel. */
const panelTitle = "mb-5 flex items-center gap-2.5 font-display text-2xl font-medium tracking-tight text-ink-900 dark:text-ivory-50";

function IconBadge({ children }: { children: ReactNode }) {
    return (
        <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-400/15 text-gold-700 ring-1 ring-gold-500/20 dark:text-gold-300"
            aria-hidden="true"
        >
            {children}
        </span>
    );
}

function StatTile({ label: l, value, tone, large }: { label: string; value: ReactNode; tone: Tone; large?: boolean }) {
    const c = TONES[tone];
    return (
        <div className="rounded-2xl bg-white/50 p-4 ring-1 ring-ink-900/[0.06] transition-transform duration-500 ease-lux hover:-translate-y-0.5 dark:bg-white/[0.04] dark:ring-white/[0.08] md:p-5">
            <div className={`flex items-center gap-1.5 ${label} ${c.label}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} aria-hidden="true" />
                {l}
            </div>
            <div className={`mt-2 font-display font-medium leading-tight ${large ? "text-3xl md:text-4xl" : "text-lg"} ${c.value}`}>
                {value}
            </div>
        </div>
    );
}

function Note({ children, tone }: { children: ReactNode; tone: "info" | "gold" }) {
    const cls =
        tone === "info"
            ? "bg-ink-900/[0.04] text-ink-600 ring-ink-900/[0.06] dark:bg-white/[0.05] dark:text-ivory-200/80 dark:ring-white/10"
            : "bg-gold-400/10 text-gold-800 ring-gold-500/20 dark:text-gold-300";
    return (
        <div className={`mt-5 flex items-start gap-2.5 rounded-2xl p-4 text-sm leading-relaxed ring-1 ${cls}`}>
            <Info size={16} className="mt-0.5 flex-shrink-0" />
            <span>{children}</span>
        </div>
    );
}

function InfoRows({ rows }: { rows: { label: string; value?: ReactNode; cls?: string }[] }) {
    return (
        <dl>
            {rows
                .filter((r) => r.value !== undefined && r.value !== "")
                .map((r) => (
                    <div
                        key={r.label}
                        className="flex items-center justify-between gap-4 border-b border-ink-900/[0.06] py-3.5 last:border-0 dark:border-white/[0.07]"
                    >
                        <dt className="flex-shrink-0 text-sm text-ink-500 dark:text-ivory-200/65">{r.label}</dt>
                        <dd className={`text-right ${r.cls ?? "text-sm font-medium text-ink-900 dark:text-ivory-50"}`}>{r.value}</dd>
                    </div>
                ))}
        </dl>
    );
}

/** Section title. In the stacked overview each section gets a hairline divider above it. */
export function SectionBlock({ title, icon, divided, children }: { title: string; icon?: ReactNode; divided?: boolean; children: ReactNode }) {
    return (
        <Reveal as="section" className={divided ? "pt-4" : undefined}>
            {divided && <div className="hairline mb-12" />}
            <h2 className="mb-6 flex items-center gap-4 font-display text-3xl font-medium leading-[1.05] tracking-tight text-ink-900 dark:text-ivory-50 md:mb-8 md:text-4xl">
                {icon && (
                    <span
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-full glass text-gold-700 dark:text-gold-300"
                        aria-hidden="true"
                    >
                        {icon}
                    </span>
                )}
                {title}
            </h2>
            {children}
        </Reveal>
    );
}

// ─────────────────────────── Overview intro ───────────────────────────
export function OverviewIntro({ place, t }: SectionProps) {
    const facts = [
        { label: t.builtIn, value: place.yearBuilt },
        { label: t.builtBy, value: place.builtBy },
        { label: t.designedBy, value: place.designedBy },
        { label: t.architecture, value: place.architecture },
        { label: t.category, value: place.subcategory ? `${place.category} - ${place.subcategory}` : place.category },
        { label: t.district, value: place.district },
        { label: t.visitDuration, value: place.visitDuration.recommended },
        { label: t.bestTime, value: place.bestTimeToVisit.months },
    ].filter((f) => f.value);

    const subTitle = "mb-5 font-display text-2xl font-medium tracking-tight text-ink-900 dark:text-ivory-50 md:text-3xl";

    return (
        <div className="space-y-12">
            <p className="border-l-2 border-gold-500/60 pl-5 font-display text-xl leading-relaxed text-ink-700 dark:text-ivory-100/85 md:pl-7 md:text-2xl">
                {place.description}
            </p>

            <Reveal className={`${card} overflow-hidden`}>
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-400/15 blur-3xl" aria-hidden="true" />
                <h2 className={`relative ${subTitle}`}>{t.quickFacts}</h2>
                <dl className="relative grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3">
                    {facts.map((fact) => (
                        <div key={fact.label} className="border-t border-ink-900/[0.08] pt-3 dark:border-white/[0.08]">
                            <dt className={`${label} text-ink-400 dark:text-ivory-200/55`}>{fact.label}</dt>
                            <dd className="mt-1.5 font-display text-lg font-medium leading-snug text-ink-900 dark:text-ivory-50">
                                {fact.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </Reveal>

            {place.highlights?.length > 0 && (
                <Reveal>
                    <h2 className={subTitle}>{t.highlights}</h2>
                    <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                        {place.highlights.map((h) => (
                            <li
                                key={h}
                                className="flex items-start gap-3 border-b border-ink-900/[0.06] py-3.5 text-ink-600 dark:border-white/[0.07] dark:text-ivory-200/75"
                            >
                                <Star size={14} className="mt-1 flex-shrink-0 fill-gold-500 text-gold-500" />
                                <span className="text-sm leading-relaxed md:text-[15px]">{h}</span>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            )}

            {place.activities && place.activities.length > 0 && (
                <Reveal>
                    <h2 className={subTitle}>{t.activities}</h2>
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {place.activities.map((act) => (
                            <li
                                key={act}
                                className="flex items-start gap-3 rounded-2xl glass p-4 text-ink-700 transition-transform duration-500 ease-lux hover:-translate-y-0.5 dark:text-ivory-100"
                            >
                                <IconBadge>
                                    <Sparkles size={15} />
                                </IconBadge>
                                <span className="pt-1.5 text-sm font-medium">{act}</span>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            )}

            {place.facilities?.length > 0 && (
                <Reveal>
                    <h2 className={subTitle}>{t.facilities}</h2>
                    <ul className="flex flex-wrap gap-2">
                        {place.facilities.map((f) => (
                            <li key={f} className="chip-idle !text-sm !font-medium">
                                <Check size={13} className="text-emerald-600 dark:text-emerald-400" />
                                {f}
                            </li>
                        ))}
                    </ul>
                </Reveal>
            )}

            {place.accessibility && place.accessibility.length > 0 && (
                <Reveal>
                    <h2 className={subTitle}>{t.accessibility}</h2>
                    <ul className="space-y-3">
                        {place.accessibility.map((acc) => (
                            <li key={acc} className="flex items-start gap-3 text-ink-600 dark:text-ivory-200/75">
                                <IconBadge>
                                    <Accessibility size={15} />
                                </IconBadge>
                                <span className="pt-1.5 text-sm leading-relaxed">{acc}</span>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            )}

            {place.significance && (
                <Reveal className="relative overflow-hidden rounded-[1.75rem] bg-ink-900 p-6 text-ivory-50 shadow-float dark:bg-white/[0.06] dark:ring-1 dark:ring-white/10 md:p-8">
                    <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-gold-400/20 blur-3xl" aria-hidden="true" />
                    <span className="eyebrow relative !text-gold-300" aria-hidden="true">
                        {t.significance}
                    </span>
                    <p className="relative mt-4 font-display text-xl italic leading-relaxed text-ivory-100 md:text-2xl">
                        <strong className="sr-only">{t.significance}:</strong> {place.significance}
                    </p>
                </Reveal>
            )}
        </div>
    );
}

// ─────────────────────────── Timing & tickets ───────────────────────────
export function TimingTicketsSection({ place, t, isOpen, divided }: SectionProps & { isOpen: boolean; divided?: boolean }) {
    const price = (v: number | undefined) => (v === undefined ? undefined : v === 0 ? t.free : `₹${v}`);
    return (
        <SectionBlock title={t.timingAndTickets} icon={<Clock size={20} />} divided={divided}>
            <div className="space-y-5">
                <div className={card}>
                    <h3 className={panelTitle}>
                        <IconBadge>
                            <Clock size={16} />
                        </IconBadge>
                        {t.openingHours}
                    </h3>
                    <InfoRows
                        rows={[
                            {
                                label: t.opensAt,
                                value: place.timing.open,
                                cls: "font-display text-2xl font-medium text-emerald-700 dark:text-emerald-400 md:text-3xl",
                            },
                            {
                                label: t.closesAt,
                                value: place.timing.close,
                                cls: "font-display text-2xl font-medium text-maroon-500 dark:text-maroon-300 md:text-3xl",
                            },
                            { label: t.closedOn, value: place.timing.closedOn },
                            {
                                label: t.currentStatus,
                                value: (
                                    <span
                                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
                                            isOpen
                                                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                                                : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                        }`}
                                    >
                                        <span className={`h-2 w-2 rounded-full ${isOpen ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                                        {isOpen ? t.openNow : t.closed}
                                    </span>
                                ),
                                cls: "",
                            },
                        ]}
                    />
                    {place.timing.note && <Note tone="info">{place.timing.note}</Note>}
                </div>

                <div className={card}>
                    <h3 className={panelTitle}>
                        <IconBadge>
                            <Ticket size={16} />
                        </IconBadge>
                        {t.entryTickets}
                    </h3>
                    {place.ticket.isFree ? (
                        <div className="rounded-2xl bg-emerald-500/10 p-8 text-center ring-1 ring-emerald-500/20">
                            <div className="font-display text-4xl font-medium tracking-tight text-emerald-700 dark:text-emerald-400 md:text-5xl">
                                {t.freeEntry}
                            </div>
                            <div className="mt-2 text-sm text-emerald-700/80 dark:text-emerald-400/80">{t.noTicket}</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                            <StatTile large tone="gold" label={t.indianAdult} value={`₹${place.ticket.indian}`} />
                            <StatTile large tone="ink" label={t.foreignerAdult} value={`₹${place.ticket.foreigner}`} />
                            <StatTile large tone="sage" label={t.indianChild} value={price(place.ticket.childIndian)} />
                            <StatTile large tone="maroon" label={t.cameraFee} value={price(place.ticket.camera)} />
                        </div>
                    )}
                    {place.ticket.note && <Note tone="gold">{place.ticket.note}</Note>}
                </div>

                <div className={card}>
                    <h3 className={panelTitle}>
                        <IconBadge>
                            <Hourglass size={16} />
                        </IconBadge>
                        {t.recommendedDuration}
                    </h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl bg-white/50 p-5 text-center ring-1 ring-ink-900/[0.06] dark:bg-white/[0.04] dark:ring-white/[0.08]">
                            <div className={`${label} text-ink-400 dark:text-ivory-200/55`}>{t.minimum}</div>
                            <div className="mt-2 font-display text-xl font-medium text-ink-700 dark:text-ivory-100">
                                {place.visitDuration.minimum}
                            </div>
                        </div>
                        <div className="relative rounded-2xl bg-ink-900 p-5 text-center shadow-float dark:bg-gold-400">
                            <div className={`${label} flex items-center justify-center gap-1.5 text-gold-300 dark:text-ink-800`}>
                                <Star size={11} className="fill-current" />
                                {t.recommended}
                            </div>
                            <div className="mt-2 font-display text-xl font-semibold text-ivory-50 dark:text-ink-900">
                                {place.visitDuration.recommended}
                            </div>
                        </div>
                        <div className="rounded-2xl bg-white/50 p-5 text-center ring-1 ring-ink-900/[0.06] dark:bg-white/[0.04] dark:ring-white/[0.08]">
                            <div className={`${label} text-ink-400 dark:text-ivory-200/55`}>{t.extended}</div>
                            <div className="mt-2 font-display text-xl font-medium text-ink-700 dark:text-ivory-100">
                                {place.visitDuration.extended}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionBlock>
    );
}

// ─────────────────────────── Location ───────────────────────────
export function LocationSection({ place, t, divided }: SectionProps & { divided?: boolean }) {
    const { location } = place;
    return (
        <SectionBlock title={t.location} icon={<MapPin size={20} />} divided={divided}>
            <div className="grid gap-5 xl:grid-cols-5">
                <div className={`${card} xl:col-span-2`}>
                    <InfoRows
                        rows={[
                            { label: t.address, value: location.address },
                            { label: t.city, value: `${location.city}, ${place.state}` },
                            { label: t.pincode, value: location.pincode },
                            { label: t.fromCityCenter, value: location.distanceFromCity },
                            { label: t.nearestAirport, value: location.nearestAirport },
                            { label: t.nearestRailway, value: location.nearestRailway },
                        ]}
                    />
                    <a href={location.googleMapUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full !py-3.5">
                        <Navigation size={17} />
                        {t.openInMaps}
                    </a>
                </div>
                <div className="h-72 overflow-hidden rounded-[1.75rem] glass p-1.5 md:h-96 xl:col-span-3 xl:h-auto xl:min-h-[24rem]">
                    <iframe
                        src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5000!2d${location.longitude}!3d${location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        className="h-full w-full rounded-[1.4rem] grayscale-[35%] transition-[filter] duration-700 hover:grayscale-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={t.mapTitle(place.name)}
                    />
                </div>
            </div>
        </SectionBlock>
    );
}

// ─────────────────────────── History ───────────────────────────
export function HistorySection({ place, t, divided }: SectionProps & { divided?: boolean }) {
    return (
        <SectionBlock title={t.historyOf(place.name)} icon={<ScrollText size={20} />} divided={divided}>
            <div className={card}>
                <div
                    className="prose-lux max-w-none text-[15px] sm:text-lg [&>p:first-of-type]:font-display [&>p:first-of-type]:text-xl [&>p:first-of-type]:text-ink-700 dark:[&>p:first-of-type]:text-ivory-100/85 sm:[&>p:first-of-type]:text-2xl"
                    dangerouslySetInnerHTML={{ __html: place.history }}
                />
                <div className="hairline my-8" />
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    <StatTile tone="gold" label={t.yearBuilt} value={place.yearBuilt} />
                    <StatTile tone="maroon" label={t.builtBy} value={place.builtBy} />
                    <StatTile tone="ink" label={t.architecture} value={place.architecture} />
                    <StatTile
                        tone="sage"
                        label={t.heritageStatus}
                        value={place.isUNESCO ? t.unescoWorldHeritage : t.stateHeritage}
                    />
                </div>
            </div>
        </SectionBlock>
    );
}

// ─────────────────────────── Tips ───────────────────────────
export function TipsSection({ place, t, divided }: SectionProps & { divided?: boolean }) {
    const best = place.bestTimeToVisit;
    return (
        <SectionBlock title={t.tips} icon={<Lightbulb size={20} />} divided={divided}>
            <div className="space-y-5">
                {(place.dos?.length > 0 || place.donts?.length > 0) && (
                    <div className="grid gap-5 md:grid-cols-2">
                        {place.dos?.length > 0 && (
                            <div className={card}>
                                <h3 className={panelTitle}>
                                    <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" aria-hidden="true">
                                        <Check size={16} />
                                    </span>
                                    {t.dos}
                                </h3>
                                <ul className="space-y-3">
                                    {place.dos.map((d) => (
                                        <li key={d} className="flex items-start gap-3 text-ink-600 dark:text-ivory-200/80">
                                            <Check size={15} className="mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                                            <span className="text-sm leading-relaxed">{d}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {place.donts?.length > 0 && (
                            <div className={card}>
                                <h3 className={panelTitle}>
                                    <span className="grid h-9 w-9 place-items-center rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400" aria-hidden="true">
                                        <X size={16} />
                                    </span>
                                    {t.donts}
                                </h3>
                                <ul className="space-y-3">
                                    {place.donts.map((d) => (
                                        <li key={d} className="flex items-start gap-3 text-ink-600 dark:text-ivory-200/80">
                                            <X size={15} className="mt-0.5 flex-shrink-0 text-rose-500 dark:text-rose-400" />
                                            <span className="text-sm leading-relaxed">{d}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
                <div className={`${card} overflow-hidden`}>
                    <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-gold-400/20 blur-3xl" aria-hidden="true" />
                    <h3 className={`relative ${panelTitle}`}>
                        <IconBadge>
                            <SunMedium size={16} />
                        </IconBadge>
                        {t.bestTime}
                    </h3>
                    <dl className="relative grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                        {[
                            { label: t.bestMonths, value: best.months },
                            { label: t.season, value: best.season },
                            { label: t.weather, value: best.weather },
                            { label: t.proTip, value: best.tip },
                        ]
                            .filter((i) => i.value)
                            .map((item) => (
                                <div key={item.label} className="border-t border-ink-900/[0.08] pt-3 dark:border-white/[0.08]">
                                    <dt className={`${label} text-gold-700 dark:text-gold-400`}>{item.label}</dt>
                                    <dd className="mt-1.5 text-sm font-medium leading-relaxed text-ink-800 dark:text-ivory-100">{item.value}</dd>
                                </div>
                            ))}
                    </dl>
                </div>
                {place.photography && (
                    <div className={card}>
                        <h3 className={panelTitle}>
                            <IconBadge>
                                <Camera size={16} />
                            </IconBadge>
                            {t.photography}
                        </h3>
                        <p className="text-sm leading-relaxed text-ink-600 dark:text-ivory-200/75 md:text-[15px]">{place.photography}</p>
                    </div>
                )}
            </div>
        </SectionBlock>
    );
}

// ─────────────────────────── Nearby ───────────────────────────
export function NearbySection({ place, t, links, divided }: SectionProps & { links: PlaceLink[]; divided?: boolean }) {
    const byName = new Map(links.map((l) => [l.name.toLowerCase(), l.slug]));
    return (
        <SectionBlock title={t.nearby} icon={<MapPin size={20} />} divided={divided}>
            {place.nearbyPlaces?.length > 0 && (
                <div className={card}>
                    <h3 className={panelTitle}>{t.nearbyPlaces}</h3>
                    <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                        {place.nearbyPlaces.map((np) => (
                            <li
                                key={np}
                                className="flex items-center gap-3 border-b border-ink-900/[0.06] py-3.5 dark:border-white/[0.07]"
                            >
                                <MapPin size={15} className="flex-shrink-0 text-gold-600 dark:text-gold-400" />
                                <span className="text-sm text-ink-700 dark:text-ivory-100">{np}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {place.relatedPlaces && place.relatedPlaces.length > 0 && (
                <div className={`${card} mt-5`}>
                    <h3 className={panelTitle}>{t.relatedPlaces}</h3>
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {place.relatedPlaces.map((rp) => {
                            const slug = byName.get(rp.toLowerCase());
                            const inner = (
                                <>
                                    <IconBadge>
                                        <Landmark size={15} />
                                    </IconBadge>
                                    <span className="flex-1 text-sm font-semibold">{rp}</span>
                                </>
                            );
                            return (
                                <li key={rp}>
                                    {slug ? (
                                        <Link
                                            href={`/places/${slug}`}
                                            className="group flex items-center gap-3 rounded-2xl bg-white/50 p-3 text-ink-800 ring-1 ring-ink-900/[0.06] transition-all duration-500 ease-lux hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-float dark:bg-white/[0.04] dark:text-ivory-100 dark:ring-white/[0.08] dark:hover:bg-white/[0.08]"
                                        >
                                            {inner}
                                            <ArrowUpRight
                                                size={16}
                                                className="text-ink-400 transition-transform duration-500 ease-lux group-hover:rotate-45 group-hover:text-gold-600 dark:text-ivory-200/50 dark:group-hover:text-gold-400"
                                                aria-hidden="true"
                                            />
                                        </Link>
                                    ) : (
                                        <div className="flex items-center gap-3 rounded-2xl bg-white/30 p-3 text-ink-700 ring-1 ring-ink-900/[0.04] dark:bg-white/[0.02] dark:text-ivory-200/80 dark:ring-white/[0.05]">
                                            {inner}
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </SectionBlock>
    );
}

// ─────────────────────────── FAQs ───────────────────────────
function FAQItem({ question, answer, id, n }: { question: string; answer: string; id: string; n: number }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            className={`overflow-hidden rounded-[1.5rem] transition-all duration-500 ease-lux ${
                isOpen ? "glass-strong shadow-float" : "glass"
            }`}
        >
            <h3 className="font-sans">
                <button
                    type="button"
                    id={`${id}-q`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a`}
                    className="flex w-full items-center gap-4 p-5 text-left text-sm font-semibold text-ink-900 dark:text-ivory-50 sm:text-base md:px-6"
                >
                    <span className="w-7 shrink-0 font-display text-lg font-medium italic text-gold-600 dark:text-gold-400" aria-hidden="true">
                        {String(n).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{question}</span>
                    <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-500 ease-lux ${
                            isOpen
                                ? "rotate-45 bg-ink-900 text-ivory-50 dark:bg-gold-400 dark:text-ink-900"
                                : "bg-ink-900/5 text-ink-600 dark:bg-white/10 dark:text-ivory-100"
                        }`}
                        aria-hidden="true"
                    >
                        <Plus size={16} />
                    </span>
                </button>
            </h3>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={`${id}-a`}
                        role="region"
                        aria-labelledby={`${id}-q`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                    >
                        <div className="px-5 pb-6 pl-16 text-sm leading-relaxed text-ink-500 dark:text-ivory-200/70 md:pl-[4.25rem] md:pr-6">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function FaqSection({ place, t, divided }: SectionProps & { divided?: boolean }) {
    if (!place.faqs?.length) return null;
    return (
        <SectionBlock title={t.faqs} icon={<MessagesSquare size={20} />} divided={divided}>
            <div className="space-y-3">
                {place.faqs.map((faq, i) => (
                    <FAQItem key={i} id={`place-faq-${i}`} n={i + 1} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </SectionBlock>
    );
}
