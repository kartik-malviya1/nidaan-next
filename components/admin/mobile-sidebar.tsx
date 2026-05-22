"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Image as ImageIcon,
  HeartHandshake,
  Mail,
  Users,
  Sparkles,
} from "lucide-react";

interface MobileSidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const navItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Gallery",
    href: "/admin/gallery",
    icon: ImageIcon,
  },
  {
    name: "Donations",
    href: "/admin/donations",
    icon: HeartHandshake,
  },
  {
    name: "Contacts",
    href: "/admin/contact",
    icon: Mail,
  },
  {
    name: "Applications",
    href: "/admin/applications",
    icon: Users,
  },
];

export default function MobileSidebar({ isOpen, setIsOpen }: MobileSidebarProps) {
  const pathname = usePathname();

  // Close drawer on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="w-[280px] p-0 border-r border-[#164a53]/20 bg-[#09292f] text-white">
        <SheetHeader className="p-6 border-b border-[#164a53]/20 text-left">
          <SheetTitle className="text-white flex items-center gap-2">
            <span className="p-1.5 bg-[#de5212] rounded-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <span className="font-extrabold text-lg tracking-tight">
              NIDAAN <span className="text-[#ffcc00] font-semibold text-xs ml-1 bg-white/10 px-1.5 py-0.5 rounded">CMS</span>
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* Navigation links */}
        <nav className="p-6 space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 group border-l-2",
                  isActive
                    ? "bg-[#128999]/30 text-[#ffcc00] border-[#ffcc00]"
                    : "text-[#86cbd0] hover:text-white hover:bg-white/5 border-transparent"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 shrink-0 transition-transform group-hover:scale-110",
                  isActive ? "text-[#ffcc00]" : "text-[#86cbd0]"
                )} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
