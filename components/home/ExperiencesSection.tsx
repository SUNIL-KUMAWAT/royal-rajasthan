"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const EXPERIENCES = [
    {
        id: 1,
        title: "Majestic Forts",
        icon: "🏰",
        description: "Explore magnificent Rajput forts across Rajasthan",
        color: "from-amber-500 to-yellow-600",
        href: "/places?category=Fort",
        count: "5 Forts",
    },
    {
        id: 2,
        title: "Royal Palaces",
        icon: "👑",
        description: "Visit stunning palaces of Rajput royals",
        color: "from-orange-500 to-amber-600",
        href: "/places?category=Palace",
        count: "2 Palaces",
    },
    {
        id: 3,
        title: "Sacred Temples",
        icon: "🛕",
        description: "Discover ancient temples and holy shrines",
        color: "from-red-500 to-rose-600",
        href: "/places?category=Temple",
        count: "2 Temples",
    },
    {
        id: 4,
        title: "Desert Safari",
        icon: "🐫",
        description: "Experience golden dunes and camel adventures",
        color: "from-yellow-500 to-orange-500",
        href: "/places?category=Desert",
        count: "1 Desert",
    },
    {
        id: 5,
        title: "Serene Lakes",
        icon: "🌊",
        description: "Romantic boat rides at breathtaking lakes",
        color: "from-blue-500 to-cyan-600",
        href: "/places?category=Lake",
        count: "1 Lake",
    },
    {
        id: 6,
        title: "Wildlife Safari",
        icon: "🐅",
        description: "Tiger safaris and nature trails in reserves",
        color: "from-green-600 to-emerald-700",
        href: "/places?category=Wildlife",
        count: "1 Park",
    },
    {
        id: 7,
        title: "Photography Tours",
        icon: "📸",
        description: "Capture timeless moments at iconic spots",
        color: "from-purple-600 to-pink-600",
        href: "/places",
        count: "12 Spots",
    },
    {
        id: 8,
        title: "Heritage Walks",
        icon: "🚶",
        description: "Walk through centuries of royal Rajasthani history",
        color: "from-teal-500 to-green-600",
        href: "/places",
        count: "All Places",
    },
];

export function ExperiencesSection() {
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
                        Explore By Category
                    </span>
                    <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mt-3 mb-6">
                        What Do You Want to{" "}
                        <span className="text-yellow-400">Explore?</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Choose a category and discover the most iconic places across
                        Rajasthan
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {EXPERIENCES.map((exp, i) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="group relative overflow-hidden rounded-2xl cursor-pointer"
                        >
                            <Link href={exp.href}>
                                <div
                                    className={`bg-gradient-to-br ${exp.color} p-6 md:p-8 h-full min-h-[180px] flex flex-col justify-between relative overflow-hidden`}
                                >
                                    {/* Icon */}
                                    <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {exp.icon}
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">
                                            {exp.title}
                                        </h3>
                                        <p className="text-white/70 text-sm mb-2">
                                            {exp.description}
                                        </p>
                                        <span className="text-white/60 text-xs font-medium">
                                            {exp.count}
                                        </span>
                                    </div>

                                    {/* Arrow */}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm">→</span>
                                        </div>
                                    </div>

                                    {/* Shine */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

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
                        View All Places →
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}


export const EXPERIENCES_OLD = [
    {
        id: 1,
        title: "Heritage Tours",
        icon: "🏰",
        description: "Explore magnificent forts and palaces",
        color: "from-amber-500 to-yellow-600",
    },
    {
        id: 2,
        title: "Desert Safari",
        icon: "🐫",
        description: "Golden dunes and camel adventures",
        color: "from-orange-500 to-amber-600",
    },
    {
        id: 3,
        title: "Wildlife Adventures",
        icon: "🐅",
        description: "Tiger safaris and nature trails",
        color: "from-green-600 to-emerald-700",
    },
    {
        id: 4,
        title: "Cultural Festivals",
        icon: "🎭",
        description: "Vibrant celebrations and traditions",
        color: "from-purple-600 to-pink-600",
    },
    {
        id: 5,
        title: "Lake Experiences",
        icon: "🚤",
        description: "Romantic boat rides at sunset",
        color: "from-blue-500 to-cyan-600",
    },
    {
        id: 6,
        title: "Food & Culinary",
        icon: "🍛",
        description: "Royal Rajasthani cuisine journey",
        color: "from-red-500 to-rose-600",
    },
    {
        id: 7,
        title: "Luxury Camping",
        icon: "🏕",
        description: "Stars above, sands below",
        color: "from-indigo-500 to-purple-600",
    },
    {
        id: 8,
        title: "Photography Tours",
        icon: "📸",
        description: "Capture timeless royal moments",
        color: "from-teal-500 to-green-600",
    },
];