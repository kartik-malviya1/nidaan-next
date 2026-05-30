// @ts-nocheck
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Target,
    Eye,
    Heart,
    Users,
    ArrowRight,
    LayoutGrid,
    Image as ImageIcon,
    FileText,
    ExternalLink,
} from "lucide-react";
import Link from "next/link";


const About = () => {
    const [activeTab, setActiveTab] = useState("bearers");
    const [viewMode, setViewMode] = useState("chart");

    const team = [
        {
            name: "Ms. Kala Mohan",
            role: "Founder & President",
            desc: "Educationist, Counseling Psychologist & Social Worker",
        },
        { name: "Ms. Anita Mishra", role: "Vice President", desc: "Social Worker" },
        {
            name: "Ms. Brijbala Deshmukh",
            role: "Secretary",
            desc: "RCI Registered Special Educator & Trainer",
        },
        { name: "Ms. Sindhu Nair", role: "Treasurer", desc: "Teacher" },
        { name: "Mr. Bahul Shastri", role: "Joint Secretary", desc: "Advocate" },
        { name: "Ms. Bina Prakash", role: "Member", desc: "Teacher & Trainer" },
        {
            name: "Mr. Dharmendra Kr. Ray",
            role: "Member",
            desc: "Social Worker & Dedicated Member",
        },
    ];

    const advisoryBoard = [
        { name: "Ms. Shibani Ghosh", role: "Advisory Board Member" },
        { name: "Dr. Sapna Agrawal", role: "Advisory Board Member" },
        { name: "Mr. Gopal Saraf", role: "Advisory Board Member" },
        { name: "Mr. G.K. Chhibbar", role: "Advisory Board Member" },
        { name: "Dr. Rajesh Sharma", role: "Advisory Board Member" },
        { name: "Dr. Parshuram Tiwari", role: "Advisory Board Member" },
        { name: "Fr. Maria Stephen", role: "Advisory Board Member" },
        { name: "Ms. Nivedita Tomar", role: "Advisory Board Member" },
        { name: "Dr. Dheeraj Mehrotra", role: "Advisory Board Member" },
        { name: "Ms. Aarti Sachdeva", role: "Advisory Board Member" },
    ];

    const coreTeam = [
        {
            name: "Mr. P M Das",
            role: "Executive Director",
            sub: "Co-Founder of Nidaan",
        },
        { name: "Ms. Rubeena", role: "Centre Coordinator", sub: "Bhopal" },
        { name: "Ms. Suvarna Baglikar", role: "Centre Coordinator", sub: "Indore" },
        { name: "Ms. Rtn. Aswathy Anilkumar", role: "Head", sub: "Outreach Programs" },
        { name: "Mr. Samip Mohan", role: "Head", sub: "Legal Advisor" },
        { name: "Ms. Anam Khan", role: "Head", sub: "RCI Registered Clinical Psychologist" },
    ];

    const partnerLogos = [
        "/LIC-Logo.png",
        "/Lions_Clubs_International_logo.svg.png",
        "/Rotary_International_Logo.svg.png",
        "/bank of baroda.png",
        "/canara bank.png",
        "/vidhigya.png",
    ];

    return (
        <div>
            {/* Page Hero */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/image_17.png"
                        alt="Community"
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
                        <span className="text-xs font-semibold tracking-widest uppercase text-[#FFCC00] mb-4 block">
                            About Us
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-display font-extrabold text-white mb-6 leading-tight">
                            Our Story & Vision
                        </h1>
                        <p className="text-lg text-white/60 leading-relaxed">
                            Nurturing neurodiverse children through empathy-driven education
                            and therapy programs since our inception.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story */}
            <section className="section-padding bg-white">
                <div className="section-container grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
                    <div className="text-center lg:text-left">
                        <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-4 block">
                            Our Journey
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-6 leading-tight">
                            Building Hope, One Child at a Time
                        </h2>
                        <div className="space-y-5 text-slate-600 leading-relaxed">
                            <p>
                                Nidaan was created with a vision to bridge the gap between care,
                                education, and rehabilitation for children with special needs.
                            </p>
                            <p>
                                Over the years, the organization has evolved into a
                                multidisciplinary center focused on nurturing neurodiverse
                                children through empathy-driven education and therapy programs.
                            </p>
                            <p>
                                Today, Nidaan stands as a symbol of hope, inclusion, and
                                empowerment for families across Madhya Pradesh.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src="/assets/img17.jpeg"
                            className="rounded-2xl w-full h-96 object-cover"
                            alt="Our Story"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-slate-100 hidden md:block">
                            <p className="text-3xl font-display font-extrabold text-[#ffcc00] mb-1">
                                15+
                            </p>
                            <p className="text-sm text-slate-500 font-medium">
                                Years of Impact
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy */}
            <section className="section-padding bg-amber-50">
                <div className="section-container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-xs font-semibold tracking-widest uppercase text-[#F90D41] mb-4 block">
                            Philosophy
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-display font-bold text-black mb-4">
                            What We Believe
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            At Nidaan, we believe every child has a unique light that deserves
                            to shine.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {[
                            "Every child can learn",
                            "Every child deserves dignity",
                            "Inclusion creates stronger communities",
                            "Therapy should be compassionate",
                            "Families deserve support",
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-white p-5 rounded-xl text-center border border-amber-100 hover:border-amber-200 hover:shadow-md transition-all duration-300"
                            >
                                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-[#ffcc00] mx-auto mb-3">
                                    <Heart size={18} fill="currentColor" />
                                </div>
                                <p className="font-semibold text-gray-800 text-sm leading-snug">
                                    {item}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="section-padding bg-white">
                <div className="section-container grid md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-2xl p-10 lg:p-12"
                    >
                        <div className="absolute inset-0">
                            <img
                                src="/assets/img18.jpeg"
                                className="w-full h-full object-cover"
                                alt=""
                            />
                            <div className="absolute inset-0 bg-[#F90D41]/90"></div>
                        </div>
                        <div className="relative z-10 text-white">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                                <Eye size={24} />
                            </div>
                            <h3 className="text-2xl font-display text-white font-bold mb-4">
                                Our Vision
                            </h3>
                            <p className="text-white/90 leading-relaxed">
                                An inclusive society where people with diverse abilities thrive
                                with dignity, opportunity, confidence, and equal participation.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative overflow-hidden rounded-2xl p-10 lg:p-12"
                    >
                        <div className="absolute inset-0">
                            <img
                                src="/assets/img19.jpeg"
                                className="w-full h-full object-cover"
                                alt=""
                            />
                            <div className="absolute inset-0 bg-black/90"></div>
                        </div>
                        <div className="relative z-10 text-white">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                                <Target size={24} className="text-[#FFCC00]" />
                            </div>
                            <h3 className="text-2xl font-display text-white font-bold mb-4">
                                Our Mission
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                To empower individuals with diverse abilities through
                                compassionate, inclusive, and holistic care, therapy, education,
                                and rehabilitation.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Office Bearers */}
            <section className="section-padding bg-amber-50">
                <div className="section-container">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <span className="text-xs font-semibold tracking-widest uppercase text-[#F90D41] mb-4 block">
                            Leadership
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-display font-bold text-black mb-4">
                            {activeTab === "bearers" ? "Office Bearers" : "Advisory Board"}
                        </h2>
                        <p className="text-gray-600">
                            The dedicated leadership of Nidaan Sewa Samiti.
                        </p>
                    </div>

                    {/* Tabs Control */}
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex p-1 bg-amber-100/60 rounded-xl border border-amber-200 shadow-sm">
                            <button
                                onClick={() => setActiveTab("bearers")}
                                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === "bearers"
                                    ? "bg-[#F90D41] text-white shadow-md"
                                    : "text-slate-700 hover:text-[#F90D41]"
                                    }`}
                            >
                                Office Bearers
                            </button>
                            <button
                                onClick={() => setActiveTab("advisory")}
                                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === "advisory"
                                    ? "bg-[#F90D41] text-white shadow-md"
                                    : "text-slate-700 hover:text-[#F90D41]"
                                    }`}
                            >
                                Advisory Board
                            </button>
                        </div>
                    </div>

                    {/* View Mode Switcher */}
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                            Showing:{" "}
                            {activeTab === "bearers"
                                ? "7 Office Bearers"
                                : "10 Advisory Board Members"}
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline">
                                View As:
                            </span>
                            <div className="inline-flex p-1 bg-white rounded-lg border border-slate-200 shadow-sm">
                                <button
                                    onClick={() => setViewMode("chart")}
                                    className={`p-1.5 rounded-md transition-all flex items-center justify-center ${viewMode === "chart"
                                        ? "bg-amber-100 text-[#F90D41]"
                                        : "text-slate-400 hover:text-slate-600"
                                        }`}
                                    title="Visual Org Chart"
                                >
                                    <ImageIcon size={18} />
                                </button>
                                <button
                                    onClick={() => setViewMode("cards")}
                                    className={`p-1.5 rounded-md transition-all flex items-center justify-center ${viewMode === "cards"
                                        ? "bg-amber-100 text-[#F90D41]"
                                        : "text-slate-400 hover:text-slate-600"
                                        }`}
                                    title="Detailed List"
                                >
                                    <LayoutGrid size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="relative min-h-[400px]">
                        {viewMode === "chart" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="relative group overflow-hidden rounded-2xl border border-amber-200 bg-white p-4 shadow-md transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="relative w-full overflow-hidden pointer-events-none select-none">
                                    {activeTab === "bearers" ? (
                                        <picture>
                                            <source
                                                media="(max-width: 767px)"
                                                srcSet="/Founder-Mobile.png"
                                            />
                                            <img
                                                src="/Founder.png"
                                                alt="Office Bearers Visual Chart"
                                                className="w-full h-auto object-contain rounded-xl"
                                            />
                                        </picture>
                                    ) : (
                                        <picture>
                                            <source
                                                media="(max-width: 767px)"
                                                srcSet="/advisoryBoard-mobile.jpeg"
                                            />
                                            <img
                                                src="/AdvisoryBoard.jpeg"
                                                alt="Advisory Board Visual Chart"
                                                className="w-full h-auto object-contain rounded-xl"
                                            />
                                        </picture>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                            >
                                {(activeTab === "bearers" ? team : advisoryBoard).map(
                                    (v, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 15 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                            className="bg-white p-6 rounded-2xl border border-amber-100 hover:shadow-lg hover:shadow-amber-100/60 transition-all duration-300 text-center flex flex-col justify-between"
                                        >
                                            <div>
                                                <div className="w-16 h-16 bg-gradient-to-tr from-[#F90D41]/10 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-extrabold text-[#F90D41] shadow-inner font-display">
                                                    {v.name
                                                        .replace(/^(Mr\.|Ms\.|Dr\.|Fr\.)\s+/, "")
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .substring(0, 2)}
                                                </div>
                                                <h4 className="font-bold text-black text-lg mb-1">
                                                    {v.name}
                                                </h4>
                                                <p className="text-[#F90D41] font-semibold text-xs uppercase tracking-wider mb-3">
                                                    {v.role}
                                                </p>
                                            </div>
                                            {v.desc && (
                                                <p className="text-gray-500 text-sm mt-2">{v.desc}</p>
                                            )}
                                        </motion.div>
                                    ),
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Core Team */}
            <section className="section-padding bg-white">
                <div className="section-container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-xs font-semibold tracking-widest uppercase text-[#F90D41] mb-4 block">
                            Team
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-display font-bold text-black mb-4">
                            Core Team in Action
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {coreTeam.map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="p-6 rounded-xl bg-amber-50 border border-amber-100 hover:bg-white hover:shadow-md transition-all"
                            >
                                <h4 className="font-bold text-black">{v.name}</h4>
                                <p className="text-sm text-[#F90D41] font-semibold">{v.role}</p>
                                <p className="text-xs text-gray-400 mt-1">{v.sub}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Supporters */}
            <section className="section-padding bg-amber-50">
                <div className="section-container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-xs font-semibold tracking-widest uppercase text-[#F90D41] mb-4 block">
                            Partners
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-display font-bold text-black mb-4">
                            Our Supporters
                        </h2>
                        <p className="text-gray-600">
                            Proudly supported by leading institutions.
                        </p>
                    </div>
                    <div className="mt-10 relative w-full overflow-hidden whitespace-nowrap before:absolute before:left-0 before:top-0 before:w-24 md:before:w-40 before:h-full before:bg-gradient-to-r before:from-amber-50 before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:w-24 md:after:w-40 after:h-full after:bg-gradient-to-l after:from-amber-50 after:to-transparent after:z-10">
                        <motion.div
                            className="flex items-center gap-16 md:gap-24 w-max"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
                        >
                            {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                                <img
                                    key={index}
                                    src={logo}
                                    alt="Partner Logo"
                                    className="h-16 md:h-20 w-auto object-contain mix-blend-multiply opacity-60 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0"
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Annual Report - NOW UNCOMMENTED */}
            <section className="section-padding bg-white border-t border-amber-100/40">
                <div className="section-container">
                    <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100/30 rounded-2xl p-8 md:p-10 border border-amber-100 shadow-sm">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F90D41]/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                            <div className="max-w-2xl text-center md:text-left">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 mb-4 font-sans">
                                    <FileText size={14} className="text-[#de5212]" />
                                    Transparency & Governance
                                </span>
                                <h2 className="text-2xl font-display font-bold text-black mb-3">
                                    NIDAAN Annual Report
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    We are committed to absolute transparency and accountability in our mission. Access our annual reports on Google Drive to review our program milestones, financial disclosures, and impact assessments.
                                </p>
                            </div>
                            <div className="flex justify-center md:justify-end shrink-0">
                                <Link
                                    href="/annual-reports"
                                    className="btn-primary gap-2 text-center w-full sm:w-auto"
                                >
                                    Annual Report <ExternalLink size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-white">
                <div className="section-container">
                    <div className="bg-black rounded-2xl p-10 lg:p-16 text-center">
                        <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                            Want to Join Our Mission?
                        </h2>
                        <p className="text-white/50 mb-8 max-w-lg mx-auto">
                            We're always looking for passionate individuals who share our
                            commitment to inclusion.
                        </p>
                        <Link href="/contact" className="btn-primary w-full sm:w-auto gap-2">
                            Get in Touch <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
