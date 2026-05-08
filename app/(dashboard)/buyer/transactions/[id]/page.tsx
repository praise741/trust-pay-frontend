"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, CheckCircle, Circle, Clock, AlertTriangle, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DEAL_STATUS_CONFIG } from "@/constants";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";
import { dealService } from "@/services/api";
import Link from "next/link";
import { toast } from "sonner";
import type { BackendDeal } from "@/types";

const STATUS_ORDER = ["PENDING_PAYMENT", "PAID", "SHIPPED", "COMPLETED"];

function buildTimeline(deal: BackendDeal) {
  const steps = [
    { key: "PENDING_PAYMENT", title: "Deal Created", description: "Escrow deal initiated, awaiting payment", timestamp: deal.created_at },
    { key: "PAID", title: "Payment Received", description: "Buyer payment confirmed, seller can now ship", timestamp: deal.paid_at },
    { key: "SHIPPED", title: "Shipped", description: "Seller has shipped the item", timestamp: deal.shipped_at },
    { key: "COMPLETED", title: "Completed", description: "Deal completed, funds released to seller", timestamp: deal.completed_at },
  ];

  if (deal.status === "DISPUTED") {
    steps.push({ key: "DISPUTED", title: "Disputed", description: "A dispute has been opened on this deal", timestamp: deal.created_at });
  }
  if (deal.status === "REFUNDED") {
    steps.push({ key: "REFUNDED", title: "Refunded", description: "Deal refunded to buyer", timestamp: deal.completed_at });
  }

  const currentIdx = STATUS_ORDER.indexOf(deal.status);

  return steps.map((step) => {
    const isCompleted = deal.status === "DISPUTED" || deal.status === "REFUNDED"
      ? STATUS_ORDER.indexOf(step.key) <= currentIdx && step.timestamp
      : (step.key === deal.status || STATUS_ORDER.indexOf(step.key) < currentIdx) && !!step.timestamp;
    return {
      id: step.key,
      title: step.title,
      description: step.description,
      timestamp: step.timestamp || "",
      isCompleted: !!isCompleted,
    };
  });
}

export default function BuyerDealDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const slug = id;

  const [deal, setDeal] = useState<BackendDeal | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const { data } = await dealService.get(slug);
        setDeal(data);
      } catch {
        toast.error("Could not load deal details");
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
  }, [slug]);

  const handleConfirm = async () => {
    setActionLoading("confirm");
    try {
      const { data } = await dealService.confirm(slug);
      setDeal(data);
      toast.success("Delivery confirmed! Funds released to seller.");
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { error?: string } } })?.response?.data?.error || "Failed to confirm delivery";
      toast.error(msg);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDispute = () => {
    const reason = prompt("Enter dispute reason:");
    if (!reason?.trim()) return;
    setActionLoading("dispute");
    dealService
      .dispute(slug, reason)
      .then(() => {
        toast.success("Dispute opened successfully");
        setDeal((prev) => prev ? { ...prev, status: "DISPUTED" } : prev);
      })
      .catch((error: unknown) => {
        const msg = (error as { response?: { data?: { error?: string } } })?.response?.data?.error || "Failed to open dispute";
        toast.error(msg);
      })
      .finally(() => setActionLoading(null));
  };

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary/50" /></div>;
  }

  if (!deal) {
    return (
      <div className="space-y-6">
        <PageHeader title="Deal Not Found" />
        <p className="text-center text-muted-foreground">
          <Link href="/buyer/transactions" className="text-primary hover:underline">Back to transactions</Link>
        </p>
      </div>
    );
  }

  const timeline = buildTimeline(deal);
  const statusConfig = DEAL_STATUS_CONFIG[deal.status] || { label: deal.status, color: "bg-accent text-muted-foreground" };
  const canConfirm = deal.status === "SHIPPED";
  const canDispute = ["PAID", "SHIPPED"].includes(deal.status);

  return (
    <div className="space-y-6">
      <PageHeader title={deal.item_description} description={`Deal #${deal.slug}`}>
        <Link href="/buyer/transactions"><Button variant="outline" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Transaction Timeline</CardTitle></CardHeader>
          <CardContent>
            <div className="relative">
              {timeline.map((event, idx) => (
                <motion.div key={event.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${event.isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {event.isCompleted ? <CheckCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                    </div>
                    {idx < timeline.length - 1 && <div className={`w-0.5 flex-1 mt-2 ${event.isCompleted ? "bg-primary/30" : "bg-border"}`} />}
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

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Escrow Vault</CardTitle></CardHeader>
            <CardContent>
              <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10 mb-4">
                <motion.div animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Shield className="h-8 w-8 text-primary mx-auto mb-1" />
                </motion.div>
                <p className="text-xl font-bold">{formatCurrency(parseFloat(deal.amount || "0"))}</p>
                <p className="text-xs text-muted-foreground">{["COMPLETED", "REFUNDED"].includes(deal.status) ? "Released" : "Locked"}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className={`font-medium rounded-full px-2 py-0.5 text-xs ${statusConfig.color}`}>{statusConfig.label}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="font-medium">{deal.delivery_days} days</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Trust Fee</span><span className="font-medium">{deal.trust_fee_percent}%</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Created</span><span className="font-medium">{formatDate(deal.created_at)}</span></div>
                {deal.auto_release_at && <div className="flex justify-between"><span className="text-muted-foreground">Auto Release</span><span className="font-medium text-amber-600">{formatDate(deal.auto_release_at)}</span></div>}
              </div>
            </CardContent>
          </Card>

          {deal.status === "PENDING_PAYMENT" && (
            <Card>
              <CardHeader><CardTitle className="text-base">Make Payment</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-muted-foreground">Transfer the exact amount to the virtual account below:</p>
                <p className="font-semibold">{formatCurrency(parseFloat(deal.amount || "0"))}</p>
              </CardContent>
            </Card>
          )}

          {deal.va_account_number && deal.status !== "PENDING_PAYMENT" && (
            <Card>
              <CardHeader><CardTitle className="text-base">Payment Details</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div><p className="text-xs text-muted-foreground">VA Account</p><p className="font-mono font-medium">{deal.va_account_number}</p></div>
                <div><p className="text-xs text-muted-foreground">VA Bank</p><p className="font-medium">{deal.va_bank_name}</p></div>
              </CardContent>
            </Card>
          )}

          {(canConfirm || canDispute) && (
            <div className="space-y-2">
              {canConfirm && (
                <Button className="w-full" onClick={handleConfirm} disabled={actionLoading !== null}>
                  {actionLoading === "confirm" ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
                  Confirm Delivery
                </Button>
              )}
              {canDispute && (
                <Button variant="destructive" className="w-full" onClick={handleDispute} disabled={actionLoading !== null}>
                  {actionLoading === "dispute" ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <AlertTriangle className="h-4 w-4 mr-2" />}
                  Raise Dispute
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
