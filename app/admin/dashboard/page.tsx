// @ts-nocheck
"use client";

import React from "react";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { motion } from "framer-motion";
import {
  Image as ImageIcon,
  Heart,
  IndianRupee,
  PlusCircle,
  Eye,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  HeartHandshake,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboardStats();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // 1. Loading State (Skeletons)
  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-64 bg-[#dcf0f1]" />
          <Skeleton className="h-4 w-96 bg-[#dcf0f1]" />
        </div>

        {/* Stats Row Skeleton */}
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-[#e4e4e7] bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-4 w-28 bg-[#dcf0f1]" />
                <Skeleton className="h-8 w-8 rounded-full bg-[#dcf0f1]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-36 mb-2 bg-[#dcf0f1]" />
                <Skeleton className="h-3 w-48 bg-[#dcf0f1]" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contents Grid Skeleton */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-[#e4e4e7] bg-white">
              <CardHeader>
                <Skeleton className="h-6 w-48 bg-[#dcf0f1]" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((row) => (
                  <Skeleton key={row} className="h-12 w-full bg-[#dcf0f1]" />
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="border-[#e4e4e7] bg-white">
              <CardHeader>
                <Skeleton className="h-6 w-32 bg-[#dcf0f1]" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((row) => (
                  <Skeleton key={row} className="h-10 w-full bg-[#dcf0f1]" />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 border border-red-200 bg-red-50 text-red-700 rounded-xl">
        <h3 className="font-bold">Error loading stats</h3>
        <p className="text-sm">Please refresh the page or try logging in again.</p>
      </div>
    );
  }

  const { stats, recentUploads, recentDonations } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#144047] sm:text-3xl tracking-tight flex items-center gap-2">
            Namaste, Admin! <Sparkles className="h-6 w-6 text-[#ffcc00] animate-bounce" />
          </h1>
          <p className="text-[#768385] text-sm mt-1">
            Here's what's happening at NIDAAN Sewa Samiti today.
          </p>
        </div>

        {/* Quick actions panel floating */}
        <div className="flex gap-3">
          <Link href="/admin/gallery">
            <Button className="bg-[#128999] hover:bg-[#106f7e] text-white font-semibold rounded-xl text-xs px-4 py-2 flex items-center gap-1.5 shadow-sm shadow-[#128999]/20 cursor-pointer">
              <PlusCircle className="h-4 w-4" />
              <span>Upload Image</span>
            </Button>
          </Link>
          <Link href="/admin/donations">
            <Button variant="outline" className="border-[#dcf0f1] hover:bg-[#fff5f2] text-[#de5212] font-semibold rounded-xl text-xs px-4 py-2 cursor-pointer">
              <Eye className="h-4 w-4" />
              <span>Donations</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-3"
      >
        {/* Card 1: Total Donations Sum */}
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden border border-[#dcf0f1] bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#fffbeb] rounded-full blur-3xl opacity-50 group-hover:scale-125 transition-transform duration-300" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-xs font-bold uppercase tracking-wider text-[#768385]">
                Total Donations Amount
              </CardDescription>
              <div className="p-2.5 bg-[#fffbeb] text-[#ffcc00] rounded-xl">
                <IndianRupee className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-3xl font-extrabold text-[#144047]">
                {formatCurrency(stats.totalDonationAmount)}
              </CardTitle>
              <p className="text-xs text-[#de5212] font-semibold mt-1.5 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {/* <span>100% Tax Compliant (80G)</span> */}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card 2: Total Donors Count */}
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden border border-[#dcf0f1] bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#fff5f2] rounded-full blur-3xl opacity-50 group-hover:scale-125 transition-transform duration-300" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-xs font-bold uppercase tracking-wider text-[#768385]">
                Total Donations Count
              </CardDescription>
              <div className="p-2.5 bg-[#fff5f2] text-[#de5212] rounded-xl">
                <Heart className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-3xl font-extrabold text-[#144047]">
                {stats.totalDonations}
              </CardTitle>
              <p className="text-xs text-[#768385] mt-1.5">
                Individual supporter transactions recorded
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card 3: Total Gallery Images */}
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden border border-[#dcf0f1] bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-full blur-3xl opacity-50 group-hover:scale-125 transition-transform duration-300" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-xs font-bold uppercase tracking-wider text-[#768385]">
                Total Gallery Images
              </CardDescription>
              <div className="p-2.5 bg-cyan-50 text-[#128999] rounded-xl">
                <ImageIcon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-3xl font-extrabold text-[#144047]">
                {stats.totalGalleryImages}
              </CardTitle>
              <p className="text-xs text-[#768385] mt-1.5">
                Active images showcasing program impacts
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Primary Panels Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Recent Donations Table */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-[#dcf0f1] bg-white shadow-sm rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-[#144047]">Recent Donations</CardTitle>
                <CardDescription className="text-xs text-[#768385] mt-1">
                  Summary of the latest funds received.
                </CardDescription>
              </div>
              <Link href="/admin/donations">
                <Button variant="ghost" size="sm" className="text-xs font-bold text-[#128999] hover:bg-[#f0f9fa] hover:text-[#106f7e] cursor-pointer">
                  <span>View All</span>
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {recentDonations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <div className="p-4 bg-[#fff5f2] rounded-full text-[#de5212] mb-3">
                    <HeartHandshake className="h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-[#144047]">No donations recorded</h4>
                  <p className="text-xs text-[#768385] max-w-xs mt-1">
                    Donations will show up here once supporters submit transactions.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-[#f0f9fa]/50">
                      <TableRow className="hover:bg-transparent border-b border-[#e4e4e7]">
                        <TableHead className="font-bold text-[#144047] h-10 px-6">Donor</TableHead>
                        <TableHead className="font-bold text-[#144047] h-10 px-6 text-right">Amount</TableHead>
                        <TableHead className="font-bold text-[#144047] h-10 px-6">Transaction / UTR</TableHead>
                        <TableHead className="font-bold text-[#144047] h-10 px-6">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentDonations.map((donation) => (
                        <TableRow key={donation.id} className="hover:bg-[#f0f9fa]/20 border-b border-[#e4e4e7]">
                          <TableCell className="px-6 py-4 font-semibold text-[#144047]">
                            {donation.name}
                          </TableCell>
                          <TableCell className="px-6 py-4 text-right font-extrabold text-[#de5212]">
                            {formatCurrency(donation.amount)}
                          </TableCell>
                          <TableCell className="px-6 py-4 font-mono text-xs text-[#768385]">
                            {donation.transactionId}
                          </TableCell>
                          <TableCell className="px-6 py-4 text-xs text-[#768385]">
                            {formatDate(donation.createdAt)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Recent Uploads Thumbnails */}
        <div className="space-y-6">
          <Card className="border border-[#dcf0f1] bg-white shadow-sm rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-[#144047]">Recent Uploads</CardTitle>
                <CardDescription className="text-xs text-[#768385] mt-1">
                  Latest gallery impact assets.
                </CardDescription>
              </div>
              <Link href="/admin/gallery">
                <Button variant="ghost" size="sm" className="text-xs font-bold text-[#128999] hover:bg-[#f0f9fa] hover:text-[#106f7e] cursor-pointer">
                  <span>View Grid</span>
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentUploads.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                  <div className="p-3 bg-[#f0f9fa] rounded-full text-[#128999] mb-3">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-xs text-[#144047]">No images uploaded</h4>
                  <p className="text-[10px] text-[#768385] max-w-xs mt-1">
                    Upload program images inside the gallery manager page to showcase impacts.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentUploads.map((img) => (
                    <div key={img.id} className="flex items-center gap-3 p-2 hover:bg-[#f0f9fa]/40 rounded-xl transition-all duration-200">
                      <div className="h-12 w-12 rounded-lg overflow-hidden shrink-0 border border-[#dcf0f1] bg-neutral-100">
                        <img
                          src={img.url}
                          alt={img.title || "Gallery thumbnail"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-[#144047] truncate">
                          {img.title || "Untitled Image"}
                        </h4>
                        <div className="flex gap-1.5 mt-1 items-center">
                          <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-[#dcf0f1] bg-[#f0f9fa] text-[#128999] font-medium font-semibold uppercase">
                            {img.category || "General"}
                          </Badge>
                          <span className="text-[9px] text-[#768385]">
                            {formatDate(img.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
