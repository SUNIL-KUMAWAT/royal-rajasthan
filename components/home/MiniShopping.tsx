"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "@/components/LocalizedLink";
import { useLanguage } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";

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
  const isHi = language === "hi";
  const lang = isHi ? "hi" : "en";

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={isHi ? "बाज़ार" : "Bazaars"}
          title={
            isHi ? (
              <>
                हाथ से बनी <em>विरासत</em>
              </>
            ) : (
              <>
                Heirlooms, made <em>by hand</em>
              </>
            )
          }
          subtitle={
            isHi
              ? "पारंपरिक बाज़ारों से बेहतरीन हस्तशिल्प, कपड़े और आभूषण खरीदें।"
              : "Kundan jewellery, block-printed cotton and blue pottery — straight from the bazaars that made them famous."
          }
          action={
            <Link href="/shopping" className="btn-glass">
              {isHi ? "सभी बाज़ार देखें" : "Explore all markets"}
              <ArrowUpRight size={16} />
            </Link>
          }
        />

        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {SHOPPING_CATEGORIES.map((item, idx) => (
            <motion.div key={item.id} variants={revealItem} className={idx === 1 ? "md:mt-16" : ""}>
              <Link
                href="/shopping"
                className="group relative isolate flex aspect-[3/4] overflow-hidden rounded-[2rem] bg-ink-900 shadow-float"
              >
                <Image
                  src={item.image}
                  alt={item.title[lang]}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="-z-10 object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 -z-10 scrim-b" />
                <span className="absolute left-5 top-5 font-display text-5xl italic text-ivory-50/80">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="mt-auto w-full p-4">
                  <div className="rounded-[1.5rem] glass-dark p-5 transition-transform duration-500 ease-lux group-hover:-translate-y-1">
                    <h3 className="font-display text-2xl font-medium text-ivory-50">{item.title[lang]}</h3>
                    <p className="mt-1.5 text-sm text-ivory-100/75">{item.desc[lang]}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300">
                      {isHi ? "खोजें" : "Explore"}
                      <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:rotate-45" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
