"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const Services = () => {
  // Service data extracted directly from the NIDAAN document
  const services = [
    {
      id: "01",
      title: "Education & Skill Development ",
      description:
        "We provide individualized educational and developmental programs designed to enhance learning, independence, and overall skill development across all age groups.",
      image: "/therapy6.png",
    },
    {
      id: "02",
      title: "Therapeutic Services",
      description:
        "Our therapeutic interventions are designed to enhance functional abilities, communication skills, sensory processing, and overall quality of life.",
      image: "/therapy2.png",
    },
    {
      id: "03",
      title: "Psychological Services ",
      description:
        "We offer evidence-based psychological interventions aimed at supporting emotional well-being, behavioral development, and adaptive functioning.",
      image: "/therapy3.png",
    },
    {
      id: "04",
      title: "Enrichment & Recreational",
      description:
        "Our enrichment programs are designed to foster creativity, confidence, social engagement, and overall holistic development.",
      image: "/therapy4.png",
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-30 lg:pb-24 overflow-hidden font-sans">
        <div className="absolute inset-0">
          <img
            src="/image_18.png" 
            alt="Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        
        {/* Adjusted container classes to match your lower section's alignment */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 lg:px-24">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-2xl text-center md:text-left"
  >
    <span className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-4 block">
      Services
    </span>
    <h1 className="text-3xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
      Programs That Support And Protect Children
    </h1>
    <p className="sm:text-lg text-md text-white/60">
      Tailored therapeutic, educational, and rehabilitation services designed for unique developmental needs.
    </p>
  </motion.div>
</div>
      </section>

      {/* Services List Section */}
      <section className="bg-[#F8F9FA] sm:py-10 py-4 px-6 md:px-12 lg:px-24 font-sans text-slate-900">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              {/* <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight max-w-2xl leading-tight">
                Our Offerings
              </h2> */}
            </div>
          </div>

          {/* Services List */}
          <div className="flex flex-col sm:gap-24 gap-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Number Indicator */}
                <div className="md:col-span-3 flex justify-start md:justify-center">
                  <span className="text-7xl md:text-8xl lg:text-[120px] font-medium tracking-tighter text-black">
                    {service.id}
                  </span>
                </div>

                {/* Image */}
                <div className="md:col-span-4 h-[350px] md:h-[450px] w-full rounded-2xl overflow-hidden bg-gray-200 shadow-sm">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Text Content */}
                <div className="md:col-span-5 md:pl-8 lg:pl-12 flex flex-col items-start">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-black">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;