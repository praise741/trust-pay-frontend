"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CreditCard, Truck, ShieldAlert, CheckCircle, AlertTriangle, Settings, Trash2, Eye, EyeOff } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_NOTIFICATIONS } from "@/constants";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Notification } from "@/types";

const ICONS: Record<string, React.ElementType> = {
  payment: CreditCard, shipment: Truck, dispute: ShieldAlert, payout: CheckCircle, verification: CheckCircle, fraud: AlertTriangle, system: Settings,
};

export default function BuyerNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification removed");
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      <PageHeader title="Notifications" description={`${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`}>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Eye className="h-3.5 w-3.5 mr-1" /> Mark all read
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll} disabled={notifications.length === 0} className="text-destructive hover:text-destructive">
            <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear all
          </Button>
        </div>
      </PageHeader>

      <div className="space-y-2">
        <AnimatePresence>
          {notifications.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Bell className="h-12 w-12 mb-3 opacity-20" />
              <p className="text-sm font-medium">No notifications</p>
              <p className="text-xs">You&apos;re all caught up!</p>
            </motion.div>
          )}
          {notifications.map((n, i) => {
            const Icon = ICONS[n.type] || Bell;
            return (
              <motion.div key={n.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50, height: 0 }} transition={{ delay: i * 0.03 }} layout>
                <Card className={cn("transition-all hover:border-primary/20 group", !n.isRead && "border-primary/20 bg-primary/[0.02]")}>
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center shrink-0", !n.isRead ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => markAsRead(n.id)}>
                      <div className="flex items-center gap-2">
                        <p className={cn("text-sm font-medium", !n.isRead && "text-foreground")}>{n.title}</p>
                        {!n.isRead && <div className="h-2 w-2 rounded-full bg-primary shrink-0 animate-pulse" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      {!n.isRead ? (
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => markAsRead(n.id)} title="Mark as read">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => setNotifications((prev) => prev.map((x) => x.id === n.id ? { ...x, isRead: false } : x))} title="Mark as unread">
                          <EyeOff className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-destructive hover:text-destructive" onClick={() => deleteNotification(n.id)} title="Delete">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
