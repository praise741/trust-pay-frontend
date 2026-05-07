"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  delay?: number;
  className?: string;
}

export function KPICard({ title, value, change, changeType = "neutral", icon: Icon, delay = 0, className }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn("group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20", className)}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {change && (
            <div className="flex items-center gap-1">
              <span className={cn("text-xs font-semibold",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}>
                {change}
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}
