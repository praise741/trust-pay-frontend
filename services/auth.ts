import api from "@/lib/api";
import { API_ENDPOINTS } from "@/constants";

export const authService = {
  login: (email: string, password: string) =>
    api.post(API_ENDPOINTS.auth.login, { email, password }),

  register: (data: { firstName: string; lastName: string; email: string; password: string; role: string }) =>
    api.post(API_ENDPOINTS.auth.register, data),

  verifyEmail: (token: string) =>
    api.post(API_ENDPOINTS.auth.verifyEmail, { token }),

  sendOtp: (email: string) =>
    api.post(API_ENDPOINTS.auth.sendOtp, { email }),

  verifyOtp: (email: string, otp: string) =>
    api.post(API_ENDPOINTS.auth.verifyOtp, { email, otp }),

  resetPassword: (token: string, password: string) =>
    api.post(API_ENDPOINTS.auth.resetPassword, { token, password }),
};
