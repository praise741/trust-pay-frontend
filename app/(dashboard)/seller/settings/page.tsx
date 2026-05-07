"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Bell, Building2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function SellerSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your seller account" />
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="profile"><User className="h-3.5 w-3.5 mr-1.5" />Profile</TabsTrigger>
          <TabsTrigger value="security"><Lock className="h-3.5 w-3.5 mr-1.5" />Security</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-3.5 w-3.5 mr-1.5" />Notifications</TabsTrigger>
          <TabsTrigger value="bank"><Building2 className="h-3.5 w-3.5 mr-1.5" />Payout</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card><CardHeader><CardTitle className="text-base">Business Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Business Name</Label><Input defaultValue="Chukwuma's Bookstore" /></div>
                <div className="space-y-2"><Label>Email</Label><Input defaultValue="chukwuma@example.com" type="email" /></div>
                <div className="space-y-2"><Label>Phone</Label><Input defaultValue="+234 809 876 5432" /></div>
                <div className="space-y-2"><Label>Location</Label><Input defaultValue="Abuja, Nigeria" /></div>
              </div>
              <Button onClick={() => toast.success("Profile updated!")}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card><CardHeader><CardTitle className="text-base">Security Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Current Password</Label><Input type="password" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="space-y-2"><Label>New Password</Label><Input type="password" /></div><div className="space-y-2"><Label>Confirm</Label><Input type="password" /></div></div>
              <Button onClick={() => toast.success("Password updated!")}>Update Password</Button>
              <div className="flex items-center justify-between pt-4 border-t"><div><p className="text-sm font-medium">Two-Factor Authentication</p><p className="text-xs text-muted-foreground">Extra layer of security</p></div><Switch defaultChecked /></div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card><CardHeader><CardTitle className="text-base">Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {["New orders", "Payment received", "Shipment updates", "Dispute alerts", "Marketing"].map((label) => (
                <div key={label} className="flex items-center justify-between py-2"><p className="text-sm font-medium">{label}</p><Switch defaultChecked /></div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bank">
          <Card><CardHeader><CardTitle className="text-base">Payout Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Bank Name</Label><Input defaultValue="GTBank" /></div>
                <div className="space-y-2"><Label>Account Number</Label><Input defaultValue="0123456789" /></div>
              </div>
              <Button onClick={() => toast.success("Payout account saved!")}>Save</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
