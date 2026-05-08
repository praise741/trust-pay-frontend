import api from "@/lib/api";
import { API_ENDPOINTS } from "@/constants";

export const authService = {
  login: (username: string, password: string) =>
    api.post(API_ENDPOINTS.auth.login, { username, password }),

  register: (data: { username: string; email?: string; password: string; phone?: string; bank_name?: string; bank_account_number?: string; bank_code?: string; is_merchant?: boolean }) =>
    api.post(API_ENDPOINTS.auth.register, data),

  refresh: (refreshToken: string) =>
    api.post(API_ENDPOINTS.auth.refresh, { refresh: refreshToken }),

  googleLogin: (token: string, userType?: string) =>
    api.post(API_ENDPOINTS.auth.google, { token, user_type: userType }),

  logout: () =>
    api.post(API_ENDPOINTS.auth.logout),

  verifyEmail: () =>
    api.get(API_ENDPOINTS.auth.verifyEmail),
};
