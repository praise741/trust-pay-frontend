"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_REVENUE_CHART, MOCK_PLATFORM_STATS } from "@/constants";
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#3B82F6", "#64748B", "#06B6D4", "#8B5CF6"];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Platform-wide analytics and insights" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle className="text-base">Platform Growth</CardTitle></CardHeader>
          <CardContent><div className="h-64"><ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_REVENUE_CHART}>
              <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3B82F6" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="name" fontSize={12} stroke="hsl(var(--muted-foreground))" /><YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="url(#ag)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer></div></CardContent>
        </Card>
        <Card><CardHeader><CardTitle className="text-base">Platform Distribution</CardTitle></CardHeader>
          <CardContent><div className="h-64"><ResponsiveContainer width="100%" height="100%">
            <PieChart><Pie data={MOCK_PLATFORM_STATS} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" nameKey="name">
              {MOCK_PLATFORM_STATS.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
            </Pie><Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} /><Legend /></PieChart>
          </ResponsiveContainer></div></CardContent>
        </Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle className="text-base">Key Metrics</CardTitle></CardHeader>
          <CardContent><div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[{ label: "Avg. Settlement Time", value: "2.3 days" }, { label: "Buyer Satisfaction", value: "94.7%" }, { label: "Seller Retention", value: "91.2%" }, { label: "Dispute Resolution", value: "98.1%" }].map((m) => (
              <div key={m.label} className="p-4 rounded-xl bg-accent/50 text-center"><p className="text-xl font-bold">{m.value}</p><p className="text-xs text-muted-foreground mt-1">{m.label}</p></div>
            ))}
          </div></CardContent>
        </Card>
      </div>
    </div>
  );
}
