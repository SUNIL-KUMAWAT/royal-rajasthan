"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  MapPin, 
  Star, 
  ArrowLeft,
  Tag,
  Map,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Camera,
  Accessibility,
  HelpCircle,
  BookOpen,
  Compass
} from "lucide-react";
import Link from "next/link";
import { RAJASTHAN_SHOPPING, RAJASTHAN_SHOPPING_HINDI } from "@/constants/data";
import { useLanguage } from "@/components/LanguageProvider";

interface Props {
  place: any;
}

export default function ShoppingDetailClient({ place }: Props) {
  const { language } = useLanguage();
  const currentShoppingData = language === 'hi' ? RAJASTHAN_SHOPPING_HINDI : RAJASTHAN_SHOPPING;
  
  // Find localized item
  const getSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  let localizedPlace = place;
  for (const d of currentShoppingData.districts) {
      const p = d.shoppingPlaces.find((x: any) => getSlug(x.name) === getSlug(place.name) || x.id === place.id);
      if (p) {
          localizedPlace = { ...p, district: d.district };
          break;
      }
  }

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

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fcfbf9] to-[#f4f1ea] dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-100 selection:bg-amber-500/30 overflow-hidden transition-colors duration-300 pt-0 pb-16">
      
      {/* Hero Banner Section */}
      <section className="relative h-[38vh] sm:h-[45vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            src={localizedPlace.image} 
            alt={localizedPlace.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fcfbf9] via-black/30 to-black/60 dark:from-gray-950 dark:via-black/40 dark:to-black/70" />
        </div>

        {/* Back Button and Quick Details */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="max-w-6xl mx-auto px-4 pb-6 sm:pb-8">
            <Link href="/shopping">
              <motion.button 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-3 sm:mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-black/20 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white hover:scale-105 transition-all text-xs sm:text-sm font-medium"
              >
                <ArrowLeft size={16} />
                <span>{t.backBtn}</span>
              </motion.button>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-1.5 sm:space-y-2"
            >
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-500/20">
                  <MapPin size={12} />
                  {localizedPlace.district}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 text-white border border-white/10 text-xs font-semibold backdrop-blur-md">
                  <Star size={13} className="text-yellow-400 fill-yellow-400" />
                  {localizedPlace.rating} / 5
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-600/20 text-amber-300 border border-amber-500/20 text-[10px] sm:text-xs font-semibold backdrop-blur-sm">
                  {localizedPlace.type}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-playfair text-white drop-shadow-md leading-tight">
                {localizedPlace.name}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Tabs Navigation */}
      <section className="relative z-20 -mt-6 sm:-mt-8 max-w-6xl mx-auto px-4">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-800 rounded-2xl p-1.5 sm:p-2 shadow-lg flex overflow-x-auto gap-1 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive 
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/10" 
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/40 hover:text-gray-800 dark:hover:text-white"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Tab Contents */}
      <section className="max-w-6xl mx-auto px-4 mt-8 sm:mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.28 }}
            className="space-y-6 sm:space-y-8"
          >
            
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                
                {/* About Market */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/60 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/5 dark:shadow-none space-y-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-amber-500" size={20} />
                    <h2 className="text-xl sm:text-2xl font-playfair font-extrabold text-gray-900 dark:text-white">
                      {t.aboutTitle}
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    {localizedPlace.description}
                  </p>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                        <Clock size={20} />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.timings}</h3>
                        <p className="text-sm font-bold text-gray-800 dark:text-white mt-0.5">{localizedPlace.timings}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{t.closedOn}: {localizedPlace.closedOn || (language === "hi" ? "कभी नहीं" : "None")}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                        <Tag size={20} />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.budget}</h3>
                        <p className="text-sm font-bold text-gray-800 dark:text-white mt-0.5">{localizedPlace.priceRange}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location & Map Directions Card */}
                <div className="bg-gradient-to-br from-white to-[#fdfdfd] dark:from-gray-900 dark:to-gray-900 border border-gray-200/50 dark:border-gray-800/60 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/5 dark:shadow-none flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                      <MapPin size={24} />
                    </div>
                    <h2 className="text-lg font-bold font-playfair text-gray-900 dark:text-white">
                      {t.mapLocation}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                      {localizedPlace.location}
                    </p>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${localizedPlace.coordinates?.lat || 26.91},${localizedPlace.coordinates?.lng || 75.81}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-lg shadow-amber-500/20 text-sm hover:scale-[1.02]"
                  >
                    <span>{t.directions}</span>
                    <ArrowRight size={16} />
                  </a>
                </div>

              </div>

              {/* Add previews of other tabs inside Overview page */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-8">
                  {/* Left Column: Specialties & Activities Preview */}
                  <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                      {/* Specialties Preview */}
                      <div className="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/60 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/5 dark:shadow-none">
                          <h2 className="text-lg font-bold font-playfair text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                              <span className="w-1.5 h-5 rounded bg-amber-500" />
                              {t.famousFor}
                          </h2>
                          <div className="flex flex-wrap gap-2">
                              {localizedPlace.famousFor.map((item: string, idx: number) => (
                                  <span key={idx} className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/10">
                                      {item}
                                  </span>
                              ))}
                          </div>
                      </div>

                      {/* Activities Preview */}
                      {localizedPlace.activities && localizedPlace.activities.length > 0 && (
                          <div className="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/60 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/5 dark:shadow-none">
                              <h2 className="text-lg font-bold font-playfair text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                  <span className="w-1.5 h-5 rounded bg-amber-500" />
                                  {t.activities}
                              </h2>
                              <ul className="space-y-2">
                                  {localizedPlace.activities.map((act: string, idx: number) => (
                                      <li key={idx} className="flex gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                                          <span className="text-amber-500">•</span>
                                          <span>{act}</span>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      )}
                  </div>

                  {/* Right Column: Tips & FAQs Preview */}
                  <div className="space-y-6 sm:space-y-8">
                      {/* Tips Preview */}
                      {localizedPlace.tips && (
                          <div className="bg-gradient-to-br from-amber-50 to-[#fffdfa] dark:from-gray-900/50 dark:to-gray-900 border border-amber-200/60 dark:border-amber-500/15 rounded-3xl p-6 sm:p-8 shadow-xl flex gap-3 items-start">
                              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                                  <Compass size={20} />
                              </div>
                              <div>
                                  <h2 className="text-sm font-bold text-amber-800 dark:text-amber-400">{language === "hi" ? "प्रो ट्रैवल टिप" : "Pro Travel Tip"}</h2>
                                  <p className="text-xs sm:text-sm leading-relaxed mt-1 text-gray-600 dark:text-gray-300 font-medium">{localizedPlace.tips}</p>
                              </div>
                          </div>
                      )}

                      {/* First FAQ Preview */}
                      {localizedPlace.faqs && localizedPlace.faqs.length > 0 && (
                          <div className="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/60 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/5 dark:shadow-none space-y-3">
                              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                  <HelpCircle size={14} className="text-amber-500" />
                                  {language === "hi" ? "अक्सर पूछे जाने वाले प्रश्न" : "Featured FAQ"}
                              </h2>
                              <p className="text-sm font-bold text-gray-800 dark:text-white">{localizedPlace.faqs[0].question}</p>
                              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{localizedPlace.faqs[0].answer}</p>
                          </div>
                      )}
                  </div>
              </div>
            </>
          )}

            {/* EXPLORE & SPECIALTIES TAB */}
            {activeTab === "explore" && (
              <div className="space-y-6 sm:space-y-8">
                
                {/* Famous Specialties */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/60 rounded-3xl p-6 sm:p-8 shadow-xl">
                  <h2 className="text-lg sm:text-xl font-bold font-playfair text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 rounded bg-amber-500" />
                    {t.famousFor}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {localizedPlace.famousFor.map((item: string, idx: number) => (
                      <div 
                        key={idx} 
                        className="p-4 rounded-2xl bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/10 dark:border-amber-500/5 hover:border-amber-500/30 transition-all flex flex-col items-center justify-center text-center space-y-2 group cursor-default"
                      >
                        <span className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">🛍️</span>
                        <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activities Grid */}
                {localizedPlace.activities && localizedPlace.activities.length > 0 && (
                  <div className="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/60 rounded-3xl p-6 sm:p-8 shadow-xl">
                    <h2 className="text-lg sm:text-xl font-bold font-playfair text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-6 rounded bg-amber-500" />
                      {t.activities}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {localizedPlace.activities.map((act: string, idx: number) => (
                        <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/40 hover:-translate-y-1 transition-all">
                          <span className="text-2xl mt-0.5">⭐</span>
                          <div>
                            <h3 className="text-sm font-bold text-gray-800 dark:text-white">{language === "hi" ? `गतिविधि ${idx + 1}` : `Activity ${idx + 1}`}</h3>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed font-medium">{act}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TIPS, ACCESS & PHOTOGRAPHY TAB */}
            {activeTab === "rules" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                
                {/* Accessibility */}
                {localizedPlace.accessibility && localizedPlace.accessibility.length > 0 && (
                  <div className="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Accessibility size={18} />
                      </div>
                      <h2 className="text-lg font-bold font-playfair text-gray-900 dark:text-white">
                        {t.accessibility}
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {localizedPlace.accessibility.map((acc: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                          <span className="text-blue-500 mt-0.5">•</span>
                          <span>{acc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Photography & Tips */}
                <div className="space-y-6 sm:space-y-8">
                  {localizedPlace.photography && (
                    <div className="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                          <Camera size={18} />
                        </div>
                        <h2 className="text-lg font-bold font-playfair text-gray-900 dark:text-white">
                          {t.photoRules}
                        </h2>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                        {localizedPlace.photography}
                      </p>
                    </div>
                  )}

                  {localizedPlace.tips && (
                    <div className="bg-gradient-to-br from-amber-50 to-[#fffdfa] dark:from-gray-900/50 dark:to-gray-900 border border-amber-200/60 dark:border-amber-500/15 rounded-3xl p-6 sm:p-8 shadow-xl flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                        <Compass size={20} />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-amber-800 dark:text-amber-400">{language === "hi" ? "प्रो ट्रैवल टिप" : "Pro Travel Tip"}</h2>
                        <p className="text-xs sm:text-sm leading-relaxed mt-1 text-gray-600 dark:text-gray-300 font-medium">{localizedPlace.tips}</p>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* FAQS TAB */}
            {activeTab === "faqs" && localizedPlace.faqs && localizedPlace.faqs.length > 0 && (
              <div className="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center gap-2">
                  <HelpCircle className="text-amber-500" size={20} />
                  <h2 className="text-xl sm:text-2xl font-playfair font-extrabold text-gray-900 dark:text-white">
                    {t.faqs}
                  </h2>
                </div>
                <div className="space-y-4">
                  {localizedPlace.faqs.map((faq: any, idx: number) => (
                    <details 
                      key={idx} 
                      className="group border-b border-gray-100 dark:border-gray-800/80 pb-4 transition-all"
                    >
                      <summary className="flex justify-between items-center font-bold text-sm sm:text-base text-gray-800 dark:text-white cursor-pointer list-none select-none hover:text-amber-600 dark:hover:text-amber-400">
                        <span>{faq.question}</span>
                        <span className="text-xs transform group-open:rotate-180 transition-transform text-gray-400">▼</span>
                      </summary>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-3 leading-relaxed pl-1 font-medium">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </section>

    </main>
  );
}
