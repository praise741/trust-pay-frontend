"use client";

import { motion } from "framer-motion";
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, Building2, Copy } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/auth-store";
import { formatCurrency, formatDateTime, cn } from "@/lib/utils";
import { toast } from "sonner";

export default function BuyerWalletPage() {
  const { user } = useAuthStore();
  const transactions: any[] = [];

  return (
    <div className="space-y-6">
      <PageHeader title="Wallet" description="Manage your funds">
        <Button><Plus className="h-4 w-4 mr-1" /> Fund Wallet</Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="gradient-primary p-6 text-white">
              <p className="text-sm opacity-80 mb-1">Available Balance</p>
              <p className="text-3xl font-bold">{formatCurrency(0)}</p>
              <div className="flex gap-3 mt-4">
                <Button size="sm" variant="secondary" className="bg-white/20 text-white border-0 hover:bg-white/30"><ArrowUpRight className="h-4 w-4 mr-1" /> Send</Button>
                <Button size="sm" variant="secondary" className="bg-white/20 text-white border-0 hover:bg-white/30"><ArrowDownLeft className="h-4 w-4 mr-1" /> Receive</Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Virtual Account */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Building2 className="h-4 w-4" /> Virtual Account</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {user ? (
                <>
                  <div><p className="text-xs text-muted-foreground">Bank</p><p className="text-sm font-medium">{user?.bankName || "Not set"}</p></div>
                  <div><p className="text-xs text-muted-foreground">Account Number</p>
                    <div className="flex items-center gap-2"><p className="text-sm font-mono font-medium">{user?.bankAccountNumber || "Not set"}</p>
                      {user?.bankAccountNumber && <button onClick={() => { navigator.clipboard.writeText(user.bankAccountNumber || ""); toast.success("Copied!"); }}><Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" /></button>}
                    </div>
                  </div>
                  <div><p className="text-xs text-muted-foreground">Account Name</p><p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p></div>
                </>
              ) : (
                <div className="text-sm text-muted-foreground">No virtual account linked.</div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader><CardTitle className="text-base">Transaction History</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-1">
            {transactions.length > 0 ? transactions.map((tx, i) => (
              <motion.div key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="flex items-center justify-between py-3 border-b last:border-0 border-border">
                <div className="flex items-center gap-3">
                  <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center", tx.type === "credit" ? "bg-green-100 dark:bg-green-900/30 text-green-600" : "bg-red-100 dark:bg-red-900/30 text-red-600")}>
                    {tx.type === "credit" ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{formatDateTime(tx.createdAt)}</p>
                  </div>
                </div>
                <p className={cn("font-semibold text-sm", tx.type === "credit" ? "text-green-600" : "text-red-600")}>
                  {tx.type === "credit" ? "+" : "-"}{formatCurrency(tx.amount)}
                </p>
              </motion.div>
            )) : (
              <div className="py-8 text-center text-muted-foreground text-sm">No transaction history</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
