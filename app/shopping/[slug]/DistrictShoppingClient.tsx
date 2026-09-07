"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Tag, 
  Search, 
  Compass, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Calendar,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  Info
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

interface Props {
  district: {
    id: number;
    district: string;
    slug: string;
    description: string;
    shoppingPlaces: any[];
  };
}

export default function DistrictShoppingClient({ district }: Props) {
  const { language } = useLanguage();
  const isHi = language === "hi";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const getSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

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

  // District FAQs
  const districtFaqs = [
    {
      q: isHi ? `${district.district} में खरीदारी के लिए सबसे प्रसिद्ध बाजार कौन से हैं?` : `What are the most famous shopping markets in ${district.district}?`,
      a: isHi 
        ? `${district.district} में प्रसिद्ध बाजारों में ${district.shoppingPlaces.slice(0, 3).map(p => p.name).join(", ")} शामिल हैं, जहाँ पारंपरिक हस्तशिल्प और स्थानीय उत्पाद मिलते हैं।`
        : `Top shopping destinations in ${district.district} include ${district.shoppingPlaces.slice(0, 3).map(p => p.name).join(", ")}, known for authentic handicrafts and local specialties.`
    },
    {
      q: isHi ? `${district.district} में बाजारों का सामान्य समय क्या है?` : `What are the general market timings in ${district.district}?`,
      a: isHi 
        ? `अधिकांश बाजार सुबह 10:00 या 11:00 बजे खुलते हैं और रात 8:30 से 9:00 बजे तक खुले रहते हैं। कुछ बाजार रविवार या किसी निर्धारित दिन बंद रह सकते हैं।`
        : `Most markets and bazaars in ${district.district} open around 10:00 AM - 11:00 AM and stay open until 8:30 PM - 9:00 PM.`
    },
    {
      q: isHi ? `क्या ${district.district} के बाजारों में ऑनलाइन/UPI भुगतान स्वीकार किया जाता है?` : `Are digital payments (UPI) accepted in ${district.district} markets?`,
      a: isHi
        ? `हाँ, अधिकांश प्रमुख दुकानों और स्टालों पर Google Pay, PhonePe, Paytm जैसे UPI विकल्प उपलब्ध हैं। फिर भी छोटे विक्रेताओं के लिए थोड़ी नकदी रखना सुविधाजनक है।`
        : `Yes, UPI payments (GPay, PhonePe, Paytm) are widely accepted across most shops in ${district.district}. Carrying some spare cash for small street vendors is recommended.`
    }
  ];

  return (
    <main className="min-h-screen bg-[#070b16] text-white">
      {/* Hero Header */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-amber-500/20 to-transparent blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-amber-400 transition-colors">{isHi ? "होम" : "Home"}</Link>
            <span>/</span>
            <Link href="/shopping" className="hover:text-amber-400 transition-colors">{isHi ? "शॉपिंग" : "Shopping"}</Link>
            <span>/</span>
            <span className="text-amber-400">{district.district}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-3">
                <MapPin size={12} />
                <span>{isHi ? "जिला शॉपिंग गाइड" : "District Shopping Guide"}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-white tracking-tight">
                {isHi ? `${district.district} में खरीदारी एवं प्रमुख बाजार` : `Shopping in ${district.district}, Rajasthan`}
              </h1>
              <p className="text-gray-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
                {district.description}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-3 self-start md:self-auto">
              <ShoppingBag className="w-6 h-6 text-amber-400" />
              <div>
                <div className="text-xl font-bold font-playfair text-amber-300">{district.shoppingPlaces.length}</div>
                <div className="text-[11px] text-gray-400 uppercase tracking-wider">{isHi ? "बाजार व स्थल" : "Shopping Markets"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-16 z-30 bg-[#070b16]/90 backdrop-blur-md border-y border-white/10 py-4">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={isHi ? "बाजार या उत्पाद खोजें..." : "Search markets, products..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-black font-semibold"
                    : "bg-white/[0.04] text-gray-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Markets Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {filteredPlaces.length === 0 ? (
            <div className="text-center py-16 bg-white/[0.02] border border-white/10 rounded-2xl">
              <ShoppingBag className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">
                {isHi ? "कोई बाजार नहीं मिला" : "No markets found"}
              </h3>
              <p className="text-sm text-gray-400">
                {isHi ? "कृपया अपना सर्च शब्द बदलें।" : "Try adjusting your search criteria."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place, idx) => {
                const placeSlug = getSlug(place.name);
                return (
                  <motion.div
                    key={place.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/40 hover:bg-white/[0.05] transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Header */}
                      <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                        <img
                          src={place.image || "https://picsum.photos/seed/shop-raj/600/400"}
                          alt={place.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-transparent to-transparent" />
                        
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-medium text-amber-300">
                            {place.type || "Market"}
                          </span>
                        </div>

                        {place.priceRange && (
                          <div className="absolute top-3 right-3">
                            <span className="px-2.5 py-1 rounded-full bg-amber-500 text-black text-[11px] font-bold">
                              {place.priceRange}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-xl font-bold font-playfair text-white group-hover:text-amber-300 transition-colors mb-2">
                          {place.name}
                        </h3>

                        <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-4">
                          {place.description}
                        </p>

                        {/* Famous For Chips */}
                        {place.famousFor && place.famousFor.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {place.famousFor.slice(0, 3).map((item: string, i: number) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300 font-medium"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Metadata Rows */}
                        <div className="space-y-1.5 text-xs text-gray-400 pt-2 border-t border-white/10">
                          {place.timings && (
                            <div className="flex items-center gap-2">
                              <Clock size={12} className="text-amber-400 shrink-0" />
                              <span className="truncate">{place.timings}</span>
                            </div>
                          )}
                          {place.location && (
                            <div className="flex items-center gap-2">
                              <MapPin size={12} className="text-amber-400 shrink-0" />
                              <span className="truncate">{place.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer Link */}
                    <div className="p-5 pt-0">
                      <Link
                        href={`/shopping/${placeSlug}`}
                        className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-amber-500 hover:text-black border border-white/10 hover:border-amber-500 text-xs font-semibold text-white transition-all flex items-center justify-center gap-2 group-hover:bg-amber-500 group-hover:text-black"
                      >
                        <span>{isHi ? "बाजार की पूरी जानकारी देखें" : "View Market Guide & Timings"}</span>
                        <ArrowRight size={14} />
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
      <section className="py-16 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-white mb-2">
              {isHi ? `${district.district} शॉपिंग संबंधी अक्सर पूछे जाने वाले प्रश्न` : `Shopping FAQs for ${district.district}`}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              {isHi ? "बाजारों, समय और स्थानीय खरीदारी से जुड़े महत्वपूर्ण सवाल।" : "Helpful answers for tourists planning shopping in this district."}
            </p>
          </div>

          <div className="space-y-4">
            {districtFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-white/10 bg-white/[0.02] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-sm font-semibold text-white">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-amber-400 transition-transform duration-300 ${
                      openFaqIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to All Districts CTA */}
      <section className="py-12 border-t border-white/10 text-center">
        <Link
          href="/shopping"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-all"
        >
          <ArrowLeft size={16} />
          <span>{isHi ? "सभी 33 जिलों की शॉपिंग देखें" : "Explore Shopping in All 33 Districts"}</span>
        </Link>
      </section>
    </main>
  );
}
