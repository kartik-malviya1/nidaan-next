"use client";

import React, { useState } from "react";
import { Donation } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Phone,
  CreditCard,
  Hash,
  Calendar,
  User,
  Copy,
  Check,
  FileText,
  IndianRupee,
} from "lucide-react";

interface DonationDetailModalProps {
  donation: Donation | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationDetailModal({ donation, isOpen, onClose }: DonationDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!donation) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
    const text = `NIDAAN 80G Donation Receipt Info:
Donor: ${donation.name}
Amount: ₹${donation.amount}
Phone: ${donation.phoneNumber}
PAN Card: ${donation.panCard}
Transaction UTR: ${donation.transactionId}
Date: ${new Date(donation.createdAt).toLocaleDateString("en-IN")}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md border-[#e4e4e7] rounded-3xl overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b border-[#e4e4e7] bg-[#fff5f2]/40 relative">
          <div className="p-3 bg-[#fff5f2] text-[#de5212] rounded-2xl w-fit mb-3">
            <Heart className="h-6 w-6 fill-current" />
          </div>
          <DialogTitle className="text-[#144047] font-bold text-xl">Donor Details</DialogTitle>
          <DialogDescription className="text-xs text-[#768385]">
            Full transaction records for tax compliance audit.
          </DialogDescription>
        </DialogHeader>

        {/* Data list grid */}
        <div className="p-6 space-y-5">
          {/* Name */}
          <div className="flex gap-4">
            <div className="p-2 bg-[#f0f9fa] text-[#128999] rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-[#768385] tracking-wider block">Donor Name</span>
              <span className="text-sm font-bold text-[#144047] break-words">{donation.name}</span>
            </div>
          </div>

          {/* Amount */}
          <div className="flex gap-4">
            <div className="p-2 bg-[#fff5f2] text-[#de5212] rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
              <IndianRupee className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-[#768385] tracking-wider block">Amount Donated</span>
              <span className="text-xl font-extrabold text-[#de5212]">{formatCurrency(donation.amount)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#f0f9fa]">
            {/* Phone */}
            <div className="flex gap-3">
              <Phone className="h-4 w-4 text-[#128999] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">Phone Number</span>
                <span className="text-xs font-semibold text-[#144047] block truncate">{donation.phoneNumber}</span>
              </div>
            </div>

            {/* PAN Card */}
            <div className="flex gap-3">
              <CreditCard className="h-4 w-4 text-[#128999] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">PAN Card (India)</span>
                <span className="text-xs font-bold font-mono text-[#144047] block truncate">{donation.panCard}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#f0f9fa]">
            {/* Transaction ID */}
            <div className="flex gap-3">
              <Hash className="h-4 w-4 text-[#128999] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">UTR / Tx ID</span>
                <span className="text-xs font-semibold font-mono text-[#144047] block truncate select-all">{donation.transactionId}</span>
              </div>
            </div>

            {/* Date */}
            <div className="flex gap-3">
              <Calendar className="h-4 w-4 text-[#128999] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">Date Logged</span>
                <span className="text-[11px] font-semibold text-[#768385] block">{formatDate(donation.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <DialogFooter className="p-4 border-t border-[#e4e4e7] bg-[#f0f9fa]/20 flex sm:justify-between items-center gap-2">
          <Button
            variant="outline"
            onClick={copyDetailsToClipboard}
            className="flex-1 border-[#dcf0f1] hover:bg-[#fff5f2] text-[#de5212] font-semibold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer h-10"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Receipt Info</span>
              </>
            )}
          </Button>

          <Button
            onClick={onClose}
            className="flex-1 bg-[#128999] hover:bg-[#106f7e] text-white font-semibold rounded-xl text-xs h-10 cursor-pointer"
          >
            Close Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
