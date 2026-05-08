import axios from "axios";
import { useAuthStore } from "@/store/auth-store";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "https://trust-pay-backend-v78l.onrender.com/").replace(/\/+$/, "");

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - attach JWT access token
api.interceptors.request.use(
  (config) => {
    // Skip adding token for auth endpoints (login, register, google)
    const isAuthEndpoint = config.url?.includes("/api/auth/login") || 
                          config.url?.includes("/api/auth/register") || 
                          config.url?.includes("/api/auth/google");
    
    if (!isAuthEndpoint && typeof window !== "undefined") {
      // Read token from zustand persisted store
      try {
        const stored = localStorage.getItem("trustpay-auth");
        if (stored) {
          const { state } = JSON.parse(stored);
          if (state?.token) {
            config.headers.Authorization = `Bearer ${state.token}`;
          }
        }
      } catch {
        // ignore parse errors
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401 and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip retry for auth endpoints (no point refreshing a failed login)
    const isAuthRequest = originalRequest.url?.includes("/api/auth/");

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
      originalRequest._retry = true;

      try {
        const stored = localStorage.getItem("trustpay-auth");
        if (stored) {
          const { state } = JSON.parse(stored);
          if (state?.refreshToken) {
            const refreshClient = axios.create({
              baseURL: API_BASE_URL,
              timeout: 10000,
              headers: { "Content-Type": "application/json" },
            });
            const { data } = await refreshClient.post("/api/auth/refresh/", { refresh: state.refreshToken });
            const newState = { ...state, token: data.access };
            localStorage.setItem("trustpay-auth", JSON.stringify({ state: newState }));
            originalRequest.headers.Authorization = `Bearer ${data.access}`;
            return api(originalRequest);
          }
        }
      } catch {
        // Refresh failed — clear auth state
        try {
          useAuthStore.getState().logout();
        } catch {
          localStorage.removeItem("trustpay-auth");
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
