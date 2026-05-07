"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ChevronLeft, LogOut } from "lucide-react";
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
        className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 border-r border-border bg-card/80 backdrop-blur-xl"
      >
        {/* Logo */}
        <div className={cn("flex items-center h-16 px-4 border-b border-border", sidebarCollapsed ? "justify-center" : "gap-2.5")}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-primary">
            <Shield className="h-4.5 w-4.5 text-white" />
          </div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} className="text-lg font-bold tracking-tight whitespace-nowrap overflow-hidden">
                TrustPay
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = getIcon(item.icon);
            const isActive = pathname.startsWith(item.href);
            const link = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative",
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  sidebarCollapsed && "justify-center px-2"
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && <motion.div layoutId="activeNav" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary" />}
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

        {/* Collapse + User */}
        <div className="border-t border-border p-3 space-y-2">
          <button onClick={toggleSidebar} className="flex items-center justify-center w-full rounded-xl py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <ChevronLeft className={cn("h-4 w-4 transition-transform duration-300", sidebarCollapsed && "rotate-180")} />
          </button>
          {user && (
            <div className={cn("flex items-center gap-3 rounded-xl p-2", sidebarCollapsed && "justify-center")}>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">{getInitials(`${user.firstName} ${user.lastName}`)}</AvatarFallback>
              </Avatar>
              {!sidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-muted-foreground truncate capitalize">{user.role}</p>
                </div>
              )}
              {!sidebarCollapsed && (
                <button onClick={logout} className="text-muted-foreground hover:text-destructive transition-colors">
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
