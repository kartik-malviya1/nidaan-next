import React from "react";
import { AuthProvider } from "@/contexts/auth-context";
import { QueryProvider } from "@/providers/query-provider";
import AdminLayoutShell from "@/components/admin/admin-layout";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryProvider>
        <TooltipProvider>
          <AdminLayoutShell>{children}</AdminLayoutShell>
        </TooltipProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
