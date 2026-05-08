"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Shield, ArrowRight, CheckCircle, Lock, Truck, ShieldCheck, Star, Smartphone, Globe, Zap, ChevronLeft, ChevronRight, Quote, Mail, MapPin, Phone, Instagram, MessageCircle, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const TESTIMONIALS = [
  { name: "Chidinma Obi", role: "Fashion Seller, Lagos", text: "TrustPay changed my Instagram business completely. I used to lose ₦200k+ monthly to fake buyers. Now every transaction is secured and I get paid the moment delivery is confirmed.", rating: 5 },
  { name: "Emeka Uche", role: "Buyer, Abuja", text: "I bought a laptop from a TikTok seller I'd never met. TrustPay held the money until I received and tested it. Saved me from what could have been a ₦450k scam.", rating: 5 },
  { name: "Aisha Mohammed", role: "Electronics Seller, Kano", text: "The 1.5% trust fee is nothing compared to what I was losing. My customers trust me more now because I use TrustPay. Revenue is up 40% in 3 months.", rating: 5 },
  { name: "Tunde Bakare", role: "Buyer, Port Harcourt", text: "Bought ankara fabric from a WhatsApp seller in Abeokuta. Got exactly what was advertised. The escrow protection gave me confidence to buy from strangers.", rating: 5 },
  { name: "Folake Adeyemi", role: "Art Dealer, Ibadan", text: "I sell handcrafted pieces worth ₦500k+. TrustPay's dispute resolution and delivery tracking are game changers. My high-value buyers love the security.", rating: 5 },
];

const CAROUSEL_ITEMS = [
  { title: "₦2.4B+ Secured", subtitle: "Transaction volume protected through TrustPay escrow", icon: ShieldCheck },
  { title: "12,000+ Users", subtitle: "Active buyers and sellers across Nigeria", icon: Users },
  { title: "98.5% Success Rate", subtitle: "Transactions completed without disputes", icon: TrendingUp },
  { title: "< 24hr Payouts", subtitle: "Average time from delivery to seller payout", icon: Zap },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentCarousel, setCurrentCarousel] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentCarousel((p) => (p + 1) % CAROUSEL_ITEMS.length), 3000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => setCurrentTestimonial((p) => (p + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setCurrentTestimonial((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div className="min-h-screen bg-background">
      {/* ========== FLOATING NAVBAR ========== */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-3"}`}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 ${scrolled ? "mx-4 sm:mx-6 lg:mx-auto" : ""}`}>
          <div className={`flex items-center justify-between h-14 px-5 rounded-2xl transition-all duration-500 ${scrolled ? "glass-strong shadow-xl" : "bg-transparent"}`}>
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo.jpg" alt="TrustPay" width={32} height={32} className="rounded-xl shadow-lg" style={{ width: "auto", height: "auto" }} />
              <span className="text-lg font-bold tracking-tight">TrustPay</span>
            </Link>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
              <a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a>
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link href="/login"><Button variant="ghost" size="sm" className="hidden sm:flex">Sign In</Button></Link>
              <Link href="/signup"><Button size="sm">Get Started</Button></Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden pt-28 pb-20">
        <div className="pointer-events-none absolute inset-0 gradient-mesh" />
        <div className="pointer-events-none absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-sage/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — Text */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Shield className="h-3.5 w-3.5" /> Trust Infrastructure for African Commerce
                </div>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1]">
                Secure Every Transaction on{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary to-sage bg-clip-text text-transparent">Social Commerce</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path d="M2 8.5C50 2 100 2 150 6C200 10 250 4 298 7" stroke="url(#underline-grad)" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }} />
                    <defs><linearGradient id="underline-grad" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="hsl(var(--primary))" /><stop offset="1" stopColor="#87A987" /></linearGradient></defs>
                  </svg>
                </span>
              </motion.h1>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-6 max-w-lg space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent"><Instagram className="h-3.5 w-3.5 text-pink-500" /> Instagram</span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent"><MessageCircle className="h-3.5 w-3.5 text-green-500" /> WhatsApp</span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent"><span className="text-xs font-bold">🎵</span> TikTok</span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent"><span className="font-bold text-xs">𝕏</span></span>
                </div>
                <p className="text-base text-muted-foreground">Escrow protection, delivery tracking, and instant payouts. <span className="text-primary font-semibold">Only 1.5–2% trust fee.</span></p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                <Link href="/signup"><Button size="xl" className="gap-2">Start Selling Securely <ArrowRight className="h-4 w-4" /></Button></Link>
                <Link href="/login"><Button size="xl" variant="outline">I&apos;m a Buyer</Button></Link>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center gap-5 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-success" /> No setup fees</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-success" /> 256-bit encryption</span>
              </motion.div>
            </div>

            {/* Right — Animated Multi-User Escrow Flow */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:block">
              <HeroEscrowVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== STATS CAROUSEL ========== */}
      <section className="py-6 border-y border-border bg-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CAROUSEL_ITEMS.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 py-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-lg">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section id="features" className="py-24">
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
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <f.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how-it-works" className="py-24 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold">How TrustPay Works</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mt-4">Four simple steps to secure transactions. 1.5–2% trust fee per deal.</motion.p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <motion.div key={s.step} variants={fadeUp} className="relative text-center">
                <div className="text-5xl font-bold text-primary/10 mb-3">{s.step}</div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
                {i < 3 && <div className="hidden lg:block absolute top-8 -right-4 text-muted-foreground/30"><ArrowRight className="h-6 w-6" /></div>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Trusted by Thousands</h2>
            <p className="text-muted-foreground mt-4">Real stories from real users across Nigeria</p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div key={currentTestimonial} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
                <Card className="border-primary/10">
                  <CardContent className="p-8 sm:p-10">
                    <Quote className="h-8 w-8 text-primary/20 mb-4" />
                    <p className="text-lg leading-relaxed mb-6">&ldquo;{TESTIMONIALS[currentTestimonial].text}&rdquo;</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{TESTIMONIALS[currentTestimonial].name}</p>
                        <p className="text-sm text-muted-foreground">{TESTIMONIALS[currentTestimonial].role}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
            <div className="flex items-center justify-center gap-3 mt-6">
              <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full h-9 w-9"><ChevronLeft className="h-4 w-4" /></Button>
              <div className="flex gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setCurrentTestimonial(i)} className={`h-2 rounded-full transition-all ${i === currentTestimonial ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"}`} />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full h-9 w-9"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-24 bg-accent/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to trade with confidence?</h2>
            <p className="text-muted-foreground mb-8">Join thousands of Nigerians who trust TrustPay for secure social commerce transactions. Only 1.5–2% trust fee per transaction.</p>
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

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4"><Image src="/logo.jpg" alt="TrustPay" width={32} height={32} className="rounded-lg" style={{ width: "auto", height: "auto" }} /><span className="font-bold text-lg">TrustPay</span></div>
              <p className="text-sm text-muted-foreground">Trust infrastructure for African social commerce.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="#features" className="block hover:text-foreground transition-colors">Features</a>
                <a href="#how-it-works" className="block hover:text-foreground transition-colors">How it Works</a>
                <Link href="/about" className="block hover:text-foreground transition-colors">About Us</Link>
                <Link href="/contact" className="block hover:text-foreground transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="#" className="block hover:text-foreground">Privacy Policy</a>
                <a href="#" className="block hover:text-foreground">Terms of Service</a>
                <a href="#" className="block hover:text-foreground">Refund Policy</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> support@trustpay.ng</p>
                <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> +234 801 TRUST</p>
                <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Lagos, Nigeria</p>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-10 pt-6 text-center text-sm text-muted-foreground">
            © 2026 TrustPay. All rights reserved. 🇳🇬
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ========================================
   HERO ESCROW VISUAL — Multi-user cycling
   ======================================== */
const ESCROW_DEALS = [
  { buyer: { initials: "AO", name: "Adaeze O.", city: "Lagos", color: "bg-blue-500/20 text-blue-500" }, seller: { initials: "CE", name: "Chukwuma E.", city: "Abuja", color: "bg-emerald-500/20 text-emerald-500" }, amount: 85000, fee: 1.5, platform: "Instagram", step: 3 },
  { buyer: { initials: "TB", name: "Tunde B.", city: "PH", color: "bg-violet-500/20 text-violet-500" }, seller: { initials: "FA", name: "Folake A.", city: "Ibadan", color: "bg-rose-500/20 text-rose-500" }, amount: 450000, fee: 1.5, platform: "WhatsApp", step: 2 },
  { buyer: { initials: "EN", name: "Emeka N.", city: "Enugu", color: "bg-cyan-500/20 text-cyan-500" }, seller: { initials: "AM", name: "Aisha M.", city: "Kano", color: "bg-amber-500/20 text-amber-500" }, amount: 25000, fee: 2.0, platform: "TikTok", step: 4 },
  { buyer: { initials: "FB", name: "Fatima B.", city: "Abuja", color: "bg-pink-500/20 text-pink-500" }, seller: { initials: "KO", name: "Kunle O.", city: "Lagos", color: "bg-teal-500/20 text-teal-500" }, amount: 1200000, fee: 1.5, platform: "X", step: 1 },
];

function HeroEscrowVisual() {
  const [currentDeal, setCurrentDeal] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDeal((p) => (p + 1) % ESCROW_DEALS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const deal = ESCROW_DEALS[currentDeal];
  const receives = deal.amount - (deal.amount * deal.fee / 100);
  const formatN = (n: number) => n >= 1000000 ? `₦${(n / 1000000).toFixed(1)}M` : `₦${n.toLocaleString()}`;

  return (
    <div className="relative">
      {/* Main card */}
      <div className="glass-strong rounded-3xl p-7 shadow-2xl border border-primary/10">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
          <span className="ml-2 text-xs text-muted-foreground font-mono">trustpay.ng/escrow</span>
          <span className="ml-auto text-[10px] text-primary font-medium">LIVE</span>
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentDeal} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }} className="space-y-3">
            {/* Buyer */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-accent/50">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${deal.buyer.color}`}>{deal.buyer.initials}</div>
                <div><p className="text-sm font-semibold">{deal.buyer.name}</p><p className="text-[10px] text-muted-foreground">Buyer · {deal.buyer.city}</p></div>
              </div>
              <div className="text-right"><p className="text-xs text-muted-foreground">Sent</p><p className="text-sm font-bold text-primary">{formatN(deal.amount)}</p></div>
            </div>

            {/* Vault */}
            <div className="flex flex-col items-center py-2">
              <motion.div animate={{ scale: [1, 1.08, 1], boxShadow: ["0 0 0 0 rgba(59,130,246,0)", "0 0 0 12px rgba(59,130,246,0.1)", "0 0 0 0 rgba(59,130,246,0)"] }} transition={{ duration: 2.5, repeat: Infinity }} className="h-12 w-12 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                <Lock className="h-5 w-5 text-white" />
              </motion.div>
              <p className="text-xs font-semibold mt-1.5 text-primary">Escrow Vault</p>
              <p className="text-[10px] text-muted-foreground">Funds secured · {deal.fee}% trust fee</p>
            </div>

            {/* Seller */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-accent/50">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${deal.seller.color}`}>{deal.seller.initials}</div>
                <div><p className="text-sm font-semibold">{deal.seller.name}</p><p className="text-[10px] text-muted-foreground">Seller · {deal.seller.city}</p></div>
              </div>
              <div className="text-right"><p className="text-xs text-muted-foreground">Receives</p><p className="text-sm font-bold text-success">{formatN(receives)}</p></div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress */}
        <div className="mt-4 flex items-center gap-2">
          {["Secured", "Shipped", "In Transit", "Delivered"].map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-1.5 rounded-full transition-all duration-500 ${i < deal.step ? "bg-primary" : "bg-muted"}`} />
              <p className={`text-[9px] mt-1 transition-colors ${i < deal.step ? "text-primary font-medium" : "text-muted-foreground"}`}>{s}</p>
            </div>
          ))}
        </div>

        {/* Deal indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {ESCROW_DEALS.map((_, i) => (
            <button key={i} onClick={() => setCurrentDeal(i)} className={`h-1.5 rounded-full transition-all ${i === currentDeal ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/30"}`} />
          ))}
        </div>
      </div>

    </div>
  );
}
