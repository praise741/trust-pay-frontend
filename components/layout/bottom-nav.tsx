"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutDashboard, ArrowLeftRight, MessageCircle, Wallet, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

const TABS = [
  { icon: LayoutDashboard, label: "Home", path: "dashboard" },
  { icon: ArrowLeftRight, label: "Deals", path: "transactions" },
  { icon: MessageCircle, label: "Chat", path: "messages" },
  { icon: Wallet, label: "Wallet", path: "wallet" },
  { icon: User, label: "Profile", path: "profile" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { role } = useAuthStore();

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden">
      <div className="mx-3 mb-3">
        <nav className="rounded-2xl bg-card/90 backdrop-blur-xl border border-border/50 shadow-2xl px-1 py-1.5 flex items-center justify-around">
          {TABS.map((tab) => {
            const href = `/${role}/${tab.path}`;
            const isActive = pathname.includes(tab.path);
            return (
              <Link key={tab.path} href={href} className="relative flex flex-col items-center gap-0.5 px-3 py-1.5">
                {isActive && (
                  <motion.div
                    layoutId="bottomNavActive"
                    className="absolute inset-0 rounded-xl bg-primary/10"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <tab.icon className={cn("h-5 w-5 relative z-10 transition-colors", isActive ? "text-primary" : "text-muted-foreground")} />
                <span className={cn("text-[10px] font-medium relative z-10 transition-colors", isActive ? "text-primary" : "text-muted-foreground")}>{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
