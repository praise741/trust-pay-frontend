import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "@/types";
import { MOCK_BUYER } from "@/constants";

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
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: MOCK_BUYER,
      token: "mock_token_xyz",
      isAuthenticated: true,
      isLoading: false,
      role: "buyer",
      login: async (email: string, _password: string) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const role: UserRole = email.includes("admin") ? "admin" : email.includes("seller") ? "seller" : "buyer";
        set({ user: { ...MOCK_BUYER, email, role }, token: "mock_token_xyz", isAuthenticated: true, isLoading: false, role });
      },
      register: async (data) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1500));
        set({ user: { ...MOCK_BUYER, ...data }, token: "mock_token_xyz", isAuthenticated: true, isLoading: false, role: data.role });
      },
      logout: () => set({ user: null, token: null, isAuthenticated: false, role: null }),
      setUser: (user) => set({ user }),
      setRole: (role) => set({ role }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    { name: "trustpay-auth" }
  )
);
