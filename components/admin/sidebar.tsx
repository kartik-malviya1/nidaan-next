"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Image as ImageIcon,
  HeartHandshake,
  Mail,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
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
];

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <motion.div
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "h-screen bg-[#000000] border-r border-[#164a53]/30 flex flex-col justify-between text-white relative shadow-xl z-20"
      )}
    >
      {/* Brand Header Section */}
      <div>
        <div className={cn(
          "h-16 flex items-center border-b border-[#164a53]/20 px-6",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed ? (
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <span className="p-1.5 bg-[#de5212] rounded-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </span>
              <span className="font-extrabold text-lg tracking-tight text-white">
                NIDAAN <span className="text-[#ffcc00] font-medium text-xs ml-1 bg-white/10 px-1.5 py-0.5 rounded">CMS</span>
              </span>
            </Link>
          ) : (
            <Link href="/admin/dashboard" className="p-1.5 bg-[#de5212] rounded-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </Link>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            const linkContent = (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative",
                  isActive
                    ? "bg-gradient-to-r from-[#128999]/30 to-transparent text-[#ffcc00] border-l-2 border-[#ffcc00]"
                    : "text-[#86cbd0] hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 shrink-0 transition-transform group-hover:scale-110",
                  isActive ? "text-[#ffcc00]" : "text-[#86cbd0]"
                )} />

                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </Link>
            );

            if (isCollapsed) {
              return (
                <Tooltip key={item.name} delayDuration={0}>
                  <TooltipTrigger asChild>
                    {linkContent}
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-[#144047] text-white border-[#164a53]">
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return <div key={item.name}>{linkContent}</div>;
          })}
        </nav>
      </div>

      {/* Collapse Toggle Footer */}
      <div className="p-4 border-t border-[#164a53]/20 flex justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-[#86cbd0] hover:text-white hover:bg-white/5 rounded-xl cursor-pointer"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <div className="flex items-center gap-2">
              <ChevronLeft className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Collapse</span>
            </div>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
