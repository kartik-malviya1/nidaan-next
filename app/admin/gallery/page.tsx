"use client";

import React, { useState } from "react";
import { useGalleryImages, useDeleteGalleryImage } from "@/hooks/use-gallery";
import ImageCard from "@/components/admin/gallery/image-card";
import GalleryEmptyState from "@/components/admin/gallery/gallery-empty-state";
import UploadModal from "@/components/admin/gallery/upload-modal";
import { PlusCircle, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All", "Therapy", "Inclusive School", "Early Intervention", "Vocational", "Events", "General"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const { data: images, isLoading, error } = useGalleryImages(
    selectedCategory === "All" ? undefined : selectedCategory,
    searchQuery
  );
  
  const deleteImageMutation = useDeleteGalleryImage();

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      try {
        await deleteImageMutation.mutateAsync(deleteTargetId);
      } catch (err) {
        console.error("Failed to delete image:", err);
      } finally {
        setDeleteTargetId(null);
      }
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#144047] sm:text-3xl tracking-tight flex items-center gap-2">
            Gallery Manager
            <span className="text-[10px] uppercase font-bold text-[#de5212] bg-[#fff5f2] px-2.5 py-0.5 rounded-full border border-[#feeae5]">
              Assets
            </span>
          </h1>
          <p className="text-[#768385] text-sm mt-1">
            Upload, categorize, and showcase the impact images directly to the public website.
          </p>
        </div>
        
        <Button
          onClick={() => setIsUploadOpen(true)}
          className="bg-[#de5212] hover:bg-[#ca3e0c] text-white font-semibold rounded-xl text-xs px-4 py-2 flex items-center gap-1.5 shadow-sm shadow-orange-500/10 cursor-pointer w-full sm:w-auto justify-center"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Upload Image</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 bg-white p-4 rounded-2xl border border-[#dcf0f1] shadow-sm">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#768385]" />
          <Input
            placeholder="Search assets by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 border-[#e4e4e7] placeholder-[#768385]/50 focus:border-[#de5212] focus:ring-[#de5212]/10 rounded-xl"
          />
        </div>

        {/* Categories Scroller */}
        <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-thin">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <Badge
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl cursor-pointer select-none transition-all ${
                  isSelected
                    ? "bg-[#ffcc00] hover:bg-[#e6b800] text-black shadow-sm font-bold"
                    : "bg-[#f0f9fa] hover:bg-[#dcf0f1] text-[#128999] border border-[#dcf0f1]"
                }`}
              >
                {cat}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Skeletons Grid */}
      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-3 rounded-2xl bg-white border border-[#dcf0f1] p-3 animate-pulse">
              <Skeleton className="h-48 w-full rounded-xl bg-[#dcf0f1]" />
              <div className="flex justify-between items-center mt-2">
                <Skeleton className="h-4 w-28 bg-[#dcf0f1]" />
                <Skeleton className="h-6 w-12 bg-[#dcf0f1]" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="p-6 border border-red-200 bg-red-50 text-red-700 rounded-xl">
          <h4 className="font-bold">Failed to load gallery images</h4>
          <p className="text-xs">Verify your API endpoint and network connectivity.</p>
        </div>
      )}

      {/* Images Grid list */}
      {!isLoading && !error && images && (
        <>
          {images.length === 0 ? (
            <GalleryEmptyState
              onUploadClick={() => setIsUploadOpen(true)}
              hasFilters={selectedCategory !== "All" || searchQuery.length > 0}
            />
          ) : (
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {images.map((image) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ImageCard image={image} onDeleteClick={setDeleteTargetId} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </>
      )}

      {/* Dialog for multiple file uploads */}
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={deleteTargetId !== null} onOpenChange={(open) => !open && setDeleteTargetId(null)}>
        <AlertDialogContent className="border-[#e4e4e7] rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#144047] font-bold">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-[#768385]">
              This action cannot be undone. It will permanently remove this image asset from our database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="border-[#e4e4e7] text-[#768385] rounded-xl cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl cursor-pointer"
            >
              Permanently Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
