"use client";

import { motion } from "framer-motion";

import Image from "next/image";
import Link from "@/components/LocalizedLink";
import {
    Compass,
    Sparkles,
    Heart,
    ShieldCheck,
    Award,
    ArrowRight,
    Landmark,
    Calendar,
    ShoppingBag,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;


export default function AboutClient() {
  const { language } = useLanguage();

  const isHi = language === "hi";

  const stats = [
    { value: "500+", label: isHi ? "ऐतिहासिक स्थल" : "Historic Destinations", icon: Landmark },
    { value: "33", label: isHi ? "जिले व बाजार" : "Districts & Bazaars", icon: ShoppingBag },
    { value: "50+", label: isHi ? "सांस्कृतिक त्यौहार" : "Cultural Festivals", icon: Calendar },
    { value: "100%", label: isHi ? "सत्यापित गाइड" : "Authentic Travel Insights", icon: ShieldCheck },
  ];

  const values = [
    {
      icon: Sparkles,
      title: isHi ? "प्रामाणिक विरासत" : "Authentic Heritage",
      desc: isHi 
        ? "हम राजस्थान के इतिहास, वास्तुकला और शाही परंपराओं की वास्तविक और सटीक जानकारी प्रदान करते हैं।"
        : "We bring authentic and detailed insights into Rajasthan's royal history, grand forts, and cultural traditions."
    },
    {
      icon: Compass,
      title: isHi ? "सहज यात्रा योजना" : "Effortless Trip Planning",
      desc: isHi
        ? "सर्वोत्तम मार्ग, खुलने का समय, टिकट की कीमतें और स्थानीय सुझावों के साथ आपकी यात्रा को आसान बनाते हैं।"
        : "Curated itineraries, timing, entry fees, and local insider tips to make your Rajasthan journey seamless."
    },
    {
      icon: Heart,
      title: isHi ? "संस्कृति और कला का सम्मान" : "Cultural Reverence",
      desc: isHi
        ? "स्थानीय कारीगरों, लोक कलाकारों और पारंपरिक बाजारों को बढ़ावा देकर राजस्थान की आत्मा को संजोते हैं।"
        : "Supporting local artisans, folk musicians, and traditional bazaars across all 33 districts of Rajasthan."
    },
    {
      icon: Award,
      title: isHi ? "पर्यटक-प्रथम दृष्टिकोण" : "Traveler-First Quality",
      desc: isHi
        ? "विश्वसनीय, नवीनतम और व्यावहारिक जानकारी ताकि हर पर्यटक का अनुभव अविस्मरणीय और सुरक्षित हो।"
        : "Up-to-date, reliable, and comprehensive guides curated with love and deep local expertise."
    }
  ];

  return (
    <div className="relative isolate overflow-hidden">
      {/* Ambient light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gold-500/20 blur-[140px] dark:bg-gold-500/10" />
        <div className="absolute top-[30rem] -right-40 h-[30rem] w-[30rem] rounded-full bg-maroon-500/10 blur-[140px] dark:bg-maroon-500/20" />
        <div className="absolute bottom-0 -left-40 h-[28rem] w-[28rem] rounded-full bg-royal-orange/10 blur-[140px] dark:bg-royal-orange/5" />
      </div>

      {/* Hero Header — editorial statement */}
      <section className="relative pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <span className="eyebrow">
              {isHi ? "राजस्थान टूरिज्म प्लेसेस के बारे में" : "About Rajasthan Tourism Places"}
            </span>

            <h1 className="display-title mt-6 max-w-5xl text-5xl sm:text-6xl md:text-7xl lg:text-[5.75rem] [&_em]:font-normal [&_em]:italic [&_em]:text-gold-sheen">
              {isHi ? (
                <>राजाओं की भूमि का <em>संपूर्ण यात्रा मार्गदर्शक</em></>
              ) : (
                <>Your Ultimate Guide to the <em>Land of Kings</em></>
              )}
            </h1>
          </motion.div>

          <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
              className="hidden origin-left md:col-span-5 md:block"
            >
              <div className="hairline mt-4" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: EASE }}
              className="text-lg leading-relaxed text-ink-600 dark:text-ivory-200/75 md:col-span-7 md:text-xl"
            >
              {isHi
                ? "राजस्थान टूरिज्म प्लेसेस (rajasthanplaces.in) राजस्थान के गौरवशाली किलों, महलों, सुनहरे रेगिस्तान, जीवंत मेलों और ऐतिहासिक बाजारों को दुनिया के सामने प्रस्तुत करने वाला प्रमुख डिजिटल मंच है।"
                : "Rajasthan Tourism Places (rajasthanplaces.in) is your premier digital gateway to the royal heritage, golden dunes, timeless palaces, vibrant festivals, and bustling bazaars of Rajasthan, India."}
            </motion.p>
          </div>

          {/* Stats — floating glass cards */}
          <RevealGroup className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 md:mt-20 md:grid-cols-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={revealItem}
                className={idx % 2 === 1 ? "md:translate-y-8" : ""}
              >
                <div className="glass h-full rounded-[1.75rem] p-6 transition-transform duration-700 ease-lux hover:-translate-y-1.5 md:p-7">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-700 dark:text-gold-300">
                    <stat.icon size={18} />
                  </div>
                  <div className="mt-8 font-display text-5xl font-medium leading-none tracking-tight text-ink-900 dark:text-ivory-50 md:text-6xl">
                    {stat.value}
                  </div>
                  <div className="mt-3 text-xs text-ink-500 dark:text-ivory-200/65 sm:text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Mission & Story Section — asymmetric image + text */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="relative lg:col-span-7">
              <div className="relative h-[26rem] overflow-hidden rounded-[2rem] shadow-float-lg sm:h-[32rem] lg:h-[38rem]">
                <Image
                  src="/Camel_Pushkar.webp"
                  alt={isHi ? "राजस्थान की संस्कृति और पर्यटन" : "Rajasthan Culture and Tourism"}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-[1600ms] ease-lux hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 scrim-b" />
              </div>
              <div className="glass-dark absolute bottom-5 left-5 right-5 rounded-[1.5rem] p-5 sm:right-auto sm:max-w-sm lg:-right-10 lg:bottom-10 lg:left-auto">
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-eyebrow text-gold-300">
                  {isHi ? "पधारो म्हारे देश" : "Padharo Mhare Desh"}
                </span>
                <p className="font-display text-xl leading-snug text-white">
                  {isHi ? "अतिथि देवो भवः की समृद्ध परंपरा के साथ राजस्थान आपका स्वागत करता है।" : "Welcome to Rajasthan with the timeless warmth of Indian hospitality."}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5">
              <h2 className="display-title text-4xl sm:text-5xl md:text-6xl">
                {isHi ? "हमारा मिशन और विजन" : "Our Mission & Passion"}
              </h2>
              <p className="mt-8 font-display text-xl leading-relaxed text-ink-800 dark:text-ivory-100 md:text-2xl">
                {isHi
                  ? "राजस्थान केवल एक पर्यटन स्थल नहीं, बल्कि शौर्य, भक्ति, संगीत और शिल्प कौशल की एक अमर गाथा है। हमारा उद्देश्य हर यात्री को सही, सटीक और व्यापक जानकारी प्रदान करना है ताकि वे राजस्थान की असली सुंदरता को गहराई से अनुभव कर सकें।"
                  : "Rajasthan is not just a travel destination; it is an enduring tapestry of valor, devotion, folk rhythm, and breathtaking craftsmanship. Our mission is to empower global and domestic travelers with authentic, actionable, and rich information to experience the true soul of Rajasthan."}
              </p>
              <p className="mt-6 leading-relaxed text-ink-500 dark:text-ivory-200/70">
                {isHi
                  ? "जयपुर के गुलाबी गलियारों से लेकर जैसलमेर के सुनहरे टीलों तक, और उदयपुर की झीलों से लेकर जोधपुर के नीले घरों तक — हम 33 जिलों की हर ऐतिहासिक धरोहर, त्यौहार और खरीदारी केंद्र को एक मंच पर लाते हैं।"
                  : "From the pink facades of Jaipur to the golden sands of Jaisalmer, and from the tranquil lakes of Udaipur to the cobalt alleys of Jodhpur — we curate everything across all 33 districts into an easy-to-explore platform."}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/places" className="btn-gold">
                  <span>{isHi ? "स्थानों का अन्वेषण करें" : "Explore Destinations"}</span>
                  <ArrowRight size={16} />
                </Link>
                <Link href="/plan-trip" className="btn-glass">
                  <span>{isHi ? "यात्रा की योजना बनाएं" : "Plan Your Trip"}</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={isHi ? "हम क्या प्रदान करते हैं" : "What Sets Us Apart"}
            subtitle={
              isHi
                ? "हमारा लक्ष्य यात्रियों को उच्चतम स्तर का प्रामाणिक अनुभव प्रदान करना है।"
                : "Dedicated to providing travelers with the highest standard of authentic, verified travel resources."
            }
          />

          <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {values.map((item, idx) => (
              <motion.div
                key={idx}
                variants={revealItem}
                className={idx === 0 || idx === 3 ? "lg:col-span-7" : "lg:col-span-5"}
              >
                <div className="glass group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-7 transition-all duration-700 ease-lux hover:-translate-y-1.5 hover:shadow-float-lg md:p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-gold-300 shadow-float transition-transform duration-700 ease-lux group-hover:-rotate-6 group-hover:scale-110 dark:bg-gold-400 dark:text-ink-900">
                      <item.icon size={20} />
                    </div>
                    <span aria-hidden="true" className="font-display text-5xl italic leading-none text-ink-900/10 dark:text-white/10">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="mt-10 font-display text-2xl font-medium text-ink-900 dark:text-ivory-50 md:text-3xl">{item.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-500 dark:text-ivory-200/70">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-ink-950 px-6 py-16 text-center shadow-float-lg sm:px-12 md:py-24">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-1/2 left-1/4 h-[30rem] w-[30rem] rounded-full bg-gold-500/20 blur-[120px]" />
              <div className="absolute -bottom-1/2 right-0 h-[28rem] w-[28rem] rounded-full bg-maroon-500/30 blur-[120px]" />
            </div>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-medium leading-[1.02] tracking-tight text-ivory-50 sm:text-5xl md:text-6xl">
              {isHi ? "अपनी राजस्थान यात्रा आज ही शुरू करें" : "Begin Your Royal Rajasthan Journey Today"}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ivory-100/70 md:text-lg">
              {isHi
                ? "हवा महल से लेकर मेहरानगढ़ तक, हर कदम पर एक नया रोमांच आपका इंतजार कर रहा है।"
                : "From the majestic corridors of Mehrangarh to the starlit sands of the Thar Desert, start discovering Rajasthan now."}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/places" className="btn-gold">
                {isHi ? "सभी स्थल देखें" : "Explore All Places"}
              </Link>
              <Link href="/contact" className="btn-glass-dark">
                {isHi ? "संपर्क करें" : "Contact Us"}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
