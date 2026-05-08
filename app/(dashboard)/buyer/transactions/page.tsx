"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, ArrowLeftRight, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_TRANSACTIONS, TRANSACTION_STATUS_CONFIG } from "@/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { buyerService } from "@/services/api";
import { useAppStore } from "@/store/app-store";
import { toast } from "sonner";

export default function BuyerTransactionsPage() {
  const { searchQuery, setSearchQuery } = useAppStore();
  const [statusFilter, setStatusFilter] = useState("all");
  const [deals, setDeals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const { data } = await buyerService.deals();
        setDeals(data);
      } catch (error) {
        console.error("Failed to fetch buyer deals", error);
        toast.error("Could not load real deals. Using mock data fallback.");
        setDeals(MOCK_TRANSACTIONS.map(t => ({
          id: t.id,
          slug: t.id,
          item_description: t.title,
          seller: t.sellerName,
          amount: t.amount,
          status: t.status,
          created_at: t.createdAt
        })));
      } finally {
        setIsLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const filtered = deals.filter((t) => {
    const desc = t.item_description || "";
    const seller = t.seller || "";
    const matchSearch = desc.toLowerCase().includes(searchQuery.toLowerCase()) || seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "all" || t.status === statusFilter || (statusFilter === "in_transit" && t.status === "SHIPPED") || (statusFilter === "payment_secured" && t.status === "PAID") || (statusFilter === "funds_released" && t.status === "COMPLETED");
    return matchSearch && matchStatus;
  });

  if (isLoading) {
    return <div className="flex h-[400px] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary/50" /></div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Transactions" description="View and manage your escrow transactions" />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search transactions..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48"><Filter className="h-4 w-4 mr-2" /><SelectValue placeholder="Filter status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in_transit">In Transit / Shipped</SelectItem>
            <SelectItem value="payment_secured">Paid</SelectItem>
            <SelectItem value="funds_released">Completed</SelectItem>
            <SelectItem value="disputed">Disputed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {filtered.map((txn, i) => (
          <motion.div key={txn.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={`/buyer/transactions/${txn.slug}`}>
              <Card className="hover:border-primary/30 transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center">
                        <ArrowLeftRight className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{txn.item_description}</p>
                        <p className="text-sm text-muted-foreground">Seller: {txn.seller}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{formatDate(txn.created_at)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(parseFloat(txn.amount || "0"))}</p>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold mt-1 ${TRANSACTION_STATUS_CONFIG[txn.status]?.color || "bg-accent text-muted-foreground"}`}>
                        {TRANSACTION_STATUS_CONFIG[txn.status]?.label || txn.status}
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
