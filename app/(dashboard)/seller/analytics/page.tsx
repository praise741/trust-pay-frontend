"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#3B82F6", "#64748B", "#06B6D4", "#8B5CF6"];

export default function SellerAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Track your sales performance" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Revenue Trend</CardTitle></CardHeader>
          <CardContent><div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[]}>
                <defs><linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3B82F6" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="name" fontSize={12} stroke="hsl(var(--muted-foreground))" /><YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="url(#rev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Weekly Transactions</CardTitle></CardHeader>
          <CardContent><div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[]}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="name" fontSize={12} stroke="hsl(var(--muted-foreground))" /><YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Sales by Platform</CardTitle></CardHeader>
          <CardContent><div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[]} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" nameKey="name">
                  {/* Empty state handles naturally */}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Performance Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Total Revenue", value: "₦4.72M", change: "+23%", positive: true },
              { label: "Avg. Order Value", value: "₦18,500", change: "+5%", positive: true },
              { label: "Dispute Rate", value: "1.2%", change: "-0.3%", positive: true },
              { label: "Delivery Success", value: "98.5%", change: "+0.5%", positive: true },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between py-2 border-b last:border-0 border-border">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <div className="flex items-center gap-2"><span className="font-semibold text-sm">{stat.value}</span><span className={`text-xs font-medium ${stat.positive ? "text-green-600" : "text-red-600"}`}>{stat.change}</span></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
