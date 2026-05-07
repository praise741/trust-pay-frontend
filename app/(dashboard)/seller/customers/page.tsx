"use client";

import { motion } from "framer-motion";
import { Users, Search, ShieldCheck, ArrowLeftRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";

const MOCK_CUSTOMERS = [
  { id: "1", name: "Adaeze Okonkwo", email: "adaeze@example.com", transactions: 5, totalSpent: 87000, trustScore: 92 },
  { id: "2", name: "Tunde Bakare", email: "tunde@example.com", transactions: 3, totalSpent: 45000, trustScore: 88 },
  { id: "3", name: "Fatima Bello", email: "fatima@example.com", transactions: 8, totalSpent: 156000, trustScore: 95 },
];

export default function SellerCustomersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Customers" description="Manage your customer relationships" />
      <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search customers..." className="pl-10" /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_CUSTOMERS.map((customer, i) => (
          <motion.div key={customer.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="hover:border-primary/20 transition-all">
              <CardContent className="p-5 text-center">
                <Avatar className="h-14 w-14 mx-auto mb-3"><AvatarFallback>{getInitials(customer.name)}</AvatarFallback></Avatar>
                <h3 className="font-semibold">{customer.name}</h3>
                <p className="text-xs text-muted-foreground">{customer.email}</p>
                <div className="flex items-center justify-center gap-1 mt-2"><Badge variant="sage" className="text-[10px]"><ShieldCheck className="h-3 w-3 mr-0.5" /> {customer.trustScore}</Badge></div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="p-2 rounded-lg bg-accent/50"><p className="text-lg font-bold">{customer.transactions}</p><p className="text-[10px] text-muted-foreground">Transactions</p></div>
                  <div className="p-2 rounded-lg bg-accent/50"><p className="text-lg font-bold">₦{(customer.totalSpent / 1000).toFixed(0)}k</p><p className="text-[10px] text-muted-foreground">Total Spent</p></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
