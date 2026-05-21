"use client";

import React from "react";
import { HeartHandshake } from "lucide-react";

interface DonationsEmptyStateProps {
  hasFilters: boolean;
}

export default function DonationsEmptyState({ hasFilters }: DonationsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 border-2 border-dashed border-[#dcf0f1] bg-white rounded-3xl text-center max-w-xl mx-auto shadow-sm my-6">
      <div className="p-5 bg-[#fff5f2] text-[#de5212] rounded-full mb-4 ring-8 ring-[#fff5f2]/50">
        <HeartHandshake className="h-10 w-10" />
      </div>
      
      <h3 className="text-xl font-bold text-[#144047] tracking-tight">
        {hasFilters ? "No matching donor records" : "No donations found"}
      </h3>
      
      <p className="text-sm text-[#768385] mt-2 max-w-sm">
        {hasFilters
          ? "We couldn't find any donors matching that search query. Try clearing your filter words."
          : "Donation submissions by supporters will be captured automatically and logged here."}
      </p>
    </div>
  );
}
