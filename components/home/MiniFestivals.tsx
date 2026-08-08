"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { FESTIVALS, FESTIVALS_HINDI } from "@/constants/data";

export function MiniFestivals() {
  const { language } = useLanguage();
  const t = {
    title: language === "hi" ? "प्रमुख सांस्कृतिक उत्सव" : "Top Cultural Festivals",
    subtitle: language === "hi" ? "राजस्थान के रंगों को करीब से महसूस करें" : "Experience the vibrant colors of Rajasthan",
    viewAll: language === "hi" ? "सभी उत्सव देखें" : "View All Festivals",
    knowMore: language === "hi" ? "और जानें" : "Know More"
  };
  
  const festivalsList = language === "hi" ? FESTIVALS_HINDI : FESTIVALS;
  const topFestivals = festivalsList.slice(0, 3);

  return (
    <section className="py-20 relative bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/%28A%29_Camel_Pushkar_fair.jpg/1280px-%28A%29_Camel_Pushkar_fair.jpg')" }}>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gray-950/70"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            {t.title}
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {topFestivals.map((fest, idx) => (
            <motion.div 
              key={fest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden group hover:bg-white/20 transition-all flex flex-col h-full"
            >
              <div className="relative h-48 w-full overflow-hidden shrink-0">
                <Image 
                  src={fest.image}
                  alt={fest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-playfair font-bold text-xl mb-1">{fest.name}</h3>
                  <div className="flex flex-wrap items-center text-white/80 text-xs gap-3">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {fest.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {fest.month}</span>
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col grow">
                <p className="text-white/80 text-sm line-clamp-3 mb-4 grow">
                  {fest.description}
                </p>
                <Link href={`/festivals/${fest.id}`} className="text-yellow-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all w-max mt-auto">
                  {t.knowMore} <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/festivals" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium hover:bg-white/20 hover:scale-105 transition-all">
            {t.viewAll} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
