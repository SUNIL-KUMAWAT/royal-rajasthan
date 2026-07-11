// app/places/page.tsx
import type { Metadata } from "next";
import { PlacesClient } from "./PlacesClient";

export const metadata: Metadata = {
    title: "Famous Places to Visit in Rajasthan - Complete Guide",
    description:
        "Explore 12+ famous tourist places in Rajasthan with complete details - timing, ticket prices, history, best time to visit & Google Maps location.",
    keywords: [
        "places to visit in Rajasthan",
        "Rajasthan tourist places",
        "famous places in Rajasthan",
        "Rajasthan tourism",
        "forts in Rajasthan",
        "palaces in Rajasthan",
        "lakes in Rajasthan",
        "Rajasthan travel guide 2024",
    ],
    openGraph: {
        title: "Famous Places to Visit in Rajasthan",
        description:
            "Complete guide to 12+ famous tourist places in Rajasthan with timing, tickets & maps.",
        images: [
            {
                url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200",
                width: 1200,
                height: 630,
                alt: "Famous Places in Rajasthan",
            },
        ],
    },
};

export default function PlacesPage() {
    return <PlacesClient />;
}
// "use client";
// import { useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import {
//     Search,
//     Star,
//     MapPin,
//     Clock,
//     ArrowRight,
//     Heart,
//     Ticket,
//     Calendar,
//     Filter,
//     X,
//     ChevronDown,
// } from "lucide-react";
// import { PLACES, CATEGORIES, CITIES } from "@/constants/data";
// // Add at top of places/page.tsx
// import type { Metadata } from "next";

// const metadata: Metadata = {
//     title: "Famous Places to Visit in Rajasthan - Complete Guide",
//     description:
//         "Explore 12+ famous tourist places in Rajasthan with complete details - timing, ticket prices, history, best time to visit & Google Maps location. Forts, Palaces, Lakes, Temples & Desert.",
//     keywords: [
//         "places to visit in Rajasthan",
//         "Rajasthan tourist places",
//         "famous places in Rajasthan",
//         "Rajasthan tourism",
//         "forts in Rajasthan",
//         "palaces in Rajasthan",
//         "lakes in Rajasthan",
//         "Rajasthan travel guide 2024",
//     ],
//     openGraph: {
//         title: "Famous Places to Visit in Rajasthan",
//         description:
//             "Complete guide to 12+ famous tourist places in Rajasthan with timing, tickets & maps.",
//         images: [
//             "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200",
//         ],
//     },
// };

// export default function PlacesPage() {
//     const [search, setSearch] = useState("");
//     const [category, setCategory] = useState("All");
//     const [city, setCity] = useState("All Cities");
//     const [sortBy, setSortBy] = useState("featured");
//     const [entryType, setEntryType] = useState("All");
//     const [favorites, setFavorites] = useState<number[]>([]);
//     const [showFilters, setShowFilters] = useState(false);

//     const filtered = useMemo(() => {
//         return PLACES.filter((p) => {
//             const matchSearch =
//                 p.name.toLowerCase().includes(search.toLowerCase()) ||
//                 p.city.toLowerCase().includes(search.toLowerCase()) ||
//                 p.category.toLowerCase().includes(search.toLowerCase()) ||
//                 p.description.toLowerCase().includes(search.toLowerCase()) ||
//                 p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
//             const matchCategory = category === "All" || p.category === category;
//             const matchCity = city === "All Cities" || p.city === city;
//             const matchEntry =
//                 entryType === "All" ||
//                 (entryType === "Free" && p.ticket.isFree) ||
//                 (entryType === "Paid" && !p.ticket.isFree);
//             return matchSearch && matchCategory && matchCity && matchEntry;
//         }).sort((a, b) => {
//             if (sortBy === "rating") return b.rating - a.rating;
//             if (sortBy === "name-az") return a.name.localeCompare(b.name);
//             if (sortBy === "name-za") return b.name.localeCompare(a.name);
//             if (sortBy === "price-low")
//                 return a.ticket.indian - b.ticket.indian;
//             if (sortBy === "price-high")
//                 return b.ticket.indian - a.ticket.indian;
//             if (sortBy === "reviews") return b.reviews - a.reviews;
//             return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
//         });
//     }, [search, category, city, sortBy, entryType]);

//     const clearFilters = () => {
//         setSearch("");
//         setCategory("All");
//         setCity("All Cities");
//         setSortBy("featured");
//         setEntryType("All");
//     };

//     const activeFilterCount = [
//         category !== "All",
//         city !== "All Cities",
//         entryType !== "All",
//         search !== "",
//     ].filter(Boolean).length;

//     return (
//         <>
//             {/* Hero */}
//             <section
//                 className="h-72 md:h-96 relative flex items-end justify-center pb-12 mt-16"
//                 style={{
//                     backgroundImage:
//                         "url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920)",
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                 }}
//             >
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
//                 <div className="relative z-10 text-center px-4 w-full max-w-2xl mx-auto">
//                     <motion.h1
//                         initial={{ opacity: 0, y: 30 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4"
//                     >
//                         Explore <span className="text-yellow-400">Places</span>
//                     </motion.h1>
//                     <p className="text-white/80 text-lg mb-6">
//                         Discover {PLACES.length} famous places across Rajasthan
//                     </p>

//                     {/* Search Bar on Hero */}
//                     <div className="relative">
//                         <Search
//                             size={20}
//                             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                         />
//                         <input
//                             type="text"
//                             placeholder="Search places, cities, categories..."
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/95 backdrop-blur-sm text-gray-800 outline-none focus:ring-2 focus:ring-yellow-400 shadow-xl text-base"
//                         />
//                         {search && (
//                             <button
//                                 onClick={() => setSearch("")}
//                                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                             >
//                                 <X size={18} />
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </section>

//             {/* Filters */}
//             <section className="sticky top-16 md:top-20 z-40 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-900/50 py-4">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     {/* Desktop Filters */}
//                     <div className="hidden md:flex flex-wrap gap-3 items-center">
//                         {/* Category */}
//                         <div className="flex flex-wrap gap-2">
//                             {CATEGORIES.map((cat) => (
//                                 <button
//                                     key={cat}
//                                     onClick={() => setCategory(cat)}
//                                     className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${category === cat
//                                         ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
//                                         : "border border-gray-200 text-gray-500 hover:border-yellow-400"
//                                         }`}
//                                 >
//                                     {cat}
//                                 </button>
//                             ))}
//                         </div>

//                         <div className="w-px h-8 bg-gray-200" />

//                         {/* City */}
//                         <select
//                             value={city}
//                             onChange={(e) => setCity(e.target.value)}
//                             className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-yellow-400 bg-white"
//                         >
//                             {CITIES.map((c) => (
//                                 <option key={c} value={c}>
//                                     {c}
//                                 </option>
//                             ))}
//                         </select>

//                         {/* Entry Type */}
//                         <select
//                             value={entryType}
//                             onChange={(e) => setEntryType(e.target.value)}
//                             className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-yellow-400 bg-white"
//                         >
//                             <option value="All">All Entry Types</option>
//                             <option value="Free">Free Entry</option>
//                             <option value="Paid">Paid Entry</option>
//                         </select>

//                         {/* Sort */}
//                         <select
//                             value={sortBy}
//                             onChange={(e) => setSortBy(e.target.value)}
//                             className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-yellow-400 bg-white"
//                         >
//                             <option value="featured">Featured First</option>
//                             <option value="rating">Highest Rated</option>
//                             <option value="reviews">Most Reviewed</option>
//                             <option value="name-az">Name A-Z</option>
//                             <option value="name-za">Name Z-A</option>
//                             <option value="price-low">Price: Low to High</option>
//                             <option value="price-high">Price: High to Low</option>
//                         </select>

//                         {/* Clear Filters */}
//                         {activeFilterCount > 0 && (
//                             <button
//                                 onClick={clearFilters}
//                                 className="text-red-500 text-sm flex items-center gap-1 hover:text-red-700"
//                             >
//                                 <X size={14} />
//                                 Clear ({activeFilterCount})
//                             </button>
//                         )}
//                     </div>

//                     {/* Mobile Filter Toggle */}
//                     <div className="md:hidden">
//                         <button
//                             onClick={() => setShowFilters(!showFilters)}
//                             className="flex items-center gap-2 text-gray-700 font-medium"
//                         >
//                             <Filter size={18} />
//                             Filters
//                             {activeFilterCount > 0 && (
//                                 <span className="bg-yellow-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                                     {activeFilterCount}
//                                 </span>
//                             )}
//                             <ChevronDown
//                                 size={16}
//                                 className={`transition-transform ${showFilters ? "rotate-180" : ""
//                                     }`}
//                             />
//                         </button>

//                         <AnimatePresence>
//                             {showFilters && (
//                                 <motion.div
//                                     initial={{ height: 0, opacity: 0 }}
//                                     animate={{ height: "auto", opacity: 1 }}
//                                     exit={{ height: 0, opacity: 0 }}
//                                     className="mt-4 space-y-3 overflow-hidden"
//                                 >
//                                     <div className="flex flex-wrap gap-2">
//                                         {CATEGORIES.map((cat) => (
//                                             <button
//                                                 key={cat}
//                                                 onClick={() => setCategory(cat)}
//                                                 className={`px-3 py-1.5 rounded-full text-xs font-medium ${category === cat
//                                                     ? "bg-yellow-500 text-white"
//                                                     : "border border-gray-200 text-gray-500"
//                                                     }`}
//                                             >
//                                                 {cat}
//                                             </button>
//                                         ))}
//                                     </div>
//                                     <div className="grid grid-cols-2 gap-2">
//                                         <select
//                                             value={city}
//                                             onChange={(e) => setCity(e.target.value)}
//                                             className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white"
//                                         >
//                                             {CITIES.map((c) => (
//                                                 <option key={c}>{c}</option>
//                                             ))}
//                                         </select>
//                                         <select
//                                             value={entryType}
//                                             onChange={(e) => setEntryType(e.target.value)}
//                                             className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white"
//                                         >
//                                             <option value="All">All Entry</option>
//                                             <option value="Free">Free</option>
//                                             <option value="Paid">Paid</option>
//                                         </select>
//                                     </div>
//                                     <select
//                                         value={sortBy}
//                                         onChange={(e) => setSortBy(e.target.value)}
//                                         className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white"
//                                     >
//                                         <option value="featured">Featured</option>
//                                         <option value="rating">Rating</option>
//                                         <option value="reviews">Reviews</option>
//                                         <option value="name-az">Name A-Z</option>
//                                         <option value="price-low">Price: Low to High</option>
//                                     </select>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>
//                     </div>
//                 </div>
//             </section>

//             {/* Results */}
//             <section className="py-8 bg-palace-white dark:bg-gray-950 min-h-[60vh]">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
//                         Showing <strong>{filtered.length}</strong> of {PLACES.length} places
//                         {search && (
//                             <span>
//                                 {" "}
//                                 for &quot;<strong>{search}</strong>&quot;
//                             </span>
//                         )}
//                     </p>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                         {filtered.map((place, i) => (
//                             <motion.div
//                                 key={place.id}
//                                 initial={{ opacity: 0, y: 30 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: i * 0.04 }}
//                                 className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
//                             >
//                                 <div className="relative h-52 overflow-hidden">
//                                     <img
//                                         src={place.images[0]}
//                                         alt={place.name}
//                                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                                     />
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

//                                     <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
//                                         {place.isUNESCO && (
//                                             <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
//                                                 UNESCO
//                                             </span>
//                                         )}
//                                         <span
//                                             className={`text-white text-xs font-bold px-2 py-0.5 rounded-full ${place.ticket.isFree ? "bg-green-500" : "bg-yellow-500"
//                                                 }`}
//                                         >
//                                             {place.ticket.isFree
//                                                 ? "Free"
//                                                 : `₹${place.ticket.indian}`}
//                                         </span>
//                                         <span className="bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
//                                             {place.category}
//                                         </span>
//                                     </div>

//                                     <button
//                                         onClick={() =>
//                                             setFavorites((p) =>
//                                                 p.includes(place.id)
//                                                     ? p.filter((f) => f !== place.id)
//                                                     : [...p, place.id]
//                                             )
//                                         }
//                                         className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
//                                     >
//                                         <Heart
//                                             size={14}
//                                             className={
//                                                 favorites.includes(place.id)
//                                                     ? "text-red-500 fill-red-500"
//                                                     : "text-white"
//                                             }
//                                         />
//                                     </button>

//                                     <div className="absolute bottom-3 left-3 text-white">
//                                         <div className="font-playfair font-bold text-lg leading-tight">
//                                             {place.name}
//                                         </div>
//                                         <div className="flex items-center gap-1 text-white/80 text-xs mt-0.5">
//                                             <MapPin size={10} />
//                                             {place.city}
//                                         </div>
//                                     </div>

//                                     <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5">
//                                         <Star
//                                             size={10}
//                                             className="text-yellow-400 fill-yellow-400"
//                                         />
//                                         <span className="text-white text-xs font-bold">
//                                             {place.rating}
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <div className="p-4">
//                                     <p className="text-gray-500 text-xs line-clamp-2 mb-3">
//                                         {place.description}
//                                     </p>

//                                     <div className="grid grid-cols-2 gap-1.5 mb-3 text-xs text-gray-400">
//                                         <div className="flex items-center gap-1">
//                                             <Clock size={10} className="flex-shrink-0" />
//                                             <span className="truncate">
//                                                 {place.timing.open}-{place.timing.close}
//                                             </span>
//                                         </div>
//                                         <div className="flex items-center gap-1">
//                                             <Calendar size={10} className="flex-shrink-0" />
//                                             <span className="truncate">
//                                                 {place.bestTimeToVisit.months}
//                                             </span>
//                                         </div>
//                                         <div className="flex items-center gap-1">
//                                             <Ticket size={10} className="flex-shrink-0" />
//                                             <span>
//                                                 {place.ticket.isFree
//                                                     ? "Free"
//                                                     : `₹${place.ticket.indian}/₹${place.ticket.foreigner}`}
//                                             </span>
//                                         </div>
//                                         <div className="flex items-center gap-1">
//                                             <Clock size={10} className="flex-shrink-0" />
//                                             <span>{place.visitDuration.recommended}</span>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-center gap-2 mb-3">
//                                         <div
//                                             className={`w-1.5 h-1.5 rounded-full ${place.isOpen ? "bg-green-500" : "bg-red-500"
//                                                 }`}
//                                         />
//                                         <span className="text-xs text-gray-400">
//                                             {place.isOpen ? "Open" : "Closed"}
//                                         </span>
//                                         <span className="text-xs text-gray-300">•</span>
//                                         <span className="text-xs text-gray-400">
//                                             {place.yearBuilt}
//                                         </span>
//                                     </div>

//                                     <Link
//                                         href={`/places/${place.slug}`}
//                                         className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-500 to-maroon-600 text-white py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
//                                     >
//                                         View Details
//                                         <ArrowRight size={14} />
//                                     </Link>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>

//                     {filtered.length === 0 && (
//                         <div className="text-center py-20">
//                             <div className="text-6xl mb-4">🔍</div>
//                             <h3 className="text-2xl font-bold text-gray-700 mb-2">
//                                 No places found
//                             </h3>
//                             <p className="text-gray-400 mb-4">
//                                 Try adjusting your search or filters
//                             </p>
//                             <button
//                                 onClick={clearFilters}
//                                 className="px-6 py-2 bg-yellow-500 text-white rounded-full text-sm font-medium hover:bg-yellow-600"
//                             >
//                                 Clear All Filters
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </section>
//         </>
//     );
// }