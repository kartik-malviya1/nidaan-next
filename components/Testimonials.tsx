// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const Testimonials = () => {
  // Your base testimonials
  const baseTestimonials = [
    {
      text: "There is a significant improvement in Shivansh's eye contact and sitting tolerance. He has also started communicating his needs.",
      author: "Shivansh’s Father",
    },
    {
      text: "My child is very happy and comfortable going to school. He is eager to learn more, the teachers and staff are very supportive.",
      author: "Annirudh's Parents",
    },
    {
      text: "My child is very happy and comfortable going to school. He is eager to learn more, the teachers and staff are very supportive.",
      author: "Isha’s Parents",
    },
    {
      text: "Nidaan has given a beautiful and secure environment to my child where he learns while playing and does it with joy. Special thanks to all the teachers and therapists.",
      author: "Yuvaan’s Mother",
    },
    {
      text: "Akshat has shown great progress in his fine motor skills and speech. He is now more interactive and loves coming to Nidaan. Thank you to the entire team for their dedication.",
      author: "Akshat Tiwari’s Mother",
    },
    {
      text: "Nidaan has helped Rudransh become more independent in his daily routine. The staff is very cooperative and handles children with immense love and care.",
      author: "Rudransh Rana’s Mother",
    },
    {
      text: "We are quite satisfied and have seen good improvement's in our child's behaviour.",
      author: "Veer's Parents",
    }
  ]

  /// Duplicate for the infinite loop
  const scrollingTestimonials = [...baseTestimonials, ...baseTestimonials]

  const scrollContainerRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

  // Drag state variables
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Auto-scroll loop
  useEffect(() => {
    let animationId;
    const scroll = () => {
      const container = scrollContainerRef.current
      if (container && !isPaused && !isDragging) {
        container.scrollLeft += 0.8; // Adjust auto-scroll speed here (lower = slower)

        // Seamless infinite loop: snap back to start when reaching the middle
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationId)
  }, [isPaused, isDragging])

  // --- Mouse Drag Handlers ---
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    setIsPaused(false) // Resume auto-scroll when mouse leaves entirely
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2 // Drag sensitivity multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <section className="relative w-full max-w-full mx-auto sm:h-[100vh] bg-[#ffcc00]/95 brightness-90 flex flex-col py-12 overflow-hidden select-none">

      {/* --- Decorative Grid Dots --- */}
      <div className="absolute top-6 right-6 grid grid-cols-5 gap-y-3 gap-x-2 opacity-70">
        {[...Array(25)].map((_, i) => (
          <div key={`tr-${i}`} className="w-1 h-1 bg-white rounded-full" />
        ))}
      </div>
      <div className="absolute bottom-6 right-6 grid grid-cols-5 gap-y-3 gap-x-2 opacity-70">
        {[...Array(25)].map((_, i) => (
          <div key={`br-${i}`} className="w-1 h-1 bg-white rounded-full" />
        ))}
      </div>
      <div className="absolute bottom-6 left-6 grid grid-cols-5 gap-y-3 gap-x-2 opacity-70">
        {[...Array(25)].map((_, i) => (
          <div key={`bl-${i}`} className="w-1 h-1 bg-white rounded-full" />
        ))}
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 flex flex-col items-center">
        {/* --- Header: Title Layout --- */}
        <div className="w-full flex flex-col sm:flex-row mx-auto items-center justify-between gap-6 mb-12 relative z-10">
          <div className="text-center sm:text-center font-serif mx-auto sm:mx-[30%] ">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-widest leading-tight block">
              PARENT
            </h2>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-widest leading-tight block">
              TESTIMONIAL
            </h2>
          </div>
          <div className="hidden sm:block w-[120px]"></div>
        </div>
      </div>

      {/* --- Interactive Scrolling Marquee --- */}
      <div className="relative w-full py-10">
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-8 md:gap-12 w-full px-4 overflow-x-auto [&::-webkit-scrollbar]:hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar in Firefox/IE
        >
          {scrollingTestimonials.map((t, index) => (
            <div
              key={index}
              className="relative w-[320px] md:w-[480px] shrink-0 flex flex-col items-center group pb-10"
            >
              {/* Main Bubble Box */}
              <div className="relative w-full h-[320px] md:h-[300px] bg-[#ffffff] rounded-[2.5rem] p-8 md:p-10 z-10 flex flex-col justify-start">
                <h3 className="text-xl md:text-2xl font-bold text-[#3A3A3A] font-sans mb-2">
                  {t.author}
                </h3>

                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={20} fill="#E2B13C" className="text-[#E2B13C]" />
                  ))}
                </div>

                <p className="text-[#1A1A1A] text-base md:text-lg leading-relaxed font-normal font-sans line-clamp-6">
                  {t.text}
                </p>

                {/* --- Rounded Speech Bubble Arrow --- */}
                <div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#ffffff] rotate-45 rounded-br-xl -z-10"
                />
              </div>

              {/* Shadow specific to each individual bubble */}
              <div className="w-[70%] h-5 bg-black/20 rounded-[100%] blur-[8px] mt-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials