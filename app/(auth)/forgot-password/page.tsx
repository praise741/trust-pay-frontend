"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email"); return; }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSent(true);
    setIsLoading(false);
    toast.success("Reset link sent!");
  };

  if (sent) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center"><div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center"><CheckCircle className="h-8 w-8 text-success" /></div></div>
        <div><h2 className="text-2xl font-bold">Check your email</h2><p className="text-sm text-muted-foreground mt-1">We sent a reset link to <span className="font-medium text-foreground">{email}</span></p></div>
        <Button variant="outline" className="w-full" onClick={() => setSent(false)}>Try another email</Button>
        <Link href="/login" className="text-sm text-primary hover:underline flex items-center justify-center gap-1"><ArrowLeft className="h-3 w-3" /> Back to login</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center"><h2 className="text-2xl font-bold">Forgot password?</h2><p className="text-sm text-muted-foreground mt-1">Enter your email and we&apos;ll send a reset link</p></div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fp-email">Email address</Label>
          <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input id="fp-email" type="email" placeholder="name@example.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        </div>
        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>Send Reset Link</Button>
      </form>
      <Link href="/login" className="text-sm text-primary hover:underline flex items-center justify-center gap-1"><ArrowLeft className="h-3 w-3" /> Back to login</Link>
    </div>
  );
}
