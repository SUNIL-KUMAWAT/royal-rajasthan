"use client";
import type { ReactNode } from "react";
import { ArrowLeft, Calendar, Clock, Hourglass, MapPin, Navigation, Star, Ticket } from "lucide-react";
import Link from "@/components/LocalizedLink";
import type { Place } from "@/types";
import type { DetailText } from "./text";

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
    return (
        <div className="flex items-start gap-3.5 py-3.5">
            <span
                className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-gold-400/15 text-gold-700 ring-1 ring-gold-500/20 dark:text-gold-300"
                aria-hidden="true"
            >
                {icon}
            </span>
            <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400 dark:text-ivory-200/55">{label}</div>
                {children}
            </div>
        </div>
    );
}

const value = "mt-0.5 text-sm font-medium text-ink-900 dark:text-ivory-50";

/** Floating glass "Quick Info" card shown beside the main content. */
export function Sidebar({ place, t, locale }: { place: Place; t: DetailText; locale: string }) {
    return (
        <aside className="lg:col-span-4">
            <div className="relative overflow-hidden rounded-[2rem] glass-strong p-6 shadow-float-lg md:p-7 lg:sticky lg:top-28">
                <div
                    className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-gold-400/20 blur-3xl"
                    aria-hidden="true"
                />

                <span className="eyebrow relative">{t.glance}</span>
                <h2 className="relative mt-3 font-display text-3xl font-medium tracking-tight text-ink-900 dark:text-ivory-50">
                    {t.quickInfo}
                </h2>

                <div className="relative mt-4 divide-y divide-ink-900/[0.06] dark:divide-white/[0.06]">
                    <Row icon={<Clock size={17} />} label={t.timing}>
                        <div className={value}>
                            {place.timing.open} - {place.timing.close}
                        </div>
                        <div className="mt-0.5 text-xs text-ink-400 dark:text-ivory-200/55">{place.timing.closedOn}</div>
                    </Row>

                    <Row icon={<Ticket size={17} />} label={t.entryFee}>
                        {place.ticket.isFree ? (
                            <div className="mt-0.5 text-sm font-bold text-emerald-600 dark:text-emerald-400">{t.freeEntry}</div>
                        ) : (
                            <div className={value}>
                                ₹{place.ticket.indian} <span className="font-normal text-ink-400 dark:text-ivory-200/55">({t.indian})</span>
                                <br />₹{place.ticket.foreigner}{" "}
                                <span className="font-normal text-ink-400 dark:text-ivory-200/55">({t.foreign})</span>
                            </div>
                        )}
                    </Row>

                    <Row icon={<Calendar size={17} />} label={t.bestTime}>
                        <div className={value}>{place.bestTimeToVisit.months}</div>
                    </Row>

                    <Row icon={<Hourglass size={17} />} label={t.visitDuration}>
                        <div className={value}>{place.visitDuration.recommended}</div>
                    </Row>

                    {place.location.distanceFromCity && (
                        <Row icon={<MapPin size={17} />} label={t.distance}>
                            <div className={value}>{place.location.distanceFromCity}</div>
                        </Row>
                    )}

                    <Row icon={<Star size={17} />} label={t.rating}>
                        <div className="flex items-baseline gap-1.5">
                            <span className="font-display text-2xl font-semibold text-ink-900 dark:text-ivory-50">{place.rating}</span>
                            <span className="text-xs text-ink-400 dark:text-ivory-200/55">
                                / 5 {t.reviews(place.reviews.toLocaleString(locale))}
                            </span>
                        </div>
                    </Row>
                </div>

                <a
                    href={place.location.googleMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold relative mt-6 w-full !py-3.5"
                >
                    <Navigation size={17} />
                    {t.getDirections}
                </a>

                {place.tags?.length > 0 && (
                    <div className="relative mt-6">
                        <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400 dark:text-ivory-200/55">
                            {t.tags}
                        </div>
                        <ul className="flex flex-wrap gap-1.5">
                            {place.tags.map((tag) => (
                                <li
                                    key={tag}
                                    className="rounded-full bg-ink-900/[0.04] px-3 py-1 text-xs text-ink-600 ring-1 ring-ink-900/[0.06] dark:bg-white/[0.05] dark:text-ivory-200/80 dark:ring-white/10"
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <Link href="/places" className="btn-glass group relative mt-4 w-full !py-3.5">
                    <ArrowLeft size={16} className="transition-transform duration-500 ease-lux group-hover:-translate-x-1" aria-hidden="true" />
                    {t.backToPlaces.replace(/^←\s*/, "")}
                </Link>
            </div>
        </aside>
    );
}
