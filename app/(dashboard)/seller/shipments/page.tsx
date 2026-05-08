"use client";

import { motion } from "framer-motion";
import { Package, MapPin, Truck, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { formatDateTime } from "@/lib/utils";
import { toast } from "sonner";

export default function SellerShipmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Shipments" description="Manage your active shipments">
        <Button><Package className="h-4 w-4 mr-2" /> Add Shipment</Button>
      </PageHeader>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Package className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <p className="text-lg font-medium text-foreground">No active shipments</p>
        <p className="text-sm text-muted-foreground mt-1">You don't have any shipments to track.</p>
      </div>
    </div>
  );
}
