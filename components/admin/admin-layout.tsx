"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import TopNavbar from "./top-navbar";
import MobileSidebar from "./mobile-sidebar";
import { useAuth } from "@/contexts/auth-context";
import { Loader2 } from "lucide-react";

export default function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Auto-collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show a premium loading screen while checking auth session
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#09292f] text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-[#ffcc00]" />
          <p className="text-sm font-semibold tracking-wider text-[#86cbd0] uppercase animate-pulse">
            Verifying Admin Session...
          </p>
        </div>
      </div>
    );
  }

  // Fallback if not authenticated (middleware handles redirect, but this protects visual flash)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#f0f9fa] text-[#144047] font-sans antialiased overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block shrink-0">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Mobile Drawer Sidebar */}
      <MobileSidebar isOpen={isMobileOpen} setIsOpen={setIsMobileOpen} />

      {/* Main Content Workspace */}
      <div className="flex flex-col flex-1 min-w-0 overflow-y-auto h-screen">
        <TopNavbar
          isCollapsed={isCollapsed}
          setIsMobileOpen={setIsMobileOpen}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}
