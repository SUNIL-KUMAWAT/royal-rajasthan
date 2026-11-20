// components/home/FestivalsSection.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "@/components/LocalizedLink";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Helper: Convert festival name to URL slug
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

import {
  Calendar,
  Clock,
  MapPin,
  Star,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  ChevronDown
} from "lucide-react";

import type { FestivalCard } from "@/lib/festivals";
import { FESTIVALS_FAQS_ENGLISH, FESTIVALS_FAQS_HINDI } from "@/constants/faqs";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { TiltCard } from "./TiltCard";

// ============ TYPES ============
type Festival = FestivalCard;

const EASE = [0.22, 1, 0.36, 1] as const;

function formatNextDate(nextDate?: string): string {
  if (!nextDate) return "Coming Soon";
  const parts = nextDate.split('-');
  if (parts.length !== 3) return nextDate;
  const [year, month, day] = parts;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${day} ${months[parseInt(month) - 1]} ${year}`;
}

/** Bento rhythm for the festival grid: every 8 cards = one 2x2 feature, one wide card, six singles. */
function bentoClass(idx: number): string {
  const slot = idx % 8;
  if (slot === 0) return "sm:col-span-2 lg:col-span-2 lg:row-span-2";
  if (slot === 5) return "sm:col-span-2 lg:col-span-2";
  return "";
}

// ============ FESTIVAL HERO ============
function FestivalHero({
  festival,
  onNext,
  onPrev,
  index,
  total,
}: {
  festival: Festival;
  onNext: () => void;
  onPrev: () => void;
  index: number;
  total: number;
}) {
  const { language } = useLanguage();
  return (
    <div className="relative h-[72svh] min-h-[520px] md:h-[86svh] md:min-h-[720px] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-ink-950 shadow-float-lg isolate grain">
      <AnimatePresence mode="wait">
        <motion.div
          key={festival.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="absolute inset-0"
        >
          {/* Photo with slow Ken Burns */}
          <div className="absolute inset-0 animate-kenburns">
            <Image
              src={festival.image}
              alt={festival.name}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 scrim-cinematic" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 via-ink-950/20 to-transparent" />

          {/* Featured Festival Badge - Top Left */}
          <div className="absolute top-5 left-5 md:top-8 md:left-10 z-20">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-eyebrow text-gold-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse-gold" />
              Featured Festival
            </motion.span>
          </div>

          {/* Top Right Sidebar Stack: Rating + Date Card */}
          <div className="absolute top-5 right-5 md:top-8 md:right-10 flex flex-col items-end gap-2.5 z-20">
            <div className="glass-dark flex items-center gap-1.5 rounded-full px-3.5 py-1.5">
              <Star size={14} className="text-gold-400 fill-gold-400" />
              <span className="text-ivory-50 font-semibold text-xs md:text-sm">{festival.rating}</span>
            </div>
            <div className="glass-dark rounded-2xl px-4 py-3 text-right">
              <p className="text-ivory-100/55 text-[10px] mb-1 font-semibold uppercase tracking-eyebrow">
                Date
              </p>
              <p className="font-display text-ivory-50 text-lg md:text-2xl leading-none whitespace-nowrap">
                {formatNextDate(festival.nextDate)}
              </p>
            </div>
          </div>

          {/* Editorial content + glass info panel */}
          <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-24 md:px-10 md:pb-28 lg:px-14">
            <div className="max-w-3xl">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                className="eyebrow !text-gold-300"
              >
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
                className="mt-4 font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.98] tracking-tight text-ivory-50"
              >
                {festival.name}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
                className="mt-6 glass-dark rounded-[1.75rem] p-4 md:p-6 max-w-2xl"
              >
                <div className="flex flex-wrap gap-2 text-ivory-100/90">
                  {[
                    { icon: MapPin, text: festival.location },
                    { icon: Calendar, text: festival.month },
                    { icon: Clock, text: festival.duration },
                  ].map(({ icon: Icon, text }) => (
                    <span key={text} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs md:text-sm">
                      <Icon size={13} className="text-gold-300" />
                      {text}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-ivory-100/80 text-sm md:text-base leading-relaxed line-clamp-3 hidden sm:block">
                  {festival.description}
                </p>

                <div className="mt-5">
                  <Link href={`/festivals/${toSlug(festival.engName || festival.name)}`} className="btn-gold group/hero-btn !py-2.5 md:!py-3">
                    <span>{language === 'hi' ? 'अधिक विवरण' : 'More Details'}</span>
                    <ArrowRight size={16} className="transition-transform duration-500 ease-lux group-hover/hero-btn:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute bottom-5 right-5 md:bottom-8 md:right-10 flex gap-3 z-20">
        <button
          type="button"
          onClick={onPrev}
          aria-label={language === 'hi' ? 'पिछला त्योहार' : 'Previous festival'}
          className="glass-dark w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-ivory-50 transition-all duration-500 ease-lux hover:bg-white/20 hover:-translate-y-0.5 hover:border-gold-300/50"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label={language === 'hi' ? 'अगला त्योहार' : 'Next festival'}
          className="glass-dark w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-ivory-50 transition-all duration-500 ease-lux hover:bg-white/20 hover:-translate-y-0.5 hover:border-gold-300/50"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}

// ============ MAIN COMPONENT (Named Export) ============
export function FestivalsSection({ festivals, festivalsHi }: { festivals: FestivalCard[]; festivalsHi: FestivalCard[] }) {
  const { language } = useLanguage();
  const currentFestivals = language === 'hi' ? festivalsHi : festivals;

  const [active, setActive] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);

  const festival: Festival = currentFestivals[active];
  const progress = ((active + 1) / currentFestivals.length) * 100;

  const handleNext = () => setActive((prev) => (prev + 1) % currentFestivals.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + currentFestivals.length) % currentFestivals.length);

  const uniqueLocations = useMemo(() => {
    const locs = Array.from(new Set(currentFestivals.map((f) => f.location)));
    return ["All", ...locs];
  }, [currentFestivals]);

  const filteredFestivals = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return currentFestivals.filter((f) => {
      // Plain substring match (user input must not be treated as a regex)
      const matchSearch = !query || f.name.toLowerCase().includes(query);
      const matchLocation = selectedLocation === "All" || f.location === selectedLocation;
      return matchSearch && matchLocation;
    });
  }, [searchTerm, selectedLocation, currentFestivals]);

  const visibleFestivals = filteredFestivals.slice(0, visibleCount);

  const handleLoadMore = () => {
    const nextItemIndex = visibleCount;
    setVisibleCount(prev => prev + 8);
    // Smooth scroll exactly to the first newly loaded card
    setTimeout(() => {
      const element = document.getElementById(`festival-card-${nextItemIndex}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <>
      <section className="relative isolate overflow-hidden pt-24 md:pt-28 pb-16 md:pb-28">
        {/* Ambient light */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-gold-500/15 blur-[160px] dark:bg-gold-500/10" />
          <div className="absolute top-[40%] -right-40 h-[32rem] w-[32rem] rounded-full bg-maroon-500/10 blur-[160px] dark:bg-maroon-500/20" />
          <div className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-royal-orange/10 blur-[160px] dark:bg-royal-orange/5" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Festival Hero Slider */}
          <FestivalHero
            festival={festival}
            onNext={handleNext}
            onPrev={handlePrev}
            index={active}
            total={currentFestivals.length}
          />

          {/* Progress Bar */}
          <div className="mt-8 flex items-center justify-center gap-4 max-w-2xl mx-auto">
            <span className="font-display text-sm italic text-ink-400 dark:text-ivory-200/50 tabular-nums">
              {String(active + 1).padStart(2, "0")}
            </span>
            <div className="relative h-px flex-1 bg-ink-900/10 dark:bg-white/10 overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gold-sheen"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            </div>
            <span className="font-display text-sm italic text-ink-400 dark:text-ivory-200/50 tabular-nums">
              {String(currentFestivals.length).padStart(2, "0")}
            </span>
          </div>

          {/* Festival Details */}
          <div className="mt-16 md:mt-28 grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left */}
            <Reveal className="lg:col-span-7">
              <span className="eyebrow">Festival Details</span>

              <h3 className="mt-5 display-title text-4xl md:text-6xl">
                {festival.name}
              </h3>

              <div className="flex flex-wrap gap-2 mt-6 mb-7">
                {[
                  { icon: MapPin, text: festival.location },
                  { icon: Calendar, text: festival.month },
                  { icon: Clock, text: festival.duration },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="chip-idle !cursor-default">
                    <Icon size={14} className="text-gold-600 dark:text-gold-400" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <p className="text-ink-500 dark:text-ivory-200/70 leading-relaxed md:leading-8 text-sm md:text-lg max-w-2xl">
                {festival.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mt-7">
                {festival.highlights.map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="rounded-full border border-gold-500/25 bg-gold-500/5 px-4 py-2 text-xs md:text-sm font-medium text-ink-700 dark:text-ivory-100/90 cursor-default transition-colors hover:border-gold-500/50 hover:bg-gold-500/10"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mt-9">
                <Link href={`/festivals/${toSlug(festival.engName || festival.name)}`} className="btn-primary group/btn">
                  <span>{language === 'hi' ? 'अधिक विवरण' : 'More Details'}</span>
                  <ArrowRight size={16} className="transition-transform duration-500 ease-lux group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </Reveal>

            {/* Right - Stats */}
            <RevealGroup className="lg:col-span-5 grid grid-cols-2 gap-3 md:gap-4">
              {[
                {
                  label: "Festival Rating",
                  value: festival.rating,
                  isRating: true,
                },
                {
                  label: "Duration",
                  value: festival.duration,
                  isRating: false,
                },
                {
                  label: "Best Month",
                  value: festival.month,
                  isRating: false,
                },
                {
                  label: "Location",
                  value: festival.location,
                  isRating: false,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={revealItem}
                  className={`group glass relative rounded-[1.75rem] p-5 md:p-7 transition-all duration-500 ease-lux hover:-translate-y-1 hover:shadow-float-lg ${
                    i === 0 ? "bg-gradient-to-br from-gold-500/10 to-transparent" : ""
                  }`}
                >
                  <h4 className="font-sans text-[10px] md:text-[11px] font-semibold uppercase tracking-eyebrow text-ink-400 dark:text-ivory-200/50 mb-4 md:mb-6">
                    {item.label}
                  </h4>
                  {item.isRating ? (
                    <div className="flex items-center gap-2">
                      <Star className="text-gold-500 fill-gold-500 w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 ease-lux group-hover:scale-110" />
                      <span className="font-display text-3xl md:text-5xl font-medium text-ink-900 dark:text-ivory-50 leading-none">
                        {item.value}
                      </span>
                    </div>
                  ) : (
                    <div className="font-display text-xl md:text-3xl font-medium text-ink-900 dark:text-ivory-50 leading-tight">
                      {item.value}
                    </div>
                  )}
                </motion.div>
              ))}
            </RevealGroup>
          </div>

          {/* Experience The Magic */}
          <div className="mt-20 md:mt-32 pt-14 md:pt-24 relative">
            <div className="hairline absolute top-0 inset-x-0" />

            <Reveal className="text-center mb-10 md:mb-14">
              <span className="eyebrow">Rajasthan Festivals</span>

              <h2 className="mt-4 display-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Experience The{" "}
                <em className="italic font-normal text-gold-sheen">Magic</em>
              </h2>
              <p className="text-ink-500 dark:text-ivory-200/70 mt-5 md:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
                Discover The Cultural Soul of Rajasthan. Experience centuries-old traditions, vibrant celebrations,
                royal processions and unforgettable cultural festivals.
              </p>
            </Reveal>

            {/* Filters & Search */}
            <Reveal className="glass-strong flex flex-col md:flex-row items-center justify-between gap-3 mb-10 md:mb-14 p-3 rounded-[1.75rem] md:rounded-full">
              <div className="relative w-full md:flex-1">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ivory-200/40 pointer-events-none" size={18} />
                <input
                  type="text"
                  placeholder="Search festival by name (e.g. desert|camel)"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setVisibleCount(8);
                  }}
                  className="field !rounded-full !py-3 pl-12"
                />
              </div>

              <div className="relative w-full md:w-auto md:min-w-[240px]">
                <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ivory-200/40 pointer-events-none" size={16} />
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    setVisibleCount(8);
                  }}
                  className="field !rounded-full !py-3 pl-12 pr-10 appearance-none cursor-pointer"
                >
                  {uniqueLocations.map(loc => (
                    <option key={loc} value={loc} className="bg-ivory-50 text-ink-900 dark:bg-ink-800 dark:text-ivory-100">{loc}</option>
                  ))}
                </select>
                {/* Custom arrow */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink-400 dark:text-ivory-200/40">
                  <ChevronDown size={16} />
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[300px] sm:auto-rows-[280px] grid-flow-dense gap-4 md:gap-5">
              <AnimatePresence mode="popLayout">
                {visibleFestivals.map((f, idx) => {
                  const isFeature = idx % 8 === 0;
                  return (
                    <motion.div
                      key={f.id}
                      id={`festival-card-${idx}`}
                      layout
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 40 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className={`scroll-mt-32 ${bentoClass(idx)}`}
                    >
                      <TiltCard maxTilt={isFeature ? 4 : 7} className="h-full rounded-[1.75rem]">
                        <Link href={`/festivals/${toSlug(f.engName || f.name)}`} className="block h-full rounded-[1.75rem]">
                          <div className="group relative h-full overflow-hidden rounded-[1.75rem] bg-ink-900 shadow-float transition-shadow duration-500 ease-lux hover:shadow-float-lg transform-gpu">
                            <Image
                              src={f.image}
                              alt={f.name}
                              fill
                              sizes={isFeature ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
                              className="object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 scrim-b transition-opacity duration-500 group-hover:opacity-90" />

                            <span className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full glass-dark text-ivory-50 opacity-0 -translate-y-1 transition-all duration-500 ease-lux group-hover:opacity-100 group-hover:translate-y-0">
                              <ArrowUpRight size={16} />
                            </span>

                            <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 transition-transform duration-500 ease-lux group-hover:-translate-y-1">
                              <div className="glass-dark inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3">
                                <MapPin size={12} className="text-gold-300" />
                                <span className="text-ivory-100/90 text-xs font-medium">{f.location}</span>
                              </div>
                              <h4 className={`font-display font-medium text-ivory-50 leading-[1.05] tracking-tight ${isFeature ? "text-3xl md:text-5xl" : "text-2xl"}`}>
                                {f.name}
                              </h4>
                              {isFeature && (
                                <p className="mt-3 hidden md:block max-w-md text-sm text-ivory-100/70 leading-relaxed line-clamp-2">
                                  {f.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {filteredFestivals.length === 0 && (
              <div className="glass rounded-[2rem] text-center py-20 px-6">
                <p className="font-display text-2xl text-ink-500 dark:text-ivory-200/60">No festivals found matching your criteria.</p>
              </div>
            )}

            {/* ── Load More button ── */}
            {visibleCount < filteredFestivals.length && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mt-12 md:mt-16 flex flex-col items-center gap-4"
              >
                <p className="text-xs uppercase tracking-eyebrow text-ink-400 dark:text-ivory-200/50 font-semibold">
                  Showing {visibleFestivals.length} of {filteredFestivals.length} festivals
                </p>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLoadMore();
                  }}
                  className="btn-glass group"
                >
                  <Calendar size={16} className="text-gold-600 dark:text-gold-400" />
                  Load More Festivals
                  <span className="rounded-full bg-gold-500/15 px-2 py-0.5 text-xs font-bold text-gold-700 dark:text-gold-300">
                    +{Math.min(8, filteredFestivals.length - visibleCount)} more
                  </span>
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Visual FAQ Section */}
          <FAQSection
            faqs={language === "hi" ? FESTIVALS_FAQS_HINDI : FESTIVALS_FAQS_ENGLISH}
            title={language === "hi" ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
          />
        </div>
      </section>

      {/* Dynamic JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": (language === "hi" ? FESTIVALS_FAQS_HINDI : FESTIVALS_FAQS_ENGLISH).map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </>
  );
}

// ============ REUSABLE FAQ SECTION COMPONENT ============
function FAQSection({ faqs, title }: { faqs: { question: string, answer: string }[], title: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative mt-20 md:mt-28 pt-16 md:pt-24">
      <div className="hairline absolute top-0 inset-x-0" />
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center mb-10 md:mb-12">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 display-title text-4xl md:text-5xl">
            {title}
          </h2>
        </Reveal>
        <RevealGroup className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                variants={revealItem}
                className={`glass rounded-[1.5rem] overflow-hidden transition-shadow duration-500 ease-lux ${isOpen ? "shadow-float-lg" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left text-ink-900 dark:text-ivory-50 font-display text-lg md:text-xl font-medium transition-colors hover:text-gold-700 dark:hover:text-gold-300"
                >
                  <span>{faq.question}</span>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-lux ${isOpen ? "rotate-180 border-gold-500/50 bg-gold-500/10 text-gold-700 dark:text-gold-300" : "border-ink-900/10 text-ink-400 dark:border-white/10 dark:text-ivory-200/60"}`}>
                    <ChevronDown size={16} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <div className="px-6 pb-6 pt-1 text-ink-500 dark:text-ivory-200/70 text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
