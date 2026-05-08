import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "@/types";
import { MOCK_BUYER, MOCK_SELLER, MOCK_ADMIN } from "@/constants";
import { authService } from "@/services/auth";

// Admin test password — use this to access any role dashboard before backend is ready
const ADMIN_TEST_PASSWORD = "trustpay2026";

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { username: string; email: string; password: string; phone: string; role: UserRole }) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setRole: (role: UserRole) => void;
  setLoading: (loading: boolean) => void;
  adminBypass: (role: UserRole) => void;
  googleLogin: (token: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      role: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        // Admin test bypass: password "trustpay2026" unlocks any role
        if (password === ADMIN_TEST_PASSWORD) {
          const role: UserRole = email.includes("admin") ? "admin" : email.includes("seller") ? "seller" : "buyer";
          const mockUser = role === "admin" ? MOCK_ADMIN : role === "seller" ? MOCK_SELLER : MOCK_BUYER;
          set({ user: { ...mockUser, email }, token: "admin_bypass_token", refreshToken: null, isAuthenticated: true, isLoading: false, role });
          return;
        }

        // Try real API first
        try {
          const { data } = await authService.login(email, password);
          const role: UserRole = data.user?.is_merchant ? "seller" : data.user?.is_staff ? "admin" : "buyer";
          const user: User = {
            id: data.user?.id || "",
            firstName: data.user?.first_name || data.user?.username || email.split("@")[0],
            lastName: data.user?.last_name || "",
            email: data.user?.email || email,
            phone: data.user?.phone || "",
            role,
            avatar: data.user?.avatar || "",
            trustScore: data.user?.trust_score || 85,
            verificationStatus: "verified",
            kycStatus: data.user?.kyc_status || "pending",
            isEmailVerified: data.user?.is_email_verified || false,
            isMfaEnabled: false,
            createdAt: data.user?.date_joined || new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            totalTransactions: data.user?.total_transactions || 0,
            successRate: data.user?.success_rate || 100,
          };
          set({ user, token: data.access, refreshToken: data.refresh, isAuthenticated: true, isLoading: false, role });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (data) => {
        set({ isLoading: true });
        try {
          const res = await authService.register({
            username: data.username,
            email: data.email,
            password: data.password,
            phone: data.phone,
            is_merchant: data.role === "seller",
          });
          // Auto-login after registration
          await get().login(data.username, data.password);
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      adminBypass: (role: UserRole) => {
        const mockUser = role === "admin" ? MOCK_ADMIN : role === "seller" ? MOCK_SELLER : MOCK_BUYER;
        set({ user: mockUser, token: "admin_bypass_token", refreshToken: null, isAuthenticated: true, isLoading: false, role });
      },

      googleLogin: async (googleToken: string) => {
        set({ isLoading: true });
        try {
          const { data } = await authService.googleLogin(googleToken);
          const role: UserRole = data.user?.is_merchant ? "seller" : data.user?.is_staff ? "admin" : "buyer";
          const user: User = {
            id: data.user?.id || "",
            firstName: data.user?.first_name || data.user?.username || "",
            lastName: data.user?.last_name || "",
            email: data.user?.email || "",
            phone: data.user?.phone || "",
            role,
            avatar: data.user?.avatar || "",
            trustScore: data.user?.trust_score || 85,
            verificationStatus: "verified",
            kycStatus: data.user?.kyc_status || "pending",
            isEmailVerified: true,
            isMfaEnabled: false,
            createdAt: data.user?.date_joined || new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            totalTransactions: data.user?.total_transactions || 0,
            successRate: data.user?.success_rate || 100,
          };
          set({ user, token: data.access, refreshToken: data.refresh, isAuthenticated: true, isLoading: false, role });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => set({ user: null, token: null, refreshToken: null, isAuthenticated: false, role: null }),
      setUser: (user) => set({ user }),
      setRole: (role) => set({ role }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    { name: "trustpay-auth" }
  )
);
