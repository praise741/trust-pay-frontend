"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, Image, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: "text" | "image" | "system";
}

interface ChatBoxProps {
  messages: Message[];
  currentUserId: string;
  recipientName: string;
  onSend: (content: string) => void;
  dealTitle?: string;
  className?: string;
}

export function ChatBox({ messages, currentUserId, recipientName, onSend, dealTitle, className }: ChatBoxProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className={cn("flex flex-col border border-border rounded-2xl overflow-hidden bg-card", className)}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-accent/30 shrink-0">
        <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{getInitials(recipientName)}</AvatarFallback></Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{recipientName}</p>
          {dealTitle && <p className="text-[10px] text-muted-foreground truncate">Re: {dealTitle}</p>}
        </div>
        <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-green-500" /><span className="text-[10px] text-muted-foreground">Online</span></div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          if (msg.type === "system") {
            return <div key={msg.id} className="text-center"><p className="text-[10px] text-muted-foreground bg-accent/50 inline-block px-3 py-1 rounded-full">{msg.content}</p></div>;
          }
          const isMe = msg.senderId === currentUserId;
          return (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn("flex gap-2", isMe && "flex-row-reverse")}>
              {!isMe && <Avatar className="h-7 w-7 mt-1"><AvatarFallback className="text-[10px]">{getInitials(msg.senderName)}</AvatarFallback></Avatar>}
              <div className={cn("max-w-[75%]")}>
                <div className={cn("px-3.5 py-2 rounded-2xl text-sm", isMe ? "bg-primary text-primary-foreground rounded-br-md" : "bg-accent rounded-bl-md")}>
                  {msg.content}
                </div>
                <p className={cn("text-[10px] text-muted-foreground mt-1", isMe && "text-right")}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </motion.div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-3 shrink-0 bg-card">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="shrink-0 rounded-xl h-9 w-9"><Paperclip className="h-4 w-4" /></Button>
          <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type a message..." className="flex-1 rounded-xl" />
          <Button size="icon" onClick={handleSend} disabled={!input.trim()} className="shrink-0 rounded-xl h-9 w-9"><Send className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
}
