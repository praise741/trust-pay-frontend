"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { toast.error("Passwords don't match"); return; }
    if (password.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setDone(true);
    setIsLoading(false);
  };

  if (done) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center"><div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center"><CheckCircle className="h-8 w-8 text-success" /></div></div>
        <div><h2 className="text-2xl font-bold">Password reset!</h2><p className="text-sm text-muted-foreground mt-1">Your password has been successfully updated.</p></div>
        <Link href="/login"><Button className="w-full" size="lg">Back to Login</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center"><h2 className="text-2xl font-bold">Reset password</h2><p className="text-sm text-muted-foreground mt-1">Enter your new password below</p></div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="new-pw">New password</Label>
          <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input id="new-pw" type={showPw ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} /><button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-pw">Confirm password</Label>
          <Input id="confirm-pw" type="password" placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </div>
        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>Reset Password</Button>
      </form>
    </div>
  );
}
