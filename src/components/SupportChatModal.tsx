'use client';

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Sparkles, User, X } from "lucide-react";
import { AgroIAAvatar } from "@/components/AgroIAAvatar";
import { TypingIndicator } from "@/components/TypingIndicator";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
  time: string;
  hasAction?: boolean;
  actionLabel?: string;
  actionLink?: string;
}

interface SupportChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderInfo: {
    orderId: string;
    productName: string;
    trackingCode: string;
    status: string;
    buyerName: string;
  };
}

const SupportChatModal = ({ isOpen, onClose, orderInfo }: SupportChatModalProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendToAI = async (userMessage: Message) => {
    setIsTyping(true);
    
    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      }));

      conversationHistory.push({
        role: "user",
        content: `Pedido #${orderInfo.orderId}: ${userMessage.text}`
      });

      const { data, error } = await supabase.functions.invoke('agroia-chat', {
        body: { 
          messages: conversationHistory,
          includeActions: false
        }
      });

      if (error) throw error;

      const aiResponse: Message = {
        id: Date.now(),
        sender: "ai",
        text: data.message || "Desculpe, não consegui processar sua mensagem.",
        time: "Agora",
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error: any) {
      console.error("Error calling AgroIA:", error);
      toast({
        title: "Erro",
        description: "Erro ao processar mensagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: message,
      time: "Agora",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    sendToAI(newUserMessage);
    setMessage("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] p-0 gap-0 overflow-hidden bg-gradient-to-b from-background to-primary/5 [&>button]:hidden">
        {}
        <div className="relative border-b bg-gradient-to-br from-background to-primary/5 overflow-hidden">
          {}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 hover:bg-destructive/10 transition-colors z-20 group"
          >
            <X className="h-5 w-5 text-destructive group-hover:text-destructive/80" />
          </button>
          {}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #0A9965 10px, #0A9965 11px)`,
            }} />
          </div>

          <div className="p-4 relative">
            <div className="flex items-center gap-3">
              <div className="relative">
                <AgroIAAvatar size="md" />
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    AgroIA
                  </h2>
                  <Sparkles className="h-4 w-4 text-primary/70 animate-pulse" />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-gradient-to-r from-primary to-primary/70 text-white text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse mr-1.5" />
                    Online
                  </Badge>
                  <span className="text-xs text-muted-foreground">🤖 Responde em tempo real</span>
                </div>
              </div>
            </div>

            {}
            <div className="mt-3 p-3 bg-muted/30 rounded-lg text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-muted-foreground">Pedido:</span>
                  <p className="font-medium">#{orderInfo.orderId}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <p className="font-medium">{orderInfo.status}</p>
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent animate-pulse" />
        </div>

        {}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {}
          {messages.length === 0 && (
            <div className="flex gap-3 animate-fade-in">
              <AgroIAAvatar size="md" />
              <div className="max-w-[85%]">
                <div className="bg-muted/50 rounded-2xl rounded-tl-none p-4 shadow-sm">
                  <p className="text-sm">
                    Olá 👋, eu sou a <span className="font-semibold text-primary">AgroIA</span>!
                  </p>
                  <p className="text-sm mt-2">Como posso ajudar com o pedido <strong>#{orderInfo.orderId}</strong>?</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1 block ml-2">Agora</span>
              </div>
            </div>
          )}

          {}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              {msg.sender === "ai" && <AgroIAAvatar size="md" />}
              
              <div className={`max-w-[85%] ${msg.sender === "user" ? "order-first" : ""}`}>
                <div
                  className={`rounded-2xl p-3 shadow-sm ${
                    msg.sender === "user"
                      ? "bg-primary text-white rounded-tr-none ml-auto"
                      : "bg-muted/50 rounded-tl-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
                
                <span className={`text-xs text-muted-foreground mt-1 block ${msg.sender === "user" ? "text-right" : "ml-2"}`}>
                  {msg.time}
                </span>
              </div>

              {msg.sender === "user" && (
                <div className="h-8 w-8 rounded-full bg-primary/70/20 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
          ))}

          {}
          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <AgroIAAvatar size="md" isTyping />
              <TypingIndicator />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {}
        <div className="border-t bg-background p-4">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua dúvida..."
              className="rounded-full bg-muted/50 border-none"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="rounded-full bg-primary hover:bg-primary/90 h-10 w-10 flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportChatModal;
