"use client";

import { Bell, Search, Menu, Sparkles } from "lucide-react";
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
    <header className="sticky top-0 z-30 p-3 pb-0">
      <div className="flex h-14 items-center gap-4 rounded-2xl bg-card/90 backdrop-blur-xl border border-border/50 shadow-sm px-4 lg:px-5">
        {/* Mobile menu */}
        <Button variant="ghost" size="icon" className="lg:hidden rounded-xl" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>

        {/* Greeting */}
        <div className="hidden sm:block">
          <p className="text-sm font-semibold">{user ? `Hey, ${user.firstName}` : "Dashboard"} <Sparkles className="inline h-3.5 w-3.5 text-amber-400" /></p>
          <p className="text-[10px] text-muted-foreground capitalize">{role} dashboard</p>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-sm ml-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9 h-9 bg-accent/50 border-0 rounded-xl text-sm focus-visible:ring-1" />
          </div>
        </div>

        <div className="flex-1 md:hidden" />

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          <Link href={`/${role}/notifications`}>
            <Button variant="ghost" size="icon" className="relative rounded-xl h-9 w-9">
              <Bell className="h-4 w-4" />
              {notificationCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground px-1">
                  {notificationCount}
                </span>
              )}
            </Button>
          </Link>

          <Link href={`/${role}/profile`}>
            <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-border hover:ring-primary/30 transition-all">
              <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-semibold">{user ? getInitials(`${user.firstName} ${user.lastName}`) : "TP"}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}
