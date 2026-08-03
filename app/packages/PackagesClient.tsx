"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, Users, Check, X, MapPin, ArrowRight, Tag } from "lucide-react";

function PackageModal({
    pkg,
    onClose,
}: {
    pkg: (typeof PACKAGES)[0];
    onClose: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative h-56">
                    <img
                        src={pkg.image}
                        alt={pkg.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-t-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-2xl" />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"
                    >
                        <X size={18} />
                    </button>
                    {pkg.badge && (
                        <div className="absolute top-4 left-4 bg-gold-gradient text-white text-xs font-bold px-3 py-1 rounded-full">
                            {pkg.badge}
                        </div>
                    )}
                    <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="font-playfair text-2xl font-bold">{pkg.name}</h2>
                        <div className="flex items-center gap-3 text-white/80 text-sm mt-1">
                            <span className="flex items-center gap-1">
                                <Clock size={12} />
                                {pkg.duration}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin size={12} />
                                {pkg.cities.join(", ")}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="text-3xl font-bold text-maroon-500">
                                ₹{pkg.price.toLocaleString()}
                            </div>
                            <div className="text-gray-400 text-sm">per person</div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star size={16} className="text-yellow-400 fill-yellow-400" />
                            <span className="font-bold">{pkg.rating}</span>
                            <span className="text-gray-400 text-sm">({pkg.reviews})</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <Check size={16} className="text-green-500" /> Included
                            </h4>
                            <ul className="space-y-2">
                                {pkg.inclusions.map((inc) => (
                                    <li
                                        key={inc}
                                        className="flex items-start gap-2 text-sm text-gray-600"
                                    >
                                        <Check
                                            size={12}
                                            className="text-green-500 mt-0.5 flex-shrink-0"
                                        />
                                        {inc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <X size={16} className="text-red-500" /> Excluded
                            </h4>
                            <ul className="space-y-2">
                                {pkg.exclusions.map((exc) => (
                                    <li
                                        key={exc}
                                        className="flex items-start gap-2 text-sm text-gray-600"
                                    >
                                        <X
                                            size={12}
                                            className="text-red-400 mt-0.5 flex-shrink-0"
                                        />
                                        {exc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {pkg.itinerary.length > 0 && (
                        <div className="mb-6">
                            <h4 className="font-bold text-gray-800 mb-4">Itinerary</h4>
                            <div className="space-y-3 max-h-48 overflow-y-auto">
                                {pkg.itinerary.map((day) => (
                                    <div key={day.day} className="flex gap-3">
                                        <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center text-gold-600 font-bold text-xs flex-shrink-0">
                                            {day.day}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800 text-sm">
                                                {day.title}
                                            </div>
                                            <div className="text-gray-500 text-xs">
                                                {day.description}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button className="flex-1 bg-gold-gradient text-white py-3 rounded-xl font-semibold hover:shadow-gold transition-all">
                            Book Now
                        </button>
                        <button className="px-6 border border-gray-200 rounded-xl text-gray-600 hover:border-gold-400 transition-all text-sm">
                            Enquire
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function PackagesPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedPkg, setSelectedPkg] = useState<
        (typeof PACKAGES)[0] | null
    >(null);

    const categories = [
        "All",
        "Heritage Tours",
        "Desert Safari Tours",
        "Honeymoon Packages",
        "Luxury Rajasthan Tours",
        "Family Tours",
        "Wildlife Tours",
    ];

    const filtered =
        activeCategory === "All"
            ? PACKAGES
            : PACKAGES.filter((p) => p.category === activeCategory);

    return (
        <>
            <section
                className="h-64 md:h-80 relative flex items-end justify-center pb-12 mt-16"
                style={{
                    backgroundImage:
                        "url(https://picsum.photos/seed/raj-1118/800/600",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4">
                        Travel <span className="text-gold-400">Packages</span>
                    </h1>
                    <p className="text-white/80 text-lg">
                        Handcrafted Rajasthan tours for every traveler
                    </p>
                </div>
            </section>

            <div className="bg-white shadow-sm py-4 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                    ? "bg-gold-gradient text-white shadow-gold"
                                    : "border border-gray-200 text-gray-600 hover:border-gold-400"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <section className="py-16 bg-palace-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((pkg, i) => (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-royal transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={pkg.image}
                                        alt={pkg.name}
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    {pkg.badge && (
                                        <div className="absolute top-3 left-3 bg-gold-gradient text-white text-xs font-bold px-3 py-1 rounded-full">
                                            {pkg.badge}
                                        </div>
                                    )}
                                    {pkg.discount > 0 && (
                                        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            -{pkg.discount}%
                                        </div>
                                    )}
                                    <div className="absolute bottom-3 left-3 text-white">
                                        <div className="flex items-center gap-1 text-white/80 text-xs mb-1">
                                            <Clock size={10} />
                                            {pkg.duration}
                                        </div>
                                        <div className="flex items-center gap-1 text-white/80 text-xs">
                                            <MapPin size={10} />
                                            {pkg.cities.slice(0, 2).join(", ")}
                                            {pkg.cities.length > 2 &&
                                                ` +${pkg.cities.length - 2}`}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="font-playfair font-bold text-lg text-gray-900 leading-tight">
                                            {pkg.name}
                                        </h3>
                                        <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                                            <Star
                                                size={14}
                                                className="text-yellow-400 fill-yellow-400"
                                            />
                                            <span className="font-bold text-sm">{pkg.rating}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {pkg.highlights.slice(0, 3).map((h) => (
                                            <span
                                                key={h}
                                                className="px-2 py-0.5 bg-gold-50 text-gold-700 text-xs rounded-full flex items-center gap-1"
                                            >
                                                <Tag size={8} />
                                                {h}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-4">
                                        <Users size={12} />
                                        <span>{pkg.groupSize}</span>
                                    </div>

                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <div className="text-2xl font-bold text-maroon-500">
                                                ₹{pkg.price.toLocaleString()}
                                            </div>
                                            {pkg.discount > 0 && (
                                                <div className="text-gray-400 text-sm line-through">
                                                    ₹{pkg.originalPrice.toLocaleString()}
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-gray-400 text-xs">per person</span>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSelectedPkg(pkg)}
                                            className="flex-1 border border-gold-400 text-gold-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gold-50 transition-all"
                                        >
                                            View Details
                                        </button>
                                        <button className="flex-1 bg-gold-gradient text-white py-2.5 rounded-xl text-sm font-semibold hover:shadow-gold transition-all flex items-center justify-center gap-1">
                                            Book Now
                                            <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedPkg && (
                    <PackageModal
                        pkg={selectedPkg}
                        onClose={() => setSelectedPkg(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}


const PACKAGES = [
    {
        id: 1,
        name: "Royal Rajasthan Heritage Tour",
        slug: "royal-heritage-tour",
        category: "Heritage Tours",
        duration: "10 Days / 9 Nights",
        cities: ["Jaipur", "Jodhpur", "Jaisalmer", "Udaipur"],
        price: 45000,
        originalPrice: 60000,
        discount: 25,
        groupSize: "2-15 People",
        image:
            "https://picsum.photos/seed/raj-1119/800/600",
        rating: 4.9,
        reviews: 342,
        inclusions: [
            "AC Hotel Accommodation",
            "Daily Breakfast",
            "All Transfers",
            "Expert Guide",
            "Monument Fees",
        ],
        exclusions: ["Flights", "Lunch & Dinner", "Personal Expenses"],
        highlights: [
            "Amber Fort",
            "Hawa Mahal",
            "Mehrangarh Fort",
            "Jaisalmer Fort",
            "City Palace",
            "Lake Pichola",
        ],
        itinerary: [
            {
                day: 1,
                title: "Arrive in Jaipur",
                description:
                    "Arrival at Jaipur airport, hotel check-in, evening at leisure.",
            },
            {
                day: 2,
                title: "Jaipur Sightseeing",
                description: "Visit Amber Fort, Hawa Mahal, City Palace, Jantar Mantar.",
            },
            {
                day: 3,
                title: "Jaipur to Jodhpur",
                description: "Drive to Jodhpur. Evening visit to Mehrangarh Fort.",
            },
            {
                day: 4,
                title: "Jodhpur Exploration",
                description: "Jaswant Thada, Umaid Bhawan Palace, Clock Tower Bazaar.",
            },
            {
                day: 5,
                title: "Jodhpur to Jaisalmer",
                description: "Drive to Jaisalmer, explore the Golden Fort.",
            },
            {
                day: 6,
                title: "Desert Safari",
                description: "Sam Sand Dunes camel safari, desert camping.",
            },
            {
                day: 7,
                title: "Jaisalmer to Udaipur",
                description: "Fly to Udaipur, check-in at lake-facing hotel.",
            },
            {
                day: 8,
                title: "Udaipur City Tour",
                description: "City Palace, Lake Pichola boat ride, Saheliyon Ki Bari.",
            },
            {
                day: 9,
                title: "Udaipur Leisure",
                description: "Sajjangarh Palace, local markets, farewell dinner.",
            },
            {
                day: 10,
                title: "Departure",
                description: "Transfer to airport. Tour ends.",
            },
        ],
        isFeatured: true,
        isPopular: true,
        badge: "Best Seller",
    },
    {
        id: 2,
        name: "Desert Safari Adventure",
        slug: "desert-safari-adventure",
        category: "Desert Safari Tours",
        duration: "5 Days / 4 Nights",
        cities: ["Jaisalmer", "Bikaner"],
        price: 22000,
        originalPrice: 28000,
        discount: 21,
        groupSize: "2-10 People",
        image:
            "https://picsum.photos/seed/raj-1120/800/600",
        rating: 4.8,
        reviews: 215,
        inclusions: [
            "Desert Camp Stay",
            "Camel Safari",
            "Jeep Safari",
            "All Meals",
            "Cultural Programs",
        ],
        exclusions: ["Flights", "Personal Expenses", "Travel Insurance"],
        highlights: [
            "Sam Dunes",
            "Camel Safari",
            "Desert Camping",
            "Folk Music",
            "Star Gazing",
        ],
        itinerary: [
            {
                day: 1,
                title: "Arrive in Jaisalmer",
                description: "Airport pickup, hotel check-in, fort exploration.",
            },
            {
                day: 2,
                title: "Jaisalmer City Tour",
                description: "Jaisalmer Fort, Patwon Ki Haveli, Gadisar Lake.",
            },
            {
                day: 3,
                title: "Desert Safari Day",
                description: "Sam Sand Dunes, camel safari, desert camp, cultural evening.",
            },
            {
                day: 4,
                title: "Bikaner Transfer",
                description: "Drive to Bikaner, Junagarh Fort, camel farm.",
            },
            {
                day: 5,
                title: "Departure",
                description: "Morning transfer to station/airport.",
            },
        ],
        isFeatured: true,
        isPopular: true,
        badge: "Adventure",
    },
    {
        id: 3,
        name: "Romantic Udaipur Honeymoon",
        slug: "udaipur-honeymoon",
        category: "Honeymoon Packages",
        duration: "5 Days / 4 Nights",
        cities: ["Udaipur"],
        price: 35000,
        originalPrice: 45000,
        discount: 22,
        groupSize: "2 People (Couples)",
        image:
            "https://picsum.photos/seed/raj-1121/800/600",
        rating: 4.9,
        reviews: 498,
        inclusions: [
            "Luxury Lake View Hotel",
            "Candlelight Dinners",
            "Boat Rides",
            "Spa Treatment",
            "Floral Decorations",
        ],
        exclusions: ["Flights", "Personal Shopping", "Extra Activities"],
        highlights: [
            "Lake Palace",
            "City Palace",
            "Boat Rides",
            "Spa",
            "Sunset Views",
        ],
        itinerary: [
            {
                day: 1,
                title: "Romantic Arrival",
                description: "Couple's welcome, lake view hotel, candlelight dinner.",
            },
            {
                day: 2,
                title: "City Palace & Lake Cruise",
                description: "City Palace, Lake Pichola boat ride, sunset cruise.",
            },
            {
                day: 3,
                title: "Spa & Leisure",
                description: "Couple's spa, Sajjangarh Palace, local market shopping.",
            },
            {
                day: 4,
                title: "Hidden Gems",
                description: "Ranakpur Temples, Kumbhalgarh Fort, farewell dinner.",
            },
            {
                day: 5,
                title: "Departure",
                description: "Breakfast, transfer to airport.",
            },
        ],
        isFeatured: true,
        isPopular: true,
        badge: "Honeymoon",
    },
    {
        id: 4,
        name: "Luxury Rajasthan Grand Tour",
        slug: "luxury-grand-tour",
        category: "Luxury Rajasthan Tours",
        duration: "14 Days / 13 Nights",
        cities: ["Jaipur", "Jodhpur", "Jaisalmer", "Udaipur", "Pushkar", "Bikaner"],
        price: 120000,
        originalPrice: 150000,
        discount: 20,
        groupSize: "2-8 People",
        image:
            "https://picsum.photos/seed/raj-1122/800/600",
        rating: 5.0,
        reviews: 89,
        inclusions: [
            "5-Star Palace Hotels",
            "Private Transfers",
            "All Meals",
            "Private Guide",
            "Helicopter Ride",
            "Elephant Experience",
        ],
        exclusions: ["International Flights", "Visa"],
        highlights: [
            "Palace Hotels",
            "Private Tours",
            "Helicopter Ride",
            "Exclusive Experiences",
        ],
        itinerary: [],
        isFeatured: true,
        isPopular: false,
        badge: "Luxury",
    },
    {
        id: 5,
        name: "Rajasthan Wildlife Safari",
        slug: "wildlife-safari",
        category: "Wildlife Tours",
        duration: "7 Days / 6 Nights",
        cities: ["Ranthambore", "Bharatpur", "Sariska"],
        price: 38000,
        originalPrice: 48000,
        discount: 21,
        groupSize: "2-12 People",
        image:
            "https://picsum.photos/seed/raj-1123/800/600",
        rating: 4.7,
        reviews: 156,
        inclusions: [
            "Wildlife Resort",
            "Safari Charges",
            "All Meals",
            "Naturalist Guide",
            "Park Fees",
        ],
        exclusions: ["Flights", "Tips", "Personal Expenses"],
        highlights: [
            "Tiger Safari",
            "Bird Watching",
            "Jeep Safari",
            "Nature Walks",
        ],
        itinerary: [],
        isFeatured: false,
        isPopular: true,
        badge: "Wildlife",
    },
    {
        id: 6,
        name: "Rajasthan Family Adventure",
        slug: "family-adventure",
        category: "Family Tours",
        duration: "8 Days / 7 Nights",
        cities: ["Jaipur", "Ranthambore", "Udaipur"],
        price: 32000,
        originalPrice: 42000,
        discount: 24,
        groupSize: "Family (4-6 People)",
        image:
            "https://picsum.photos/seed/raj-1124/800/600",
        rating: 4.8,
        reviews: 267,
        inclusions: [
            "Family Rooms",
            "Kids Activities",
            "All Transfers",
            "Daily Breakfast",
            "Entry Fees",
        ],
        exclusions: ["Flights", "Lunch & Dinner", "Camel Rides"],
        highlights: [
            "Elephant Experience",
            "Tiger Safari",
            "Fort Visits",
            "Cultural Shows",
        ],
        itinerary: [],
        isFeatured: false,
        isPopular: true,
        badge: "Family",
    },
];