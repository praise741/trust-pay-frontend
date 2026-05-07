"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useAppStore } from "@/store/app-store";
import { useAuthStore } from "@/store/auth-store";
import { getInitials } from "@/lib/utils";
import Link from "next/link";

export function Topbar() {
  const { notificationCount, setSidebarOpen } = useAppStore();
  const { user, role } = useAuthStore();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/80 backdrop-blur-xl px-4 lg:px-6">
      {/* Mobile menu */}
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search */}
      <div className="hidden sm:flex flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search transactions, users..." className="pl-10 bg-muted/50 border-0 focus-visible:ring-1" />
        </div>
      </div>

      <div className="flex-1 sm:hidden" />

      {/* Right side */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        <Link href={`/${role}/notifications`}>
          <Button variant="ghost" size="icon" className="relative rounded-xl">
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground px-1">
                {notificationCount}
              </span>
            )}
          </Button>
        </Link>

        <Link href={`/${role}/profile`}>
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarFallback className="text-xs">{user ? getInitials(`${user.firstName} ${user.lastName}`) : "TP"}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
