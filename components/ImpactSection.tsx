import React from "react";
import { motion } from "framer-motion";

const ImpactSection = () => {
  const stats = [
    { value: "500+", label: "Children Supported" },
    { value: "10k+", label: "Therapy Sessions" },
    { value: "50+", label: "Specialized Educators" },
    { value: "15+", label: "Awards & Recognition" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed image background */}
      <div className="absolute inset-0">
        <img
          src="/image_5.png"
          alt="Community impact"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="section-container relative z-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-[#FFCC00] mb-4 block">
              Our Impact
            </span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6 leading-tight">
              Creating Meaningful Change Every Day
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-12">
              Our impact extends beyond the classroom. We are building an
              inclusive society where neurodiverse individuals are empowered to
              participate confidently and independently.
            </p>

            <div className="grid grid-cols-2 gap-x-10 gap-y-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl lg:text-4xl font-display font-extrabold text-[#FFCC00] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <img
                src="/image_7.png"
                className="rounded-2xl w-full h-48 object-cover"
                alt="Children learning"
              />
              <img
                src="/image_8.png"
                className="rounded-2xl w-full h-58 object-cover"
                alt="Therapy session"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="/image_15.png"
                className="rounded-2xl w-full h-56 object-cover"
                alt="Classroom activity"
              />
              <div className="rounded-2xl bg-[#ffcc00] p-6 flex items-center justify-center h-48">
                <p className="font-display font-bold text-xl text-center text-white leading-snug italic">
                  "Making way for exceptional learners"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
