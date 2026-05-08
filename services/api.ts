import api from "@/lib/api";
import { API_ENDPOINTS } from "@/constants";

// === Deal / Transaction Services ===
export const dealService = {
  list: (params?: { status?: string }) =>
    api.get(API_ENDPOINTS.deals.list, { params }),

  get: (slug: string) =>
    api.get(API_ENDPOINTS.deals.detail(slug)),

  create: (data: { item_description: string; amount: string; delivery_days?: number; buyer_email?: string; buyer_phone?: string }) =>
    api.post(API_ENDPOINTS.deals.create, data),

  pay: (slug: string) =>
    api.post(API_ENDPOINTS.deals.pay(slug)),

  ship: (slug: string) =>
    api.post(API_ENDPOINTS.deals.ship(slug)),

  confirm: (slug: string) =>
    api.post(API_ENDPOINTS.deals.confirm(slug)),

  dispute: (slug: string, reason: string) =>
    api.post(API_ENDPOINTS.deals.dispute(slug), { reason }),

  uploadImages: (slug: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    return api.post(API_ENDPOINTS.deals.uploadImages(slug), formData, { headers: { "Content-Type": "multipart/form-data" } });
  },
};

// === Merchant Services ===
export const merchantService = {
  dashboard: () =>
    api.get(API_ENDPOINTS.merchant.dashboard),

  deals: (params?: { status?: string }) =>
    api.get(API_ENDPOINTS.merchant.deals, { params }),

  dealDetail: (slug: string) =>
    api.get(API_ENDPOINTS.merchant.dealDetail(slug)),

  transactions: () =>
    api.get(API_ENDPOINTS.merchant.transactions),

  links: () =>
    api.get(API_ENDPOINTS.merchant.links),

  createLink: (data: { item_description: string; amount: string; delivery_days?: number; buyer_email?: string; buyer_phone?: string }) =>
    api.post(API_ENDPOINTS.merchant.links, data),

  getProfile: () =>
    api.get(API_ENDPOINTS.merchant.profile),

  updateProfile: (data: { bank_name?: string; bank_account_number?: string; bank_code?: string; phone?: string }) =>
    api.put(API_ENDPOINTS.merchant.profile, data),
};

// === Buyer Services ===
export const buyerService = {
  deals: () =>
    api.get(API_ENDPOINTS.buyer.deals),

  dealDetail: (slug: string) =>
    api.get(API_ENDPOINTS.buyer.dealDetail(slug)),
};

// === Seller Public Profile ===
export const sellerService = {
  publicProfile: (username: string) =>
    api.get(API_ENDPOINTS.sellers.publicProfile(username)),
};

// === Admin Services ===
export const adminService = {
  disputes: () =>
    api.get(API_ENDPOINTS.admin.disputes),

  resolveDispute: (id: string, action: "refund" | "release") =>
    api.post(API_ENDPOINTS.admin.resolveDispute(id), { action }),
};
