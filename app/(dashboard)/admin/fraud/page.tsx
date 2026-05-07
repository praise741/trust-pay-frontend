"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Shield, Eye, Ban, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/shared/kpi-card";
import { toast } from "sonner";

const FRAUD_ALERTS = [
  { id: "1", user: "Suspicious Account #4521", type: "Multiple failed logins", risk: "High", time: "2 hours ago", description: "15 failed login attempts from different IPs" },
  { id: "2", user: "Bayo Fashions", type: "Unusual transaction pattern", risk: "Medium", time: "5 hours ago", description: "3 transactions created and cancelled within 10 minutes" },
  { id: "3", user: "Unknown IP 192.168.x.x", type: "Potential account takeover", risk: "Critical", time: "1 hour ago", description: "Password changed and withdrawal attempted immediately" },
];

export default function AdminFraudPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Fraud Detection" description="Monitor and prevent fraudulent activity" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard title="Active Alerts" value="3" change="Needs attention" changeType="negative" icon={AlertTriangle} />
        <KPICard title="Blocked Users" value="12" change="+2 this week" changeType="neutral" icon={Ban} delay={0.1} />
        <KPICard title="Risk Score" value="Low" change="Platform healthy" changeType="positive" icon={Shield} delay={0.2} />
      </div>
      <div className="space-y-3">
        {FRAUD_ALERTS.map((alert, i) => (
          <motion.div key={alert.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className={`border-l-4 ${alert.risk === "Critical" ? "border-l-red-500" : alert.risk === "High" ? "border-l-amber-500" : "border-l-yellow-500"}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`h-4 w-4 ${alert.risk === "Critical" ? "text-red-500" : "text-amber-500"}`} />
                    <h3 className="font-medium text-sm">{alert.type}</h3>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${alert.risk === "Critical" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : alert.risk === "High" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"}`}>{alert.risk}</span>
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{alert.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{alert.user}: {alert.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline"><Eye className="h-3.5 w-3.5 mr-1" /> Investigate</Button>
                  <Button size="sm" variant="destructive" onClick={() => toast.success("User blocked")}><Ban className="h-3.5 w-3.5 mr-1" /> Block User</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
