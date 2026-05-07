"use client";

import { motion } from "framer-motion";
import { Bell, CreditCard, Truck, ShieldAlert, CheckCircle, AlertTriangle, Settings } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_NOTIFICATIONS } from "@/constants";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ElementType> = {
  payment: CreditCard, shipment: Truck, dispute: ShieldAlert, payout: CheckCircle, verification: CheckCircle, fraud: AlertTriangle, system: Settings,
};

export default function BuyerNotificationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Notifications" description="Stay updated on your transactions">
        <Button variant="outline" size="sm">Mark all as read</Button>
      </PageHeader>

      <div className="space-y-2">
        {MOCK_NOTIFICATIONS.map((n, i) => {
          const Icon = ICONS[n.type] || Bell;
          return (
            <motion.div key={n.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className={cn("transition-all hover:border-primary/20", !n.isRead && "border-primary/20 bg-primary/[0.02]")}>
                <CardContent className="p-4 flex items-start gap-3">
                  <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center shrink-0", !n.isRead ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={cn("text-sm font-medium", !n.isRead && "text-foreground")}>{n.title}</p>
                      {!n.isRead && <div className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
