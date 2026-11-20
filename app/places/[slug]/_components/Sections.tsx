"use client";
// Content sections of the place detail page. Each section is written once and used
// both in the "Overview" tab (all sections stacked) and in its own tab.
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Check, ChevronDown, Clock, MapPin, Star, X } from "lucide-react";
import Link from "@/components/LocalizedLink";
import type { Place } from "@/types";
import type { DetailText } from "./text";

export type PlaceLink = { name: string; slug: string };

type SectionProps = { place: Place; t: DetailText };

// Tailwind only generates classes it can see in source, so colours are spelled out
// in full here (template strings like `bg-${color}-50` would silently not exist).
const TONES = {
    orange: { box: "bg-orange-50 dark:bg-orange-900/20", label: "text-orange-500", value: "text-orange-600 dark:text-orange-400" },
    blue: { box: "bg-blue-50 dark:bg-blue-900/20", label: "text-blue-500", value: "text-blue-600 dark:text-blue-400" },
    green: { box: "bg-green-50 dark:bg-green-900/20", label: "text-green-500", value: "text-green-600 dark:text-green-400" },
    purple: { box: "bg-purple-50 dark:bg-purple-900/20", label: "text-purple-500", value: "text-purple-600 dark:text-purple-400" },
    yellow: { box: "bg-yellow-50 dark:bg-yellow-900/20", label: "text-yellow-600", value: "text-yellow-700 dark:text-yellow-400" },
    maroon: { box: "bg-maroon-50 dark:bg-maroon-900/20", label: "text-maroon-400", value: "text-maroon-700 dark:text-maroon-300" },
} as const;
type Tone = keyof typeof TONES;

const card = "bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6";

function StatTile({ label, value, tone, large }: { label: string; value: ReactNode; tone: Tone; large?: boolean }) {
    const c = TONES[tone];
    return (
        <div className={`${c.box} rounded-xl p-4 text-center`}>
            <div className={`text-xs mb-1 ${c.label}`}>{label}</div>
            <div className={`font-bold ${large ? "text-xl md:text-2xl" : "text-sm"} ${c.value}`}>{value}</div>
        </div>
    );
}

function Note({ children, tone }: { children: ReactNode; tone: "blue" | "yellow" }) {
    const cls =
        tone === "blue"
            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
            : "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400";
    return (
        <div className={`mt-4 rounded-xl p-3 text-sm flex items-start gap-2 ${cls}`}>
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            <span>{children}</span>
        </div>
    );
}

function InfoRows({ rows }: { rows: { label: string; value?: ReactNode; cls?: string }[] }) {
    return (
        <dl className="space-y-1">
            {rows
                .filter((r) => r.value !== undefined && r.value !== "")
                .map((r) => (
                    <div
                        key={r.label}
                        className="flex justify-between items-start gap-4 py-2.5 border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                        <dt className="text-gray-500 dark:text-gray-400 text-sm flex-shrink-0">{r.label}</dt>
                        <dd className={`text-right ${r.cls ?? "font-medium text-gray-800 dark:text-gray-200 text-sm"}`}>{r.value}</dd>
                    </div>
                ))}
        </dl>
    );
}

/** Section title. In the stacked overview each section gets a dashed divider above it. */
export function SectionBlock({ title, icon, divided, children }: { title: string; icon?: ReactNode; divided?: boolean; children: ReactNode }) {
    return (
        <section className={divided ? "border-t-2 border-dashed border-gray-200 dark:border-gray-700 pt-8" : undefined}>
            <h2 className="font-playfair text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6 flex items-center gap-2">
                {icon}
                {title}
            </h2>
            {children}
        </section>
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

    return (
        <div className="space-y-10">
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-lg leading-relaxed">{place.description}</p>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-6">
                <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">{t.quickFacts}</h2>
                <dl className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {facts.map((fact) => (
                        <div key={fact.label}>
                            <dt className="text-xs text-gray-500 dark:text-gray-400 mb-1">{fact.label}</dt>
                            <dd className="font-medium text-gray-800 dark:text-gray-200 text-sm">{fact.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            {place.highlights?.length > 0 && (
                <div>
                    <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">{t.highlights}</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {place.highlights.map((h) => (
                            <li key={h} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                                <Star size={14} className="text-yellow-500 mt-0.5 flex-shrink-0 fill-yellow-500" />
                                <span className="text-sm">{h}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {place.activities && place.activities.length > 0 && (
                <div>
                    <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">{t.activities}</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {place.activities.map((act) => (
                            <li
                                key={act}
                                className="flex items-start gap-2.5 p-3 bg-yellow-500/5 dark:bg-yellow-500/10 border border-yellow-500/10 dark:border-yellow-500/20 rounded-xl text-gray-700 dark:text-gray-300"
                            >
                                <span className="mt-0.5" aria-hidden="true">🎯</span>
                                <span className="text-sm font-medium">{act}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {place.facilities?.length > 0 && (
                <div>
                    <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">{t.facilities}</h2>
                    <ul className="flex flex-wrap gap-2">
                        {place.facilities.map((f) => (
                            <li
                                key={f}
                                className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full"
                            >
                                <Check size={12} className="text-green-500" />
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {place.accessibility && place.accessibility.length > 0 && (
                <div>
                    <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">{t.accessibility}</h2>
                    <ul className="space-y-2.5">
                        {place.accessibility.map((acc) => (
                            <li key={acc} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                                <span className="text-blue-500 mt-0.5" aria-hidden="true">♿</span>
                                <span className="text-sm">{acc}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {place.significance && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 flex items-start gap-2">
                    <AlertCircle size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-blue-700 dark:text-blue-400 text-sm">
                        <strong>{t.significance}:</strong> {place.significance}
                    </p>
                </div>
            )}
        </div>
    );
}

// ─────────────────────────── Timing & tickets ───────────────────────────
export function TimingTicketsSection({ place, t, isOpen, divided }: SectionProps & { isOpen: boolean; divided?: boolean }) {
    const price = (v: number | undefined) => (v === undefined ? undefined : v === 0 ? t.free : `₹${v}`);
    return (
        <SectionBlock title={t.timingAndTickets} icon={<Clock size={22} className="text-yellow-500" />} divided={divided}>
            <div className="space-y-6">
                <div className={card}>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 text-base">
                        <Clock size={18} className="text-yellow-500" />
                        {t.openingHours}
                    </h3>
                    <InfoRows
                        rows={[
                            { label: t.opensAt, value: place.timing.open, cls: "text-green-600 font-bold text-lg md:text-xl" },
                            { label: t.closesAt, value: place.timing.close, cls: "text-red-500 font-bold text-lg md:text-xl" },
                            { label: t.closedOn, value: place.timing.closedOn },
                            {
                                label: t.currentStatus,
                                value: (
                                    <span className={`font-bold inline-flex items-center gap-1.5 ${isOpen ? "text-green-600" : "text-red-500"}`}>
                                        <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                                        {isOpen ? t.openNow : t.closed}
                                    </span>
                                ),
                                cls: "",
                            },
                        ]}
                    />
                    {place.timing.note && <Note tone="blue">{place.timing.note}</Note>}
                </div>

                <div className={card}>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-base">🎫 {t.entryTickets}</h3>
                    {place.ticket.isFree ? (
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center">
                            <div className="text-2xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-1">{t.freeEntry}</div>
                            <div className="text-green-600 dark:text-green-500 text-sm">{t.noTicket}</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <StatTile large tone="orange" label={t.indianAdult} value={`₹${place.ticket.indian}`} />
                            <StatTile large tone="blue" label={t.foreignerAdult} value={`₹${place.ticket.foreigner}`} />
                            <StatTile large tone="green" label={t.indianChild} value={price(place.ticket.childIndian)} />
                            <StatTile large tone="purple" label={t.cameraFee} value={price(place.ticket.camera)} />
                        </div>
                    )}
                    {place.ticket.note && <Note tone="yellow">{place.ticket.note}</Note>}
                </div>

                <div className={card}>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-base">⏱ {t.recommendedDuration}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.minimum}</div>
                            <div className="font-bold text-gray-700 dark:text-gray-300">{place.visitDuration.minimum}</div>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 text-center border-2 border-yellow-300 dark:border-yellow-700">
                            <div className="text-xs text-yellow-600 dark:text-yellow-400 mb-1">⭐ {t.recommended}</div>
                            <div className="font-bold text-yellow-700 dark:text-yellow-400">{place.visitDuration.recommended}</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.extended}</div>
                            <div className="font-bold text-gray-700 dark:text-gray-300">{place.visitDuration.extended}</div>
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
        <SectionBlock title={t.location} icon={<MapPin size={22} className="text-yellow-500" />} divided={divided}>
            <div className={`${card} mb-4`}>
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
                <a
                    href={location.googleMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                    <MapPin size={18} />
                    {t.openInMaps}
                </a>
            </div>
            <div className="rounded-2xl overflow-hidden h-64 md:h-80 border border-gray-200 dark:border-gray-700">
                <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5000!2d${location.longitude}!3d${location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t.mapTitle(place.name)}
                />
            </div>
        </SectionBlock>
    );
}

// ─────────────────────────── History ───────────────────────────
export function HistorySection({ place, t, divided }: SectionProps & { divided?: boolean }) {
    return (
        <SectionBlock title={`📜 ${t.historyOf(place.name)}`} divided={divided}>
            <div className={card}>
                <div
                    className="[&_p]:text-gray-600 dark:[&_p]:text-gray-300 [&_p]:leading-relaxed sm:[&_p]:leading-loose [&_p]:mb-4 sm:[&_p]:mb-6 [&_h3]:text-gold-600 dark:[&_h3]:text-gold-400 [&_h3]:font-playfair [&_h3]:text-lg sm:[&_h3]:text-2xl [&_h3]:mt-8 sm:[&_h3]:mt-10 [&_h3]:mb-3 sm:[&_h3]:mb-4 max-w-none text-sm sm:text-lg"
                    dangerouslySetInnerHTML={{ __html: place.history }}
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                    <StatTile tone="yellow" label={t.yearBuilt} value={place.yearBuilt} />
                    <StatTile tone="maroon" label={t.builtBy} value={place.builtBy} />
                    <StatTile tone="blue" label={t.architecture} value={place.architecture} />
                    <StatTile
                        tone="green"
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
        <SectionBlock title={`💡 ${t.tips}`} divided={divided}>
            <div className="space-y-6">
                {place.dos?.length > 0 && (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
                        <h3 className="font-bold text-green-800 dark:text-green-400 mb-4 text-base">✅ {t.dos}</h3>
                        <ul className="space-y-2">
                            {place.dos.map((d) => (
                                <li key={d} className="flex items-start gap-2 text-green-700 dark:text-green-400">
                                    <Check size={16} className="mt-0.5 flex-shrink-0" />
                                    <span className="text-sm">{d}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {place.donts?.length > 0 && (
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
                        <h3 className="font-bold text-red-800 dark:text-red-400 mb-4 text-base">❌ {t.donts}</h3>
                        <ul className="space-y-2">
                            {place.donts.map((d) => (
                                <li key={d} className="flex items-start gap-2 text-red-700 dark:text-red-400">
                                    <X size={16} className="mt-0.5 flex-shrink-0" />
                                    <span className="text-sm">{d}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
                    <h3 className="font-bold text-blue-800 dark:text-blue-400 mb-4 text-base">🌤 {t.bestTime}</h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { label: t.bestMonths, value: best.months },
                            { label: t.season, value: best.season },
                            { label: t.weather, value: best.weather },
                            { label: t.proTip, value: best.tip },
                        ]
                            .filter((i) => i.value)
                            .map((item) => (
                                <div key={item.label}>
                                    <dt className="text-xs text-blue-500 mb-1">{item.label}</dt>
                                    <dd className="font-medium text-blue-800 dark:text-blue-300 text-sm">{item.value}</dd>
                                </div>
                            ))}
                    </dl>
                </div>
                {place.photography && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-2xl p-6">
                        <h3 className="font-bold text-yellow-800 dark:text-yellow-400 mb-3 text-base">📸 {t.photography}</h3>
                        <p className="text-sm text-yellow-950/80 dark:text-yellow-300/80 leading-relaxed">{place.photography}</p>
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
        <SectionBlock title={`📍 ${t.nearby}`} divided={divided}>
            {place.nearbyPlaces?.length > 0 && (
                <div className={card}>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-base">{t.nearbyPlaces}</h3>
                    <ul className="space-y-3">
                        {place.nearbyPlaces.map((np) => (
                            <li key={np} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                <MapPin size={16} className="text-yellow-500 flex-shrink-0" />
                                <span className="text-gray-700 dark:text-gray-300 text-sm">{np}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {place.relatedPlaces && place.relatedPlaces.length > 0 && (
                <div className={`${card} mt-6`}>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-base">🔗 {t.relatedPlaces}</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {place.relatedPlaces.map((rp) => {
                            const slug = byName.get(rp.toLowerCase());
                            const inner = (
                                <>
                                    <span className="text-lg" aria-hidden="true">🏛️</span>
                                    <span className="text-sm font-semibold">{rp}</span>
                                </>
                            );
                            return (
                                <li key={rp}>
                                    {slug ? (
                                        <Link
                                            href={`/places/${slug}`}
                                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all border border-transparent hover:border-yellow-200 text-gray-800 dark:text-gray-200 hover:text-yellow-600"
                                        >
                                            {inner}
                                        </Link>
                                    ) : (
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-300">
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
function FAQItem({ question, answer, id }: { question: string; answer: string; id: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <h3>
                <button
                    type="button"
                    id={`${id}-q`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a`}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-50/50 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base"
                >
                    <span>{question}</span>
                    <ChevronDown size={18} className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
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
                        transition={{ duration: 0.2 }}
                    >
                        <div className="p-5 pt-0 text-gray-600 dark:text-gray-400 border-t border-gray-50 dark:border-gray-700 leading-relaxed text-sm">
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
        <SectionBlock title={`🙋 ${t.faqs}`} divided={divided}>
            <div className="space-y-4">
                {place.faqs.map((faq, i) => (
                    <FAQItem key={i} id={`place-faq-${i}`} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </SectionBlock>
    );
}
