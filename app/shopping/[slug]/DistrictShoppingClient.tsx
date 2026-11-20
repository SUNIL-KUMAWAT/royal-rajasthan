"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
    ShoppingBag,
    MapPin,
    Clock,
    Search,
    ArrowRight,
    ArrowLeft,
    ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "@/components/LocalizedLink";
import { useLanguage } from "@/components/LanguageProvider";
import { getDistrictFaqs, slugify } from "@/lib/shopping-utils";
import type { ShoppingPlaceData } from "@/lib/shopping";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;
const FALLBACK_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/960px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg";

interface Props {
  district: {
    id: number;
    district: string;
    slug: string;
    description: string;
    shoppingPlaces: ShoppingPlaceData[];
  };
  /** place id -> URL slug (computed on the server so duplicate names get unique URLs) */
  placeSlugs: Record<string, string>;
  otherDistricts: { name: string; slug: string }[];
}

export default function DistrictShoppingClient({ district, placeSlugs, otherDistricts }: Props) {
  const { language } = useLanguage();
  const isHi = language === "hi";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Extract all categories available in this district
  const categories = useMemo(() => {
    const set = new Set<string>();
    district.shoppingPlaces.forEach((p) => {
      if (Array.isArray(p.category)) {
        p.category.forEach((c: string) => set.add(c));
      }
    });
    return ["All", ...Array.from(set).sort()];
  }, [district]);

  // Filter shopping places
  const filteredPlaces = useMemo(() => {
    return district.shoppingPlaces.filter((place) => {
      const matchSearch =
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (place.famousFor && place.famousFor.some((f: string) => f.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchCat = selectedCategory === "All" || (place.category && place.category.includes(selectedCategory));

      return matchSearch && matchCat;
    });
  }, [district, searchQuery, selectedCategory]);

  // District FAQs (same source as the FAQPage JSON-LD on the server)
  const districtFaqs = getDistrictFaqs(district, isHi);

  const heroImage = district.shoppingPlaces.find((p) => p.image)?.image || FALLBACK_IMAGE;

  return (
    <div className="relative isolate min-h-screen text-ink-900 dark:text-ivory-100">
      {/* Hero Header */}
      <PageHero
        image={heroImage}
        imageAlt={district.district}
        eyebrow={isHi ? "जिला शॉपिंग गाइड" : "District Shopping Guide"}
        title={
          isHi ? (
            <><em>{district.district}</em> में खरीदारी एवं प्रमुख बाजार</>
          ) : (
            <>Shopping in <em>{district.district}</em>, Rajasthan</>
          )
        }
        subtitle={district.description}
        breadcrumbs={[
          { label: isHi ? "होम" : "Home", href: "/" },
          { label: isHi ? "शॉपिंग" : "Shopping", href: "/shopping" },
          { label: district.district },
        ]}
      >
        <div className="glass-dark inline-flex items-center gap-4 rounded-full py-2.5 pl-2.5 pr-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-400 text-ink-900">
            <ShoppingBag className="w-5 h-5" />
          </span>
          <div>
            <div className="font-display text-2xl leading-none text-ivory-50">{district.shoppingPlaces.length}</div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-eyebrow text-ivory-100/60">{isHi ? "बाजार व स्थल" : "Shopping Markets"}</div>
          </div>
        </div>
      </PageHero>

      {/* Filter & Search Bar */}
      <section className="sticky top-20 md:top-24 z-30 px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-10">
        <div className="glass-strong mx-auto max-w-6xl rounded-[1.75rem] md:rounded-full p-2.5 flex flex-col sm:flex-row gap-2.5 items-center justify-between">

          {/* Search Input */}
          <div className="relative w-full sm:w-80 shrink-0">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ivory-200/50 pointer-events-none" />
            <input
              type="text"
              placeholder={isHi ? "बाजार या उत्पाद खोजें..." : "Search markets, products..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="field !rounded-full !py-2.5 pl-11"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-hide">
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? "chip-active" : "chip-idle"}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Markets Grid */}
      <section className="relative py-14 md:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 -left-40 h-[30rem] w-[30rem] rounded-full bg-gold-500/10 blur-[150px]" />
          <div className="absolute bottom-0 -right-40 h-[30rem] w-[30rem] rounded-full bg-maroon-500/10 blur-[150px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPlaces.length === 0 ? (
            <div className="glass text-center py-20 px-6 rounded-[2rem]">
              <span className="mb-5 inline-flex p-5 rounded-full bg-gold-500/10 text-gold-700 dark:text-gold-400">
                <ShoppingBag className="w-10 h-10" />
              </span>
              <h3 className="font-display text-3xl font-medium text-ink-900 dark:text-ivory-50 mb-2">
                {isHi ? "कोई बाजार नहीं मिला" : "No markets found"}
              </h3>
              <p className="text-sm text-ink-500 dark:text-ivory-200/60">
                {isHi ? "कृपया अपना सर्च शब्द बदलें।" : "Try adjusting your search criteria."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filteredPlaces.map((place, idx) => {
                const placeSlug = placeSlugs[place.id] || slugify(place.name);
                return (
                  <motion.div
                    key={place.id || idx}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: Math.min(idx, 8) * 0.05 }}
                    className="glass group rounded-[1.75rem] overflow-hidden flex flex-col justify-between transition-all duration-500 ease-lux hover:-translate-y-1 hover:shadow-float-lg"
                  >
                    <div>
                      {/* Image Header */}
                      <div className="relative h-56 m-2 mb-0 overflow-hidden rounded-[1.4rem] bg-ink-900">
                        <Image
                          src={place.image || FALLBACK_IMAGE}
                          alt={place.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-110"
                        />
                        <div className="absolute inset-0 scrim-b opacity-60" />

                        <div className="absolute top-3 left-3">
                          <span className="glass-dark px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-300">
                            {place.type || "Market"}
                          </span>
                        </div>

                        {place.priceRange && (
                          <div className="absolute bottom-3 left-3">
                            <span className="px-3 py-1 rounded-full bg-gold-400 text-ink-900 text-[11px] font-bold shadow-gold">
                              {place.priceRange}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 md:p-6">
                        <h3 className="font-display text-2xl font-medium leading-tight tracking-tight text-ink-900 dark:text-ivory-50 transition-colors duration-300 group-hover:text-gold-700 dark:group-hover:text-gold-300 mb-2">
                          {place.name}
                        </h3>

                        <p className="text-sm text-ink-500 dark:text-ivory-200/65 line-clamp-2 leading-relaxed mb-4">
                          {place.description}
                        </p>

                        {/* Famous For Chips */}
                        {place.famousFor && place.famousFor.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {place.famousFor.slice(0, 3).map((item: string, i: number) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded-full border border-gold-500/25 bg-gold-500/5 text-[11px] font-medium text-ink-700 dark:text-ivory-100/80"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Metadata Rows */}
                        <div className="relative space-y-1.5 text-xs text-ink-500 dark:text-ivory-200/60 pt-4">
                          <div className="hairline absolute top-0 inset-x-0" />
                          {place.timings && (
                            <div className="flex items-center gap-2">
                              <Clock size={12} className="text-gold-600 dark:text-gold-400 shrink-0" />
                              <span className="truncate">{place.timings}</span>
                            </div>
                          )}
                          {place.location && (
                            <div className="flex items-center gap-2">
                              <MapPin size={12} className="text-gold-600 dark:text-gold-400 shrink-0" />
                              <span className="truncate">{place.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer Link */}
                    <div className="p-5 md:p-6 pt-0 md:pt-0">
                      <Link
                        href={`/shopping/${placeSlug}`}
                        className="btn-primary w-full !py-2.5 !text-xs group/cta"
                      >
                        <span>{isHi ? "बाजार की पूरी जानकारी देखें" : "View Market Guide & Timings"}</span>
                        <ArrowRight size={14} className="transition-transform duration-500 ease-lux group-hover/cta:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* District Shopping FAQs */}
      <section className="relative py-16 md:py-24">
        <div className="hairline absolute top-0 inset-x-0" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-10 md:mb-12">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 display-title text-3xl sm:text-5xl">
              {isHi ? `${district.district} शॉपिंग संबंधी अक्सर पूछे जाने वाले प्रश्न` : `Shopping FAQs for ${district.district}`}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-ink-500 dark:text-ivory-200/60">
              {isHi ? "बाजारों, समय और स्थानीय खरीदारी से जुड़े महत्वपूर्ण सवाल।" : "Helpful answers for tourists planning shopping in this district."}
            </p>
          </Reveal>

          <div className="space-y-3">
            {districtFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`glass rounded-[1.5rem] overflow-hidden transition-shadow duration-500 ease-lux ${isOpen ? "shadow-float-lg" : ""}`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 transition-colors hover:text-gold-700 dark:hover:text-gold-300"
                  >
                    <span className="font-display text-lg md:text-xl font-medium text-ink-900 dark:text-ivory-50">{faq.q}</span>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-lux ${isOpen ? "rotate-180 border-gold-500/50 bg-gold-500/10 text-gold-700 dark:text-gold-300" : "border-ink-900/10 text-ink-400 dark:border-white/10 dark:text-ivory-200/60"}`}>
                      <ChevronDown size={16} />
                    </span>
                  </button>
                  {/* Always rendered so the answer is in the HTML; toggled with CSS */}
                  <div className={`${isOpen ? "block" : "hidden"} px-6 pb-6 pt-1 text-sm md:text-base text-ink-500 dark:text-ivory-200/70 leading-relaxed`}>
                    {faq.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shopping in other districts (crawlable internal links) */}
      <section className="relative py-16">
        <div className="hairline absolute top-0 inset-x-0" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="display-title text-3xl sm:text-4xl mb-8 text-center">
              {isHi ? "अन्य जिलों में खरीदारी" : "Shopping in Other Districts of Rajasthan"}
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {otherDistricts.map((d) => (
                <Link
                  key={d.slug}
                  href={`/shopping/${d.slug}`}
                  className="chip-idle hover:-translate-y-0.5"
                >
                  {d.name}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Back to All Districts CTA */}
      <section className="py-12 text-center px-4">
        <Link
          href="/shopping"
          className="btn-glass group/back"
        >
          <ArrowLeft size={16} className="transition-transform duration-500 ease-lux group-hover/back:-translate-x-1" />
          <span>{isHi ? `सभी ${otherDistricts.length + 1} जिलों की शॉपिंग देखें` : `Explore Shopping in All ${otherDistricts.length + 1} Districts`}</span>
        </Link>
      </section>
    </div>
  );
}
