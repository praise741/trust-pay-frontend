"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Shield, Users, Target, Heart, ArrowRight, CheckCircle, Globe, GraduationCap, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const TEAM = [
  {
    name: "Ogunmola Michael Olueamuyiwa",
    initials: "OMO",
    role: "Team Lead & Full-Stack Developer",
    bio: "Passionate about building scalable fintech solutions that solve real African market problems.",
  },
  {
    name: "Praise Akinsuroju",
    initials: "PA",
    role: "Backend Developer",
    bio: "Focused on secure API design, payment integrations, and robust server-side architecture.",
  },
  {
    name: "Maxwell",
    initials: "MX",
    role: "Frontend Developer",
    bio: "Crafts beautiful, intuitive user interfaces with a sharp eye for detail and user experience.",
  },
  {
    name: "Todinmu Emmanuel",
    initials: "TE",
    role: "Product & Systems Designer",
    bio: "Bridges the gap between user needs and technical implementation through thoughtful product design.",
  },
];

const VALUES = [
  { icon: Shield, title: "Security First", description: "Every naira is protected through escrow — funds only release when both parties are satisfied." },
  { icon: Users, title: "Community Trust", description: "We build trust through transparency, accountability, and fair dispute resolution for all users." },
  { icon: Target, title: "African Focus", description: "Built specifically for the unique dynamics of Nigerian and African social commerce ecosystems." },
  { icon: Heart, title: "Seller Empowerment", description: "We level the playing field, helping small sellers compete through verified trust signals." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass-strong border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.jpg" alt="TrustPay" width={32} height={32} className="rounded-xl" style={{ width: "auto", height: "auto" }} />
            <span className="text-lg font-bold">TrustPay</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
            <Link href="/signup"><Button size="sm">Get Started</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 text-center gradient-mesh">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          className="max-w-3xl mx-auto px-4"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <GraduationCap className="h-3.5 w-3.5" /> Built at Joseph Ayo Babalola University
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight">
            Building trust infrastructure for <span className="text-primary">Africa&apos;s digital economy</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground mt-6">
            TrustPay was born from a simple problem: buying from strangers on social media is risky. We&apos;re a team of students from JABU who built the escrow layer that makes it safe.
          </motion.p>
        </motion.div>
      </section>

      {/* University section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Lightbulb className="h-3.5 w-3.5" /> Hackathon Project
              </div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                We are undergraduate students from <strong>Joseph Ayo Babalola University (JABU)</strong>, Ikeji-Arakeji, Osun State, Nigeria. TrustPay started as a hackathon project driven by a shared frustration — too many people losing money to social media scammers.
              </p>
              <p className="text-muted-foreground mb-4">
                Nigeria&apos;s social commerce market is worth over $5 billion, yet millions of transactions happen on trust alone. Buyers send money to strangers. Sellers ship goods hoping for payment. We built TrustPay to sit in the middle — securing every naira until both parties are satisfied.
              </p>
              <div className="space-y-2 mt-6">
                {[
                  "Escrow-based payment protection",
                  "Real-time transaction tracking",
                  "Automated dispute resolution",
                  "Merchant payment link generation",
                ].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success shrink-0" />
                    <span className="text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="bg-accent/30 border-0">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold leading-relaxed text-center">
                  &ldquo;We believe every Nigerian entrepreneur deserves a safe way to transact online — and we built it.&rdquo;
                </p>
                <p className="text-muted-foreground mt-4 text-center text-sm">— TrustPay Team, JABU</p>
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
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <v.icon className="h-6 w-6 text-primary" />
                  </div>
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
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Globe className="h-3.5 w-3.5" /> Joseph Ayo Babalola University
            </div>
            <h2 className="text-3xl font-bold">Meet the Team</h2>
            <p className="text-muted-foreground mt-2">The students behind TrustPay</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="text-center hover:border-primary/30 hover:shadow-lg transition-all group">
                  <CardContent className="p-6">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4 text-primary font-bold text-lg group-hover:scale-105 transition-transform">
                      {t.initials}
                    </div>
                    <h3 className="font-semibold text-sm leading-tight">{t.name}</h3>
                    <p className="text-xs text-primary mt-1 font-medium">{t.role}</p>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{t.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent/30 text-center">
        <h2 className="text-2xl font-bold mb-2">Join the Trust Revolution</h2>
        <p className="text-muted-foreground mb-6 text-sm">Secure your transactions with TrustPay today</p>
        <Link href="/signup">
          <Button size="lg" className="gap-2">
            Get Started <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
