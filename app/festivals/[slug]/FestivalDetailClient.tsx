"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  ArrowLeft,
  ArrowUpRight,
  Share2,
  Sparkles,
  Accessibility,
  Camera,
  ChevronDown
} from "lucide-react";
import Link from "@/components/LocalizedLink";
import { TiltCard } from "@/components/home/TiltCard";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

// Helper: Convert festival name to URL slug
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Bento rhythm for related festivals: a 2x2 feature, two singles, one wide card. */
function relatedBento(idx: number): string {
  const slot = idx % 4;
  if (slot === 0) return "sm:col-span-2 lg:col-span-2 lg:row-span-2";
  if (slot === 3) return "sm:col-span-2 lg:col-span-2";
  return "";
}

interface Festival {
  id: number;
  name: string;
  image: string;
  location: string;
  month: string;
  duration: string;
  description: string;
  history?: string;
  highlights: string[];
  rating: number;
  nextDate?: string;
  district?: string;
  activities?: string[];
  accessibility?: string[];
  photography?: string;
  relatedPlaces?: string[];
  faqs?: { question: string; answer: string }[];
  keywords?: string[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  designedBy?: string;
}

interface Props {
  festival: Festival;
  related: Festival[];
  /** Hindi versions picked on the server, so the client never imports the full datasets */
  festivalHi?: Festival;
  relatedHi: Festival[];
}

function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-5 flex items-center gap-3 font-display text-2xl sm:text-3xl font-medium text-ink-900 dark:text-ivory-50">
      {children}
    </h3>
  );
}

export default function FestivalDetailClient({ festival, related, festivalHi, relatedHi }: Props) {
  const { language } = useLanguage();
  const currentFestival = (language === 'hi' && festivalHi) || festival;
  const currentRelated = language === 'hi' ? relatedHi : related;

  // JSON-LD (Event, FAQ, Breadcrumb) is rendered by the server page — not repeated here.

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${currentFestival.name} | Rajasthan Tourism Places`,
        text: `Check out ${currentFestival.name} in ${currentFestival.location}!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden text-ink-900 dark:text-ivory-100">

      {/* Hero Section */}
      <section className="relative isolate flex min-h-[78svh] lg:min-h-[88svh] w-full items-end overflow-hidden bg-ink-950 grain">
        {/* Background Image with Ken Burns */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 animate-kenburns">
            <Image
              src={currentFestival.image}
              alt={currentFestival.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 scrim-cinematic" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/60 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-14 md:pb-20">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
            className="mb-8"
          >
            <Link href="/#festivals" className="btn-glass-dark !px-4 !py-2 group/back">
              <ArrowLeft size={16} className="transition-transform duration-500 ease-lux group-hover/back:-translate-x-1" />
              <span>Back to Festivals</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: EASE }}
            className="max-w-5xl"
          >
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <span className="glass-dark inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium text-gold-300">
                <MapPin size={14} />
                {currentFestival.location}
              </span>
              <span className="glass-dark inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium text-ivory-50">
                <Star size={13} className="text-gold-400 fill-gold-400" />
                {currentFestival.rating}
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[0.98] tracking-tight text-ivory-50 mb-8">
              {currentFestival.name}
            </h1>

            <div className="glass-dark inline-flex flex-wrap gap-6 sm:gap-10 rounded-[1.75rem] px-5 py-4 sm:px-7 sm:py-5 text-ivory-100/90">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5">
                  <Calendar size={18} className="text-gold-300" />
                </span>
                <div>
                  <p className="text-[10px] text-ivory-100/50 uppercase tracking-eyebrow font-semibold">Month</p>
                  <p className="font-display text-lg sm:text-xl">{currentFestival.month}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5">
                  <Clock size={18} className="text-gold-300" />
                </span>
                <div>
                  <p className="text-[10px] text-ivory-100/50 uppercase tracking-eyebrow font-semibold">Duration</p>
                  <p className="font-display text-lg sm:text-xl">{currentFestival.duration}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Ambient light */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-10 -left-40 h-[30rem] w-[30rem] rounded-full bg-gold-500/10 blur-[150px]" />
          <div className="absolute bottom-0 -right-40 h-[30rem] w-[30rem] rounded-full bg-maroon-500/10 blur-[150px]" />
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">

          {/* Sticky glass info panel */}
          <aside className="lg:col-span-4 lg:order-last">
            <Reveal className="glass-strong rounded-[2rem] p-6 sm:p-7 lg:sticky lg:top-28">
              <span className="eyebrow">{language === "hi" ? "एक नज़र में" : "At a glance"}</span>

              <dl className="mt-6 space-y-4">
                {[
                  { icon: MapPin, label: "Location", value: currentFestival.location },
                  { icon: Calendar, label: "Month", value: currentFestival.month },
                  { icon: Clock, label: "Duration", value: currentFestival.duration },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-gold-700 dark:text-gold-300">
                      <Icon size={17} />
                    </span>
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-eyebrow text-ink-400 dark:text-ivory-200/50">{label}</dt>
                      <dd className="font-display text-lg text-ink-900 dark:text-ivory-50">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              {currentFestival.nextDate && (
                <>
                  <div className="hairline my-6" />
                  <div>
                    <p className="text-gold-700 dark:text-gold-400 text-[10px] font-semibold uppercase tracking-eyebrow mb-1">Next Expected Date</p>
                    <p className="font-display text-3xl font-medium text-ink-900 dark:text-ivory-50">{new Date(currentFestival.nextDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </>
              )}

              <div className="hairline my-6" />

              <div className="flex flex-row gap-3">
                <Link href="/plan-trip" className="btn-gold flex-1 whitespace-nowrap !px-4">
                  Plan Your Trip
                </Link>
                <button
                  type="button"
                  onClick={handleShare}
                  className="btn-glass flex-1 whitespace-nowrap !px-4"
                >
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </Reveal>
          </aside>

          {/* Editorial body */}
          <div className="lg:col-span-8 space-y-14 md:space-y-20">

            {/* About */}
            <Reveal>
              <span className="eyebrow">{language === "hi" ? "परिचय" : "The festival"}</span>
              <h2 className="mt-4 display-title text-4xl sm:text-5xl md:text-6xl">
                About the <em className="italic font-normal text-gold-sheen">Festival</em>
              </h2>
              <p className="mt-6 text-base sm:text-xl text-ink-500 dark:text-ivory-200/75 leading-relaxed">
                {currentFestival.description}
              </p>
            </Reveal>

            {/* Key Highlights */}
            <Reveal>
              <SubHeading>
                <Sparkles size={20} className="text-gold-600 dark:text-gold-400" aria-hidden="true" />
                Key Highlights
              </SubHeading>
              <div className="flex flex-wrap gap-2.5">
                {currentFestival.highlights.map((highlight: string, idx: number) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="glass flex items-center gap-2.5 rounded-full py-2 px-4"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                    <span className="text-ink-700 dark:text-ivory-100/85 text-sm">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            {/* Activities */}
            {currentFestival.activities && currentFestival.activities.length > 0 && (
              <div>
                <Reveal>
                  <SubHeading>{language === "hi" ? "मुख्य गतिविधियाँ" : "Activities to Do"}</SubHeading>
                </Reveal>
                <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentFestival.activities.map((act: string, idx: number) => (
                    <motion.div
                      key={idx}
                      variants={revealItem}
                      className="glass flex items-start gap-4 rounded-[1.5rem] p-5 transition-shadow duration-500 ease-lux hover:shadow-float"
                    >
                      <span className="font-display text-2xl italic leading-none text-gold-600 dark:text-gold-400 tabular-nums">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-ink-700 dark:text-ivory-100/85 leading-relaxed">{act}</span>
                    </motion.div>
                  ))}
                </RevealGroup>
              </div>
            )}

            {/* Accessibility */}
            {currentFestival.accessibility && currentFestival.accessibility.length > 0 && (
              <Reveal>
                <SubHeading>{language === "hi" ? "पहुंच और सुगमता" : "Accessibility Information"}</SubHeading>
                <div className="space-y-3">
                  {currentFestival.accessibility.map((acc: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 text-ink-500 dark:text-ivory-200/75">
                      <Accessibility size={18} className="mt-0.5 shrink-0 text-gold-600 dark:text-gold-400" aria-hidden="true" />
                      <span className="text-sm sm:text-base leading-relaxed">{acc}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Photography */}
            {currentFestival.photography && (
              <Reveal className="glass rounded-[1.75rem] p-6 flex gap-4 text-ink-500 dark:text-ivory-200/75 text-sm sm:text-base leading-relaxed">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-gold-700 dark:text-gold-300">
                  <Camera size={18} aria-hidden="true" />
                </span>
                <div>
                  <strong className="text-ink-900 dark:text-ivory-50">{language === "hi" ? "फोटोग्राफी नियम:" : "Photography Rules:"}</strong> {currentFestival.photography}
                </div>
              </Reveal>
            )}

            {currentFestival.history && (
              <Reveal className="relative pt-14">
                <div className="hairline absolute top-0 inset-x-0" />
                <span className="eyebrow">{language === "hi" ? "विरासत" : "Heritage"}</span>
                <h2 className="mt-4 mb-8 display-title text-4xl sm:text-5xl">
                  History &amp; <em className="italic font-normal text-gold-sheen">Heritage</em>
                </h2>
                <div
                  className="prose-lux max-w-none text-base sm:text-lg"
                  dangerouslySetInnerHTML={{ __html: currentFestival.history }}
                />
              </Reveal>
            )}

            {currentFestival.faqs && currentFestival.faqs.length > 0 && (
              <Reveal className="relative pt-14">
                <div className="hairline absolute top-0 inset-x-0" />
                <h2 className="mb-8 display-title text-3xl sm:text-4xl">
                  {language === "hi" ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
                </h2>
                <div className="space-y-3">
                  {currentFestival.faqs.map((faq, idx) => (
                    <details key={idx} className="group glass rounded-[1.5rem] px-6 py-5 open:shadow-float">
                      <summary className="flex justify-between items-center gap-4 font-display text-lg sm:text-xl font-medium text-ink-900 dark:text-ivory-50 cursor-pointer list-none select-none [&::-webkit-details-marker]:hidden">
                        <span>{faq.question}</span>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-900/10 dark:border-white/10 text-ink-400 dark:text-ivory-200/60 transition-transform duration-500 ease-lux group-open:rotate-180 group-open:border-gold-500/50 group-open:text-gold-700 dark:group-open:text-gold-300">
                          <ChevronDown size={16} />
                        </span>
                      </summary>
                      <p className="text-sm sm:text-base text-ink-500 dark:text-ivory-200/70 mt-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </Reveal>
            )}

          </div>
        </div>
      </section>

      {/* Related Festivals */}
      {currentRelated.length > 0 && (
        <section className="relative py-20 md:py-28">
          <div className="hairline absolute top-0 inset-x-0" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between mb-12 md:mb-14">
              <div className="max-w-2xl">
                <span className="eyebrow">{language === "hi" ? "और खोजें" : "Keep exploring"}</span>
                <h2 className="mt-4 display-title text-4xl sm:text-5xl md:text-6xl">
                  Discover More <em className="italic font-normal text-gold-sheen">Magic</em>
                </h2>
              </div>
              <p className="text-ink-500 dark:text-ivory-200/70 max-w-md leading-relaxed">
                Explore other magnificent festivals and cultural celebrations across the royal land of Rajasthan.
              </p>
            </Reveal>

            <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[300px] sm:auto-rows-[260px] grid-flow-dense gap-4 md:gap-5">
              {currentRelated.map((f, idx) => {
                const isFeature = idx % 4 === 0;
                return (
                  <motion.div key={f.id} variants={revealItem} className={relatedBento(idx)}>
                    <TiltCard maxTilt={isFeature ? 4 : 7} className="h-full rounded-[1.75rem]">
                      <Link href={`/festivals/${toSlug(related.find((engF) => engF.id === f.id)?.name || f.name)}`} className="block h-full rounded-[1.75rem]">
                        <div className="group relative h-full overflow-hidden rounded-[1.75rem] bg-ink-900 shadow-float transition-shadow duration-500 ease-lux hover:shadow-float-lg transform-gpu">
                          <Image
                            src={f.image}
                            alt={f.name}
                            fill
                            sizes={isFeature ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
                            className="object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 scrim-b" />

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
                          </div>
                        </div>
                      </Link>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </RevealGroup>
          </div>
        </section>
      )}

    </div>
  );
}
