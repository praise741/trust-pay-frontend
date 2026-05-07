"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Star, ArrowLeftRight, CheckCircle, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MOCK_BUYER } from "@/constants";
import { getInitials } from "@/lib/utils";

export default function BuyerProfilePage() {
  const user = MOCK_BUYER;

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Your public profile and trust information" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4"><AvatarFallback className="text-2xl">{getInitials(`${user.firstName} ${user.lastName}`)}</AvatarFallback></Avatar>
              <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Badge variant="default" className="gap-1"><ShieldCheck className="h-3 w-3" /> Verified</Badge>
              </div>
              <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-sm text-muted-foreground mb-1">Trust Score</p>
                <p className="text-3xl font-bold text-primary">{user.trustScore}</p>
                <Progress value={user.trustScore} className="mt-2 h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Transaction Statistics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Total Transactions", value: user.totalTransactions, icon: ArrowLeftRight },
                  { label: "Success Rate", value: `${user.successRate}%`, icon: CheckCircle },
                  { label: "Trust Score", value: `${user.trustScore}/100`, icon: ShieldCheck },
                  { label: "Member Since", value: "Jan 2025", icon: Star },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-accent/50 text-center">
                    <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-lg font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
