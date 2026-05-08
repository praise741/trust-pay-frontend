"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, ArrowLeftRight, Package, Star, Loader2 } from "lucide-react";
import { KPICard } from "@/components/shared/kpi-card";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DEAL_STATUS_CONFIG } from "@/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { merchantService } from "@/services/api";
import { useAuthStore } from "@/store/auth-store";
import { getErrorMessage } from "@/lib/error-handler";
import { toast } from "sonner";
import type { BackendDeal } from "@/types";

interface DashboardStats {
  total_deals: number;
  active_deals: number;
  completed_deals: number;
  disputed_deals: number;
  total_revenue: string;
  pending_revenue: string;
  recent_deals: BackendDeal[];
}

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function SellerDashboardPage() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await merchantService.dashboard();
        setStats(data);
      } catch (error) {
        const msg = getErrorMessage(error, "Could not load dashboard");
        toast.error(msg);
        setStats({
          total_deals: 0,
          active_deals: 0,
          completed_deals: 0,
          disputed_deals: 0,
          total_revenue: "0",
          pending_revenue: "0",
          recent_deals: []
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (isLoading) {
    return <div className="flex h-[400px] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary/50" /></div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Seller Dashboard" description={`Welcome back, ${user?.firstName || "Seller"}`}>
        <Link href="/seller/create-deal"><Button>+ Create Deal</Button></Link>
      </PageHeader>

      <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={item}><KPICard title="Total Revenue" value={formatCurrency(parseFloat(stats?.total_revenue || "0"))} icon={DollarSign} /></motion.div>
        <motion.div variants={item}><KPICard title="Active Deals" value={String(stats?.active_deals || 0)} icon={ArrowLeftRight} delay={0.1} /></motion.div>
        <motion.div variants={item}><KPICard title="Pending Revenue" value={formatCurrency(parseFloat(stats?.pending_revenue || "0"))} icon={Package} delay={0.2} /></motion.div>
        <motion.div variants={item}><KPICard title="Trust Score" value={`${user?.trustScore || 90}/100`} icon={Star} delay={0.3} /></motion.div>
      </motion.div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Recent Orders</CardTitle>
          <Link href="/seller/transactions"><Button variant="ghost" size="sm">View all</Button></Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(stats?.recent_deals || []).length > 0 ? (stats?.recent_deals || []).map((txn) => (
              <div key={txn.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">{txn.item_description}</p>
                  <p className="text-xs text-muted-foreground">{txn.buyer_email || "Guest Buyer"}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatCurrency(parseFloat(txn.amount || "0"))}</p>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${DEAL_STATUS_CONFIG[txn.status]?.color || "bg-accent text-muted-foreground"}`}>{DEAL_STATUS_CONFIG[txn.status]?.label || txn.status}</span>
                </div>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground text-center py-4">No recent orders found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
