"use client";

import { useState, useEffect, use } from "react";
import { ArrowLeft, Shield, Copy, Loader2, Truck, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DEAL_STATUS_CONFIG } from "@/constants";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { merchantService, dealService } from "@/services/api";
import Link from "next/link";
import { toast } from "sonner";
import type { BackendDeal } from "@/types";

export default function SellerDealDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const slug = id;

  const [deal, setDeal] = useState<BackendDeal | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const { data } = await merchantService.dealDetail(slug);
        setDeal(data);
      } catch {
        toast.error("Could not load deal details");
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
  }, [slug]);

  const handleShip = async () => {
    setActionLoading("ship");
    try {
      const { data } = await dealService.ship(slug);
      setDeal(data);
      toast.success("Deal marked as shipped!");
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { error?: string } } })?.response?.data?.error || "Failed to mark as shipped";
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
          <Link href="/seller/transactions" className="text-primary hover:underline">Back to transactions</Link>
        </p>
      </div>
    );
  }

  const statusConfig = DEAL_STATUS_CONFIG[deal.status] || { label: deal.status, color: "bg-accent text-muted-foreground" };
  const canShip = deal.status === "PAID";
  const canDispute = ["PAID", "SHIPPED"].includes(deal.status);

  return (
    <div className="space-y-6">
      <PageHeader title={deal.item_description} description={`Deal #${deal.slug}`}>
        <Link href="/seller/transactions">
          <Button variant="outline" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Deal Details</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusConfig.color}`}>{statusConfig.label}</span>
              </div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Amount</span><span className="font-semibold">{formatCurrency(parseFloat(deal.amount || "0"))}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Buyer Email</span><span className="font-medium">{deal.buyer_email || "Not provided"}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Buyer Phone</span><span className="font-medium">{deal.buyer_phone || "Not provided"}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery Days</span><span className="font-medium">{deal.delivery_days} days</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Trust Fee</span><span className="font-medium">{deal.trust_fee_percent}%</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Created</span><span className="font-medium">{formatDateTime(deal.created_at)}</span></div>
              {deal.paid_at && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Paid At</span><span className="font-medium">{formatDateTime(deal.paid_at)}</span></div>}
              {deal.shipped_at && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Shipped At</span><span className="font-medium">{formatDateTime(deal.shipped_at)}</span></div>}
              {deal.completed_at && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Completed At</span><span className="font-medium">{formatDateTime(deal.completed_at)}</span></div>}
              {deal.auto_release_at && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Auto Release</span><span className="font-medium text-amber-600">{formatDateTime(deal.auto_release_at)}</span></div>}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {deal.va_account_number && (
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4" /> Payment Details</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div><p className="text-xs text-muted-foreground">VA Account Number</p>
                  <div className="flex items-center gap-2"><p className="text-sm font-mono font-medium">{deal.va_account_number}</p>
                    <button onClick={() => { navigator.clipboard.writeText(deal.va_account_number); toast.success("Copied!"); }}><Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" /></button>
                  </div>
                </div>
                <div><p className="text-xs text-muted-foreground">VA Bank</p><p className="text-sm font-medium">{deal.va_bank_name}</p></div>
                {deal.va_reference && <div><p className="text-xs text-muted-foreground">Reference</p><p className="text-xs font-mono">{deal.va_reference}</p></div>}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader><CardTitle className="text-base">Actions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {canShip && (
                <Button className="w-full" onClick={handleShip} disabled={actionLoading !== null}>
                  {actionLoading === "ship" ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Truck className="h-4 w-4 mr-2" />}
                  Mark as Shipped
                </Button>
              )}
              {canDispute && (
                <Button variant="destructive" className="w-full" onClick={handleDispute} disabled={actionLoading !== null}>
                  {actionLoading === "dispute" ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <AlertTriangle className="h-4 w-4 mr-2" />}
                  Open Dispute
                </Button>
              )}
              {!canShip && !canDispute && (
                <p className="text-sm text-muted-foreground text-center py-2">No actions available</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
