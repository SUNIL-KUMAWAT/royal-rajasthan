"use client";
import { motion } from "framer-motion";

export default function AboutClient() {
    const stats = [
        { value: "342,239 km²", label: "Total Area" },
        { value: "80 Million+", label: "Population" },
        { value: "33 Districts", label: "Administrative Districts" },
        { value: "6000+ Years", label: "Rich History" },
    ];

    const sections = [
        {
            icon: "🏛",
            title: "Rich Culture",
            content:
                "Rajasthan is renowned for its vibrant folk music, traditional dance forms like Ghoomar and Kalbelia, colorful festivals, and exquisite handicrafts including block printing, blue pottery, and leather goods.",
        },
        {
            icon: "🗺",
            title: "Geography",
            content:
                "Rajasthan shares borders with Pakistan to the west. The Thar Desert covers most of the western part, while the Aravalli Range runs diagonally across the state.",
        },
        {
            icon: "✈️",
            title: "Tourism Importance",
            content:
                "Rajasthan is India's most visited state by foreign tourists, attracting millions annually. Its UNESCO Heritage Sites, hill forts, and step-wells draw visitors from across the globe.",
        },
    ];

    return (
        <>
            <section
                className="h-96 relative flex items-end justify-center pb-16 mt-16"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-4">
                        About <span className="text-gold-400">Rajasthan</span>
                    </h1>
                    <p className="text-white/80 text-xl max-w-2xl mx-auto">
                        The Land of Kings — A story written in sand, stone, and splendour
                    </p>
                </div>
            </section>

            <section className="py-20 bg-palace-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-gold-500 text-sm font-semibold tracking-widest uppercase">
                                Our Heritage
                            </span>
                            <h2 className="font-playfair text-4xl font-bold text-gray-900 mt-3 mb-6">
                                The Royal History of Rajasthan
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Rajasthan, India&apos;s largest state by area, is a land of
                                    magnificent palaces, imposing forts, vast deserts, and rich
                                    cultural traditions. The name &apos;Rajasthan&apos; literally means
                                    &apos;Land of Kings&apos;.
                                </p>
                                <p>
                                    The state was formed on March 30, 1949, when various princely
                                    states of the region were merged into the Indian Union. Jaipur,
                                    the &apos;Pink City&apos;, serves as the state capital.
                                </p>
                                <p>
                                    Rajasthan&apos;s history is a tapestry of valor, chivalry, and
                                    romance. The region was ruled by various Rajput clans who built
                                    magnificent forts and palaces that stand as testaments to their
                                    grandeur.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400"
                                alt="Amber Fort"
                                className="rounded-2xl w-full h-48 object-cover"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400"
                                alt="Mehrangarh"
                                className="rounded-2xl w-full h-48 object-cover mt-8"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1548013146-72479768bada?w=400"
                                alt="Desert"
                                className="rounded-2xl w-full h-48 object-cover -mt-4"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1586183189334-f83f4929f5c7?w=400"
                                alt="Udaipur"
                                className="rounded-2xl w-full h-48 object-cover mt-4"
                            />
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center bg-white rounded-2xl p-6 shadow-md hover:shadow-royal transition-all"
                            >
                                <div className="font-playfair text-2xl font-bold text-gold-500 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-500 text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {sections.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-royal transition-all"
                            >
                                <div className="text-5xl mb-4">{item.icon}</div>
                                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed text-sm">
                                    {item.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
