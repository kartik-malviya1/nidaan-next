import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Media", path: "/stories" },
    { name: "Gallery", path: "/gallery" },
    { name: "Annual Reports", path: "/annual-reports" },
    { name: "Donate", path: "/donate" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    "Early Intervention",
    "Speech Therapy",
    "Occupational Therapy",
    "Special Education",
    "Vocational Training",
  ];

  return (
    <footer className="bg-black text-white border-t border-[#FFCC00]/20">
      {/* Main footer */}
      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link href="/" className="inline-block mb-6">
              <img
                src="/logo.jpg"
                alt="Nidaan Logo"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Where Every Potential Unfolds — Together We Strive, Together We Thrive.
            </p>
            <div className="flex gap-3">
              {[
                {
                  icon: <FacebookIcon />,
                  href: "https://facebook.com",
                },
                {
                  icon: <InstagramIcon />,
                  href: "https://instagram.com",
                },
                {
                  icon: <YoutubeIcon />,
                  href: "https://youtube.com",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#ffcc00] hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-sm hover:text-[#ffcc00] transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm mb-5">Our Services</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="text-sm hover:text-[#ffcc00] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
         <div className="lg:col-span-3">
  <h4 className="text-white font-bold text-sm mb-5">Contact</h4>
  <ul className="space-y-4">
    
    {/* Bhopal Location */}
    <li className="flex gap-3 items-start">
      <MapPin className="text-[#ffcc00] shrink-0 mt-1.5" size={16} />
      <div>
        <p className="text-xs text-white font-medium uppercase tracking-wider mb-0.5">
          Bhopal
        </p>
        <p className="text-sm">G-55, Rajved Colony, Priyanka Nagar</p>
      </div>
    </li>
    
    {/* Indore Location */}
    <li className="flex gap-3 items-start">
      <MapPin className="text-[#ffcc00] shrink-0 mt-1.5" size={16} />
      <div>
        <p className="text-xs text-white font-medium uppercase tracking-wider mb-0.5">
          Indore
        </p>
        <p className="text-sm">
          493-B, Scheme No. 103, Near Sahaj Palash
        </p>
      </div>
    </li>
    
    {/* Phone */}
    <li className="flex gap-3 items-center">
      <Phone className="text-[#ffcc00] shrink-0" size={16} />
      <span className="text-sm">1800 890 4648 (Toll-Free)</span>
    </li>
    
    {/* Mail */}
    <li className="flex gap-3 items-center">
      <Mail className="text-[#ffcc00] shrink-0" size={16} />
      <span className="text-sm">nirtnidaan@gmail.com</span>
    </li>
    
  </ul>
</div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#FFCC00]/20 bg-black">
        <div className="section-container py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/70">
            © {new Date().getFullYear()} {" "} Nidaan Sewa Samiti. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white">
            <a href="#" className="hover:text-[#FFCC00] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#FFCC00] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;