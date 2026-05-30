"use client"
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import AboutSection from "../components/AboutSection";
import Journey from "../components/Journey";
import CaseStudies from "../components/CaseStudies";
import ProgramsSection from "../components/ProgramsSection";
import WhyNidaan from "../components/WhyNidaan";
import ImpactSection from "../components/ImpactSection";
import Testimonials from "../components/Testimonials";


export default function Home() {
  return (
    <div>
      <Hero />
      {/* <Stats /> */}
      <AboutSection />
      <Journey />
      {/* <CaseStudies /> */}
      <ProgramsSection />
      <WhyNidaan />
      <ImpactSection />
      <Testimonials />

      {/* CTA Banner */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl"
          >
            {/* Background */}
            <div className="absolute inset-0">
              <img
                src="/image_10.png"
                alt="Community together"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60"></div>
            </div>

            <div className="relative z-10 p-12 lg:p-20 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6 leading-tight">
                Together, We Can Build a More{" "}
                <span className="text-[#FFCC00]">Inclusive</span> Future
              </h2>
              <p className="text-white/60 text-base mb-10 leading-relaxed max-w-xl mx-auto">
                Every contribution helps a child access therapy, education,
                confidence, and opportunity.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact"
                  className="btn-primary w-full sm:w-auto gap-2 text-base px-8 py-3.5"
                >
                  Donate Now
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/get-involved"
                  className="btn-white w-full sm:w-auto gap-2 text-base px-8 py-3.5"
                >
                  Become a Volunteer
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
