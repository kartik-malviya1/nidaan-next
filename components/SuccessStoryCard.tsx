import React, { useState, useEffect, useRef } from 'react';

interface SuccessStoryCardProps {
  name: string;
  imageSrc: string;
  description: string;
}

// Reusable component for the exact 5-petal Flaticon-style flower
const FlowerIcon = ({ color, className }: { color: string; className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={color}>
        {/* 5 Overlapping Petals */}
        <circle cx="50" cy="22" r="22" />
        <circle cx="77" cy="41" r="22" />
        <circle cx="66" cy="71" r="22" />
        <circle cx="34" cy="71" r="22" />
        <circle cx="23" cy="41" r="22" />
      </g>
      {/* Off-white Center */}
      <circle cx="50" cy="50" r="14" fill="#FDF7E3" />
    </svg>
  );
};

// Perfect mathematically calculated 6-petal flower mask
const flowerMaskUrl = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='3.35 0 93.3 100'%3E%3Ccircle cx='50' cy='25' r='25'/%3E%3Ccircle cx='71.65' cy='37.5' r='25'/%3E%3Ccircle cx='71.65' cy='62.5' r='25'/%3E%3Ccircle cx='50' cy='75' r='25'/%3E%3Ccircle cx='28.35' cy='62.5' r='25'/%3E%3Ccircle cx='28.35' cy='37.5' r='25'/%3E%3Ccircle cx='50' cy='50' r='25'/%3E%3C/svg%3E")`;

export function SuccessStoryCard({
  name,
  imageSrc,
  description,
}: SuccessStoryCardProps) {
  return (
    <div className="relative w-full h-full  mx-auto bg-[#FDFBF7] p-8 sm:p-10 pb-12 rounded-3xl shadow-sm border border-gray-100 font-sans pointer-events-none flex flex-col items-center">

      {/* --- Decorative Background Doodles --- */}
      <svg className="absolute top-6 left-6 sm:w-10 sm:h-10 w-6 h-6 text-[#46D2D2]" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M25 5 L29 18 L43 18 L32 26 L36 40 L25 32 L14 40 L18 26 L7 18 L21 18 Z" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
      </svg>
      <svg className="absolute top-6 right-5 sm:w-10 sm:h-10 w-6 h-6 text-[#46D2D2]" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M25 5 L29 18 L43 18 L32 26 L36 40 L25 32 L14 40 L18 26 L7 18 L21 18 Z" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
      </svg>

      <svg className="absolute top-44 right-0 w-16 h-40 z-0" viewBox="0 0 50 100">
        <path d="M25 10 L25 30 M15 15 L35 25 M15 25 L35 15" stroke="#FFB067" strokeWidth="4" strokeLinecap="round" />
        <path d="M20 50 L40 45 M25 70 L45 65 M15 90 L35 95" stroke="#46D2D2" strokeWidth="6" strokeLinecap="round" />
      </svg>

      {/* --- Main Content Top --- */}
      <div className="relative z-10 flex flex-col items-center mt-2 w-full shrink-0">
        <h2
          className="text-[#46D2D2] text-3xl sm:text-4xl md:text-5xl font-black tracking-wide uppercase drop-shadow-sm text-center mb-5"
          style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.05)', fontFamily: '"Fredoka One", "Comic Sans MS", sans-serif' }}
        >
          Success Story
        </h2>

        <div className="bg-[#46D2D2] text-white px-8 py-2 rounded-full text-xl sm:text-2xl font-bold uppercase tracking-wider mb-4 relative">
          {name}
          <div className="absolute right-2 -bottom-0.5 w-4 h-4 bg-[#46D2D2] transform rotate-21"></div>
        </div>
      </div>

      {/* --- Image with Perfect 6-Petal Mask --- */}
      {/* Smaller, balanced size with no negative margin so it never overlaps the box below */}
      <div className="relative w-56 h-56 sm:w-52 sm:h-52 md:w-66 md:h-66 flex items-center justify-center z-20 pointer-events-auto mb-4 sm:mb-2 shrink-0">
        <div
          className="w-full h-full bg-gray-200"
          style={{
            WebkitMaskImage: flowerMaskUrl,
            WebkitMaskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskImage: flowerMaskUrl,
            maskSize: '100% 100%',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
          }}
        >
          <img
            src={imageSrc}
            alt={`${name}'s Success Story`}
            className="w-full h-full object-cover select-none pointer-events-none"
            draggable="false"
          />
        </div>
      </div>

      {/* --- Description Box Area (Grows cleanly to keep cards equal height) --- */}
      <div className="relative w-full grow flex flex-col">

        {/* Splashes and Decorations */}
        <svg className="absolute top-0 -left-6 sm:-left-8 w-20 h-20 sm:w-20 sm:h-20 text-[#46D2D2] z-0" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
          <line x1="45" y1="35" x2="20" y2="15" />
          <line x1="30" y1="50" x2="10" y2="40" />
          <line x1="35" y1="70" x2="10" y2="75" />
        </svg>

        <svg className="absolute -bottom-6 -right-4 sm:-right-6 w-20 h-20 sm:w-20 sm:h-24 text-[#46D2D2] z-0" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
          <line x1="55" y1="65" x2="80" y2="85" />
          <line x1="70" y1="50" x2="90" y2="60" />
          <line x1="65" y1="30" x2="90" y2="25" />
        </svg>


        {/* The Cyan Box Container */}
        {/* Normal balanced padding now, since the image no longer overlaps into the box */}
        <div className="bg-[#46D2D2] grow flex items-center justify-center text-white rounded-[2rem] py-2 px-2 sm:px-8 text-center w-full shadow-sm relative z-10 pointer-events-auto">
          <p
            className="text-[12px] sm:text-[16px] text-white font-bold uppercase leading-[1.6] tracking-wider"
            style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}
          >
            {description}
          </p>
        </div>
      </div>

    </div>
  );
}

// Data array for the carousel
const storiesData = [
  {
    id: 1,
    name: "Steven",
    imageSrc: "/Steven.png",
    description: "Congratulations for securing admission in Queen Mary Higher Secondary School Bhopal successfully completed his session and now is in class 2."
  },
  {
    id: 2,
    name: "Parath Jhonjhare",
    imageSrc: "/Parth.png",
    description: "Congratulations on your admission in Kendriya Vidhyalay 3 Bhopal. Parth is now a Student of Class 2"
  },
  {
    id: 3,
    name: "Shivansh Yadav",
    imageSrc: "/Shivansh.png",
    description: "Congradulations For Securing Admission in Sheel Public School Higher Secondary School (Nursery)."
  },
  {
    id: 4,
    name: "Abhimanyu Surendram",
    imageSrc: "/Abhimanyu1.png",
    description: "Complete Graduation With Gold Medal."
  },
  {
    id: 5,
    name: "Virat Saini",
    imageSrc: "/Saini.png",
    description: "Congradulations For Securing Admission in Kiddies Paradise For Session 2025-2026, Kendriya Vidhyalay Sagar For 2026-2027."
  }
];

export function SucStory() {
  const scrollingStories = [...storiesData, ...storiesData];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    let animationId: number;
    const scroll = () => {
      const container = scrollContainerRef.current;
      if (container && !isPaused && !isDragging) {
        container.scrollLeft += 0.8;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (scrollContainerRef.current) {
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="relative w-full max-w-full mx-auto bg-gray-50 flex flex-col py-8 overflow-hidden select-none">
      <div className="relative w-full pt-4">
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex items-stretch gap-8 md:gap-12 w-full px-6 overflow-x-auto [&::-webkit-scrollbar]:hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {scrollingStories.map((story, index) => (
            <div
              key={`${story.id}-${index}`}
              className="relative w-[380px] sm:w-[450px] md:w-[490px] shrink-0 flex flex-col group pb-10"
            >
              <SuccessStoryCard
                name={story.name}
                imageSrc={story.imageSrc}
                description={story.description}
              />

              <div className="w-[70%] h-5 mx-auto bg-black/10 rounded-[100%] blur-sm mt-8" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}