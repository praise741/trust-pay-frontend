"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Shield, Users, Target, Heart, ArrowRight, CheckCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const TEAM = [
  { name: "Ngozi Adeyemi", role: "CEO & Co-Founder", bio: "Former Paystack engineer with 8 years in African fintech" },
  { name: "Chukwuma Eze", role: "CTO & Co-Founder", bio: "Built payment systems processing ₦10B+ annually" },
  { name: "Fatima Bello", role: "Head of Trust & Safety", bio: "Ex-Flutterwave fraud prevention lead" },
  { name: "Tunde Bakare", role: "Head of Product", bio: "Product designer from Kuda Bank and PiggyVest" },
];

const VALUES = [
  { icon: Shield, title: "Security First", description: "Every naira is protected by bank-grade encryption and multi-layer escrow" },
  { icon: Users, title: "Community Trust", description: "We build trust through transparency, accountability, and fair dispute resolution" },
  { icon: Target, title: "African Focus", description: "Built specifically for the unique dynamics of African social commerce" },
  { icon: Heart, title: "Seller Empowerment", description: "We help small sellers compete with established businesses through trust" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass-strong border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="TrustPay" width={32} height={32} className="rounded-xl" />
            <span className="text-lg font-bold">TrustPay</span>
          </Link>
          <div className="flex items-center gap-3"><ThemeToggle /><Link href="/login"><Button variant="ghost" size="sm">Sign In</Button></Link><Link href="/signup"><Button size="sm">Get Started</Button></Link></div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 text-center gradient-mesh">
        <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }} className="max-w-3xl mx-auto px-4">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"><Globe className="h-3.5 w-3.5" /> Our Story</motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight">Building trust infrastructure for <span className="text-primary">Africa&apos;s digital economy</span></motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground mt-6">TrustPay was born from a simple problem: buying from strangers on social media is risky. We created the escrow layer that makes it safe.</motion.p>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4">Nigeria&apos;s social commerce market is worth over $5 billion, yet millions of transactions happen on trust alone. Buyers send money to strangers. Sellers ship goods hoping for payment.</p>
              <p className="text-muted-foreground mb-4">TrustPay sits in the middle — securing every naira until both parties are satisfied. We charge a transparent 1.5–2% trust fee that&apos;s a fraction of what people lose to scams.</p>
              <div className="space-y-2 mt-6">
                {["Secured ₦2.4B+ in transactions", "12,000+ active users across 36 states", "98.5% transaction success rate", "< 24hr average payout time"].map((s) => (
                  <div key={s} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-success shrink-0" /><span className="text-sm">{s}</span></div>
                ))}
              </div>
            </div>
            <Card className="bg-accent/30 border-0">
              <CardContent className="p-8">
                <p className="text-2xl font-bold leading-relaxed">&ldquo;We believe every Nigerian entrepreneur deserves the same trust infrastructure that powers global commerce.&rdquo;</p>
                <p className="text-muted-foreground mt-4">— Ngozi Adeyemi, CEO</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <Card key={v.title} className="hover:border-primary/20 transition-all">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4"><v.icon className="h-6 w-6 text-primary" /></div>
                  <h3 className="font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((t) => (
              <Card key={t.name} className="text-center hover:border-primary/20 transition-all">
                <CardContent className="p-6">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary font-bold text-xl">{t.name.split(" ").map(n => n[0]).join("")}</div>
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="text-sm text-primary">{t.role}</p>
                  <p className="text-xs text-muted-foreground mt-2">{t.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent/30 text-center">
        <h2 className="text-2xl font-bold mb-4">Join the Trust Revolution</h2>
        <Link href="/signup"><Button size="lg" className="gap-2">Get Started <ArrowRight className="h-4 w-4" /></Button></Link>
      </section>
    </div>
  );
}
