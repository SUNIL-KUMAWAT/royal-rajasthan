"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle } from "lucide-react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        destination: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    const DESTINATIONS = [
        "Jaipur", "Udaipur", "Jodhpur", "Jaisalmer",
        "Pushkar", "All Rajasthan", "Custom Tour",
    ];

    return (
        <>
            <section
                className="h-64 md:h-80 relative flex items-end justify-center pb-12 mt-16"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1544015759-237f2a0a8176?w=1920)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4">
                        Contact <span className="text-gold-400">Us</span>
                    </h1>
                    <p className="text-white/80 text-lg">
                        Let us craft your perfect Rajasthan adventure
                    </p>
                </div>
            </section>

            <section className="py-20 bg-palace-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <span className="text-gold-500 text-sm font-semibold tracking-widest uppercase">
                                Get In Touch
                            </span>
                            <h2 className="font-playfair text-4xl font-bold text-gray-900 mt-3 mb-6">
                                We&apos;re Here to Help Plan Your Royal Journey
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed mb-8">
                                Our expert travel consultants are available to help you plan
                                the perfect Rajasthan experience.
                            </p>

                            <div className="space-y-5 mb-8">
                                {[
                                    {
                                        icon: Phone,
                                        title: "Call Us",
                                        info: "+91 98765 43210",
                                        sub: "Mon-Sat 9AM - 7PM IST",
                                    },
                                    {
                                        icon: Mail,
                                        title: "Email Us",
                                        info: "info@royalrajasthan.com",
                                        sub: "We reply within 2 hours",
                                    },
                                    {
                                        icon: MapPin,
                                        title: "Visit Us",
                                        info: "MI Road, Jaipur, Rajasthan",
                                        sub: "India 302001",
                                    },
                                    {
                                        icon: Clock,
                                        title: "Working Hours",
                                        info: "Mon-Sat: 9AM - 7PM",
                                        sub: "Sunday: 10AM - 5PM",
                                    },
                                ].map(({ icon: Icon, title, info, sub }) => (
                                    <div key={title} className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Icon size={20} className="text-gold-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-800">{title}</div>
                                            <div className="text-gray-600">{info}</div>
                                            <div className="text-gray-400 text-sm">{sub}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <a
                                href="https://wa.me/919876543210"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition-all hover:scale-105 shadow-lg"
                            >
                                <MessageCircle size={20} />
                                Chat on WhatsApp
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="bg-white rounded-3xl p-8 shadow-royal">
                                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6">
                                    Send Us a Message
                                </h3>

                                {submitted ? (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-center py-12"
                                    >
                                        <CheckCircle
                                            size={64}
                                            className="text-green-500 mx-auto mb-4"
                                        />
                                        <h4 className="text-2xl font-bold text-gray-800 mb-2">
                                            Message Sent!
                                        </h4>
                                        <p className="text-gray-500">
                                            Thank you! Our team will contact you within 2 hours.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={form.name}
                                                    onChange={(e) =>
                                                        setForm((p) => ({ ...p, name: e.target.value }))
                                                    }
                                                    placeholder="Your Name"
                                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-gold-400 outline-none transition-all text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                                    Phone Number *
                                                </label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={form.phone}
                                                    onChange={(e) =>
                                                        setForm((p) => ({ ...p, phone: e.target.value }))
                                                    }
                                                    placeholder="+91 XXXXX XXXXX"
                                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-gold-400 outline-none transition-all text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={form.email}
                                                onChange={(e) =>
                                                    setForm((p) => ({ ...p, email: e.target.value }))
                                                }
                                                placeholder="your@email.com"
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-gold-400 outline-none transition-all text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                                Destination Interest
                                            </label>
                                            <select
                                                value={form.destination}
                                                onChange={(e) =>
                                                    setForm((p) => ({
                                                        ...p,
                                                        destination: e.target.value,
                                                    }))
                                                }
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-gold-400 outline-none transition-all text-sm bg-white"
                                            >
                                                <option value="">Select a destination</option>
                                                {DESTINATIONS.map((d) => (
                                                    <option key={d} value={d}>
                                                        {d}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                                Message *
                                            </label>
                                            <textarea
                                                required
                                                rows={5}
                                                value={form.message}
                                                onChange={(e) =>
                                                    setForm((p) => ({ ...p, message: e.target.value }))
                                                }
                                                placeholder="Tell us about your travel plans..."
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-gold-400 outline-none transition-all resize-none text-sm"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-gold-gradient text-white py-4 rounded-xl font-semibold text-lg hover:shadow-gold-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                                        >
                                            <Send size={20} />
                                            Send Message
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}