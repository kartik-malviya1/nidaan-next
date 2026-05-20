import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  const features = [
    "Autism Spectrum Disorder",
    "Intellectual Disabilities",
    "ADHD & Learning Disabilities",
    "Cerebral Palsy",
    "Speech & Hearing Impairments",
    "Developmental Delays",
  ];

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-12 gap-4 w-full">
              <div className="col-span-12">
                <img
                  src="/bookofrecords.png"
                  alt="Children in classroom"
                  className="w-full h-[50vh] lg:h-[80vh] object-cover rounded-2xl"
                />
              </div>
              {/* <div className="col-span-5 pt-8">
                <img
                  src="/image_10.png"
                  alt="Child therapy"
                  className="w-full h-72 object-cover rounded-2xl"
                />
              </div> */}
            </div>
            {/* Accent card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="
    absolute 
    -bottom-10 sm:-bottom-12 lg:-bottom-16
    left-3 right-3 sm:left-6 sm:right-6
    bg-white rounded-xl shadow-lg shadow-amber-200/60
    p-3 sm:p-4 lg:p-5
    border border-amber-100
    flex items-center gap-3 sm:gap-4
    max-w-[90%] sm:max-w-md
    mx-auto
  "
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <span className="text-lg sm:text-2xl">🏆</span>
              </div>

              <div>
                <p className="font-bold text-slate-900 text-xs sm:text-sm leading-tight">
                  India Book of Records
                </p>

                <p className="text-[11px] sm:text-xs text-slate-500 leading-snug">
                  Recognized for inclusive education excellence
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-4 block">
              About Nidaan
            </span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-6 leading-tight">
              Building Inclusive Futures Since 2009
            </h2>
            <p className="text-base text-slate-600 mb-8 leading-relaxed">
              Founded under Nidaan Sewa Samiti and led by{" "}
              <span className="font-semibold text-slate-800">Kala Mohan</span>,
              Nidaan has become a trusted name in inclusive education and
              rehabilitation in Madhya Pradesh, empowering children and families
              through evidence-based care.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-10 text-left inline-block lg:grid">
              {features.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#ffcc00] shrink-0" size={18} />
                  <span className="text-slate-700 text-sm font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-center lg:justify-start">
              <Link
                href="/about"
                className="btn-secondary w-full sm:w-auto gap-2 group"
              >
                Learn Our Story
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

