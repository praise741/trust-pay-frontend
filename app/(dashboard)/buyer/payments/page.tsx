"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Search, Filter, Download, CreditCard, Calendar } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency, formatDateTime, cn } from "@/lib/utils";
import { toast } from "sonner";

const PAYMENT_HISTORY = [
  { id: "tx-001", type: "debit" as const, description: "Escrow payment — Vintage Ankara Collection", amount: 25000, trustFee: 375, feePercent: 1.5, status: "success", deal: "vintage-ankara-abc123", date: "2026-05-06T11:00:00Z", method: "Bank Transfer" },
  { id: "tx-002", type: "credit" as const, description: "Refund — Cancelled order #4521", amount: 15000, trustFee: 0, feePercent: 0, status: "success", deal: "cancelled-order-xyz", date: "2026-05-05T09:30:00Z", method: "Wallet" },
  { id: "tx-003", type: "debit" as const, description: "Escrow payment — Samsung Galaxy S24", amount: 450000, trustFee: 6750, feePercent: 1.5, status: "success", deal: "samsung-galaxy-def456", date: "2026-05-04T14:20:00Z", method: "Card" },
  { id: "tx-004", type: "debit" as const, description: "Escrow payment — Designer Handbag", amount: 85000, trustFee: 1700, feePercent: 2.0, status: "pending", deal: "designer-handbag-ghi789", date: "2026-05-03T08:15:00Z", method: "Bank Transfer" },
  { id: "tx-005", type: "debit" as const, description: "Escrow payment — MacBook Pro M3", amount: 1200000, trustFee: 18000, feePercent: 1.5, status: "success", deal: "macbook-pro-jkl012", date: "2026-05-01T16:45:00Z", method: "Bank Transfer" },
  { id: "tx-006", type: "credit" as const, description: "Dispute resolution — Refund to buyer", amount: 35000, trustFee: 0, feePercent: 0, status: "success", deal: "dispute-refund-mno345", date: "2026-04-28T12:00:00Z", method: "Wallet" },
];

export default function BuyerPaymentHistoryPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = PAYMENT_HISTORY.filter((p) => {
    const matchSearch = p.description.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || p.type === typeFilter;
    return matchSearch && matchType;
  });

  const totalSpent = PAYMENT_HISTORY.filter((p) => p.type === "debit" && p.status === "success").reduce((sum, p) => sum + p.amount, 0);
  const totalFees = PAYMENT_HISTORY.filter((p) => p.status === "success").reduce((sum, p) => sum + p.trustFee, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Payment History" description="Complete record of all your payments and refunds">
        <Button variant="outline" size="sm" onClick={() => toast.success("Statement downloaded")}><Download className="h-4 w-4 mr-1" /> Export</Button>
      </PageHeader>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card><CardContent className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"><CreditCard className="h-5 w-5 text-blue-600" /></div>
          <div><p className="text-xs text-muted-foreground">Total Spent</p><p className="text-lg font-bold">{formatCurrency(totalSpent)}</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center"><CreditCard className="h-5 w-5 text-amber-600" /></div>
          <div><p className="text-xs text-muted-foreground">Trust Fees Paid</p><p className="text-lg font-bold">{formatCurrency(totalFees)}</p><p className="text-[10px] text-muted-foreground">1.5–2% per transaction</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center"><CreditCard className="h-5 w-5 text-green-600" /></div>
          <div><p className="text-xs text-muted-foreground">Transactions</p><p className="text-lg font-bold">{PAYMENT_HISTORY.length}</p></div>
        </CardContent></Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search payments..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-40"><Filter className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="debit">Payments</SelectItem><SelectItem value="credit">Refunds</SelectItem></SelectContent>
        </Select>
      </div>

      {/* List */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filtered.map((payment, i) => (
              <motion.div key={payment.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="flex items-center justify-between p-4 hover:bg-accent/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", payment.type === "credit" ? "bg-green-100 dark:bg-green-900/30 text-green-600" : "bg-blue-100 dark:bg-blue-900/30 text-blue-600")}>
                    {payment.type === "credit" ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{payment.description}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">{formatDateTime(payment.date)}</span>
                      <span className="text-xs text-muted-foreground">· {payment.method}</span>
                      {payment.trustFee > 0 && <span className="text-[10px] text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded-full font-medium">{payment.feePercent}% fee: {formatCurrency(payment.trustFee)}</span>}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn("font-semibold", payment.type === "credit" ? "text-green-600" : "text-foreground")}>{payment.type === "credit" ? "+" : "-"}{formatCurrency(payment.amount)}</p>
                  <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold", payment.status === "success" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400")}>{payment.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
