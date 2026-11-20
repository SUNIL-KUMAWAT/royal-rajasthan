"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "@/components/LocalizedLink";
import { useLanguage } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";

type Experience = {
    id: number;
    title: { en: string; hi: string };
    description: { en: string; hi: string };
    href: string;
    image: string;
    /** Bento placement on large screens */
    className: string;
};

const EXPERIENCES: Experience[] = [
    {
        id: 1,
        title: { en: "Majestic Forts", hi: "भव्य किले" },
        description: { en: "Rajput citadels carved into the Aravalli ridges", hi: "अरावली की चोटियों पर बने राजपूत किले" },
        href: "/places?category=Fort",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Mehrangarh_Fort_sanhita.jpg/1280px-Mehrangarh_Fort_sanhita.jpg",
        className: "md:col-span-2 md:row-span-2 min-h-[26rem]",
    },
    {
        id: 2,
        title: { en: "Desert Safari", hi: "रेगिस्तानी सफारी" },
        description: { en: "Golden dunes and starlit camps", hi: "सुनहरे टीले और तारों भरे कैंप" },
        href: "/places?category=Desert",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Thar_desert_Rajasthan_India.jpg/960px-Thar_desert_Rajasthan_India.jpg",
        className: "min-h-[16rem]",
    },
    {
        id: 3,
        title: { en: "Royal Palaces", hi: "शाही महल" },
        description: { en: "Marble courtyards and mirrored halls", hi: "संगमरमर के आंगन और शीशमहल" },
        href: "/places?category=Palace",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Udaipur_City_Palace.jpg/960px-Udaipur_City_Palace.jpg",
        className: "min-h-[16rem]",
    },
    {
        id: 4,
        title: { en: "Serene Lakes", hi: "शांत झीलें" },
        description: { en: "Sunset boat rides on still water", hi: "शांत पानी पर सूर्यास्त की नाव सवारी" },
        href: "/places?category=Lake",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Udaipur_Lake_India.JPG/960px-Udaipur_Lake_India.JPG",
        className: "md:col-span-2 min-h-[16rem]",
    },
    {
        id: 5,
        title: { en: "Wildlife Safari", hi: "वन्यजीव सफारी" },
        description: { en: "Tigers in the ruins of Ranthambore", hi: "रणथंभौर के खंडहरों में बाघ" },
        href: "/places?category=Wildlife",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Ranthambore_National_Park.JPG/960px-Ranthambore_National_Park.JPG",
        className: "md:col-span-2 min-h-[16rem]",
    },
    {
        id: 6,
        title: { en: "Cultural Festivals", hi: "सांस्कृतिक उत्सव" },
        description: { en: "Folk music, colour and camel fairs", hi: "लोक संगीत, रंग और पशु मेले" },
        href: "/culture",
        image: "/Camel_Pushkar.webp",
        className: "md:col-span-2 min-h-[16rem]",
    },
];

/** Asymmetric bento of travel themes; each tile links into the filtered places list. */
export function ExperiencesSection() {
    const { language } = useLanguage();
    const isHi = language === "hi";

    return (
        <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow={isHi ? "अनुभव" : "Experiences"}
                    title={
                        isHi ? (
                            <>
                                हर यात्री के लिए <em>एक कहानी</em>
                            </>
                        ) : (
                            <>
                                A story for <em>every</em> traveller
                            </>
                        )
                    }
                    subtitle={
                        isHi
                            ? "एक विषय चुनें और राजस्थान की सबसे प्रतिष्ठित जगहों को खोजें।"
                            : "Choose a theme and wander through Rajasthan's most iconic places."
                    }
                />

                <RevealGroup className="grid auto-rows-[minmax(16rem,auto)] grid-cols-1 gap-5 md:grid-cols-4">
                    {EXPERIENCES.map((exp) => (
                        <motion.div key={exp.id} variants={revealItem} className={exp.className}>
                            <Link
                                href={exp.href}
                                className="group relative isolate flex h-full overflow-hidden rounded-[2rem] bg-ink-900 shadow-float"
                            >
                                <Image
                                    src={exp.image}
                                    alt={isHi ? exp.title.hi : exp.title.en}
                                    fill
                                    sizes={exp.className.includes("row-span-2") ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
                                    className="-z-10 object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.07]"
                                />
                                <div className="absolute inset-0 -z-10 scrim-b" />
                                <div className="mt-auto flex w-full items-end justify-between gap-4 p-6 md:p-7">
                                    <div>
                                        <h3 className="font-display text-3xl font-medium leading-tight text-ivory-50 md:text-4xl">
                                            {isHi ? exp.title.hi : exp.title.en}
                                        </h3>
                                        <p className="mt-1.5 max-w-xs text-sm text-ivory-100/75">
                                            {isHi ? exp.description.hi : exp.description.en}
                                        </p>
                                    </div>
                                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full glass-dark text-white transition-all duration-500 ease-lux group-hover:rotate-45 group-hover:bg-ivory-50 group-hover:text-ink-900">
                                        <ArrowUpRight size={18} />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
}
