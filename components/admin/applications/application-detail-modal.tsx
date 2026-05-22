"use client";

import React, { useState } from "react";
import { Application } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Calendar,
  User,
  Copy,
  Check,
  FileText,
  MapPin,
  GraduationCap,
  Clock,
  Briefcase,
  Trash2,
  Loader2,
} from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useQueryClient } from "@tanstack/react-query";

interface ApplicationDetailModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusConfig: Record<string, { label: string; bg: string; text: string; border: string }> = {
  pending: { label: "Pending", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  reviewed: { label: "Reviewed", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  accepted: { label: "Accepted", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  rejected: { label: "Rejected", bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
};

export default function ApplicationDetailModal({ application, isOpen, onClose }: ApplicationDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [statusLoading, setStatusLoading] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const queryClient = useQueryClient();

  if (!application) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyDetailsToClipboard = () => {
    const text = `NIDAAN ${application.type} Application:
Name: ${application.name}
Email: ${application.email}
Phone: ${application.phone}
City: ${application.city}
Institution: ${application.institution}
Area of Interest: ${application.area}
Duration: ${application.duration || "Not specified"}
Availability: ${application.availability || "Not specified"}
Motivation: ${application.motivation}
Status: ${application.status}
Date: ${new Date(application.createdAt).toLocaleDateString("en-IN")}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStatusUpdate = async (newStatus: string) => {
    setStatusLoading(newStatus);
    try {
      await apiClient.patch(`/application/${application.id}`, { status: newStatus });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      onClose();
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setStatusLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this application? This action cannot be undone.")) return;
    setDeleteLoading(true);
    try {
      await apiClient.delete(`/application/${application.id}`);
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      onClose();
    } catch (error) {
      console.error("Failed to delete application:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const currentStatus = statusConfig[application.status] || statusConfig.pending;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg border-[#e4e4e7] rounded-3xl overflow-hidden p-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-6 pb-4 border-b border-[#e4e4e7] bg-[#ebf7f8]/40 relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-[#ebf7f8] text-[#128999] rounded-2xl w-fit">
              <User className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${currentStatus.bg} ${currentStatus.text} ${currentStatus.border}`}>
                {currentStatus.label}
              </span>
              <span className={`ml-2 text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${
                application.type === "Volunteer"
                  ? "bg-purple-50 text-purple-700 border-purple-200"
                  : "bg-sky-50 text-sky-700 border-sky-200"
              }`}>
                {application.type}
              </span>
            </div>
          </div>
          <DialogTitle className="text-[#144047] font-bold text-xl">{application.name}</DialogTitle>
          <DialogDescription className="text-xs text-[#768385]">
            {application.type} application submitted on {new Date(application.createdAt).toLocaleDateString("en-IN")}
          </DialogDescription>
        </DialogHeader>

        {/* Data fields */}
        <div className="p-6 space-y-5">
          {/* Contact Info Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-3">
              <Mail className="h-4 w-4 text-[#128999] shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">Email</span>
                <span className="text-xs font-semibold text-[#144047] block truncate select-all">{application.email}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="h-4 w-4 text-[#128999] shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">Phone</span>
                <span className="text-xs font-semibold text-[#144047] block truncate select-all">{application.phone}</span>
              </div>
            </div>
          </div>

          {/* Location & Institution */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#f0f9fa]">
            <div className="flex gap-3">
              <MapPin className="h-4 w-4 text-[#128999] shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">City</span>
                <span className="text-xs font-semibold text-[#144047]">{application.city}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <GraduationCap className="h-4 w-4 text-[#128999] shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">Institution</span>
                <span className="text-xs font-semibold text-[#144047]">{application.institution}</span>
              </div>
            </div>
          </div>

          {/* Area & Duration & Availability */}
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[#f0f9fa]">
            <div className="flex gap-3">
              <Briefcase className="h-4 w-4 text-[#128999] shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">Area</span>
                <span className="text-xs font-semibold text-[#144047]">{application.area}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="h-4 w-4 text-[#128999] shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">Duration</span>
                <span className="text-xs font-semibold text-[#144047]">{application.duration || "—"}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Calendar className="h-4 w-4 text-[#128999] shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">Availability</span>
                <span className="text-xs font-semibold text-[#144047]">{application.availability || "—"}</span>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="pt-2 border-t border-[#f0f9fa] flex gap-3">
            <Calendar className="h-4 w-4 text-[#128999] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">Date Received</span>
              <span className="text-xs font-semibold text-[#768385]">{formatDate(application.createdAt)}</span>
            </div>
          </div>

          {/* Motivation */}
          <div className="pt-4 border-t border-[#f0f9fa] flex gap-3">
            <FileText className="h-4 w-4 text-[#128999] shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block mb-1">Motivation</span>
              <div className="bg-[#f8fafc] border border-[#e4e4e7] p-3 rounded-2xl max-h-40 overflow-y-auto">
                <p className="text-xs text-[#144047] whitespace-pre-wrap leading-relaxed break-words">
                  {application.motivation}
                </p>
              </div>
            </div>
          </div>

          {/* Status Update Actions */}
          <div className="pt-4 border-t border-[#f0f9fa]">
            <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block mb-2">Update Status</span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(statusConfig).map(([key, config]) => (
                <Button
                  key={key}
                  variant="outline"
                  size="sm"
                  disabled={application.status === key || statusLoading !== null}
                  onClick={() => handleStatusUpdate(key)}
                  className={`text-[11px] font-bold rounded-xl border cursor-pointer ${
                    application.status === key
                      ? `${config.bg} ${config.text} ${config.border} opacity-60`
                      : `border-[#dcf0f1] text-[#768385] hover:${config.bg} hover:${config.text}`
                  }`}
                >
                  {statusLoading === key ? (
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  ) : null}
                  {config.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <DialogFooter className="p-4 border-t border-[#e4e4e7] bg-[#f0f9fa]/20 flex sm:justify-between items-center gap-2">
          <Button
            variant="outline"
            onClick={handleDelete}
            disabled={deleteLoading}
            className="border-red-200 hover:bg-red-50 text-red-600 font-semibold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer h-10"
          >
            {deleteLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
            <span>Delete</span>
          </Button>

          <div className="flex gap-2 flex-1 justify-end">
            <Button
              variant="outline"
              onClick={copyDetailsToClipboard}
              className="border-[#dcf0f1] hover:bg-[#ebf7f8] text-[#128999] font-semibold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer h-10"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </Button>

            <Button
              onClick={onClose}
              className="bg-[#128999] hover:bg-[#106f7e] text-white font-semibold rounded-xl text-xs h-10 cursor-pointer"
            >
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
