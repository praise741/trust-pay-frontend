"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/auth-store";
import { getErrorMessage } from "@/lib/error-handler";
import { toast } from "sonner";
import type { UserRole } from "@/types";

// Declare google global type
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: {
              theme?: string;
              size?: string;
              width?: number;
            }
          ) => void;
        };
      };
    };
  }
}

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [role, setRole] = useState<UserRole>("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  
  // Use a ref to avoid stale closure in the Google callback
  const currentRoleRef = useRef<UserRole>("buyer");
  useEffect(() => {
    currentRoleRef.current = role;
  }, [role]);

  const { register, googleLogin } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Load Google Sign-In script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
          callback: handleGoogleCallback,
        });

        const buttonDiv = document.getElementById("googleSignUpButton");
        if (buttonDiv) {
          window.google.accounts.id.renderButton(buttonDiv, {
            theme: "outline",
            size: "large",
            width: buttonDiv.offsetWidth,
          });
        }
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleCallback = async (response: { credential: string }) => {
    setIsLoading(true);
    try {
      // Use the current value from ref instead of the stale closure variable
      await googleLogin(response.credential, currentRoleRef.current);
      toast.success("Account created via Google!");
      const state = useAuthStore.getState();
      router.push(`/${state.role}/dashboard`);
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error("Google sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) { toast.error("Please fill required fields"); return; }
    if (form.password !== form.confirmPassword) { toast.error("Passwords don't match"); return; }
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    if (!agreed) { toast.error("Please accept terms"); return; }
    setIsLoading(true);
    try {
      await register({ ...form, role });
      toast.success("Account created successfully!");
      // Get the actual role from auth store after login completes
      const state = useAuthStore.getState();
      router.push(`/${state.role}/dashboard`);
    } catch (error) { toast.error(getErrorMessage(error, "Registration failed")); } finally { setIsLoading(false); }
  };

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">Create account</h2>
        <p className="text-sm text-muted-foreground mt-1">Start securing your transactions</p>
      </div>

      <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl">
        {(["buyer", "seller"] as UserRole[]).map((r) => (
          <button key={r} onClick={() => setRole(r)} type="button" className={`py-2.5 text-sm font-medium rounded-lg transition-all ${role === r ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {r === "buyer" ? "Buyer" : "Seller"}
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
            <Input id="s-password" type={showPassword ? "text" : "password"} placeholder="Min 6 characters" className="pl-10 pr-10" value={form.password} onChange={(e) => update("password", e.target.value)} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input id="confirmPassword" type="password" placeholder="Re-enter password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} />
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

      <div id="googleSignUpButton" className="w-full flex justify-center"></div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account? <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
