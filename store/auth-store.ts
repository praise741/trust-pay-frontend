import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "@/types";
import { MOCK_BUYER, MOCK_SELLER, MOCK_ADMIN } from "@/constants";

// Admin test password — use this to access any role dashboard before backend is ready
const ADMIN_TEST_PASSWORD = "trustpay2026";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { firstName: string; lastName: string; email: string; password: string; role: UserRole }) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setRole: (role: UserRole) => void;
  setLoading: (loading: boolean) => void;
  adminBypass: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: MOCK_BUYER,
      token: "mock_token_xyz",
      isAuthenticated: true,
      isLoading: false,
      role: "buyer",

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Admin test bypass: password "trustpay2026" unlocks any role based on email
        if (password === ADMIN_TEST_PASSWORD) {
          const role: UserRole = email.includes("admin") ? "admin" : email.includes("seller") ? "seller" : "buyer";
          const mockUser = role === "admin" ? MOCK_ADMIN : role === "seller" ? MOCK_SELLER : MOCK_BUYER;
          set({ user: { ...mockUser, email }, token: "admin_bypass_token", isAuthenticated: true, isLoading: false, role });
          return;
        }

        const role: UserRole = email.includes("admin") ? "admin" : email.includes("seller") ? "seller" : "buyer";
        set({ user: { ...MOCK_BUYER, email, role }, token: "mock_token_xyz", isAuthenticated: true, isLoading: false, role });
      },

      register: async (data) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const mockUser = data.role === "seller" ? MOCK_SELLER : MOCK_BUYER;
        set({ user: { ...mockUser, ...data }, token: "mock_token_xyz", isAuthenticated: true, isLoading: false, role: data.role });
      },

      // Quick role switch for testing — no login required
      adminBypass: (role: UserRole) => {
        const mockUser = role === "admin" ? MOCK_ADMIN : role === "seller" ? MOCK_SELLER : MOCK_BUYER;
        set({ user: mockUser, token: "admin_bypass_token", isAuthenticated: true, isLoading: false, role });
      },

      logout: () => set({ user: null, token: null, isAuthenticated: false, role: null }),
      setUser: (user) => set({ user }),
      setRole: (role) => set({ role }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    { name: "trustpay-auth" }
  )
);
