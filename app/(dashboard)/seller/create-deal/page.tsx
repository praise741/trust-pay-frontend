"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, ArrowRight, CheckCircle, Copy, Link2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function CreateDealPage() {
  const [step, setStep] = useState(1);
  const [created, setCreated] = useState(false);

  const handleCreate = () => {
    setCreated(true);
    toast.success("Deal created successfully!");
  };

  if (created) {
    return (
      <div className="space-y-6">
        <PageHeader title="Deal Created!" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
              </motion.div>
              <h2 className="text-xl font-bold mb-2">Deal Ready!</h2>
              <p className="text-sm text-muted-foreground mb-4">Share this payment link with your buyer</p>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-xl mb-4">
                <Link2 className="h-4 w-4 text-muted-foreground shrink-0" />
                <p className="text-xs font-mono truncate">https://trustpay.ng/pay/TP-2026-001</p>
                <button onClick={() => { navigator.clipboard.writeText("https://trustpay.ng/pay/TP-2026-001"); toast.success("Copied!"); }}><Copy className="h-4 w-4 text-muted-foreground hover:text-foreground" /></button>
              </div>
              <Button className="w-full" onClick={() => { setCreated(false); setStep(1); }}>Create Another Deal</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Create Deal" description="Set up a new escrow transaction" />

      {/* Step indicators */}
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</div>
            {s < 3 && <div className={`h-0.5 flex-1 rounded ${step > s ? "bg-primary" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      <Card className="max-w-lg mx-auto">
        <CardContent className="p-6">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h3 className="font-semibold">Product Details</h3>
              <div className="space-y-2"><Label>Product Title</Label><Input placeholder="e.g. Architecture Book Collection" /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea placeholder="Describe the product..." /></div>
              <div className="space-y-2"><Label>Platform</Label>
                <Select defaultValue="instagram"><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="instagram">Instagram</SelectItem><SelectItem value="whatsapp">WhatsApp</SelectItem><SelectItem value="tiktok">TikTok</SelectItem><SelectItem value="x">X (Twitter)</SelectItem></SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={() => setStep(2)}>Next <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h3 className="font-semibold">Pricing & Delivery</h3>
              <div className="space-y-2"><Label>Amount (₦)</Label><Input type="number" placeholder="5000" /></div>
              <div className="space-y-2"><Label>Buyer Email</Label><Input type="email" placeholder="buyer@example.com" /></div>
              <div className="space-y-2"><Label>Delivery Timeline (days)</Label>
                <Select defaultValue="3"><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="1">1 day</SelectItem><SelectItem value="2">2 days</SelectItem><SelectItem value="3">3 days</SelectItem><SelectItem value="5">5 days</SelectItem><SelectItem value="7">7 days</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="flex gap-2"><Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button><Button className="flex-1" onClick={() => setStep(3)}>Next <ArrowRight className="h-4 w-4 ml-1" /></Button></div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h3 className="font-semibold">Review & Create</h3>
              <div className="p-4 rounded-xl bg-accent/50 space-y-2">
                {[["Product", "Architecture Book Collection"], ["Amount", "₦5,000"], ["Delivery", "3 days"], ["Platform", "Instagram"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>
                ))}
              </div>
              <div className="flex gap-2"><Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button><Button className="flex-1" onClick={handleCreate}>Create Deal</Button></div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
