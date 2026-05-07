"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Shield, Bell, Database } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Platform configuration" />
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="general"><Settings className="h-3.5 w-3.5 mr-1.5" />General</TabsTrigger>
          <TabsTrigger value="security"><Shield className="h-3.5 w-3.5 mr-1.5" />Security</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-3.5 w-3.5 mr-1.5" />Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card><CardHeader><CardTitle className="text-base">Platform Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Platform Name</Label><Input defaultValue="TrustPay" /></div>
              <div className="space-y-2"><Label>Support Email</Label><Input defaultValue="support@trustpay.ng" /></div>
              <div className="flex items-center justify-between py-2"><div><p className="text-sm font-medium">Maintenance Mode</p><p className="text-xs text-muted-foreground">Temporarily disable platform access</p></div><Switch /></div>
              <div className="flex items-center justify-between py-2"><div><p className="text-sm font-medium">Auto-release Funds</p><p className="text-xs text-muted-foreground">Release funds after delivery deadline</p></div><Switch defaultChecked /></div>
              <Button onClick={() => toast.success("Settings saved!")}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card><CardHeader><CardTitle className="text-base">Security Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2"><div><p className="text-sm font-medium">Force 2FA for all users</p></div><Switch /></div>
              <div className="flex items-center justify-between py-2"><div><p className="text-sm font-medium">Auto-block suspicious accounts</p></div><Switch defaultChecked /></div>
              <div className="flex items-center justify-between py-2"><div><p className="text-sm font-medium">KYC required for transactions</p></div><Switch defaultChecked /></div>
              <Button onClick={() => toast.success("Security settings saved!")}>Save</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card><CardHeader><CardTitle className="text-base">Admin Notifications</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {["New fraud alerts", "KYC submissions", "Dispute escalations", "System errors", "Daily summary"].map((label) => (
                <div key={label} className="flex items-center justify-between py-2"><p className="text-sm font-medium">{label}</p><Switch defaultChecked /></div>
              ))}
              <Button onClick={() => toast.success("Notification settings saved!")}>Save</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
