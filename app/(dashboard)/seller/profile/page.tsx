"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Star, ArrowLeftRight, CheckCircle, Package, Loader2, Save } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { merchantService } from "@/services/api";
import { useAuthStore } from "@/store/auth-store";
import { getInitials } from "@/lib/utils";
import { toast } from "sonner";

export default function SellerProfilePage() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<Record<string, string | null> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await merchantService.getProfile();
        setProfile(data);
        setBankName(data.bank_name || "");
        setBankAccountNumber(data.bank_account_number || "");
        setBankCode(data.bank_code || "");
        setPhone(data.phone || "");
      } catch (error) {
        console.error("Failed to fetch profile", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await merchantService.updateProfile({
        bank_name: bankName || undefined,
        bank_account_number: bankAccountNumber || undefined,
        bank_code: bankCode || undefined,
        phone: phone || undefined,
      });
      toast.success("Profile updated successfully");
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { error?: string } } })?.response?.data?.error || "Failed to update profile";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary/50" /></div>;
  }

  const displayName = profile?.username || user?.firstName || "Seller";
  const displayEmail = profile?.email || user?.email || "";
  const displayPhone = profile?.phone || phone || user?.phone || "";

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Your seller profile and trust information" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarFallback className="text-2xl">{getInitials(displayName)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{displayName}</h2>
              <p className="text-sm text-muted-foreground">{displayEmail}</p>
              {displayPhone && <p className="text-sm text-muted-foreground">{displayPhone}</p>}
              <div className="flex items-center justify-center gap-1 mt-2">
                <Badge className="gap-1"><ShieldCheck className="h-3 w-3" /> Verified Seller</Badge>
              </div>
              <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-sm text-muted-foreground mb-1">Trust Score</p>
                <p className="text-3xl font-bold text-primary">{user?.trustScore || 85}</p>
                <Progress value={user?.trustScore || 85} className="mt-2 h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats & Bank Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-6">
          {/* Seller Statistics */}
          <Card>
            <CardHeader><CardTitle className="text-base">Seller Statistics</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Total Deals", value: String(profile?.total_deals || user?.totalTransactions || 0), icon: ArrowLeftRight },
                  { label: "Success Rate", value: `${user?.successRate || 100}%`, icon: CheckCircle },
                  { label: "Active Deals", value: String(profile?.active_deals || 0), icon: Package },
                  { label: "Rating", value: "5.0★", icon: Star },
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

          {/* Payout Settings */}
          <Card>
            <CardHeader><CardTitle className="text-base">Payout Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bank Name</Label>
                  <Input placeholder="e.g. GTBank" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Bank Code</Label>
                  <Input placeholder="e.g. 058" value={bankCode} onChange={(e) => setBankCode(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Account Number</Label>
                  <Input placeholder="e.g. 0123456789" value={bankAccountNumber} onChange={(e) => setBankAccountNumber(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input placeholder="e.g. 08012345678" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
