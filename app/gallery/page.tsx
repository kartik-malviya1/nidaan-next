"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Heart, Users, Camera, ArrowRight } from "lucide-react";
import Link from "next/link";

const Gallery = () => {
    const [filter, setFilter] = useState("All");

    const categories = [
        "All",
        "Therapy",
        "Classroom",
        "Sports",
        "Art & Theatre",
        "Workshops",
        "Events",
    ];

    const items = [
        {
            id: 1,
            cat: "Therapy",
            title: "Sensory Session",
            img: "/assets/img21.jpeg",
        },
        {
            id: 2,
            cat: "Classroom",
            title: "Group Learning",
            img: "/assets/img22.jpeg",
        },
        { id: 3, cat: "Sports", title: "Winter Games", img: "/assets/img23.jpeg" },
        {
            id: 4,
            cat: "Art & Theatre",
            title: "Stage Performance",
            img: "/assets/img24.jpeg",
        },
        {
            id: 5,
            cat: "Workshops",
            title: "Parent Training",
            img: "/assets/img25.jpeg",
        },
        { id: 6, cat: "Events", title: "Republic Day", img: "/assets/img26.jpeg" },
        {
            id: 7,
            cat: "Therapy",
            title: "Speech Therapy",
            img: "/assets/img27.jpeg",
        },
        { id: 8, cat: "Classroom", title: "One-on-One", img: "/assets/img28.jpeg" },
    ];

    const filteredItems =
        filter === "All" ? items : items.filter((item) => item.cat === filter);

    return (
        <div>
            {/* Hero */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/image_1.png"
                        alt="Gallery"
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
                            Gallery
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-display font-extrabold text-white mb-6 leading-tight">
                            Moments of Growth & Joy
                        </h1>
                        <p className="text-lg text-white/60">
                            Capturing the journey of transformation and resilience at Nidaan.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="section-padding bg-white">
                <div className="section-container">
                    {/* Filter Bar */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() => setFilter(c)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === c
                                    ? "bg-[#ffcc00] text-white shadow-md shadow-amber-200"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <motion.div
                        layout
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
                                >
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                                        <div className="text-white">
                                            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#FFCC00] mb-1 block">
                                                {item.cat}
                                            </span>
                                            <h4 className="font-bold">{item.title}</h4>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Success Stories */}
            <section className="section-padding bg-amber-50">
                <div className="section-container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-xs font-semibold tracking-widest uppercase text-[#F90D41] mb-4 block">
                            Stories
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-display font-bold text-black mb-4">
                            Success Stories
                        </h2>
                        <p className="text-gray-600">
                            Celebrating academic, social, and personal milestones.
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <GraduationCap size={22} />,
                                title: "Academic Achievements",
                                desc: "Students successfully clearing NIOS 10th & 12th examinations against all odds.",
                                color: "bg-blue-50 text-blue-600",
                            },
                            {
                                icon: <Users size={22} />,
                                title: "Social Development",
                                desc: "Children improving communication, confidence, and daily life skills significantly.",
                                color: "bg-emerald-50 text-emerald-600",
                            },
                            {
                                icon: <Heart size={22} />,
                                title: "Parent Journeys",
                                desc: "Stories of hope, resilience, and transformation from families who trusted us.",
                                color: "bg-rose-50 text-rose-600",
                            },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-2xl border border-amber-100 hover:shadow-lg hover:shadow-amber-100/60 transition-all duration-300 group"
                            >
                                <div
                                    className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-5 transition-transform group-hover:scale-110`}
                                >
                                    {s.icon}
                                </div>
                                <h3 className="font-bold text-black text-lg mb-2">{s.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {s.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Training CTA */}
            <section className="section-padding bg-white">
                <div className="section-container">
                    <div className="relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0">
                            <img
                                src="/assets/img30.jpeg"
                                alt="Training"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/85"></div>
                        </div>
                        <div className="relative z-10 p-10 lg:p-16 grid lg:grid-cols-2 gap-12 items-center">
                            <div className="text-center lg:text-left">
                                <span className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-4 block">
                                    Careers
                                </span>
                                <h2 className="text-3xl font-display font-bold text-white mb-4">
                                    Internship & Professional Training
                                </h2>
                                <p className="text-white/50 leading-relaxed mb-8">
                                    Nidaan also serves as a premium learning space for psychology
                                    students, special education trainees, and rehabilitation
                                    professionals.
                                </p>
                                <div className="grid grid-cols-2 gap-3 mb-8 text-left">
                                    {[
                                        "Psychology Students",
                                        "Special Educators",
                                        "Rehab Interns",
                                        "Volunteers",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-2 text-white/70 text-sm font-medium"
                                        >
                                            <div className="w-1.5 h-1.5 bg-[#FFCC00] rounded-full"></div>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    href="/contact"
                                    className="btn-primary w-full sm:w-auto gap-2"
                                >
                                    Apply for Internship <ArrowRight size={16} />
                                </Link>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-10 border border-white/10 text-center">
                                    <Camera size={48} className="text-[#FFCC00] mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        Training Gallery
                                    </h3>
                                    <p className="text-white/40 text-sm">
                                        View our professional development workshops and training
                                        sessions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Gallery;
