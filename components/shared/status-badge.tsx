"use client";

import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  config?: Record<string, { label: string; color: string }>;
  className?: string;
}

const DEFAULT_CONFIG: Record<string, { label: string; color: string }> = {
  active: { label: "Active", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
  completed: { label: "Completed", color: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" },
  failed: { label: "Failed", color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" },
  cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
};

export function StatusBadge({ status, config, className }: StatusBadgeProps) {
  const cfg = config || DEFAULT_CONFIG;
  const statusInfo = cfg[status] || { label: status, color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" };

  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", statusInfo.color, className)}>
      {statusInfo.label}
    </span>
  );
}
