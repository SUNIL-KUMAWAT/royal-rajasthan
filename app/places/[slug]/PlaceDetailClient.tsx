// app/places/[slug]/PlaceDetailClient.tsx
"use client";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
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
                    <div className="space-y-16">
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
            <div className="relative overflow-x-clip pt-24 md:pt-28">
                {/* Ambient light behind the page */}
                <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60rem]" aria-hidden="true">
                    <div className="absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-gold-400/15 blur-3xl dark:bg-gold-400/[0.07]" />
                    <div className="absolute -right-40 top-[28rem] h-[26rem] w-[26rem] rounded-full bg-maroon-500/10 blur-3xl dark:bg-maroon-500/15" />
                </div>

                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mx-auto mb-5 max-w-7xl px-4 sm:px-6 md:mb-6 lg:px-8">
                    <ol className="inline-flex max-w-full flex-wrap items-center gap-1.5 rounded-full glass px-4 py-2 text-xs text-ink-500 dark:text-ivory-200/70">
                        <li>
                            <Link href="/" className="transition-colors hover:text-gold-700 dark:hover:text-gold-300">
                                {t.home}
                            </Link>
                        </li>
                        <li aria-hidden="true">
                            <ChevronRight size={12} className="opacity-50" />
                        </li>
                        <li>
                            <Link href="/places" className="transition-colors hover:text-gold-700 dark:hover:text-gold-300">
                                {t.places}
                            </Link>
                        </li>
                        <li aria-hidden="true">
                            <ChevronRight size={12} className="opacity-50" />
                        </li>
                        <li aria-current="page" className="truncate font-medium text-ink-900 dark:text-ivory-50">
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

                <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 md:pt-14 lg:px-8">
                    <PlaceHeader place={place} t={t} locale={locale} />

                    <div className="hairline my-10 md:my-12" />

                    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                        <div className="min-w-0 lg:col-span-8">
                            {/* Tabs — glass segmented control */}
                            <div className="-mx-4 mb-10 overflow-x-auto px-4 scrollbar-hide sm:mx-0 sm:px-0">
                                <div
                                    role="tablist"
                                    aria-label={place.name}
                                    className="inline-flex min-w-max gap-1 rounded-full glass p-1.5"
                                >
                                    {tabs.map((tab) => {
                                        const selected = activeTab === tab;
                                        return (
                                            <button
                                                key={tab}
                                                type="button"
                                                role="tab"
                                                id={`tab-${tab}`}
                                                aria-selected={selected}
                                                aria-controls="place-tabpanel"
                                                onClick={() => setActiveTab(tab)}
                                                className={`relative whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors duration-300 sm:px-5 sm:text-sm ${
                                                    selected
                                                        ? "text-ivory-50 dark:text-ink-900"
                                                        : "text-ink-500 hover:text-ink-900 dark:text-ivory-200/70 dark:hover:text-ivory-50"
                                                }`}
                                            >
                                                {selected && (
                                                    <motion.span
                                                        layoutId="place-tab-pill"
                                                        className="absolute inset-0 rounded-full bg-ink-900 shadow-float dark:bg-gold-400"
                                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                                    />
                                                )}
                                                <span className="relative">{t.tabs[tab]}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    id="place-tabpanel"
                                    role="tabpanel"
                                    aria-labelledby={`tab-${activeTab}`}
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
