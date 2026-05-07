"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowLeftRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MOCK_TRANSACTIONS, TRANSACTION_STATUS_CONFIG } from "@/constants";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function SellerTransactionsPage() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_TRANSACTIONS.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Transactions" description="View and manage your sales" />
      <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search transactions..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
      <div className="space-y-3">
        {filtered.map((txn, i) => (
          <motion.div key={txn.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="hover:border-primary/30 transition-all">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center"><ArrowLeftRight className="h-4 w-4 text-primary" /></div>
                  <div><p className="font-medium">{txn.title}</p><p className="text-sm text-muted-foreground">{txn.buyerName} · {formatDate(txn.createdAt)}</p></div>
                </div>
                <div className="text-right"><p className="font-semibold">{formatCurrency(txn.amount)}</p><span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${TRANSACTION_STATUS_CONFIG[txn.status]?.color}`}>{TRANSACTION_STATUS_CONFIG[txn.status]?.label}</span></div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
