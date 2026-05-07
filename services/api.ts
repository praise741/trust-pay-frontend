import api from "@/lib/api";
import { API_ENDPOINTS } from "@/constants";

export const transactionService = {
  list: (params?: { page?: number; limit?: number; status?: string }) =>
    api.get(API_ENDPOINTS.transactions.list, { params }),

  get: (id: string) =>
    api.get(API_ENDPOINTS.transactions.get(id)),

  create: (data: { title: string; description: string; amount: number; buyerEmail: string; deliveryDays: number }) =>
    api.post(API_ENDPOINTS.transactions.create, data),

  releaseFunds: (id: string) =>
    api.post(API_ENDPOINTS.transactions.release(id)),
};

export const paymentService = {
  createVirtualAccount: () =>
    api.post(API_ENDPOINTS.payments.createVirtualAccount),

  verify: (reference: string) =>
    api.post(API_ENDPOINTS.payments.verify, { reference }),

  payout: (amount: number, bankCode: string, accountNumber: string) =>
    api.post(API_ENDPOINTS.payments.payout, { amount, bankCode, accountNumber }),

  refund: (transactionId: string) =>
    api.post(API_ENDPOINTS.payments.refund, { transactionId }),
};

export const disputeService = {
  list: () => api.get(API_ENDPOINTS.disputes.list),
  get: (id: string) => api.get(API_ENDPOINTS.disputes.get(id)),
  create: (data: { transactionId: string; reason: string; description: string }) =>
    api.post(API_ENDPOINTS.disputes.create, data),
};

export const kycService = {
  uploadId: (file: File) => {
    const formData = new FormData();
    formData.append("document", file);
    return api.post(API_ENDPOINTS.kyc.uploadId, formData, { headers: { "Content-Type": "multipart/form-data" } });
  },
  uploadSelfie: (file: File) => {
    const formData = new FormData();
    formData.append("selfie", file);
    return api.post(API_ENDPOINTS.kyc.uploadSelfie, formData, { headers: { "Content-Type": "multipart/form-data" } });
  },
  verify: (data: { ninNumber?: string; bvnNumber?: string }) =>
    api.post(API_ENDPOINTS.kyc.verify, data),
};
