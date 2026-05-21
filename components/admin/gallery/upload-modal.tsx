"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { useSaveGalleryImage } from "@/hooks/use-gallery";
import { uploadImageWithProgress } from "@/lib/cloudinary";
import {
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UploadQueueItem {
  id: string;
  file: File;
  previewUrl: string;
  title: string;
  category: string;
  progress: number;
  status: "idle" | "uploading" | "success" | "error";
  errorMsg?: string;
}

const CATEGORIES = ["Therapy", "Inclusive School", "Early Intervention", "Vocational", "Events", "General"];

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const saveImageMutation = useSaveGalleryImage();
  const [queue, setQueue] = useState<UploadQueueItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Drag Events
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const processFiles = (files: FileList) => {
    const newItems: UploadQueueItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Accept only images
      if (!file.type.startsWith("image/")) continue;

      newItems.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        previewUrl: URL.createObjectURL(file),
        title: file.name.substring(0, file.name.lastIndexOf(".")) || file.name,
        category: "General",
        progress: 0,
        status: "idle",
      });
    }

    setQueue((prev) => [...prev, ...newItems]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleRemoveItem = (id: string) => {
    setQueue((prev) => {
      const item = prev.find((x) => x.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((x) => x.id !== id);
    });
  };

  const handleUpdateItem = (id: string, field: "title" | "category", value: string) => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const executeUploads = async () => {
    setIsUploading(true);

    // Upload files sequentially or concurrently
    const uploadPromises = queue.map(async (item) => {
      if (item.status === "success") return; // skip already uploaded

      // Update status
      setQueue((prev) =>
        prev.map((x) => (x.id === item.id ? { ...x, status: "uploading" } : x))
      );

      try {
        // 1. Upload to Cloudinary with progress
        const cloudinaryRes = await uploadImageWithProgress(item.file, (progress) => {
          setQueue((prev) =>
            prev.map((x) => (x.id === item.id ? { ...x, progress } : x))
          );
        });

        // 2. Save in database via API
        await saveImageMutation.mutateAsync({
          title: item.title,
          category: item.category,
          url: cloudinaryRes.secure_url,
        });

        // Update to Success
        setQueue((prev) =>
          prev.map((x) => (x.id === item.id ? { ...x, status: "success", progress: 100 } : x))
        );
      } catch (err: any) {
        console.error("Upload error for file:", item.file.name, err);
        setQueue((prev) =>
          prev.map((x) => (
            x.id === item.id
              ? { ...x, status: "error", errorMsg: err.message || "Upload failed" }
              : x
          ))
        );
      }
    });

    await Promise.all(uploadPromises);
    setIsUploading(false);

    // Auto close modal if all successful
    const hasFailures = queue.some((x) => x.status === "error");
    if (!hasFailures) {
      setTimeout(() => {
        handleReset();
        onClose();
      }, 1000);
    }
  };

  const handleReset = () => {
    queue.forEach((x) => URL.revokeObjectURL(x.previewUrl));
    setQueue([]);
    setIsUploading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!isUploading) {
        if (!open) {
          handleReset();
          onClose();
        }
      }
    }}>
      <DialogContent className="max-w-3xl border-[#e4e4e7] rounded-3xl overflow-hidden max-h-[85vh] flex flex-col p-0">
        <DialogHeader className="p-6 border-b border-[#e4e4e7] bg-[#f0f9fa]/30">
          <DialogTitle className="text-[#144047] font-bold text-xl flex items-center gap-2">
            <Upload className="h-5 w-5 text-[#128999]" />
            <span>Upload Gallery Assets</span>
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Work area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Drag & Drop Area */}
          {queue.length === 0 && (
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-300 ${isDragActive
                  ? "border-[#ffcc00] bg-[#fffbeb]/40"
                  : "border-[#dcf0f1] hover:border-[#128999] bg-[#f0f9fa]/20 hover:bg-[#f0f9fa]/40"
                }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="p-4 bg-[#f0f9fa] text-[#128999] rounded-full mb-3 border border-[#dcf0f1]">
                <Upload className="h-8 w-8" />
              </div>
              <h4 className="font-bold text-sm text-[#144047]">Drag & drop images here</h4>
              <p className="text-xs text-[#768385] mt-1.5">
                Support JPG, PNG, WEBP files. Multiple selection allowed.
              </p>
              <Button
                variant="outline"
                className="mt-4 border-[#128999] text-[#128999] hover:bg-[#128999] hover:text-white rounded-xl text-xs font-semibold px-4 cursor-pointer"
              >
                Choose Local Files
              </Button>
            </div>
          )}

          {/* Queue List Cards */}
          {queue.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#e4e4e7]">
                <h4 className="text-xs font-bold text-[#144047] uppercase tracking-wider">
                  Assets to upload ({queue.length})
                </h4>
                <Button
                  variant="ghost"
                  onClick={handleReset}
                  disabled={isUploading}
                  className="text-xs font-semibold text-red-500 hover:bg-red-50 cursor-pointer"
                >
                  Clear All
                </Button>
              </div>

              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                {queue.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-[#e4e4e7] rounded-2xl bg-white relative overflow-hidden"
                  >
                    {/* Thumbnail preview */}
                    <div className="h-16 w-16 shrink-0 rounded-lg overflow-hidden border border-[#dcf0f1] bg-neutral-50">
                      <img src={item.previewUrl} alt="Upload preview" className="h-full w-full object-cover" />
                    </div>

                    {/* Meta Fields form inputs */}
                    <div className="flex-1 min-w-0 grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1">
                        <Label className="text-[10px] font-bold uppercase text-[#768385]">Asset Title</Label>
                        <Input
                          placeholder="Image name"
                          value={item.title}
                          onChange={(e) => handleUpdateItem(item.id, "title", e.target.value)}
                          disabled={isUploading}
                          className="h-8 text-xs border-[#e4e4e7] rounded-lg"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-[10px] font-bold uppercase text-[#768385]">Category</Label>
                        <select
                          value={item.category}
                          onChange={(e) => handleUpdateItem(item.id, "category", e.target.value)}
                          disabled={isUploading}
                          className="w-full h-8 text-xs px-2 border border-[#e4e4e7] bg-white rounded-lg focus:border-[#ffcc00] focus:outline-none"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Progress bar / status alerts */}
                      <div className="sm:col-span-2 pt-1">
                        {item.status === "uploading" && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-[9px] font-bold text-[#128999]">
                              <span>Uploading directly to Cloudinary...</span>
                              <span>{item.progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-[#f0f9fa] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#de5212] to-[#ffcc00] rounded-full transition-all duration-100"
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {item.status === "success" && (
                          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span>Successfully saved to database!</span>
                          </div>
                        )}

                        {item.status === "error" && (
                          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-red-500">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <span className="truncate">{item.errorMsg || "Upload error."}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Delete Item queue button */}
                    <div className="shrink-0 flex items-center justify-center pl-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={isUploading}
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-[#768385] hover:text-red-500 hover:bg-red-50 rounded-xl cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <DialogFooter className="p-6 border-t border-[#e4e4e7] bg-[#f0f9fa]/20 gap-3">
          <Button
            variant="outline"
            disabled={isUploading}
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="border-[#e4e4e7] text-[#768385] rounded-xl hover:bg-neutral-50 cursor-pointer"
          >
            Cancel
          </Button>

          {queue.length > 0 && (
            <Button
              onClick={executeUploads}
              disabled={isUploading}
              className="bg-[#de5212] hover:bg-[#ca3e0c] text-white font-semibold rounded-xl px-5 flex items-center gap-1.5 cursor-pointer shadow-md shadow-orange-500/10"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Start Uploading</span>
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
