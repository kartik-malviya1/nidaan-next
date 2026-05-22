"use client";

import React from "react";
import { Users } from "lucide-react";

interface ApplicationsEmptyStateProps {
  hasFilters: boolean;
}

export default function ApplicationsEmptyState({ hasFilters }: ApplicationsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 border-2 border-dashed border-[#dcf0f1] bg-white rounded-3xl text-center max-w-xl mx-auto shadow-sm my-6">
      <div className="p-5 bg-[#ebf7f8] text-[#128999] rounded-full mb-4 ring-8 ring-[#ebf7f8]/50">
        <Users className="h-10 w-10" />
      </div>
      
      <h3 className="text-xl font-bold text-[#144047] tracking-tight">
        {hasFilters ? "No matching applications" : "No applications received yet"}
      </h3>
      
      <p className="text-sm text-[#768385] mt-2 max-w-sm">
        {hasFilters
          ? "We couldn't find any applications matching your search or filters. Try clearing your filters."
          : "Volunteer and internship applications submitted from the public form will appear here automatically."}
      </p>
    </div>
  );
}
