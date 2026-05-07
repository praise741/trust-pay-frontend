"use client";

import { motion } from "framer-motion";
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, Building2, Copy } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_WALLET } from "@/constants";
import { formatCurrency, formatDateTime, cn } from "@/lib/utils";
import { toast } from "sonner";

export default function SellerWalletPage() {
  const w = MOCK_WALLET;
  return (
    <div className="space-y-6">
      <PageHeader title="Wallet" description="Manage your earnings"><Button><Plus className="h-4 w-4 mr-1" /> Withdraw</Button></PageHeader>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="gradient-primary p-6 text-white">
              <p className="text-sm opacity-80 mb-1">Available Balance</p>
              <p className="text-3xl font-bold">{formatCurrency(w.balance)}</p>
              <div className="flex gap-3 mt-4">
                <Button size="sm" variant="secondary" className="bg-white/20 text-white border-0 hover:bg-white/30"><ArrowUpRight className="h-4 w-4 mr-1" /> Withdraw</Button>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card><CardHeader><CardTitle className="text-base flex items-center gap-2"><Building2 className="h-4 w-4" /> Payout Account</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div><p className="text-xs text-muted-foreground">Bank</p><p className="text-sm font-medium">{w.virtualAccount.bankName}</p></div>
              <div><p className="text-xs text-muted-foreground">Account Number</p><p className="text-sm font-mono font-medium">{w.virtualAccount.accountNumber}</p></div>
              <div><p className="text-xs text-muted-foreground">Account Name</p><p className="text-sm font-medium">{w.virtualAccount.accountName}</p></div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Card><CardHeader><CardTitle className="text-base">Payout History</CardTitle></CardHeader>
        <CardContent><div className="space-y-1">
          {w.transactions.map((tx, i) => (
            <div key={tx.id} className="flex items-center justify-between py-3 border-b last:border-0 border-border">
              <div className="flex items-center gap-3">
                <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center", tx.type === "credit" ? "bg-green-100 dark:bg-green-900/30 text-green-600" : "bg-red-100 dark:bg-red-900/30 text-red-600")}>
                  {tx.type === "credit" ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                </div>
                <div><p className="text-sm font-medium">{tx.description}</p><p className="text-xs text-muted-foreground">{formatDateTime(tx.createdAt)}</p></div>
              </div>
              <p className={cn("font-semibold text-sm", tx.type === "credit" ? "text-green-600" : "text-red-600")}>{tx.type === "credit" ? "+" : "-"}{formatCurrency(tx.amount)}</p>
            </div>
          ))}
        </div></CardContent>
      </Card>
    </div>
  );
}
