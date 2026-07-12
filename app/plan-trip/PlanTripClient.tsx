// app/plan-trip/PlanTripClient.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
} from "lucide-react";
import { PLACES, CITIES } from "@/constants/data";
import type { Place } from "@/constants/data";

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

const CITY_IMAGES: Record<string, string> = {
    Jaipur:
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400",
    Jodhpur:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400",
    Udaipur:
        "https://images.unsplash.com/photo-1586183189334-f83f4929f5c7?w=400",
    Jaisalmer:
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=400",
    Pushkar:
        "https://images.unsplash.com/photo-1544015759-237f2a0a8176?w=400",
    "Mount Abu":
        "https://images.unsplash.com/photo-1622308644420-b20142dc993c?w=400",
    Bikaner:
        "https://images.unsplash.com/photo-1603262110263-76ea9498b85f?w=400",
    "Sawai Madhopur":
        "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=400",
};

const CITY_DESCRIPTIONS: Record<string, string> = {
    Jaipur: "The Pink City - Forts, Palaces & Markets",
    Jodhpur: "The Blue City - Mehrangarh & Blue Houses",
    Udaipur: "The Lake City - Romantic Palaces & Lakes",
    Jaisalmer: "The Golden City - Desert Forts & Sand Dunes",
    Pushkar: "The Sacred City - Holy Lake & Only Brahma Temple",
    "Mount Abu": "The Hill Station - Cool Climate & Jain Temples",
    Bikaner: "The Camel City - Junagarh Fort & Sweets",
    "Sawai Madhopur": "Tiger Land - Ranthambore National Park",
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

function generateItinerary(config: TripConfig): DayPlan[] {
    const { selectedCities, startDate, days, pace } = config;
    const itinerary: DayPlan[] = [];

    const relevantPlaces = PLACES.filter((p) =>
        selectedCities.includes(p.city)
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
        const cityPlaces = relevantPlaces.filter(
            (p) => p.city === city
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
        "🌐 Plan your trip: royalrajasthan.com/plan-trip",
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
  <h1>🏰 Royal Rajasthan Trip Itinerary</h1>
  <div class="sub">Cities: ${cities.join(", ")} &nbsp;|&nbsp; Generated: ${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</div>
  <div class="stats">
    <div class="stat"><strong>${itinerary.length}</strong>Days</div>
    <div class="stat"><strong>${cities.length}</strong>Cities</div>
    <div class="stat"><strong>${totalPlaces}</strong>Places</div>
  </div>
  ${dayRows}
  <div class="footer">
    Royal Rajasthan Tourism &nbsp;|&nbsp; royalrajasthan.com &nbsp;|&nbsp; +91 98765 43210
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
        "   🏰 ROYAL RAJASTHAN TRIP ITINERARY",
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
    lines.push("Royal Rajasthan Tourism");
    lines.push("🌐 royalrajasthan.com");
    lines.push("📞 +91 98765 43210");
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
export function PlanTripClient() {
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

    const availableCities = CITIES.filter((c) => c !== "All Cities");

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
                        "url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920)",
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
                            <div className="text-center mb-8">
                                <h2 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    Which cities do you want to visit?
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Select one or more cities ({config.selectedCities.length}{" "}
                                    selected)
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {availableCities.map((city) => {
                                    const isSelected = config.selectedCities.includes(city);
                                    const cityPlaces = PLACES.filter(
                                        (p) => p.city === city
                                    ).length;
                                    return (
                                        <motion.div
                                            key={city}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => toggleCity(city)}
                                            className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${isSelected
                                                    ? "ring-2 ring-yellow-500 shadow-lg"
                                                    : "ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-yellow-300"
                                                }`}
                                        >
                                            <div className="relative h-36">
                                                <img
                                                    src={CITY_IMAGES[city] || CITY_IMAGES.Jaipur}
                                                    alt={`${city} - Rajasthan`}
                                                    referrerPolicy="no-referrer"
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                                {isSelected && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="absolute top-3 right-3 w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center"
                                                    >
                                                        <Check size={16} className="text-white" />
                                                    </motion.div>
                                                )}
                                                <div className="absolute bottom-3 left-3 text-white">
                                                    <div className="font-bold text-lg">{city}</div>
                                                    <div className="text-white/70 text-xs">
                                                        {cityPlaces} places
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className={`p-3 text-xs transition-colors ${isSelected
                                                        ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                                                        : "bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400"
                                                    }`}
                                            >
                                                {CITY_DESCRIPTIONS[city] || "Explore this city"}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {config.selectedCities.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-4 flex items-center gap-3 flex-wrap"
                                >
                                    <span className="text-yellow-700 dark:text-yellow-400 font-medium text-sm">
                                        Selected:
                                    </span>
                                    {config.selectedCities.map((city) => (
                                        <span
                                            key={city}
                                            className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-800/30 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full text-sm"
                                        >
                                            <MapPin size={12} />
                                            {city}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleCity(city);
                                                }}
                                                className="ml-1 hover:text-red-500"
                                            >
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                </motion.div>
                            )}
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
                                            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                                                    {day.day}
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-bold text-gray-800 dark:text-white">
                                                        Day {day.day} — {day.city}
                                                    </div>
                                                    <div className="text-sm text-gray-400">
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
                                                                                    <img
                                                                                        src={
                                                                                            placeSlot.place.images[0]
                                                                                        }
                                                                                        alt={placeSlot.place.name}
                                                                                        referrerPolicy="no-referrer"
                                                                                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                                                                                        loading="lazy"
                                                                                    />
                                                                                    <div className="flex-1 min-w-0">
                                                                                        <div className="flex items-start justify-between gap-2">
                                                                                            <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-yellow-600 transition-colors text-sm md:text-base">
                                                                                                {placeSlot.place.name}
                                                                                            </h4>
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

                {/* Navigation Buttons */}
                {step < 4 && (
                    <div className="flex justify-between mt-10 max-w-2xl mx-auto">
                        <button
                            onClick={handleBack}
                            disabled={step === 1}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${step === 1
                                    ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                                    : "text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-yellow-400 hover:text-yellow-600"
                                }`}
                        >
                            <ArrowLeft size={18} />
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all ${canProceed()
                                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
                                    : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            {step === 3 ? (
                                <>
                                    Generate Itinerary
                                    <Check size={18} />
                                </>
                            ) : (
                                <>
                                    Continue
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}