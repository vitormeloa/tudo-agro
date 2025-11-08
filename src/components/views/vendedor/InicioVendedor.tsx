'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingUp, MessageSquare, Bell, Eye, ShoppingCart } from "lucide-react";
import { useState } from "react";

const QUICK_ACTIONS = [
  { icon: Package, title: "Publicar Animal", link: "/vendedor/meus-animais" },
  { icon: ShoppingCart, title: "Adicionar Produto", link: "/vendedor/minha-loja" },
  { icon: TrendingUp, title: "Ver Dashboard", link: "/vendedor/dashboard" },
  { icon: MessageSquare, title: "Mensagens", link: "/chat" },
];

const RECENT_SALES = [
    {
      id: 1,
      item: "Novilho Nelore 18 meses",
      date: "05/11/2024",
      status: "Aguardando Envio",
      price: 8500.00,
      buyer: {
        name: "Fazenda Santa Rita",
        rating: 4.8
      }
    },
    {
      id: 2,
      item: "Ração Premium 50kg",
      date: "04/11/2024",
      status: "Em Transporte",
      price: 145.00,
      buyer: {
        name: "João Silva",
        rating: 5.0
      }
    },
    {
      id: 3,
      item: "Bezerra Girolando",
      date: "03/11/2024",
      status: "Entregue",
      price: 4200.00,
      buyer: {
        name: "Sítio Boa Vista",
        rating: 4.5
      }
    }
  ];

const RECENT_ACTIVITIES = [
  { icon: MessageSquare, text: "Nova mensagem de João Silva sobre Ração Premium", time: "5 min atrás", type: "message" },
  { icon: Bell, text: "Avaliação recebida - 5 estrelas!", time: "1 hora atrás", type: "review" },
  { icon: Eye, text: "Seu anúncio 'Novilho Nelore' teve 45 visualizações hoje", time: "2 horas atrás", type: "view" },
  { icon: ShoppingCart, text: "Nova venda: Bezerra Girolando", time: "5 horas atrás", type: "sale" },
];

const SELLER_STATS = [
  { icon: Package, label: "Produtos Ativos", value: "24" },
  { icon: ShoppingCart, label: "Vendas este mês", value: "18" },
  { icon: Eye, label: "Visualizações", value: "1.2k" },
  { icon: TrendingUp, label: "Avaliação Média", value: "4.8⭐" },
];

const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { label: string; variant: "default" | "secondary" | "destructive" | "outline" } } = {
      "Aguardando Envio": { label: "Aguardando Envio", variant: "secondary" },
      "Em Transporte": { label: "Em Transporte", variant: "default" },
      "Entregue": { label: "Entregue", variant: "outline" }
    };
    return statusMap[status] || { label: status, variant: "outline" };
  };

const InicioVendedor = () => {
  const [selectedSale, setSelectedSale] = useState<any>(null);

  return (
    <div className="space-y-6">
      {}
      <Card className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-0">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-2">Bem-vindo, Vendedor! 🌾</h1>
          <p className="text-primary-foreground/90">
            Gerencie seus produtos, acompanhe vendas e expanda seus negócios no TudoAgro
          </p>
        </CardContent>
      </Card>

      {}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {SELLER_STATS.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {QUICK_ACTIONS.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto py-6 flex flex-col gap-2 hover:bg-accent"
                onClick={() => window.location.href = action.link}
              >
                <action.icon className="h-8 w-8 text-primary" />
                <span className="font-medium">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {}
        <Card>
          <CardHeader>
            <CardTitle>Últimas Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {RECENT_SALES.map((sale) => {
                const statusInfo = getStatusBadge(sale.status);
                return (
                  <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="space-y-1 flex-1">
                      <p className="font-medium">{sale.item}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{sale.buyer.name}</span>
                        <span>•</span>
                        <span>{sale.date}</span>
                      </div>
                      <Badge variant={statusInfo.variant} className="text-xs">
                        {statusInfo.label}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-primary">
                        R$ {sale.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {}
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {RECENT_ACTIVITIES.map((activity, index) => (
                <div key={index} className="flex gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'message' ? 'bg-status-info/10 text-status-info' :
                    activity.type === 'review' ? 'bg-status-success/10 text-status-success' :
                    activity.type === 'view' ? 'bg-status-warning/10 text-status-warning' :
                    'bg-primary/10 text-primary'
                  }`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InicioVendedor;
