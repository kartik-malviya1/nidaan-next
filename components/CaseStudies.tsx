"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const cases = [
  {
    name: "Arjun, Age 4",
    challenge:
      "Non-verbal autism with severe sensory aversion. Arjun could not tolerate physical touch, screamed at any loud noise, and had no functional communication at 4 years old.",
    intervention:
      "Intensive ABA therapy (20hrs/week) combined with Sensory Integration and Speech Therapy using PECS (Picture Exchange Communication System) over 18 months.",
    transformation:
      "Arjun began using 3-word sentences at 14 months into therapy. He now attends mainstream school with support, has friends, and participates in art class. He asks for hugs.",
    testimonial:
      '"I was told my son would never speak. Today he told me he loves me. I cannot describe what that means. Carenest did not just help Arjun — they rebuilt our entire family\'s hope."',
    parent: "Meena, Arjun's Mother",
    beforeImg:
      "https://media.base44.com/images/public/6a0b172a31910349439bd3b6/bd64a9c06_generated_image.png",
    afterImg:
      "https://media.base44.com/images/public/6a0b172a31910349439bd3b6/6a3730fe4_generated_image.png",
    tags: ["Autism", "ABA Therapy", "Speech Therapy", "Sensory Integration"],
    duration: "18 months",
    outcome: "Mainstream school integration",
  },
  {
    name: "Priya, Age 7",
    challenge:
      "Cerebral palsy with limited mobility on her right side. Priya could not hold a pencil, climb stairs, or participate in physical education. She was withdrawn and avoided school.",
    intervention:
      "Physiotherapy and Occupational Therapy 4x per week, combined with Special Education support and individual counseling for self-esteem and school anxiety.",
    transformation:
      "After 12 months, Priya can write legibly with her right hand, independently climbs stairs, and participated in her school's Sports Day. She won a drawing competition.",
    testimonial:
      '"The OT and physio team were extraordinary. They treated Priya not as a patient but as a child with a future. She smiles at school now. That was something I never thought I\'d see."',
    parent: "Sunita, Priya's Mother",
    beforeImg:
      "https://media.base44.com/images/public/6a0b172a31910349439bd3b6/9b877165c_generated_image.png",
    afterImg:
      "https://media.base44.com/images/public/6a0b172a31910349439bd3b6/fcf2b801b_generated_image.png",
    tags: ["Cerebral Palsy", "Physiotherapy", "Occupational Therapy"],
    duration: "12 months",
    outcome: "Full physical independence in school",
  },
  {
    name: "Ravi, Age 16",
    challenge:
      "Intellectual disability with aggressive behavioural challenges. Ravi had never been enrolled in formal education, faced social isolation, and his family had lost hope for his future.",
    intervention:
      "Special Education with a tailored NIOS curriculum, Life Skills training, Vocational Training (baking & printing), and group social skills therapy.",
    transformation:
      "Ravi passed his Class 10 NIOS board exam. He now runs a small tiffin service from home, earns income, and teaches younger children at our centre as a junior volunteer.",
    testimonial:
      '"People wrote Ravi off his entire life. Carenest saw his potential when nobody else did. He is proud of himself today. A father cannot ask for anything more than that."',
    parent: "Rajesh, Ravi's Father",
    beforeImg:
      "https://media.base44.com/images/public/6a0b172a31910349439bd3b6/80bc8cd72_generated_image.png",
    afterImg:
      "https://media.base44.com/images/public/6a0b172a31910349439bd3b6/65609394d_generated_image.png",
    tags: [
      "Intellectual Disability",
      "NIOS",
      "Vocational Training",
      "Life Skills",
    ],
    duration: "24 months",
    outcome: "Board certification + self-employment",
  },
];

export default function CaseStudies() {
  const [idx, setIdx] = useState(0);
  const c = cases[idx];

  return (
    <section
      id="case-studies"
      className="py-20 md:py-36 bg-[#100808] mt-14 text-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-sm text-white/40 font-medium tracking-widest uppercase">
              Case Studies
            </span>
            <h2 className="font-sans text-4xl text-white md:text-5xl lg:text-6xl mt-5 leading-tight">
              Before & After:
              <br className="hidden md:block" /> Stories of Transformation
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIdx((idx - 1 + cases.length) % cases.length)}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-white/40">
              {idx + 1} / {cases.length}
            </span>
            <button
              onClick={() => setIdx((idx + 1) % cases.length)}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
          >
            {/* Left: Images + tags */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-2 font-medium">
                    Before
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                    <img
                      src={c.beforeImg}
                      alt="Before"
                      className="w-full h-full object-cover filter grayscale"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#ffcc00] uppercase tracking-wider mb-2 font-medium">
                    After
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                    <img
                      src={c.afterImg}
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-white/10 text-white/70 text-xs rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl p-4">
                  <div className="text-xs text-white/40 mb-1">Duration</div>
                  <div className="text-sm font-semibold">{c.duration}</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <div className="text-xs text-white/40 mb-1">Key Outcome</div>
                  <div className="text-sm font-semibold">{c.outcome}</div>
                </div>
              </div>
            </div>

            {/* Right: Narrative */}
            <div className="flex flex-col gap-8 justify-center">
              <h3 className="font-serif text-2xl text-white md:text-3xl">
                {c.name}
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-0.5 bg-brandRed" />
                    <span className="text-xs font-bold uppercase tracking-widest text-brandRed">
                      Challenge
                    </span>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {c.challenge}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-0.5 bg-[#de5212]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#de5212]">
                      Intervention
                    </span>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {c.intervention}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-0.5 bg-[#128999]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#86cbd0]">
                      Transformation
                    </span>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {c.transformation}
                  </p>
                </div>
              </div>

              {/* Testimonial */}
              <div className="border-l-2 border-[#ffcc00] pl-5 mt-2">
                <Quote className="w-5 h-5 text-[#ffcc00] mb-3 opacity-60" />
                <p className="text-base italic text-white/75 leading-relaxed">
                  {c.testimonial}
                </p>
                <p className="text-xs text-white/40 mt-3 font-medium uppercase tracking-wider">
                  — {c.parent}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {cases.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-[#ffcc00]" : "w-2.5 bg-white/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
