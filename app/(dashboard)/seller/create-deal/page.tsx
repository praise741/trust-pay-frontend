"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Package, ArrowRight, CheckCircle, Copy, Link2, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { dealService } from "@/services/api";
import { getErrorMessage } from "@/lib/error-handler";
import { toast } from "sonner";

export default function CreateDealPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [createdDeal, setCreatedDeal] = useState<{ slug: string; link_url: string; item_description: string; amount: string } | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [amount, setAmount] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("3");

  const handleCreate = async () => {
    if (!title.trim() || !amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const item_description = description ? `${title} - ${description}` : title;
      const { data } = await dealService.create({
        item_description,
        amount: parseFloat(amount).toFixed(2),
        delivery_days: parseInt(deliveryDays),
        buyer_email: buyerEmail || undefined,
        buyer_phone: buyerPhone || undefined,
      });
      const linkUrl = `${window.location.origin}/pay/${data.slug}`;
      setCreatedDeal({ slug: data.slug, link_url: linkUrl, item_description: data.item_description, amount: data.amount });
      toast.success("Deal created successfully!");
    } catch (error) {
      const msg = getErrorMessage(error, "Failed to create deal");
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCreatedDeal(null);
    setStep(1);
    setTitle("");
    setDescription("");
    setPlatform("instagram");
    setAmount("");
    setBuyerEmail("");
    setBuyerPhone("");
    setDeliveryDays("3");
  };

  if (createdDeal) {
    return (
      <div className="space-y-6">
        <PageHeader title="Deal Created!" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-xl font-bold mb-2">Deal Ready!</h2>
              <p className="text-sm text-muted-foreground mb-4">Share this payment link with your buyer</p>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-xl mb-4">
                <Link2 className="h-4 w-4 text-muted-foreground shrink-0" />
                <p className="text-xs font-mono truncate">{createdDeal.link_url}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(createdDeal.link_url);
                    toast.success("Copied!");
                  }}
                >
                  <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => router.push("/seller/transactions")}>
                  View Deals
                </Button>
                <Button className="flex-1" onClick={resetForm}>
                  Create Another
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Create Deal" description="Set up a new escrow transaction" />

      <div className="flex items-center gap-2 max-w-md mx-auto">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {s}
            </div>
            {s < 3 && <div className={`h-0.5 flex-1 rounded ${step > s ? "bg-primary" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      <Card className="max-w-lg mx-auto">
        <CardContent className="p-6">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h3 className="font-semibold">Product Details</h3>
              <div className="space-y-2">
                <Label>Product Title</Label>
                <Input placeholder="e.g. iPhone 15 Pro" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Describe the product or service..." value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Platform</Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="x">X (Twitter)</SelectItem>
                    <SelectItem value="direct">Direct</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={() => setStep(2)} disabled={!title.trim()}>
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h3 className="font-semibold">Pricing & Delivery</h3>
              <div className="space-y-2">
                <Label>Amount (₦)</Label>
                <Input type="number" placeholder="850000" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Buyer Email</Label>
                <Input type="email" placeholder="buyer@example.com" value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Buyer Phone (optional)</Label>
                <Input type="tel" placeholder="08012345678" value={buyerPhone} onChange={(e) => setBuyerPhone(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Delivery Timeline (days)</Label>
                <Select value={deliveryDays} onValueChange={setDeliveryDays}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 day</SelectItem>
                    <SelectItem value="2">2 days</SelectItem>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="5">5 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button className="flex-1" onClick={() => setStep(3)} disabled={!amount || parseFloat(amount) <= 0}>
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h3 className="font-semibold">Review & Create</h3>
              <div className="p-4 rounded-xl bg-accent/50 space-y-2">
                {[
                  ["Product", title],
                  ["Delivery", `${deliveryDays} days`],
                  ["Platform", platform.charAt(0).toUpperCase() + platform.slice(1)],
                  ...(buyerEmail ? [["Buyer Email", buyerEmail]] : []),
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>

              {/* Fee Breakdown */}
              {amount && parseFloat(amount) > 0 && (
                <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">Fee Breakdown</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Deal Amount</span>
                    <span className="font-medium">₦{parseFloat(amount).toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">TrustPay Security Fee (1.5%)</span>
                    <span className="font-medium text-amber-600">- ₦{(parseFloat(amount) * 0.015).toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="h-px bg-border my-1" />
                  <div className="flex justify-between text-sm font-semibold">
                    <span>You Receive</span>
                    <span className="text-green-600">₦{(parseFloat(amount) * 0.985).toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2">The buyer pays ₦{parseFloat(amount).toLocaleString("en-NG", { minimumFractionDigits: 2 })} and TrustPay retains 1.5% to secure the escrow.</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button className="flex-1" onClick={handleCreate} disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Package className="h-4 w-4 mr-2" />}
                  Create Deal
                </Button>
              </div>
            </motion.div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
