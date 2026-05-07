"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, ArrowLeftRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_TRANSACTIONS, TRANSACTION_STATUS_CONFIG } from "@/constants";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function BuyerTransactionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = MOCK_TRANSACTIONS.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.sellerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Transactions" description="View and manage your escrow transactions" />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search transactions..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48"><Filter className="h-4 w-4 mr-2" /><SelectValue placeholder="Filter status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in_transit">In Transit</SelectItem>
            <SelectItem value="payment_secured">Payment Secured</SelectItem>
            <SelectItem value="funds_released">Released</SelectItem>
            <SelectItem value="disputed">Disputed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {filtered.map((txn, i) => (
          <motion.div key={txn.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={`/buyer/transactions/${txn.id}`}>
              <Card className="hover:border-primary/30 transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center">
                        <ArrowLeftRight className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{txn.title}</p>
                        <p className="text-sm text-muted-foreground">{txn.sellerName} · {txn.originCity} → {txn.destinationCity}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">via {txn.platform} · {formatDate(txn.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(txn.amount)}</p>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold mt-1 ${TRANSACTION_STATUS_CONFIG[txn.status]?.color}`}>
                        {TRANSACTION_STATUS_CONFIG[txn.status]?.label}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
