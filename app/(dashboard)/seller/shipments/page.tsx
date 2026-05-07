"use client";

import { motion } from "framer-motion";
import { Package, MapPin, Truck, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_SHIPMENTS } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { toast } from "sonner";

export default function SellerShipmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Shipments" description="Manage your active shipments">
        <Button><Package className="h-4 w-4 mr-2" /> Add Shipment</Button>
      </PageHeader>
      {MOCK_SHIPMENTS.map((ship, i) => (
        <motion.div key={ship.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center"><Truck className="h-5 w-5 text-primary" /></div>
                  <div><p className="font-medium">{ship.trackingNumber}</p><p className="text-sm text-muted-foreground">{ship.carrier} · {ship.originCity} → {ship.destinationCity}</p></div>
                </div>
                <Badge variant="warning">{ship.status.replace("_", " ")}</Badge>
              </div>
              <div className="space-y-2">
                {ship.checkpoints.map((cp) => (
                  <div key={cp.id} className="flex items-center gap-2 text-sm"><CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" /><MapPin className="h-3 w-3 text-muted-foreground" /><span>{cp.location}</span><span className="text-xs text-muted-foreground ml-auto">{formatDateTime(cp.timestamp)}</span></div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => toast.info("Tracking update sent")}>Update Status</Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
