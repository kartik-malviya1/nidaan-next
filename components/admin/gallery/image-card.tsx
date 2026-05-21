"use client";

import React from "react";
import { GalleryImage } from "@/lib/types";
import { Trash2, Calendar, ZoomIn } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ImageCardProps {
  image: GalleryImage;
  onDeleteClick: (id: string) => void;
}

export default function ImageCard({ image, onDeleteClick }: ImageCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card className="group overflow-hidden border border-[#dcf0f1] bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Image Wrap */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <img
          src={image.url}
          alt={image.title || "Gallery photo"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Soft Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex items-center gap-1 text-[10px] text-white/90 font-medium">
            <Calendar className="h-3.5 w-3.5" />
            <span>Uploaded {formatDate(image.createdAt)}</span>
          </div>
        </div>

        {/* Floating Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-[#128999] text-white hover:bg-[#128999] border-none font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-lg shadow-sm">
            {image.category || "General"}
          </Badge>
        </div>

        {/* Delete Quick Trigger */}
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onDeleteClick(image.id)}
                className="h-8 w-8 rounded-lg bg-red-600 hover:bg-red-700 active:scale-95 shadow-md shadow-red-950/20 cursor-pointer"
              >
                <Trash2 className="h-4 w-4 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-red-900 border-none text-white text-xs">
              Delete image
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Title Details */}
      <CardContent className="p-4">
        <h4 className="font-bold text-[#144047] text-sm leading-tight truncate group-hover:text-[#128999] transition-colors">
          {image.title || "Untitled asset"}
        </h4>
        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#f0f9fa]">
          <span className="text-[10px] text-[#768385] font-medium uppercase tracking-wider">
            Nidaan Action
          </span>
          <span className="text-[10px] text-[#128999] font-bold group-hover:underline flex items-center gap-0.5 cursor-default">
            <ZoomIn className="h-3 w-3" /> Inspect
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
