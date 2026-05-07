"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, ArrowRight, CheckCircle, Lock, Truck, ShieldCheck, Star, Smartphone, Globe, Zap, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const FEATURES = [
  { icon: Lock, title: "Escrow Protection", description: "Funds locked securely until delivery is confirmed by the buyer" },
  { icon: Truck, title: "Delivery Tracking", description: "Real-time tracking with geo-verification and checkpoint updates" },
  { icon: ShieldCheck, title: "Trust Scores", description: "Build reputation through verified transactions and good behavior" },
  { icon: Smartphone, title: "Social Commerce", description: "Seamlessly integrates with Instagram, WhatsApp, TikTok, and X" },
  { icon: Globe, title: "Nationwide Coverage", description: "Serve buyers and sellers across all 36 states in Nigeria" },
  { icon: Zap, title: "Instant Payouts", description: "Sellers receive funds instantly once delivery is confirmed" },
];

const STEPS = [
  { step: "01", title: "Create a Deal", description: "Seller creates a payment link with product details and delivery timeline" },
  { step: "02", title: "Secure Payment", description: "Buyer pays and funds are locked in TrustPay's escrow vault" },
  { step: "03", title: "Ship & Track", description: "Seller ships the item with real-time delivery tracking" },
  { step: "04", title: "Confirm & Release", description: "Buyer confirms delivery and funds are released to seller" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-lg"><Shield className="h-4.5 w-4.5 text-white" /></div>
            <span className="text-lg font-bold tracking-tight">TrustPay</span>
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
            <Link href="/signup"><Button size="sm">Get Started</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 gradient-mesh" />
        <div className="pointer-events-none absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-sage/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-32 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="h-3.5 w-3.5" /> Trust Infrastructure for African Commerce
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
            Secure Every Transaction on{" "}
            <span className="bg-gradient-to-r from-primary to-sage bg-clip-text text-transparent">Social Commerce</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            TrustPay protects buyers and sellers on Instagram, WhatsApp, TikTok, and X with secure escrow, delivery tracking, and instant payouts.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link href="/signup"><Button size="xl" className="gap-2">Start Selling Securely <ArrowRight className="h-4 w-4" /></Button></Link>
            <Link href="/login"><Button size="xl" variant="outline">I&apos;m a Buyer</Button></Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-success" /> No setup fees</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-success" /> 256-bit encryption</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-success" /> PCI DSS compliant</span>
          </motion.div>

          {/* Platform icons */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex items-center justify-center gap-4 mt-8">
            {[Instagram, MessageCircle].map((Icon, i) => (
              <div key={i} className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center"><Icon className="h-5 w-5 text-muted-foreground" /></div>
            ))}
            <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center text-muted-foreground font-bold text-sm">𝕏</div>
            <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center text-muted-foreground font-bold text-xs">TT</div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold">Built for Trust</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mt-4 max-w-2xl mx-auto">Everything you need to buy and sell securely on social media platforms across Nigeria.</motion.p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <motion.div key={f.title} variants={fadeUp}>
                <Card className="h-full hover:border-primary/20 transition-all hover:shadow-lg group">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"><f.icon className="h-6 w-6 text-primary" /></div>
                    <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold">How TrustPay Works</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mt-4">Four simple steps to secure transactions</motion.p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s) => (
              <motion.div key={s.step} variants={fadeUp} className="text-center">
                <div className="text-4xl font-bold text-primary/20 mb-3">{s.step}</div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-accent/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to trade with confidence?</h2>
            <p className="text-muted-foreground mb-8">Join thousands of Nigerians who trust TrustPay for secure social commerce transactions.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup"><Button size="xl" className="gap-2">Create Free Account <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link href="/login"><Button size="xl" variant="outline">Sign In</Button></Link>
            </div>
            <div className="flex items-center justify-center gap-1 mt-6 text-sm text-muted-foreground">
              {[1, 2, 3, 4, 5].map((s) => (<Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />))}
              <span className="ml-2">Trusted by 12,000+ users</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2"><div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center"><Shield className="h-4 w-4 text-white" /></div><span className="font-bold">TrustPay</span></div>
            <p className="text-sm text-muted-foreground">© 2026 TrustPay. Trust infrastructure for African social commerce.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
