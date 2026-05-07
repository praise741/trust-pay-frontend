"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 gradient-mesh" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-sage/5 blur-3xl" />

      {/* Floating particles */}
      <motion.div
        className="pointer-events-none absolute top-20 left-20 h-2 w-2 rounded-full bg-primary/30"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute top-40 right-32 h-3 w-3 rounded-full bg-sage/20"
        animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-32 left-1/4 h-2 w-2 rounded-full bg-primary/20"
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10 w-full max-w-md px-4 py-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col items-center"
        >
          <Link href="/" className="flex items-center gap-2.5 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">TrustPay</span>
          </Link>
          <p className="text-sm text-muted-foreground">Secure escrow for social commerce</p>
        </motion.div>

        {/* Auth card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-strong rounded-2xl p-8 shadow-2xl"
        >
          {children}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-xs text-muted-foreground"
        >
          Protected by 256-bit encryption · PCI DSS Compliant
        </motion.p>
      </div>
    </div>
  );
}
