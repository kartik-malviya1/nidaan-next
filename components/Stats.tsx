import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Activity, Users, Award, ShieldCheck } from 'lucide-react'

const Stats = () => {
  const highlights = [
    { icon: <BookOpen size={22} />, text: 'Inclusive Education' },
    { icon: <Activity size={22} />, text: 'Multi-Sensory Therapy' },
    { icon: <Users size={22} />, text: 'Parent Support' },
    { icon: <Award size={22} />, text: 'India Book of Records' },
    { icon: <ShieldCheck size={22} />, text: 'BPL Family Support' },
  ]

  return (
    <section className="relative z-20 ">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="-mt-12 bg-white rounded-2xl shadow-xl shadow-amber-200/50 border border-amber-100 py-8 px-6 lg:px-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {highlights.map((item, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#F90D41] shrink-0 transition-transform group-hover:scale-110">
                  {item.icon}
                </div>
                <span className="text-sm font-semibold text-gray-700 leading-tight">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Stats
