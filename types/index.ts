// ============================================
// TrustPay Type Definitions
// ============================================

export type UserRole = "buyer" | "seller" | "admin";

export type VerificationStatus = "unverified" | "pending" | "verified" | "rejected";

export type TransactionStatus =
  | "created"
  | "payment_secured"
  | "seller_notified"
  | "shipped"
  | "in_transit"
  | "arrived"
  | "buyer_confirmed"
  | "funds_released"
  | "disputed"
  | "refunded"
  | "cancelled";

export type DisputeStatus = "open" | "under_review" | "resolved" | "escalated" | "closed";

export type KYCStatus = "not_submitted" | "pending" | "approved" | "rejected";

export type PaymentMethod = "bank_transfer" | "card" | "ussd" | "wallet";

export type NotificationType =
  | "payment"
  | "shipment"
  | "dispute"
  | "payout"
  | "verification"
  | "fraud"
  | "system";

// ============================================
// User
// ============================================
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  trustScore: number;
  verificationStatus: VerificationStatus;
  kycStatus: KYCStatus;
  isEmailVerified: boolean;
  isMfaEnabled: boolean;
  createdAt: string;
  lastLogin: string;
  totalTransactions: number;
  successRate: number;
}

// ============================================
// Transaction / Escrow
// ============================================
export interface Transaction {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  createdAt: string;
  updatedAt: string;
  deliveryDeadline: string;
  deliveryAddress: string;
  originCity: string;
  destinationCity: string;
  platform: "instagram" | "whatsapp" | "tiktok" | "x" | "direct";
  timeline: TimelineEvent[];
  escrowVault: EscrowVault;
}

export interface TimelineEvent {
  id: string;
  status: TransactionStatus;
  title: string;
  description: string;
  timestamp: string;
  isCompleted: boolean;
}

export interface EscrowVault {
  id: string;
  amount: number;
  isLocked: boolean;
  lockedAt: string;
  releaseDate: string;
  autoReleaseDate: string;
}

// ============================================
// Shipment / Delivery
// ============================================
export interface Shipment {
  id: string;
  transactionId: string;
  trackingNumber: string;
  carrier: string;
  status: "pending" | "picked_up" | "in_transit" | "arrived" | "delivered";
  originCity: string;
  destinationCity: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  checkpoints: ShipmentCheckpoint[];
}

export interface ShipmentCheckpoint {
  id: string;
  location: string;
  status: string;
  timestamp: string;
  description: string;
  coordinates?: { lat: number; lng: number };
}

// ============================================
// Dispute
// ============================================
export interface Dispute {
  id: string;
  transactionId: string;
  transactionTitle: string;
  raisedBy: string;
  raisedByName: string;
  respondent: string;
  respondentName: string;
  reason: string;
  description: string;
  status: DisputeStatus;
  evidence: Evidence[];
  timeline: DisputeTimelineEvent[];
  amount: number;
  createdAt: string;
  updatedAt: string;
  resolution?: string;
}

export interface Evidence {
  id: string;
  type: "image" | "document" | "video";
  url: string;
  name: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface DisputeTimelineEvent {
  id: string;
  action: string;
  description: string;
  actor: string;
  timestamp: string;
}

// ============================================
// Wallet
// ============================================
export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  virtualAccount: VirtualAccount;
  transactions: WalletTransaction[];
}

export interface VirtualAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface WalletTransaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  reference: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

// ============================================
// Notification
// ============================================
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

// ============================================
// KYC
// ============================================
export interface KYCApplication {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  idType: "national_id" | "drivers_license" | "passport" | "voters_card";
  idNumber: string;
  idDocumentUrl: string;
  selfieUrl: string;
  ninNumber?: string;
  bvnNumber?: string;
  status: KYCStatus;
  submittedAt: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

// ============================================
// Analytics
// ============================================
export interface AnalyticsData {
  label: string;
  value: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
}

// ============================================
// Navigation
// ============================================
export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: number;
}

// ============================================
// API Response
// ============================================
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
