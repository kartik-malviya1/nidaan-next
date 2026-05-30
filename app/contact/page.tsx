"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactInput } from "@/lib/validations";
import Link from "next/link";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Heart,
    HeartHandshake,
    ArrowRight,
    Send,
    Loader2,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactInput>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            message: "",
        },
    });

    const onSubmit = async (data: ContactInput) => {
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to submit message");
            }

            setSubmitSuccess(true);
            reset();
        } catch (err: any) {
            console.error(err);
            setSubmitError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div>
            {/* Hero */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/image_18.png"
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

                                {submitSuccess && (
                                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                                        <div>
                                            <h5 className="font-bold text-sm">Message Sent Successfully!</h5>
                                            <p className="text-xs text-emerald-700 mt-0.5">Thank you for reaching out. We will get back to you soon.</p>
                                        </div>
                                    </div>
                                )}

                                {submitError && (
                                    <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-start gap-3">
                                        <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                                        <div>
                                            <h5 className="font-bold text-sm">Failed to Send Message</h5>
                                            <p className="text-xs text-rose-700 mt-0.5">{submitError}</p>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                                                Full Name <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                className={`input ${errors.name ? "border-rose-400 focus:border-rose-400" : ""}`}
                                                {...register("name")}
                                            />
                                            {errors.name && (
                                                <p className="text-xs text-rose-500 mt-1 font-medium">{errors.name.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                                                Email Address <span className="text-gray-400 font-normal lowercase">(optional)</span>
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="john@example.com"
                                                className={`input ${errors.email ? "border-rose-400 focus:border-rose-400" : ""}`}
                                                {...register("email")}
                                            />
                                            {errors.email && (
                                                <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                                            Phone Number <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="+91 98765 43210"
                                            className={`input ${errors.phoneNumber ? "border-rose-400 focus:border-rose-400" : ""}`}
                                            {...register("phoneNumber")}
                                        />
                                        {errors.phoneNumber && (
                                            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.phoneNumber.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                                            Message <span className="text-rose-500">*</span>
                                        </label>
                                        <textarea
                                            rows={4}
                                            placeholder="How can we help you?"
                                            className={`input resize-none ${errors.message ? "border-rose-400 focus:border-rose-400" : ""}`}
                                            {...register("message")}
                                        ></textarea>
                                        {errors.message && (
                                            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.message.message}</p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn-primary w-full py-3.5 gap-2 justify-center cursor-pointer disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                Sending... <Loader2 size={16} className="animate-spin" />
                                            </>
                                        ) : (
                                            <>
                                                Send Message <Send size={16} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                            {/* Donation CTA */}
            <section className=" bg-amber-50">
                <div className="section-container">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-8 lg:p-12 border border-amber-100 shadow-xl shadow-amber-50/50 text-center max-w-8xl mx-auto flex flex-col items-center"
                    >
                        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
                            <HeartHandshake size={32} />
                        </div>
                        <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-3 block">
                            Support Our Cause
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4 leading-tight">
                            Your Support Creates Possibilities
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-8 max-w-lg mx-auto">
                            Every contribution helps provide therapy support, educational
                            services, and inclusive opportunities for children and families. 
                        </p>
                        <Link 
                            href="/donate"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            <Heart size={18} /> Make a Donation <ArrowRight size={18} className="ml-1" />
                        </Link>
                    </motion.div>
                </div>
            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;