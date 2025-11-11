'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Package, Eye, Users, Gavel, Store, BookOpen, HelpCircle, TrendingUp, Award, Shield, MessageSquare, ChevronRight } from "lucide-react";
import { useState, useMemo, lazy, Suspense } from "react";

const PurchaseDetailsModal = lazy(() => import("@/components/PurchaseDetailsModal"));

const QUICK_ACTIONS = [{
  icon: Package,
  title: "Ver Animais",
  href: "/dashboard/animais"
}, {
  icon: Gavel,
  title: "Ver Leilões",
  href: "/dashboard/leiloes"
}, {
  icon: Store,
  title: "Mercado Agro",
  href: "/dashboard/mercado-agro"
}, {
  icon: Heart,
  title: "Meus Favoritos",
  href: "/favoritos"
}, {
  icon: MessageSquare,
  title: "Chat com Vendedores",
  href: "/dashboard/chat"
}, {
  icon: BookOpen,
  title: "Acessar Blog",
  href: "/dashboard/blog"
}];

const RECENT_PURCHASES = [{
    id: 1,
    name: "Touro Nelore PO Certificado",
    date: "15/01/2025",
    time: "10:42",
    status: "preparing",
    image: "/fotos/animais/touro-nelore.jpeg",
    itemType: "Animal / Genética / Produto físico",
    quantity: 1,
    unitPrice: 25000.00,
    shippingPrice: 350.00,
    totalPrice: 25350.00,
    paymentMethod: "Pix / Boleto / Cartão / Transferência",
    paymentStatus: "Confirmado / Aguardando / Cancelado",
    seller: {
      name: "Fazenda Santa Helena",
      location: "Ribeirão Preto, SP",
      rating: 4.8
    },
    tracking: {
      carrier: "AgroFast",
      code: "AGRO123456789",
      estimatedDelivery: "Até 20/01/2025",
      steps: [{
        label: "Pedido confirmado",
        completed: true,
        current: false
      }, {
        label: "Preparando envio",
        completed: false,
        current: true
      }, {
        label: "Em transporte",
        completed: false,
        current: false
      }, {
        label: "Entregue",
        completed: false,
        current: false
      }]
    }
  }, {
    id: 2,
    name: "Égua Mangalarga Marchador",
    date: "10/01/2025",
    time: "14:20",
    status: "transit",
    image: "/fotos/animais/egua-mangalarga.jpeg",
    itemType: "Animal / Genética / Produto físico",
    quantity: 1,
    unitPrice: 18000.00,
    shippingPrice: 500.00,
    totalPrice: 18500.00,
    paymentMethod: "Cartão",
    paymentStatus: "Confirmado",
    seller: {
      name: "Haras Boa Vista",
      location: "Campos do Jordão, SP",
      rating: 4.9
    },
    tracking: {
      carrier: "AgroFast",
      code: "AGRO987654321",
      estimatedDelivery: "Até 18/01/2025",
      steps: [{
        label: "Pedido confirmado",
        completed: true,
        current: false
      }, {
        label: "Preparando envio",
        completed: true,
        current: false
      }, {
        label: "Em transporte",
        completed: false,
        current: true
      }, {
        label: "Entregue",
        completed: false,
        current: false
      }]
    }
  }, {
    id: 3,
    name: "Semente Milho BM 3066",
    date: "05/01/2025",
    time: "09:15",
    status: "delivered",
    image: "/fotos/produtos/semente-milho.jpeg",
    itemType: "Produto físico",
    quantity: 10,
    unitPrice: 450.00,
    shippingPrice: 50.00,
    totalPrice: 4550.00,
    paymentMethod: "Pix",
    paymentStatus: "Confirmado",
    seller: {
      name: "AgroSementes Premium",
      location: "Uberlândia, MG",
      rating: 4.7
    },
    tracking: {
      carrier: "AgroFast",
      code: "AGRO555666777",
      estimatedDelivery: "Entregue em 08/01/2025",
      steps: [{
        label: "Pedido confirmado",
        completed: true,
        current: false
      }, {
        label: "Preparando envio",
        completed: true,
        current: false
      }, {
        label: "Em transporte",
        completed: true,
        current: false
      }, {
        label: "Entregue",
        completed: true,
        current: false
      }]
    }
  }];

const STATS = [{
  icon: Users,
  label: "50k+",
  sublabel: "Usuários Ativos"
}, {
  icon: Award,
  label: "R$ 2.8B",
  sublabel: "Volume Negociado"
}, {
  icon: Heart,
  label: "98%",
  sublabel: "Satisfação"
}, {
  icon: Shield,
  label: "100%",
  sublabel: "Segurança"
}];

const getStatusBadge = (status: string) => {
    const statusConfig = {
      preparing: {
        label: "Preparando Envio",
        variant: "status-warning" as const
      },
      transit: {
        label: "Em Transporte",
        variant: "status-info" as const
      },
      delivered: {
        label: "Entregue",
        variant: "status-success" as const
      },
      cancelled: {
        label: "Cancelado",
        variant: "status-danger" as const
      }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.preparing;
  };

const Dashboard = () => {
  const [selectedPurchase, setSelectedPurchase] = useState<number | null>(null);

  return <div>
          {}
          <Card className="mb-6 overflow-hidden border-0 bg-gradient-to-r from-primary to-primary/70">
            <CardContent className="p-6 md:p-8 text-primary-foreground">
              <h1 className="mb-2 text-2xl md:text-3xl font-bold">Bem-vindo ao TudoAgro</h1>
              <p className="mb-4 text-base md:text-lg opacity-90">
                O marketplace agro mais completo do Brasil
              </p>
              <Button size="lg" variant="default" className="w-full md:w-auto bg-white text-primary hover:bg-gray-100">
                Explorar Produtos
              </Button>
            </CardContent>
          </Card>

          {}
          
          {}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Atalhos Rápidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                {QUICK_ACTIONS.map((action, i) => <Button key={i} variant="outline" className="h-auto flex-col gap-2 md:gap-3 py-4 md:py-6 hover:border-primary bg-accent/30 hover:bg-accent/50 transition-all group">
                    <action.icon className="h-6 w-6 md:h-8 md:w-8 text-primary group-hover:text-primary" />
                    <span className="text-xs md:text-sm font-medium text-center text-gray-800 group-hover:text-primary">{action.title}</span>
                  </Button>)}
              </div>
            </CardContent>
          </Card>

          {}
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Últimas Compras</CardTitle>
              <Button variant="ghost" size="sm" className="hidden md:flex">
                Ver Todos
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {RECENT_PURCHASES.map(purchase => <div key={purchase.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-lg border p-4 hover:border-secondary/50 transition-colors" onClick={() => setSelectedPurchase(purchase.id)}>
                    <div className="flex items-start md:items-center gap-3 md:gap-4 flex-1">
                      <img
                        src={purchase.image}
                        alt={purchase.name}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm md:text-base truncate">{purchase.name}</div>
                        <div className="text-xs md:text-sm text-muted-foreground mt-1">{purchase.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-2 md:gap-3">
                      <Badge variant={getStatusBadge(purchase.status).variant} className="shrink-0 px-4 py-1">
                        {getStatusBadge(purchase.status).label}
                      </Badge>
                      <Button variant="outline" size="sm" className="hidden md:flex border-2 border-primary text-primary hover:border-primary hover:bg-primary hover:text-white transition-all duration-200 shrink-0 rounded-lg px-4" onClick={(e) => { e.stopPropagation(); setSelectedPurchase(purchase.id); }}>
                        <Eye className="h-4 w-4 mr-2" />
                        <span>Ver detalhes</span>
                      </Button>
                      <ChevronRight className="h-5 w-5 text-gray-400 md:hidden" />
                    </div>
                  </div>)}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4 md:hidden">
                Ver Todos
              </Button>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl md:text-2xl">Continue Aprendendo</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4 hover:border-secondary transition-all hover:shadow-md">
                  
                  <h3 className="mb-2 font-semibold text-sm md:text-base">Como avaliar um touro de corte</h3>
                  <p className="mb-4 text-xs md:text-sm text-muted-foreground">
                    Aprenda técnicas profissionais de avaliação
                  </p>
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    Assistir Agora
                  </Button>
                </div>
                <div className="rounded-lg border p-4 hover:border-secondary transition-all hover:shadow-md">
                  
                  <h3 className="mb-2 font-semibold text-sm md:text-base">Manejo sustentável de pastagens</h3>
                  <p className="mb-4 text-xs md:text-sm text-muted-foreground">
                    Técnicas modernas para produtividade
                  </p>
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    Assistir Agora
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {}
          <Card className="bg-muted/50 mt-6">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-10 w-10 text-primary" />
                  <div>
                    <p className="font-medium">Dúvidas sobre o Dashboard?</p>
                    <p className="text-sm text-muted-foreground">Nossa equipe está pronta para ajudar</p>
                  </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">
                        Fale com Suporte
                    </Button>
                    <Button variant="outline">
                        Consultar AgroIA
                    </Button>
                </div>
              </div>
            </div>
          </Card>

        {}
        {selectedPurchase && (
          <Suspense fallback={<div>Carregando...</div>}>
            <PurchaseDetailsModal
              isOpen={!!selectedPurchase}
              onClose={() => setSelectedPurchase(null)}
              purchase={RECENT_PURCHASES.find(p => p.id === selectedPurchase)!}
            />
          </Suspense>
        )}
    </div>;
};
export default Dashboard;