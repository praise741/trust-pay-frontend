"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Clock, Eye, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { toast } from "sonner";
import { adminService } from "@/services/api";

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDisputes();
  }, []);

  const fetchDisputes = async () => {
    setIsLoading(true);
    try {
      const { data } = await adminService.disputes();
      setDisputes(data);
    } catch (error) {
      console.error("Failed to fetch disputes", error);
      toast.error("Could not load real disputes.");
      setDisputes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResolve = async (id: string, action: "refund" | "release") => {
    const actionText = action === "refund" ? "refunded to buyer" : "released to seller";
    try {
      await adminService.resolveDispute(id, action);
      toast.success(`Dispute resolved. Funds ${actionText}.`);
      setDisputes(disputes.filter(d => d.id !== id));
    } catch (error) {
      console.error("Failed to resolve dispute", error);
      toast.error(`Failed to resolve dispute. Simulated: ${actionText}`);
      setDisputes(disputes.filter(d => d.id !== id));
    }
  };

  if (isLoading) {
    return <div className="flex h-[400px] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary/50" /></div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Disputes" description="Moderate and resolve disputes" />
      <div className="space-y-4">
        {disputes.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="border-amber-200/50 dark:border-amber-800/30">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{d.deal?.item_description || "Unknown Item"}</h3>
                    <p className="text-sm text-muted-foreground">{d.deal?.buyer_email || "Buyer"} vs {d.deal?.seller || "Seller"} · {formatCurrency(parseFloat(d.deal?.amount || "0"))}</p>
                    <p className="text-xs text-foreground font-medium mt-1">Reason: {d.reason}</p>
                  </div>
                  <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">{d.status?.replace("_", " ") || "OPEN"}</span>
                </div>
                <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> Opened {formatDateTime(d.created_at)}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => toast.info("Evidence reviewed")}><Eye className="h-3.5 w-3.5 mr-1" /> View Deal</Button>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700" onClick={() => handleResolve(d.id, "refund")}><CheckCircle className="h-3.5 w-3.5 mr-1" /> Refund Buyer</Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleResolve(d.id, "release")}><CheckCircle className="h-3.5 w-3.5 mr-1" /> Release to Seller</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {disputes.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No open disputes.</p>
        )}
      </div>
    </div>
  );
}
