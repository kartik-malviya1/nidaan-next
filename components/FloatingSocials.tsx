"use client";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const FloatingSocials = () => {
  const socials = [
    {
      icon: <FaFacebookF size={20} />,
      url: "https://facebook.com",
      hoverColor: "text-[#1877f2]",
    },
    {
      icon: <FaInstagram size={22} />, // Slightly larger to match Facebook's visual weight
      url: "https://instagram.com",
      hoverColor: "text-[#e4405f]",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.5 }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1 p-1 bg-white border border-[#FFCB00]/30 rounded-l-2xl shadow-[0_10px_30px_-5px_rgba(255,203,0,0.2)]"
    >
      {socials.map((social, index) => (
        <motion.a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 rounded-xl text-neutral-800 transition-colors duration-300 flex items-center justify-center ${social.hoverColor}`}
        >
          {social.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default FloatingSocials;
