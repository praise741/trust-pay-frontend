"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Truck, ShieldCheck, Wallet, Loader2 } from "lucide-react";
import { KPICard } from "@/components/shared/kpi-card";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DEAL_STATUS_CONFIG } from "@/constants";
import { buyerService } from "@/services/api";
import { useAuthStore } from "@/store/auth-store";
import { getErrorMessage } from "@/lib/error-handler";
import { toast } from "sonner";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import type { BackendDeal } from "@/types";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function BuyerDashboardPage() {
  const { user } = useAuthStore();
  const [deals, setDeals] = useState<BackendDeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const { data } = await buyerService.deals();
        setDeals(data || []);
      } catch (error) {
        const msg = getErrorMessage(error, "Could not load deals");
        toast.error(msg);
        setDeals([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const activeDeals = deals.filter((d) => ["PENDING_PAYMENT", "PAID", "SHIPPED"].includes(d.status));
  const completedDeals = deals.filter((d) => d.status === "COMPLETED");
  const totalSpent = deals
    .filter((d) => ["PAID", "SHIPPED", "COMPLETED"].includes(d.status))
    .reduce((sum, d) => sum + parseFloat(d.amount || "0"), 0);
  const activeEscrow = activeDeals
    .filter((d) => ["PAID", "SHIPPED"].includes(d.status))
    .reduce((sum, d) => sum + parseFloat(d.amount || "0"), 0);

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary/50" /></div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description={`Welcome back, ${user?.firstName || "Buyer"}`} />

      <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={item}><KPICard title="Active Deals" value={String(activeDeals.length)} icon={ArrowLeftRight} /></motion.div>
        <motion.div variants={item}><KPICard title="Pending Delivery" value={String(deals.filter((d) => d.status === "SHIPPED").length)} icon={Truck} delay={0.1} /></motion.div>
        <motion.div variants={item}><KPICard title="Trust Score" value={`${user?.trustScore || 85}/100`} icon={ShieldCheck} delay={0.2} /></motion.div>
        <motion.div variants={item}><KPICard title="Total Spent" value={formatCurrency(totalSpent)} icon={Wallet} delay={0.3} /></motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Transactions</CardTitle>
            <Link href="/buyer/transactions"><Button variant="ghost" size="sm">View all</Button></Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deals.length > 0 ? deals.slice(0, 5).map((deal) => (
                <motion.div key={deal.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <Link href={`/buyer/transactions/${deal.slug}`} className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <ArrowLeftRight className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{deal.item_description}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(deal.created_at)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{formatCurrency(parseFloat(deal.amount || "0"))}</p>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${DEAL_STATUS_CONFIG[deal.status]?.color || "bg-accent text-muted-foreground"}`}>
                        {DEAL_STATUS_CONFIG[deal.status]?.label || deal.status}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )) : (
                <p className="text-sm text-muted-foreground text-center py-4">No transactions yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Escrow Vault</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-sage/5 border border-primary/10">
              <ShieldCheck className="h-10 w-10 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{formatCurrency(activeEscrow)}</p>
              <p className="text-xs text-muted-foreground mt-1">Locked in escrow</p>
            </div>
            <div className="space-y-2">
              {activeDeals.filter((d) => ["PAID", "SHIPPED"].includes(d.status)).length > 0 ? (
                activeDeals.filter((d) => ["PAID", "SHIPPED"].includes(d.status)).map((deal) => (
                  <div key={deal.id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-xs font-medium">{deal.item_description}</p>
                      {deal.auto_release_at && <p className="text-[10px] text-muted-foreground">Auto-release: {formatDate(deal.auto_release_at)}</p>}
                    </div>
                    <p className="text-xs font-semibold">{formatCurrency(parseFloat(deal.amount || "0"))}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground text-center py-2">No active escrows</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
