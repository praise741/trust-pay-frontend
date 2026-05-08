"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ArrowLeftRight, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DEAL_STATUS_CONFIG } from "@/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { merchantService } from "@/services/api";
import { useAppStore } from "@/store/app-store";
import { toast } from "sonner";
import Link from "next/link";
import type { BackendDeal } from "@/types";

export default function SellerTransactionsPage() {
  const { searchQuery, setSearchQuery } = useAppStore();
  const [deals, setDeals] = useState<BackendDeal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const { data } = await merchantService.deals();
        setDeals(data);
      } catch (error) {
        console.error("Failed to fetch seller deals", error);
        toast.error("Could not load real deals.");
        setDeals([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const filtered = deals.filter((t) => {
    const desc = t.item_description || "";
    const buyer = t.buyer_email || "";
    return desc.toLowerCase().includes(searchQuery.toLowerCase()) || buyer.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (isLoading) {
    return <div className="flex h-[400px] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary/50" /></div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Transactions" description="View and manage your sales" />
      <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search transactions..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
      <div className="space-y-3">
        {filtered.map((txn, i) => (
          <motion.div key={txn.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={`/seller/transactions/${txn.slug || txn.id}`}>
              <Card className="hover:border-primary/30 transition-all cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center"><ArrowLeftRight className="h-4 w-4 text-primary" /></div>
                    <div><p className="font-medium">{txn.item_description}</p><p className="text-sm text-muted-foreground">{txn.buyer_email || "Guest"} · {formatDate(txn.created_at)}</p></div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(parseFloat(txn.amount || "0"))}</p>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${DEAL_STATUS_CONFIG[txn.status]?.color || "bg-accent text-muted-foreground"}`}>{DEAL_STATUS_CONFIG[txn.status]?.label || txn.status}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No transactions found.</p>
        )}
      </div>
    </div>
  );
}
