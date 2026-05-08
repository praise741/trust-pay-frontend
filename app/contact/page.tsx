"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Shield, Mail, Phone, MapPin, Send, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { toast } from "sonner";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    toast.success("Message sent! We'll get back to you within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 glass-strong border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5"><Image src="/logo.jpg" alt="TrustPay" width={32} height={32} className="rounded-xl" style={{ width: "auto", height: "auto" }} /><span className="text-lg font-bold">TrustPay</span></Link>
          <div className="flex items-center gap-3"><ThemeToggle /><Link href="/login"><Button variant="ghost" size="sm">Sign In</Button></Link></div>
        </div>
      </nav>

      <section className="py-24 gradient-mesh">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold">Get in Touch</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-muted-foreground mt-4">Have questions about TrustPay? We&apos;d love to hear from you.</motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              {[
                { icon: Mail, title: "Email", value: "support@trustpay.ng", sub: "We reply within 24 hours" },
                { icon: Phone, title: "Phone", value: "+234 801 TRUST PAY", sub: "Mon–Fri, 9am–6pm WAT" },
                { icon: MapPin, title: "Office", value: "Lagos, Nigeria", sub: "Victoria Island" },
                { icon: MessageCircle, title: "WhatsApp", value: "+234 801 234 5678", sub: "Quick support" },
              ].map((c) => (
                <Card key={c.title} className="hover:border-primary/20 transition-all">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><c.icon className="h-5 w-5 text-primary" /></div>
                    <div><h3 className="font-semibold">{c.title}</h3><p className="text-sm">{c.value}</p><p className="text-xs text-muted-foreground">{c.sub}</p></div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-2">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Full Name</Label><Input placeholder="Adaeze Okonkwo" /></div>
                    <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="name@example.com" /></div>
                  </div>
                  <div className="space-y-2"><Label>Subject</Label><Input placeholder="How does the escrow work?" /></div>
                  <div className="space-y-2"><Label>Message</Label><Textarea placeholder="Tell us more..." className="min-h-[140px]" /></div>
                  <Button type="submit" size="lg" className="gap-2" isLoading={isLoading}><Send className="h-4 w-4" /> Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
