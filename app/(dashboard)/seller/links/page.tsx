"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link2, Copy, Plus, Loader2, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DEAL_STATUS_CONFIG } from "@/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { merchantService } from "@/services/api";
import { toast } from "sonner";
import Link from "next/link";

interface PaymentLink {
  id: string;
  slug: string;
  link_url: string;
  item_description: string;
  amount: string;
  status: string;
  created_at: string;
  delivery_days: number;
}

export default function SellerLinksPage() {
  const [links, setLinks] = useState<PaymentLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const { data } = await merchantService.links();
        setLinks(data || []);
      } catch {
        setLinks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Payment link copied!");
  };

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary/50" /></div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Payment Links" description="Manage your payment links">
        <Link href="/seller/create-deal">
          <Button><Plus className="h-4 w-4 mr-1" /> Create Link</Button>
        </Link>
      </PageHeader>

      <div className="space-y-3">
        {links.length > 0 ? links.map((link, i) => (
          <motion.div key={link.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="hover:border-primary/30 transition-all">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Link2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{link.item_description}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(link.created_at)} &middot; {link.delivery_days} days delivery</p>
                      <p className="text-xs font-mono text-muted-foreground truncate mt-1">{link.link_url}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold">{formatCurrency(parseFloat(link.amount || "0"))}</p>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${DEAL_STATUS_CONFIG[link.status]?.color || "bg-accent text-muted-foreground"}`}>
                      {DEAL_STATUS_CONFIG[link.status]?.label || link.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" onClick={() => copyLink(link.link_url)}>
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy Link
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={link.link_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5 mr-1" /> Open
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Link2 className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium">No payment links yet</p>
            <p className="text-sm text-muted-foreground mt-1 mb-4">Create a deal to generate a payment link</p>
            <Link href="/seller/create-deal">
              <Button><Plus className="h-4 w-4 mr-1" /> Create Deal</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
