"use client";

import React, { useState } from "react";
import { useContacts } from "@/hooks/use-contact";
import ContactsEmptyState from "@/components/admin/contact/contacts-empty-state";
import ContactDetailModal from "@/components/admin/contact/contact-detail-modal";
import { Contact } from "@/lib/types";
import {
  Search,
  Eye,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContactsAdminPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const { data, isLoading, error } = useContacts({
    page,
    search: searchQuery,
    sortBy,
    sortOrder,
    limit: 10,
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
    setPage(1); // Reset to page 1 on sort change
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
    setPage(1); // Reset page on filter
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#144047] sm:text-3xl tracking-tight flex items-center gap-2">
            Inquiries Register
            <span className="text-[10px] uppercase font-bold text-[#128999] bg-[#ebf7f8] px-2.5 py-0.5 rounded-full border border-[#dcf0f1]">
              Messages
            </span>
          </h1>
          <p className="text-[#768385] text-sm mt-1">
            Review and manage public support inquiries and visitor feedback messages.
          </p>
        </div>

        {/* Short NGO stat tag */}
        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-[#128999] bg-[#ebf7f8] px-3.5 py-2 rounded-2xl border border-[#dcf0f1]">
          <Mail className="h-4 w-4" />
          <span>Inbox Active</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#dcf0f1] shadow-sm flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#768385]" />
          <Input
            placeholder="Search inquiries by name, email, phone, or message content..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 h-10 border-[#e4e4e7] placeholder-[#768385]/50 focus:border-[#128999] focus:ring-[#128999]/10 rounded-xl"
          />
        </div>
      </div>

      {/* Skeletons Loader */}
      {isLoading && (
        <div className="bg-white border border-[#dcf0f1] rounded-2xl overflow-hidden shadow-sm animate-pulse">
          <div className="h-12 bg-[#f0f9fa]/50 border-b border-[#e4e4e7] flex items-center px-6 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-4 w-28 bg-[#dcf0f1]" />
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
          <h4 className="font-bold">Failed to load contacts database</h4>
          <p className="text-xs">Ensure database credentials and route authorization headers are correct.</p>
        </div>
      )}

      {/* Desktop Table & Mobile Card View */}
      {!isLoading && !error && data && (
        <>
          {data.data.length === 0 ? (
            <ContactsEmptyState hasFilters={searchQuery.length > 0} />
          ) : (
            <div className="space-y-6">
              {/* Desktop Table View */}
              <div className="hidden md:block bg-white border border-[#dcf0f1] rounded-2xl overflow-hidden shadow-sm">
                <Table>
                  <TableHeader className="bg-[#f0f9fa]/50">
                    <TableRow className="hover:bg-transparent border-b border-[#e4e4e7]">
                      <TableHead className="font-bold text-[#144047] h-12 px-6">
                        <div className="flex items-center cursor-pointer select-none" onClick={() => handleSort("name")}>
                          <span>Full Name</span>
                          {renderSortIcon("name")}
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-[#144047] h-12 px-6">Phone Number</TableHead>
                      <TableHead className="font-bold text-[#144047] h-12 px-6">Email Address</TableHead>
                      <TableHead className="font-bold text-[#144047] h-12 px-6">Message Preview</TableHead>
                      <TableHead
                        onClick={() => handleSort("createdAt")}
                        className="font-bold text-[#144047] h-12 px-6 cursor-pointer select-none hover:bg-[#dcf0f1]/30 transition-colors"
                      >
                        <div className="flex items-center">
                          <span>Received Date</span>
                          {renderSortIcon("createdAt")}
                        </div>
                      </TableHead>
                      <TableHead className="w-[80px] h-12 px-6"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.data.map((contact) => (
                      <TableRow
                        key={contact.id}
                        onClick={() => setSelectedContact(contact)}
                        className="hover:bg-[#f0f9fa]/30 border-b border-[#e4e4e7] cursor-pointer transition-colors"
                      >
                        <TableCell className="px-6 py-4 font-bold text-[#144047]">
                          {contact.name}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-sm text-[#768385]">
                          {contact.phoneNumber}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-sm text-[#768385]">
                          {contact.email || <span className="text-[#aab3b5] italic text-[11px]">Not Provided</span>}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-xs text-[#768385] max-w-[200px] truncate">
                          {contact.message}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-xs text-[#768385]">
                          {formatDate(contact.createdAt)}
                        </TableCell>
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

              {/* Mobile stacked Card Layout */}
              <div className="grid gap-4 md:hidden">
                {data.data.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className="p-4 bg-white border border-[#dcf0f1] rounded-2xl shadow-sm active:scale-[0.99] transition-transform flex flex-col gap-3 cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-sm text-[#144047]">{contact.name}</h4>
                        <span className="text-[10px] text-[#768385]">
                          {formatDate(contact.createdAt)}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-[#128999] bg-[#ebf7f8] px-2 py-0.5 rounded-full border border-[#dcf0f1]">
                        View Inquiry
                      </span>
                    </div>

                    <div className="text-xs text-[#768385] line-clamp-2 bg-[#f8fafc] border border-[#e4e4e7] p-2.5 rounded-xl">
                      {contact.message}
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#f0f9fa] text-[11px]">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">Phone</span>
                        <span className="font-semibold text-[#144047]">{contact.phoneNumber}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-[#768385] tracking-wider block">Email</span>
                        <span className="text-[#768385] truncate block w-full">
                          {contact.email || <span className="text-[#aab3b5] italic text-[10px]">Not Provided</span>}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom Responsive Pagination */}
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

                        // Limit displayed page index numbers on overflow
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

      {/* Contact Detail popup Dialog modal */}
      <ContactDetailModal
        contact={selectedContact}
        isOpen={selectedContact !== null}
        onClose={() => setSelectedContact(null)}
      />
    </div>
  );
}
