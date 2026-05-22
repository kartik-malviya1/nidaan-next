// @ts-nocheck
"use client";

import React, { useState } from "react";
import { useApplications } from "@/hooks/use-applications";
import ApplicationsEmptyState from "@/components/admin/applications/applications-empty-state";
import ApplicationDetailModal from "@/components/admin/applications/application-detail-modal";
import { Application } from "@/lib/types";
import {
  Search,
  Eye,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const typeFilters = [
  { label: "All", value: "" },
  { label: "🤝 Volunteer", value: "Volunteer" },
  { label: "🎓 Internship", value: "Internship" },
];

const statusFilters = [
  { label: "All Status", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Reviewed", value: "reviewed" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
];

const statusBadge: Record<string, { bg: string; text: string; border: string }> = {
  pending: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  reviewed: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  accepted: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  rejected: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
};

export default function ApplicationsAdminPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const { data, isLoading, error } = useApplications({
    page,
    search: searchQuery,
    sortBy,
    sortOrder,
    limit: 10,
    type: typeFilter,
    status: statusFilter,
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    setPage(1);
  };

  const renderSortIcon = (field: string) => {
    if (sortBy !== field) return <ArrowUpDown className="ml-1 h-3.5 w-3.5 opacity-40 shrink-0" />;
    return sortOrder === "asc" ? (
      <ArrowUp className="ml-1 h-3.5 w-3.5 text-[#128999] shrink-0" />
    ) : (
      <ArrowDown className="ml-1 h-3.5 w-3.5 text-[#128999] shrink-0" />
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const getStatusBadge = (status: string) => {
    const config = statusBadge[status] || statusBadge.pending;
    return (
      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${config.bg} ${config.text} ${config.border}`}>
        {status}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const isVolunteer = type === "Volunteer";
    return (
      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
        isVolunteer
          ? "bg-purple-50 text-purple-700 border-purple-200"
          : "bg-sky-50 text-sky-700 border-sky-200"
      }`}>
        {type}
      </span>
    );
  };

  const hasFilters = searchQuery.length > 0 || typeFilter.length > 0 || statusFilter.length > 0;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#144047] sm:text-3xl tracking-tight flex items-center gap-2">
            Applications
            <span className="text-[10px] uppercase font-bold text-[#128999] bg-[#ebf7f8] px-2.5 py-0.5 rounded-full border border-[#dcf0f1]">
              Volunteer & Internship
            </span>
          </h1>
          <p className="text-[#768385] text-sm mt-1">
            Review and manage volunteer and internship applications from the public form.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-[#128999] bg-[#ebf7f8] px-3.5 py-2 rounded-2xl border border-[#dcf0f1]">
          <Users className="h-4 w-4" />
          <span>Applications Portal</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#dcf0f1] shadow-sm space-y-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#768385]" />
          <Input
            placeholder="Search by name, email, phone, city, institution, or area..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 h-10 border-[#e4e4e7] placeholder-[#768385]/50 focus:border-[#128999] focus:ring-[#128999]/10 rounded-xl"
          />
        </div>

        {/* Type & Status Filters */}
        <div className="flex flex-wrap gap-3">
          {/* Type tabs */}
          <div className="flex bg-[#f0f9fa] rounded-xl p-1 border border-[#dcf0f1]">
            {typeFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => { setTypeFilter(f.value); setPage(1); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  typeFilter === f.value
                    ? "bg-white text-[#144047] shadow-sm border border-[#dcf0f1]"
                    : "text-[#768385] hover:text-[#144047]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex bg-[#f0f9fa] rounded-xl p-1 border border-[#dcf0f1]">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => { setStatusFilter(f.value); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === f.value
                    ? "bg-white text-[#144047] shadow-sm border border-[#dcf0f1]"
                    : "text-[#768385] hover:text-[#144047]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="bg-white border border-[#dcf0f1] rounded-2xl overflow-hidden shadow-sm animate-pulse">
          <div className="h-12 bg-[#f0f9fa]/50 border-b border-[#e4e4e7] flex items-center px-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-4 w-24 bg-[#dcf0f1]" />
            ))}
          </div>
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((row) => (
              <Skeleton key={row} className="h-10 w-full bg-[#dcf0f1]" />
            ))}
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="p-6 border border-red-200 bg-red-50 text-red-700 rounded-xl">
          <h4 className="font-bold">Failed to load applications</h4>
          <p className="text-xs">Ensure database credentials and route authorization headers are correct.</p>
        </div>
      )}

      {/* Table & Cards */}
      {!isLoading && !error && data && (
        <>
          {data.data.length === 0 ? (
            <ApplicationsEmptyState hasFilters={hasFilters} />
          ) : (
            <div className="space-y-6">
              {/* Desktop Table */}
              <div className="hidden md:block bg-white border border-[#dcf0f1] rounded-2xl overflow-hidden shadow-sm">
                <Table>
                  <TableHeader className="bg-[#f0f9fa]/50">
                    <TableRow className="hover:bg-transparent border-b border-[#e4e4e7]">
                      <TableHead className="font-bold text-[#144047] h-12 px-6">
                        <div className="flex items-center cursor-pointer select-none" onClick={() => handleSort("name")}>
                          <span>Name</span>
                          {renderSortIcon("name")}
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-[#144047] h-12 px-6">Type</TableHead>
                      <TableHead className="font-bold text-[#144047] h-12 px-6">Area</TableHead>
                      <TableHead className="font-bold text-[#144047] h-12 px-6">City</TableHead>
                      <TableHead className="font-bold text-[#144047] h-12 px-6">Status</TableHead>
                      <TableHead
                        onClick={() => handleSort("createdAt")}
                        className="font-bold text-[#144047] h-12 px-6 cursor-pointer select-none hover:bg-[#dcf0f1]/30 transition-colors"
                      >
                        <div className="flex items-center">
                          <span>Date</span>
                          {renderSortIcon("createdAt")}
                        </div>
                      </TableHead>
                      <TableHead className="w-[80px] h-12 px-6"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.data.map((app) => (
                      <TableRow
                        key={app.id}
                        onClick={() => setSelectedApp(app)}
                        className="hover:bg-[#f0f9fa]/30 border-b border-[#e4e4e7] cursor-pointer transition-colors"
                      >
                        <TableCell className="px-6 py-4">
                          <div>
                            <div className="font-bold text-[#144047]">{app.name}</div>
                            <div className="text-[11px] text-[#768385]">{app.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4">{getTypeBadge(app.type)}</TableCell>
                        <TableCell className="px-6 py-4 text-xs text-[#768385] max-w-[140px] truncate">{app.area}</TableCell>
                        <TableCell className="px-6 py-4 text-xs text-[#768385]">{app.city}</TableCell>
                        <TableCell className="px-6 py-4">{getStatusBadge(app.status)}</TableCell>
                        <TableCell className="px-6 py-4 text-xs text-[#768385]">{formatDate(app.createdAt)}</TableCell>
                        <TableCell className="px-6 py-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-[#128999] hover:bg-[#f0f9fa] rounded-lg cursor-pointer"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card Layout */}
              <div className="grid gap-4 md:hidden">
                {data.data.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className="p-4 bg-white border border-[#dcf0f1] rounded-2xl shadow-sm active:scale-[0.99] transition-transform flex flex-col gap-3 cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-sm text-[#144047]">{app.name}</h4>
                        <span className="text-[10px] text-[#768385]">{formatDate(app.createdAt)}</span>
                      </div>
                      <div className="flex gap-1.5">
                        {getTypeBadge(app.type)}
                        {getStatusBadge(app.status)}
                      </div>
                    </div>

                    <div className="text-xs text-[#768385] bg-[#f8fafc] border border-[#e4e4e7] p-2.5 rounded-xl line-clamp-2">
                      {app.motivation}
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#f0f9fa] text-[11px]">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">Area</span>
                        <span className="font-semibold text-[#144047] truncate block">{app.area}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">City</span>
                        <span className="font-semibold text-[#144047]">{app.city}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">Email</span>
                        <span className="text-[#768385] truncate block w-full">{app.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {data.meta.pages > 1 && (
                <div className="flex items-center justify-between bg-white px-4 py-3 border border-[#dcf0f1] rounded-2xl shadow-sm">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <Button
                      variant="outline"
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="border-[#dcf0f1] rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setPage(Math.min(data.meta.pages, page + 1))}
                      disabled={page === data.meta.pages}
                      className="border-[#dcf0f1] rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Next
                    </Button>
                  </div>

                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs text-[#768385]">
                        Showing page <span className="font-bold text-[#144047]">{page}</span> of{" "}
                        <span className="font-bold text-[#144047]">{data.meta.pages}</span> (
                        <span className="font-semibold text-[#144047]">{data.meta.total}</span> records total)
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="h-8 w-8 border-[#dcf0f1] text-[#768385] rounded-lg cursor-pointer"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      {Array.from({ length: data.meta.pages }).map((_, index) => {
                        const pageNum = index + 1;
                        const isCurrent = pageNum === page;

                        if (
                          data.meta.pages > 5 &&
                          Math.abs(pageNum - page) > 2 &&
                          pageNum !== 1 &&
                          pageNum !== data.meta.pages
                        ) {
                          if (pageNum === 2 || pageNum === data.meta.pages - 1) {
                            return <span key={pageNum} className="text-xs text-[#768385] px-1">...</span>;
                          }
                          return null;
                        }

                        return (
                          <Button
                            key={pageNum}
                            variant={isCurrent ? "default" : "outline"}
                            onClick={() => setPage(pageNum)}
                            className={`h-8 w-8 rounded-lg text-xs font-bold p-0 cursor-pointer ${isCurrent
                                ? "bg-[#128999] hover:bg-[#106f7e] text-white"
                                : "border-[#dcf0f1] text-[#768385] hover:bg-[#f0f9fa]"
                              }`}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setPage(Math.min(data.meta.pages, page + 1))}
                        disabled={page === data.meta.pages}
                        className="h-8 w-8 border-[#dcf0f1] text-[#768385] rounded-lg cursor-pointer"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Detail Modal */}
      <ApplicationDetailModal
        application={selectedApp}
        isOpen={selectedApp !== null}
        onClose={() => setSelectedApp(null)}
      />
    </div>
  );
}
