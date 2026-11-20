"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    Clock,
    MapPin,
    Star,
    ArrowLeft,
    Tag,
    ArrowRight,
    ArrowUpRight,
    Sparkles,
    ShoppingBag,
    Camera,
    Accessibility,
    HelpCircle,
    BookOpen,
    Compass,
    ChevronDown,
} from "lucide-react";
import Link from "@/components/LocalizedLink";
import { mapsSearchUrl } from "@/lib/shopping-utils";
import type { ShoppingDetail } from "@/lib/shopping";
import { useLanguage } from "@/components/LanguageProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

interface LinkItem {
  name: string;
  slug: string;
}

interface Props {
  place: ShoppingDetail;
  /** Hindi version of the same market, resolved on the server (null if not translated). */
  hindiPlace: ShoppingDetail | null;
  relatedLinks: LinkItem[];
  districtSiblings: LinkItem[];
}

/** Frosted card used for every content block on this page. */
function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass rounded-[1.75rem] md:rounded-[2rem] p-6 sm:p-8 ${className}`}>{children}</div>;
}

/** Small serif heading with an icon/gold tick, used inside panels. */
function PanelTitle({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 font-display text-2xl sm:text-[1.75rem] font-medium leading-tight tracking-tight text-ink-900 dark:text-ivory-50">
      {icon ?? <span className="h-px w-6 bg-gold-500" />}
      {children}
    </h2>
  );
}

function IconBadge({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-gold-700 dark:text-gold-300">
      {children}
    </span>
  );
}

export default function ShoppingDetailClient({ place: initialPlace, hindiPlace, relatedLinks, districtSiblings }: Props) {
  const { language } = useLanguage();

  const localizedPlace = (language === "hi" && hindiPlace) ? hindiPlace : initialPlace;

  const [activeTab, setActiveTab] = useState("overview");

  // Translation mapper
  const t = {
    overview: language === "hi" ? "अवलोकन" : "Overview",
    explore: language === "hi" ? "विशेषताएं और गतिविधियाँ" : "Explore & Activities",
    rules: language === "hi" ? "नियम और पहुंच" : "Tips & Accessibility",
    faqs: language === "hi" ? "अक्सर पूछे जाने वाले प्रश्न" : "FAQs",
    backBtn: language === "hi" ? "शॉपिंग गाइड" : "Shopping Guide",
    aboutTitle: language === "hi" ? "बाजार के बारे में" : "About the Market",
    timings: language === "hi" ? "खुलने का समय" : "Timings",
    closedOn: language === "hi" ? "साप्ताहिक अवकाश" : "Closed On",
    budget: language === "hi" ? "अनुमानित बजट" : "Budget Range",
    famousFor: language === "hi" ? "क्या खरीदें / प्रसिद्ध उत्पाद" : "Famous Specialties",
    activities: language === "hi" ? "बाजार की गतिविधियाँ" : "Market Activities",
    accessibility: language === "hi" ? "पहुंच और सुगमता" : "Accessibility Details",
    photoRules: language === "hi" ? "फोटोग्राफी नियम" : "Photography Guidelines",
    directions: language === "hi" ? "मार्ग निर्देश" : "Get Directions",
    mapLocation: language === "hi" ? "बाजार का पता" : "Market Location",
    localArtisans: language === "hi" ? "स्थानीय कारीगर और हस्तशिल्प" : "Local Artisans & Crafts",
  };

  const tabs = [
    { id: "overview", label: t.overview, icon: BookOpen },
    { id: "explore", label: t.explore, icon: ShoppingBag },
    { id: "rules", label: t.rules, icon: Accessibility },
    { id: "faqs", label: t.faqs, icon: HelpCircle },
  ];

  const proTip = localizedPlace.tips && (
    <div className="glass relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem] p-6 sm:p-8 flex gap-4 items-start">
      <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gold-500/20 blur-3xl" />
      <IconBadge><Compass size={20} /></IconBadge>
      <div className="relative">
        <h2 className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold-700 dark:text-gold-400">{language === "hi" ? "प्रो ट्रैवल टिप" : "Pro Travel Tip"}</h2>
        <p className="mt-2 font-display text-lg sm:text-xl leading-snug text-ink-800 dark:text-ivory-100">{localizedPlace.tips}</p>
      </div>
    </div>
  );

  return (
    <div className="relative isolate min-h-screen overflow-hidden text-ink-900 dark:text-ivory-100 pb-16">

      {/* Hero Banner Section */}
      <section className="relative isolate flex min-h-[62svh] sm:min-h-[70svh] w-full items-end overflow-hidden bg-ink-950 grain">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 animate-kenburns">
            <Image
              src={localizedPlace.image}
              alt={`${initialPlace.name}, ${initialPlace.district}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 scrim-cinematic" />
        </div>

        {/* Photo attribution (required by Creative Commons licences) + representative-photo notice */}
        {(initialPlace.imageCredit || initialPlace.imageRepresentative) && (
          <div className="absolute top-24 md:top-28 right-4 z-10 max-w-[75%] flex flex-col items-end gap-1.5">
            {initialPlace.imageRepresentative && (
              <span className="glass-dark px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-gold-300">
                {language === "hi" ? "प्रतीकात्मक चित्र" : "Representative photo"}
              </span>
            )}
            {initialPlace.imageCredit && (
              <a
                href={initialPlace.imageSource}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="glass-dark max-w-full truncate px-2.5 py-0.5 rounded-full text-[10px] text-ivory-100/80 hover:text-ivory-50"
              >
                {initialPlace.imageCredit}
              </a>
            )}
          </div>
        )}

        {/* Back Button and Quick Details */}
        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16 sm:pb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-6"
            >
              <Link href="/shopping" className="btn-glass-dark !px-4 !py-2 !text-xs sm:!text-sm group/back">
                <ArrowLeft size={16} className="transition-transform duration-500 ease-lux group-hover/back:-translate-x-1" />
                <span>{t.backBtn}</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: EASE }}
              className="space-y-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold-400 text-ink-900 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] shadow-gold">
                  <MapPin size={12} />
                  {localizedPlace.district}
                </span>
                {localizedPlace.rating && (
                  <span className="glass-dark inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-ivory-50 text-xs font-semibold">
                    <Star size={13} className="text-gold-400 fill-gold-400" />
                    {localizedPlace.rating} / 5
                  </span>
                )}
                <span className="glass-dark inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-gold-300 text-[10px] sm:text-xs font-semibold">
                  {localizedPlace.type}
                </span>
              </div>

              <h1 className="max-w-4xl font-display text-5xl sm:text-6xl md:text-7xl font-medium leading-[0.98] tracking-tight text-ivory-50">
                {localizedPlace.name}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Tabs Navigation */}
      <section className="relative z-20 -mt-8 sm:-mt-9 max-w-6xl mx-auto px-4 sm:px-6">
        <div role="tablist" className="glass-strong rounded-full p-1.5 flex overflow-x-auto gap-1 scrollbar-hide w-full sm:w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${
                  isActive
                    ? "text-ivory-50 dark:text-ink-900"
                    : "text-ink-500 dark:text-ivory-200/70 hover:text-ink-900 dark:hover:text-ivory-50"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="shopping-detail-tab"
                    className="absolute inset-0 rounded-full bg-ink-900 shadow-float dark:bg-gold-400"
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                )}
                <Icon size={16} className="relative" />
                <span className="relative">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Tab Contents */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 mt-10 sm:mt-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-20 -left-40 h-[28rem] w-[28rem] rounded-full bg-gold-500/10 blur-[150px]" />
          <div className="absolute bottom-0 -right-40 h-[28rem] w-[28rem] rounded-full bg-maroon-500/10 blur-[150px]" />
        </div>

        {/* All tab panels are server-rendered so search engines see the full content; inactive ones are hidden with CSS */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="space-y-5 sm:space-y-6"
        >

            {/* OVERVIEW TAB */}
            <div role="tabpanel" className={activeTab === "overview" ? "block" : "hidden"}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">

                {/* About Market */}
                <Panel className="lg:col-span-2 space-y-6">
                  <PanelTitle icon={<Sparkles className="text-gold-600 dark:text-gold-400" size={20} />}>
                    {t.aboutTitle}
                  </PanelTitle>
                  <p className="text-base sm:text-lg text-ink-500 dark:text-ivory-200/75 leading-relaxed">
                    {localizedPlace.description}
                  </p>

                  <div className="relative pt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="hairline absolute top-0 inset-x-0" />
                    <div className="flex items-start gap-3.5">
                      <IconBadge><Clock size={18} /></IconBadge>
                      <div>
                        <h3 className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-400 dark:text-ivory-200/50">{t.timings}</h3>
                        <p className="font-display text-lg text-ink-900 dark:text-ivory-50 mt-0.5">{localizedPlace.timings}</p>
                        <p className="text-xs text-ink-400 dark:text-ivory-200/50 mt-0.5">{t.closedOn}: {localizedPlace.closedOn || (language === "hi" ? "कभी नहीं" : "None")}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <IconBadge><Tag size={18} /></IconBadge>
                      <div>
                        <h3 className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-400 dark:text-ivory-200/50">{t.budget}</h3>
                        <p className="font-display text-lg text-ink-900 dark:text-ivory-50 mt-0.5">{localizedPlace.priceRange}</p>
                      </div>
                    </div>
                  </div>
                </Panel>

                {/* Location & Map Directions Card */}
                <div className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem] bg-ink-900 p-6 sm:p-8 text-ivory-50 shadow-float-lg flex flex-col justify-between gap-6 dark:bg-ink-800/80 dark:ring-1 dark:ring-white/10">
                  <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gold-500/25 blur-3xl" />
                  <div className="relative space-y-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-400/15 text-gold-300">
                      <MapPin size={22} />
                    </span>
                    <h2 className="font-display text-2xl font-medium text-ivory-50">
                      {t.mapLocation}
                    </h2>
                    <p className="text-sm text-ivory-100/70 leading-relaxed">
                      {localizedPlace.location}
                    </p>
                  </div>

                  <a
                    href={mapsSearchUrl(initialPlace.name, initialPlace.district)}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-gold relative w-full group/dir"
                  >
                    <span>{t.directions}</span>
                    <ArrowUpRight size={16} className="transition-transform duration-500 ease-lux group-hover/dir:-translate-y-0.5 group-hover/dir:translate-x-0.5" />
                  </a>
                </div>

              </div>

              {/* Add previews of other tabs inside Overview page */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 mt-5 sm:mt-6">
                  {/* Left Column: Specialties & Activities Preview */}
                  <div className="lg:col-span-2 space-y-5 sm:space-y-6">
                      {/* Specialties Preview */}
                      <Panel>
                          <PanelTitle>{t.famousFor}</PanelTitle>
                          <div className="flex flex-wrap gap-2">
                              {localizedPlace.famousFor.map((item: string, idx: number) => (
                                  <span key={idx} className="px-4 py-2 rounded-full text-sm font-medium border border-gold-500/25 bg-gold-500/5 text-ink-700 dark:text-ivory-100/85">
                                      {item}
                                  </span>
                              ))}
                          </div>
                      </Panel>

                      {/* Activities Preview */}
                      {localizedPlace.activities && localizedPlace.activities.length > 0 && (
                          <Panel>
                              <PanelTitle>{t.activities}</PanelTitle>
                              <ul className="space-y-2.5">
                                  {localizedPlace.activities.map((act: string, idx: number) => (
                                      <li key={idx} className="flex gap-3 text-sm sm:text-base text-ink-500 dark:text-ivory-200/75">
                                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                                          <span>{act}</span>
                                      </li>
                                  ))}
                              </ul>
                          </Panel>
                      )}
                  </div>

                  {/* Right Column: Tips & FAQs Preview */}
                  <div className="space-y-5 sm:space-y-6">
                      {/* Tips Preview */}
                      {proTip}

                      {/* First FAQ Preview */}
                      {localizedPlace.faqs && localizedPlace.faqs.length > 0 && (
                          <Panel className="space-y-3">
                              <h2 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-eyebrow text-ink-400 dark:text-ivory-200/50">
                                  <HelpCircle size={14} className="text-gold-600 dark:text-gold-400" />
                                  {language === "hi" ? "अक्सर पूछे जाने वाले प्रश्न" : "Featured FAQ"}
                              </h2>
                              <p className="font-display text-xl leading-snug text-ink-900 dark:text-ivory-50">{localizedPlace.faqs[0].question}</p>
                              <p className="text-sm text-ink-500 dark:text-ivory-200/70 leading-relaxed">{localizedPlace.faqs[0].answer}</p>
                          </Panel>
                      )}
                  </div>
              </div>
            </div>

            {/* EXPLORE & SPECIALTIES TAB */}
            <div role="tabpanel" className={activeTab === "explore" ? "space-y-5 sm:space-y-6" : "hidden"}>

                {/* Famous Specialties */}
                <Panel>
                  <PanelTitle>{t.famousFor}</PanelTitle>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {localizedPlace.famousFor.map((item: string, idx: number) => (
                      <div
                        key={idx}
                        className="group flex flex-col items-center justify-center gap-3 rounded-[1.5rem] border border-gold-500/15 bg-gold-500/5 p-5 text-center cursor-default transition-all duration-500 ease-lux hover:-translate-y-1 hover:border-gold-500/40 hover:bg-gold-500/10"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/10 text-gold-700 dark:text-gold-300 transition-transform duration-500 ease-lux group-hover:scale-110">
                          <ShoppingBag size={18} aria-hidden="true" />
                        </span>
                        <span className="text-sm font-medium text-ink-800 dark:text-ivory-100">{item}</span>
                      </div>
                    ))}
                  </div>
                </Panel>

                {/* Activities Grid */}
                {localizedPlace.activities && localizedPlace.activities.length > 0 && (
                  <Panel>
                    <PanelTitle>{t.activities}</PanelTitle>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                      {localizedPlace.activities.map((act: string, idx: number) => (
                        <div key={idx} className="flex gap-4 rounded-[1.5rem] border border-ink-900/5 bg-white/40 p-5 transition-all duration-500 ease-lux hover:-translate-y-1 hover:shadow-float dark:border-white/5 dark:bg-white/[0.03]">
                          <span className="font-display text-3xl italic leading-none text-gold-600 dark:text-gold-400 tabular-nums">{String(idx + 1).padStart(2, "0")}</span>
                          <div>
                            <h3 className="text-[11px] font-semibold uppercase tracking-eyebrow text-ink-400 dark:text-ivory-200/50">{language === "hi" ? `गतिविधि ${idx + 1}` : `Activity ${idx + 1}`}</h3>
                            <p className="text-sm text-ink-600 dark:text-ivory-200/75 mt-1.5 leading-relaxed">{act}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Panel>
                )}

            </div>

            {/* TIPS, ACCESS & PHOTOGRAPHY TAB */}
            <div role="tabpanel" className={activeTab === "rules" ? "grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6" : "hidden"}>

                {/* Accessibility */}
                {localizedPlace.accessibility && localizedPlace.accessibility.length > 0 && (
                  <Panel className="space-y-4">
                    <PanelTitle icon={<IconBadge><Accessibility size={18} /></IconBadge>}>
                      {t.accessibility}
                    </PanelTitle>
                    <ul className="space-y-3">
                      {localizedPlace.accessibility.map((acc: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-ink-500 dark:text-ivory-200/75">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                          <span>{acc}</span>
                        </li>
                      ))}
                    </ul>
                  </Panel>
                )}

                {/* Photography & Tips */}
                <div className="space-y-5 sm:space-y-6">
                  {localizedPlace.photography && (
                    <Panel className="space-y-4">
                      <PanelTitle icon={<IconBadge><Camera size={18} /></IconBadge>}>
                        {t.photoRules}
                      </PanelTitle>
                      <p className="text-sm sm:text-base text-ink-500 dark:text-ivory-200/75 leading-relaxed">
                        {localizedPlace.photography}
                      </p>
                    </Panel>
                  )}

                  {proTip}
                </div>

            </div>

            {/* FAQS TAB */}
            {localizedPlace.faqs && localizedPlace.faqs.length > 0 && (
              <div role="tabpanel" className={activeTab === "faqs" ? "" : "hidden"}>
                <Panel className="space-y-6">
                  <PanelTitle icon={<HelpCircle className="text-gold-600 dark:text-gold-400" size={20} />}>
                    {t.faqs}
                  </PanelTitle>
                  <div className="space-y-3">
                    {localizedPlace.faqs.map((faq, idx) => (
                      <details
                        key={idx}
                        className="group rounded-[1.5rem] border border-ink-900/5 bg-white/40 px-5 py-4 transition-shadow duration-500 ease-lux open:shadow-float dark:border-white/5 dark:bg-white/[0.03]"
                      >
                        <summary className="flex justify-between items-center gap-4 font-display text-lg sm:text-xl font-medium text-ink-900 dark:text-ivory-50 cursor-pointer list-none select-none transition-colors hover:text-gold-700 dark:hover:text-gold-300 [&::-webkit-details-marker]:hidden">
                          <span>{faq.question}</span>
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-900/10 dark:border-white/10 text-ink-400 dark:text-ivory-200/60 transition-transform duration-500 ease-lux group-open:rotate-180 group-open:border-gold-500/50 group-open:text-gold-700 dark:group-open:text-gold-300">
                            <ChevronDown size={16} />
                          </span>
                        </summary>
                        <p className="text-sm sm:text-base text-ink-500 dark:text-ivory-200/70 mt-3 leading-relaxed">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </Panel>
              </div>
            )}

        </motion.div>
      </section>

      {/* Internal links: related & nearby markets */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-14 sm:mt-20">
        <div className="relative pt-12 space-y-10">
          <div className="hairline absolute top-0 inset-x-0" />
          {relatedLinks.length > 0 && (
            <div>
              <span className="eyebrow">{language === "hi" ? "और खोजें" : "Keep exploring"}</span>
              <h2 className="mt-3 mb-5 display-title text-3xl sm:text-4xl">
                {language === "hi" ? "संबंधित बाजार" : "Related Markets"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedLinks.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/shopping/${r.slug}`}
                    className="chip-idle !text-sm hover:-translate-y-0.5"
                  >
                    {r.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {districtSiblings.length > 0 && (
            <div>
              <h2 className="mb-5 font-display text-2xl sm:text-3xl font-medium text-ink-900 dark:text-ivory-50">
                {language === "hi" ? `${initialPlace.district} के अन्य बाजार` : `More Markets in ${initialPlace.district}`}
              </h2>
              <div className="flex flex-wrap gap-2">
                {districtSiblings.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/shopping/${r.slug}`}
                    className="chip-idle !text-sm hover:-translate-y-0.5"
                  >
                    {r.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <Link
            href={`/shopping/${initialPlace.districtSlug}`}
            className="btn-primary group/guide"
          >
            {language === "hi" ? `${initialPlace.district} शॉपिंग गाइड देखें` : `Complete ${initialPlace.district} Shopping Guide`}
            <ArrowRight size={16} className="transition-transform duration-500 ease-lux group-hover/guide:translate-x-1" />
          </Link>
        </div>
      </section>

    </div>
  );
}
