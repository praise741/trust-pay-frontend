"use client";

import { motion } from "framer-motion";
import { Bell, CreditCard, Truck, ShieldAlert, CheckCircle, AlertTriangle, Settings } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ElementType> = { payment: CreditCard, shipment: Truck, dispute: ShieldAlert, payout: CheckCircle, verification: CheckCircle, fraud: AlertTriangle, system: Settings };

export default function SellerNotificationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Notifications" description="Stay updated on your business"><Button variant="outline" size="sm">Mark all as read</Button></PageHeader>
      <div className="space-y-2">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Bell className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium text-foreground">No notifications</p>
          <p className="text-sm text-muted-foreground mt-1">You're all caught up!</p>
        </div>
      </div>
    </div>
  );
}
