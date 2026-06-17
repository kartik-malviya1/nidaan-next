"use client";

import { SucStory } from "@/components/SuccessStoryCard";
import { motion } from "framer-motion";
import {
  Award,
  CheckCircle,
  Users,
  Shield,
  ArrowRight,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function Stories() {
  const initiatives = [
    {
      title: "Early Developmental Assessments",
      desc: "Conducting regular screening sessions in underserved communities to identify developmental delays early and provide tailored support for children with special needs.",
      icon: <Shield size={28} className="text-[#F90D41]" />,
      image: "/assets/img37.jpeg",
    },
    {
      title: "Inclusive Education Outreach",
      desc: "Empowering families and communities through grassroots programs that advocate for inclusive education, holistic child welfare, and continuous support networks.",
      icon: <Users size={28} className="text-[#F90D41]" />,
      image: "/assets/img40.jpeg",
      locations: [
        "Damkheda",
        "Shyaam Nagar",
        "Arjun Nagar",
        "Baba Nagar",
        "Rishi Nagar",
        "Durga Nagar",
        "Ishwar Nagar",
        "Gareeb Nagar",
        "Shiv Nagar",
        "Sai Baba Nagar",
      ],
    },
  ];

  const impactStats = [
    { val: "Thousands", label: "Lives Impacted" },
    { val: "500+", label: "Screening Camps" },
    { val: "50+", label: "Schools Reached" },
    { val: "100%", label: "Transparency" },
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

      <SucStory />

      {/* Initiatives */}
      <section className="section-padding py-24 bg-amber-50">
        <div className="section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#F90D41] mb-4 block">
              Initiatives
            </span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-black mb-4">
              Community Programs
            </h2>
            <p className="text-gray-600 text-lg">
              Extending our reach beyond the classroom to support families and
              build inclusive communities.
            </p>
          </div>

          {/* Alternating Layout Cards */}
          <div className="space-y-20 lg:space-y-32 mb-24">
            {initiatives.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col gap-10 lg:gap-16 items-center ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                {/* Image Column */}
                <div className="w-full lg:w-1/2 relative group rounded-3xl overflow-hidden shadow-2xl h-[350px] lg:h-[450px]">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content Column */}
                <div className="w-full lg:w-1/2 flex flex-col">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 border border-amber-100">
                    {item.icon}
                  </div>

                  <h3 className="font-display font-bold text-black text-3xl mb-4">
                    {item.title}
                  </h3>

                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {item.desc}
                  </p>

                  {/* Communities Served */}
                  {item.locations && (
                    <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm">
                      <h4 className="text-xs font-bold text-gray-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                        <MapPin size={16} className="text-[#F90D41]" />
                        Communities We Serve
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {item.locations.map((loc, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-100 rounded-lg text-sm font-medium hover:bg-amber-100 transition-colors cursor-default"
                          >
                            {loc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA: Annual Reports */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white rounded-3xl p-10 lg:p-14 border border-amber-100 shadow-xl max-w-7xl mx-auto relative overflow-hidden">
              {/* Subtle top border gradient for visual flair */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FFCC00] to-[#F90D41]"></div>

              <h3 className="text-2xl lg:text-3xl font-display font-bold text-black mb-4">
                Discover Our Journey & Impact
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Explore our annual reports to see detailed insights into our
                organizational achievements, outreach programs, and the
                incredible success stories of the children we serve.
              </p>
              <Link
                href="/annual-reports"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FFCC00] text-black font-bold rounded-full hover:bg-[#F90D41] hover:text-white hover:scale-105 transition-all duration-300"
              >
                View Annual Reports
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
