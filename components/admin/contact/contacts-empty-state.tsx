"use client";

import React from "react";
import { Mail } from "lucide-react";

interface ContactsEmptyStateProps {
  hasFilters: boolean;
}

export default function ContactsEmptyState({ hasFilters }: ContactsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 border-2 border-dashed border-[#dcf0f1] bg-white rounded-3xl text-center max-w-xl mx-auto shadow-sm my-6">
      <div className="p-5 bg-[#ebf7f8] text-[#128999] rounded-full mb-4 ring-8 ring-[#ebf7f8]/50">
        <Mail className="h-10 w-10" />
      </div>
      
      <h3 className="text-xl font-bold text-[#144047] tracking-tight">
        {hasFilters ? "No matching contact inquiries" : "No contact messages found"}
      </h3>
      
      <p className="text-sm text-[#768385] mt-2 max-w-sm">
        {hasFilters
          ? "We couldn't find any contact inquiries matching that search query. Try clearing your search text."
          : "Inquiries submitted via the public contact form will appear here automatically."}
      </p>
    </div>
  );
}
