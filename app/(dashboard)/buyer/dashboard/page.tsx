"use client";

import { motion } from "framer-motion";
import { ArrowLeftRight, Truck, ShieldCheck, Wallet, TrendingUp, Eye, Clock } from "lucide-react";
import { KPICard } from "@/components/shared/kpi-card";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_TRANSACTIONS, MOCK_WALLET, TRANSACTION_STATUS_CONFIG } from "@/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function BuyerDashboardPage() {
  const activeEscrows = MOCK_TRANSACTIONS.filter((t) => !["funds_released", "refunded", "cancelled"].includes(t.status));

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Welcome back, Adaeze 👋" />

      {/* KPI Cards */}
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={item}><KPICard title="Active Escrows" value={String(activeEscrows.length)} change="+12%" changeType="positive" icon={ArrowLeftRight} /></motion.div>
        <motion.div variants={item}><KPICard title="Pending Deliveries" value="1" change="On track" changeType="neutral" icon={Truck} delay={0.1} /></motion.div>
        <motion.div variants={item}><KPICard title="Trust Score" value="92/100" change="+3 pts" changeType="positive" icon={ShieldCheck} delay={0.2} /></motion.div>
        <motion.div variants={item}><KPICard title="Wallet Balance" value={formatCurrency(MOCK_WALLET.balance)} change="+₦50,000" changeType="positive" icon={Wallet} delay={0.3} /></motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Transactions</CardTitle>
            <Link href="/buyer/transactions"><Button variant="ghost" size="sm">View all</Button></Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {MOCK_TRANSACTIONS.map((txn, i) => (
                <motion.div key={txn.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}>
                  <Link href={`/buyer/transactions/${txn.id}`} className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <ArrowLeftRight className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium group-hover:text-primary transition-colors">{txn.title}</p>
                        <p className="text-xs text-muted-foreground">{txn.sellerName} · {formatDate(txn.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{formatCurrency(txn.amount)}</p>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${TRANSACTION_STATUS_CONFIG[txn.status]?.color}`}>
                        {TRANSACTION_STATUS_CONFIG[txn.status]?.label}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Escrow Vault */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Escrow Vault</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-sage/5 border border-primary/10">
              <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <ShieldCheck className="h-10 w-10 text-primary mx-auto mb-2" />
              </motion.div>
              <p className="text-2xl font-bold">{formatCurrency(17000)}</p>
              <p className="text-xs text-muted-foreground mt-1">Locked in escrow</p>
            </div>
            <div className="space-y-2">
              {activeEscrows.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-xs font-medium">{txn.title}</p>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground"><Clock className="h-3 w-3" />{formatDate(txn.escrowVault.autoReleaseDate)}</div>
                  </div>
                  <p className="text-xs font-semibold">{formatCurrency(txn.amount)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
