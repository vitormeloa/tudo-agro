'use client';

import { ReactNode, useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink } from "@/components/NavLink";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LayoutDashboard, ShoppingBag, MessageSquare, Wallet, Menu, Sparkles, X, Bell, HelpCircle, LogOut, Bot, Send, User, CircleDot, Gavel, Package, BookOpen, GraduationCap, PawPrint, ShoppingCart, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AgroIAAvatar } from "@/components/AgroIAAvatar";
import { TypingIndicator } from "@/components/TypingIndicator";
import { MediaUpload } from "@/components/MediaUpload";
import { AudioRecorder } from "@/components/AudioRecorder";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
interface DashboardLayoutProps {
  children: ReactNode;
}

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
  time: string;
  mediaUrl?: string;
  mediaType?: "image" | "video" | "audio";
}

const DashboardLayout = ({
  children
}: DashboardLayoutProps) => {
  const { isAdmin, isSeller, user, signOut } = useAuth();
  const pathname = usePathname();
  const { getTotalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const unreadMessages = 3;
  const cartItemsCount = getTotalItems();

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
        content: userMessage.text
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

  const handleSendAIMessage = () => {
    if (!aiMessage.trim() && !attachedFile) return;

    const newUserMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: aiMessage,
      time: "Agora",
      mediaUrl: attachedFile ? URL.createObjectURL(attachedFile) : undefined,
      mediaType: attachedFile?.type.startsWith("image/") ? "image" : 
                 attachedFile?.type.startsWith("video/") ? "video" : 
                 attachedFile?.type.startsWith("audio/") ? "audio" : undefined,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    sendToAI(newUserMessage);
    setAiMessage("");
    setAttachedFile(null);
  };

  const handleMediaUpload = (file: File) => {
    setAttachedFile(file);
    toast({
      title: "Arquivo anexado",
      description: `${file.name} será enviado com sua mensagem`,
    });
  };

  const handleRecordingComplete = (audioBlob: Blob) => {
    const audioFile = new File([audioBlob], "audio.webm", { type: "audio/webm" });
    setAttachedFile(audioFile);
    toast({
      title: "Áudio gravado",
      description: "Áudio será enviado com sua mensagem",
    });
  };

  const getPageName = () => {
    const page = navigation.find(item => item.path === pathname);
    return page ? page.label : "Início";
  };
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: "check",
      iconColor: "text-status-success",
      iconBg: "bg-status-success/10",
      title: "Ação Confirmada",
      description: "Pedido #023 - Pix de R$ 8.900,00 confirmado com sucesso.",
      time: "2 min atrás",
      unread: true
    },
    {
      id: 2,
      icon: "warning",
      iconColor: "text-status-warning",
      iconBg: "bg-status-warning/10",
      title: "Alerta",
      description: "O anúncio \"Sêmen Angus Premium\" foi reprovado por imagem fora do padrão.",
      time: "30 min atrás",
      unread: true
    },
    {
      id: 3,
      icon: "info",
      iconColor: "text-status-info",
      iconBg: "bg-status-info/10",
      title: "Nova atualização na plataforma",
      description: "Agora é possível favoritar produtos e acompanhar por notificações.",
      time: "1 horas atrás",
      unread: false
    },
    {
      id: 4,
      icon: "star",
      iconColor: "text-status-info",
      iconBg: "bg-status-info/10",
      title: "Frete Grátis Liberado",
      description: "Todas as compras acima de R$ 5.000,00 terão frete grátis até o final do mês.",
      time: "6 horas atrás",
      unread: false
    },
    {
      id: 5,
      icon: "info",
      iconColor: "text-status-info",
      iconBg: "bg-status-info/10",
      title: "Tentativa de login detectada",
      description: "Tentativa de acesso à sua conta a partir de um novo dispositivo. Confirme se foi você.",
      time: "1 dia atrás",
      unread: false
    }
  ]);
  const unreadNotifications = notifications.filter(n => n.unread).length;
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "check":
        return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
      case "warning":
        return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
      case "info":
        return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case "star":
        return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>;
      default:
        return null;
    }
  };
  const navigation = [{
    id: "inicio",
    label: "Início",
    icon: LayoutDashboard,
    path: "/dashboard"
  }, {
    id: "animais",
    label: "Animais",
    icon: PawPrint,
    path: "/dashboard/animais"
  }, {
    id: "leiloes",
    label: "Leilões",
    icon: Gavel,
    path: "/dashboard/leiloes"
  }, {
    id: "mercado-agro",
    label: "Mercado Agro",
    icon: Package,
    path: "/dashboard/mercado-agro"
  }, {
    id: "compras",
    label: "Minhas Compras",
    icon: ShoppingBag,
    path: "/dashboard/minhas-compras"
  }, {
    id: "financeiro",
    label: "Financeiro",
    icon: Wallet,
    path: "/dashboard/financeiro"
  }, {
    id: "chat",
    label: "Chat com Vendedores",
    icon: MessageSquare,
    path: "/dashboard/chat"
  }, {
    id: "treinamentos",
    label: "Treinamentos",
    icon: GraduationCap,
    path: "/dashboard/treinamentos"
  }, {
    id: "blog",
    label: "Blog",
    icon: BookOpen,
    path: "/dashboard/blog"
  }];

  const vendedorNavigation = [{
    id: "vendedor-inicio",
    label: "Início",
    icon: LayoutDashboard,
    path: "/dashboard"
  }, {
    id: "vendedor-animais",
    label: "Meus Animais",
    icon: ShoppingBag,
    path: "/dashboard/vendedor/meus-animais"
  }, {
    id: "vendedor-loja",
    label: "Minha Loja Agro",
    icon: ShoppingBag,
    path: "/dashboard/vendedor/minha-loja"
  }, {
    id: "vendedor-leiloes",
    label: "Meus Leilões",
    icon: ShoppingBag,
    path: "/dashboard/vendedor/meus-leiloes"
  }, {
    id: "vendedor-dashboard",
    label: "Dashboard de Vendas",
    icon: LayoutDashboard,
    path: "/dashboard/vendedor/dashboard"
  }, {
    id: "vendedor-financeiro",
    label: "Financeiro",
    icon: Wallet,
    path: "/dashboard/vendedor/financeiro"
  }, {
    id: "vendedor-conta",
    label: "Minha Conta",
    icon: User,
    path: "/dashboard/vendedor/minha-conta"
  }];

  const adminNavigation = [{
    id: "admin-visao",
    label: "Visão Geral",
    icon: LayoutDashboard,
    path: "/dashboard"
  }, {
    id: "admin-usuarios",
    label: "Usuários",
    icon: User,
    path: "/dashboard/admin/usuarios"
  }, {
    id: "admin-vendedores",
    label: "Vendedores",
    icon: ShoppingBag,
    path: "/dashboard/admin/vendedores"
  }, {
    id: "admin-pedidos",
    label: "Pedidos",
    icon: ShoppingBag,
    path: "/dashboard/admin/pedidos"
  }];
  const NavContent = () => {
    let currentNavigation = [];
    if (isAdmin()) {
      currentNavigation = adminNavigation;
    } else if (isSeller()) {
      currentNavigation = vendedorNavigation;
    } else {
      currentNavigation = navigation;
    }

    return (
      <nav className="flex flex-col gap-1"> {}
        {currentNavigation.map(item => (
          <NavLink key={item.id} to={item.path} className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent transition-all duration-200" activeClassName="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary hover:to-primary/90 shadow-md" onClick={() => setIsOpen(false)}>
            <div className="relative">
              <item.icon className="h-5 w-5" />
              {item.id === "chat" && unreadMessages > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground">
                  {unreadMessages}
                </Badge>
              )}
            </div>
            <span className="font-medium flex-1">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    );
  };
  return <div className="min-h-screen bg-background">
      {}
      <header className="sticky top-0 z-50 border-b bg-card shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden relative animate-pulse-effect">
                  <Menu className="h-6 w-6" />
                  {unreadMessages > 0 && <span className="absolute top-1 right-1 h-2 w-2 bg-status-danger animate-pulse" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 animate-slide-in-right flex flex-col [&>button]:hidden">
                <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
                  <span className="text-lg font-bold text-primary">Menu</span>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all duration-200 hover:rotate-90">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="p-4 overflow-y-auto flex-1">
                  <NavContent />
                </div>
              </SheetContent>
            </Sheet>
              {}
              <div className="flex items-center">
                  <Link href="/" className="flex items-center space-x-3 group">
                      <img
                          src="/fotos/tudo-agro-logo.png"
                          className="h-22 w-auto sm:h-18 md:h-22 lg:h-24 xl:h-26 2xl:h-30"
                          alt="TudoAgro Logo"
                      />
                  </Link>
              </div>
          </div>
          <div className="flex items-center gap-2">
            {}
            {!isAdmin() && !isSeller() && (
              <>
                <Link href="/dashboard/favoritos">
                  <Button variant="ghost" size="icon" className="relative hover:bg-accent text-gray-600 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/carrinho">
                  <Button variant="ghost" size="icon" className="relative hover:bg-accent">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemsCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground border-2 border-background">
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </>
            )}

            {}
            <Button variant="ghost" size="icon" onClick={() => setIsAIChatOpen(true)} className="relative hover:bg-accent">
              <Bot className="h-5 w-5" />
            </Button>

            {}
            <Button variant="ghost" size="icon" onClick={() => setIsHelpOpen(true)} className="hover:bg-accent">
              <HelpCircle className="h-5 w-5" />
            </Button>

            {}
            <Button variant="ghost" size="icon" onClick={() => setIsNotificationsOpen(true)} className="relative hover:bg-accent">
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground border-2 border-background">
                  {unreadNotifications}
                </Badge>}
            </Button>

            {}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  {user?.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={user.name || 'Usuário'}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 z-[60]" align="end">
                <div className="space-y-2">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium truncate">{user?.name || 'Usuário'}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    {user?.roles && user.roles.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {user.roles.map((role) => (
                          <Badge key={role} variant="secondary" className="text-xs">
                            {role === 'admin' ? 'Admin' : role === 'vendedor' ? 'Vendedor' : 'Comprador'}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="border-t pt-2 space-y-1">
                    <Link href="/perfil" className="block">
                      <Button variant="ghost" className="w-full justify-start gap-2">
                        <User className="h-4 w-4" />
                        Meu Perfil
                      </Button>
                    </Link>
                    <Button variant="ghost"
                            onClick={async () => {
                                try {
                                    await signOut()
                                } catch (error) {
                                    console.error('Logout error:', error)
                                    try {
                                        localStorage.clear()
                                        sessionStorage.clear()
                                    } catch (e) {
                                    }
                                    window.location.href = '/login'
                                }
                            }}
                            className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Sair
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex gap-6 p-4 lg:p-6">
        {}
        <aside className="hidden w-64 lg:block">
          <div className="sticky top-20">
            <NavContent />
          </div>
        </aside>

        {}
        <main className="flex-1 min-w-0 p-4 lg:p-6 space-y-6">{children}</main>
      </div>

      {}
      <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
        <DialogContent className="sm:max-w-2xl [&>button]:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsHelpOpen(false)} className="absolute right-4 top-4 bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all duration-200 hover:rotate-90 z-50">
            <X className="h-5 w-5" />
          </Button>
          <DialogHeader>
            <DialogTitle className="text-2xl">Bem-Vindo ao {getPageName()}!</DialogTitle>
            <DialogDescription className="text-base">
              Assista o vídeo abaixo e entenda tudo sobre essa aba :)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg border-2 border-primary/50 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.3),transparent_50%)]" />
              <Button size="lg" className="relative z-10 rounded-full h-28 w-28 bg-white hover:bg-gray-50 shadow-lg border-2 border-primary/20 animate-pulse">
                <svg className="h-16 w-16 ml-2 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </Button>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Button onClick={() => setIsHelpOpen(false)} className="gap-2">
                <Sparkles className="h-4 w-4" />
                Entendi como funciona!
              </Button>
              <button onClick={() => setIsHelpOpen(false)} className="text-sm text-muted-foreground hover:underline">
                Voltar
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {}
      <Sheet open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0 z-[60] [&>button]:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Notificações</h2>
                {unreadNotifications > 0 && <Badge className="bg-primary text-primary-foreground">
                    {unreadNotifications}
                  </Badge>}
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsNotificationsOpen(false)} className="bg-destructive/10 text-destructive hover:bg-destructive/20">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.map(notification => <div key={notification.id} className="flex gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer relative">
                  <div className={`h-10 w-10 rounded-full ${notification.iconBg} ${notification.iconColor} flex items-center justify-center flex-shrink-0`}>
                    {getNotificationIcon(notification.icon)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium flex items-center gap-2">
                      {notification.title}
                      {notification.unread && <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>

                </div>)}
            </div>

            <div className="p-4 border-t space-y-2">
              <Button variant="outline" className="w-full" onClick={() => {
                setNotifications(notifications.map(n => ({ ...n, unread: false })));
                toast({
                  title: "Notificações marcadas como lidas",
                  description: "Todas as suas notificações foram marcadas como lidas.",
                });
              }}>
                Marcar tudo como lido
              </Button>
              
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {}
      <Sheet open={isAIChatOpen} onOpenChange={setIsAIChatOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0 z-[60] bg-background [&>button]:hidden">
          <div className="flex flex-col h-full">
            {}
            <div className="relative border-b bg-gradient-to-br from-background to-primary/5 overflow-hidden">

              <div className="p-4 relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <AgroIAAvatar size="md" />
                      <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                          AgroIA
                        </h2>
                        <Sparkles className="h-4 w-4 text-primary/70 animate-pulse" />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white text-xs">
                          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse mr-1.5" />
                          Online
                        </Badge>
                        <span className="text-xs text-muted-foreground">🤖 Responde em tempo real</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="ghost" size="icon" onClick={() => setIsAIChatOpen(false)} className="bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all duration-200 hover:rotate-90">
                    <X className="h-5 w-5" />
                  </Button>
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
                      <p className="text-sm mt-2">Estou aqui para ajudar com suas dúvidas sobre compras, vendedores e funcionalidades da plataforma.</p>
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
                      {msg.mediaUrl && (
                        <div className="mb-2">
                          {msg.mediaType === "image" && (
                            <img src={msg.mediaUrl} alt="Anexo" className="rounded-lg max-w-full h-auto" />
                          )}
                          {msg.mediaType === "video" && (
                            <video src={msg.mediaUrl} controls className="rounded-lg max-w-full" />
                          )}
                          {msg.mediaType === "audio" && (
                            <audio src={msg.mediaUrl} controls className="w-full" />
                          )}
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    </div>
                    
                    <span className={`text-xs text-muted-foreground mt-1 block ${msg.sender === "user" ? "text-right" : "ml-2"}`}>
                      {msg.time}
                    </span>
                  </div>

                  {msg.sender === "user" && (
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
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
              {attachedFile && (
                <div className="mb-2 p-2 bg-muted/50 rounded-lg flex items-center justify-between">
                  <span className="text-sm truncate">{attachedFile.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAttachedFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex gap-2 items-end">
                <div className="flex gap-1">
                  <MediaUpload onFileSelect={handleMediaUpload} />
                  <AudioRecorder onRecordingComplete={handleRecordingComplete} />
                </div>
                <Input
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  placeholder="Digite sua pergunta..."
                  className="rounded-full bg-muted/50 border-none"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendAIMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendAIMessage}
                  size="icon"
                  className="rounded-full bg-primary hover:bg-primary/90 h-10 w-10 flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>;
};
export default DashboardLayout;