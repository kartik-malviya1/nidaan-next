import React from 'react'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    {
      text: "Nidaan transformed our child's communication skills and confidence. The support we received as parents was equally valuable.",
      author: 'Parent of Arjun',
      role: 'Bhopal Center',
      image: '/assets/img13.jpeg',
    },
    {
      text: "The therapies and personalized attention gave our child a completely new direction. We are forever grateful to the team.",
      author: 'Meera Sharma',
      role: 'Indore Center',
      image: '/assets/img14.jpeg',
    },
    {
      text: "A truly inclusive space where every child is treated with dignity. The progress we see every month is remarkable.",
      author: 'Rajesh Kumar',
      role: 'Parent',
      image: '/assets/img15.jpeg',
    },
  ]

  return (
    <section className="section-padding bg-amber-50">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#F90D41] mb-4 block">Testimonials</span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-black mb-4">
            Stories From Our Families
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Hear from families who have experienced the Nidaan difference.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-amber-100 hover:shadow-lg hover:shadow-amber-100/60 transition-all duration-400 relative"
            >
              <Quote className="text-gray-100 mb-4" size={32} />

              <div className="flex gap-1 mb-5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} fill="#f59e0b" className="text-[#FFCC00]" />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-8">"{t.text}"</p>

              <div className="flex items-center gap-3 pt-5 border-t border-amber-50">
                <img
                  src={t.image}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-black text-sm">{t.author}</h4>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
