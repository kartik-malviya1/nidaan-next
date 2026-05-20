import React from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Building2,
  ClipboardList,
  MapPin,
  Globe2,
  Trophy,
  Quote,
} from "lucide-react";

const timelineData = [
  {
    year: "2013",
    title: "NIDAAN Founded",
    icon: <Leaf className="w-4 h-4 text-white" />,
    description:
      "Rtn. Kala Mohan established NIDAAN Sewa Samiti in Bhopal with a vision for inclusive care for children with special needs.",
  },
  {
    year: "2015",
    title: "Therapy Centre Launched",
    icon: <Building2 className="w-4 h-4 text-white" />,
    description:
      "Opened dedicated therapy services including Speech, Occupational, and Physiotherapy under one roof in Bhopal.",
  },
  {
    year: "2017",
    title: "NIRT Established",
    icon: <ClipboardList className="w-4 h-4 text-white" />,
    description:
      "The NIDAAN Institute of Rehabilitation and Training (NIRT) was formalized, expanding the scope of multidisciplinary services.",
  },
  {
    year: "2019",
    title: "Indore Centre Opens",
    icon: <MapPin className="w-4 h-4 text-white" />,
    description:
      "NIDAAN expanded to Indore, bringing specialized rehabilitation, therapy, and inclusive education to Central MP.",
  },
  {
    year: "2021",
    title: "Community Outreach Grows",
    icon: <Globe2 className="w-4 h-4 text-white" />,
    description:
      "Launched large-scale awareness campaigns and screening camps targeting underserved communities for early identification.",
  },
  {
    year: "2025",
    title: "12 Years of Impact",
    icon: <Trophy className="w-4 h-4 text-white" />,
    description:
      "Celebrating 12 years of serving 500+ children with a dedicated multidisciplinary team across two vibrant centres.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const leafVariants = (direction) => ({
  hidden: { opacity: 0, x: direction === "left" ? -25 : 25, y: 10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
});

const Journey = () => {
  return (
    <div className="bg-[#FEFEFE] text-gray-900 overflow-hidden">
      {/* Tree Timeline Section */}
      <section id="journey" className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[#FFCC00]/20 text-[#D4A000] text-xs font-bold uppercase tracking-wider mb-2">
            Our History
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            12 Years of <span className="text-[#F90D41]">Transformation</span>
          </h2>
        </motion.div>

        {/* The Tree Trunk System */}
        <div className="relative">
          {/* Main Vertical Trunk Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFCC00] via-[#F90D41] to-[#FFCC00] -translate-x-1/2 rounded-full z-0" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative space-y-8"
          >
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start md:items-center relative w-full"
                >
                  {/* LEFT SIDE BRANCH (Desktop Only) */}
                  <div className="hidden md:block w-1/2 pr-8 text-right">
                    {isEven && (
                      <motion.div
                        variants={leafVariants("left")}
                        className="inline-block max-w-sm bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <span className="text-xs font-bold text-[#F90D41] bg-[#F90D41]/10 px-2 py-0.5 rounded-full">
                          {item.year}
                        </span>
                        <h4 className="font-bold text-gray-950 mt-1.5 text-base">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* CENTRAL NODE DOT */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#F90D41] border-4 border-white shadow-md z-10">
                    {item.icon}
                  </div>

                  {/* RIGHT SIDE BRANCH (Desktop Right / Mobile All) */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-8 text-left">
                    {/* 1. Mobile view container: Always visible on mobile, hidden on desktop for even nodes */}
                    <div className={isEven ? "block md:hidden" : "block"}>
                      <motion.div
                        variants={leafVariants("right")}
                        className="inline-block max-w-sm bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <span className="text-xs font-bold text-[#F90D41] bg-[#F90D41]/10 px-2 py-0.5 rounded-full">
                          {item.year}
                        </span>
                        <h4 className="font-bold text-gray-950 mt-1.5 text-base">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Founder Segment */}
      <section className="py-16 px-4 bg-[#FFCC00]/5 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 text-[#F90D41] text-xs font-bold uppercase tracking-wider mb-4">
            <Quote className="w-3.5 h-3.5" /> Founder&apos;s Message
          </div>
          <blockquote className="text-base md:text-lg text-gray-700 italic leading-relaxed mb-6 font-medium">
            &ldquo;Every child, regardless of their abilities or challenges,
            carries within them a spark of potential waiting to be kindled. At
            NIDAAN, we walk alongside families on their journey, building a
            world where every child is seen, valued, and empowered to
            thrive.&rdquo;
          </blockquote>
          <div className="h-0.5 w-8 bg-[#F90D41] mx-auto mb-3" />
          <h4 className="text-lg font-bold text-gray-900">Rtn. Kala Mohan</h4>
          <p className="text-xs font-semibold text-[#D4A000]">
            Founder & President, NIDAAN Sewa Samiti
          </p>
        </div>
      </section>
    </div>
  );
};

export default Journey;
