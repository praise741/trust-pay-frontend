import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://trust-pay-backend-v78l.onrender.com/";

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
    if (typeof window !== "undefined") {
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

    // If 401 and we haven't retried yet, try refreshing
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const stored = localStorage.getItem("trustpay-auth");
        if (stored) {
          const { state } = JSON.parse(stored);
          if (state?.refreshToken) {
            const { data } = await axios.post(`${API_BASE_URL}/api/auth/refresh/`, { refresh: state.refreshToken });
            // Update stored token
            const newState = { ...state, token: data.access };
            localStorage.setItem("trustpay-auth", JSON.stringify({ state: newState }));
            originalRequest.headers.Authorization = `Bearer ${data.access}`;
            return api(originalRequest);
          }
        }
      } catch {
        // Refresh failed — clear auth and redirect to login
        localStorage.removeItem("trustpay-auth");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
