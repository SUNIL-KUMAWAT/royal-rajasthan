"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Compass, 
  Sparkles, 
  MapPin, 
  Heart, 
  ShieldCheck, 
  Award, 
  Users, 
  Globe, 
  ArrowRight,
  Landmark,
  Calendar,
  ShoppingBag
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

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
    <main className="min-h-screen bg-[#070b16] text-white">
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-amber-500/20 to-transparent blur-[140px] pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs sm:text-sm font-medium mb-6">
              <Sparkles size={14} className="text-amber-400" />
              <span>{isHi ? "राजस्थान टूरिज्म प्लेसेस के बारे में" : "About Rajasthan Tourism Places"}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white tracking-tight leading-tight mb-6">
              {isHi ? (
                <>राजाओं की भूमि का <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">संपूर्ण यात्रा मार्गदर्शक</span></>
              ) : (
                <>Your Ultimate Guide to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Land of Kings</span></>
              )}
            </h1>

            <p className="max-w-3xl mx-auto text-gray-300 text-base sm:text-lg leading-relaxed mb-10">
              {isHi
                ? "राजस्थान टूरिज्म प्लेसेस (rajasthanplaces.in) राजस्थान के गौरवशाली किलों, महलों, सुनहरे रेगिस्तान, जीवंत मेलों और ऐतिहासिक बाजारों को दुनिया के सामने प्रस्तुत करने वाला प्रमुख डिजिटल मंच है।"
                : "Rajasthan Tourism Places (rajasthanplaces.in) is your premier digital gateway to the royal heritage, golden dunes, timeless palaces, vibrant festivals, and bustling bazaars of Rajasthan, India."}
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8"
          >
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:border-amber-500/30 transition-colors"
              >
                <stat.icon className="w-6 h-6 text-amber-400 mx-auto mb-3" />
                <div className="text-3xl sm:text-4xl font-bold font-playfair text-amber-300 mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Story Section */}
      <section className="py-16 relative z-10 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white mb-6">
                {isHi ? "हमारा मिशन और विजन" : "Our Mission & Passion"}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {isHi
                  ? "राजस्थान केवल एक पर्यटन स्थल नहीं, बल्कि शौर्य, भक्ति, संगीत और शिल्प कौशल की एक अमर गाथा है। हमारा उद्देश्य हर यात्री को सही, सटीक और व्यापक जानकारी प्रदान करना है ताकि वे राजस्थान की असली सुंदरता को गहराई से अनुभव कर सकें।"
                  : "Rajasthan is not just a travel destination; it is an enduring tapestry of valor, devotion, folk rhythm, and breathtaking craftsmanship. Our mission is to empower global and domestic travelers with authentic, actionable, and rich information to experience the true soul of Rajasthan."}
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                {isHi
                  ? "जयपुर के गुलाबी गलियारों से लेकर जैसलमेर के सुनहरे टीलों तक, और उदयपुर की झीलों से लेकर जोधपुर के नीले घरों तक — हम 33 जिलों की हर ऐतिहासिक धरोहर, त्यौहार और खरीदारी केंद्र को एक मंच पर लाते हैं।"
                  : "From the pink facades of Jaipur to the golden sands of Jaisalmer, and from the tranquil lakes of Udaipur to the cobalt alleys of Jodhpur — we curate everything across all 33 districts into an easy-to-explore platform."}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/places"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-sm hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
                >
                  <span>{isHi ? "स्थानों का अन्वेषण करें" : "Explore Destinations"}</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/plan-trip"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
                >
                  <span>{isHi ? "यात्रा की योजना बनाएं" : "Plan Your Trip"}</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/Camel_Pushkar.webp"
                  alt="Rajasthan Culture and Tourism"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1 block">
                    {isHi ? "पधारो म्हारे देश" : "Padharo Mhare Desh"}
                  </span>
                  <p className="text-white text-sm font-medium">
                    {isHi ? "अतिथि देवो भवः की समृद्ध परंपरा के साथ राजस्थान आपका स्वागत करता है।" : "Welcome to Rajasthan with the timeless warmth of Indian hospitality."}
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white mb-4">
              {isHi ? "हम क्या प्रदान करते हैं" : "What Sets Us Apart"}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              {isHi 
                ? "हमारा लक्ष्य यात्रियों को उच्चतम स्तर का प्रामाणिक अनुभव प्रदान करना है।"
                : "Dedicated to providing travelers with the highest standard of authentic, verified travel resources."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-amber-500/40 hover:bg-white/[0.05] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
                  <item.icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative z-10 border-t border-white/10 bg-gradient-to-b from-transparent to-amber-950/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white mb-4">
            {isHi ? "अपनी राजस्थान यात्रा आज ही शुरू करें" : "Begin Your Royal Rajasthan Journey Today"}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
            {isHi 
              ? "हवा महल से लेकर मेहरानगढ़ तक, हर कदम पर एक नया रोमांच आपका इंतजार कर रहा है।"
              : "From the majestic corridors of Mehrangarh to the starlit sands of the Thar Desert, start discovering Rajasthan now."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/places"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-sm hover:from-amber-400 hover:to-amber-500 transition-all shadow-xl shadow-amber-500/20"
            >
              {isHi ? "सभी स्थल देखें" : "Explore All Places"}
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
            >
              {isHi ? "संपर्क करें" : "Contact Us"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
