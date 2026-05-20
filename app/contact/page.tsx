"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Heart,
    HeartHandshake,
    ArrowRight,
    Send,
} from "lucide-react";

const Contact = () => {
    return (
        <div>
            {/* Hero */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/assets/img20.jpeg"
                        alt="Contact"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/80"></div>
                </div>
                <div className="section-container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto text-center lg:mx-0 lg:text-left"
                    >
                        <span className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-4 block">
                            Contact
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-display font-extrabold text-white mb-6 leading-tight">
                            Get in Touch
                        </h1>
                        <p className="text-lg text-white/60">
                            We're here to support, guide, and answer your questions regarding
                            therapies, admissions, and rehabilitation programs.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Cards + Form */}
            <section className="section-padding bg-white">
                <div className="section-container">
                    <div className="grid lg:grid-cols-5 gap-10">
                        {/* Contact Info */}
                        <div className="lg:col-span-2 space-y-5">
                            <div>
                                <span className="text-xs font-semibold tracking-widest uppercase text-[#F90D41] mb-6 block">
                                    Details
                                </span>
                                <div className="space-y-4">
                                    {[
                                        {
                                            icon: <Phone size={18} />,
                                            label: "Toll-Free",
                                            value: "1800 890 4648",
                                        },
                                        {
                                            icon: <Mail size={18} />,
                                            label: "Email",
                                            value: "nirtnidaan@gmail.com",
                                        },
                                        {
                                            icon: <Clock size={18} />,
                                            label: "Working Hours",
                                            value: "Mon – Fri: 10:00 – 5:30",
                                        },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex gap-4 p-5 bg-amber-50 rounded-xl border border-amber-100"
                                        >
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#F90D41] shadow-sm shrink-0">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">
                                                    {item.label}
                                                </p>
                                                <p className="font-semibold text-black text-sm">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Centers */}
                            <div className="pt-4">
                                <span className="text-xs font-semibold tracking-widest uppercase text-[#F90D41] mb-4 block">
                                    Our Centers
                                </span>
                                <div className="space-y-4">
                                    <div className="relative overflow-hidden rounded-xl p-6">
                                        <div className="absolute inset-0 bg-[#ffcc00]"></div>
                                        <div className="relative z-10 text-white">
                                            <div className="flex items-center gap-2 mb-3">
                                                <MapPin size={16} />
                                                <h4 className="font-bold text-sm">Bhopal Campus</h4>
                                            </div>
                                            <p className="text-white/80 text-xs leading-relaxed mb-3">
                                                G-55, Rajved Colony, Priyanka Nagar, Kolar Road, Bhopal
                                                – 462042
                                            </p>
                                            <div className="text-[10px] font-medium text-white/60 space-y-0.5">
                                                <p>98269 34500</p>
                                                <p>98263 98520</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative overflow-hidden rounded-xl p-6">
                                        <div className="absolute inset-0 bg-black"></div>
                                        <div className="relative z-10 text-white">
                                            <div className="flex items-center gap-2 mb-3">
                                                <MapPin size={16} />
                                                <h4 className="font-bold text-sm">Indore Center</h4>
                                            </div>
                                            <p className="text-white/50 text-xs leading-relaxed mb-3">
                                                493-B, Scheme No. 103, Near Sahaj Palash Residency,
                                                Indore – 452012
                                            </p>
                                            <div className="text-[10px] font-medium text-[#FFCC00] space-y-0.5">
                                                <p>93402 69504</p>
                                                <p>94250 54306</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-3">
                            <div className="bg-amber-50 p-8 lg:p-10 rounded-2xl border border-amber-100">
                                <h3 className="text-xl font-display font-bold text-black mb-6">
                                    Send us a message
                                </h3>
                                <form className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                className="input"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="john@example.com"
                                                className="input"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="+91 98765 43210"
                                            className="input"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                                            Message
                                        </label>
                                        <textarea
                                            rows="4"
                                            placeholder="How can we help you?"
                                            className="input resize-none"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn-primary w-full py-3.5 gap-2"
                                    >
                                        Send Message <Send size={16} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Donation */}
            <section className="section-padding bg-amber-50">
                <div className="section-container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-4 block">
                                Support
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-6 leading-tight">
                                Your Support Creates Possibilities
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-8">
                                Every contribution helps provide therapy support, educational
                                services, and inclusive opportunities for children and families.
                            </p>
                            <div className="flex items-center gap-4 p-5 bg-amber-50 rounded-xl border border-amber-100 text-left">
                                <HeartHandshake className="text-amber-600 shrink-0" size={28} />
                                <div>
                                    <h4 className="font-bold text-black text-sm mb-0.5">
                                        Meaningful Impact
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                        Promoting dignity, independence, and confidence through your
                                        generosity.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    {
                                        amount: "₹500",
                                        label: "Therapy Session",
                                        desc: "Direct support for one child.",
                                    },
                                    {
                                        amount: "₹1500",
                                        label: "Learning Materials",
                                        desc: "Books and sensory kits.",
                                    },
                                    {
                                        amount: "₹5000",
                                        label: "Child Sponsorship",
                                        desc: "Holistic monthly support.",
                                    },
                                    {
                                        amount: "Custom",
                                        label: "Any Amount",
                                        desc: "Every bit counts.",
                                    },
                                ].map((card, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 }}
                                        className="p-6 rounded-xl bg-white border border-amber-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50 transition-all duration-300 cursor-pointer group"
                                    >
                                        <div className="text-2xl font-display font-extrabold text-[#ffcc00] mb-1 group-hover:text-amber-600 transition-colors">
                                            {card.amount}
                                        </div>
                                        <p className="font-semibold text-slate-900 text-sm mb-1">
                                            {card.label}
                                        </p>
                                        <p className="text-xs text-slate-400">{card.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-3.5 bg-black text-white font-semibold rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2">
                                <Heart size={16} /> Donate Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
