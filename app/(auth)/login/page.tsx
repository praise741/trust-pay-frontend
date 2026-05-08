"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, googleLogin } = useAuthStore();
  const router = useRouter();

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        await googleLogin(tokenResponse.access_token);
        toast.success("Welcome back!");
        const state = useAuthStore.getState();
        router.push(`/${state.role}/dashboard`);
      } catch {
        toast.error("Google login failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => toast.error("Google login cancelled or failed."),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill in all fields"); return; }
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      const state = useAuthStore.getState();
      router.push(`/${state.role}/dashboard`);
    } catch { toast.error("Invalid credentials"); } finally { setIsLoading(false); }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-sm text-muted-foreground mt-1">Sign in to your TrustPay account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="email" type="email" placeholder="name@example.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="remember" checked={rememberMe} onCheckedChange={(v) => setRememberMe(v as boolean)} />
          <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">Remember me</Label>
        </div>

        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">or continue with</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline" className="h-11" onClick={() => handleGoogleAuth()}>
          <span className="text-base font-bold">G</span>
        </Button>
        <Button variant="outline" className="h-11" onClick={() => toast.info(`Apple login coming soon`)}>
          <span className="text-base font-bold"></span>
        </Button>
        <Button variant="outline" className="h-11" onClick={() => toast.info(`X login coming soon`)}>
          <span className="text-base font-bold">𝕏</span>
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
      </p>

      {/* Admin test bypass */}
      <div className="mt-2 p-3 rounded-xl bg-accent/50 border border-dashed border-border">
        <p className="text-[10px] text-muted-foreground text-center mb-2">🔧 Quick Test Access</p>
        <div className="grid grid-cols-3 gap-2">
          {(["buyer", "seller", "admin"] as const).map((r) => (
            <Button key={r} variant="outline" size="sm" className="text-xs capitalize" onClick={() => {
              const { adminBypass } = useAuthStore.getState();
              adminBypass(r);
              toast.success(`Logged in as ${r}`);
              router.push(`/${r}/dashboard`);
            }}>{r === "buyer" ? "🛒" : r === "seller" ? "🏪" : "⚙️"} {r}</Button>
          ))}
        </div>
        <p className="text-[9px] text-muted-foreground text-center mt-1.5">Or use password: <code className="bg-muted px-1 rounded">trustpay2026</code></p>
      </div>
    </div>
  );
}
