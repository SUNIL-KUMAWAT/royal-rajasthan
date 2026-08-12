"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const SHOPPING_CATEGORIES = [
  {
    id: "jewelry",
    title: { en: "Jewelry & Gemstones", hi: "आभूषण और रत्न" },
    desc: { en: "Exquisite Kundan, Meenakari, and Polki jewelry from traditional bazaars.", hi: "पारंपरिक बाज़ारों के उत्कृष्ट कुंदन, मीनाकारी और पोल्की आभूषण।" },
    image: "https://images.unsplash.com/photo-1769116416641-e714b71851e8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "textiles",
    title: { en: "Textiles & Fabrics", hi: "कपड़े और टेक्सटाइल्स" },
    desc: { en: "Vibrant Bandhani, Leheriya, and Block Prints renowned worldwide.", hi: "जीवंत बंधनी, लहरिया, और ब्लॉक प्रिंट्स जो दुनिया भर में मशहूर हैं।" },
    image: "https://images.unsplash.com/photo-1675994645106-8c48153d8c25?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: "handicrafts",
    title: { en: "Handicrafts & Pottery", hi: "हस्तशिल्प और पॉटरी" },
    desc: { en: "Beautiful Blue Pottery, wooden antiques, and authentic leather goods.", hi: "खूबसूरत ब्लू पॉटरी, लकड़ी के प्राचीन सामान और चमड़े का प्रामाणिक सामान।" },
    image: "https://images.unsplash.com/photo-1769874828707-6e9600e2ee75?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8",
  }
];

export function MiniShopping() {
  const { language } = useLanguage();
  const t = {
    title: language === "hi" ? "राजस्थान की मशहूर खरीदारी" : "Famous Shopping Experiences",
    subtitle: language === "hi" ? "पारंपरिक बाज़ारों से बेहतरीन हस्तशिल्प और आभूषण खरीदें" : "Buy the best handicrafts and jewelry from traditional bazaars",
    viewAll: language === "hi" ? "सभी बाज़ार देखें" : "Explore All Markets",
    explore: language === "hi" ? "खोजें" : "Explore"
  };

  return (
    <section className="py-20 relative bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://picsum.photos/seed/raj-shop-bg/1920/1080')" }}>
      {/* Overlay with slight tint difference from Festivals */}
      <div className="absolute inset-0 bg-maroon-950/80"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            {t.title}
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {SHOPPING_CATEGORIES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 group hover:bg-white/10 transition-all flex flex-col"
            >
              <div className="relative h-48 w-full rounded-xl overflow-hidden mb-6 shrink-0 shadow-lg">
                <Image
                  src={item.image}
                  alt={item.title[language as 'hi' | 'en']}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <h3 className="text-white font-playfair font-bold text-2xl mb-3 flex items-center gap-2">
                <ShoppingBag size={20} className="text-yellow-400" />
                {item.title[language as 'hi' | 'en']}
              </h3>

              <p className="text-white/70 text-sm mb-6 grow">
                {item.desc[language as 'hi' | 'en']}
              </p>

              <Link href="/shopping" className="text-yellow-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all w-max mt-auto">
                {t.explore} <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/shopping" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium hover:bg-white/20 hover:scale-105 transition-all">
            {t.viewAll} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
