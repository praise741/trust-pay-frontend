"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { Shield, Copy, CheckCircle, Loader2, AlertCircle, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DEAL_STATUS_CONFIG } from "@/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { dealService } from "@/services/api";
import { getErrorMessage } from "@/lib/error-handler";
import { toast } from "sonner";
import type { BackendDeal } from "@/types";

interface VaDetails {
  va_account_number: string;
  va_bank_name: string;
  amount: string;
  trust_fee_percent: string;
  trust_fee_amount: string;
  seller_receives: string;
}

export default function PaymentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [deal, setDeal] = useState<BackendDeal | null>(null);
  const [vaDetails, setVaDetails] = useState<VaDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const { data } = await dealService.get(slug);
        setDeal(data);
      } catch (err) {
        setError(getErrorMessage(err, "Deal not found"));
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
  }, [slug]);

  const handleGetVa = async () => {
    setActionLoading("pay");
    try {
      const { data } = await dealService.pay(slug);
      setVaDetails(data);
      toast.success("Virtual account generated");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to generate payment details"));
    } finally {
      setActionLoading(null);
    }
  };

  const handleMockPay = async () => {
    setActionLoading("mock-pay");
    try {
      const { data } = await dealService.mockPay(slug);
      setDeal(data.deal || data);
      setVaDetails(null);
      toast.success("Payment confirmed!");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to confirm payment"));
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !deal) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Deal Not Found</h2>
            <p className="text-sm text-muted-foreground">{error || "This payment link is invalid or has expired."}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusConfig = DEAL_STATUS_CONFIG[deal.status] || { label: deal.status, color: "bg-accent text-muted-foreground" };
  const isPending = deal.status === "PENDING_PAYMENT";
  const isPaid = deal.status === "PAID";
  const isCompleted = deal.status === "COMPLETED";

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg w-full">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TrustPay</span>
          </div>
          <p className="text-sm text-muted-foreground">Secure Escrow Payments</p>
        </div>

        {/* Deal Info */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{deal.item_description}</CardTitle>
              <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusConfig.color}`}>
                {statusConfig.label}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-sm text-muted-foreground mb-1">Amount to Pay</p>
              <p className="text-3xl font-bold">{formatCurrency(parseFloat(deal.amount || "0"))}</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Timeline</span>
                <span className="font-medium">{deal.delivery_days} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">TrustPay Security Fee</span>
                <span className="font-medium text-amber-600">{deal.trust_fee_percent}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span className="font-medium">{formatDate(deal.created_at)}</span>
              </div>
            </div>

            <Separator />

            {/* Payment Flow */}
            {isPending && !vaDetails && (
              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-sm font-medium mb-1">Ready to pay?</p>
                  <p className="text-xs text-muted-foreground">Click below to get your virtual account details</p>
                </div>
                <Button className="w-full" size="lg" onClick={handleGetVa} disabled={actionLoading !== null}>
                  {actionLoading === "pay" ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Shield className="h-4 w-4 mr-2" />
                  )}
                  Get Payment Details
                </Button>
              </div>
            )}

            {isPending && vaDetails && (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Transfer the exact amount</p>
                      <p className="text-xs text-amber-600 dark:text-amber-400">Transfer {formatCurrency(parseFloat(vaDetails.amount))} to the account below</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-muted">
                    <p className="text-xs text-muted-foreground mb-1">Bank</p>
                    <p className="text-base font-semibold">{vaDetails.va_bank_name}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted">
                    <p className="text-xs text-muted-foreground mb-1">Account Number</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-mono font-bold tracking-wider">{vaDetails.va_account_number}</p>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(vaDetails.va_account_number);
                          toast.success("Account number copied!");
                        }}
                        className="p-2 rounded-lg hover:bg-accent transition-colors"
                      >
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  {/* Fee breakdown for buyer */}
                  <div className="p-3 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide">Payment Breakdown</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">You Pay</span>
                      <span className="font-semibold">{formatCurrency(parseFloat(vaDetails.amount))}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">TrustPay Security Fee (1.5%)</span>
                      <span className="text-amber-600 font-medium">₦{parseFloat(vaDetails.trust_fee_amount).toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Seller Receives</span>
                      <span className="font-medium text-green-600">₦{parseFloat(vaDetails.seller_receives).toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">The security fee protects your transaction and is kept in escrow until delivery is confirmed.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" size="lg" onClick={handleMockPay} disabled={actionLoading !== null}>
                    {actionLoading === "mock-pay" ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    I&apos;ve Made the Transfer
                  </Button>
                  <p className="text-[10px] text-muted-foreground text-center">
                    Only click this after you&apos;ve transferred the exact amount
                  </p>
                </div>
              </div>
            )}

            {isPaid && (
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-green-700 dark:text-green-400">Payment Received!</p>
                  <p className="text-sm text-muted-foreground">The seller has been notified and will ship your order soon.</p>
                </div>
                {deal.paid_at && (
                  <p className="text-xs text-muted-foreground">Paid on {formatDate(deal.paid_at)}</p>
                )}
              </div>
            )}

            {isCompleted && (
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-blue-700 dark:text-blue-400">Deal Completed</p>
                  <p className="text-sm text-muted-foreground">This transaction has been completed successfully.</p>
                </div>
              </div>
            )}

            {!isPending && !isPaid && !isCompleted && (
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-muted">
                  <AlertCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Deal Status: {statusConfig.label}</p>
                  <p className="text-sm text-muted-foreground">This deal is currently being processed.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Protected by TrustPay Escrow &middot; Your money is held securely until delivery
        </p>
      </motion.div>
    </div>
  );
}
