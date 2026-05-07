"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MoreHorizontal, ShieldCheck, ShieldAlert, Ban, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getInitials } from "@/lib/utils";
import { toast } from "sonner";

const USERS = [
  { id: "1", name: "Adaeze Okonkwo", email: "adaeze@example.com", role: "buyer", status: "verified", trustScore: 92, transactions: 47 },
  { id: "2", name: "Chukwuma Eze", email: "chukwuma@example.com", role: "seller", status: "verified", trustScore: 96, transactions: 234 },
  { id: "3", name: "Emeka Nwosu", email: "emeka@example.com", role: "buyer", status: "pending", trustScore: 65, transactions: 8 },
  { id: "4", name: "Fatima Bello", email: "fatima@example.com", role: "seller", status: "verified", trustScore: 88, transactions: 56 },
  { id: "5", name: "Bayo Fashions", email: "bayo@example.com", role: "seller", status: "flagged", trustScore: 45, transactions: 12 },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const filtered = USERS.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Users" description="Manage platform users" />
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search users..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <Select defaultValue="all"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Roles</SelectItem><SelectItem value="buyer">Buyers</SelectItem><SelectItem value="seller">Sellers</SelectItem></SelectContent></Select>
      </div>
      <div className="space-y-2">
        {filtered.map((user, i) => (
          <motion.div key={user.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className="hover:border-primary/20 transition-all">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10"><AvatarFallback>{getInitials(user.name)}</AvatarFallback></Avatar>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${user.status === "verified" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : user.status === "flagged" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>{user.status}</span>
                  <span className="text-sm font-medium hidden sm:block">{user.trustScore}/100</span>
                  <Button variant="ghost" size="icon" onClick={() => toast.info("User actions")}><MoreHorizontal className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
