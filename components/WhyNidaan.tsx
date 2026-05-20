import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Brain, Activity, Users, Heart, Zap } from 'lucide-react'

const WhyNidaan = () => {
  const values = [
    {
      title: 'Inclusion',
      desc: 'Creating an environment where diversity is respected and everyone belongs.',
      icon: <Users size={24} />,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Acceptance',
      desc: 'Unconditional care and respect for every child\'s unique identity.',
      icon: <Heart size={24} />,
      color: 'bg-rose-50 text-rose-600',
    },
    {
      title: 'Sensitivity',
      desc: 'Approaching every individual and family with empathy and responsiveness.',
      icon: <Activity size={24} />,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Integrity',
      desc: 'Guided by honesty, accountability, and strong professional ethics.',
      icon: <Shield size={24} />,
      color: 'bg-violet-50 text-violet-600',
    },
    {
      title: 'Humanity',
      desc: 'Serving with kindness, humility, and deep respect for human dignity.',
      icon: <Zap size={24} />,
      color: 'bg-amber-50 text-[#F90D41]',
    },
    {
      title: 'Continuous Growth',
      desc: 'Committed to continuous learning and improvement through Kaizen philosophy.',
      icon: <Brain size={24} />,
      color: 'bg-cyan-50 text-cyan-600',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#F90D41] mb-4 block">Our Foundation</span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-black mb-4">Core Values We Live By</h2>
          <p className="text-gray-600 leading-relaxed">
            A nurturing ecosystem where every child's unique needs are met with expertise and empathy.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((val, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group p-8 rounded-2xl border border-amber-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-100/60 transition-all duration-400"
            >
              <div className={`w-12 h-12 rounded-xl ${val.color} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                {val.icon}
              </div>
              <h3 className="text-lg font-bold text-black mb-2">{val.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyNidaan
