// app/places/[slug]/PlaceDetailClient.tsx
"use client";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@/components/LocalizedLink";
import type { Place } from "@/types";
import { useLanguage } from "@/components/LanguageProvider";
import { ExploreMoreSection } from "@/components/shared/ExploreMoreSection";
import { isOpenAt } from "@/lib/openStatus";
import { useNow } from "@/lib/useClientHooks";
import { detailText } from "./_components/text";
import { Gallery } from "./_components/Gallery";
import { Lightbox } from "./_components/Lightbox";
import { PlaceHeader } from "./_components/PlaceHeader";
import { Sidebar } from "./_components/Sidebar";
import {
    FaqSection,
    HistorySection,
    LocationSection,
    NearbySection,
    OverviewIntro,
    TimingTicketsSection,
    TipsSection,
    type PlaceLink,
} from "./_components/Sections";

// JSON-LD (place, breadcrumb, FAQ) is rendered by the server page — not repeated here.

interface Props {
    place: Place;
    /** Hindi version of the same place, resolved on the server (null if not translated). */
    hindiPlace: Place | null;
    placeLinks: { en: PlaceLink[]; hi: PlaceLink[] };
}

type TabId = "overview" | "timing" | "location" | "history" | "tips" | "nearby" | "faqs";

export function PlaceDetailClient({ place: englishPlace, hindiPlace, placeLinks }: Props) {
    const { language } = useLanguage();
    const isHi = language === "hi";
    const place = isHi && hindiPlace ? hindiPlace : englishPlace;
    const links = isHi ? placeLinks.hi : placeLinks.en;
    const t = detailText(language);
    const locale = isHi ? "hi-IN" : "en-IN";

    const now = useNow();
    const isOpen = isOpenAt(place.timing, now, place.isOpen);

    const [activeImage, setActiveImage] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<TabId>("overview");

    const openLightbox = useCallback((index: number) => {
        setActiveImage(index);
        setLightboxOpen(true);
    }, []);
    const closeLightbox = useCallback(() => setLightboxOpen(false), []);

    const tabs: TabId[] = ["overview", "timing", "location", "history", "tips", "nearby"];
    if (place.faqs?.length) tabs.push("faqs");

    const renderTab = (tab: TabId) => {
        switch (tab) {
            case "overview":
                // Overview stacks every section so the whole page is readable on scroll
                return (
                    <div className="space-y-10">
                        <OverviewIntro place={place} t={t} />
                        <TimingTicketsSection place={place} t={t} isOpen={isOpen} divided />
                        <LocationSection place={place} t={t} divided />
                        <HistorySection place={place} t={t} divided />
                        <TipsSection place={place} t={t} divided />
                        <NearbySection place={place} t={t} links={links} divided />
                        <FaqSection place={place} t={t} divided />
                    </div>
                );
            case "timing":
                return <TimingTicketsSection place={place} t={t} isOpen={isOpen} />;
            case "location":
                return <LocationSection place={place} t={t} />;
            case "history":
                return <HistorySection place={place} t={t} />;
            case "tips":
                return <TipsSection place={place} t={t} />;
            case "nearby":
                return <NearbySection place={place} t={t} links={links} />;
            case "faqs":
                return <FaqSection place={place} t={t} />;
        }
    };

    return (
        <>
            <div className="mt-16 bg-palace-white dark:bg-gray-950 min-h-screen">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-3">
                    <ol className="max-w-7xl mx-auto px-4 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 flex-wrap">
                        <li>
                            <Link href="/" className="hover:text-yellow-600 transition-colors">
                                {t.home}
                            </Link>
                        </li>
                        <li aria-hidden="true">/</li>
                        <li>
                            <Link href="/places" className="hover:text-yellow-600 transition-colors">
                                {t.places}
                            </Link>
                        </li>
                        <li aria-hidden="true">/</li>
                        <li aria-current="page" className="text-gray-700 dark:text-gray-200 font-medium">
                            {place.name}
                        </li>
                    </ol>
                </nav>

                <Gallery
                    place={place}
                    isOpen={isOpen}
                    activeImage={activeImage}
                    onScrollImage={setActiveImage}
                    onOpenLightbox={openLightbox}
                    t={t}
                />

                <section className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 min-w-0">
                            <PlaceHeader place={place} t={t} locale={locale} />

                            {/* Tabs */}
                            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                                <div role="tablist" aria-label={place.name} className="flex flex-wrap w-full gap-y-1">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab}
                                            type="button"
                                            role="tab"
                                            id={`tab-${tab}`}
                                            aria-selected={activeTab === tab}
                                            aria-controls="place-tabpanel"
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-3 sm:px-6 py-2.5 sm:py-3 text-[13px] sm:text-base font-semibold whitespace-nowrap border-b-2 transition-all flex-shrink-0 ${
                                                activeTab === tab
                                                    ? "border-yellow-500 text-yellow-600 dark:text-yellow-400"
                                                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                            }`}
                                        >
                                            {t.tabs[tab]}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    id="place-tabpanel"
                                    role="tabpanel"
                                    aria-labelledby={`tab-${activeTab}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {renderTab(activeTab)}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <Sidebar place={place} t={t} locale={locale} />
                    </div>
                </section>

                <ExploreMoreSection currentPage="places" language={language} />
            </div>

            <Lightbox
                open={lightboxOpen}
                images={place.images}
                name={place.name}
                index={activeImage}
                onIndexChange={setActiveImage}
                onClose={closeLightbox}
                t={t}
            />
        </>
    );
}
