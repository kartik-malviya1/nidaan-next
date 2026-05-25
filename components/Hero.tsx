"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const carouselImages = [
  { url: "/image_3.png", alt: "Nidaan Institute Activity 1" },
  { url: "/image_4.png", alt: "Nidaan Institute Activity 2" },
  { url: "/image_2.png", alt: "Nidaan Institute Activity 3" },
  { url: "/image_6.png", alt: "Nidaan Institute Activity 4" },
  { url: "/image_7.png", alt: "Nidaan Institute Activity 5" },
  { url: "/image_1.png", alt: "Nidaan Institute Activity 6" },
];

export default function HeroFullScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col md:flex-row md:items-center bg-slate-950">
      
      {/* 1. Background Slideshow Container */}
      {/* Mobile: Dynamic Top Half Area | Desktop: Fullscreen Cinematic Background */}
      <div className="relative h-[40vh] w-full md:absolute md:inset-0 md:h-full md:w-full z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={carouselImages[currentIndex].url}
              alt={carouselImages[currentIndex].alt || "Background Slide"}
              fill
              priority={currentIndex === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Mobile-only Bottom Shading edge inside image context */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 to-transparent md:hidden z-10" />
        
        {/* Mobile Dot Indicators nested over the graphic layout */}
        <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2 md:hidden">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-[#ffcc00] w-5" : "bg-white/40 w-1.5"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 2. Premium Multi-Layer Seamless Desktop Vignette */}
      {/* Primary Left-to-Right structural gradient wrapper to lock in contrast beneath text */}
      <div className="hidden md:block absolute inset-y-0 left-0 z-10 w-[60%] lg:w-[50%] bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent pointer-events-none" />
      {/* Global secondary linear tint pass to pull the image and background together cleanly */}
      <div className="hidden md:block absolute inset-0 z-10 bg-slate-950/15 pointer-events-none" />

      {/* 3. Content Layout Structure */}
      {/* Mobile: Standard block body positioning | Desktop: Full Overlay Surface Layer */}
      <div className="flex-1 md:absolute md:inset-0 z-20 flex items-center bg-slate-950 md:bg-transparent">
        <div className="container mx-auto px-5 sm:px-10 lg:px-16 xl:px-24 py-10 md:py-0">
          <div className="max-w-xl lg:max-w-2xl text-left w-full">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col items-start"
            >
              {/* Institution Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-4 sm:mb-5 max-w-full">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffcc00] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffcc00]"></span>
                </span>
                <span className="truncate">Nidaan Institute of Rehabilitation & Training</span>
              </div>

              {/* Main Heading - Polished & resized for crisp desktop aesthetics */}
              <h1 className="text-2xl sm:text-4xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4">
                Where Every{" "}
                <span className="text-[#ffcc00]">Potential</span>{" "}
                Unfolds
              </h1>

              {/* Description Paragraph - Micro-adjusted desktop typography size */}
              <p className="text-xs sm:text-base md:text-sm lg:text-base text-slate-300 font-normal leading-relaxed mb-6 sm:mb-8 max-w-lg">
                Dedicated to promoting mental health awareness, special
                education, rehabilitation, and inclusive care for children with
                Autism, ADHD, Cerebral Palsy, and developmental delays.
              </p>

              {/* CTA Action Deck */}
              <div className="flex flex-col sm:flex-row items-center justify-start gap-3 mb-8 sm:mb-10 w-full sm:w-auto">
                <Link
                  href="/services"
                  className="group h-11 w-full sm:w-auto bg-[#ffcc00] hover:bg-[#e0b400] text-slate-950 font-bold inline-flex items-center justify-center gap-2 text-xs sm:text-sm px-5 rounded-xl transition-all duration-300 shadow-md hover:translate-y-[-1px]"
                >
                  Explore Programs
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/stories"
                  className="h-11 w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold inline-flex items-center justify-center gap-2 px-5 rounded-xl border border-white/5 transition-all duration-300 hover:translate-y-[-1px]"
                >
                  <div className="w-5 h-5 rounded-full bg-yellow-400/10 flex items-center justify-center border border-yellow-400/20">
                    <Play size={6} fill="currentColor" className="text-[#ffcc00] ml-0.5" />
                  </div>
                  <span className="text-xs sm:text-sm">Watch Our Story</span>
                </Link>
              </div>
            </motion.div>

            {/* Impact Metrics Panel */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="pt-5 border-t border-white/5 grid grid-cols-3 gap-3 sm:gap-6 w-full"
            >
              {[
                { value: "500+", label: "Families Helped" },
                { value: "10k+", label: "Sessions" },
                { value: "15+", label: "Years Care" },
              ].map((stat, i) => (
                <div key={i} className="text-left">
                  <div className="text-lg sm:text-2xl md:text-xl lg:text-2xl font-black text-[#ffcc00] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[8px] sm:text-[10px] text-slate-400 font-bold mt-0.5 uppercase tracking-wider leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* 4. Desktop Interface Navigation Shell */}
      {/* Left Chevron Action Control */}
      <button
        onClick={handlePrev}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-xl bg-slate-950/20 backdrop-blur-md text-white shadow-sm items-center justify-center hover:bg-[#ffcc00] hover:text-slate-950 transition-all active:scale-95 border border-white/10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
      </button>

      {/* Right Chevron Action Control */}
      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-xl bg-slate-950/20 backdrop-blur-md text-white shadow-sm items-center justify-center hover:bg-[#ffcc00] hover:text-slate-950 transition-all active:scale-95 border border-white/10"
        aria-label="Next slide"
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>

      {/* Desktop Dot Tracker Rails */}
      <div className="hidden md:flex absolute bottom-8 left-0 right-0 z-30 justify-center gap-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-[#ffcc00] w-6" : "bg-white/20 hover:bg-white/50 w-1.5"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Downward Scroll indicator vector */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-16 right-10 lg:right-16 z-30 hidden lg:block"
      >
        <div className="w-5 h-9 rounded-full border-2 border-white/10 flex items-start justify-center pt-1.5 backdrop-blur-sm">
          <div className="w-0.5 h-1.5 rounded-full bg-white/30"></div>
        </div>
      </motion.div>
    </section>
  );
}