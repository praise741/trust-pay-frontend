"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className={cn("transition-all duration-300", sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-[260px]")}>
        <Topbar />
        <main className="p-4 lg:p-6 pb-24 lg:pb-6">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
