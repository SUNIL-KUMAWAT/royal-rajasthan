"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Users, Star, Check, ArrowRight } from "lucide-react";

const STEPS = [
    { id: 1, title: "Destination", icon: MapPin },
    { id: 2, title: "Budget", icon: Star },
    { id: 3, title: "Dates", icon: Calendar },
    { id: 4, title: "Interests", icon: Users },
    { id: 5, title: "Your Plan", icon: Check },
];

const INTERESTS = [
    "Heritage Forts",
    "Desert Safari",
    "Wildlife",
    "Cultural Festivals",
    "Romantic Getaway",
    "Photography",
    "Local Cuisine",
    "Adventure Sports",
    "Spiritual Journey",
    "Luxury Stay",
    "Shopping",
    "Family Fun",
];

const DESTINATION_OPTIONS = [
    "Jaipur",
    "Udaipur",
    "Jodhpur",
    "Jaisalmer",
    "Pushkar",
    "All Rajasthan",
];

const BUDGET_OPTIONS = [
    "Budget (₹10k-20k)",
    "Mid-Range (₹20k-50k)",
    "Luxury (₹50k-1L)",
    "Ultra Luxury (₹1L+)",
];

export function TravelPlanner() {
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({
        destination: "",
        budget: "",
        startDate: "",
        endDate: "",
        interests: [] as string[],
    });

    const toggleInterest = (interest: string) => {
        setSelections((p) => ({
            ...p,
            interests: p.interests.includes(interest)
                ? p.interests.filter((i) => i !== interest)
                : [...p.interests, interest],
        }));
    };

    const canProceed = () => {
        if (step === 1) return !!selections.destination;
        if (step === 2) return !!selections.budget;
        if (step === 3) return !!selections.startDate && !!selections.endDate;
        if (step === 4) return selections.interests.length > 0;
        return true;
    };

    return (
        <section className="py-24 bg-gradient-to-br from-maroon-900 to-indigo-900 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-gold-500 blur-3xl" />
                <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-purple-500 blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">
                        AI Travel Planner
                    </span>
                    <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mt-3">
                        Plan Your Perfect{" "}
                        <span className="text-gold-400">Rajasthan Trip</span>
                    </h2>
                    <p className="text-gray-400 mt-4">
                        Answer a few questions and get a personalized Rajasthan itinerary
                    </p>
                </motion.div>

                <div className="flex justify-center mb-10">
                    {STEPS.map((s, i) => (
                        <div key={s.id} className="flex items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step > s.id
                                        ? "bg-gold-500 text-white"
                                        : step === s.id
                                            ? "bg-white text-maroon-600 shadow-gold ring-2 ring-gold-400"
                                            : "bg-white/10 text-white/40"
                                    }`}
                            >
                                {step > s.id ? <Check size={16} /> : s.id}
                            </div>
                            {i < STEPS.length - 1 && (
                                <div
                                    className={`w-12 h-0.5 mx-1 transition-all duration-500 ${step > s.id ? "bg-gold-500" : "bg-white/20"
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                            >
                                <h3 className="text-white font-playfair text-2xl font-bold mb-2">
                                    Where do you want to go?
                                </h3>
                                <p className="text-gray-400 mb-6">
                                    Select your dream destination in Rajasthan
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {DESTINATION_OPTIONS.map((dest) => (
                                        <button
                                            key={dest}
                                            onClick={() =>
                                                setSelections((p) => ({ ...p, destination: dest }))
                                            }
                                            className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${selections.destination === dest
                                                    ? "border-gold-400 bg-gold-400/20 text-gold-300"
                                                    : "border-white/20 text-white/70 hover:border-white/40"
                                                }`}
                                        >
                                            {dest}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                            >
                                <h3 className="text-white font-playfair text-2xl font-bold mb-2">
                                    What&apos;s your budget?
                                </h3>
                                <p className="text-gray-400 mb-6">
                                    Per person for the entire trip
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {BUDGET_OPTIONS.map((budget) => (
                                        <button
                                            key={budget}
                                            onClick={() =>
                                                setSelections((p) => ({ ...p, budget }))
                                            }
                                            className={`p-4 rounded-xl border-2 text-sm font-medium transition-all text-left ${selections.budget === budget
                                                    ? "border-gold-400 bg-gold-400/20 text-gold-300"
                                                    : "border-white/20 text-white/70 hover:border-white/40"
                                                }`}
                                        >
                                            {budget}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                            >
                                <h3 className="text-white font-playfair text-2xl font-bold mb-2">
                                    When do you want to travel?
                                </h3>
                                <p className="text-gray-400 mb-6">
                                    Select your travel dates
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-white/70 text-sm mb-2 block">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            value={selections.startDate}
                                            onChange={(e) =>
                                                setSelections((p) => ({
                                                    ...p,
                                                    startDate: e.target.value,
                                                }))
                                            }
                                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-400 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-white/70 text-sm mb-2 block">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            value={selections.endDate}
                                            onChange={(e) =>
                                                setSelections((p) => ({
                                                    ...p,
                                                    endDate: e.target.value,
                                                }))
                                            }
                                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-400 transition-all"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                            >
                                <h3 className="text-white font-playfair text-2xl font-bold mb-2">
                                    What interests you?
                                </h3>
                                <p className="text-gray-400 mb-6">Select all that apply</p>
                                <div className="flex flex-wrap gap-3">
                                    {INTERESTS.map((interest) => (
                                        <button
                                            key={interest}
                                            onClick={() => toggleInterest(interest)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${selections.interests.includes(interest)
                                                    ? "border-gold-400 bg-gold-400/20 text-gold-300"
                                                    : "border-white/20 text-white/70 hover:border-white/40"
                                                }`}
                                        >
                                            {selections.interests.includes(interest) ? "✓ " : ""}
                                            {interest}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 5 && (
                            <motion.div
                                key="step5"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center"
                            >
                                <div className="text-6xl mb-4">🎉</div>
                                <h3 className="text-white font-playfair text-2xl font-bold mb-4">
                                    Your Royal Rajasthan Plan is Ready!
                                </h3>
                                <div className="bg-white/10 rounded-2xl p-6 text-left mb-6 space-y-3">
                                    <div className="flex items-center gap-3 text-white">
                                        <MapPin size={16} className="text-gold-400" />
                                        <span>
                                            Destination:{" "}
                                            <strong>{selections.destination}</strong>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white">
                                        <Star size={16} className="text-gold-400" />
                                        <span>
                                            Budget: <strong>{selections.budget}</strong>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white">
                                        <Calendar size={16} className="text-gold-400" />
                                        <span>
                                            Dates:{" "}
                                            <strong>
                                                {selections.startDate} to {selections.endDate}
                                            </strong>
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3 text-white">
                                        <Users size={16} className="text-gold-400 mt-0.5" />
                                        <span>
                                            Interests:{" "}
                                            <strong>{selections.interests.join(", ")}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <button className="bg-gold-gradient text-white px-6 py-3 rounded-full font-semibold hover:shadow-gold-lg transition-all">
                                        Get Full Itinerary
                                    </button>
                                    <button
                                        onClick={() => {
                                            setStep(1);
                                            setSelections({
                                                destination: "",
                                                budget: "",
                                                startDate: "",
                                                endDate: "",
                                                interests: [],
                                            });
                                        }}
                                        className="border border-white/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-all"
                                    >
                                        Start Over
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {step < 5 && (
                        <div className="flex justify-between mt-8">
                            <button
                                onClick={() => setStep((p) => Math.max(p - 1, 1))}
                                disabled={step === 1}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${step === 1
                                        ? "text-white/30 cursor-not-allowed"
                                        : "text-white border border-white/30 hover:bg-white/10"
                                    }`}
                            >
                                Back
                            </button>
                            <button
                                onClick={() => setStep((p) => Math.min(p + 1, 5))}
                                disabled={!canProceed()}
                                className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all ${canProceed()
                                        ? "bg-gold-gradient text-white hover:shadow-gold"
                                        : "bg-white/10 text-white/30 cursor-not-allowed"
                                    }`}
                            >
                                {step === 4 ? "Generate Plan" : "Continue"}
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}