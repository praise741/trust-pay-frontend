"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { useAppStore } from "@/store/app-store";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useAppStore();
  const { isAuthenticated, role } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Role-based route protection
    if (role && pathname) {
      if (pathname.startsWith("/admin") && role !== "admin") {
        router.push(`/${role}/dashboard`);
      } else if (pathname.startsWith("/seller") && role !== "seller") {
        router.push(`/${role}/dashboard`);
      } else if (pathname.startsWith("/buyer") && role !== "buyer") {
        router.push(`/${role}/dashboard`);
      }
    }
  }, [isAuthenticated, role, pathname, router]);

  if (!isMounted || !isAuthenticated) {
    return null; // Or a loading spinner
  }

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
