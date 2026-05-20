"use client";
import React from "react";
import { motion } from "framer-motion";
import {
    BookOpen,
    Activity,
    Brain,
    Zap,
    HeartHandshake,
    Mic2,
    Dumbbell,
    Music,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";

const Services = () => {
    const therapyCards = [
        {
            title: "Speech Therapy",
            desc: "Improves speech, communication, and social interaction skills.",
            icon: <Mic2 size={22} />,
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Occupational Therapy",
            desc: "Enhances sensory processing and functional independence.",
            icon: <Activity size={22} />,
            color: "bg-emerald-50 text-emerald-600",
        },
        {
            title: "Physiotherapy",
            desc: "Improving mobility, strength, balance, and coordination.",
            icon: <Dumbbell size={22} />,
            color: "bg-violet-50 text-violet-600",
        },
        {
            title: "Sensory Integration",
            desc: "Structured sensory experiences for self-regulation.",
            icon: <Zap size={22} />,
            color: "bg-amber-50 text-[#F90D41]",
        },
        {
            title: "Music & Movement",
            desc: "Emotional well-being through creative expression.",
            icon: <Music size={22} />,
            color: "bg-rose-50 text-rose-600",
        },
    ];

    const psychCards = [
        { title: "Assessments", desc: "Cognitive & behavioral evaluations." },
        { title: "ABA Therapy", desc: "Improving adaptive skills." },
        { title: "Behavior Therapy", desc: "Managing behavioral challenges." },
        { title: "Counseling", desc: "Emotional support for families." },
    ];

    const enrichment = [
        "Music, Dance & Theatre",
        "Art & Creativity Programs",
        "Grooming & Social Skills",
        "Sports & Outdoor Activities",
        "Field Trips & Educational Visits",
        "Pre-Vocational Training",
    ];

    return (
        <div>
            {/* Hero */}
            <section className="relative pt-32 pb-20 lg:pt-34 lg:pb-28 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/image_6.png"
                        alt="Therapy"
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
                            Services
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-display font-extrabold text-white mb-6 leading-tight">
                            Therapy & Specialized Programs
                        </h1>
                        <p className="text-lg text-white/60">
                            Comprehensive support systems designed for holistic growth and
                            rehabilitation.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Education & Skills */}
            <section className="section-padding bg-white">
                <div className="section-container grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-center lg:text-left"
                    >
                        <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-4 block">
                            Core Program
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-6">
                            Education & Skill Development
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-3 text-left">
                            {[
                                "Early Intervention",
                                "Remedial Education",
                                "NIOS Support",
                                "Vocational Training",
                                "Special Education",
                                "Life & Soft Skills",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-700"
                                >
                                    <div className="w-2 h-2 bg-[#ffcc00] rounded-full shrink-0"></div>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src="/assets/img33.jpeg"
                            alt="Education"
                            className="rounded-2xl w-full h-80 object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Therapeutic Services */}
            <section className="section-padding bg-amber-50">
                <div className="section-container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-xs font-semibold tracking-widest uppercase text-[#F90D41] mb-4 block">
                            Clinical
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-display font-bold text-black mb-4">
                            Therapeutic Services
                        </h2>
                        <p className="text-gray-600">
                            Multidisciplinary approach to physical, sensory, and communication
                            development.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {therapyCards.map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-white p-8 rounded-2xl border border-amber-100 hover:shadow-lg hover:shadow-amber-100/60 transition-all duration-300 group"
                            >
                                <div
                                    className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-5 transition-transform group-hover:scale-110`}
                                >
                                    {card.icon}
                                </div>
                                <h3 className="font-bold text-black text-lg mb-2">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {card.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Psychological Services */}
            <section className="section-padding bg-white">
                <div className="section-container">
                    <div className="relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0">
                            <img
                                src="/assets/img34.jpeg"
                                alt="Psychology"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/90"></div>
                        </div>
                        <div className="relative z-10 p-10 lg:p-16">
                            <div className="flex items-center gap-4 mb-10">
                                <Brain size={36} className="text-[#FFCC00]" />
                                <h2 className="text-3xl font-display font-bold text-white">
                                    Psychological Services
                                </h2>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {psychCards.map((s, i) => (
                                    <div
                                        key={i}
                                        className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                                    >
                                        <h4 className="text-[#FFCC00] font-bold text-sm mb-2">
                                            {s.title}
                                        </h4>
                                        <p className="text-xs text-white/50">{s.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enrichment */}
            <section className="section-padding bg-amber-50">
                <div className="section-container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-xs font-semibold tracking-widest uppercase text-[#F90D41] mb-4 block">
                            Activities
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-display font-bold text-black mb-4">
                            Enrichment & Recreational
                        </h2>
                        <p className="text-gray-600">
                            Encouraging confidence and social engagement through creative
                            activities.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {enrichment.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                                className="bg-white p-5 rounded-xl border border-amber-100 flex items-center gap-4 hover:shadow-md hover:border-amber-200 transition-all"
                            >
                                <div className="w-10 h-10 bg-amber-50 text-[#F90D41] rounded-lg flex items-center justify-center shrink-0">
                                    <Zap size={18} />
                                </div>
                                <span className="font-semibold text-gray-700 text-sm">
                                    {item}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Parent Support */}
            <section className="section-padding bg-white">
                <div className="section-container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center bg-amber-50 rounded-2xl p-10 lg:p-14 border border-amber-100">
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold mb-5">
                                <HeartHandshake size={14} />
                                PARWARISH Initiative
                            </div>
                            <h2 className="text-3xl font-display font-bold text-black mb-4">
                                Parent Support Programs
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-8">
                                Dedicated workshops and counseling sessions designed to help
                                parents understand, support, and advocate for their children
                                effectively.
                            </p>
                            <Link
                                href="/contact"
                                className="btn-primary w-full sm:w-auto gap-2"
                            >
                                Join Next Workshop <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div>
                            <img
                                src="/assets/img35.jpeg"
                                className="rounded-2xl w-full h-72 object-cover"
                                alt="Parent Support"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
