"use client";

import { useState } from "react";
import { Bell, Search, Menu, Sparkles, X, ChevronRight, LogOut, Settings, User, CreditCard, MessageCircle, ShieldAlert, LayoutDashboard, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useAppStore } from "@/store/app-store";
import { useAuthStore } from "@/store/auth-store";
import { getInitials } from "@/lib/utils";

export function Topbar() {
  const { notificationCount, searchQuery, setSearchQuery } = useAppStore();
  const { user, role, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: `/${role}/dashboard` },
    { icon: CreditCard, label: "Transactions", href: `/${role}/transactions` },
    { icon: MessageCircle, label: "Messages", href: `/${role}/messages` },
    { icon: Wallet, label: "Wallet", href: `/${role}/wallet` },
    { icon: ShieldAlert, label: "Disputes", href: `/${role}/disputes` },
    { icon: Bell, label: "Notifications", href: `/${role}/notifications` },
    { icon: User, label: "Profile", href: `/${role}/profile` },
    { icon: Settings, label: "Settings", href: `/${role}/settings` },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 p-3 pb-0">
        <div className="flex h-14 items-center gap-4 rounded-2xl bg-card/90 backdrop-blur-xl border border-border/50 shadow-sm px-4 lg:px-5">
          {/* Mobile: Logo left */}
          <div className="lg:hidden flex items-center gap-2">
            <Image src="/logo.jpg" alt="TrustPay" width={28} height={28} className="rounded-lg" style={{ width: "auto", height: "auto" }} />
            <span className="font-bold text-sm">TrustPay</span>
          </div>

          {/* Desktop: Greeting */}
          <div className="hidden lg:block">
            <p className="text-sm font-semibold">{user ? `Hey, ${user.firstName}` : "Dashboard"} <Sparkles className="inline h-3.5 w-3.5 text-amber-400" /></p>
            <p className="text-[10px] text-muted-foreground capitalize">{role} dashboard</p>
          </div>

          {/* Desktop: Search */}
          <div className="hidden md:flex flex-1 max-w-sm ml-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="pl-9 h-9 bg-accent/50 border-0 rounded-xl text-sm focus-visible:ring-1" />
            </div>
          </div>

          <div className="flex-1 lg:hidden" />

          {/* Right side */}
          <div className="flex items-center gap-1.5">
            <ThemeToggle />

            {/* Desktop: notification + avatar */}
            <div className="hidden lg:flex items-center gap-1.5">
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

            {/* Mobile: Hamburger */}
            <Button variant="ghost" size="icon" className="lg:hidden rounded-xl h-9 w-9" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setMobileMenuOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-card border-l border-border shadow-2xl lg:hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">{user ? getInitials(`${user.firstName} ${user.lastName}`) : "TP"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{user?.firstName} {user?.lastName}</p>
                    <p className="text-[10px] text-muted-foreground capitalize">{role} account</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Nav Items */}
              <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                {mobileNavItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors">
                    <item.icon className="h-[18px] w-[18px]" />
                    {item.label}
                    <ChevronRight className="h-4 w-4 ml-auto opacity-30" />
                  </Link>
                ))}
              </nav>

              {/* Logout */}
              <div className="border-t border-border p-3">
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                  <LogOut className="h-[18px] w-[18px]" />
                  Sign out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
