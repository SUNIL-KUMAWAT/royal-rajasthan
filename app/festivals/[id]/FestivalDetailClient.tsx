"use client";

import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  ArrowLeft,
  Share2,
  Info
} from "lucide-react";
import Link from "next/link";
import { TiltCard } from "@/components/home/TiltCard";
import { FESTIVALS, FESTIVALS_HINDI } from "@/constants/data";
import { useLanguage } from "@/components/LanguageProvider";

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
}

export default function FestivalDetailClient({ festival, related }: Props) {
  const { language } = useLanguage();
  const currentFestivals = language === 'hi' ? FESTIVALS_HINDI : FESTIVALS;
  const currentFestival = currentFestivals.find((f: any) => f.id === festival.id) || festival;
  const currentRelated = related.map((r: any) => currentFestivals.find((f: any) => f.id === r.id) || r);

  // JSON-LD FAQ Schema
  const faqSchema = currentFestival.faqs && currentFestival.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": currentFestival.faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-gray-900 dark:text-white selection:bg-gold-500/30 overflow-hidden transition-colors duration-300">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] w-full flex items-center justify-center">
        {/* Background Image with Parallax & Gradient */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={currentFestival.image} 
            alt={currentFestival.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#111111] dark:to-[#0a0a0a]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-12 sm:pb-24">
          
          <Link href="/#festivals">
            <motion.button 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white/80 hover:text-white transition-all"
            >
              <ArrowLeft size={18} />
              <span>Back to Festivals</span>
            </motion.button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30 text-xs sm:text-sm font-medium backdrop-blur-md">
                <MapPin size={16} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {currentFestival.location}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-xs sm:text-sm font-medium backdrop-blur-md">
                <Star size={14} className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 fill-yellow-400" />
                {currentFestival.rating}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-playfair mb-4 sm:mb-6 text-white drop-shadow-lg leading-tight">
              {currentFestival.name}
            </h1>

            <div className="flex flex-wrap gap-4 sm:gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <div className="p-1.5 sm:p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                  <Calendar size={20} className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">Month</p>
                  <p className="text-sm sm:text-base font-medium">{currentFestival.month}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 sm:p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                  <Clock size={20} className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">Duration</p>
                  <p className="text-sm sm:text-base font-medium">{currentFestival.duration}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-20 container mx-auto px-4 py-16 -mt-10">
        <div className="max-w-5xl mx-auto space-y-12 relative z-10">
          
          {/* Main Content Area */}
          <div className="space-y-12">
            
            {/* Description & Highlights Glass Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors duration-300"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 text-gray-900 dark:text-white">
                <Info size={100} />
              </div>
              
              <h2 className="text-xl sm:text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 transition-colors">
                <span className="w-8 sm:w-10 h-[1px] bg-gold-500"></span>
                About the Festival
              </h2>
              <p className="text-sm sm:text-lg text-gray-600 dark:text-white/70 leading-relaxed mb-8 sm:mb-10 transition-colors">
                {currentFestival.description}
              </p>
              
              {/* Key Highlights (Moved inside About section) */}
              <div className="mb-10">
                <h3 className="text-base sm:text-lg font-playfair font-bold text-gray-900 dark:text-white/90 mb-3 sm:mb-4 flex items-center gap-3 transition-colors">
                  Key Highlights
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {currentFestival.highlights.map((highlight: string, idx: number) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 sm:gap-3 py-1.5 sm:py-2.5 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-gray-50 dark:from-white/5 to-transparent border border-gray-100 dark:border-white/5 backdrop-blur-sm transition-colors"
                    >
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gold-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                      <span className="text-gray-700 dark:text-white/80 text-xs sm:text-sm">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Activities */}
              {currentFestival.activities && currentFestival.activities.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-base sm:text-lg font-playfair font-bold text-gray-900 dark:text-white/90 mb-3 sm:mb-4 flex items-center gap-3 transition-colors">
                    {language === "hi" ? "मुख्य गतिविधियाँ" : "Activities to Do"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentFestival.activities.map((act: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-gold-500/5 border border-gold-500/10 text-gray-700 dark:text-white/80">
                        <span className="text-gold-500">🎯</span>
                        <span className="text-xs sm:text-sm font-medium">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Accessibility */}
              {currentFestival.accessibility && currentFestival.accessibility.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-base sm:text-lg font-playfair font-bold text-gray-900 dark:text-white/90 mb-3 sm:mb-4 flex items-center gap-3 transition-colors">
                    {language === "hi" ? "पहुंच और सुगमता" : "Accessibility Information"}
                  </h3>
                  <div className="space-y-2">
                    {currentFestival.accessibility.map((acc: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5 text-gray-600 dark:text-white/70">
                        <span className="text-blue-500">♿</span>
                        <span className="text-xs sm:text-sm leading-relaxed">{acc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Photography */}
              {currentFestival.photography && (
                <div className="mb-10 p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-gray-600 dark:text-white/70 text-xs sm:text-sm leading-relaxed">
                  <strong>📸 {language === "hi" ? "फोटोग्राफी नियम:" : "Photography Rules:"}</strong> {currentFestival.photography}
                </div>
              )}

              {/* Modern Action Bar */}
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-4 sm:p-6 backdrop-blur-xl shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 dark:from-gold-500/5 via-transparent to-gold-500/10 dark:to-gold-500/5 pointer-events-none" />
                
                {currentFestival.nextDate && (
                  <div className="flex flex-col items-center justify-center sm:pr-6 sm:border-r border-gray-200 dark:border-white/10 w-full sm:w-auto transition-colors">
                    <p className="text-gold-600 dark:text-gold-400 text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-0.5 sm:mb-1">Next Expected Date</p>
                    <p className="text-lg sm:text-2xl text-gray-900 dark:text-white font-bold font-playfair">{new Date(currentFestival.nextDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                )}
                
                <div className="flex flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto flex-1 justify-center mt-3 sm:mt-0">
                  <Link href="/plan-trip" className="flex-1 w-full sm:w-auto">
                    <button className="w-full px-2 sm:px-8 py-2.5 sm:py-4 rounded-2xl bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs sm:text-lg transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:-translate-y-1 whitespace-nowrap">
                      Plan Your Trip
                    </button>
                  </Link>
                  <button 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: `${currentFestival.name} | Royal Rajasthan`,
                          text: `Check out ${currentFestival.name} in ${currentFestival.location}!`,
                          url: window.location.href,
                        }).catch(console.error);
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Link copied to clipboard!");
                      }
                    }}
                    className="flex-1 w-full sm:w-auto px-2 sm:px-8 py-2.5 sm:py-4 rounded-2xl bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-medium transition-all flex items-center justify-center gap-1 sm:gap-3 hover:-translate-y-1 whitespace-nowrap text-xs sm:text-base"
                  >
                    <Share2 size={14} className="sm:w-5 sm:h-5" />
                    Share
                  </button>
                </div>
              </div>

            </motion.div>

            {currentFestival.history && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-transparent border-t border-b border-gray-200 dark:border-white/10 py-12 px-2 sm:px-8 relative transition-colors duration-300"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
                <h2 className="text-xl sm:text-4xl font-playfair font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center drop-shadow-md transition-colors">
                  History & Heritage
                </h2>
                <div 
                  className="[&_p]:text-gray-600 dark:[&_p]:text-white/70 [&_p]:leading-relaxed sm:[&_p]:leading-loose [&_p]:mb-4 sm:[&_p]:mb-6 [&_h3]:text-gold-600 dark:[&_h3]:text-gold-400 [&_h3]:font-playfair [&_h3]:text-lg sm:[&_h3]:text-2xl [&_h3]:mt-8 sm:[&_h3]:mt-10 [&_h3]:mb-3 sm:[&_h3]:mb-4 max-w-none text-justify text-sm sm:text-lg transition-colors"
                  dangerouslySetInnerHTML={{ __html: currentFestival.history }}
                />
              </motion.div>
            )}

            {currentFestival.faqs && currentFestival.faqs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors duration-300 mt-8"
              >
                <h2 className="text-xl sm:text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                  <span className="w-8 sm:w-10 h-[1px] bg-gold-500"></span>
                  {language === "hi" ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
                </h2>
                <div className="space-y-4">
                  {currentFestival.faqs.map((faq: any, idx: number) => (
                    <details key={idx} className="group border-b border-gray-100 dark:border-white/10 pb-4">
                      <summary className="flex justify-between items-center font-bold text-sm sm:text-base text-gray-800 dark:text-white cursor-pointer list-none select-none">
                        <span>{faq.question}</span>
                        <span className="text-xs transform group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-white/70 mt-3 leading-relaxed pl-1">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </motion.div>
            )}

          </div>
          
        </div>
      </section>

      {/* Related Festivals */}
      {currentRelated.length > 0 && (
        <section className="border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 py-20 relative mt-12 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 dark:text-white transition-colors">
                Discover More Magic
              </h2>
              <p className="text-gray-600 dark:text-white/60 mt-4 max-w-2xl transition-colors">
                Explore other magnificent festivals and cultural celebrations across the royal land of Rajasthan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentRelated.map((f: any, idx: number) => (
                <TiltCard key={f.id} maxTilt={10} className="h-full">
                  <Link href={`/festivals/${f.id}`} className="block h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="group relative overflow-hidden rounded-3xl h-[280px] cursor-pointer shadow-lg hover:shadow-[0_20px_40px_rgba(251,191,36,0.15)] transition-all duration-500 border border-gray-200 dark:border-white/10 hover:border-gold-500/50 dark:hover:border-gold-400/50 transform-gpu z-10"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      <img
                        src={f.image}
                        alt={f.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
                      
                      <div className="absolute bottom-4 left-4 right-4 transform transition-transform duration-500 group-hover:-translate-y-2" style={{ transform: "translateZ(20px)" }}>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-3">
                          <MapPin size={12} className="text-gold-400" />
                          <span className="text-white/90 text-xs font-medium">{f.location}</span>
                        </div>
                        <h4 className="text-white font-bold text-lg drop-shadow-md leading-tight">{f.name}</h4>
                      </div>
                    </motion.div>
                  </Link>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
