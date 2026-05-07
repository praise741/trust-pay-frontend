"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MailCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsResending(false);
    toast.success("Verification email resent!");
  };

  return (
    <div className="space-y-6 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }} className="flex justify-center">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
          <MailCheck className="h-10 w-10 text-primary" />
        </div>
      </motion.div>
      <div>
        <h2 className="text-2xl font-bold">Verify your email</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">We&apos;ve sent a verification link to your email address. Click the link to activate your account.</p>
      </div>
      <div className="space-y-3">
        <Button variant="outline" className="w-full" onClick={handleResend} disabled={isResending}>
          {isResending ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : null}
          {isResending ? "Resending..." : "Resend verification email"}
        </Button>
        <Link href="/login" className="block text-sm text-primary hover:underline">Back to login</Link>
      </div>
    </div>
  );
}
