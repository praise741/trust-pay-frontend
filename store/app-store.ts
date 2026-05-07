import { create } from "zustand";

interface AppState {
  sidebarCollapsed: boolean;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  notificationCount: number;
  setNotificationCount: (count: number) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  sidebarCollapsed: false,
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  notificationCount: 2,
  setNotificationCount: (count) => set({ notificationCount: count }),
}));
