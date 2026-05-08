"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, LogOut } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import { useAuthStore } from "@/store/auth-store";
import { BUYER_NAV_ITEMS, SELLER_NAV_ITEMS, ADMIN_NAV_ITEMS } from "@/constants";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { NavItem } from "@/types";

function getIcon(iconName: string) {
  const IconComp = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
  return IconComp || Icons.Circle;
}

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const { user, role, logout } = useAuthStore();

  const navItems: NavItem[] = role === "admin" ? ADMIN_NAV_ITEMS : role === "seller" ? SELLER_NAV_ITEMS : BUYER_NAV_ITEMS;

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 p-3"
      >
        <div className="flex flex-col h-full rounded-2xl bg-card/90 backdrop-blur-xl border border-border/50 shadow-xl overflow-hidden">
          {/* Logo */}
          <div className={cn("flex items-center h-14 px-4 border-b border-border/50", sidebarCollapsed ? "justify-center" : "gap-2.5")}>
            <Image src="/logo.jpg" alt="TrustPay" width={30} height={30} className="rounded-lg shrink-0" style={{ width: "auto", height: "auto" }} />
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} className="text-base font-bold tracking-tight whitespace-nowrap overflow-hidden">
                  TrustPay
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
            {navItems.map((item) => {
              const Icon = getIcon(item.icon);
              const isActive = pathname.startsWith(item.href);
              const link = (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 group relative",
                    isActive ? "bg-primary/10 text-primary shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                    sidebarCollapsed && "justify-center px-2"
                  )}
                >
                  <Icon className={cn("h-[18px] w-[18px] shrink-0", isActive && "text-primary")} />
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap text-[13px]">
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && <motion.div layoutId="activeNav" className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary" />}
                  {item.badge && !sidebarCollapsed && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground px-1.5">{item.badge}</span>
                  )}
                </Link>
              );

              return sidebarCollapsed ? (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{link}</TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              ) : link;
            })}
          </nav>

          {/* Bottom */}
          <div className="border-t border-border/50 p-2 space-y-1">
            <button onClick={toggleSidebar} className="flex items-center justify-center w-full rounded-xl py-2 text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors">
              <ChevronLeft className={cn("h-4 w-4 transition-transform duration-300", sidebarCollapsed && "rotate-180")} />
            </button>
            {user && (
              <div className={cn("flex items-center gap-2.5 rounded-xl p-2 bg-accent/30", sidebarCollapsed && "justify-center")}>
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">{getInitials(`${user.firstName} ${user.lastName}`)}</AvatarFallback>
                </Avatar>
                {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{user.firstName} {user.lastName}</p>
                    <p className="text-[10px] text-muted-foreground truncate capitalize">{user.role}</p>
                  </div>
                )}
                {!sidebarCollapsed && (
                  <button onClick={logout} className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded-lg hover:bg-accent">
                    <LogOut className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
