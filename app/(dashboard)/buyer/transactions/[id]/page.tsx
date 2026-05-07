"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, CheckCircle, Circle, Clock, MapPin, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MOCK_TRANSACTIONS, TRANSACTION_STATUS_CONFIG } from "@/constants";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

export default function TransactionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const txn = MOCK_TRANSACTIONS.find((t) => t.id === id) || MOCK_TRANSACTIONS[0];

  const handleRelease = () => toast.success("Funds released successfully!");
  const handleDispute = () => toast.info("Dispute form opened");

  return (
    <div className="space-y-6">
      <PageHeader title={txn.title} description={`${txn.originCity} → ${txn.destinationCity}`}>
        <Link href="/buyer/transactions"><Button variant="outline" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Transaction Timeline</CardTitle></CardHeader>
          <CardContent>
            <div className="relative">
              {txn.timeline.map((event, i) => (
                <motion.div key={event.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${event.isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {event.isCompleted ? <CheckCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                    </div>
                    {i < txn.timeline.length - 1 && <div className={`w-0.5 flex-1 mt-2 ${event.isCompleted ? "bg-primary/30" : "bg-border"}`} />}
                  </div>
                  <div className="pb-2">
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                    {event.timestamp && <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1"><Clock className="h-3 w-3" />{formatDateTime(event.timestamp)}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Details Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Escrow Vault</CardTitle></CardHeader>
            <CardContent>
              <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10 mb-4">
                <motion.div animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Shield className="h-8 w-8 text-primary mx-auto mb-1" />
                </motion.div>
                <p className="text-xl font-bold">{formatCurrency(txn.amount)}</p>
                <p className="text-xs text-muted-foreground">{txn.escrowVault.isLocked ? "🔒 Locked" : "🔓 Released"}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className={`font-medium ${TRANSACTION_STATUS_CONFIG[txn.status]?.color} rounded-full px-2 py-0.5 text-xs`}>{TRANSACTION_STATUS_CONFIG[txn.status]?.label}</span></div>
                <Separator />
                <div className="flex justify-between"><span className="text-muted-foreground">Seller</span><span className="font-medium">{txn.sellerName}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Platform</span><span className="font-medium capitalize">{txn.platform}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Created</span><span className="font-medium">{formatDate(txn.createdAt)}</span></div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {txn.escrowVault.isLocked && (
            <div className="space-y-2">
              <Button className="w-full" onClick={handleRelease}>Release Funds</Button>
              <Button variant="destructive" className="w-full" onClick={handleDispute}><AlertTriangle className="h-4 w-4 mr-1" /> Raise Dispute</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
