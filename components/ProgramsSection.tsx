import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Stethoscope, Brain, Zap, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const ProgramsSection = () => {
  const programs = [
    {
      title: "Education & Skills",
      desc: "NIOS support, special education, and vocational training for independence.",
      icon: <BookOpen />,
      image: "/therapy7.png",
    },
    {
      title: "Therapeutic Services",
      desc: "Occupational, speech, and sensory integration therapies under one roof.",
      icon: <Stethoscope />,
      image: "/therapy2.png",
    },
    {
      title: "Psychological Services",
      desc: "Psychometric assessments, ABA therapy, and emotional counseling for families.",
      icon: <Brain />,
      image: "/therapy3.png",
    },
    {
      title: "Enrichment Activities",
      desc: "Music, dance, theatre, and sports to foster confidence and social skills.",
      icon: <Zap />,
      image: "/therapy4.png",
    },
  ];

  return (
    <section className="section-padding bg-amber-50">
      <div className="section-container">
        
        {/* Header with Top Right Button Alignment */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-4 block">
              What We Offer
            </span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">
              Specialized Programs
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Tailored developmental pathways designed to unlock every child's
              potential through evidence-based practices.
            </p>
          </div>
          
          {/* Top Right "All Programs" Button */}
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-black/80 transition-colors shrink-0 shadow-sm"
          >
            All Programs
            <div className="bg-amber-400 text-slate-900 rounded-full p-1 flex items-center justify-center">
              <ArrowUpRight size={14} strokeWidth={3} />
            </div>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex flex-col bg-white rounded-3xl border border-amber-100 hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-200/40 transition-all duration-500"
            >
              {/* Image Container - Inset design with taller height */}
              <div className="relative h-64 lg:h-72 w-full p-3 pb-0">
                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center shadow-sm transform group-hover:scale-105 transition-transform duration-300">
                    {React.cloneElement(prog.icon, {
                      size: 20,
                      className: "text-amber-600",
                    })}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-slate-900 text-xl mb-3 group-hover:text-amber-600 transition-colors">
                  {prog.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow">
                  {prog.desc}
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 group-hover:text-amber-600 transition-colors w-fit"
                >
                  Learn more 
                  <ArrowUpRight 
                    size={16} 
                    className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;