"use client";

import React, { useState } from "react";
import { Contact } from "@/lib/types";
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
} from "lucide-react";

interface ContactDetailModalProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDetailModal({ contact, isOpen, onClose }: ContactDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!contact) return null;

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
    const text = `NIDAAN Contact Inquiry:
Name: ${contact.name}
Email: ${contact.email || "Not Provided"}
Phone: ${contact.phoneNumber}
Message: ${contact.message}
Date: ${new Date(contact.createdAt).toLocaleDateString("en-IN")}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md border-[#e4e4e7] rounded-3xl overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b border-[#e4e4e7] bg-[#ebf7f8]/40 relative">
          <div className="p-3 bg-[#ebf7f8] text-[#128999] rounded-2xl w-fit mb-3">
            <Mail className="h-6 w-6" />
          </div>
          <DialogTitle className="text-[#144047] font-bold text-xl">Inquiry Details</DialogTitle>
          <DialogDescription className="text-xs text-[#768385]">
            Detailed visitor query submitted from the public contact form.
          </DialogDescription>
        </DialogHeader>

        {/* Data list grid */}
        <div className="p-6 space-y-5">
          {/* Name */}
          <div className="flex gap-4">
            <div className="p-2 bg-[#f0f9fa] text-[#128999] rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-[#768385] tracking-wider block">Full Name</span>
              <span className="text-sm font-bold text-[#144047] break-words">{contact.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#f0f9fa]">
            {/* Phone */}
            <div className="flex gap-3">
              <Phone className="h-4 w-4 text-[#128999] shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">Phone Number</span>
                <span className="text-xs font-semibold text-[#144047] block truncate select-all">{contact.phoneNumber}</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-3">
              <Mail className="h-4 w-4 text-[#128999] shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">Email Address</span>
                <span className="text-xs font-semibold text-[#144047] block truncate select-all">
                  {contact.email || <span className="text-[#aab3b5] italic text-[11px]">Not Provided</span>}
                </span>
              </div>
            </div>
          </div>

          {/* Date logged */}
          <div className="pt-2 border-t border-[#f0f9fa] flex gap-3">
            <Calendar className="h-4 w-4 text-[#128999] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">Date Received</span>
              <span className="text-xs font-semibold text-[#768385]">{formatDate(contact.createdAt)}</span>
            </div>
          </div>

          {/* Message */}
          <div className="pt-4 border-t border-[#f0f9fa] flex gap-3">
            <FileText className="h-4 w-4 text-[#128999] shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block mb-1">Message</span>
              <div className="bg-[#f8fafc] border border-[#e4e4e7] p-3 rounded-2xl max-h-48 overflow-y-auto">
                <p className="text-xs text-[#144047] whitespace-pre-wrap leading-relaxed break-words">
                  {contact.message}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <DialogFooter className="p-4 border-t border-[#e4e4e7] bg-[#f0f9fa]/20 flex sm:justify-between items-center gap-2">
          <Button
            variant="outline"
            onClick={copyDetailsToClipboard}
            className="flex-1 border-[#dcf0f1] hover:bg-[#ebf7f8] text-[#128999] font-semibold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer h-10"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Details</span>
              </>
            )}
          </Button>

          <Button
            onClick={onClose}
            className="flex-1 bg-[#128999] hover:bg-[#106f7e] text-white font-semibold rounded-xl text-xs h-10 cursor-pointer"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
