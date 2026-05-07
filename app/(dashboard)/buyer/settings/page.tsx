"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, ShieldCheck, Bell, Building2, Key, Moon, Smartphone, Activity, Upload } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function BuyerSettingsPage() {
  const [kycStatus] = useState<"not_submitted" | "pending" | "approved">("approved");

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your account preferences" />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="profile"><User className="h-3.5 w-3.5 mr-1.5" />Profile</TabsTrigger>
          <TabsTrigger value="security"><Lock className="h-3.5 w-3.5 mr-1.5" />Security</TabsTrigger>
          <TabsTrigger value="kyc"><ShieldCheck className="h-3.5 w-3.5 mr-1.5" />KYC</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-3.5 w-3.5 mr-1.5" />Notifications</TabsTrigger>
          <TabsTrigger value="bank"><Building2 className="h-3.5 w-3.5 mr-1.5" />Bank</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card><CardHeader><CardTitle className="text-base">Personal Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>First Name</Label><Input defaultValue="Adaeze" /></div>
                <div className="space-y-2"><Label>Last Name</Label><Input defaultValue="Okonkwo" /></div>
                <div className="space-y-2"><Label>Email</Label><Input defaultValue="adaeze@example.com" type="email" /></div>
                <div className="space-y-2"><Label>Phone</Label><Input defaultValue="+234 801 234 5678" /></div>
              </div>
              <Button onClick={() => toast.success("Profile updated!")}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-4">
            <Card><CardHeader><CardTitle className="text-base">Change Password</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2"><Label>Current Password</Label><Input type="password" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>New Password</Label><Input type="password" /></div>
                  <div className="space-y-2"><Label>Confirm Password</Label><Input type="password" /></div>
                </div>
                <Button onClick={() => toast.success("Password updated!")}>Update Password</Button>
              </CardContent>
            </Card>
            <Card><CardHeader><CardTitle className="text-base">Two-Factor Authentication</CardTitle></CardHeader>
              <CardContent className="flex items-center justify-between">
                <div><p className="text-sm">Enable 2FA for extra security</p><p className="text-xs text-muted-foreground">Uses authenticator app or SMS</p></div>
                <Switch defaultChecked />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="kyc">
          <Card><CardHeader><CardTitle className="text-base">Identity Verification</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {kycStatus === "approved" ? (
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center">
                  <ShieldCheck className="h-10 w-10 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-green-700 dark:text-green-400">Verified</p>
                  <p className="text-xs text-muted-foreground">Your identity has been verified</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2"><Label>ID Type</Label>
                    <Select defaultValue="national_id">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="national_id">National ID</SelectItem><SelectItem value="passport">Passport</SelectItem><SelectItem value="drivers_license">Driver License</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2"><Label>NIN Number</Label><Input placeholder="12345678901" /></div>
                  <div className="space-y-2"><Label>BVN Number</Label><Input placeholder="22345678901" /></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"><Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" /><p className="text-sm font-medium">Upload ID Document</p><p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p></div>
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"><Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" /><p className="text-sm font-medium">Upload Selfie</p><p className="text-xs text-muted-foreground">Clear face photo</p></div>
                  </div>
                  <Button>Submit Verification</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card><CardHeader><CardTitle className="text-base">Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {["Payment updates", "Shipment tracking", "Dispute alerts", "Promotional emails", "Security alerts"].map((label) => (
                <div key={label} className="flex items-center justify-between py-2"><div><p className="text-sm font-medium">{label}</p></div><Switch defaultChecked /></div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank">
          <Card><CardHeader><CardTitle className="text-base">Bank Account</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Bank Name</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select bank" /></SelectTrigger>
                    <SelectContent><SelectItem value="gtb">GTBank</SelectItem><SelectItem value="access">Access Bank</SelectItem><SelectItem value="zenith">Zenith Bank</SelectItem><SelectItem value="first">First Bank</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Account Number</Label><Input placeholder="0123456789" /></div>
              </div>
              <Button onClick={() => toast.success("Bank account saved!")}>Save Bank Account</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
