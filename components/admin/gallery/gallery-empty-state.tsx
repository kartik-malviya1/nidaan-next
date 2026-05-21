"use client";

import React from "react";
import { Image as ImageIcon, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryEmptyStateProps {
  onUploadClick: () => void;
  hasFilters: boolean;
}

export default function GalleryEmptyState({ onUploadClick, hasFilters }: GalleryEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 border-2 border-dashed border-[#dcf0f1] bg-white rounded-3xl text-center max-w-xl mx-auto shadow-sm">
      <div className="p-5 bg-[#f0f9fa] text-[#128999] rounded-full mb-4 ring-8 ring-[#f0f9fa]/50">
        <ImageIcon className="h-10 w-10" />
      </div>
      
      <h3 className="text-xl font-bold text-[#144047] tracking-tight">
        {hasFilters ? "No matching assets found" : "Your gallery is empty"}
      </h3>
      
      <p className="text-sm text-[#768385] mt-2 max-w-sm">
        {hasFilters
          ? "Try resetting your search query or switching the category filter to find what you need."
          : "Showcase the wonderful, life-changing work done at NIDAAN by uploading direct action photos."}
      </p>

      {!hasFilters && (
        <Button
          onClick={onUploadClick}
          className="mt-6 bg-[#de5212] hover:bg-[#ca3e0c] text-white font-semibold rounded-xl px-5 py-2.5 flex items-center gap-2 shadow-md shadow-orange-500/10 transition-transform active:scale-[0.98] cursor-pointer"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Upload First Image</span>
        </Button>
      )}
    </div>
  );
}
