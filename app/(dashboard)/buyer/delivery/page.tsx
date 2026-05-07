"use client";

import { motion } from "framer-motion";
import { Truck, MapPin, Clock, CheckCircle, Circle, Package } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MOCK_SHIPMENTS, MOCK_TRANSACTIONS } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { toast } from "sonner";

export default function BuyerDeliveryPage() {
  const shipment = MOCK_SHIPMENTS[0];
  const txn = MOCK_TRANSACTIONS.find((t) => t.id === shipment.transactionId);
  const progress = (shipment.checkpoints.length / 5) * 100;

  return (
    <div className="space-y-6">
      <PageHeader title="Delivery Tracking" description="Track your active deliveries" />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center"><Package className="h-5 w-5 text-primary" /></div>
            <div>
              <CardTitle className="text-base">{txn?.title || "Package"}</CardTitle>
              <p className="text-sm text-muted-foreground">{shipment.trackingNumber}</p>
            </div>
          </div>
          <Badge variant="warning">{shipment.status.replace("_", " ")}</Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Route */}
          <div className="flex items-center gap-3">
            <div className="text-center"><p className="text-xs text-muted-foreground">From</p><p className="font-semibold">{shipment.originCity}</p></div>
            <div className="flex-1"><Progress value={progress} className="h-2" /></div>
            <div className="text-center"><p className="text-xs text-muted-foreground">To</p><p className="font-semibold">{shipment.destinationCity}</p></div>
          </div>

          {/* Countdown */}
          <div className="text-center p-4 rounded-xl bg-accent/50">
            <Clock className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">Est. Delivery: 24h remaining</p>
            <p className="text-xs text-muted-foreground">Auto-release if not disputed</p>
          </div>

          {/* Checkpoints */}
          <div className="space-y-0">
            {shipment.checkpoints.map((cp, i) => (
              <motion.div key={cp.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex gap-3 pb-4 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center"><CheckCircle className="h-3.5 w-3.5" /></div>
                  {i < shipment.checkpoints.length - 1 && <div className="w-0.5 flex-1 mt-1 bg-primary/30" />}
                </div>
                <div>
                  <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-muted-foreground" /><p className="text-sm font-medium">{cp.location}</p></div>
                  <p className="text-xs text-muted-foreground">{cp.description}</p>
                  <p className="text-[10px] text-muted-foreground">{formatDateTime(cp.timestamp)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="h-48 rounded-xl bg-muted/50 border border-dashed border-border flex items-center justify-center">
            <div className="text-center text-muted-foreground"><MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" /><p className="text-sm">Live map tracking</p><p className="text-xs">Coming soon</p></div>
          </div>

          <Button className="w-full" onClick={() => toast.success("Delivery confirmed!")}>Confirm Delivery</Button>
        </CardContent>
      </Card>
    </div>
  );
}
