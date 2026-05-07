"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    inputRefs.current[0]?.focus();
    const timer = setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (newOtp.every((d) => d) && newOtp.join("").length === 6) handleVerify(newOtp.join(""));
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleVerify = async (code: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    toast.success("Verification successful!");
    router.push("/buyer/dashboard");
  };

  const handleResend = async () => {
    setCountdown(60);
    toast.success("New code sent!");
  };

  return (
    <div className="space-y-6 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="flex justify-center">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center"><ShieldCheck className="h-8 w-8 text-primary" /></div>
      </motion.div>
      <div><h2 className="text-2xl font-bold">Two-factor authentication</h2><p className="text-sm text-muted-foreground mt-1">Enter the 6-digit code sent to your device</p></div>

      <div className="flex justify-center gap-2">
        {otp.map((digit, i) => (
          <motion.input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="h-14 w-12 rounded-xl border border-input bg-background text-center text-xl font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          />
        ))}
      </div>

      <Button onClick={() => handleVerify(otp.join(""))} className="w-full" size="lg" isLoading={isLoading} disabled={otp.some((d) => !d)}>Verify Code</Button>

      <p className="text-sm text-muted-foreground">
        {countdown > 0 ? <>Resend code in <span className="font-medium text-foreground">{countdown}s</span></> : <button onClick={handleResend} className="text-primary hover:underline font-medium">Resend code</button>}
      </p>
    </div>
  );
}
