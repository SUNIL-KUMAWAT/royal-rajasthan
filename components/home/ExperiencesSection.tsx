"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const BENTO_EXPERIENCES = [
    {
        id: 1,
        title: "Majestic Forts",
        description: "Explore magnificent Rajput forts across Rajasthan",
        href: "/places?category=Fort",
        count: "5 Forts",
        image: "https://picsum.photos/seed/raj-1144/800/600",
        className: "col-span-2 md:col-span-2 row-span-2 min-h-[380px] md:min-h-[440px]"
    },
    {
        id: 2,
        title: "Desert Safari",
        description: "Experience golden dunes & camel safari",
        href: "/places?category=Desert",
        count: "1 Desert",
        image: "https://picsum.photos/seed/raj-1145/800/600",
        className: "col-span-2 md:col-span-1 min-h-[200px]"
    },
    {
        id: 3,
        title: "Royal Palaces",
        description: "Visit stunning heritage palaces",
        href: "/places?category=Palace",
        count: "2 Palaces",
        image: "https://picsum.photos/seed/raj-1146/800/600",
        className: "col-span-2 md:col-span-1 min-h-[200px]"
    },
    {
        id: 4,
        title: "Serene Lakes",
        description: "Sunset boat rides at breathtaking lakes",
        href: "/places?category=Lake",
        count: "1 Lake",
        image: "https://picsum.photos/seed/raj-1147/800/600",
        className: "col-span-2 md:col-span-2 min-h-[220px]"
    },
    {
        id: 5,
        title: "Wildlife Safari",
        description: "Tiger safaris & nature trails in reserves",
        href: "/places?category=Wildlife",
        count: "1 Park",
        image: "https://picsum.photos/seed/raj-1148/800/600",
        className: "col-span-2 md:col-span-2 min-h-[220px]"
    },
    {
        id: 6,
        title: "Cultural Festivals",
        description: "Vibrant folk dances & holy traditions",
        href: "/culture",
        count: "Vibrant Traditions",
        image: "https://picsum.photos/seed/raj-1149/800/600",
        className: "col-span-2 md:col-span-2 min-h-[220px]"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } },
};

export function ExperiencesSection() {
    const { language } = useLanguage();

    const getTranslatedTitle = (title: string) => {
        if (language !== 'hi') return title;
        const map: Record<string, string> = {
            "Majestic Forts": "भव्य किले",
            "Desert Safari": "रेगिस्तानी सफारी",
            "Royal Palaces": "शाही महल",
            "Serene Lakes": "शांत झीलें",
            "Wildlife Safari": "वन्यजीव सफारी",
            "Cultural Festivals": "सांस्कृतिक उत्सव"
        };
        return map[title] || title;
    };

    const getTranslatedDesc = (desc: string) => {
        if (language !== 'hi') return desc;
        const map: Record<string, string> = {
            "Explore magnificent Rajput forts across Rajasthan": "राजस्थान के शानदार राजपूत किलों की यात्रा करें",
            "Experience golden dunes & camel safari": "सुनहरे टीलों और ऊंट की सवारी का अनुभव करें",
            "Visit stunning heritage palaces": "आश्चर्यजनक विरासत महलों की यात्रा करें",
            "Sunset boat rides at breathtaking lakes": "लुभावनी झीलों पर सूर्यास्त के समय नाव की सवारी",
            "Tiger safaris & nature trails in reserves": "अभयारण्यों में टाइगर सफारी और प्रकृति ट्रेल्स",
            "Vibrant folk dances & holy traditions": "जीवंत लोक नृत्य और पवित्र परंपराएं"
        };
        return map[desc] || desc;
    };

    const translateCount = (count: string) => {
        if (language !== 'hi') return count;
        const map: Record<string, string> = {
            "5 Forts": "5 किले",
            "1 Desert": "1 रेगिस्तान",
            "2 Palaces": "2 महल",
            "1 Lake": "1 झील",
            "1 Park": "1 पार्क",
            "Vibrant Traditions": "जीवंत परंपराएं"
        };
        return map[count] || count;
    };

    return (
        <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-yellow-400 text-sm font-semibold tracking-widest uppercase">
                        {language === 'hi' ? "श्रेणी के अनुसार खोजें" : "Explore By Category"}
                    </span>
                    <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mt-3 mb-6">
                        {language === 'hi' ? (
                            <>आप क्या <span className="text-yellow-400">खोजना चाहते हैं?</span></>
                        ) : (
                            <>What Do You Want to <span className="text-yellow-400">Explore?</span></>
                        )}
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        {language === 'hi'
                            ? "एक श्रेणी चुनें और राजस्थान के सबसे प्रतिष्ठित स्थानों की खोज करें"
                            : "Choose a category and discover the most iconic places across Rajasthan"}
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                >
                    {BENTO_EXPERIENCES.map((exp) => (
                        <motion.div
                            key={exp.id}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className={`group relative overflow-hidden rounded-3xl border border-white/10 dark:border-gray-800 shadow-lg cursor-pointer ${exp.className}`}
                        >
                            <Link href={exp.href} className="absolute inset-0 flex flex-col justify-end">
                                <Image
                                    src={exp.image}
                                    alt={`${getTranslatedTitle(exp.title)} in Rajasthan - ${getTranslatedDesc(exp.description)}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                />

                                {/* Dual Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-opacity duration-300 group-hover:via-black/50" />

                                {/* Hover Shimmer Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                                </div>

                                {/* Content Details */}
                                <div className="relative p-6 md:p-8 flex flex-col justify-end z-10 h-full">
                                    <div className="inline-flex items-center bg-gold-500/80 text-white backdrop-blur-sm px-3.5 py-1 rounded-full text-xs font-bold w-fit mb-3">
                                        <span>{translateCount(exp.count)}</span>
                                    </div>
                                    
                                    <h3 className="text-white font-playfair text-xl md:text-2xl font-bold leading-tight group-hover:text-gold-300 transition-colors duration-300">
                                        {getTranslatedTitle(exp.title)}
                                    </h3>
                                    
                                    <p className="text-white/70 text-xs md:text-sm mt-1.5 max-w-sm line-clamp-2 opacity-90 group-hover:text-white transition-colors duration-300">
                                        {getTranslatedDesc(exp.description)}
                                    </p>

                                    {/* Action Link Arrow */}
                                    <div className="mt-4 flex items-center gap-1.5 text-gold-400 font-semibold text-xs md:text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        <span>{language === 'hi' ? "श्रेणी देखें" : "Explore Category"}</span>
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/places"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
                    >
                        {language === 'hi' ? "सभी स्थान देखें" : "View All Places"} <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}