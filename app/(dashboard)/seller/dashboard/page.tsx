"use client";

import { motion } from "framer-motion";
import { DollarSign, ArrowLeftRight, Package, TrendingUp, Users, Star } from "lucide-react";
import { KPICard } from "@/components/shared/kpi-card";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_TRANSACTIONS, MOCK_REVENUE_CHART, TRANSACTION_STATUS_CONFIG } from "@/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function SellerDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Seller Dashboard" description="Welcome back, Chukwuma 💼">
        <Link href="/seller/create-deal"><Button>+ Create Deal</Button></Link>
      </PageHeader>

      <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={item}><KPICard title="Total Revenue" value={formatCurrency(890000)} change="+23%" changeType="positive" icon={DollarSign} /></motion.div>
        <motion.div variants={item}><KPICard title="Active Deals" value="12" change="+3" changeType="positive" icon={ArrowLeftRight} delay={0.1} /></motion.div>
        <motion.div variants={item}><KPICard title="Pending Releases" value={formatCurrency(47000)} change="3 deals" changeType="neutral" icon={Package} delay={0.2} /></motion.div>
        <motion.div variants={item}><KPICard title="Trust Score" value="96/100" change="+2 pts" changeType="positive" icon={Star} delay={0.3} /></motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Revenue Overview</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_REVENUE_CHART}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="value" stroke="hsl(217, 91%, 60%)" fill="url(#colorRevenue)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex-row items-center justify-between"><CardTitle className="text-base">Recent Orders</CardTitle><Link href="/seller/transactions"><Button variant="ghost" size="sm">View all</Button></Link></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {MOCK_TRANSACTIONS.slice(0, 3).map((txn) => (
                <div key={txn.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">{txn.title}</p>
                    <p className="text-xs text-muted-foreground">{txn.buyerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatCurrency(txn.amount)}</p>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${TRANSACTION_STATUS_CONFIG[txn.status]?.color}`}>{TRANSACTION_STATUS_CONFIG[txn.status]?.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
