// @ts-nocheck
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Menu, LogOut, User as UserIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TopNavbarProps {
  isCollapsed: boolean;
  setIsMobileOpen: (val: boolean) => void;
}

export default function TopNavbar({ isCollapsed, setIsMobileOpen }: TopNavbarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Get current page title for breadcrumb/header
  const getPageTitle = () => {
    if (pathname.includes("/admin/dashboard")) return "Dashboard Overview";
    if (pathname.includes("/admin/gallery")) return "Gallery Manager";
    if (pathname.includes("/admin/donations")) return "Donation Register";
    return "Admin CMS";
  };

  const getInitials = (name?: string | null) => {
    if (!name) return "AD";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-10 flex h-26 w-full items-center justify-between border-b border-[#e4e4e7] bg-white/80 backdrop-blur-md px-4 sm:px-6 shadow-sm">
      {/* Page Title & Hamburger */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden text-[#144047] hover:bg-[#f0f9fa]"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-lg font-bold text-[#144047] tracking-tight sm:text-xl">
            {getPageTitle()}
          </h2>
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        {/* NGO Tagline */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-[#de5212] bg-[#fff5f2] px-2.5 py-1 rounded-full border border-[#feeae5]">
          <Sparkles className="h-3 w-3" />
          <span>Every child has potential</span>
        </div>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full cursor-pointer focus-visible:ring-0 focus-visible:ring-offset-0">
              <Avatar className="h-9 w-9 border-2 border-[#128999]/30 transition-transform hover:scale-105">
                <AvatarFallback className="bg-[#128999] text-white font-bold text-xs">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-1 border-[#e4e4e7] rounded-xl" align="right" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold text-[#144047]">{user?.name || "Administrator"}</p>
                <p className="text-xs text-[#768385] truncate">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#e4e4e7]" />
            <DropdownMenuItem className="text-xs font-semibold text-[#768385] py-2.5 focus:bg-[#f0f9fa] focus:text-[#144047] cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4 text-[#128999]" />
              <span>Staff Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#e4e4e7]" />
            <DropdownMenuItem
              onClick={logout}
              className="text-xs font-bold text-red-600 py-2.5 focus:bg-red-50 focus:text-red-700 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4 text-red-600" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
