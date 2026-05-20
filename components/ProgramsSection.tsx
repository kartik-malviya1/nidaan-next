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
      image: "/image_17.png",
    },
    {
      title: "Therapeutic Services",
      desc: "Occupational, speech, and sensory integration therapies under one roof.",
      icon: <Stethoscope />,
      image: "/image_4.png",
    },
    {
      title: "Psychological Services",
      desc: "Psychometric assessments, ABA therapy, and emotional counseling for families.",
      icon: <Brain />,
      image: "/photo-7.jpg",
    },
    {
      title: "Enrichment Activities",
      desc: "Music, dance, theatre, and sports to foster confidence and social skills.",
      icon: <Zap />,
      image: "/image_19.png",
    },
  ];

  return (
    <section className="section-padding bg-amber-50">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
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

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-white rounded-2xl overflow-hidden border border-amber-100 hover:shadow-xl hover:shadow-amber-200/50 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={prog.image}
                  alt={prog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
                  {React.cloneElement(prog.icon, {
                    size: 20,
                    className: "text-amber-600",
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-amber-700 transition-colors">
                  {prog.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  {prog.desc}
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 group-hover:gap-2 transition-all"
                >
                  Learn more <ArrowUpRight size={14} />
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
