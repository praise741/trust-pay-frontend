"use client";

import { useState } from "react";
import { MessageCircle, Search } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatBox, type Message } from "@/components/shared/chat-box";
import { cn, getInitials } from "@/lib/utils";

const CONVERSATIONS = [
  { id: "1", name: "Adaeze Okonkwo", lastMessage: "Payment done! Please ship ASAP", time: "2m ago", unread: 1, deal: "Vintage Ankara Collection" },
  { id: "2", name: "Tunde Bakare", lastMessage: "Can I get a discount for bulk?", time: "30m ago", unread: 3, deal: "Electronics Bundle" },
  { id: "3", name: "Emeka Nwosu", lastMessage: "Item received, looks great!", time: "2h ago", unread: 0, deal: "Architecture Book Set" },
];

const MOCK_MESSAGES: Message[] = [
  { id: "1", senderId: "system", senderName: "System", content: "Deal created: Vintage Ankara Collection — ₦25,000", timestamp: "2026-05-06T10:00:00Z", type: "system" },
  { id: "2", senderId: "seller", senderName: "Chukwuma Eze", content: "Hi! Thank you for your order. I have the ankara ready.", timestamp: "2026-05-06T10:05:00Z", type: "text" },
  { id: "3", senderId: "buyer", senderName: "Adaeze Okonkwo", content: "Great! Can you confirm the colors match the photos?", timestamp: "2026-05-06T10:07:00Z", type: "text" },
  { id: "4", senderId: "seller", senderName: "Chukwuma Eze", content: "Yes! Exact same colors. I'll send a video before shipping", timestamp: "2026-05-06T10:10:00Z", type: "text" },
  { id: "5", senderId: "system", senderName: "System", content: "Payment of ₦25,000 secured in escrow (1.5% trust fee: ₦375)", timestamp: "2026-05-06T11:00:00Z", type: "system" },
  { id: "6", senderId: "buyer", senderName: "Adaeze Okonkwo", content: "Payment done! Please ship ASAP 🙏", timestamp: "2026-05-06T11:02:00Z", type: "text" },
];

export default function SellerMessagesPage() {
  const [selectedConvo, setSelectedConvo] = useState(CONVERSATIONS[0]);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [search, setSearch] = useState("");

  const handleSend = (content: string) => {
    setMessages((prev) => [...prev, {
      id: Date.now().toString(), senderId: "seller", senderName: "Chukwuma Eze",
      content, timestamp: new Date().toISOString(), type: "text",
    }]);
  };

  const filtered = CONVERSATIONS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Messages" description="Chat with buyers and support" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-220px)] min-h-[500px]">
        <Card className="lg:col-span-1 overflow-hidden">
          <div className="p-3 border-b border-border"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} /></div></div>
          <div className="overflow-y-auto h-full">
            {filtered.map((convo) => (
              <button key={convo.id} onClick={() => setSelectedConvo(convo)} className={cn("w-full text-left p-3 flex items-start gap-3 hover:bg-accent/50 transition-colors border-b border-border/50", selectedConvo.id === convo.id && "bg-accent/50")}>
                <Avatar className="h-10 w-10 shrink-0"><AvatarFallback className="text-xs">{getInitials(convo.name)}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between"><p className="text-sm font-semibold truncate">{convo.name}</p><span className="text-[10px] text-muted-foreground shrink-0">{convo.time}</span></div>
                  <p className="text-xs text-muted-foreground truncate">{convo.lastMessage}</p>
                  <p className="text-[10px] text-primary/70 truncate">{convo.deal}</p>
                </div>
                {convo.unread > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground px-1">{convo.unread}</span>}
              </button>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2">
          <ChatBox messages={messages} currentUserId="seller" recipientName={selectedConvo.name} dealTitle={selectedConvo.deal} onSend={handleSend} className="h-full" />
        </div>
      </div>
    </div>
  );
}
