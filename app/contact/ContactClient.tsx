"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle, ChevronDown } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const LABEL = "mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ivory-200/60";

export default function ContactClient() {
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
            <PageHero
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/1280px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg"
                imageAlt="Hawa Mahal, Jaipur"
                eyebrow="Get In Touch"
                title={
                    <>
                        Contact <em>Us</em>
                    </>
                }
                subtitle="Let us craft your perfect Rajasthan adventure"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
            />

            <section className="relative isolate py-20 md:py-28">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-gold-500/15 blur-[140px] dark:bg-gold-500/10" />
                    <div className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-maroon-500/10 blur-[140px] dark:bg-maroon-500/20" />
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: EASE }}
                            className="lg:col-span-5"
                        >
                            <span className="eyebrow">Get In Touch</span>
                            <h2 className="display-title mt-5 text-4xl sm:text-5xl md:text-6xl [&_em]:font-normal [&_em]:italic [&_em]:text-gold-sheen">
                                We&apos;re Here to Help Plan Your <em>Royal Journey</em>
                            </h2>
                            <p className="mt-6 text-lg leading-relaxed text-ink-500 dark:text-ivory-200/70">
                                Our expert travel consultants are available to help you plan
                                the perfect Rajasthan experience.
                            </p>

                            <RevealGroup className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                {[
                                    {
                                        icon: Phone,
                                        title: "Call Us",
                                        info: "+91 99999-99999",
                                        sub: "Mon-Sat 9AM - 7PM IST",
                                    },
                                    {
                                        icon: Mail,
                                        title: "Email Us",
                                        info: "sunilkumawat.india@gmail.com",
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
                                    <motion.div
                                        key={title}
                                        variants={revealItem}
                                        className="glass group flex items-start gap-4 rounded-[1.5rem] p-5 transition-transform duration-500 ease-lux hover:-translate-y-1"
                                    >
                                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-ink-900 text-gold-300 transition-transform duration-500 ease-lux group-hover:scale-110 dark:bg-gold-400 dark:text-ink-900">
                                            <Icon size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-700 dark:text-gold-400">{title}</div>
                                            <div className="mt-1 break-words font-medium text-ink-900 dark:text-ivory-50">{info}</div>
                                            <div className="text-sm text-ink-400 dark:text-ivory-200/55">{sub}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </RevealGroup>

                            <a
                                href="https://wa.me/9999999999"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn mt-8 bg-[#1FAF5A] text-white shadow-float hover:-translate-y-0.5 hover:bg-[#1A9A4F] hover:shadow-float-lg"
                            >
                                <MessageCircle size={18} />
                                Chat on WhatsApp
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 1, ease: EASE }}
                            className="lg:col-span-7"
                        >
                            <div className="glass-strong relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
                                <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold-400/20 blur-3xl" />
                                <h3 className="relative font-display text-3xl font-medium tracking-tight text-ink-900 dark:text-ivory-50 md:text-4xl">
                                    Send Us a Message
                                </h3>
                                <div className="hairline mb-8 mt-6" />

                                {submitted ? (
                                    <motion.div
                                        initial={{ scale: 0.95, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.6, ease: EASE }}
                                        className="py-14 text-center"
                                        role="status"
                                    >
                                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold-500/15">
                                            <CheckCircle
                                                size={40}
                                                className="text-gold-600 dark:text-gold-300"
                                            />
                                        </div>
                                        <h4 className="font-display text-3xl font-medium text-ink-900 dark:text-ivory-50">
                                            Message Sent!
                                        </h4>
                                        <p className="mt-2 text-ink-500 dark:text-ivory-200/70">
                                            Thank you! Our team will contact you within 2 hours.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="relative space-y-5">
                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="contact-name" className={LABEL}>
                                                    Full Name *
                                                </label>
                                                <input
                                                    id="contact-name"
                                                    type="text"
                                                    required
                                                    value={form.name}
                                                    onChange={(e) =>
                                                        setForm((p) => ({ ...p, name: e.target.value }))
                                                    }
                                                    placeholder="Your Name"
                                                    className="field"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="contact-phone" className={LABEL}>
                                                    Phone Number *
                                                </label>
                                                <input
                                                    id="contact-phone"
                                                    type="tel"
                                                    required
                                                    value={form.phone}
                                                    onChange={(e) =>
                                                        setForm((p) => ({ ...p, phone: e.target.value }))
                                                    }
                                                    placeholder="+91 XXXXX XXXXX"
                                                    className="field"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="contact-email" className={LABEL}>
                                                Email Address *
                                            </label>
                                            <input
                                                id="contact-email"
                                                type="email"
                                                required
                                                value={form.email}
                                                onChange={(e) =>
                                                    setForm((p) => ({ ...p, email: e.target.value }))
                                                }
                                                placeholder="your@email.com"
                                                className="field"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="contact-destination" className={LABEL}>
                                                Destination Interest
                                            </label>
                                            <div className="relative">
                                                <select
                                                    id="contact-destination"
                                                    value={form.destination}
                                                    onChange={(e) =>
                                                        setForm((p) => ({
                                                            ...p,
                                                            destination: e.target.value,
                                                        }))
                                                    }
                                                    className="field cursor-pointer appearance-none pr-10"
                                                >
                                                    <option value="">Select a destination</option>
                                                    {DESTINATIONS.map((d) => (
                                                        <option key={d} value={d}>
                                                            {d}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown
                                                    size={16}
                                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ivory-200/50"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="contact-message" className={LABEL}>
                                                Message *
                                            </label>
                                            <textarea
                                                id="contact-message"
                                                required
                                                rows={5}
                                                value={form.message}
                                                onChange={(e) =>
                                                    setForm((p) => ({ ...p, message: e.target.value }))
                                                }
                                                placeholder="Tell us about your travel plans..."
                                                className="field resize-none"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn-gold w-full !py-4 text-base"
                                        >
                                            <Send size={18} />
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
