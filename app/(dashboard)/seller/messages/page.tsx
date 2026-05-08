"use client";

import { useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatBox, type Message } from "@/components/shared/chat-box";
import { cn, getInitials } from "@/lib/utils";

const CONVERSATIONS: any[] = [];
const MOCK_MESSAGES: Message[] = [];

export default function SellerMessagesPage() {
  const [selectedConvo, setSelectedConvo] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [search, setSearch] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleSend = (content: string) => {
    setMessages((prev) => [...prev, {
      id: Date.now().toString(), senderId: "seller", senderName: "Chukwuma Eze",
      content, timestamp: new Date().toISOString(), type: "text",
    }]);
  };

  const selectConvo = (convo: typeof CONVERSATIONS[0]) => {
    setSelectedConvo(convo);
    setShowChat(true);
  };

  const filtered = CONVERSATIONS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-[calc(100vh-130px)] flex flex-col">
      <PageHeader title="Messages" description="Chat with buyers and support" />
      <div className="flex-1 mt-4 flex gap-4 min-h-0 overflow-hidden">
        <Card className={cn("w-full lg:w-80 lg:shrink-0 flex flex-col overflow-hidden", showChat && "hidden lg:flex")}>
          <div className="p-3 border-b border-border shrink-0">
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map((convo) => (
              <button key={convo.id} onClick={() => selectConvo(convo)} className={cn("w-full text-left p-3 flex items-start gap-3 hover:bg-accent/50 transition-colors border-b border-border/50", selectedConvo?.id === convo.id && "bg-primary/5 border-l-2 border-l-primary")}>
                <Avatar className="h-10 w-10 shrink-0"><AvatarFallback className="text-xs bg-primary/10 text-primary">{getInitials(convo.name)}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5"><p className="text-sm font-medium truncate">{convo.name}</p><span className="text-[10px] text-muted-foreground">{convo.time}</span></div>
                  <p className="text-xs text-muted-foreground truncate">{convo.lastMessage}</p>
                </div>
                {convo.unread > 0 && <div className="h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center shrink-0">{convo.unread}</div>}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="p-8 text-center text-muted-foreground text-sm">No messages found</div>
            )}
          </div>
        </Card>
        
        <Card className={cn("flex-1 flex flex-col min-w-0 bg-background", !showChat && "hidden lg:flex")}>
          {selectedConvo ? (
            <>
              <div className="p-3 border-b border-border flex items-center gap-3 shrink-0">
                <Button variant="ghost" size="icon" className="lg:hidden shrink-0" onClick={() => setShowChat(false)}><ArrowLeft className="h-4 w-4" /></Button>
                <Avatar className="h-9 w-9 shrink-0"><AvatarFallback className="text-xs bg-primary/10 text-primary">{getInitials(selectedConvo.name)}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{selectedConvo.name}</p><p className="text-xs text-muted-foreground truncate">Deal: {selectedConvo.deal}</p></div>
              </div>
              <ChatBox messages={messages} currentUserId="seller" recipientName={selectedConvo.name} dealTitle={selectedConvo.deal} onSend={handleSend} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">Select a conversation to start chatting</div>
          )}
        </Card>
      </div>
    </div>
  );
}
