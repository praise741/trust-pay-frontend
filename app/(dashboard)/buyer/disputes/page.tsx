"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Clock, Upload, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_DISPUTES } from "@/constants";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { EmptyState } from "@/components/shared/empty-state";

const STATUS_COLORS: Record<string, string> = {
  open: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  under_review: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  resolved: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  escalated: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  closed: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

export default function BuyerDisputesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Disputes" description="Manage and track your dispute cases">
        <Button><ShieldAlert className="h-4 w-4 mr-2" /> New Dispute</Button>
      </PageHeader>

      {MOCK_DISPUTES.length === 0 ? (
        <EmptyState title="No disputes" description="You haven't raised any disputes yet" icon={<ShieldAlert className="h-8 w-8 text-muted-foreground" />} />
      ) : (
        <div className="space-y-4">
          {MOCK_DISPUTES.map((dispute, i) => (
            <motion.div key={dispute.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="hover:border-primary/20 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{dispute.transactionTitle}</h3>
                      <p className="text-sm text-muted-foreground">vs {dispute.respondentName} · {formatCurrency(dispute.amount)}</p>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[dispute.status]}`}>
                      {dispute.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{dispute.description}</p>

                  {/* Timeline */}
                  <div className="space-y-2 mb-3">
                    {dispute.timeline.map((ev) => (
                      <div key={ev.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span className="font-medium text-foreground">{ev.action}</span>
                        <span>·</span>
                        <span>{formatDateTime(ev.timestamp)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Upload className="h-3.5 w-3.5 mr-1" /> Add Evidence</Button>
                    <Button variant="outline" size="sm"><MessageCircle className="h-3.5 w-3.5 mr-1" /> Message</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
