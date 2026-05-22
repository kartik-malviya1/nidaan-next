"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const location = usePathname();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at the absolute top, hide if scrolling down away from the top
      if (currentScrollY <= 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling Down
        setIsVisible(false);
        setIsOpen(false); // Auto-close mobile menu if user scrolls down
      } else {
        // Scrolling Up - Keep hidden unless you want it to reappear on scroll up.
        // For 'only visible on top', we keep this false until they hit the top threshold above.
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Stories", path: "/stories" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
    { name: "Get Involved", path: "/get-involved" },
  ];

  // Dynamic Theme Colors based on active route
  const isHomePage = location === "/";
  const baseTextColor = isHomePage ? "text-black" : "text-white";
  const hoverBgColor = isHomePage ? "hover:bg-black/5" : "hover:bg-white/10";

  // Mobile menu links variants
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05, ease: "easeOut", duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { ease: "easeIn", duration: 0.2 },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed w-full z-50 py-4 bg-transparent top-0 left-0"
    >
      <div className="px-6 lg:px-12 xl:px-24 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/logo.jpg"
            alt="Nidaan Logo"
            className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${location === link.path
                ? "underline decoration-[#fca500] underline-offset-4 decoration-2 font-semibold"
                : hoverBgColor
                } ${baseTextColor}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="btn-primary gap-2">
            Donate Now <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-colors ${baseTextColor} ${hoverBgColor}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? "close" : "open"}
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`lg:hidden w-full backdrop-blur-lg border-t overflow-hidden absolute left-0 top-full shadow-lg ${isHomePage
              ? "bg-white/95 border-black/10"
              : "bg-black/90 border-white/10"
              }`}
          >
            <div className="flex flex-col p-5 gap-1">
              {navLinks.map((link) => (
                <motion.div variants={linkVariants} key={link.name}>
                  <Link
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${location === link.path
                      ? "underline decoration-[#fca500] underline-offset-4 decoration-2 font-semibold"
                      : hoverBgColor
                      } ${baseTextColor}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={linkVariants} className="mt-2 px-2">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full py-3 flex justify-center items-center gap-2 text-center rounded-xl font-medium"
                >
                  Donate Now <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
