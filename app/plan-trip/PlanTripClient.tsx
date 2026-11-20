// app/plan-trip/PlanTripClient.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@/components/LocalizedLink";
import Image from "next/image";
import {
    MapPin,
    Calendar,
    Clock,
    Check,
    ArrowRight,
    ArrowLeft,
    Star,
    Sun,
    Sunrise,
    Sunset,
    X,
    RotateCcw,
    Download,
    Share2,
    Printer,
    ChevronDown,
    ChevronUp,
    AlertCircle,
    Heart,
    Sparkles,
} from "lucide-react";
import { CITIES, CITIES_HINDI } from "@/constants/ui";
import { useLanguage } from "@/components/LanguageProvider";
import type { TripPlace as Place } from "@/lib/places";
import { ExploreMoreSection } from "@/components/shared/ExploreMoreSection";
import { PageHero } from "@/components/ui/PageHero";

// ============ TYPES ============
interface DayPlan {
    day: number;
    date: string;
    city: string;
    morning: PlaceSlot | null;
    afternoon: PlaceSlot | null;
    evening: PlaceSlot | null;
}

interface PlaceSlot {
    place: Place;
    timeSlot: "morning" | "afternoon" | "evening";
    startTime: string;
    endTime: string;
}

interface TripConfig {
    selectedCities: string[];
    startDate: string;
    days: number;
    interests: string[];
    pace: "relaxed" | "moderate" | "packed";
}

// ============ CONSTANTS ============
const EASE = [0.22, 1, 0.36, 1] as const;

const PANEL_LABEL =
    "mb-3 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ivory-200/60";

const STEPS = [
    {
        id: 1,
        title: "Select Cities",
        icon: MapPin,
        description: "Choose where to go",
    },
    {
        id: 2,
        title: "Trip Duration",
        icon: Calendar,
        description: "Pick dates & days",
    },
    {
        id: 3,
        title: "Interests",
        icon: Heart,
        description: "What you love",
    },
    {
        id: 4,
        title: "Your Itinerary",
        icon: Check,
        description: "Your plan is ready",
    },
];

const INTERESTS = [
    { id: "fort", label: "Forts", icon: "🏰" },
    { id: "palace", label: "Palaces", icon: "👑" },
    { id: "temple", label: "Temples", icon: "🛕" },
    { id: "lake", label: "Lakes", icon: "🌊" },
    { id: "desert", label: "Desert", icon: "🏜️" },
    { id: "wildlife", label: "Wildlife", icon: "🐅" },
    { id: "photography", label: "Photography", icon: "📸" },
    { id: "history", label: "History", icon: "📜" },
    { id: "spiritual", label: "Spiritual", icon: "🙏" },
    { id: "adventure", label: "Adventure", icon: "🧗" },
    { id: "romantic", label: "Romantic", icon: "💕" },
    { id: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
];

const PACE_OPTIONS = [
    {
        id: "relaxed" as const,
        label: "Relaxed",
        icon: "🧘",
        description: "1-2 places per day",
        placesPerDay: 2,
    },
    {
        id: "moderate" as const,
        label: "Moderate",
        icon: "🚶",
        description: "2-3 places per day",
        placesPerDay: 3,
    },
    {
        id: "packed" as const,
        label: "Packed",
        icon: "🏃",
        description: "3 places per day",
        placesPerDay: 3,
    },
];

interface CityMeta {
    icon: string;
    tag: string;
    tagHi: string;
    desc: string;
    descHi: string;
    highlights: string;
    highlightsHi: string;
}

const CITY_METADATA: Record<string, CityMeta> = {
    Jaipur: {
        icon: "🏰",
        tag: "Pink City",
        tagHi: "गुलाबी नगरी",
        desc: "Magnificent forts, royal palaces and vibrant heritage bazaars",
        descHi: "भव्य ऐतिहासिक किले, शाही महल और प्रसिद्ध पारंपरिक बाजार",
        highlights: "Hawa Mahal • Amber Fort • City Palace",
        highlightsHi: "हवा महल • आमेर किला • सिटी पैलेस",
    },
    "जयपुर": {
        icon: "🏰",
        tag: "Pink City",
        tagHi: "गुलाबी नगरी",
        desc: "Magnificent forts, royal palaces and vibrant heritage bazaars",
        descHi: "भव्य ऐतिहासिक किले, शाही महल और प्रसिद्ध पारंपरिक बाजार",
        highlights: "Hawa Mahal • Amber Fort • City Palace",
        highlightsHi: "हवा महल • आमेर किला • सिटी पैलेस",
    },
    Jodhpur: {
        icon: "☀️",
        tag: "Blue City",
        tagHi: "नीली नगरी",
        desc: "Mighty Mehrangarh citadel, blue houses and royal cenotaphs",
        descHi: "विशाल मेहरानगढ़ दुर्ग, नीले मकान और ऐतिहासिक उम्मेद भवन",
        highlights: "Mehrangarh Fort • Umaid Bhawan • Jaswant Thada",
        highlightsHi: "मेहरानगढ़ • उम्मेद भवन • जसवंत थड़ा",
    },
    "जोधपुर": {
        icon: "☀️",
        tag: "Blue City",
        tagHi: "नीली नगरी",
        desc: "Mighty Mehrangarh citadel, blue houses and royal cenotaphs",
        descHi: "विशाल मेहरानगढ़ दुर्ग, नीले मकान और ऐतिहासिक उम्मेद भवन",
        highlights: "Mehrangarh Fort • Umaid Bhawan • Jaswant Thada",
        highlightsHi: "मेहरानगढ़ • उम्मेद भवन • जसवंत थड़ा",
    },
    Udaipur: {
        icon: "👑",
        tag: "City of Lakes",
        tagHi: "झीलों की नगरी",
        desc: "Romantic lakes, floating marble palaces and scenic Aravalli hills",
        descHi: "पिछोला झील, संगमरमर के शाही महल और खूबसूरत अरावली वादियां",
        highlights: "Lake Pichola • City Palace • Jag Mandir",
        highlightsHi: "पिछोला झील • सिटी पैलेस • जग मंदिर",
    },
    "उदयपुर": {
        icon: "👑",
        tag: "City of Lakes",
        tagHi: "झीलों की नगरी",
        desc: "Romantic lakes, floating marble palaces and scenic Aravalli hills",
        descHi: "पिछोला झील, संगमरमर के शाही महल और खूबसूरत अरावली वादियां",
        highlights: "Lake Pichola • City Palace • Jag Mandir",
        highlightsHi: "पिछोला झील • सिटी पैलेस • जग मंदिर",
    },
    Jaisalmer: {
        icon: "🏜️",
        tag: "Golden City",
        tagHi: "स्वर्ण नगरी",
        desc: "Living yellow sandstone fort, Thar Desert dunes and camel safaris",
        descHi: "सोनार किला, थार मरुस्थल के रेतीले धोरे और रोमांचक ऊंट सफारी",
        highlights: "Jaisalmer Fort • Sam Sand Dunes • Patwon Haveli",
        highlightsHi: "जैसलमेर किला • सैम सैंड ड्यून्स • पटवों की हवेली",
    },
    "जैसलमेर": {
        icon: "🏜️",
        tag: "Golden City",
        tagHi: "स्वर्ण नगरी",
        desc: "Living yellow sandstone fort, Thar Desert dunes and camel safaris",
        descHi: "सोनार किला, थार मरुस्थल के रेतीले धोरे और रोमांचक ऊंट सफारी",
        highlights: "Jaisalmer Fort • Sam Sand Dunes • Patwon Haveli",
        highlightsHi: "जैसलमेर किला • सैम सैंड ड्यून्स • पटवों की हवेली",
    },
    Pushkar: {
        icon: "🦚",
        tag: "Sacred Oasis",
        tagHi: "पवित्र तीर्थ",
        desc: "Sacred Brahma Temple, holy ghats and world-famous camel fair",
        descHi: "जगतपिता ब्रह्मा मंदिर, पावन 52 घाट और विश्व प्रसिद्ध पुष्कर मेला",
        highlights: "Brahma Temple • Pushkar Lake • Savitri Temple",
        highlightsHi: "ब्रह्मा मंदिर • पुष्कर झील • सावित्री मंदिर",
    },
    "पुष्कर": {
        icon: "🦚",
        tag: "Sacred Oasis",
        tagHi: "पवित्र तीर्थ",
        desc: "Sacred Brahma Temple, holy ghats and world-famous camel fair",
        descHi: "जगतपिता ब्रह्मा मंदिर, पावन 52 घाट और विश्व प्रसिद्ध पुष्कर मेला",
        highlights: "Brahma Temple • Pushkar Lake • Savitri Temple",
        highlightsHi: "ब्रह्मा मंदिर • पुष्कर झील • सावित्री मंदिर",
    },
    "Mount Abu": {
        icon: "🌲",
        tag: "Hill Station",
        tagHi: "पर्वतीय स्थल",
        desc: "Cool mountain retreat, intricate Dilwara temples and serene Nakki Lake",
        descHi: "सुहावना मौसम, नक्काशीदार दिलवाड़ा मंदिर और खूबसूरत नक्की झील",
        highlights: "Dilwara Temples • Nakki Lake • Guru Shikhar",
        highlightsHi: "दिलवाड़ा मंदिर • नक्की झील • गुरु शिखर",
    },
    "माउंट आबू": {
        icon: "🌲",
        tag: "Hill Station",
        tagHi: "पर्वतीय स्थल",
        desc: "Cool mountain retreat, intricate Dilwara temples and serene Nakki Lake",
        descHi: "सुहावना मौसम, नक्काशीदार दिलवाड़ा मंदिर और खूबसूरत नक्की झील",
        highlights: "Dilwara Temples • Nakki Lake • Guru Shikhar",
        highlightsHi: "दिलवाड़ा मंदिर • नक्की झील • गुरु शिखर",
    },
    Bikaner: {
        icon: "🐪",
        tag: "Camel Country",
        tagHi: "ऊंटों की धरती",
        desc: "Impregnable Junagarh Fort, Karni Mata Temple and desert heritage",
        descHi: "अजेय जूनागढ़ किला, देशनोक करणी माता मंदिर और बीकानेरी संस्कृति",
        highlights: "Junagarh Fort • Karni Mata Temple • Rampuria Haveli",
        highlightsHi: "जूनागढ़ किला • करणी माता • रामपुरिया हवेली",
    },
    "बीकानेर": {
        icon: "🐪",
        tag: "Camel Country",
        tagHi: "ऊंटों की धरती",
        desc: "Impregnable Junagarh Fort, Karni Mata Temple and desert heritage",
        descHi: "अजेय जूनागढ़ किला, देशनोक करणी माता मंदिर और बीकानेरी संस्कृति",
        highlights: "Junagarh Fort • Karni Mata Temple • Rampuria Haveli",
        highlightsHi: "जूनागढ़ किला • करणी माता • रामपुरिया हवेली",
    },
    "Sawai Madhopur": {
        icon: "🐅",
        tag: "Tiger Capital",
        tagHi: "बाघों की भूमि",
        desc: "World-renowned Ranthambore Royal Bengal Tigers and historic hill fort",
        descHi: "विश्वप्रसिद्ध रणथंभौर राष्ट्रीय उद्यान और प्राचीन ऐतिहासिक किला",
        highlights: "Ranthambore National Park • Ranthambore Fort",
        highlightsHi: "रणथंभौर नेशनल पार्क • रणथंभौर दुर्ग",
    },
    "सवाई माधोपुर": {
        icon: "🐅",
        tag: "Tiger Capital",
        tagHi: "बाघों की भूमि",
        desc: "World-renowned Ranthambore Royal Bengal Tigers and historic hill fort",
        descHi: "विश्वप्रसिद्ध रणथंभौर राष्ट्रीय उद्यान और प्राचीन ऐतिहासिक किला",
        highlights: "Ranthambore National Park • Ranthambore Fort",
        highlightsHi: "रणथंभौर नेशनल पार्क • रणथंभौर दुर्ग",
    },
    Ajmer: {
        icon: "🕊️",
        tag: "Spiritual Harmony",
        tagHi: "सूफी संगम",
        desc: "Revered Dargah Sharif, historic Taragarh Fort and Ana Sagar Lake",
        descHi: "ख्वाजा गरीब नवाज दरगाह, ऐतिहासिक तारागढ़ और आना सागर झील",
        highlights: "Ajmer Sharif Dargah • Ana Sagar Lake • Taragarh",
        highlightsHi: "अजमेर शरीफ • आना सागर • तारागढ़ किला",
    },
    "अजमेर": {
        icon: "🕊️",
        tag: "Spiritual Harmony",
        tagHi: "सूफी संगम",
        desc: "Revered Dargah Sharif, historic Taragarh Fort and Ana Sagar Lake",
        descHi: "ख्वाजा गरीब नवाज दरगाह, ऐतिहासिक तारागढ़ और आना सागर झील",
        highlights: "Ajmer Sharif Dargah • Ana Sagar Lake • Taragarh",
        highlightsHi: "अजमेर शरीफ • आना सागर • तारागढ़ किला",
    },
    Chittorgarh: {
        icon: "⚔️",
        tag: "Pride & Valour",
        tagHi: "शौर्य और वीरता",
        desc: "Legendary hilltop fort, Vijay Stambha and heroic Rajput history",
        descHi: "भारत का सबसे बड़ा ऐतिहासिक दुर्ग, विजय स्तंभ और रानी पद्मिनी महल",
        highlights: "Chittorgarh Fort • Vijay Stambha • Padmini Palace",
        highlightsHi: "चित्तौड़गढ़ दुर्ग • विजय स्तंभ • पद्मिनी पैलेस",
    },
    "चित्तौड़गढ़": {
        icon: "⚔️",
        tag: "Pride & Valour",
        tagHi: "शौर्य और वीरता",
        desc: "Legendary hilltop fort, Vijay Stambha and heroic Rajput history",
        descHi: "भारत का सबसे बड़ा ऐतिहासिक दुर्ग, विजय स्तंभ और रानी पद्मिनी महल",
        highlights: "Chittorgarh Fort • Vijay Stambha • Padmini Palace",
        highlightsHi: "चित्तौड़गढ़ दुर्ग • विजय स्तंभ • पद्मिनी पैलेस",
    },
    Alwar: {
        icon: "🏛️",
        tag: "Gateway of Rajasthan",
        tagHi: "राजस्थान का सिंह द्वार",
        desc: "Bala Qila, mysterious Bhangarh ruins and Sariska Tiger Reserve",
        descHi: "सरिस्का टाइगर रिजर्व, ऐतिहासिक बाला किला और रहस्यमयी भानगढ़",
        highlights: "Bala Qila • Sariska Tiger Reserve • Bhangarh Fort",
        highlightsHi: "बाला किला • सरिस्का अभयारण्य • भानगढ़",
    },
    "अलवर": {
        icon: "🏛️",
        tag: "Gateway of Rajasthan",
        tagHi: "राजस्थान का सिंह द्वार",
        desc: "Bala Qila, mysterious Bhangarh ruins and Sariska Tiger Reserve",
        descHi: "सरिस्का टाइगर रिजर्व, ऐतिहासिक बाला किला और रहस्यमयी भानगढ़",
        highlights: "Bala Qila • Sariska Tiger Reserve • Bhangarh Fort",
        highlightsHi: "बाला किला • सरिस्का अभयारण्य • भानगढ़",
    },
    Bharatpur: {
        icon: "🦩",
        tag: "Bird Haven",
        tagHi: "पक्षियों का स्वर्ग",
        desc: "UNESCO Keoladeo National Park wetlands and historic Lohagarh Fort",
        descHi: "यूनेस्को केवलादेव पक्षी अभयारण्य और अजेय ऐतिहासिक लोहागढ़ किला",
        highlights: "Keoladeo National Park • Lohagarh Fort • Deeg Palace",
        highlightsHi: "केवलादेव नेशनल पार्क • लोहागढ़ किला",
    },
    "भरतपुर": {
        icon: "🦩",
        tag: "Bird Haven",
        tagHi: "पक्षियों का स्वर्ग",
        desc: "UNESCO Keoladeo National Park wetlands and historic Lohagarh Fort",
        descHi: "यूनेस्को केवलादेव पक्षी अभयारण्य और अजेय ऐतिहासिक लोहागढ़ किला",
        highlights: "Keoladeo National Park • Lohagarh Fort • Deeg Palace",
        highlightsHi: "केवलादेव नेशनल पार्क • लोहागढ़ किला",
    },
    Bundi: {
        icon: "⛲",
        tag: "City of Stepwells",
        tagHi: "बावड़ियों का शहर",
        desc: "Intricate stepwells, Taragarh Fort paintings and royal Chhatris",
        descHi: "कलात्मक बावड़ियां, तारागढ़ दुर्ग के दुर्लभ भित्तिचित्र और छतरियां",
        highlights: "Taragarh Fort • Raniji ki Baori • Sukh Mahal",
        highlightsHi: "तारागढ़ दुर्ग • रानीजी की बावड़ी • सुख महल",
    },
    "बूंदी": {
        icon: "⛲",
        tag: "City of Stepwells",
        tagHi: "बावड़ियों का शहर",
        desc: "Intricate stepwells, Taragarh Fort paintings and royal Chhatris",
        descHi: "कलात्मक बावड़ियां, तारागढ़ दुर्ग के दुर्लभ भित्तिचित्र और छतरियां",
        highlights: "Taragarh Fort • Raniji ki Baori • Sukh Mahal",
        highlightsHi: "तारागढ़ दुर्ग • रानीजी की बावड़ी • सुख महल",
    },
    Kota: {
        icon: "🌊",
        tag: "Chambal Heritage",
        tagHi: "चम्बल की नगरी",
        desc: "Scenic Chambal Riverfront, Seven Wonders Park and Kota Garh Palace",
        descHi: "भव्य चम्बल रिवरफ्रंट, सेवन वंडर्स पार्क और ऐतिहासिक कोटा गढ़",
        highlights: "Chambal Riverfront • Seven Wonders • Garh Palace",
        highlightsHi: "चम्बल रिवरफ्रंट • सेवन वंडर्स • गढ़ पैलेस",
    },
    "कोटा": {
        icon: "🌊",
        tag: "Chambal Heritage",
        tagHi: "चम्बल की नगरी",
        desc: "Scenic Chambal Riverfront, Seven Wonders Park and Kota Garh Palace",
        descHi: "भव्य चम्बल रिवरफ्रंट, सेवन वंडर्स पार्क और ऐतिहासिक कोटा गढ़",
        highlights: "Chambal Riverfront • Seven Wonders • Garh Palace",
        highlightsHi: "चम्बल रिवरफ्रंट • सेवन वंडर्स • गढ़ पैलेस",
    },
    Kumbhalgarh: {
        icon: "🛡️",
        tag: "Great Wall of India",
        tagHi: "अजेय दुर्ग",
        desc: "World's second-longest wall, Badal Mahal and Mewar history",
        descHi: "विश्व की दूसरी सबसे लंबी परकोटा दीवार और महाराणा प्रताप की जन्मस्थली",
        highlights: "Kumbhalgarh Fort • Badal Mahal • Wildlife Sanctuary",
        highlightsHi: "कुंभलगढ़ दुर्ग • बादल महल • अभयारण्य",
    },
    "कुंभलगढ़": {
        icon: "🛡️",
        tag: "Great Wall of India",
        tagHi: "अजेय दुर्ग",
        desc: "World's second-longest wall, Badal Mahal and Mewar history",
        descHi: "विश्व की दूसरी सबसे लंबी परकोटा दीवार और महाराणा प्रताप की जन्मस्थली",
        highlights: "Kumbhalgarh Fort • Badal Mahal • Wildlife Sanctuary",
        highlightsHi: "कुंभलगढ़ दुर्ग • बादल महल • अभयारण्य",
    },
    Ranakpur: {
        icon: "🛕",
        tag: "Marble Symphony",
        tagHi: "संगमरमर का चमत्कार",
        desc: "1444 uniquely carved marble pillars in a tranquil forest valley",
        descHi: "1444 नक्काशीदार खंभों वाला अलौकिक श्वेत संगमरमर का जैन मंदिर",
        highlights: "Chaumukha Temple • Surya Temple",
        highlightsHi: "चौमुखा जैन मंदिर • सूर्य मंदिर",
    },
    "राणकपुर": {
        icon: "🛕",
        tag: "Marble Symphony",
        tagHi: "संगमरमर का चमत्कार",
        desc: "1444 uniquely carved marble pillars in a tranquil forest valley",
        descHi: "1444 नक्काशीदार खंभों वाला अलौकिक श्वेत संगमरमर का जैन मंदिर",
        highlights: "Chaumukha Temple • Surya Temple",
        highlightsHi: "चौमुखा जैन मंदिर • सूर्य मंदिर",
    },
    Mandawa: {
        icon: "🎨",
        tag: "Open-Air Art Gallery",
        tagHi: "भित्तिचित्रों की नगरी",
        desc: "Exquisite Shekhawati fresco mansions and royal merchant heritage",
        descHi: "शेखावाटी की विश्वविख्यात कलात्मक हवेलियां और भित्तिचित्र",
        highlights: "Mandawa Fort • Murmuria Haveli • Chokhani Haveli",
        highlightsHi: "मंडावा किला • मुरमुरिया हवेली • हवेलियां",
    },
    "मंडावा": {
        icon: "🎨",
        tag: "Open-Air Art Gallery",
        tagHi: "भित्तिचित्रों की नगरी",
        desc: "Exquisite Shekhawati fresco mansions and royal merchant heritage",
        descHi: "शेखावाटी की विश्वविख्यात कलात्मक हवेलियां और भित्तिचित्र",
        highlights: "Mandawa Fort • Murmuria Haveli • Chokhani Haveli",
        highlightsHi: "मंडावा किला • मुरमुरिया हवेली • हवेलियां",
    },
    Shekhawati: {
        icon: "🖌️",
        tag: "Fresco Paradise",
        tagHi: "हवेलियों का अंचल",
        desc: "Sprawling region of painted palaces, heritage towns and grand cenotaphs",
        descHi: "रंग-बिरंगे भित्तिचित्रों, शाही छतरियों और ऐतिहासिक हवेलियों का क्षेत्र",
        highlights: "Nawalgarh • Fatehpur • Dundlod Haveli",
        highlightsHi: "नवलगढ़ • फतेहपुर • डूंडलोद हवेलियां",
    },
    "शेखावाटी": {
        icon: "🖌️",
        tag: "Fresco Paradise",
        tagHi: "हवेलियों का अंचल",
        desc: "Sprawling region of painted palaces, heritage towns and grand cenotaphs",
        descHi: "रंग-बिरंगे भित्तिचित्रों, शाही छतरियों और ऐतिहासिक हवेलियों का क्षेत्र",
        highlights: "Nawalgarh • Fatehpur • Dundlod Haveli",
        highlightsHi: "नवलगढ़ • फतेहपुर • डूंडलोद हवेलियां",
    },
    Jhalawar: {
        icon: "🏰",
        tag: "Water Fort Capital",
        tagHi: "जलदुर्ग की भूमि",
        desc: "UNESCO Gagron Water Fort, Sun Temple and Chandrabhaga heritage",
        descHi: "यूनेस्को विश्व धरोहर गागरोन जलदुर्ग और प्रसिद्ध सूर्य मंदिर",
        highlights: "Gagron Fort • Sun Temple Jhalrapatan • Garh Palace",
        highlightsHi: "गागरोन दुर्ग • सूर्य मंदिर • गढ़ पैलेस",
    },
    "झालावाड़": {
        icon: "🏰",
        tag: "Water Fort Capital",
        tagHi: "जलदुर्ग की भूमि",
        desc: "UNESCO Gagron Water Fort, Sun Temple and Chandrabhaga heritage",
        descHi: "यूनेस्को विश्व धरोहर गागरोन जलदुर्ग और प्रसिद्ध सूर्य मंदिर",
        highlights: "Gagron Fort • Sun Temple Jhalrapatan • Garh Palace",
        highlightsHi: "गागरोन दुर्ग • सूर्य मंदिर • गढ़ पैलेस",
    },
    Nagaur: {
        icon: "🛡️",
        tag: "Fortified Heritage",
        tagHi: "अहिच्छत्रपुर की धरोहर",
        desc: "Historic Ahhichatragarh Fort, Tarkeen Dargah and traditional fairs",
        descHi: "भव्य अहिच्छत्रगढ़ दुर्ग, सूफी दरगाह और प्रसिद्ध नागौर मेला",
        highlights: "Nagaur Fort • Tarkeen Dargah • Glass Jain Temple",
        highlightsHi: "नागौर किला • तारकीन दरगाह • कांच का मंदिर",
    },
    "नागौर": {
        icon: "🛡️",
        tag: "Fortified Heritage",
        tagHi: "अहिच्छत्रपुर की धरोहर",
        desc: "Historic Ahhichatragarh Fort, Tarkeen Dargah and traditional fairs",
        descHi: "भव्य अहिच्छत्रगढ़ दुर्ग, सूफी दरगाह और प्रसिद्ध नागौर मेला",
        highlights: "Nagaur Fort • Tarkeen Dargah • Glass Jain Temple",
        highlightsHi: "नागौर किला • तारकीन दरगाह • कांच का मंदिर",
    },
    Pali: {
        icon: "🏍️",
        tag: "Sacred Trails",
        tagHi: "आस्था और संस्कृति",
        desc: "Om Banna Temple, Bangur Museum and Jawai Leopard safari region",
        descHi: "प्रसिद्ध ॐ बन्ना धाम, बांगड़ संग्रहालय और जवाई तेंदुआ सफारी",
        highlights: "Om Banna Temple • Jawai Leopard Reserve • Bangur Museum",
        highlightsHi: "ॐ बन्ना धाम • जवाई लेपर्ड सफारी • बांगड़ म्यूजियम",
    },
    "पाली": {
        icon: "🏍️",
        tag: "Sacred Trails",
        tagHi: "आस्था और संस्कृति",
        desc: "Om Banna Temple, Bangur Museum and Jawai Leopard safari region",
        descHi: "प्रसिद्ध ॐ बन्ना धाम, बांगड़ संग्रहालय और जवाई तेंदुआ सफारी",
        highlights: "Om Banna Temple • Jawai Leopard Reserve • Bangur Museum",
        highlightsHi: "ॐ बन्ना धाम • जवाई लेपर्ड सफारी • बांगड़ म्यूजियम",
    },
    Sikar: {
        icon: "🚩",
        tag: "Divine Shrines",
        tagHi: "श्याम बाबा की भूमि",
        desc: "Sacred Khatu Shyam Ji Temple, Jeen Mata and Harsh Nath Peak",
        descHi: "विश्वप्रसिद्ध खाटू श्याम जी धाम, जीण माता मंदिर और हर्षनाथ पर्वत",
        highlights: "Khatu Shyamji • Jeen Mata • Harsh Parvat",
        highlightsHi: "खाटू श्याम जी • जीण माता • हर्ष पर्वत",
    },
    "सीकर": {
        icon: "🚩",
        tag: "Divine Shrines",
        tagHi: "श्याम बाबा की भूमि",
        desc: "Sacred Khatu Shyam Ji Temple, Jeen Mata and Harsh Nath Peak",
        descHi: "विश्वप्रसिद्ध खाटू श्याम जी धाम, जीण माता मंदिर और हर्षनाथ पर्वत",
        highlights: "Khatu Shyamji • Jeen Mata • Harsh Parvat",
        highlightsHi: "खाटू श्याम जी • जीण माता • हर्ष पर्वत",
    },
    Jhunjhunu: {
        icon: "🦚",
        tag: "Rani Sati Shrine",
        tagHi: "राणी सती धाम",
        desc: "Historic Rani Sati Temple, Khetri Mahal and artistic Shekhawati havelis",
        descHi: "विशाल राणी सती मंदिर, हवादार खेतड़ी महल और भव्य हवेलियां",
        highlights: "Rani Sati Temple • Khetri Mahal • Modi Haveli",
        highlightsHi: "राणी सती मंदिर • खेतड़ी महल • मोदी हवेली",
    },
    "झुंझुनू": {
        icon: "🦚",
        tag: "Rani Sati Shrine",
        tagHi: "राणी सती धाम",
        desc: "Historic Rani Sati Temple, Khetri Mahal and artistic Shekhawati havelis",
        descHi: "विशाल राणी सती मंदिर, हवादार खेतड़ी महल और भव्य हवेलियां",
        highlights: "Rani Sati Temple • Khetri Mahal • Modi Haveli",
        highlightsHi: "राणी सती मंदिर • खेतड़ी महल • मोदी हवेली",
    },
    Banswara: {
        icon: "🏝️",
        tag: "City of Hundred Islands",
        tagHi: "सौ द्वीपों का शहर",
        desc: "Scenic Mahi Dam backwaters, lush green hills and tribal culture",
        descHi: "माही बांध के सैकड़ों द्वीप, मनमोहक झरने और शांत प्राकृतिक वादियां",
        highlights: "Mahi Bajaj Sagar • Anand Sagar • Kagdi Pick Up",
        highlightsHi: "माही बजाज सागर • आनंद सागर • कागदी पिकअप",
    },
    "बांसवाड़ा": {
        icon: "🏝️",
        tag: "City of Hundred Islands",
        tagHi: "सौ द्वीपों का शहर",
        desc: "Scenic Mahi Dam backwaters, lush green hills and tribal culture",
        descHi: "माही बांध के सैकड़ों द्वीप, मनमोहक झरने और शांत प्राकृतिक वादियां",
        highlights: "Mahi Bajaj Sagar • Anand Sagar • Kagdi Pick Up",
        highlightsHi: "माही बजाज सागर • आनंद सागर • कागदी पिकअप",
    },
    Dungarpur: {
        icon: "🏛️",
        tag: "Green Marble Capital",
        tagHi: "पहाड़ों की नगरी",
        desc: "Juna Mahal frescoes, Udai Bilas lakeside Palace and Gaib Sagar",
        descHi: "जूना महल के चित्र, उदय बिलास पैलेस और गैब सागर झील",
        highlights: "Juna Mahal • Udai Bilas Palace • Gaib Sagar Lake",
        highlightsHi: "जूना महल • उदय बिलास • गैब सागर झील",
    },
    "डूंगरपुर": {
        icon: "🏛️",
        tag: "Green Marble Capital",
        tagHi: "पहाड़ों की नगरी",
        desc: "Juna Mahal frescoes, Udai Bilas lakeside Palace and Gaib Sagar",
        descHi: "जूना महल के चित्र, उदय बिलास पैलेस और गैब सागर झील",
        highlights: "Juna Mahal • Udai Bilas Palace • Gaib Sagar Lake",
        highlightsHi: "जूना महल • उदय बिलास • गैब सागर झील",
    },
    Dausa: {
        icon: "🪜",
        tag: "Ancient Stepwells",
        tagHi: "बावड़ियों की धरोहर",
        desc: "World-famous Chand Baori stepwell and revered Mehandipur Balaji",
        descHi: "विश्वप्रसिद्ध आभानेरी चांद बावड़ी और मेहंदीपुर बालाजी धाम",
        highlights: "Chand Baori Abhaneri • Mehandipur Balaji Temple",
        highlightsHi: "चांद बावड़ी • मेहंदीपुर बालाजी मंदिर",
    },
    "दौसा": {
        icon: "🪜",
        tag: "Ancient Stepwells",
        tagHi: "बावड़ियों की धरोहर",
        desc: "World-famous Chand Baori stepwell and revered Mehandipur Balaji",
        descHi: "विश्वप्रसिद्ध आभानेरी चांद बावड़ी और मेहंदीपुर बालाजी धाम",
        highlights: "Chand Baori Abhaneri • Mehandipur Balaji Temple",
        highlightsHi: "चांद बावड़ी • मेहंदीपुर बालाजी मंदिर",
    },
    Tonk: {
        icon: "✨",
        tag: "Nawabi Heritage",
        tagHi: "नवाबों का शहर",
        desc: "Golden Sunehri Kothi, historic Arabic-Persian Institute and Bisalpur",
        descHi: "शीशमहल सुनहरी कोठी, अरबी-फारसी शोध संस्थान और बीसलपुर",
        highlights: "Sunehri Kothi • Bisalpur Dam • Arabic Persian Institute",
        highlightsHi: "सुनहरी कोठी • बीसलपुर बांध • शोध संस्थान",
    },
    "टोंक": {
        icon: "✨",
        tag: "Nawabi Heritage",
        tagHi: "नवाबों का शहर",
        desc: "Golden Sunehri Kothi, historic Arabic-Persian Institute and Bisalpur",
        descHi: "शीशमहल सुनहरी कोठी, अरबी-फारसी शोध संस्थान और बीसलपुर",
        highlights: "Sunehri Kothi • Bisalpur Dam • Arabic Persian Institute",
        highlightsHi: "सुनहरी कोठी • बीसलपुर बांध • शोध संस्थान",
    },
    Barmer: {
        icon: "🏜️",
        tag: "Thar Heartland",
        tagHi: "थार का हृदय",
        desc: "Ancient Kiradu temples, wooden handicrafts and sand dunes",
        descHi: "राजस्थान का खजुराहो किराडू मंदिर, हस्तशिल्प और मरुस्थलीय संस्कृति",
        highlights: "Kiradu Temples • Mahabar Sand Dunes • Barmer Fort",
        highlightsHi: "किराडू मंदिर • महाबार धोरे • बाड़मेर किला",
    },
    "बाड़मेर": {
        icon: "🏜️",
        tag: "Thar Heartland",
        tagHi: "थार का हृदय",
        desc: "Ancient Kiradu temples, wooden handicrafts and sand dunes",
        descHi: "राजस्थान का खजुराहो किराडू मंदिर, हस्तशिल्प और मरुस्थलीय संस्कृति",
        highlights: "Kiradu Temples • Mahabar Sand Dunes • Barmer Fort",
        highlightsHi: "किराडू मंदिर • महाबार धोरे • बाड़मेर किला",
    },
    Jalore: {
        icon: "🏰",
        tag: "Granite City",
        tagHi: "स्वर्णगिरि दुर्ग",
        desc: "Imposing Golden Fort of Jalore, Sundha Mata shrine and ropeway",
        descHi: "ऐतिहासिक स्वर्णगिरि दुर्ग, प्रसिद्ध सुंधा माता मंदिर और रोप-वे",
        highlights: "Jalore Fort • Sundha Mata Temple • Topkhana",
        highlightsHi: "जालौर दुर्ग • सुंधा माता • तोपखाना",
    },
    "जालौर": {
        icon: "🏰",
        tag: "Granite City",
        tagHi: "स्वर्णगिरि दुर्ग",
        desc: "Imposing Golden Fort of Jalore, Sundha Mata shrine and ropeway",
        descHi: "ऐतिहासिक स्वर्णगिरि दुर्ग, प्रसिद्ध सुंधा माता मंदिर और रोप-वे",
        highlights: "Jalore Fort • Sundha Mata Temple • Topkhana",
        highlightsHi: "जालौर दुर्ग • सुंधा माता • तोपखाना",
    },
    Sirohi: {
        icon: "⛰️",
        tag: "Cradle of Aravalli",
        tagHi: "देवनागरी सिरोही",
        desc: "Ancient temples, Mirpur Jain shrine and Aravalli mountain views",
        descHi: "ऐतिहासिक मीरपुर जैन मंदिर, प्राचीन दुर्ग और अरावली पर्वतमाला",
        highlights: "Mirpur Jain Temple • Sirohi Fort • Pavapuri",
        highlightsHi: "मीरपुर जैन तीर्थ • सिरोही किला • पावापुरी",
    },
    "सिरोही": {
        icon: "⛰️",
        tag: "Cradle of Aravalli",
        tagHi: "देवनागरी सिरोही",
        desc: "Ancient temples, Mirpur Jain shrine and Aravalli mountain views",
        descHi: "ऐतिहासिक मीरपुर जैन मंदिर, प्राचीन दुर्ग और अरावली पर्वतमाला",
        highlights: "Mirpur Jain Temple • Sirohi Fort • Pavapuri",
        highlightsHi: "मीरपुर जैन तीर्थ • सिरोही किला • पावापुरी",
    },
    Rajsamand: {
        icon: "⛵",
        tag: "Royal Embankment",
        tagHi: "राजसमंद झील",
        desc: "Grand marble Nauchowki Ghat, Srinathji Nathdwara and Dwarkadhish",
        descHi: "ऐतिहासिक नौचौकी पाल, नाथद्वारा श्रीनाथजी और द्वारकाधीश मंदिर",
        highlights: "Rajsamand Lake • Shrinathji Nathdwara • Haldighati",
        highlightsHi: "राजसमंद झील • नाथद्वारा श्रीनाथजी • हल्दीघाटी",
    },
    "राजसमंद": {
        icon: "⛵",
        tag: "Royal Embankment",
        tagHi: "राजसमंद झील",
        desc: "Grand marble Nauchowki Ghat, Srinathji Nathdwara and Dwarkadhish",
        descHi: "ऐतिहासिक नौचौकी पाल, नाथद्वारा श्रीनाथजी और द्वारकाधीश मंदिर",
        highlights: "Rajsamand Lake • Shrinathji Nathdwara • Haldighati",
        highlightsHi: "राजसमंद झील • नाथद्वारा श्रीनाथजी • हल्दीघाटी",
    },
    Bhilwara: {
        icon: "🧵",
        tag: "Textile City",
        tagHi: "वस्त्र नगरी",
        desc: "Menal waterfalls, historic Harni Mahadev and Badnore Fort",
        descHi: "मेनाल जलप्रपात, ऐतिहासिक हरणी महादेव और बदनोर दुर्ग",
        highlights: "Menal Waterfall • Harni Mahadev • Badnore Fort",
        highlightsHi: "मेनाल वॉटरफॉल • हरणी महादेव • बदनोर किला",
    },
    "भीलवाड़ा": {
        icon: "🧵",
        tag: "Textile City",
        tagHi: "वस्त्र नगरी",
        desc: "Menal waterfalls, historic Harni Mahadev and Badnore Fort",
        descHi: "मेनाल जलप्रपात, ऐतिहासिक हरणी महादेव और बदनोर दुर्ग",
        highlights: "Menal Waterfall • Harni Mahadev • Badnore Fort",
        highlightsHi: "मेनाल वॉटरफॉल • हरणी महादेव • बदनोर किला",
    },
    Pratapgarh: {
        icon: "💎",
        tag: "Thewa Art Centre",
        tagHi: "थेवा कला की धरती",
        desc: "World-famed gold-on-glass Thewa art, Sita Mata Wildlife and waterfalls",
        descHi: "विश्वप्रसिद्ध कांच पर स्वर्ण थेवा कला और सीता माता अभयारण्य",
        highlights: "Sita Mata Wildlife • Jakham Dam • Thewa Art",
        highlightsHi: "सीता माता अभयारण्य • जाखम बांध • थेवा कला",
    },
    "प्रतापगढ़": {
        icon: "💎",
        tag: "Thewa Art Centre",
        tagHi: "थेवा कला की धरती",
        desc: "World-famed gold-on-glass Thewa art, Sita Mata Wildlife and waterfalls",
        descHi: "विश्वप्रसिद्ध कांच पर स्वर्ण थेवा कला और सीता माता अभयारण्य",
        highlights: "Sita Mata Wildlife • Jakham Dam • Thewa Art",
        highlightsHi: "सीता माता अभयारण्य • जाखम बांध • थेवा कला",
    },
    Karauli: {
        icon: "🛕",
        tag: "Bhakti Heritage",
        tagHi: "मदन मोहन जी की धरा",
        desc: "Sacred Madan Mohan Ji Temple, City Palace and Kaila Devi shrine",
        descHi: "प्रसिद्ध मदन मोहन जी, कैला देवी धाम और भव्य सिटी पैलेस",
        highlights: "Madan Mohan Ji • City Palace • Kaila Devi Temple",
        highlightsHi: "मदन मोहन जी • सिटी पैलेस • कैला देवी",
    },
    "करौली": {
        icon: "🛕",
        tag: "Bhakti Heritage",
        tagHi: "मदन मोहन जी की धरा",
        desc: "Sacred Madan Mohan Ji Temple, City Palace and Kaila Devi shrine",
        descHi: "प्रसिद्ध मदन मोहन जी, कैला देवी धाम और भव्य सिटी पैलेस",
        highlights: "Madan Mohan Ji • City Palace • Kaila Devi Temple",
        highlightsHi: "मदन मोहन जी • सिटी पैलेस • कैला देवी",
    },
    Dholpur: {
        icon: "🏰",
        tag: "Red Sandstone Realm",
        tagHi: "लाल पत्थरों का शहर",
        desc: "Historic Machkund sacred pond, National Chambal Sanctuary and palaces",
        descHi: "तीर्थराज मचकुंड, राष्ट्रीय चम्बल घड़ियाल अभयारण्य और राजमहल",
        highlights: "Machkund • Chambal Safari • Talab-e-Shahi",
        highlightsHi: "मचकुंड तीर्थ • चम्बल सफारी • तालाब-ए-शाही",
    },
    "धौलपुर": {
        icon: "🏰",
        tag: "Red Sandstone Realm",
        tagHi: "लाल पत्थरों का शहर",
        desc: "Historic Machkund sacred pond, National Chambal Sanctuary and palaces",
        descHi: "तीर्थराज मचकुंड, राष्ट्रीय चम्बल घड़ियाल अभयारण्य और राजमहल",
        highlights: "Machkund • Chambal Safari • Talab-e-Shahi",
        highlightsHi: "मचकुंड तीर्थ • चम्बल सफारी • तालाब-ए-शाही",
    },
    Hanumangarh: {
        icon: "🛡️",
        tag: "Northern Sentinel",
        tagHi: "भटनेर का प्राचीन दुर्ग",
        desc: "1700-year-old Bhatner Fort, historic Saraswati river valley ruins",
        descHi: "1700 वर्ष पुराना विशाल भटनेर किला और कालीबंगा पुरातत्व स्थल",
        highlights: "Bhatner Fort • Kalibangan Ruins • Bhadrakali Temple",
        highlightsHi: "भटनेर दुर्ग • कालीबंगा • भद्रकाली मंदिर",
    },
    "हनुमानगढ़": {
        icon: "🛡️",
        tag: "Northern Sentinel",
        tagHi: "भटनेर का प्राचीन दुर्ग",
        desc: "1700-year-old Bhatner Fort, historic Saraswati river valley ruins",
        descHi: "1700 वर्ष पुराना विशाल भटनेर किला और कालीबंगा पुरातत्व स्थल",
        highlights: "Bhatner Fort • Kalibangan Ruins • Bhadrakali Temple",
        highlightsHi: "भटनेर दुर्ग • कालीबंगा • भद्रकाली मंदिर",
    },
    "Sri Ganganagar": {
        icon: "🌾",
        tag: "Granary of Rajasthan",
        tagHi: "राजस्थान का अन्न भंडार",
        desc: "Lush green canals, historic Hindumalkot border and peaceful orchards",
        descHi: "हरियाली से लहलहाते खेत, गंग नहर और ऐतिहासिक हिन्दुमलकोट बॉर्डर",
        highlights: "Hindumalkot Border • Gang Canal • Laila Majnu Tomb",
        highlightsHi: "हिन्दुमलकोट सीमा • गंग नहर • लैला मजनू मजार",
    },
    "श्रीगंगानगर": {
        icon: "🌾",
        tag: "Granary of Rajasthan",
        tagHi: "राजस्थान का अन्न भंडार",
        desc: "Lush green canals, historic Hindumalkot border and peaceful orchards",
        descHi: "हरियाली से लहलहाते खेत, गंग नहर और ऐतिहासिक हिन्दुमलकोट बॉर्डर",
        highlights: "Hindumalkot Border • Gang Canal • Laila Majnu Tomb",
        highlightsHi: "हिन्दुमलकोट सीमा • गंग नहर • लैला मजनू मजार",
    },
    Churu: {
        icon: "🦌",
        tag: "Gateway to the Thar",
        tagHi: "काले हिरणों का अभयारण्य",
        desc: "Tal Chhapar Blackbuck Sanctuary, grand frescoes and Surana Haveli",
        descHi: "ताल छापर कृष्णमृग अभयारण्य, सुराणा की 1100 खिड़कियों वाली हवेली",
        highlights: "Tal Chhapar Sanctuary • Surana Haveli • Salasar Balaji",
        highlightsHi: "ताल छापर अभयारण्य • सुराणा हवेली • सालासर बालाजी",
    },
    "चुरू": {
        icon: "🦌",
        tag: "Gateway to the Thar",
        tagHi: "काले हिरणों का अभयारण्य",
        desc: "Tal Chhapar Blackbuck Sanctuary, grand frescoes and Surana Haveli",
        descHi: "ताल छापर कृष्णमृग अभयारण्य, सुराणा की 1100 खिड़कियों वाली हवेली",
        highlights: "Tal Chhapar Sanctuary • Surana Haveli • Salasar Balaji",
        highlightsHi: "ताल छापर अभयारण्य • सुराणा हवेली • सालासर बालाजी",
    },
    Deeg: {
        icon: "⛲",
        tag: "Water Palace Capital",
        tagHi: "जलमहलों की नगरी",
        desc: "Splendid fountains, monsoon pleasure palaces and Bharatpur Jat history",
        descHi: "सैकड़ों रंगीन फव्वारे, ऐतिहासिक जलमहल और रूपसागर जलाशय",
        highlights: "Deeg Palace • Keshav Bhavan • Gopal Bhavan",
        highlightsHi: "डीग जलमहल • केशव भवन • गोपाल भवन",
    },
    "डीग": {
        icon: "⛲",
        tag: "Water Palace Capital",
        tagHi: "जलमहलों की नगरी",
        desc: "Splendid fountains, monsoon pleasure palaces and Bharatpur Jat history",
        descHi: "सैकड़ों रंगीन फव्वारे, ऐतिहासिक जलमहल और रूपसागर जलाशय",
        highlights: "Deeg Palace • Keshav Bhavan • Gopal Bhavan",
        highlightsHi: "डीग जलमहल • केशव भवन • गोपाल भवन",
    },
    Baran: {
        icon: "🌌",
        tag: "Ancient Wonder",
        tagHi: "क्रेटर और प्राकृतिक धाम",
        desc: "Rare prehistoric Ramgarh meteorite crater and Sitabari natural springs",
        descHi: "लाखों वर्ष पुराना दुर्लभ रामगढ़ उल्कापिंड क्रेटर और सीताबाड़ी प्राकृतिक धाम",
        highlights: "Ramgarh Crater • Sitabari Wildlife",
        highlightsHi: "रामगढ़ क्रेटर • सीताबाड़ी धाम",
    },
    "बारां": {
        icon: "🌌",
        tag: "Ancient Wonder",
        tagHi: "क्रेटर और प्राकृतिक धाम",
        desc: "Rare prehistoric Ramgarh meteorite crater and Sitabari natural springs",
        descHi: "लाखों वर्ष पुराना दुर्लभ रामगढ़ उल्कापिंड क्रेटर और सीताबाड़ी प्राकृतिक धाम",
        highlights: "Ramgarh Crater • Sitabari Wildlife",
        highlightsHi: "रामगढ़ क्रेटर • सीताबाड़ी धाम",
    },
};

// ============ HELPERS ============
function getTimeSlotInfo(slot: "morning" | "afternoon" | "evening") {
    switch (slot) {
        case "morning":
            return {
                icon: Sunrise,
                label: "Morning",
                time: "8:00 AM - 12:00 PM",
                color: "text-royal-orange",
                bg: "bg-royal-orange/10",
            };
        case "afternoon":
            return {
                icon: Sun,
                label: "Afternoon",
                time: "1:00 PM - 5:00 PM",
                color: "text-gold-600 dark:text-gold-400",
                bg: "bg-gold-500/15",
            };
        case "evening":
            return {
                icon: Sunset,
                label: "Evening",
                time: "5:00 PM - 8:00 PM",
                color: "text-maroon-500 dark:text-maroon-300",
                bg: "bg-maroon-500/10 dark:bg-maroon-500/20",
            };
    }
}

function getEnglishCityName(city: string): string {
    const hindiIdx = CITIES_HINDI.indexOf(city);
    return hindiIdx !== -1 ? CITIES[hindiIdx] : city;
}

function generateItinerary(config: TripConfig, PLACES: Place[]): DayPlan[] {
    const { selectedCities, startDate, days, pace } = config;
    const itinerary: DayPlan[] = [];

    const englishSelectedCities = selectedCities.map(getEnglishCityName);

    const relevantPlaces = PLACES.filter((p) =>
        englishSelectedCities.includes(p.city)
    ).sort((a, b) => b.rating - a.rating);

    const usedPlaceIds = new Set<number>();

    const daysPerCity: Record<string, number> = {};
    const baseDays = Math.floor(days / selectedCities.length);
    let remaining = days - baseDays * selectedCities.length;

    selectedCities.forEach((city) => {
        daysPerCity[city] = baseDays + (remaining > 0 ? 1 : 0);
        if (remaining > 0) remaining--;
    });

    let dayCount = 0;

    selectedCities.forEach((city) => {
        const engCity = getEnglishCityName(city);
        const cityPlaces = relevantPlaces.filter(
            (p) => p.city === engCity
        );
        const cityDays = daysPerCity[city];

        for (let d = 0; d < cityDays; d++) {
            dayCount++;
            const date = new Date(startDate);
            date.setDate(date.getDate() + dayCount - 1);

            const dayPlan: DayPlan = {
                day: dayCount,
                date: date.toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
                city,
                morning: null,
                afternoon: null,
                evening: null,
            };

            // Morning place
            const morningPlace = cityPlaces.find(
                (p) => !usedPlaceIds.has(p.id)
            );
            if (morningPlace) {
                usedPlaceIds.add(morningPlace.id);
                dayPlan.morning = {
                    place: morningPlace,
                    timeSlot: "morning",
                    startTime: "8:00 AM",
                    endTime: "11:30 AM",
                };
            }

            // Afternoon place
            if (pace !== "relaxed" || d === 0) {
                const afternoonPlace = cityPlaces.find(
                    (p) => !usedPlaceIds.has(p.id)
                );
                if (afternoonPlace) {
                    usedPlaceIds.add(afternoonPlace.id);
                    dayPlan.afternoon = {
                        place: afternoonPlace,
                        timeSlot: "afternoon",
                        startTime: "1:00 PM",
                        endTime: "4:30 PM",
                    };
                }
            }

            // Evening place
            if (pace === "packed") {
                const eveningPlace = cityPlaces.find(
                    (p) => !usedPlaceIds.has(p.id)
                );
                if (eveningPlace) {
                    usedPlaceIds.add(eveningPlace.id);
                    dayPlan.evening = {
                        place: eveningPlace,
                        timeSlot: "evening",
                        startTime: "5:00 PM",
                        endTime: "7:30 PM",
                    };
                }
            }

            itinerary.push(dayPlan);
        }
    });

    return itinerary;
}

function calculateTripStats(itinerary: DayPlan[]) {
    let totalPlaces = 0;
    let totalCost = 0;
    let freeEntryCount = 0;
    const cities = new Set<string>();

    itinerary.forEach((day) => {
        cities.add(day.city);
        [day.morning, day.afternoon, day.evening].forEach((slot) => {
            if (slot) {
                totalPlaces++;
                if (slot.place.ticket.isFree) {
                    freeEntryCount++;
                } else {
                    totalCost += slot.place.ticket.indian;
                }
            }
        });
    });

    return {
        totalPlaces,
        totalCost,
        freeEntryCount,
        totalCities: cities.size,
        totalDays: itinerary.length,
    };
}

// ============ UTILITY FUNCTIONS ============
function showToast(message: string) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
    position:fixed; top:96px; left:50%; transform:translateX(-50%);
    background:rgba(14,12,10,0.88); color:#F8F3EA; padding:12px 24px;
    border-radius:50px; z-index:9999; font-size:14px;
    -webkit-backdrop-filter:blur(16px); backdrop-filter:blur(16px);
    border:1px solid rgba(255,255,255,0.12);
    font-weight:500; box-shadow:0 20px 50px -12px rgba(14,12,10,0.45);
    white-space:nowrap;
  `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.3s";
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

async function shareItinerary(
    itinerary: DayPlan[],
    cities: string[]
): Promise<void> {
    const text = [
        "🏰 My Rajasthan Trip Plan!",
        "",
        `📅 ${itinerary.length} Days | 🏙️ ${cities.join(", ")}`,
        "",
        ...itinerary.map((day) => {
            const places = [day.morning, day.afternoon, day.evening]
                .filter(Boolean)
                .map((s) => s!.place.name)
                .join(", ");
            return `Day ${day.day} (${day.city}): ${places || "Leisure"}`;
        }),
        "",
        "🌐 Plan your trip: rajasthanplaces.in/plan-trip",
    ].join("\n");

    if (navigator.share) {
        try {
            await navigator.share({
                title: "My Rajasthan Trip Itinerary",
                text,
            });
            return;
        } catch (err) {
            if ((err as Error).name === "AbortError") return;
        }
    }

    try {
        await navigator.clipboard.writeText(text);
        showToast("📋 Copied to clipboard!");
    } catch {
        showToast("Please copy the page URL to share.");
    }
}

function downloadPDF(itinerary: DayPlan[], cities: string[]): void {
    const slots = [
        { label: "🌅 Morning (8AM-12PM)", key: "morning" as const },
        { label: "☀️ Afternoon (1PM-5PM)", key: "afternoon" as const },
        { label: "🌆 Evening (5PM-8PM)", key: "evening" as const },
    ];

    const dayRows = itinerary
        .map(
            (day) => `
      <div class="day">
        <div class="day-hdr">
          <strong>Day ${day.day} — ${day.city}</strong>
          <span style="opacity:.8;font-size:13px;"> | ${day.date}</span>
        </div>
        ${slots
                    .map(({ label, key }) => {
                        const slot = day[key];
                        return `
          <div class="slot">
            <div class="slot-label">${label}</div>
            ${slot
                                ? `
              <div class="place-name">${slot.place.name}</div>
              <div class="place-meta">
                📍 ${slot.place.location.city} &nbsp;·&nbsp;
                ⏰ ${slot.place.timing.open}–${slot.place.timing.close} &nbsp;·&nbsp;
                ⏱️ ${slot.place.visitDuration.recommended} &nbsp;·&nbsp;
                🎫 ${slot.place.ticket.isFree
                                    ? '<span style="color:#059669">Free Entry</span>'
                                    : `<span style="color:#D4AF37">₹${slot.place.ticket.indian}</span>`
                                } &nbsp;·&nbsp;
                ⭐ ${slot.place.rating}/5
              </div>`
                                : `<div class="leisure">Leisure time — explore local area</div>`
                            }
          </div>`;
                    })
                    .join("")}
      </div>`
        )
        .join("");

    const totalPlaces = itinerary.reduce(
        (acc, d) =>
            acc +
            [d.morning, d.afternoon, d.evening].filter(Boolean).length,
        0
    );

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Rajasthan Trip Itinerary</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:Arial,sans-serif;padding:30px;color:#333;font-size:14px}
    h1{color:#7A1F1F;text-align:center;font-size:24px;margin-bottom:4px}
    .sub{text-align:center;color:#888;margin-bottom:20px;font-size:13px}
    .stats{display:flex;gap:12px;justify-content:center;margin-bottom:24px;flex-wrap:wrap}
    .stat{background:#FFF8EE;border:1px solid #E9D5A1;padding:10px 18px;border-radius:8px;text-align:center}
    .stat strong{display:block;font-size:22px;color:#D4AF37}
    .day{border:1px solid #eee;border-radius:10px;margin-bottom:16px;overflow:hidden;page-break-inside:avoid}
    .day-hdr{background:linear-gradient(135deg,#D4AF37,#F5D061);color:#fff;padding:12px 18px}
    .slot{padding:12px 18px;border-bottom:1px solid #f5f5f5}
    .slot:last-child{border-bottom:none}
    .slot-label{font-size:11px;color:#999;margin-bottom:4px}
    .place-name{font-weight:bold;color:#333;margin-bottom:3px}
    .place-meta{font-size:11px;color:#888;line-height:1.6}
    .leisure{color:#aaa;font-style:italic;font-size:13px}
    .footer{text-align:center;margin-top:24px;color:#aaa;font-size:12px;border-top:1px solid #eee;padding-top:16px}
    @media print{body{padding:15px}.day{page-break-inside:avoid}}
  </style>
</head>
<body>
  <h1>🏰 Rajasthan Tourism Places Trip Itinerary</h1>
  <div class="sub">Cities: ${cities.join(", ")} &nbsp;|&nbsp; Generated: ${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</div>
  <div class="stats">
    <div class="stat"><strong>${itinerary.length}</strong>Days</div>
    <div class="stat"><strong>${cities.length}</strong>Cities</div>
    <div class="stat"><strong>${totalPlaces}</strong>Places</div>
  </div>
  ${dayRows}
  <div class="footer">
    Rajasthan Tourism Places &nbsp;|&nbsp; rajasthanplaces.in &nbsp;|&nbsp; +91 99999-99999
  </div>
</body>
</html>`;

    const win = window.open("", "_blank");
    if (win) {
        win.document.write(html);
        win.document.close();
        win.onload = () => setTimeout(() => win.print(), 500);
    } else {
        showToast("Please allow popups to download PDF");
    }
}

function downloadText(itinerary: DayPlan[]): void {
    const lines: string[] = [
        "═══════════════════════════════════════",
        "   🏰 RAJASTHAN TOURISM PLACES TRIP ITINERARY",
        "═══════════════════════════════════════",
        "",
    ];

    itinerary.forEach((day) => {
        lines.push(`DAY ${day.day} — ${day.city.toUpperCase()}`);
        lines.push(day.date);
        lines.push("───────────────────────────────────────");

        const slots = [
            { label: "🌅 MORNING (8:00 AM - 12:00 PM)", slot: day.morning },
            { label: "☀️  AFTERNOON (1:00 PM - 5:00 PM)", slot: day.afternoon },
            { label: "🌆 EVENING (5:00 PM - 8:00 PM)", slot: day.evening },
        ];

        slots.forEach(({ label, slot }) => {
            lines.push(`\n${label}`);
            if (slot) {
                lines.push(`  📍 ${slot.place.name}`);
                lines.push(
                    `  📌 ${slot.place.location.address}, ${slot.place.location.city}`
                );
                lines.push(
                    `  ⏰ Open: ${slot.place.timing.open} - ${slot.place.timing.close}`
                );
                lines.push(
                    `  🎫 Entry: ${slot.place.ticket.isFree
                        ? "FREE"
                        : `₹${slot.place.ticket.indian} (Indian) / ₹${slot.place.ticket.foreigner} (Foreign)`
                    }`
                );
                lines.push(
                    `  ⏱️  Duration: ${slot.place.visitDuration.recommended}`
                );
                lines.push(`  ⭐ Rating: ${slot.place.rating}/5`);
                lines.push(`  🗺️  Map: ${slot.place.location.googleMapUrl}`);
            } else {
                lines.push("  🧘 Leisure time — explore local area, try local food");
            }
        });

        lines.push("\n");
    });

    lines.push("═══════════════════════════════════════");
    lines.push("Rajasthan Tourism Places");
    lines.push("🌐 rajasthanplaces.in");
    lines.push("📞 +91 99999-99999");
    lines.push("═══════════════════════════════════════");

    const blob = new Blob([lines.join("\n")], {
        type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Rajasthan-Trip-${new Date()
        .toISOString()
        .split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ============ MAIN COMPONENT ============
export default function PlanTripClient({ places: PLACES }: { places: Place[] }) {
    const { language } = useLanguage();
    const currentCities = language === 'hi' ? CITIES_HINDI : CITIES;
    const [step, setStep] = useState(1);
    const [config, setConfig] = useState<TripConfig>({
        selectedCities: [],
        startDate: new Date().toISOString().split("T")[0],
        days: 3,
        interests: [],
        pace: "moderate",
    });
    const [itinerary, setItinerary] = useState<DayPlan[]>([]);
    const [expandedDay, setExpandedDay] = useState<number | null>(null);

    const availableCities = currentCities.filter((c) => {
        if (c === "All Cities" || c === "सभी शहर") return false;
        const engCity = getEnglishCityName(c);
        const count = PLACES.filter((p) => p.city === engCity).length;
        return count > 0;
    });

    const canProceed = () => {
        if (step === 1) return config.selectedCities.length > 0;
        if (step === 2) return config.days > 0 && !!config.startDate;
        return true;
    };

    const handleNext = () => {
        if (step === 3) {
            const plan = generateItinerary(config, PLACES);
            setItinerary(plan);
            setExpandedDay(1);
        }
        setStep((p) => Math.min(p + 1, 4));
    };

    const handleBack = () => setStep((p) => Math.max(p - 1, 1));

    const handleReset = () => {
        setStep(1);
        setConfig({
            selectedCities: [],
            startDate: new Date().toISOString().split("T")[0],
            days: 3,
            interests: [],
            pace: "moderate",
        });
        setItinerary([]);
        setExpandedDay(null);
    };

    const toggleCity = (city: string) => {
        setConfig((p) => ({
            ...p,
            selectedCities: p.selectedCities.includes(city)
                ? p.selectedCities.filter((c) => c !== city)
                : [...p.selectedCities, city],
        }));
    };

    const toggleInterest = (id: string) => {
        setConfig((p) => ({
            ...p,
            interests: p.interests.includes(id)
                ? p.interests.filter((i) => i !== id)
                : [...p.interests, id],
        }));
    };

    const stats = itinerary.length > 0 ? calculateTripStats(itinerary) : null;

    return (
        <div className="relative isolate min-h-screen">
            {/* Hero */}
            <PageHero
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Mehrangarh_Fort_sanhita.jpg/1280px-Mehrangarh_Fort_sanhita.jpg"
                imageAlt="Mehrangarh Fort, Jodhpur"
                eyebrow="Trip Planner"
                title={
                    <>
                        Plan Your <em>Rajasthan Trip</em>
                    </>
                }
                subtitle="Create a personalized itinerary in minutes"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Plan Trip" }]}
            />

            {/* Ambient light behind the planner */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[60svh] -z-10 h-[120vh] overflow-hidden">
                <div className="absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-gold-500/15 blur-[140px] dark:bg-gold-500/10" />
                <div className="absolute -right-40 top-1/2 h-[30rem] w-[30rem] rounded-full bg-maroon-500/10 blur-[140px] dark:bg-maroon-500/20" />
            </div>

            {/* Step Indicator — floating glass rail overlapping the hero */}
            <div className="relative z-10 -mt-12 px-4 md:-mt-14">
                <div className="glass-strong mx-auto max-w-4xl rounded-[1.75rem] px-4 py-5 sm:px-8 sm:py-6">
                    <div className="flex items-center justify-between">
                        {STEPS.map((s, i) => {
                            const Icon = s.icon;
                            const isActive = step === s.id;
                            const isCompleted = step > s.id;
                            return (
                                <div key={s.id} className="flex items-center flex-1 last:flex-none">
                                    <div className="flex flex-col items-center">
                                        <motion.div
                                            animate={{ scale: isActive ? 1.08 : 1 }}
                                            transition={{ duration: 0.5, ease: EASE }}
                                            aria-current={isActive ? "step" : undefined}
                                            className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ease-lux sm:h-12 sm:w-12 ${isCompleted
                                                ? "bg-ink-900 text-gold-300 dark:bg-ivory-100 dark:text-ink-900"
                                                : isActive
                                                    ? "bg-gold-400 text-ink-900 shadow-gold ring-4 ring-gold-400/25"
                                                    : "border border-ink-900/10 bg-white/50 text-ink-400 dark:border-white/10 dark:bg-white/5 dark:text-ivory-200/40"
                                                }`}
                                        >
                                            {isCompleted ? (
                                                <Check size={18} />
                                            ) : (
                                                <Icon size={18} />
                                            )}
                                        </motion.div>
                                        <div className="mt-2.5 hidden text-center sm:block">
                                            <div
                                                className={`text-xs font-semibold ${isActive
                                                    ? "text-ink-900 dark:text-ivory-50"
                                                    : isCompleted
                                                        ? "text-gold-700 dark:text-gold-400"
                                                        : "text-ink-400 dark:text-ivory-200/45"
                                                    }`}
                                            >
                                                {s.title}
                                            </div>
                                            <div className="mt-0.5 text-[11px] text-ink-400 dark:text-ivory-200/45">
                                                {s.description}
                                            </div>
                                        </div>
                                    </div>
                                    {i < STEPS.length - 1 && (
                                        <div className="relative mx-2 h-px flex-1 overflow-hidden rounded-full bg-ink-900/10 sm:-mt-10 dark:bg-white/10">
                                            <div
                                                className={`absolute inset-y-0 left-0 bg-gold-500 transition-all duration-700 ease-lux ${step > s.id ? "w-full" : "w-0"
                                                    }`}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <AnimatePresence mode="wait">

                    {/* ========== STEP 1: CITIES ========== */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.5, ease: EASE }}
                        >
                            <StepHeading
                                eyebrow="Step 01"
                                title="Which cities do you want to visit?"
                                subtitle="Tap to select — multiple cities allowed"
                            />

                            {/* Selected cities sticky bar */}
                            {config.selectedCities.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, ease: EASE }}
                                    className="glass-strong sticky top-20 z-30 mb-6 flex flex-wrap items-center gap-2 rounded-full px-3 py-2 md:top-24"
                                >
                                    <span className="shrink-0 pl-2 text-xs font-semibold text-gold-700 dark:text-gold-400">✓ Selected:</span>
                                    {config.selectedCities.map((city) => (
                                        <span key={city} className="flex items-center gap-1 rounded-full bg-ink-900 py-1 pl-3 pr-1.5 text-xs font-semibold text-ivory-50 dark:bg-gold-400 dark:text-ink-900">
                                            {city}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); toggleCity(city); }}
                                                aria-label={`Remove ${city}`}
                                                className="ml-0.5 flex h-5 w-5 items-center justify-center rounded-full transition-colors hover:bg-white/20 dark:hover:bg-ink-900/15"
                                            >
                                                <X size={11} />
                                            </button>
                                        </span>
                                    ))}
                                    <span className="ml-auto pr-2 text-xs font-medium text-ink-500 dark:text-ivory-200/60">{config.selectedCities.length} city selected</span>
                                </motion.div>
                            )}

                            {/* Modern City Grid */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {availableCities.map((city) => {
                                    const isSelected = config.selectedCities.includes(city);
                                    const engCityName = getEnglishCityName(city);
                                    const cityPlaces = PLACES.filter((p) => p.city === engCityName).length;
                                    const meta = CITY_METADATA[city] || CITY_METADATA[engCityName] || {
                                        icon: "📍",
                                        tag: "Royal Heritage",
                                        tagHi: "शाही धरोहर",
                                        desc: "Discover historical places, culture and vibrant architecture",
                                        descHi: "ऐतिहासिक स्थल, संस्कृति और वास्तुकला का अन्वेषण करें",
                                        highlights: "Heritage • Culture • Sights",
                                        highlightsHi: "धरोहर • संस्कृति • दर्शनीय स्थल",
                                    };
                                    const isHi = language === "hi";

                                    return (
                                        <motion.button
                                            key={city}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => toggleCity(city)}
                                            aria-pressed={isSelected}
                                            className={`group relative flex w-full cursor-pointer flex-col justify-between rounded-[1.5rem] p-5 text-left transition-all duration-500 ease-lux hover:-translate-y-1 ${isSelected
                                                ? "glass-strong !border-gold-500/70 shadow-gold ring-1 ring-gold-500/50"
                                                : "glass hover:shadow-float-lg"
                                                }`}
                                        >
                                            {/* Header: Icon + Places badge + Check badge */}
                                            <div>
                                                <div className="mb-4 flex items-center justify-between gap-2">
                                                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gold-500/25 bg-gold-500/10 text-xl transition-transform duration-500 ease-lux group-hover:scale-110 group-hover:-rotate-6">
                                                        <span>{meta.icon}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-colors ${isSelected
                                                            ? "bg-gold-400/25 text-gold-800 dark:text-gold-200"
                                                            : "bg-ink-900/5 text-ink-500 dark:bg-white/5 dark:text-ivory-200/60"
                                                            }`}>
                                                            {cityPlaces} {isHi ? "स्थान" : "places"}
                                                        </span>
                                                        <div className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ease-lux ${isSelected
                                                            ? "scale-100 bg-gold-400 text-ink-900 shadow-sm"
                                                            : "scale-90 border border-ink-900/10 text-ink-300 opacity-60 group-hover:opacity-100 dark:border-white/10 dark:text-ivory-200/30"
                                                            }`}>
                                                            <Check size={13} className={isSelected ? "stroke-[3]" : ""} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* City Name & Royal Tagline */}
                                                <div>
                                                    <div className="font-display text-2xl font-medium leading-tight tracking-tight text-ink-900 transition-colors dark:text-ivory-50">
                                                        {city}
                                                    </div>
                                                    <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-700 dark:text-gold-400">
                                                        <Sparkles size={11} className="shrink-0" />
                                                        <span className="truncate">{isHi ? meta.tagHi : meta.tag}</span>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-ink-500 dark:text-ivory-200/65">
                                                    {isHi ? meta.descHi : meta.desc}
                                                </p>
                                            </div>

                                            {/* Landmarks highlight footer */}
                                            <div className="mt-4 flex items-center gap-1.5 border-t border-ink-900/10 pt-3 text-[11px] font-medium text-ink-500 dark:border-white/10 dark:text-ivory-200/55">
                                                <span className="shrink-0 text-xs">🏛️</span>
                                                <span className="truncate">{isHi ? meta.highlightsHi : meta.highlights}</span>
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* ========== STEP 2: DURATION ========== */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.5, ease: EASE }}
                        >
                            <StepHeading
                                eyebrow="Step 02"
                                title="How long is your trip?"
                                subtitle="Set your travel dates and pace"
                            />

                            <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-5">
                                {/* Start Date */}
                                <div className="glass rounded-[1.75rem] p-6 md:col-span-2 md:p-7">
                                    <label htmlFor="trip-start-date" className={PANEL_LABEL}>
                                        📅 Start Date
                                    </label>
                                    <input
                                        id="trip-start-date"
                                        type="date"
                                        value={config.startDate}
                                        min={new Date().toISOString().split("T")[0]}
                                        onChange={(e) =>
                                            setConfig((p) => ({
                                                ...p,
                                                startDate: e.target.value,
                                            }))
                                        }
                                        className="field !text-base dark:[color-scheme:dark]"
                                    />
                                </div>

                                {/* Number of Days */}
                                <div className="glass rounded-[1.75rem] p-6 md:col-span-3 md:row-span-2 md:p-7">
                                    <label className={PANEL_LABEL}>
                                        📆 Number of Days
                                    </label>
                                    <div className="mb-6 mt-2 flex items-center justify-center gap-8">
                                        <button
                                            onClick={() =>
                                                setConfig((p) => ({
                                                    ...p,
                                                    days: Math.max(1, p.days - 1),
                                                }))
                                            }
                                            aria-label="Decrease days"
                                            className="btn-glass !h-12 !w-12 !p-0 text-2xl"
                                        >
                                            −
                                        </button>
                                        <div className="min-w-[6rem] text-center" aria-live="polite">
                                            <div className="font-display text-7xl font-medium leading-none tracking-tight text-ink-900 dark:text-ivory-50">
                                                {config.days}
                                            </div>
                                            <div className="mt-2 text-[11px] font-semibold uppercase tracking-eyebrow text-gold-700 dark:text-gold-400">
                                                {config.days === 1 ? "Day" : "Days"}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                setConfig((p) => ({
                                                    ...p,
                                                    days: Math.min(14, p.days + 1),
                                                }))
                                            }
                                            aria-label="Increase days"
                                            className="btn-glass !h-12 !w-12 !p-0 text-2xl"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-2">
                                        {[2, 3, 5, 7, 10].map((d) => (
                                            <button
                                                key={d}
                                                onClick={() =>
                                                    setConfig((p) => ({ ...p, days: d }))
                                                }
                                                aria-pressed={config.days === d}
                                                className={config.days === d ? "chip-active" : "chip-idle"}
                                            >
                                                {d} Days
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-6 flex items-start gap-2 rounded-2xl border border-gold-500/20 bg-gold-500/10 p-3.5 text-sm text-ink-700 dark:text-ivory-100/85">
                                        <AlertCircle
                                            size={16}
                                            className="mt-0.5 flex-shrink-0 text-gold-700 dark:text-gold-400"
                                        />
                                        <span>
                                            Recommended:{" "}
                                            {Math.max(2, config.selectedCities.length * 2)} days
                                            for {config.selectedCities.join(", ")}
                                        </span>
                                    </div>
                                </div>

                                {/* Travel Pace */}
                                <div className="glass rounded-[1.75rem] p-6 md:col-span-2 md:p-7">
                                    <label className={PANEL_LABEL}>
                                        🏃 Travel Pace
                                    </label>
                                    <div className="grid grid-cols-3 gap-2.5 md:grid-cols-1">
                                        {PACE_OPTIONS.map((pace) => (
                                            <button
                                                key={pace.id}
                                                onClick={() =>
                                                    setConfig((p) => ({ ...p, pace: pace.id }))
                                                }
                                                aria-pressed={config.pace === pace.id}
                                                className={`flex flex-col items-center gap-1 rounded-2xl p-3 text-center transition-all duration-300 ease-lux md:flex-row md:gap-3 md:text-left ${config.pace === pace.id
                                                    ? "bg-ink-900 text-ivory-50 shadow-float dark:bg-gold-400 dark:text-ink-900"
                                                    : "border border-ink-900/10 bg-white/40 text-ink-800 hover:border-gold-500/50 dark:border-white/10 dark:bg-white/5 dark:text-ivory-100"
                                                    }`}
                                            >
                                                <div className="text-2xl">{pace.icon}</div>
                                                <div>
                                                    <div className="text-sm font-semibold">
                                                        {pace.label}
                                                    </div>
                                                    <div className="mt-0.5 text-[11px] opacity-60">
                                                        {pace.description}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ========== STEP 3: INTERESTS ========== */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.5, ease: EASE }}
                        >
                            <StepHeading
                                eyebrow="Step 03"
                                title="What interests you?"
                                subtitle="Select your interests to personalize (optional)"
                            />

                            <div className="mx-auto max-w-4xl">
                                <div className="mb-8 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                                    {INTERESTS.map((interest) => {
                                        const isSelected = config.interests.includes(
                                            interest.id
                                        );
                                        return (
                                            <motion.button
                                                key={interest.id}
                                                whileHover={{ y: -4 }}
                                                whileTap={{ scale: 0.96 }}
                                                onClick={() => toggleInterest(interest.id)}
                                                aria-pressed={isSelected}
                                                className={`relative rounded-[1.25rem] p-4 text-center transition-colors duration-300 ease-lux ${isSelected
                                                    ? "bg-ink-900 text-ivory-50 shadow-float dark:bg-gold-400 dark:text-ink-900"
                                                    : "glass text-ink-600 dark:text-ivory-200/80"
                                                    }`}
                                            >
                                                <div className="mb-2 text-3xl">{interest.icon}</div>
                                                <div className="text-sm font-medium">
                                                    {interest.label}
                                                </div>
                                                {isSelected && (
                                                    <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold-400 text-ink-900 dark:bg-ink-900 dark:text-gold-300">
                                                        <Check
                                                            size={12}
                                                            className="stroke-[3]"
                                                        />
                                                    </span>
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                {/* Summary */}
                                <div className="glass-strong rounded-[1.75rem] p-6 md:p-8">
                                    <h3 className="font-display text-2xl font-medium text-ink-900 dark:text-ivory-50">
                                        📋 Trip Summary
                                    </h3>
                                    <div className="hairline my-5" />
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {[
                                            { label: "Cities", value: config.selectedCities.length },
                                            { label: "Days", value: config.days },
                                            {
                                                label: "Places/Day",
                                                value: PACE_OPTIONS.find((p) => p.id === config.pace)
                                                    ?.placesPerDay || 2,
                                            },
                                            { label: "Interests", value: config.interests.length },
                                        ].map((s) => (
                                            <div key={s.label} className="rounded-2xl bg-ink-900/[0.03] p-4 text-center dark:bg-white/[0.04]">
                                                <div className="font-display text-4xl font-medium leading-none text-ink-900 dark:text-ivory-50">
                                                    {s.value}
                                                </div>
                                                <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-700 dark:text-gold-400">{s.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ========== STEP 4: ITINERARY ========== */}
                    {step === 4 && itinerary.length > 0 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: EASE }}
                        >
                            {/* Header */}
                            <div className="mb-10 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                                    className="glass mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-4xl"
                                >
                                    🎉
                                </motion.div>
                                <span className="eyebrow">Step 04</span>
                                <h2 className="display-title mt-4 text-4xl sm:text-5xl md:text-6xl">
                                    Your Itinerary is Ready!
                                </h2>
                                <p className="mt-4 text-ink-500 dark:text-ivory-200/70">
                                    {stats?.totalDays} Days •{" "}
                                    {stats?.totalCities} Cities •{" "}
                                    {stats?.totalPlaces} Places
                                </p>

                                {/* Selected Cities Strip */}
                                <div className="mt-8 flex flex-wrap justify-center gap-2.5">
                                    {config.selectedCities.map((city) => {
                                        const eng = getEnglishCityName(city);
                                        const meta = CITY_METADATA[city] || CITY_METADATA[eng] || {
                                            icon: "📍",
                                            tag: "Royal Heritage",
                                            tagHi: "शाही धरोहर",
                                            desc: "",
                                            descHi: "",
                                            highlights: "",
                                            highlightsHi: "",
                                        };
                                        const isHi = language === "hi";
                                        return (
                                            <div
                                                key={city}
                                                className="glass flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4"
                                            >
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/15 text-lg">{meta.icon}</span>
                                                <div className="text-left">
                                                    <div className="text-xs font-semibold leading-tight text-ink-900 dark:text-ivory-50">
                                                        {city}
                                                    </div>
                                                    <div className="text-[10px] font-medium text-gold-700 dark:text-gold-400">
                                                        {isHi ? meta.tagHi : meta.tag}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Stats */}
                            {stats && (
                                <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-5">
                                    {[
                                        { label: "Days", value: stats.totalDays },
                                        { label: "Cities", value: stats.totalCities },
                                        { label: "Places", value: stats.totalPlaces },
                                        { label: "Free Entry", value: stats.freeEntryCount },
                                        { label: "Est. Cost", value: `₹${stats.totalCost}` },
                                    ].map((s, i) => (
                                        <div
                                            key={s.label}
                                            className={`glass rounded-[1.5rem] p-5 text-center ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
                                        >
                                            <div className={`font-display text-4xl font-medium leading-none ${i === 4 ? "text-gold-700 dark:text-gold-300" : "text-ink-900 dark:text-ivory-50"}`}>
                                                {s.value}
                                            </div>
                                            <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400 dark:text-ivory-200/55">
                                                {s.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="mb-10 flex flex-wrap justify-center gap-2.5">
                                <button
                                    onClick={() => {
                                        downloadPDF(itinerary, config.selectedCities);
                                        showToast("🖨️ Opening print dialog...");
                                    }}
                                    className="btn-glass !px-5 !py-2.5"
                                >
                                    <Printer size={16} />
                                    Print / PDF
                                </button>

                                <button
                                    onClick={async () => {
                                        await shareItinerary(
                                            itinerary,
                                            config.selectedCities
                                        );
                                    }}
                                    className="btn-glass !px-5 !py-2.5"
                                >
                                    <Share2 size={16} />
                                    Share
                                </button>

                                <button
                                    onClick={() => {
                                        downloadPDF(itinerary, config.selectedCities);
                                        showToast("📄 PDF opened for saving!");
                                    }}
                                    className="btn-gold !px-5 !py-2.5"
                                >
                                    <Download size={16} />
                                    Download PDF
                                </button>

                                <button
                                    onClick={() => {
                                        downloadText(itinerary);
                                        showToast("✅ Text file downloaded!");
                                    }}
                                    className="btn-glass !px-5 !py-2.5"
                                >
                                    <Download size={16} />
                                    Text File
                                </button>

                                <button
                                    onClick={handleReset}
                                    className="btn !px-5 !py-2.5 border border-maroon-500/25 bg-maroon-500/10 text-maroon-600 hover:-translate-y-0.5 hover:bg-maroon-500/15 dark:text-maroon-300"
                                >
                                    <RotateCcw size={16} />
                                    Start Over
                                </button>
                            </div>

                            {/* Day Cards */}
                            <div className="space-y-4">
                                {itinerary.map((day) => (
                                    <motion.div
                                        key={day.day}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: Math.min(day.day * 0.08, 0.5), duration: 0.6, ease: EASE }}
                                        className={`overflow-hidden rounded-[1.75rem] transition-shadow duration-500 ease-lux ${expandedDay === day.day ? "glass-strong" : "glass hover:shadow-float"}`}
                                    >
                                        {/* Day Header */}
                                        <button
                                            onClick={() =>
                                                setExpandedDay(
                                                    expandedDay === day.day ? null : day.day
                                                )
                                            }
                                            aria-expanded={expandedDay === day.day}
                                            className="flex w-full items-center justify-between gap-3 p-4 transition-colors md:p-5"
                                        >
                                            <div className="flex min-w-0 items-center gap-4">
                                                {/* City themed badge */}
                                                {(() => {
                                                    const eng = getEnglishCityName(day.city);
                                                    const meta = CITY_METADATA[day.city] || CITY_METADATA[eng] || { icon: "📍" };
                                                    return (
                                                        <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-2xl bg-ink-900 text-ivory-50 shadow-float dark:bg-gold-400 dark:text-ink-900">
                                                            <span className="text-lg leading-none">{meta.icon}</span>
                                                            <span className="mt-1 text-[9px] font-bold uppercase leading-none tracking-wider text-gold-300 dark:text-ink-900">
                                                                Day {day.day}
                                                            </span>
                                                        </div>
                                                    );
                                                })()}
                                                <div className="min-w-0 text-left">
                                                    <div className="truncate font-display text-xl font-medium text-ink-900 md:text-2xl dark:text-ivory-50">
                                                        Day {day.day} — {day.city}
                                                    </div>
                                                    <div className="text-xs text-ink-400 dark:text-ivory-200/55">
                                                        {day.date}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex shrink-0 items-center gap-3">
                                                <div className="hidden gap-1 sm:flex">
                                                    {[day.morning, day.afternoon, day.evening]
                                                        .filter(Boolean)
                                                        .map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className="h-1.5 w-1.5 rounded-full bg-gold-500"
                                                            />
                                                        ))}
                                                </div>
                                                <span className="text-xs text-ink-400 dark:text-ivory-200/55">
                                                    {
                                                        [
                                                            day.morning,
                                                            day.afternoon,
                                                            day.evening,
                                                        ].filter(Boolean).length
                                                    }{" "}
                                                    places
                                                </span>
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-900/10 text-ink-500 dark:border-white/10 dark:text-ivory-200/70">
                                                    {expandedDay === day.day ? (
                                                        <ChevronUp
                                                            size={16}
                                                        />
                                                    ) : (
                                                        <ChevronDown
                                                            size={16}
                                                        />
                                                    )}
                                                </span>
                                            </div>
                                        </button>

                                        {/* Day Content */}
                                        <AnimatePresence>
                                            {expandedDay === day.day && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.4, ease: EASE }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="space-y-4 px-4 pb-5 pt-2 md:px-6 md:pb-6">
                                                        <div className="hairline mb-4" />
                                                        {(
                                                            [
                                                                "morning",
                                                                "afternoon",
                                                                "evening",
                                                            ] as const
                                                        ).map((slotKey) => {
                                                            const placeSlot =
                                                                slotKey === "morning"
                                                                    ? day.morning
                                                                    : slotKey === "afternoon"
                                                                        ? day.afternoon
                                                                        : day.evening;

                                                            const slotInfo = getTimeSlotInfo(slotKey);
                                                            const SlotIcon = slotInfo.icon;

                                                            return (
                                                                <div
                                                                    key={slotKey}
                                                                    className="flex gap-4"
                                                                >
                                                                    {/* Timeline */}
                                                                    <div className="flex flex-shrink-0 flex-col items-center">
                                                                        <div
                                                                            className={`flex h-10 w-10 items-center justify-center rounded-full ${slotInfo.bg}`}
                                                                        >
                                                                            <SlotIcon
                                                                                size={18}
                                                                                className={slotInfo.color}
                                                                            />
                                                                        </div>
                                                                        {slotKey !== "evening" && (
                                                                            <div className="mt-1 min-h-[20px] w-px flex-1 bg-gradient-to-b from-gold-500/40 to-transparent" />
                                                                        )}
                                                                    </div>

                                                                    {/* Slot Content */}
                                                                    <div className="min-w-0 flex-1 pb-4">
                                                                        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400 dark:text-ivory-200/55">
                                                                            {slotInfo.label} •{" "}
                                                                            {slotInfo.time}
                                                                        </div>

                                                                        {placeSlot ? (
                                                                            <Link
                                                                                href={`/places/${placeSlot.place.slug}`}
                                                                                className="group block rounded-[1.25rem] border border-ink-900/5 bg-white/55 p-3 transition-all duration-500 ease-lux hover:-translate-y-0.5 hover:shadow-float dark:border-white/5 dark:bg-white/[0.04]"
                                                                            >
                                                                                <div className="flex gap-3.5">
                                                                                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl">
                                                                                        <Image
                                                                                            src={placeSlot.place.images[0]}
                                                                                            alt={placeSlot.place.name}
                                                                                            width={80}
                                                                                            height={80}
                                                                                            className="h-20 w-20 object-cover transition-transform duration-700 ease-lux group-hover:scale-110"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="min-w-0 flex-1">
                                                                                        <div className="flex items-start justify-between gap-2">
                                                                                            <h3 className="font-display text-lg font-medium leading-tight text-ink-900 transition-colors group-hover:text-gold-700 md:text-xl dark:text-ivory-50 dark:group-hover:text-gold-300">
                                                                                                {placeSlot.place.name}
                                                                                            </h3>
                                                                                            <div className="flex flex-shrink-0 items-center gap-1">
                                                                                                <Star
                                                                                                    size={12}
                                                                                                    className="fill-gold-500 text-gold-500"
                                                                                                />
                                                                                                <span className="text-xs font-semibold text-ink-600 dark:text-ivory-200/75">
                                                                                                    {placeSlot.place.rating}
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="mt-0.5 flex items-center gap-1 text-xs text-ink-400 dark:text-ivory-200/55">
                                                                                            <MapPin size={10} />
                                                                                            {placeSlot.place.city} •{" "}
                                                                                            {placeSlot.place.category}
                                                                                        </div>
                                                                                        <div className="mt-2 flex flex-wrap gap-2">
                                                                                            <span className="flex items-center gap-1 text-xs text-ink-500 dark:text-ivory-200/65">
                                                                                                <Clock size={10} />
                                                                                                {
                                                                                                    placeSlot.place.timing
                                                                                                        .open
                                                                                                }{" "}
                                                                                                -{" "}
                                                                                                {
                                                                                                    placeSlot.place.timing
                                                                                                        .close
                                                                                                }
                                                                                            </span>
                                                                                            <span
                                                                                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${placeSlot.place.ticket
                                                                                                    .isFree
                                                                                                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                                                                                                    : "bg-gold-500/15 text-gold-800 dark:text-gold-300"
                                                                                                    }`}
                                                                                            >
                                                                                                {placeSlot.place.ticket
                                                                                                    .isFree
                                                                                                    ? "Free Entry"
                                                                                                    : `₹${placeSlot.place.ticket.indian}`}
                                                                                            </span>
                                                                                            <span className="text-xs text-ink-400 dark:text-ivory-200/55">
                                                                                                ⏱{" "}
                                                                                                {
                                                                                                    placeSlot.place
                                                                                                        .visitDuration
                                                                                                        .recommended
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Link>
                                                                        ) : (
                                                                            <div className="rounded-[1.25rem] border border-dashed border-ink-900/15 p-4 text-center dark:border-white/15">
                                                                                <span className="text-sm text-ink-400 dark:text-ivory-200/55">
                                                                                    {slotKey === "evening"
                                                                                        ? "🌅 Free time — Explore local markets & food"
                                                                                        : "🧘 Leisure time — Rest & relax"}
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}

                                                        {/* Daily Tip */}
                                                        <div className="ml-14 flex items-start gap-2 rounded-2xl border border-gold-500/20 bg-gold-500/10 p-3.5 text-sm text-ink-700 dark:text-ivory-100/85">
                                                            <AlertCircle
                                                                size={14}
                                                                className="mt-0.5 flex-shrink-0 text-gold-700 dark:text-gold-400"
                                                            />
                                                            <span>
                                                                💡 Start early to avoid crowds & heat. Carry
                                                                water, sunscreen & comfortable shoes.
                                                            </span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Bottom CTA */}
                            <div className="mt-12 text-center">
                                <Link
                                    href="/places"
                                    className="btn-primary !px-8 !py-4 text-base"
                                >
                                    Explore All Places
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Spacer so content isn't hidden behind sticky bar */}
                {step < 4 && <div className="h-40 md:h-24" />}
            </div>

            {/* SEO Interlinks — Explore More (only shown when itinerary is generated) */}
            {step === 4 && (
                <ExploreMoreSection currentPage="places" language={language} />
            )}

            {/* ── Floating Bottom Navigation Bar (sits above the phone dock) ── */}
            {step < 4 && (
                <div className="fixed inset-x-0 bottom-[5.25rem] z-40 px-3 md:bottom-6">
                    <div className="glass-strong mx-auto flex max-w-3xl items-center gap-3 rounded-full p-2 shadow-float-lg">
                        {/* Back button */}
                        <button
                            onClick={handleBack}
                            disabled={step === 1}
                            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-lux sm:px-5 ${step === 1
                                ? "cursor-not-allowed text-ink-300 dark:text-ivory-200/25"
                                : "text-ink-700 hover:bg-ink-900/5 dark:text-ivory-100 dark:hover:bg-white/10"
                                }`}
                        >
                            <ArrowLeft size={16} />
                            Back
                        </button>

                        {/* Step hint */}
                        <div className="min-w-0 flex-1 text-center">
                            {step === 1 && (
                                <p className="truncate text-xs text-ink-500 dark:text-ivory-200/60">
                                    {config.selectedCities.length === 0
                                        ? "Select at least 1 city to continue"
                                        : `${config.selectedCities.length} city selected — ready to continue!`}
                                </p>
                            )}
                            {step === 2 && (
                                <p className="truncate text-xs text-ink-500 dark:text-ivory-200/60">
                                    Set your travel dates and pace
                                </p>
                            )}
                            {step === 3 && (
                                <p className="truncate text-xs text-ink-500 dark:text-ivory-200/60">
                                    Choose your interests &amp; generate plan
                                </p>
                            )}
                        </div>

                        {/* Continue / Generate button */}
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-500 ease-lux sm:px-6 ${canProceed()
                                ? "btn-gold"
                                : "cursor-not-allowed bg-ink-900/5 text-ink-400 dark:bg-white/5 dark:text-ivory-200/40"
                                }`}
                        >
                            {step === 3 ? (
                                <>
                                    <span>Generate Plan</span>
                                    <Check size={16} />
                                </>
                            ) : (
                                <>
                                    <span>Continue</span>
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>
            )}
        </div>
    );
}

/** Editorial heading used at the top of each planner step. */
function StepHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
    return (
        <div className="mb-10 text-center">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="display-title mx-auto mt-4 max-w-3xl text-3xl sm:text-4xl md:text-5xl">
                {title}
            </h2>
            <p className="mt-3 text-ink-500 dark:text-ivory-200/70">
                {subtitle}
            </p>
        </div>
    );
}
