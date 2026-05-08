"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Star, ArrowLeftRight, CheckCircle, Camera, Save, Mail, Phone, MapPin, Calendar, Edit3 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/auth-store";
import { getInitials } from "@/lib/utils";
import { toast } from "sonner";

export default function BuyerProfilePage() {
  const { user, setUser } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  if (!user) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB"); return; }
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
      toast.success("Profile photo updated");
    }
  };

  const handleSave = () => {
    setUser({ ...user, ...form });
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Manage your profile and account settings">
        <Button variant={isEditing ? "default" : "outline"} size="sm" onClick={isEditing ? handleSave : () => setIsEditing(true)} className="gap-1.5">
          {isEditing ? <><Save className="h-3.5 w-3.5" /> Save Changes</> : <><Edit3 className="h-3.5 w-3.5" /> Edit Profile</>}
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-6 text-center">
              {/* Avatar with upload */}
              <div className="relative inline-block">
                <Avatar className="h-24 w-24 mx-auto ring-4 ring-primary/10">
                  {avatarPreview && <AvatarImage src={avatarPreview} />}
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary font-bold">{getInitials(`${user.firstName} ${user.lastName}`)}</AvatarFallback>
                </Avatar>
                <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                  <Camera className="h-3.5 w-3.5" />
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </div>

              <h2 className="text-xl font-bold mt-4">{user.firstName} {user.lastName}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge variant="default" className="gap-1"><ShieldCheck className="h-3 w-3" /> Verified</Badge>
                {user.isMfaEnabled && <Badge variant="secondary" className="gap-1">🔐 2FA</Badge>}
              </div>

              {/* Trust Score */}
              <div className="mt-5 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-xs text-muted-foreground mb-1">Trust Score</p>
                <p className="text-3xl font-bold text-primary">{user.trustScore}</p>
                <Progress value={user.trustScore} className="mt-2 h-2" />
                <p className="text-[10px] text-muted-foreground mt-1">Top {100 - user.trustScore + 2}% of users</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 rounded-xl bg-accent/50">
                  <p className="text-lg font-bold">{user.totalTransactions}</p>
                  <p className="text-[10px] text-muted-foreground">Transactions</p>
                </div>
                <div className="p-3 rounded-xl bg-accent/50">
                  <p className="text-lg font-bold">{user.successRate}%</p>
                  <p className="text-[10px] text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info + Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Personal Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">First Name</Label>
                  {isEditing ? (
                    <Input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
                  ) : (
                    <p className="text-sm font-medium flex items-center gap-2"><span>{user.firstName}</span></p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Last Name</Label>
                  {isEditing ? (
                    <Input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
                  ) : (
                    <p className="text-sm font-medium">{user.lastName}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" /> Email</Label>
                  {isEditing ? (
                    <Input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" />
                  ) : (
                    <p className="text-sm font-medium">{user.email}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</Label>
                  {isEditing ? (
                    <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                  ) : (
                    <p className="text-sm font-medium">{user.phone}</p>
                  )}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> Member Since</Label>
                  <p className="text-sm font-medium">{new Date(user.createdAt).toLocaleDateString("en-NG", { month: "long", year: "numeric" })}</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> Last Login</Label>
                  <p className="text-sm font-medium">{new Date(user.lastLogin).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                </div>
              </div>

              {isEditing && (
                <div className="flex items-center gap-2 pt-2">
                  <Button onClick={handleSave} size="sm" className="gap-1"><Save className="h-3.5 w-3.5" /> Save</Button>
                  <Button variant="outline" size="sm" onClick={() => { setIsEditing(false); setForm({ firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone }); }}>Cancel</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Verification */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Verification & Security</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "Email", status: user.isEmailVerified, icon: Mail },
                  { label: "KYC", status: user.kycStatus === "approved", icon: ShieldCheck },
                  { label: "2FA", status: user.isMfaEnabled, icon: Star },
                ].map((item) => (
                  <div key={item.label} className={`flex items-center gap-3 p-3 rounded-xl border ${item.status ? "border-green-200 bg-green-50/50 dark:border-green-900/30 dark:bg-green-900/10" : "border-amber-200 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-900/10"}`}>
                    <item.icon className={`h-4 w-4 ${item.status ? "text-green-600" : "text-amber-600"}`} />
                    <div>
                      <p className="text-xs font-medium">{item.label}</p>
                      <p className={`text-[10px] ${item.status ? "text-green-600" : "text-amber-600"}`}>{item.status ? "Verified" : "Pending"}</p>
                    </div>
                    {item.status && <CheckCircle className="h-3.5 w-3.5 text-green-600 ml-auto" />}
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
