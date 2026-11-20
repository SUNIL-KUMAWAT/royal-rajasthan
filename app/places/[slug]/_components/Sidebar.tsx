"use client";
import type { ReactNode } from "react";
import { Calendar, Clock, MapPin, Star } from "lucide-react";
import Link from "@/components/LocalizedLink";
import type { Place } from "@/types";
import type { DetailText } from "./text";

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
    return (
        <div className="flex items-start gap-3">
            <span className="text-yellow-500 mt-0.5 flex-shrink-0" aria-hidden="true">
                {icon}
            </span>
            <div>
                <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">{label}</div>
                {children}
            </div>
        </div>
    );
}

/** Sticky "Quick Info" card shown beside the main content. */
export function Sidebar({ place, t, locale }: { place: Place; t: DetailText; locale: string }) {
    return (
        <aside>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 lg:sticky lg:top-24">
                <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-5 text-lg">{t.quickInfo}</h2>

                <div className="space-y-4">
                    <Row icon={<Clock size={18} />} label={t.timing}>
                        <div className="text-gray-500 dark:text-gray-400 text-sm">
                            {place.timing.open} - {place.timing.close}
                        </div>
                        <div className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">{place.timing.closedOn}</div>
                    </Row>

                    <Row icon={<span className="text-lg">🎫</span>} label={t.entryFee}>
                        {place.ticket.isFree ? (
                            <div className="text-green-600 dark:text-green-400 font-bold text-sm">{t.freeEntry}</div>
                        ) : (
                            <div className="text-gray-500 dark:text-gray-400 text-sm">
                                ₹{place.ticket.indian} ({t.indian})
                                <br />₹{place.ticket.foreigner} ({t.foreign})
                            </div>
                        )}
                    </Row>

                    <Row icon={<Calendar size={18} />} label={t.bestTime}>
                        <div className="text-gray-500 dark:text-gray-400 text-sm">{place.bestTimeToVisit.months}</div>
                    </Row>

                    <Row icon={<span className="text-lg">⏱</span>} label={t.visitDuration}>
                        <div className="text-gray-500 dark:text-gray-400 text-sm">{place.visitDuration.recommended}</div>
                    </Row>

                    {place.location.distanceFromCity && (
                        <Row icon={<MapPin size={18} />} label={t.distance}>
                            <div className="text-gray-500 dark:text-gray-400 text-sm">{place.location.distanceFromCity}</div>
                        </Row>
                    )}

                    <Row icon={<Star size={18} />} label={t.rating}>
                        <div className="flex items-center gap-1">
                            <span className="text-yellow-500 font-bold">{place.rating}</span>
                            <span className="text-gray-400 text-xs">
                                / 5 {t.reviews(place.reviews.toLocaleString(locale))}
                            </span>
                        </div>
                    </Row>
                </div>

                <a
                    href={place.location.googleMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                    <MapPin size={18} />
                    {t.getDirections}
                </a>

                {place.tags?.length > 0 && (
                    <div className="mt-5">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t.tags}</div>
                        <ul className="flex flex-wrap gap-1.5">
                            {place.tags.map((tag) => (
                                <li
                                    key={tag}
                                    className="px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs rounded-full"
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <Link
                    href="/places"
                    className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 py-3 rounded-xl font-medium hover:border-yellow-400 hover:text-yellow-600 transition-all text-sm"
                >
                    {t.backToPlaces}
                </Link>
            </div>
        </aside>
    );
}
