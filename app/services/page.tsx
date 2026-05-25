"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const Services = () => {
  // Service data extracted directly from the NIDAAN document with precise citations
  const services = [
    {
      id: "01",
      title: "Education & Skill Development",
      description:
        "We provide individualized educational and developmental programs designed to enhance learning, independence, and overall skill development across all age groups.",
      image: "/therapy6.png",
      details: [
        { label: "Early Intervention", desc: "Structured developmental support in early years to strengthen communication, behavior, and foundational learning skills." },
        { label: "Remedial Education", desc: "Tailored academic support for children experiencing learning difficulties to bridge educational gaps." },
        { label: "NIOS Support ", desc: "Academic coaching and guidance for students enrolled in the National Institute of Open Schooling (NIOS)." },
        { label: "Vocational Training ", desc: "Skill-based training programs that promote independence and improve future employability." },
        { label: "Special Education", desc: "Customized teaching strategies designed to meet the unique learning needs of neurodiverse children." },
        { label: "Life & Soft Skills Training ", desc: "Programs focused on developing communication, social interaction, self-care, and essential daily living skills." }
      ]
    },
    {
      id: "02",
      title: "Therapeutic Services",
      description:
        "Our therapeutic interventions are designed to enhance functional abilities, communication skills, sensory processing, and overall quality of life.",
      image: "/therapy2.png",
      details: [
        { label: "Speech Therapy", desc: "Supports the development of speech, language, communication, and social interaction skills."},
        { label: "Occupational Therapy ", desc: "Focuses on improving sensory processing, motor coordination, cognitive abilities, and daily living skills." },
        { label: "Physiotherapy", desc: "Aims to improve mobility, balance, strength, and overall physical functioning through rehabilitation." },
        { label: "Music & Movement Therapy ", desc: "Uses creative expression to promote emotional well-being, engagement, and social interaction." },
        { label: "Sensory Integration ", desc: "Provides structured sensory experiences to enhance attention, self-regulation, and adaptive responses." }
      ]
    },
    {
      id: "03",
      title: "Psychological Services",
      description:
        "We offer evidence-based psychological interventions aimed at supporting emotional well-being, behavioral development, and adaptive functioning.",
      image: "/therapy3.png",
      details: [
        { label: "Psychometric Assessments", desc: "Comprehensive evaluations to understand cognitive, developmental, and behavioral profiles." },
        { label: "ABA Therapy ", desc: "Structured behavioral interventions designed to enhance communication, learning, and adaptive skills." },
        { label: "Behavior Therapy", desc: "Positive behavior support techniques to address challenges and encourage appropriate behaviors." },
        { label: "Counselling Services", desc: "Emotional and psychological support for children, adolescents, and their families." }
      ]
    },
    {
      id: "04",
      title: "Enrichment & Recreational Activities",
      description:
        "Our enrichment programs are designed to foster creativity, confidence, social engagement, and overall holistic development.",
      image: "/therapy4.png",
      details: [
        { label: "Pre-Vocational Training", desc: "Foundational skill-building activities that prepare individuals for vocational readiness and independent living." },
        { label: "Music, Dance & Theatre", desc: "Creative expression platforms that build confidence, enhance communication, and encourage teamwork." },
        { label: "Art & Creativity Programs", desc: "Activities that promote imagination, self-expression, and artistic development." },
        { label: "Grooming & Social Skills", desc: "Sessions focused on personality development, confidence building, and social etiquette." },
        { label: "Sports & Outdoor Activities ", desc: "Physical and recreational programs that encourage fitness, coordination, teamwork, and active participation." },
        { label: "Educational Visits & Field Trips ", desc: "Experiential learning opportunities that encourage community exposure and practical learning." }
      ]
    }
  ];

  // Helper to remove citation brackets visually

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-24 overflow-hidden font-sans">
        <div className="absolute inset-0">
          <img
            src="/image_18.png" 
            alt="Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/85"></div>
        </div>
        
        <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-12 lg:px-30">
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
            <p className="text-md text-white/70">
              Tailored therapeutic, educational, and rehabilitation services designed for unique developmental needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-[#F8F9FA] py-16 md:py-24 px-6 md:px-12 lg:px-24 font-sans text-slate-900">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col gap-20 lg:gap-32">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="flex flex-col lg:flex-row gap-10 lg:gap-16 border-b border-gray-200 pb-20 last:border-0 last:pb-0"
              >
                
                {/* Left Side: Sticky Information & Image */}
                <div className="lg:w-5/12">
                  <div className="lg:sticky lg:top-32 flex flex-col items-start">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-5xl md:text-6xl font-bold text-gray-300 tracking-tighter leading-none">
                        {service.id}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                        {service.title}
                      </h2>
                    </div>
                    
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                      {service.description}
                    </p>

                    <div className="w-full h-64 md:h-80 lg:h-72 rounded-2xl overflow-hidden shadow-md">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side: Scrollable Details Grid */}
                <div className="lg:w-7/12 pt-4 lg:pt-0">
                  <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                    {service.details.map((detail, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-100 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                          <CheckCircle2 size={20} className="text-amber-500" />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2 text-lg">
                          {detail.label}
                        </h4>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {detail.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
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