"use client";

import React, { useState } from "react";
import { 
  useAnnualReports, 
  useSaveAnnualReport, 
  useDeleteAnnualReport 
} from "@/hooks/use-annual-reports";
import { uploadImageWithProgress } from "@/lib/cloudinary";
import { 
  PlusCircle, 
  Search, 
  FileText, 
  Trash2, 
  Calendar, 
  ExternalLink, 
  Download, 
  Star, 
  Loader2, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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

export default function AdminAnnualReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Queries & Mutations
  const { data: reports, isLoading, error } = useAnnualReports();
  const saveReportMutation = useSaveAnnualReport();
  const deleteReportMutation = useDeleteAnnualReport();

  // Form State
  const [formYear, setFormYear] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formHighlights, setFormHighlights] = useState<string[]>([]);
  const [newHighlightPoint, setNewHighlightPoint] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [formFeatured, setFormFeatured] = useState(false);

  // Upload progress and status states
  const [coverProgress, setCoverProgress] = useState(0);
  const [pdfProgress, setPdfProgress] = useState(0);
  const [coverStatus, setCoverStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [pdfStatus, setPdfStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [coverUrl, setCoverUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtered reports
  const filteredReports = reports?.filter((report) =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.year.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add a highlight string point
  const handleAddHighlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHighlightPoint.trim()) return;
    setFormHighlights([...formHighlights, newHighlightPoint.trim()]);
    setNewHighlightPoint("");
  };

  // Remove a highlight string point
  const handleRemoveHighlight = (index: number) => {
    setFormHighlights(formHighlights.filter((_, i) => i !== index));
  };

  // Handle Cover Image upload
  const handleCoverUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setFormError("Cover file must be an image (PNG, JPG, WEBP).");
      return;
    }
    setCoverFile(file);
    setCoverStatus("uploading");
    setCoverProgress(0);
    try {
      const res = await uploadImageWithProgress(file, (progress) => {
        setCoverProgress(progress);
      });
      setCoverUrl(res.secure_url);
      setCoverStatus("success");
      setFormError("");
    } catch (err: any) {
      console.error(err);
      setCoverStatus("error");
      setFormError("Failed to upload cover image. Please try again.");
    }
  };

  // Handle PDF document upload
  const handlePdfUpload = async (file: File) => {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setFormError("Document must be in PDF format.");
      return;
    }
    setPdfFile(file);
    setPdfStatus("uploading");
    setPdfProgress(0);
    try {
      const res = await uploadImageWithProgress(file, (progress) => {
        setPdfProgress(progress);
      });
      setPdfUrl(res.secure_url);
      setPdfStatus("success");
      setFormError("");
    } catch (err: any) {
      console.error(err);
      setPdfStatus("error");
      setFormError("Failed to upload PDF report. Please try again.");
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formYear.trim()) {
      setFormError("Year is required (e.g. 2024–25).");
      return;
    }
    if (!formTitle.trim()) {
      setFormError("Title is required.");
      return;
    }
    if (!coverUrl) {
      setFormError("Please upload a cover image.");
      return;
    }
    if (!pdfUrl) {
      setFormError("Please upload the PDF report document.");
      return;
    }

    setIsSubmitting(true);
    try {
      await saveReportMutation.mutateAsync({
        year: formYear.trim(),
        title: formTitle.trim(),
        highlights: formHighlights,
        coverUrl,
        pdfUrl,
        featured: formFeatured,
      });

      // Clear Form & Close Modal
      handleResetForm();
      setIsCreateOpen(false);
    } catch (err: any) {
      console.error(err);
      setFormError(err.message || "Failed to save the annual report. Duplicate year?");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormYear("");
    setFormTitle("");
    setFormHighlights([]);
    setNewHighlightPoint("");
    setCoverFile(null);
    setPdfFile(null);
    setCoverProgress(0);
    setPdfProgress(0);
    setCoverStatus("idle");
    setPdfStatus("idle");
    setCoverUrl("");
    setPdfUrl("");
    setFormFeatured(false);
    setFormError("");
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      try {
        await deleteReportMutation.mutateAsync(deleteTargetId);
      } catch (err) {
        console.error("Failed to delete annual report:", err);
      } finally {
        setDeleteTargetId(null);
      }
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#144047] sm:text-3xl tracking-tight flex items-center gap-2">
            Annual Reports Manager
            <span className="text-[10px] uppercase font-bold text-[#de5212] bg-[#fff5f2] px-2.5 py-0.5 rounded-full border border-[#feeae5]">
              Accountability
            </span>
          </h1>
          <p className="text-[#768385] text-sm mt-1">
            Publish yearly reports, highlights, and PDFs directly to the public-facing website.
          </p>
        </div>
        
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-[#de5212] hover:bg-[#ca3e0c] text-white font-semibold rounded-xl text-xs px-4 py-2 flex items-center gap-1.5 shadow-sm shadow-orange-500/10 cursor-pointer w-full sm:w-auto justify-center"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Annual Report</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl border border-[#dcf0f1] shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#768385]" />
          <Input
            placeholder="Search reports by title or year..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 border-[#e4e4e7] placeholder-[#768385]/50 focus:border-[#de5212] focus:ring-[#de5212]/10 rounded-xl"
          />
        </div>
      </div>

      {/* Skeletons Grid */}
      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4 rounded-2xl bg-white border border-[#dcf0f1] p-4 animate-pulse">
              <Skeleton className="h-48 w-full rounded-xl bg-[#dcf0f1]" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/3 bg-[#dcf0f1]" />
                <Skeleton className="h-6 w-full bg-[#dcf0f1]" />
                <Skeleton className="h-4 w-5/6 bg-[#dcf0f1]" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="p-6 border border-red-200 bg-red-50 text-red-700 rounded-xl">
          <h4 className="font-bold">Failed to load annual reports</h4>
          <p className="text-xs">Verify your connection and backend API setup.</p>
        </div>
      )}

      {/* Reports Grid list */}
      {!isLoading && !error && filteredReports && (
        <>
          {filteredReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-[#dcf0f1] rounded-3xl min-h-[300px]">
              <div className="p-4 bg-[#f0f9fa] rounded-full text-[#128999] border border-[#dcf0f1] mb-4">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg text-[#144047]">No Annual Reports Found</h3>
              <p className="text-sm text-[#768385] mt-1 max-w-sm">
                {searchQuery ? "No reports match your current search query. Try typing something else." : "Get started by uploading your first organizational annual report."}
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => setIsCreateOpen(true)}
                  className="mt-5 bg-[#128999] hover:bg-[#0f727f] text-white rounded-xl text-xs font-semibold px-4 cursor-pointer"
                >
                  Create New Report
                </Button>
              )}
            </div>
          ) : (
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredReports.map((report) => (
                  <motion.div
                    key={report.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="group overflow-hidden border border-[#dcf0f1] bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                      {/* Image Wrap */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 shrink-0">
                        <img
                          src={report.coverUrl}
                          alt={report.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                          loading="lazy"
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div className="flex items-center gap-1.5 text-[10px] text-white/90 font-medium">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Uploaded {new Date(report.createdAt).toLocaleDateString("en-IN")}</span>
                          </div>
                        </div>

                        {/* Year Badge */}
                        <div className="absolute top-3 left-3 z-10">
                          <Badge className="bg-[#128999] text-white border-none font-extrabold text-[10px] px-2.5 py-0.5 rounded-lg shadow-sm">
                            {report.year}
                          </Badge>
                        </div>

                        {/* Featured Badge */}
                        {report.featured && (
                          <div className="absolute top-3 right-3 z-10">
                            <Badge className="bg-[#ffcc00] text-black border-none font-extrabold text-[9px] uppercase px-2.5 py-0.5 rounded-lg shadow-sm flex items-center gap-0.5">
                              <Star className="h-3 w-3 fill-black text-black" />
                              <span>Featured</span>
                            </Badge>
                          </div>
                        )}

                        {/* Delete Trigger */}
                        <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => setDeleteTargetId(report.id)}
                            className="h-8 w-8 rounded-lg bg-red-600 hover:bg-red-700 active:scale-95 shadow-md shadow-red-950/20 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4 text-white" />
                          </Button>
                        </div>
                      </div>

                      {/* Content details */}
                      <CardContent className="p-5 flex flex-col flex-1">
                        <h4 className="font-bold text-[#144047] text-md leading-snug group-hover:text-[#128999] transition-colors line-clamp-2">
                          {report.title}
                        </h4>

                        {/* Highlights array presentation */}
                        <div className="mt-4 flex-1 space-y-1.5">
                          <div className="text-[10px] font-bold text-[#768385] uppercase tracking-wider">Report Highlights</div>
                          {report.highlights && report.highlights.length > 0 ? (
                            <ul className="space-y-1">
                              {report.highlights.map((highlight, idx) => (
                                <li key={idx} className="text-xs text-[#144047]/95 flex items-start gap-1.5">
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#de5212] mt-1.5 shrink-0" />
                                  <span className="line-clamp-2">{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-xs text-neutral-400 italic">No highlights provided.</span>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2.5 mt-5 pt-3 border-t border-[#f0f9fa]">
                          <a
                            href={report.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 text-[11px] font-bold py-2 bg-[#f0f9fa] hover:bg-[#dcf0f1] text-[#128999] rounded-xl border border-[#dcf0f1] transition-all"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>View Online</span>
                          </a>
                          <a
                            href={report.pdfUrl}
                            download
                            className="inline-flex items-center justify-center h-8 w-8 text-[#de5212] bg-[#fff5f2] border border-[#feeae5] rounded-xl hover:bg-[#de5212] hover:text-white transition-all"
                            title="Download PDF"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </>
      )}

      {/* Creation/Upload Modal Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={(open) => {
        if (!isSubmitting) {
          if (!open) {
            handleResetForm();
            setIsCreateOpen(false);
          }
        }
      }}>
        <DialogContent className="max-w-2xl border-[#e4e4e7] rounded-3xl overflow-hidden max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-6 border-b border-[#e4e4e7] bg-[#f0f9fa]/30">
            <DialogTitle className="text-[#144047] font-bold text-xl flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#128999]" />
              <span>Add Annual Report Metadata</span>
            </DialogTitle>
          </DialogHeader>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
            {formError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Year & Title Grid */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="year" className="text-xs font-bold uppercase text-[#768385]">Report Year</Label>
                <Input
                  id="year"
                  placeholder="e.g. 2024–25"
                  value={formYear}
                  onChange={(e) => setFormYear(e.target.value)}
                  disabled={isSubmitting}
                  className="h-10 border-[#e4e4e7] rounded-xl focus:border-[#de5212] focus:ring-[#de5212]/10"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="title" className="text-xs font-bold uppercase text-[#768385]">Document Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Annual Report 2024–25"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  disabled={isSubmitting}
                  className="h-10 border-[#e4e4e7] rounded-xl focus:border-[#de5212] focus:ring-[#de5212]/10"
                />
              </div>
            </div>

            {/* Cloudinary Dual Upload Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Cover Image Upload */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase text-[#768385]">Cover Thumbnail</Label>
                
                {coverUrl ? (
                  <div className="relative border border-[#dcf0f1] rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-50 flex flex-col justify-between p-3">
                    <img src={coverUrl} alt="Cover Preview" className="absolute inset-0 w-full h-full object-cover z-0 opacity-20" />
                    <div className="relative z-10 flex items-center justify-between gap-2 p-1.5 bg-white/95 rounded-xl border border-[#dcf0f1]">
                      <span className="text-[10px] font-bold text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                        <span>Ready</span>
                      </span>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setCoverUrl("");
                          setCoverStatus("idle");
                          setCoverFile(null);
                        }}
                        disabled={isSubmitting}
                        className="h-6 w-6 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="relative z-10 text-xs font-bold truncate p-1 bg-white/80 rounded-lg max-w-[90%]">{coverFile?.name || "Uploaded Image"}</div>
                  </div>
                ) : (
                  <div
                    onClick={() => !isSubmitting && document.getElementById("cover-input")?.click()}
                    className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-300 aspect-[16/10] ${
                      coverStatus === "uploading" 
                        ? "border-[#128999] bg-[#f0f9fa]/20" 
                        : "border-[#dcf0f1] hover:border-[#128999] bg-[#f0f9fa]/10 hover:bg-[#f0f9fa]/30"
                    }`}
                  >
                    <input
                      id="cover-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleCoverUpload(e.target.files[0])}
                      className="hidden"
                      disabled={isSubmitting}
                    />

                    {coverStatus === "uploading" ? (
                      <div className="space-y-2 w-full px-4">
                        <Loader2 className="h-6 w-6 animate-spin text-[#128999] mx-auto" />
                        <div className="text-[10px] font-bold text-[#128999]">Uploading Image... {coverProgress}%</div>
                        <div className="h-1.5 w-full bg-[#f0f9fa] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#de5212] to-[#ffcc00] transition-all duration-100"
                            style={{ width: `${coverProgress}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-5 w-5 text-[#128999] mb-1.5" />
                        <h5 className="font-bold text-xs text-[#144047]">Upload Cover Image</h5>
                        <p className="text-[9px] text-[#768385] mt-0.5">JPG, PNG or WEBP format</p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* PDF Document Upload */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase text-[#768385]">PDF File</Label>
                
                {pdfUrl ? (
                  <div className="relative border border-[#dcf0f1] rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-50 flex flex-col justify-between p-3">
                    <div className="relative z-10 flex items-center justify-between gap-2 p-1.5 bg-white/95 rounded-xl border border-[#dcf0f1]">
                      <span className="text-[10px] font-bold text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                        <span>Ready (PDF)</span>
                      </span>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setPdfUrl("");
                          setPdfStatus("idle");
                          setPdfFile(null);
                        }}
                        disabled={isSubmitting}
                        className="h-6 w-6 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="relative z-10 text-xs font-bold truncate p-1 bg-white/80 rounded-lg max-w-[90%] flex items-center gap-1">
                      <FileText className="h-4 w-4 text-[#de5212]" />
                      <span className="truncate">{pdfFile?.name || "Uploaded PDF"}</span>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => !isSubmitting && document.getElementById("pdf-input")?.click()}
                    className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-300 aspect-[16/10] ${
                      pdfStatus === "uploading" 
                        ? "border-[#128999] bg-[#f0f9fa]/20" 
                        : "border-[#dcf0f1] hover:border-[#128999] bg-[#f0f9fa]/10 hover:bg-[#f0f9fa]/30"
                    }`}
                  >
                    <input
                      id="pdf-input"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => e.target.files?.[0] && handlePdfUpload(e.target.files[0])}
                      className="hidden"
                      disabled={isSubmitting}
                    />

                    {pdfStatus === "uploading" ? (
                      <div className="space-y-2 w-full px-4">
                        <Loader2 className="h-6 w-6 animate-spin text-[#128999] mx-auto" />
                        <div className="text-[10px] font-bold text-[#128999]">Uploading PDF Document... {pdfProgress}%</div>
                        <div className="h-1.5 w-full bg-[#f0f9fa] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#de5212] to-[#ffcc00] transition-all duration-100"
                            style={{ width: `${pdfProgress}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-5 w-5 text-[#128999] mb-1.5" />
                        <h5 className="font-bold text-xs text-[#144047]">Upload Report PDF</h5>
                        <p className="text-[9px] text-[#768385] mt-0.5">Strictly PDF documents only</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Highlights Tag Manager */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-[#768385]">Key Highlights (Max 4 recommended)</Label>
              
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. 1,240 children served"
                  value={newHighlightPoint}
                  onChange={(e) => setNewHighlightPoint(e.target.value)}
                  disabled={isSubmitting}
                  className="h-10 border-[#e4e4e7] rounded-xl focus:border-[#de5212]"
                />
                <Button
                  type="button"
                  onClick={handleAddHighlight}
                  disabled={isSubmitting || !newHighlightPoint.trim()}
                  className="bg-[#128999] hover:bg-[#0f727f] text-white rounded-xl px-4 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1 text-xs">Add</span>
                </Button>
              </div>

              {/* Tags Area */}
              <div className="flex flex-wrap gap-2 pt-1">
                {formHighlights.map((highlight, idx) => (
                  <Badge 
                    key={idx}
                    className="bg-[#f0f9fa] text-[#128999] hover:bg-[#dcf0f1] border border-[#dcf0f1] px-3 py-1.5 rounded-xl font-medium text-xs flex items-center gap-1.5"
                  >
                    <span>{highlight}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveHighlight(idx)}
                      disabled={isSubmitting}
                      className="text-[#128999]/60 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Featured Checkbox Switch */}
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-50/40 border border-amber-100">
              <input
                id="featured"
                type="checkbox"
                checked={formFeatured}
                onChange={(e) => setFormFeatured(e.target.checked)}
                disabled={isSubmitting}
                className="h-4.5 w-4.5 text-amber-500 rounded border-gray-300 focus:ring-amber-400 accent-amber-500 cursor-pointer"
              />
              <div className="space-y-0.5">
                <Label htmlFor="featured" className="text-xs font-bold text-slate-800 cursor-pointer flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-[#ffcc00] text-[#ffcc00]" />
                  <span>Set as Featured Report</span>
                </Label>
                <p className="text-[10px] text-slate-500 leading-normal">
                  Makes this the main highlighted report at the top of the annual reports page. Only one report will be featured.
                </p>
              </div>
            </div>
          </form>

          {/* Footer Actions */}
          <DialogFooter className="p-6 border-t border-[#e4e4e7] bg-[#f0f9fa]/20 gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => {
                handleResetForm();
                setIsCreateOpen(false);
              }}
              className="border-[#e4e4e7] text-[#768385] rounded-xl hover:bg-neutral-50 cursor-pointer"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#de5212] hover:bg-[#ca3e0c] text-white font-semibold rounded-xl px-5 flex items-center gap-1.5 cursor-pointer shadow-md shadow-orange-500/10"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving Report...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Publish Report</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={deleteTargetId !== null} onOpenChange={(open) => !open && setDeleteTargetId(null)}>
        <AlertDialogContent className="border-[#e4e4e7] rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#144047] font-bold">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-[#768385]">
              This action cannot be undone. It will permanently remove this annual report and its contents from the public records.
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
