"use client";

import { motion } from "framer-motion";
import { Users, ArrowLeftRight, ShieldAlert, AlertTriangle, TrendingUp, DollarSign, BadgeCheck, Activity } from "lucide-react";
import { KPICard } from "@/components/shared/kpi-card";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_REVENUE_CHART, MOCK_TRANSACTION_CHART } from "@/constants";
import { formatCurrency } from "@/lib/utils";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Admin Dashboard" description="Platform overview and management 🛡️" />
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={item}><KPICard title="Total Users" value="12,847" change="+456" changeType="positive" icon={Users} /></motion.div>
        <motion.div variants={item}><KPICard title="Total Transactions" value="45,231" change="+1,230" changeType="positive" icon={ArrowLeftRight} delay={0.1} /></motion.div>
        <motion.div variants={item}><KPICard title="Platform Volume" value={formatCurrency(234500000)} change="+18%" changeType="positive" icon={DollarSign} delay={0.2} /></motion.div>
        <motion.div variants={item}><KPICard title="Active Disputes" value="23" change="-5" changeType="positive" icon={ShieldAlert} delay={0.3} /></motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Transaction Volume</CardTitle></CardHeader>
          <CardContent><div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_REVENUE_CHART}>
                <defs><linearGradient id="adminRev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3B82F6" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="name" fontSize={12} stroke="hsl(var(--muted-foreground))" /><YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="url(#adminRev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Daily Activity</CardTitle></CardHeader>
          <CardContent><div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_TRANSACTION_CHART}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="name" fontSize={12} stroke="hsl(var(--muted-foreground))" /><YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div></CardContent>
        </Card>
      </div>

      {/* Quick Alerts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-amber-200 dark:border-amber-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center"><AlertTriangle className="h-5 w-5 text-amber-600" /></div>
            <div><p className="font-medium text-sm">3 Fraud Alerts</p><p className="text-xs text-muted-foreground">Requires review</p></div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 dark:border-blue-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"><BadgeCheck className="h-5 w-5 text-blue-600" /></div>
            <div><p className="font-medium text-sm">7 KYC Pending</p><p className="text-xs text-muted-foreground">Awaiting approval</p></div>
          </CardContent>
        </Card>
        <Card className="border-green-200 dark:border-green-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center"><Activity className="h-5 w-5 text-green-600" /></div>
            <div><p className="font-medium text-sm">99.9% Uptime</p><p className="text-xs text-muted-foreground">System healthy</p></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
