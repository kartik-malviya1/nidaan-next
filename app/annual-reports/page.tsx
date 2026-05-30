"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, ExternalLink, Calendar, TrendingUp, Users, Heart, FileCheck } from "lucide-react";
import { AnnualReport } from "@/lib/types";

const statIcons = [TrendingUp, Users, Heart, Calendar];

export default function AnnualReports() {
  const [reports, setReports] = useState<AnnualReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/annual-reports");
        if (!res.ok) throw new Error("Failed to fetch reports");
        const data = await res.json();
        setReports(data);
      } catch (err) {
        console.error("Failed to load annual reports:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
  }, []);

  const featured = reports[0];
  const rest = reports.slice(1);

  return (
   <div>
  {/* Hero Section */}
  <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-24 overflow-hidden font-sans">
    <div className="absolute inset-0">
      <img
        src="/image_18.png"
        alt="Annual Reports Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/85"></div>
    </div>

    {/* Replaced max-w-8xl and lg:px-30 with standard responsive tailwind classes */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl text-center md:text-left mx-auto md:mx-0"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-4 block">
          Transparency
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          Annual Reports & Accountability
        </h1>
        <p className="text-sm md:text-base lg:text-md text-white/70 max-w-2xl mx-auto md:mx-0 leading-relaxed">
          We believe in full transparency. Every year, we publish a detailed account of our programmes, financials, and the lives we've touched — because our donors and families deserve to know exactly where their trust is placed.
        </p>
      </motion.div>
    </div>
  </section>

  {/* Main Content Section */}
  <section className="bg-[#F8F9FA] py-16 md:py-24 px-6 md:px-12 lg:px-24 font-sans text-slate-900 min-h-[400px]">
    <div className="max-w-7xl mx-auto">
      
      {isLoading ? (
        /* Skeleton Loading State */
        <div className="space-y-8 md:space-y-12">
          <div className="h-[300px] md:h-[380px] bg-slate-200 animate-pulse rounded-3xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-60 bg-slate-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        </div>
      ) : reports.length === 0 ? (
        /* Elegant Empty State */
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 md:py-20 px-6 bg-white border border-slate-200 rounded-3xl max-w-xl mx-auto shadow-sm"
        >
          <div className="p-4 bg-amber-50 rounded-full text-amber-500 border border-amber-100 mb-4 w-fit mx-auto">
            <FileCheck className="h-8 w-8" />
          </div>
          <h3 className="font-bold text-xl text-slate-900">Reports Under Preparation</h3>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Our latest compliance documentation and annual progress reports are being prepared for publishing. Check back shortly to view our impact.
          </p>
          <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-center gap-1">
            <span>For urgent inquiries, email us at</span>
            <a href="mailto:nirtnidaan@gmail.com" className="text-amber-600 hover:underline">
              nirtnidaan@gmail.com
            </a>
          </div>
        </motion.div>
      ) : (
        /* Dynamic Content list */
        <>
          {/* Featured latest report */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 mb-16 md:mb-20 bg-black/95 text-white rounded-3xl overflow-hidden shadow-xl"
            >
              {/* Cover image */}
              <div className="relative min-h-[250px] sm:min-h-[350px] lg:min-h-[420px]">
                <img src={featured.coverUrl} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 lg:from-transparent to-slate-900/60 lg:to-slate-900/60" />
                <div className="absolute top-4 right-4 md:top-5 md:right-5">
                  <span className="bg-amber-500 text-slate-900 text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm">
                    Latest Report
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center gap-6 p-6 sm:p-8 lg:p-10 lg:pl-0">
                <div>
                  <div className="text-amber-400 text-xs md:text-sm font-medium uppercase tracking-widest mb-2">{featured.year}</div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 tracking-tight text-white">{featured.title}</h3>
                </div>

                {/* Highlights */}
                {featured.highlights && featured.highlights.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {featured.highlights.map((h, i) => {
                      const Icon = statIcons[i % statIcons.length];
                      return (
                        <div key={h} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 border border-white/5">
                          <Icon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          <span className="text-xs md:text-sm text-white/90 font-medium leading-tight">{h}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Responsive Action Buttons (Stacked on mobile, row on tablet+) */}
                <div className="flex flex-col sm:flex-row gap-3 mt-2 sm:mt-4">
                  <a 
                    href={featured.pdfUrl} 
                    download
                    className="flex items-center justify-center gap-2 bg-amber-500 text-slate-900 px-6 py-3 md:py-2.5 rounded-full text-sm font-semibold hover:bg-amber-400 transition-colors w-full sm:w-auto"
                  >
                    <Download className="w-4 h-4" /> Download PDF
                  </a>
                  <a 
                    href={featured.pdfUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3 md:py-2.5 rounded-full text-sm font-medium hover:bg-white/10 transition-colors w-full sm:w-auto"
                  >
                    <ExternalLink className="w-4 h-4" /> View Online
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Past reports grid */}
          {rest.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 text-center md:text-left">Previous Reports</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {rest.map((report, i) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-amber-200 transition-all flex flex-col justify-between h-full"
                  >
                    <div>
                      {/* Cover thumbnail */}
                      <div className="aspect-[3/2] overflow-hidden relative">
                        <img src={report.coverUrl} alt={report.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors" />
                        <div className="absolute top-3 right-3">
                          <span className="bg-amber-500 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full">
                            {report.year}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4 md:p-5">
                        <div className="flex items-start gap-2.5 mb-2">
                          <FileText className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-bold leading-snug line-clamp-2 text-slate-900">{report.title}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 md:p-5 pt-0 mt-auto">
                      <a 
                        href={report.pdfUrl} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-1.5 text-xs font-semibold text-slate-600 hover:text-amber-600 transition-colors group/link w-full border-t border-slate-100 pt-3"
                      >
                        <span>View online</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-amber-500 transition-colors" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Bottom compliance note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 md:mt-24 text-center border-t border-slate-200 pt-8 px-4"
      >
        <p className="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
          All reports are published in accordance with the FCRA and Indian Trust Act regulations. For audit reports or financial statements, please write to us at{' '}
          <a href="mailto:nirtnidaan@gmail.com" className="text-slate-900 font-medium underline underline-offset-2 hover:text-amber-500 transition-colors inline-block mt-1 sm:mt-0">
            nirtnidaan@gmail.com
          </a>
        </p>
      </motion.div>
    </div>
  </section>
</div>
  );
}