"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Sample carousel images - replace these with your actual assets
const carouselImages = [
  {
    url: "/image_3.png",
    alt: "",
  },
  {
    url: "/image_4.png",
    alt: "",
  },
  {
    url: "/image_5.png",
    alt: "",
  },
  {
    url: "/image_6.png",
    alt: "",
  },
  {
    url: "/image_7.png",
    alt: "",
  },
  {
    url: "/image_1.png",
    alt: "",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Auto-play mechanism
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000); // Changes slide every 6 seconds
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1,
    );
  };

  // Animation variants for the sliding images
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    exit: (dir) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-28 pb-16 lg:pt-20 lg:pb-20">
      {/* Decorative background glow elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFCC00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Mission Content */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col items-center lg:items-start"
            >
              {/* Institution Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-1 border-[#F4C400]/20 backdrop-blur-md text-slate-600 text-xs font-semibold tracking-wider uppercase mb-6 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#ffcc00] animate-pulse"></span>
                Nidaan Institute of Rehabilitation & Training
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-black leading-[1.1] mb-6">
                Where Every{" "}
                <span className="text-[#ffcc00] block sm:inline">
                  Potential
                </span>{" "}
                Unfolds
              </h1>

              {/* Description Paragraph */}
              <p className="text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Dedicated to promoting mental health awareness, special
                education, rehabilitation, and inclusive care for children with
                Autism, ADHD, Cerebral Palsy, and developmental delays.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 w-full sm:w-auto">
                <Link
                  href="/services"
                  className="h-14 w-full sm:min-w-[220px] sm:w-auto bg-[#ffcc00] hover:bg-[#e0b400] text-slate-900 font-bold inline-flex items-center justify-center gap-2 text-base px-8 transition-all duration-300 shadow-lg shadow-[#F4C400]/20"
                >
                  Explore Programs
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/stories"
                  className="h-14 w-full sm:min-w-[220px] sm:w-auto inline-flex items-center justify-center gap-3 px-6 text-black font-semibold text-sm border border-[#F4C400]/20 hover:bg-[#F4C400]/10 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-[#F4C400]/5 flex items-center justify-center border border-[#F4C400]/30">
                    <Play
                      size={12}
                      fill="white"
                      className="text-black ml-0.5"
                    />
                  </div>
                  Watch Our Story
                </Link>
              </div>
            </motion.div>

            {/* Impact Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-md w-full"
            >
              {[
                { value: "500+", label: "Families Helped" },
                { value: "10k+", label: "Sessions" },
                { value: "15+", label: "Years Care" },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-extrabold text-[#ffcc00]">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-black font-medium mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Carousel Box */}
          <div className="lg:col-span-6 xl:col-span-7 flex justify-center items-center relative w-full h-[320px] sm:h-[450px] lg:h-[500px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-slate-800"
            >
              {/* Image Slide Container */}
              <div className="absolute inset-0 w-full h-full">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.img
                    key={currentIndex}
                    src={carouselImages[currentIndex].url}
                    alt={carouselImages[currentIndex].alt}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                {/* Subtle overlay to soften extreme image highlights */}
                <div className="absolute inset-0 bg-white/10" />
              </div>

              {/* Left Navigation Arrow */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass text-black border border-[#FFCC00]/30 flex items-center justify-center hover:bg-[#FFCC00] transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Right Navigation Arrow */}
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass text-black border border-[#FFCC00]/30 flex items-center justify-center hover:bg-[#FFCC00] transition-all"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>

              {/* Bottom Dot Navigation System */}
              <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                      ? "bg-[#F4C400] w-6"
                      : "bg-white/40 w-2"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Downward Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
          <div className="w-1 h-2.5 rounded-full bg-white/40"></div>
        </div>
      </motion.div>
    </section>
  );
};

