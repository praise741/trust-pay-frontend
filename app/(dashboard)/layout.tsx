"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useAppStore();

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />
      <div className={cn("transition-all duration-300", sidebarCollapsed ? "lg:pl-[88px]" : "lg:pl-[276px]")}>
        <Topbar />
        <main className="p-3 lg:p-5 pb-24 lg:pb-5">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
