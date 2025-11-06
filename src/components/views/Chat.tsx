'use client';

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Send, 
  Paperclip, 
  Settings, 
  Smile, 
  Image as ImageIcon,
  FileText,
  X,
  ChevronLeft,
  ShoppingBag,
  Sparkles,
  Star,
  Check,
  CheckCheck,
  MoreVertical,
  Store,
  MessageSquareOff
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  sender: "buyer" | "seller";
  text: string;
  time: string;
  date?: string;
  attachment?: {
    type: "image" | "pdf" | "file";
    name: string;
    url: string;
  };
  reactions?: string[];
  read?: boolean;
}

interface Conversation {
  id: number;
  seller: string;
  avatar: string;
  avatarImg?: string;
  lastMessage: string;
  time: string;
  unread: number;
  product: string;
  productImage?: string;
  orderId: string;
  orderStatus: "delivered" | "in_transit" | "pending";
  resolved?: boolean;
}

interface SellerProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface Message {
  id: number;
  sender: "buyer" | "seller";
  text: string;
  time: string;
  date?: string;
  attachment?: {
    type: "image" | "pdf" | "file";
    name: string;
    url: string;
  };
  reactions?: string[];
}

interface Conversation {
  id: number;
  seller: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  product: string;
  productImage?: string;
  orderId: string;
}

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [conversationFilter, setConversationFilter] = useState<"todas" | "nao-lidas">("todas");
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showQuickMessages, setShowQuickMessages] = useState(false);
  const [showSellerProducts, setShowSellerProducts] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  const conversations: Conversation[] = [
    {
      id: 1,
      seller: "Fazenda Santa Maria",
      avatar: "FSM",
      lastMessage: "O animal está pronto para transporte",
      time: "10:30",
      unread: 2,
      product: "Touro Nelore PO Certificado",
      orderId: "#001",
      orderStatus: "in_transit"
    },
    {
      id: 2,
      seller: "Haras Vale Verde",
      avatar: "HVV",
      lastMessage: "Documentação enviada por e-mail",
      time: "Ontem",
      unread: 0,
      product: "Égua Mangalarga Marchador",
      orderId: "#002",
      orderStatus: "in_transit"
    },
    {
      id: 3,
      seller: "AgroSeeds",
      avatar: "AS",
      lastMessage: "Obrigado pela preferência!",
      time: "15/01",
      unread: 0,
      product: "Semente Milho BM 3066 - 20kg",
      orderId: "#004",
      orderStatus: "delivered",
      resolved: true
    },
    {
      id: 4,
      seller: "GenéticaBov",
      avatar: "GB",
      lastMessage: "As doses estão armazenadas corretamente",
      time: "14/01",
      unread: 1,
      product: "Sêmen Touro Angus Premium",
      orderId: "#003",
      orderStatus: "delivered"
    }
  ];

  const sellerProducts: SellerProduct[] = [
    {
      id: 1,
      name: "Touro Angus Premium",
      price: 15000,
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=200&h=200&fit=crop",
      category: "Animal"
    },
    {
      id: 2,
      name: "Vaca Nelore Prenha",
      price: 8500,
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=200&h=200&fit=crop",
      category: "Animal"
    },
    {
      id: 3,
      name: "Sêmen Touro Campeão",
      price: 350,
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=200&h=200&fit=crop",
      category: "Sêmen"
    }
  ];

  const messagesData: { [key: number]: Message[] } = {
    1: [
      {
        id: 1,
        sender: "seller",
        text: "Olá! Obrigado pela compra do Touro Nelore PO. O animal está em excelentes condições de saúde.",
        time: "09:15",
        date: "Hoje",
        read: true
      },
      {
        id: 2,
        sender: "buyer",
        text: "Ótimo! Quando posso buscar?",
        time: "09:30",
        read: true
      },
      {
        id: 3,
        sender: "seller",
        text: "O animal está pronto para transporte. Podemos agendar para esta semana. Qual dia é melhor para você?",
        time: "09:45",
        read: true
      },
      {
        id: 4,
        sender: "buyer",
        text: "Sexta-feira seria perfeito!",
        time: "10:00",
        read: true
      },
      {
        id: 5,
        sender: "seller",
        text: "Perfeito! Sexta-feira às 14h está confirmado. Vou enviar a localização exata.",
        time: "10:15",
        attachment: {
          type: "pdf",
          name: "localizacao-fazenda.pdf",
          url: "#"
        },
        read: true
      },
      {
        id: 6,
        sender: "buyer",
        text: "Recebi, obrigado! 👍",
        time: "10:30",
        reactions: ["👍"],
        read: false
      }
    ],
    2: [
      {
        id: 1,
        sender: "seller",
        text: "Boa tarde! A égua está com toda documentação em dia.",
        time: "14:20",
        date: "Ontem",
        read: true
      },
      {
        id: 2,
        sender: "buyer",
        text: "Ótimo! Pode enviar a documentação?",
        time: "14:35",
        read: true
      },
      {
        id: 3,
        sender: "seller",
        text: "Documentação enviada por e-mail",
        time: "15:00",
        read: true
      }
    ],
    4: [
      {
        id: 1,
        sender: "seller",
        text: "Olá! As doses de sêmen estão armazenadas em condições ideais.",
        time: "10:00",
        date: "14/01",
        read: true
      },
      {
        id: 2,
        sender: "buyer",
        text: "Perfeito! Obrigado pela informação.",
        time: "10:15",
        read: false
      }
    ]
  };

  const quickMessages = [
    "Pedido recebido com sucesso ✅",
    "Qual o horário de funcionamento?",
    "Pode enviar mais fotos?",
    "Onde fica localizado?",
    "Qual a forma de pagamento?",
    "Preciso de nota fiscal",
    "Quando posso retirar?",
    "Produto chegou em perfeito estado 👍"
  ];

  const forbiddenPatterns = [
    /\b\d{10,11}\b/, // Phone numbers
    /\b\d{2,3}[-.\s]?\d{4,5}[-.\s]?\d{4}\b/, // Formatted phone
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Email
    /whatsapp|wpp|zap|telegram|face|instagram|insta/i, // Social media
  ];

  const validateMessage = (text: string): boolean => {
    for (const pattern of forbiddenPatterns) {
      if (pattern.test(text)) {
        toast({
          title: "❌ Mensagem não permitida",
          description: "Por segurança, não é permitido compartilhar dados pessoais como telefone, e-mail ou redes sociais no chat.",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const filteredConversations = conversations.filter(conv =>
    conv.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.product.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(conv => {
    if (conversationFilter === "nao-lidas") {
      return conv.unread > 0;
    }
    return true;
  }).sort((a, b) => {
    // Ordenar por não lidas primeiro
    if (conversationFilter === "nao-lidas") {
      return b.unread - a.unread;
    }
    return 0;
  });

  const selectedConversation = conversations.find(c => c.id === selectedChat);
  const currentMessages = selectedChat ? messagesData[selectedChat] || [] : [];
  const isDelivered = selectedConversation?.orderStatus === "delivered";
  const shouldShowRating = isDelivered && !selectedConversation?.resolved;

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    if (!validateMessage(message)) {
      return;
    }
    
    toast({
      title: "✓ Mensagem enviada",
      description: "Sua mensagem foi enviada ao vendedor",
    });
    
    setMessage("");
    setTimeout(scrollToBottom, 100);
  };

  const handleResolveConversation = () => {
    toast({
      title: "Conversa marcada como resolvida",
      description: "Esta conversa foi arquivada com sucesso",
    });
  };

  const handleSubmitRating = () => {
    if (rating === 0) {
      toast({
        title: "Selecione uma avaliação",
        description: "Por favor, selecione de 1 a 5 estrelas",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Avaliação enviada! ⭐",
      description: `Obrigado pelo seu feedback de ${rating} estrelas`,
    });
    
    setShowRatingDialog(false);
    setRating(0);
    setRatingComment("");
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "Arquivo anexado",
        description: `${file.name} foi anexado à mensagem`,
      });
    }
  };

  const handleQuickMessage = (msg: string) => {
    setMessage(msg);
    setShowQuickMessages(false);
  };

  const addReaction = (messageId: number, emoji: string) => {
    toast({
      title: "Reação adicionada",
      description: `Você reagiu com ${emoji}`,
    });
  };

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-4rem)] max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Chat com Vendedores</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Converse diretamente com os vendedores
              </p>
            </div>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-8 overflow-hidden">
          {/* Conversations List - Hidden on mobile when chat is selected */}
          <Card className={`${selectedChat && 'hidden lg:flex'} flex flex-col overflow-hidden h-full shadow-md`}>
            {/* Search */}
            <div className="p-3 sm:p-4 border-b space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar conversas..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Filters */}
              <div className="flex gap-2">
                <Button
                  variant={conversationFilter === "todas" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setConversationFilter("todas")}
                  className={`flex-1 ${
                    conversationFilter === "todas"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  Todas
                </Button>
                <Button
                  variant={conversationFilter === "nao-lidas" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setConversationFilter("nao-lidas")}
                  className={`flex-1 ${
                    conversationFilter === "nao-lidas"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  Não lidas
                </Button>
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedChat(conv.id)}
                  className={`p-3 sm:p-4 cursor-pointer transition-colors border-b hover:bg-accent/50 ${
                    selectedChat === conv.id ? "bg-accent" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                        {conv.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="font-semibold text-sm truncate">{conv.seller}</h4>
                        <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{conv.time}</span>
                      </div>
                      <p className="text-xs text-[hsl(145,45%,21%)] mb-1 truncate font-medium">
                        {conv.product}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-muted-foreground truncate flex-1">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <Badge className="bg-primary text-primary-foreground flex-shrink-0 h-5 min-w-[20px] flex items-center justify-center rounded-full">
                            {conv.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Chat Area */}
          {selectedChat ? (
            <Card className="flex flex-col overflow-hidden h-full shadow-md">
              {/* Chat Header */}
              <div className="border-b p-3 sm:p-4 bg-card sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setSelectedChat(null)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {selectedConversation?.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm sm:text-base truncate">
                      {selectedConversation?.seller}
                    </h3>
                    <p className="text-xs sm:text-sm text-[hsl(145,45%,21%)] truncate font-medium">
                      {selectedConversation?.product}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 sm:gap-2 h-8 sm:h-9 px-2 sm:px-3"
                      onClick={() => setShowOrderSummary(true)}
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span className="hidden sm:inline text-xs sm:text-sm">Pedido</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setShowSellerProducts(true)}>
                          <Store className="h-4 w-4 mr-2" />
                          Ver produtos do vendedor
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleResolveConversation}>
                          <MessageSquareOff className="h-4 w-4 mr-2" />
                          Marcar como resolvido
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 bg-[hsl(40,22%,98%)]">
                {shouldShowRating && (
                  <div className="flex justify-center mb-4">
                    <Card className="p-4 max-w-sm bg-gradient-to-r from-[hsl(142,52%,96%)] to-[hsl(142,52%,92%)] border-primary/20">
                      <div className="text-center space-y-3">
                        <div className="flex justify-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-6 w-6 text-amber-400 fill-amber-400"
                            />
                          ))}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Pedido entregue!</h4>
                          <p className="text-xs text-muted-foreground mb-3">
                            Avalie sua experiência com este vendedor
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => setShowRatingDialog(true)}
                        >
                          Avaliar Vendedor
                        </Button>
                      </div>
                    </Card>
                  </div>
                )}
                {currentMessages.map((msg, index) => {
                  const showDate = index === 0 || msg.date;
                  
                  return (
                    <div key={msg.id}>
                      {showDate && msg.date && (
                        <div className="flex justify-center mb-4">
                          <span className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground">
                            {msg.date}
                          </span>
                        </div>
                      )}
                      
                      <div className={`flex ${msg.sender === "buyer" ? "justify-end" : "justify-start"}`}>
                        <div className={`group max-w-[85%] sm:max-w-[70%]`}>
                          <div
                            className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 ${
                              msg.sender === "buyer"
                                ? "bg-[hsl(142,52%,92%)] text-foreground rounded-tr-sm"
                                : "bg-card text-foreground border rounded-tl-sm shadow-sm"
                            }`}
                          >
                            {msg.attachment && (
                              <div className="mb-2 p-2 sm:p-3 bg-background/50 rounded-lg flex items-center gap-2 border">
                                {msg.attachment.type === "pdf" ? (
                                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" />
                                ) : (
                                  <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs sm:text-sm font-medium truncate">
                                    {msg.attachment.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">Anexo</p>
                                </div>
                              </div>
                            )}
                            <p className="text-sm sm:text-base whitespace-pre-wrap break-words">{msg.text}</p>
                            <div className="flex items-center justify-end gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">{msg.time}</span>
                              {msg.sender === "buyer" && (
                                msg.read ? (
                                  <CheckCheck className="h-4 w-4 text-primary" />
                                ) : (
                                  <Check className="h-4 w-4 text-muted-foreground" />
                                )
                              )}
                              {msg.reactions && msg.reactions.length > 0 && (
                                <div className="flex gap-1">
                                  {msg.reactions.map((reaction, i) => (
                                    <span key={i} className="text-sm">{reaction}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Reaction Buttons - Only show for seller messages */}
                          {msg.sender === "seller" && (
                            <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {["❤️", "👍", "😊"].map((emoji) => (
                                <button
                                  key={emoji}
                                  onClick={() => addReaction(msg.id, emoji)}
                                  className="text-xs sm:text-sm transition-transform"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t p-3 sm:p-4 bg-card">
                <div className="flex items-end gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleFileAttach}
                    className="flex-shrink-0"
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>

                  <Popover open={showQuickMessages} onOpenChange={setShowQuickMessages}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0"
                      >
                        <Sparkles className="h-5 w-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="start">
                      <div className="p-3 border-b">
                        <h4 className="font-semibold text-sm flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          Mensagens Rápidas
                        </h4>
                      </div>
                      <div className="p-2 max-h-[300px] overflow-y-auto">
                        {quickMessages.map((msg, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            className="w-full justify-start text-sm h-auto py-2.5 px-3 hover:bg-accent"
                            onClick={() => handleQuickMessage(msg)}
                          >
                            {msg}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />

                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    className="flex-shrink-0 bg-primary hover:bg-primary/90"
                    disabled={!message.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="hidden lg:flex items-center justify-center h-full shadow-md bg-gradient-to-br from-background to-accent/20">
              <div className="text-center text-muted-foreground">
                <p className="text-lg font-medium">Selecione uma conversa</p>
                <p className="text-sm mt-1">Escolha uma conversa à esquerda para começar</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Order Summary Dialog */}
      <Dialog open={showOrderSummary} onOpenChange={setShowOrderSummary}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Resumo do Pedido
            </DialogTitle>
          </DialogHeader>
          {selectedConversation && (
            <div className="space-y-4">
              <div className="p-4 bg-accent/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Pedido</p>
                <p className="font-bold text-lg">{selectedConversation.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Produto</p>
                <p className="font-semibold">{selectedConversation.product}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vendedor</p>
                <p className="font-semibold">{selectedConversation.seller}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={selectedConversation.orderStatus === "delivered" ? "bg-status-success" : "bg-status-info"}>
                  {selectedConversation.orderStatus === "delivered" ? "Entregue" : "Em trânsito"}
                </Badge>
              </div>
              <Button className="w-full">Ver Detalhes Completos</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Seller Products Sheet */}
      <Sheet open={showSellerProducts} onOpenChange={setShowSellerProducts}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Produtos de {selectedConversation?.seller}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {sellerProducts.map((product) => (
              <Card key={product.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex gap-3">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
                    <Badge variant="outline" className="text-xs mb-2">
                      {product.category}
                    </Badge>
                    <p className="text-lg font-bold text-primary">
                      R$ {product.price.toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-3">
                  Ver Detalhes
                </Button>
              </Card>
            ))}
            <Button variant="outline" className="w-full">
              Ver Loja Completa
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Avaliar Vendedor</DialogTitle>
            <DialogDescription className="text-center">
              Como foi sua experiência com {selectedConversation?.seller}?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Star Rating */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform"
                >
                  <Star
                    className={`h-10 w-10 ${
                      star <= rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Comment */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Comentário (opcional)
              </label>
              <Textarea
                placeholder="Conte mais sobre sua experiência..."
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                rows={4}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowRatingDialog(false);
                  setRating(0);
                  setRatingComment("");
                }}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1"
                onClick={handleSubmitRating}
              >
                Enviar Avaliação
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Chat;
