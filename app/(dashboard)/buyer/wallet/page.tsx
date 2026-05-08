"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, ArrowDownLeft, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DEAL_STATUS_CONFIG } from "@/constants";
import { buyerService } from "@/services/api";
import { formatCurrency, formatDateTime, cn } from "@/lib/utils";
import Link from "next/link";
import type { BackendDeal } from "@/types";

export default function BuyerWalletPage() {
  const [deals, setDeals] = useState<BackendDeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const { data } = await buyerService.deals();
        setDeals(data || []);
      } catch {
        setDeals([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const totalSpent = deals
    .filter((d) => ["PAID", "SHIPPED", "COMPLETED", "DISPUTED"].includes(d.status))
    .reduce((sum, d) => sum + parseFloat(d.amount || "0"), 0);

  const activeEscrow = deals
    .filter((d) => ["PAID", "SHIPPED"].includes(d.status))
    .reduce((sum, d) => sum + parseFloat(d.amount || "0"), 0);

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary/50" /></div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Wallet" description="Your escrow overview" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="gradient-primary p-6 text-white">
              <p className="text-sm opacity-80 mb-1">Total in Escrow</p>
              <p className="text-3xl font-bold">{formatCurrency(totalSpent)}</p>
              <div className="flex gap-3 mt-4">
                <div className="text-xs opacity-70">Active: {formatCurrency(activeEscrow)}</div>
                <div className="text-xs opacity-70">Deals: {deals.length}</div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader><CardTitle className="text-base">Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div><p className="text-xs text-muted-foreground">Total Deals</p><p className="text-lg font-bold">{deals.length}</p></div>
              <div><p className="text-xs text-muted-foreground">Completed</p><p className="text-sm font-medium">{deals.filter((d) => d.status === "COMPLETED").length}</p></div>
              <div><p className="text-xs text-muted-foreground">Active</p><p className="text-sm font-medium">{deals.filter((d) => ["PENDING_PAYMENT", "PAID", "SHIPPED"].includes(d.status)).length}</p></div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Deal History</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-1">
            {deals.length > 0 ? deals.map((deal) => (
              <motion.div key={deal.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Link href={`/buyer/transactions/${deal.slug}`}>
                  <div className="flex items-center justify-between py-3 border-b last:border-0 border-border hover:bg-accent/50 rounded-lg px-2 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center",
                        deal.status === "COMPLETED" ? "bg-green-100 dark:bg-green-900/30 text-green-600" :
                        deal.status === "REFUNDED" ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600" :
                        deal.status === "DISPUTED" ? "bg-red-100 dark:bg-red-900/30 text-red-600" :
                        "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                      )}>
                        <ArrowDownLeft className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{deal.item_description}</p>
                        <p className="text-xs text-muted-foreground">{formatDateTime(deal.created_at)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{formatCurrency(parseFloat(deal.amount || "0"))}</p>
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${DEAL_STATUS_CONFIG[deal.status]?.color || "bg-accent text-muted-foreground"}`}>
                        {DEAL_STATUS_CONFIG[deal.status]?.label || deal.status}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )) : (
              <div className="py-8 text-center text-muted-foreground text-sm">No deals yet</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
