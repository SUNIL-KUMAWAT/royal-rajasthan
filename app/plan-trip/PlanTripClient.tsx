// app/plan-trip/PlanTripClient.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
import { PLACES, CITIES, CITIES_HINDI } from "@/constants/data";
import { useLanguage } from "@/components/LanguageProvider";
import type { Place } from "@/constants/data";
import { ExploreMoreSection } from "@/components/shared/ExploreMoreSection";

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
                color: "text-orange-500",
                bg: "bg-orange-50 dark:bg-orange-900/20",
            };
        case "afternoon":
            return {
                icon: Sun,
                label: "Afternoon",
                time: "1:00 PM - 5:00 PM",
                color: "text-yellow-500",
                bg: "bg-yellow-50 dark:bg-yellow-900/20",
            };
        case "evening":
            return {
                icon: Sunset,
                label: "Evening",
                time: "5:00 PM - 8:00 PM",
                color: "text-purple-500",
                bg: "bg-purple-50 dark:bg-purple-900/20",
            };
    }
}

function getEnglishCityName(city: string): string {
    const hindiIdx = CITIES_HINDI.indexOf(city);
    return hindiIdx !== -1 ? CITIES[hindiIdx] : city;
}

function generateItinerary(config: TripConfig): DayPlan[] {
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
    position:fixed; top:80px; left:50%; transform:translateX(-50%);
    background:#1f2937; color:white; padding:12px 24px;
    border-radius:50px; z-index:9999; font-size:14px;
    font-weight:500; box-shadow:0 10px 40px rgba(0,0,0,0.3);
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
export default function PlanTripClient() {
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
            const plan = generateItinerary(config);
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
        <div className="min-h-screen bg-palace-white dark:bg-gray-950 mt-16">
            {/* Hero */}
            <section
                className="h-48 md:h-64 relative flex items-end justify-center pb-8"
                style={{
                    backgroundImage:
                        "url(https://picsum.photos/seed/raj-1140/800/600",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-playfair text-3xl md:text-5xl font-bold text-white mb-2"
                    >
                        Plan Your{" "}
                        <span className="text-yellow-400">Rajasthan Trip</span>
                    </motion.h1>
                    <p className="text-white/70 text-sm md:text-base">
                        Create a personalized itinerary in minutes
                    </p>
                </div>
            </section>

            {/* Step Indicator */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-6">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {STEPS.map((s, i) => {
                            const Icon = s.icon;
                            const isActive = step === s.id;
                            const isCompleted = step > s.id;
                            return (
                                <div key={s.id} className="flex items-center flex-1">
                                    <div className="flex flex-col items-center">
                                        <motion.div
                                            animate={{ scale: isActive ? 1.1 : 1 }}
                                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${isCompleted
                                                ? "bg-green-500 text-white"
                                                : isActive
                                                    ? "bg-yellow-500 text-white shadow-lg ring-4 ring-yellow-200 dark:ring-yellow-800"
                                                    : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                                                }`}
                                        >
                                            {isCompleted ? (
                                                <Check size={20} />
                                            ) : (
                                                <Icon size={20} />
                                            )}
                                        </motion.div>
                                        <div className="mt-2 text-center hidden sm:block">
                                            <div
                                                className={`text-xs font-medium ${isActive
                                                    ? "text-yellow-600 dark:text-yellow-400"
                                                    : isCompleted
                                                        ? "text-green-600"
                                                        : "text-gray-400"
                                                    }`}
                                            >
                                                {s.title}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-0.5">
                                                {s.description}
                                            </div>
                                        </div>
                                    </div>
                                    {i < STEPS.length - 1 && (
                                        <div
                                            className={`flex-1 h-0.5 mx-2 mt-[-20px] sm:mt-0 transition-all duration-500 ${step > s.id
                                                ? "bg-green-500"
                                                : "bg-gray-200 dark:bg-gray-700"
                                                }`}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 py-8">
                <AnimatePresence mode="wait">

                    {/* ========== STEP 1: CITIES ========== */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <div className="text-center mb-6">
                                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    Which cities do you want to visit?
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                    Tap to select — multiple cities allowed
                                </p>
                            </div>

                            {/* Selected cities sticky bar */}
                            {config.selectedCities.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="sticky top-20 z-30 mb-4 bg-yellow-50/90 dark:bg-yellow-900/30 backdrop-blur-md border border-yellow-200 dark:border-yellow-800 rounded-2xl px-4 py-3 flex items-center gap-2 flex-wrap shadow-md"
                                >
                                    <span className="text-yellow-700 dark:text-yellow-400 font-semibold text-xs shrink-0">✓ Selected:</span>
                                    {config.selectedCities.map((city) => (
                                        <span key={city} className="flex items-center gap-1 bg-yellow-400 text-yellow-900 px-2.5 py-1 rounded-full text-xs font-bold">
                                            {city}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); toggleCity(city); }}
                                                className="ml-0.5 hover:text-red-700 transition-colors"
                                            >
                                                <X size={11} />
                                            </button>
                                        </span>
                                    ))}
                                    <span className="ml-auto text-yellow-600 dark:text-yellow-500 text-xs font-medium">{config.selectedCities.length} city selected</span>
                                </motion.div>
                            )}

                            {/* Modern City Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
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
                                            className={`group relative rounded-2xl p-4 text-left w-full transition-all duration-200 cursor-pointer flex flex-col justify-between ${isSelected
                                                ? "bg-gradient-to-br from-amber-500/15 via-yellow-500/10 to-amber-500/5 dark:from-yellow-950/40 dark:via-gray-800 dark:to-amber-900/30 border-2 border-amber-500 dark:border-amber-400 shadow-md shadow-amber-500/10"
                                                : "bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/80 hover:border-amber-400/80 dark:hover:border-amber-500/50 hover:shadow-md hover:bg-amber-50/20 dark:hover:bg-gray-800"
                                                }`}
                                        >
                                            {/* Header: Icon + Places badge + Check badge */}
                                            <div>
                                                <div className="flex items-center justify-between gap-2 mb-2.5">
                                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br from-amber-100 to-yellow-50 dark:from-yellow-950/60 dark:to-amber-900/40 border border-amber-200/80 dark:border-amber-700/50 shadow-inner flex-shrink-0 group-hover:scale-105 transition-transform">
                                                        <span>{meta.icon}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full transition-colors ${isSelected
                                                            ? "bg-amber-200/80 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200"
                                                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                                            }`}>
                                                            {cityPlaces} {isHi ? "स्थान" : "places"}
                                                        </span>
                                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${isSelected
                                                            ? "bg-amber-500 text-white shadow-sm scale-100"
                                                            : "bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600 border border-gray-200 dark:border-gray-700 scale-90 opacity-60 group-hover:opacity-100"
                                                            }`}>
                                                            <Check size={13} className={isSelected ? "stroke-[3]" : ""} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* City Name & Royal Tagline */}
                                                <div>
                                                    <div className="font-playfair font-bold text-gray-900 dark:text-white text-base leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                                        {city}
                                                    </div>
                                                    <div className="text-amber-700 dark:text-amber-400 text-xs font-semibold tracking-wide flex items-center gap-1 mt-0.5">
                                                        <Sparkles size={11} className="shrink-0 text-amber-500" />
                                                        <span className="truncate">{isHi ? meta.tagHi : meta.tag}</span>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed mt-1.5">
                                                    {isHi ? meta.descHi : meta.desc}
                                                </p>
                                            </div>

                                            {/* Landmarks highlight footer */}
                                            <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-700/60 flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                                                <span className="text-amber-500 shrink-0 text-xs">🏛️</span>
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
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <div className="text-center mb-8">
                                <h2 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    How long is your trip?
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Set your travel dates and pace
                                </p>
                            </div>

                            <div className="max-w-2xl mx-auto space-y-6">
                                {/* Start Date */}
                                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        📅 Start Date
                                    </label>
                                    <input
                                        type="date"
                                        value={config.startDate}
                                        min={new Date().toISOString().split("T")[0]}
                                        onChange={(e) =>
                                            setConfig((p) => ({
                                                ...p,
                                                startDate: e.target.value,
                                            }))
                                        }
                                        className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-yellow-400 text-lg transition-colors"
                                    />
                                </div>

                                {/* Number of Days */}
                                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                                        📆 Number of Days
                                    </label>
                                    <div className="flex items-center gap-6 justify-center mb-4">
                                        <button
                                            onClick={() =>
                                                setConfig((p) => ({
                                                    ...p,
                                                    days: Math.max(1, p.days - 1),
                                                }))
                                            }
                                            className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center text-2xl hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-all"
                                        >
                                            −
                                        </button>
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-yellow-600 dark:text-yellow-400 font-playfair">
                                                {config.days}
                                            </div>
                                            <div className="text-gray-400 text-sm mt-1">
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
                                            className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center text-2xl hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-all"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="flex justify-center gap-2 flex-wrap">
                                        {[2, 3, 5, 7, 10].map((d) => (
                                            <button
                                                key={d}
                                                onClick={() =>
                                                    setConfig((p) => ({ ...p, days: d }))
                                                }
                                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${config.days === d
                                                    ? "bg-yellow-500 text-white"
                                                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-yellow-100"
                                                    }`}
                                            >
                                                {d} Days
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-sm text-blue-700 dark:text-blue-400 flex items-start gap-2">
                                        <AlertCircle
                                            size={16}
                                            className="mt-0.5 flex-shrink-0"
                                        />
                                        <span>
                                            Recommended:{" "}
                                            {Math.max(2, config.selectedCities.length * 2)} days
                                            for {config.selectedCities.join(", ")}
                                        </span>
                                    </div>
                                </div>

                                {/* Travel Pace */}
                                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                                        🏃 Travel Pace
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {PACE_OPTIONS.map((pace) => (
                                            <button
                                                key={pace.id}
                                                onClick={() =>
                                                    setConfig((p) => ({ ...p, pace: pace.id }))
                                                }
                                                className={`p-4 rounded-xl border-2 text-center transition-all ${config.pace === pace.id
                                                    ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                                                    : "border-gray-200 dark:border-gray-700 hover:border-yellow-300"
                                                    }`}
                                            >
                                                <div className="text-3xl mb-2">{pace.icon}</div>
                                                <div className="font-bold text-sm text-gray-800 dark:text-gray-200">
                                                    {pace.label}
                                                </div>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    {pace.description}
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
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <div className="text-center mb-8">
                                <h2 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    What interests you?
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Select your interests to personalize (optional)
                                </p>
                            </div>

                            <div className="max-w-2xl mx-auto">
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
                                    {INTERESTS.map((interest) => {
                                        const isSelected = config.interests.includes(
                                            interest.id
                                        );
                                        return (
                                            <motion.button
                                                key={interest.id}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => toggleInterest(interest.id)}
                                                className={`p-4 rounded-xl border-2 text-center transition-all ${isSelected
                                                    ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                                                    : "border-gray-200 dark:border-gray-700 hover:border-yellow-300"
                                                    }`}
                                            >
                                                <div className="text-3xl mb-2">{interest.icon}</div>
                                                <div
                                                    className={`text-sm font-medium ${isSelected
                                                        ? "text-yellow-700 dark:text-yellow-400"
                                                        : "text-gray-600 dark:text-gray-400"
                                                        }`}
                                                >
                                                    {interest.label}
                                                </div>
                                                {isSelected && (
                                                    <Check
                                                        size={14}
                                                        className="text-yellow-500 mx-auto mt-1"
                                                    />
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                {/* Summary */}
                                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">
                                        📋 Trip Summary
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                                            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                                {config.selectedCities.length}
                                            </div>
                                            <div className="text-xs text-gray-500">Cities</div>
                                        </div>
                                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                {config.days}
                                            </div>
                                            <div className="text-xs text-gray-500">Days</div>
                                        </div>
                                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                {PACE_OPTIONS.find((p) => p.id === config.pace)
                                                    ?.placesPerDay || 2}
                                            </div>
                                            <div className="text-xs text-gray-500">Places/Day</div>
                                        </div>
                                        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                                {config.interests.length}
                                            </div>
                                            <div className="text-xs text-gray-500">Interests</div>
                                        </div>
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
                        >
                            {/* Header */}
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-5xl mb-4"
                                >
                                    🎉
                                </motion.div>
                                <h2 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    Your Itinerary is Ready!
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {stats?.totalDays} Days •{" "}
                                    {stats?.totalCities} Cities •{" "}
                                    {stats?.totalPlaces} Places
                                </p>

                                {/* Selected Cities Strip */}
                                <div className="flex justify-center gap-2.5 mt-6 flex-wrap">
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
                                                className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-amber-50/90 dark:bg-yellow-950/40 border border-amber-200/80 dark:border-amber-700/60 shadow-sm"
                                            >
                                                <span className="text-xl">{meta.icon}</span>
                                                <div className="text-left">
                                                    <div className="text-xs font-bold text-gray-900 dark:text-amber-100 leading-tight">
                                                        {city}
                                                    </div>
                                                    <div className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
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
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
                                    {[
                                        { label: "Days", value: stats.totalDays, color: "text-yellow-600" },
                                        { label: "Cities", value: stats.totalCities, color: "text-blue-600" },
                                        { label: "Places", value: stats.totalPlaces, color: "text-green-600" },
                                        { label: "Free Entry", value: stats.freeEntryCount, color: "text-purple-600" },
                                        { label: "Est. Cost", value: `₹${stats.totalCost}`, color: "text-orange-600" },
                                    ].map((s) => (
                                        <div
                                            key={s.label}
                                            className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700"
                                        >
                                            <div className={`text-2xl font-bold ${s.color}`}>
                                                {s.value}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                {s.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3 justify-center mb-8">
                                <button
                                    onClick={() => {
                                        downloadPDF(itinerary, config.selectedCities);
                                        showToast("🖨️ Opening print dialog...");
                                    }}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-yellow-400 hover:text-yellow-600 transition-all"
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
                                    className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-blue-400 hover:text-blue-600 transition-all"
                                >
                                    <Share2 size={16} />
                                    Share
                                </button>

                                <button
                                    onClick={() => {
                                        downloadPDF(itinerary, config.selectedCities);
                                        showToast("📄 PDF opened for saving!");
                                    }}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all hover:scale-105"
                                >
                                    <Download size={16} />
                                    Download PDF
                                </button>

                                <button
                                    onClick={() => {
                                        downloadText(itinerary);
                                        showToast("✅ Text file downloaded!");
                                    }}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-green-400 hover:text-green-600 transition-all"
                                >
                                    <Download size={16} />
                                    Text File
                                </button>

                                <button
                                    onClick={handleReset}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 transition-all"
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
                                        transition={{ delay: Math.min(day.day * 0.08, 0.5) }}
                                        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                                    >
                                        {/* Day Header */}
                                        <button
                                            onClick={() =>
                                                setExpandedDay(
                                                    expandedDay === day.day ? null : day.day
                                                )
                                            }
                                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                {/* City themed badge */}
                                                {(() => {
                                                    const eng = getEnglishCityName(day.city);
                                                    const meta = CITY_METADATA[day.city] || CITY_METADATA[eng] || { icon: "📍" };
                                                    return (
                                                        <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 to-yellow-50 dark:from-yellow-950/50 dark:to-amber-900/30 border border-amber-300/80 dark:border-amber-700/60 shadow-sm flex-shrink-0">
                                                            <span className="text-lg leading-none">{meta.icon}</span>
                                                            <span className="text-[9px] font-black text-amber-900 dark:text-amber-300 uppercase leading-none mt-1">
                                                                Day {day.day}
                                                            </span>
                                                        </div>
                                                    );
                                                })()}
                                                <div className="text-left">
                                                    <div className="font-bold text-gray-800 dark:text-white text-sm md:text-base">
                                                        Day {day.day} — {day.city}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        {day.date}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="hidden sm:flex gap-1">
                                                    {[day.morning, day.afternoon, day.evening]
                                                        .filter(Boolean)
                                                        .map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className="w-2 h-2 rounded-full bg-yellow-400"
                                                            />
                                                        ))}
                                                </div>
                                                <span className="text-xs text-gray-400">
                                                    {
                                                        [
                                                            day.morning,
                                                            day.afternoon,
                                                            day.evening,
                                                        ].filter(Boolean).length
                                                    }{" "}
                                                    places
                                                </span>
                                                {expandedDay === day.day ? (
                                                    <ChevronUp
                                                        size={18}
                                                        className="text-gray-400"
                                                    />
                                                ) : (
                                                    <ChevronDown
                                                        size={18}
                                                        className="text-gray-400"
                                                    />
                                                )}
                                            </div>
                                        </button>

                                        {/* Day Content */}
                                        <AnimatePresence>
                                            {expandedDay === day.day && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-5 pb-5 space-y-4 pt-2">
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
                                                                    <div className="flex flex-col items-center flex-shrink-0">
                                                                        <div
                                                                            className={`w-10 h-10 rounded-full flex items-center justify-center ${slotInfo.bg}`}
                                                                        >
                                                                            <SlotIcon
                                                                                size={18}
                                                                                className={slotInfo.color}
                                                                            />
                                                                        </div>
                                                                        {slotKey !== "evening" && (
                                                                            <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-700 min-h-[20px] mt-1" />
                                                                        )}
                                                                    </div>

                                                                    {/* Slot Content */}
                                                                    <div className="flex-1 pb-4 min-w-0">
                                                                        <div className="text-xs text-gray-400 mb-2">
                                                                            {slotInfo.label} •{" "}
                                                                            {slotInfo.time}
                                                                        </div>

                                                                        {placeSlot ? (
                                                                            <Link
                                                                                href={`/places/${placeSlot.place.slug}`}
                                                                                className="block bg-gray-50 dark:bg-gray-800 rounded-xl p-4 hover:shadow-md transition-all group"
                                                                            >
                                                                                <div className="flex gap-3">
                                                                                    <Image
                                                                                        src={placeSlot.place.images[0]}
                                                                                        alt={placeSlot.place.name}
                                                                                        width={80}
                                                                                        height={80}
                                                                                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                                                                                    />
                                                                                    <div className="flex-1 min-w-0">
                                                                                        <div className="flex items-start justify-between gap-2">
                                                                                            <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-yellow-600 transition-colors text-sm md:text-base">
                                                                                                {placeSlot.place.name}
                                                                                            </h3>
                                                                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                                                                <Star
                                                                                                    size={12}
                                                                                                    className="text-yellow-400 fill-yellow-400"
                                                                                                />
                                                                                                <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                                                                                                    {placeSlot.place.rating}
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                                                                                            <MapPin size={10} />
                                                                                            {placeSlot.place.city} •{" "}
                                                                                            {placeSlot.place.category}
                                                                                        </div>
                                                                                        <div className="flex flex-wrap gap-2 mt-2">
                                                                                            <span className="flex items-center gap-1 text-xs text-gray-500">
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
                                                                                                className={`text-xs font-medium px-2 py-0.5 rounded-full ${placeSlot.place.ticket
                                                                                                    .isFree
                                                                                                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                                                                                    : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                                                                                                    }`}
                                                                                            >
                                                                                                {placeSlot.place.ticket
                                                                                                    .isFree
                                                                                                    ? "Free Entry"
                                                                                                    : `₹${placeSlot.place.ticket.indian}`}
                                                                                            </span>
                                                                                            <span className="text-xs text-gray-400">
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
                                                                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 text-center">
                                                                                <span className="text-gray-400 text-sm">
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
                                                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-sm text-blue-700 dark:text-blue-400 flex items-start gap-2 ml-14">
                                                            <AlertCircle
                                                                size={14}
                                                                className="mt-0.5 flex-shrink-0"
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
                            <div className="mt-8 text-center">
                                <Link
                                    href="/places"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all hover:scale-105"
                                >
                                    Explore All Places
                                    <ArrowRight size={20} />
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Spacer so content isn't hidden behind sticky bar */}
                {step < 4 && <div className="h-24" />}
            </div>

            {/* SEO Interlinks — Explore More (only shown when itinerary is generated) */}
            {step === 4 && (
                <ExploreMoreSection currentPage="places" language={language} />
            )}

            {/* ── Sticky Bottom Navigation Bar ── */}
            {step < 4 && (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] safe-area-bottom">
                    <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
                        {/* Back button */}
                        <button
                            onClick={handleBack}
                            disabled={step === 1}
                            className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all text-sm shrink-0 ${step === 1
                                ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                                : "text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-yellow-400 hover:text-yellow-600"
                                }`}
                        >
                            <ArrowLeft size={16} />
                            Back
                        </button>

                        {/* Step hint */}
                        <div className="flex-1 text-center">
                            {step === 1 && (
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                    {config.selectedCities.length === 0
                                        ? "Select at least 1 city to continue"
                                        : `${config.selectedCities.length} city selected — ready to continue!`}
                                </p>
                            )}
                            {step === 2 && (
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                    Set your travel dates and pace
                                </p>
                            )}
                            {step === 3 && (
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                    Choose your interests &amp; generate plan
                                </p>
                            )}
                        </div>

                        {/* Continue / Generate button */}
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all shrink-0 ${canProceed()
                                ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:scale-105"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
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
