"use client";
import React from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle, Users, Shield, ArrowRight, FileText, Download, ExternalLink } from "lucide-react";

const Stories = () => {
    const reports = [
        { year: "2017 - 2018", type: "PDF", url: "/NIDAAN ANNUAL REPORT 2017-2018.pdf", isLocal: true },
        { year: "2018 - 2019", type: "PDF", url: "/NIDAAN ANNUAL REPORT 2018-2019.pdf", isLocal: true },
        { year: "2019 - 2020", type: "Drive Link", url: "https://drive.google.com/file/d/1ii2EmNO4YcWEXFaxKnu9xuKCaDrL9lze/view?usp=drive_web", isLocal: false },
        { year: "2020 - 2021", type: "Drive Link", url: "https://drive.google.com/file/d/1ebARO4TKvQRtgr2DoDRZMN32aWkyJyoB/view?usp=drive_web", isLocal: false },
        { year: "2021 - 2022", type: "Drive Link", url: "https://drive.google.com/file/d/1cX0ETYGLBmuA-AZzDD6GeeKLGzUKaj28/view?usp=drive_web", isLocal: false },
        { year: "2022 - 2023", type: "Drive Link", url: "https://drive.google.com/file/d/13Zz8VDu8eM5u7nx7_rCIHjZLRVZnRRpC/view?usp=drive_web", isLocal: false },
        { year: "2023 - 2024", type: "Drive Link", url: "https://drive.google.com/file/d/1MWfzJBZPVpy7NC4N8EKvGPkasZbgE26x/view?usp=drive_web", isLocal: false },
        { year: "2024 - 2025", type: "Drive Link", url: "https://drive.google.com/file/d/1GbVEoY3YtIKrKSogOzr69hJu7JmLVwa9/view?usp=drive_web", isLocal: false }
    ];

    return (
        <div>
            {/* Hero */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/image_10.png"
                        alt="Community"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/80"></div>
                </div>
                <div className="section-container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl"
                    >
                        <span className="text-xs font-semibold tracking-widest uppercase text-[#FFCC00] mb-4 block">
                            Stories
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-display font-extrabold text-white mb-6 leading-tight">
                            Recognition & Impact
                        </h1>
                        <p className="text-lg text-white/60">
                            Celebrating excellence and creating awareness through community
                            initiatives.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* India Book of Records */}
            <section className="section-padding bg-white">
                <div className="section-container grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-center lg:text-left"
                    >
                        <span className="text-xs font-semibold tracking-widest uppercase text-[#F90D41] mb-4 block">
                            Recognition
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-display font-bold text-black mb-6">
                            Stories & Recognition
                        </h2>
                        <p className="text-base text-gray-600 leading-relaxed mb-8">
                            NIDAAN has been featured across regional media for awareness
                            campaigns, medical screening camps, and inclusive theatre
                            performances.
                        </p>
                        <div className="space-y-3 mb-8 text-left inline-block lg:block">
                            {[
                                "Awarded for Mental Health Awareness",
                                "Recognized for Community Outreach",
                                "Pioneer in Inclusive Education Initiatives",
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <CheckCircle className="text-[#FFCC00] shrink-0" size={18} />
                                    <span className="font-medium text-gray-700 text-sm">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-amber-50 p-10 rounded-2xl border border-amber-100 text-center"
                    >
                        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Award size={40} className="text-[#F90D41]" />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-black mb-3">
                            India Book of Records
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            Officially recognized for outstanding contributions in special
                            education, inclusive care, and rehabilitation support across
                            India.
                        </p>
                        <span className="inline-block px-4 py-1.5 bg-[#FFCC00] text-white rounded-full font-semibold text-xs tracking-wider uppercase">
                            Official Recognition
                        </span>
                    </motion.div>
                </div>
            </section>

            {/* Initiatives */}
            <section className="section-padding bg-amber-50">
                <div className="section-container">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-xs font-semibold tracking-widest uppercase text-[#F90D41] mb-4 block">
                            Initiatives
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-display font-bold text-black mb-4">
                            Community Programs
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Screening & Awareness Camps",
                                desc: "Regularly conducting screening camps for early identification of developmental delays in underserved communities.",
                                tag: "Medical Camp",
                                icon: <Shield size={20} className="text-[#F90D41]" />,
                                image: "/assets/img37.jpeg",
                            },
                            {
                                title: "Community Outreach Programs",
                                desc: "Promoting mental health awareness and inclusive education advocacy through state-level seminars and workshops.",
                                tag: "Outreach",
                                icon: <Users size={20} className="text-[#F90D41]" />,
                                image: "/assets/img40.jpeg",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl overflow-hidden border border-amber-100 hover:shadow-xl hover:shadow-amber-200/50 transition-all duration-500 group"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={item.image}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        alt={item.title}
                                    />
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#FFCC00] text-white rounded-full font-semibold text-xs uppercase tracking-wider">
                                        {item.tag}
                                    </div>
                                </div>
                                <div className="p-7">
                                    <div className="flex items-center gap-2 mb-3">
                                        {item.icon}
                                        <h3 className="font-bold text-black text-lg">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/assets/img39.jpeg"
                        alt="Impact"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/85"></div>
                </div>
                <div className="section-container relative z-10 py-24 lg:py-32">
                    <div className="text-center mb-16">
                        <span className="text-xs font-semibold tracking-widest uppercase text-[#FFCC00] mb-4 block">
                            Impact
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                            Impact & Reach
                        </h2>
                        <p className="text-white/40">
                            Our commitment to transparency and quality care.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-16">
                        {[
                            { val: "Thousands", label: "Lives Impacted" },
                            { val: "500+", label: "Screening Camps" },
                            { val: "50+", label: "Schools Reached" },
                            { val: "100%", label: "Transparency" },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="text-3xl lg:text-4xl font-display font-extrabold text-[#FFCC00] mb-2">
                                    {s.val}
                                </div>
                                <div className="text-xs font-medium text-white/40 uppercase tracking-wider">
                                    {s.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                                Annual Reports & Governance
                            </h3>
                            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                                We are committed to absolute transparency and accountability in our mission. Access our annual reports by year to review our program milestones, financial disclosures, and impact assessments.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-left">
                            {reports.map((report, i) => (
                                <motion.a
                                    key={i}
                                    href={report.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05, duration: 0.3 }}
                                    className="group relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-[#FFCC00]/50 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between h-40 shadow-sm hover:shadow-lg hover:shadow-[#FFCC00]/5"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FFCC00] group-hover:bg-[#FFCC00]/20 transition-colors">
                                            <FileText size={20} />
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                            report.isLocal 
                                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" 
                                                : "bg-[#FFCC00]/20 text-[#FFCC00] border border-[#FFCC00]/30"
                                        }`}>
                                            {report.type}
                                        </span>
                                    </div>
                                    
                                    <div className="mt-4">
                                        <h4 className="text-white font-display font-extrabold text-base leading-tight group-hover:text-[#FFCC00] transition-colors">
                                            {report.year}
                                        </h4>
                                        <div className="flex items-center gap-1 text-white/40 group-hover:text-white/80 transition-colors mt-2 text-xs font-semibold">
                                            <span>{report.isLocal ? "Download PDF" : "View on Drive"}</span>
                                            {report.isLocal ? <Download size={12} /> : <ExternalLink size={12} />}
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Stories;
