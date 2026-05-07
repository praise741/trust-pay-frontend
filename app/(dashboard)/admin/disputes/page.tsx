"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Clock, Eye, CheckCircle, XCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_DISPUTES } from "@/constants";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminDisputesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Disputes" description="Moderate and resolve disputes" />
      <div className="space-y-4">
        {MOCK_DISPUTES.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="border-amber-200/50 dark:border-amber-800/30">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{d.transactionTitle}</h3>
                    <p className="text-sm text-muted-foreground">{d.raisedByName} vs {d.respondentName} · {formatCurrency(d.amount)}</p>
                    <p className="text-xs text-muted-foreground mt-1">{d.reason}</p>
                  </div>
                  <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">{d.status.replace("_", " ")}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{d.description}</p>
                <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> Opened {formatDateTime(d.createdAt)}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => toast.info("Evidence reviewed")}><Eye className="h-3.5 w-3.5 mr-1" /> Review Evidence</Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => toast.success("Resolved in favor of buyer")}><CheckCircle className="h-3.5 w-3.5 mr-1" /> Resolve</Button>
                  <Button size="sm" variant="destructive" onClick={() => toast.info("Dispute dismissed")}><XCircle className="h-3.5 w-3.5 mr-1" /> Dismiss</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
