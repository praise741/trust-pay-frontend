import type { Transaction, User, Dispute, Notification, Shipment, Wallet, KYCApplication, ChartDataPoint, NavItem } from "@/types";

// ============================================
// API Endpoints
// ============================================
export const API_ENDPOINTS = {
  auth: {
    login: "/api/auth/login/",
    register: "/api/auth/register/",
    refresh: "/api/auth/refresh/",
    google: "/api/auth/google/",
    verifyEmail: "/api/auth/verify-email/",
  },
  merchant: {
    dashboard: "/api/merchant/dashboard/",
    deals: "/api/merchant/deals/",
    dealDetail: (slug: string) => `/api/merchant/deals/${slug}/`,
    transactions: "/api/merchant/transactions/",
    links: "/api/merchant/links/",
    profile: "/api/merchant/profile/",
  },
  buyer: {
    deals: "/api/deals/",
    dealDetail: (slug: string) => `/api/deals/${slug}/`,
  },
  deals: {
    list: "/api/deals/",
    create: "/api/deals/",
    detail: (slug: string) => `/api/deals/${slug}/`,
    pay: (slug: string) => `/api/deals/${slug}/pay/`,
    mockPay: (slug: string) => `/api/deals/${slug}/mock-pay/`,
    ship: (slug: string) => `/api/deals/${slug}/ship/`,
    confirm: (slug: string) => `/api/deals/${slug}/confirm/`,
    dispute: (slug: string) => `/api/deals/${slug}/dispute/`,
    uploadImages: (slug: string) => `/api/deals/${slug}/images/`,
  },
  sellers: {
    publicProfile: (username: string) => `/api/sellers/${username}/`,
  },
  admin: {
    disputes: "/api/admin/disputes/",
    resolveDispute: (id: string) => `/api/admin/disputes/${id}/resolve/`,
  },
} as const;

// ============================================
// Navigation Items
// ============================================
export const BUYER_NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", href: "/buyer/dashboard", icon: "LayoutDashboard" },
  { title: "Transactions", href: "/buyer/transactions", icon: "ArrowLeftRight" },
  { title: "Payments", href: "/buyer/payments", icon: "CreditCard" },
  { title: "Messages", href: "/buyer/messages", icon: "MessageCircle", badge: 3 },
  { title: "Delivery", href: "/buyer/delivery", icon: "Truck" },
  { title: "Disputes", href: "/buyer/disputes", icon: "ShieldAlert" },
  { title: "Wallet", href: "/buyer/wallet", icon: "Wallet" },
  { title: "Notifications", href: "/buyer/notifications", icon: "Bell" },
  { title: "Profile", href: "/buyer/profile", icon: "User" },
  { title: "Settings", href: "/buyer/settings", icon: "Settings" },
];

export const SELLER_NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", href: "/seller/dashboard", icon: "LayoutDashboard" },
  { title: "Create Deal", href: "/seller/create-deal", icon: "PlusCircle" },
  { title: "Transactions", href: "/seller/transactions", icon: "ArrowLeftRight" },
  { title: "Messages", href: "/seller/messages", icon: "MessageCircle", badge: 4 },
  { title: "Shipments", href: "/seller/shipments", icon: "Package" },
  { title: "Customers", href: "/seller/customers", icon: "Users" },
  { title: "Analytics", href: "/seller/analytics", icon: "BarChart3" },
  { title: "Wallet", href: "/seller/wallet", icon: "Wallet" },
  { title: "Notifications", href: "/seller/notifications", icon: "Bell" },
  { title: "Profile", href: "/seller/profile", icon: "User" },
  { title: "Settings", href: "/seller/settings", icon: "Settings" },
];

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
  { title: "Users", href: "/admin/users", icon: "Users" },
  { title: "Transactions", href: "/admin/transactions", icon: "ArrowLeftRight" },
  { title: "Disputes", href: "/admin/disputes", icon: "ShieldAlert" },
  { title: "Fraud Detection", href: "/admin/fraud", icon: "AlertTriangle" },
  { title: "Reports", href: "/admin/reports", icon: "FileText" },
  { title: "Analytics", href: "/admin/analytics", icon: "BarChart3" },
  { title: "KYC Verification", href: "/admin/kyc", icon: "BadgeCheck" },
  { title: "Settings", href: "/admin/settings", icon: "Settings" },
];

// ============================================
// Mock Users
// ============================================
export const MOCK_BUYER: User = {
  id: "usr_buyer_001",
  firstName: "Adaeze",
  lastName: "Okonkwo",
  email: "adaeze@example.com",
  phone: "+2348012345678",
  role: "buyer",
  avatar: "",
  trustScore: 92,
  verificationStatus: "verified",
  kycStatus: "approved",
  isEmailVerified: true,
  isMfaEnabled: true,
  createdAt: "2025-01-15T10:00:00Z",
  lastLogin: "2026-05-07T08:30:00Z",
  totalTransactions: 47,
  successRate: 98.5,
};

export const MOCK_SELLER: User = {
  id: "usr_seller_001",
  firstName: "Chukwuma",
  lastName: "Eze",
  email: "chukwuma@example.com",
  phone: "+2348098765432",
  role: "seller",
  avatar: "",
  trustScore: 96,
  verificationStatus: "verified",
  kycStatus: "approved",
  isEmailVerified: true,
  isMfaEnabled: true,
  createdAt: "2024-08-20T10:00:00Z",
  lastLogin: "2026-05-07T09:00:00Z",
  totalTransactions: 234,
  successRate: 99.1,
};

export const MOCK_ADMIN: User = {
  id: "usr_admin_001",
  firstName: "Ngozi",
  lastName: "Adeyemi",
  email: "ngozi@trustpay.ng",
  phone: "+2348055555555",
  role: "admin",
  avatar: "",
  trustScore: 100,
  verificationStatus: "verified",
  kycStatus: "approved",
  isEmailVerified: true,
  isMfaEnabled: true,
  createdAt: "2024-01-01T00:00:00Z",
  lastLogin: "2026-05-07T10:00:00Z",
  totalTransactions: 0,
  successRate: 100,
};

// ============================================
// Mock Transactions
// ============================================
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "txn_001",
    title: "Architecture Book Collection",
    description: "Set of 3 architecture design books",
    amount: 5000,
    currency: "NGN",
    status: "in_transit",
    buyerId: "usr_buyer_001",
    buyerName: "Adaeze Okonkwo",
    sellerId: "usr_seller_001",
    sellerName: "Chukwuma Eze",
    createdAt: "2026-05-04T10:00:00Z",
    updatedAt: "2026-05-06T14:00:00Z",
    deliveryDeadline: "2026-05-09T10:00:00Z",
    deliveryAddress: "15 Admiralty Way, Lekki, Lagos",
    originCity: "Abuja",
    destinationCity: "Lagos",
    platform: "instagram",
    timeline: [
      { id: "tl_1", status: "created", title: "Deal Created", description: "Escrow transaction initiated", timestamp: "2026-05-04T10:00:00Z", isCompleted: true },
      { id: "tl_2", status: "payment_secured", title: "Payment Secured", description: "₦5,000 locked in escrow vault", timestamp: "2026-05-04T10:05:00Z", isCompleted: true },
      { id: "tl_3", status: "seller_notified", title: "Seller Notified", description: "Seller confirmed and preparing order", timestamp: "2026-05-04T10:10:00Z", isCompleted: true },
      { id: "tl_4", status: "shipped", title: "Shipment Picked Up", description: "Package picked up in Abuja", timestamp: "2026-05-05T09:00:00Z", isCompleted: true },
      { id: "tl_5", status: "in_transit", title: "In Transit", description: "Package en route to Lagos", timestamp: "2026-05-06T14:00:00Z", isCompleted: true },
      { id: "tl_6", status: "arrived", title: "Arrived in Lagos", description: "Awaiting delivery", timestamp: "", isCompleted: false },
      { id: "tl_7", status: "buyer_confirmed", title: "Buyer Confirmation", description: "Buyer confirms receipt", timestamp: "", isCompleted: false },
      { id: "tl_8", status: "funds_released", title: "Funds Released", description: "Payment released to seller", timestamp: "", isCompleted: false },
    ],
    escrowVault: { id: "ev_001", amount: 5000, isLocked: true, lockedAt: "2026-05-04T10:05:00Z", releaseDate: "", autoReleaseDate: "2026-05-09T10:00:00Z" },
  },
  {
    id: "txn_002",
    title: "Handmade Leather Bag",
    description: "Custom-made leather messenger bag",
    amount: 35000,
    currency: "NGN",
    status: "funds_released",
    buyerId: "usr_buyer_001",
    buyerName: "Adaeze Okonkwo",
    sellerId: "usr_seller_002",
    sellerName: "Folake Adeyemi",
    createdAt: "2026-04-28T08:00:00Z",
    updatedAt: "2026-05-02T16:00:00Z",
    deliveryDeadline: "2026-05-03T08:00:00Z",
    deliveryAddress: "15 Admiralty Way, Lekki, Lagos",
    originCity: "Ibadan",
    destinationCity: "Lagos",
    platform: "whatsapp",
    timeline: [
      { id: "tl_9", status: "created", title: "Deal Created", description: "Escrow transaction initiated", timestamp: "2026-04-28T08:00:00Z", isCompleted: true },
      { id: "tl_10", status: "payment_secured", title: "Payment Secured", description: "₦35,000 locked in escrow", timestamp: "2026-04-28T08:10:00Z", isCompleted: true },
      { id: "tl_11", status: "seller_notified", title: "Seller Notified", description: "Seller confirmed", timestamp: "2026-04-28T08:15:00Z", isCompleted: true },
      { id: "tl_12", status: "shipped", title: "Shipped", description: "Shipped from Ibadan", timestamp: "2026-04-29T10:00:00Z", isCompleted: true },
      { id: "tl_13", status: "in_transit", title: "In Transit", description: "En route", timestamp: "2026-04-30T12:00:00Z", isCompleted: true },
      { id: "tl_14", status: "arrived", title: "Arrived", description: "Delivered", timestamp: "2026-05-01T14:00:00Z", isCompleted: true },
      { id: "tl_15", status: "buyer_confirmed", title: "Confirmed", description: "Buyer confirmed", timestamp: "2026-05-01T16:00:00Z", isCompleted: true },
      { id: "tl_16", status: "funds_released", title: "Released", description: "Funds sent to seller", timestamp: "2026-05-02T16:00:00Z", isCompleted: true },
    ],
    escrowVault: { id: "ev_002", amount: 35000, isLocked: false, lockedAt: "2026-04-28T08:10:00Z", releaseDate: "2026-05-02T16:00:00Z", autoReleaseDate: "2026-05-03T08:00:00Z" },
  },
  {
    id: "txn_003",
    title: "Ankara Fabric Bundle",
    description: "6 yards premium Ankara fabric",
    amount: 12000,
    currency: "NGN",
    status: "disputed",
    buyerId: "usr_buyer_001",
    buyerName: "Adaeze Okonkwo",
    sellerId: "usr_seller_003",
    sellerName: "Bayo Fashions",
    createdAt: "2026-05-01T09:00:00Z",
    updatedAt: "2026-05-05T11:00:00Z",
    deliveryDeadline: "2026-05-05T09:00:00Z",
    deliveryAddress: "15 Admiralty Way, Lekki, Lagos",
    originCity: "Kano",
    destinationCity: "Lagos",
    platform: "tiktok",
    timeline: [
      { id: "tl_17", status: "created", title: "Deal Created", description: "Transaction started", timestamp: "2026-05-01T09:00:00Z", isCompleted: true },
      { id: "tl_18", status: "payment_secured", title: "Payment Secured", description: "₦12,000 locked", timestamp: "2026-05-01T09:05:00Z", isCompleted: true },
      { id: "tl_19", status: "shipped", title: "Shipped", description: "Shipped from Kano", timestamp: "2026-05-02T08:00:00Z", isCompleted: true },
      { id: "tl_20", status: "disputed", title: "Disputed", description: "Buyer raised dispute - wrong item", timestamp: "2026-05-05T11:00:00Z", isCompleted: true },
    ],
    escrowVault: { id: "ev_003", amount: 12000, isLocked: true, lockedAt: "2026-05-01T09:05:00Z", releaseDate: "", autoReleaseDate: "2026-05-05T09:00:00Z" },
  },
];

// ============================================
// Mock Wallet
// ============================================
export const MOCK_WALLET: Wallet = {
  id: "wal_001",
  userId: "usr_buyer_001",
  balance: 125750,
  currency: "NGN",
  virtualAccount: { bankName: "Wema Bank", accountNumber: "7821034567", accountName: "TRUSTPAY/ADAEZE OKONKWO" },
  transactions: [
    { id: "wt_1", type: "credit", amount: 50000, description: "Wallet top-up", reference: "REF-001", status: "completed", createdAt: "2026-05-06T10:00:00Z" },
    { id: "wt_2", type: "debit", amount: 5000, description: "Escrow: Architecture Book", reference: "TXN-001", status: "completed", createdAt: "2026-05-04T10:05:00Z" },
    { id: "wt_3", type: "credit", amount: 35000, description: "Refund: Leather Bag", reference: "REF-002", status: "completed", createdAt: "2026-05-02T16:00:00Z" },
    { id: "wt_4", type: "debit", amount: 12000, description: "Escrow: Ankara Fabric", reference: "TXN-003", status: "completed", createdAt: "2026-05-01T09:05:00Z" },
    { id: "wt_5", type: "credit", amount: 100000, description: "Bank Transfer", reference: "REF-003", status: "completed", createdAt: "2026-04-28T08:00:00Z" },
  ],
};

// ============================================
// Mock Disputes
// ============================================
export const MOCK_DISPUTES: Dispute[] = [
  {
    id: "dsp_001",
    transactionId: "txn_003",
    transactionTitle: "Ankara Fabric Bundle",
    raisedBy: "usr_buyer_001",
    raisedByName: "Adaeze Okonkwo",
    respondent: "usr_seller_003",
    respondentName: "Bayo Fashions",
    reason: "Wrong item received",
    description: "I ordered premium Ankara fabric but received a different pattern and lower quality material than what was advertised on TikTok.",
    status: "under_review",
    evidence: [
      { id: "ev_1", type: "image", url: "/evidence/wrong-item.jpg", name: "wrong-item.jpg", uploadedAt: "2026-05-05T11:05:00Z", uploadedBy: "usr_buyer_001" },
    ],
    timeline: [
      { id: "dt_1", action: "Dispute Opened", description: "Buyer raised dispute for wrong item", actor: "Adaeze Okonkwo", timestamp: "2026-05-05T11:00:00Z" },
      { id: "dt_2", action: "Evidence Submitted", description: "Photos of received item uploaded", actor: "Adaeze Okonkwo", timestamp: "2026-05-05T11:05:00Z" },
      { id: "dt_3", action: "Under Review", description: "TrustPay team reviewing evidence", actor: "System", timestamp: "2026-05-05T12:00:00Z" },
    ],
    amount: 12000,
    createdAt: "2026-05-05T11:00:00Z",
    updatedAt: "2026-05-05T12:00:00Z",
  },
];

// ============================================
// Mock Notifications
// ============================================
export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n_1", type: "payment", title: "Payment Secured", message: "₦5,000 has been locked in escrow for Architecture Book Collection", isRead: false, createdAt: "2026-05-04T10:05:00Z", actionUrl: "/buyer/transactions/txn_001" },
  { id: "n_2", type: "shipment", title: "Package In Transit", message: "Your Architecture Book is now in transit from Abuja to Lagos", isRead: false, createdAt: "2026-05-06T14:00:00Z", actionUrl: "/buyer/delivery" },
  { id: "n_3", type: "dispute", title: "Dispute Update", message: "Your dispute for Ankara Fabric Bundle is under review", isRead: true, createdAt: "2026-05-05T12:00:00Z", actionUrl: "/buyer/disputes" },
  { id: "n_4", type: "payout", title: "Funds Released", message: "₦35,000 has been released for Handmade Leather Bag", isRead: true, createdAt: "2026-05-02T16:00:00Z" },
  { id: "n_5", type: "verification", title: "KYC Approved", message: "Your identity verification has been approved", isRead: true, createdAt: "2026-04-20T10:00:00Z" },
  { id: "n_6", type: "system", title: "Security Alert", message: "New login detected from Lagos, Nigeria", isRead: true, createdAt: "2026-05-07T08:30:00Z" },
];

// ============================================
// Mock Shipments
// ============================================
export const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: "shp_001",
    transactionId: "txn_001",
    trackingNumber: "TP-2026-ABJ-LAG-001",
    carrier: "GIG Logistics",
    status: "in_transit",
    originCity: "Abuja",
    destinationCity: "Lagos",
    estimatedDelivery: "2026-05-08T18:00:00Z",
    checkpoints: [
      { id: "cp_1", location: "Abuja", status: "Picked Up", timestamp: "2026-05-05T09:00:00Z", description: "Package collected from seller", coordinates: { lat: 9.0579, lng: 7.4951 } },
      { id: "cp_2", location: "Lokoja", status: "In Transit", timestamp: "2026-05-05T16:00:00Z", description: "Package at Lokoja hub", coordinates: { lat: 7.8023, lng: 6.7333 } },
      { id: "cp_3", location: "Ore", status: "In Transit", timestamp: "2026-05-06T08:00:00Z", description: "Package at Ore checkpoint", coordinates: { lat: 7.1, lng: 4.85 } },
      { id: "cp_4", location: "Lagos", status: "Arrived", timestamp: "2026-05-06T14:00:00Z", description: "Package arrived at Lagos hub", coordinates: { lat: 6.5244, lng: 3.3792 } },
    ],
  },
];

// ============================================
// Mock KYC Applications (Admin)
// ============================================
export const MOCK_KYC_APPLICATIONS: KYCApplication[] = [
  { id: "kyc_001", userId: "usr_004", userName: "Emeka Nwosu", userEmail: "emeka@example.com", idType: "national_id", idNumber: "NIN-12345", idDocumentUrl: "/docs/id.jpg", selfieUrl: "/docs/selfie.jpg", ninNumber: "12345678901", status: "pending", submittedAt: "2026-05-06T10:00:00Z" },
  { id: "kyc_002", userId: "usr_005", userName: "Fatima Bello", userEmail: "fatima@example.com", idType: "passport", idNumber: "A12345678", idDocumentUrl: "/docs/id2.jpg", selfieUrl: "/docs/selfie2.jpg", status: "pending", submittedAt: "2026-05-06T14:00:00Z" },
  { id: "kyc_003", userId: "usr_006", userName: "Tunde Bakare", userEmail: "tunde@example.com", idType: "drivers_license", idNumber: "DL-9876", idDocumentUrl: "/docs/id3.jpg", selfieUrl: "/docs/selfie3.jpg", bvnNumber: "22345678901", status: "approved", submittedAt: "2026-05-03T09:00:00Z", reviewedAt: "2026-05-04T11:00:00Z" },
];

// ============================================
// Mock Chart Data
// ============================================
export const MOCK_REVENUE_CHART: ChartDataPoint[] = [
  { name: "Jan", value: 450000 },
  { name: "Feb", value: 620000 },
  { name: "Mar", value: 580000 },
  { name: "Apr", value: 890000 },
  { name: "May", value: 1200000 },
  { name: "Jun", value: 980000 },
];

export const MOCK_TRANSACTION_CHART: ChartDataPoint[] = [
  { name: "Mon", value: 24 },
  { name: "Tue", value: 31 },
  { name: "Wed", value: 28 },
  { name: "Thu", value: 42 },
  { name: "Fri", value: 38 },
  { name: "Sat", value: 15 },
  { name: "Sun", value: 12 },
];

export const MOCK_PLATFORM_STATS: ChartDataPoint[] = [
  { name: "Instagram", value: 42 },
  { name: "WhatsApp", value: 31 },
  { name: "TikTok", value: 18 },
  { name: "X (Twitter)", value: 9 },
];

// ============================================
// Backend Deal Status Mapping
// Maps backend statuses (PENDING_PAYMENT, PAID, SHIPPED, etc.) to frontend display config
// ============================================
export const DEAL_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  PENDING_PAYMENT: { label: "Awaiting Payment", color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
  PAID: { label: "Paid", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  SHIPPED: { label: "Shipped", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
  COMPLETED: { label: "Completed", color: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" },
  DISPUTED: { label: "Disputed", color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" },
  REFUNDED: { label: "Refunded", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" },
};

// ============================================
// Transaction Status Config
// ============================================
export const TRANSACTION_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  created: { label: "Created", color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
  payment_secured: { label: "Payment Secured", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  seller_notified: { label: "Seller Notified", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300" },
  shipped: { label: "Shipped", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300" },
  in_transit: { label: "In Transit", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
  arrived: { label: "Arrived", color: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300" },
  buyer_confirmed: { label: "Confirmed", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  funds_released: { label: "Released", color: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" },
  disputed: { label: "Disputed", color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" },
  refunded: { label: "Refunded", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" },
  cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" },
};
