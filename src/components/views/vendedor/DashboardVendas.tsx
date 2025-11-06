'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Package,
  DollarSign,
  ShoppingCart,
  Star,
  Eye,
  Clock,
  RotateCcw,
  Users,
  MapPin,
  TrendingDown,
  FileText,
  MessageSquare,
} from "lucide-react";
import { RefundDetailsModal } from "@/components/vendedor/RefundDetailsModal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

export default function DashboardVendas() {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRefund, setSelectedRefund] = useState<any>(null);

  // Mock data - KPIs
  const kpis = [
    {
      title: "Receita Total",
      value: "R$ 192.890",
      trend: "+12%",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      title: "Total de Vendas",
      value: "142",
      trend: "+8%",
      icon: ShoppingCart,
      color: "text-primary",
    },
    {
      title: "Ticket Médio",
      value: "R$ 1.358",
      trend: "+3%",
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      title: "Avaliação Média",
      value: "★ 4.8",
      subtitle: "245 avaliações",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "Visualizações",
      value: "12.5k",
      trend: "+15%",
      icon: Eye,
      color: "text-primary",
    },
    {
      title: "Conversão",
      value: "11.3%",
      trend: "+2%",
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      title: "Taxa de Resposta",
      value: "94%",
      subtitle: "Média: 2.3h",
      icon: MessageSquare,
      color: "text-primary",
    },
    {
      title: "Tempo de Envio",
      value: "3 dias",
      trend: "-1 dia",
      icon: Clock,
      color: "text-primary",
    },
    {
      title: "Reembolsos",
      value: "8",
      trend: "-2",
      icon: RotateCcw,
      color: "text-destructive",
      trendColor: "text-emerald-600",
    },
  ];

  // Mock data - Evolução mensal
  const monthlyData = [
    { month: "Jan", animais: 45000, produtos: 8000, leiloes: 12000 },
    { month: "Fev", animais: 52000, produtos: 9500, leiloes: 15000 },
    { month: "Mar", animais: 48000, produtos: 11000, leiloes: 18000 },
    { month: "Abr", animais: 61000, produtos: 13000, leiloes: 22000 },
    { month: "Mai", animais: 55000, produtos: 15000, leiloes: 25000 },
    { month: "Jun", animais: 67000, produtos: 16500, leiloes: 28000 },
  ];

  // Mock data - Produtos mais vendidos
  const topProducts = [
    {
      name: "Sêmen Angus Premium",
      category: "Genética",
      totalValue: "R$ 45.000",
      sales: 45,
    },
    {
      name: "Bezerra Holandesa",
      category: "Gado de Leite",
      totalValue: "R$ 96.000",
      sales: 12,
    },
    {
      name: "Ração Premium 25kg",
      category: "Produtos",
      totalValue: "R$ 12.500",
      sales: 125,
    },
    {
      name: "Cavalo Quarto de Milha",
      category: "Cavalos",
      totalValue: "R$ 180.000",
      sales: 3,
    },
    {
      name: "Novilha Nelore",
      category: "Gado de Corte",
      totalValue: "R$ 78.000",
      sales: 15,
    },
  ];

  // Mock data - Reembolsos/Devoluções
  const refunds = [
    {
      product: "Ração Premium 25kg - Lote 3",
      buyer: "João Silva - (11) 98765-4321",
      date: "15/10/2024",
      reason: "Produto com embalagem danificada",
      status: "Pendente",
      value: "R$ 450,00",
      message:
        "Recebi o produto com a embalagem rasgada, parece que houve problema no transporte.",
    },
    {
      product: "Bezerra Holandesa - #1234",
      buyer: "Maria Santos - (21) 97654-3210",
      date: "12/10/2024",
      reason: "Animal diferente do anunciado",
      status: "Em Análise",
      value: "R$ 8.000,00",
      message: "A bezerra não corresponde às fotos e descrição do anúncio.",
    },
    {
      product: "Sêmen Angus - Lote 5",
      buyer: "Pedro Costa - (31) 96543-2109",
      date: "10/10/2024",
      reason: "Produto fora da validade",
      status: "Reembolsado",
      value: "R$ 1.200,00",
    },
  ];

  // Mock data - Perfil do comprador
  const buyerProfile = {
    gender: [
      { name: "Masculino", value: 65, color: "hsl(var(--primary))" },
      { name: "Feminino", value: 30, color: "hsl(var(--secondary))" },
      { name: "Outro", value: 5, color: "hsl(var(--accent))" },
    ],
    ageRange: [
      { name: "18-24", value: 15 },
      { name: "25-34", value: 35 },
      { name: "35-44", value: 30 },
      { name: "45+", value: 20 },
    ],
  };

  // Mock data - Vendas por região
  const salesByRegion = [
    { region: "SP", sales: 45, value: "R$ 89.000" },
    { region: "MG", sales: 32, value: "R$ 56.000" },
    { region: "GO", sales: 28, value: "R$ 42.000" },
    { region: "MT", sales: 18, value: "R$ 28.000" },
    { region: "PR", sales: 12, value: "R$ 18.000" },
    { region: "RS", sales: 7, value: "R$ 12.000" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header com Filtros */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Dashboard de Vendas</h1>
        <div className="flex gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Tipo de Venda" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="gado-corte">Gado de Corte</SelectItem>
              <SelectItem value="gado-leite">Gado de Leite</SelectItem>
              <SelectItem value="cavalos">Cavalos</SelectItem>
              <SelectItem value="semen">Sêmen</SelectItem>
              <SelectItem value="produtos">Produtos Físicos</SelectItem>
              <SelectItem value="leiloes">Leilões</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              {kpi.trend && (
                <p className="text-xs text-muted-foreground mt-1">
                  <span className={kpi.trendColor || "text-emerald-600"}>{kpi.trend}</span> vs mês
                  anterior
                </p>
              )}
              {kpi.subtitle && (
                <p className="text-xs text-muted-foreground mt-1">{kpi.subtitle}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráfico de Evolução Mensal */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução de Receita por Tipo de Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="animais" fill="hsl(var(--primary))" name="Animais" />
              <Bar dataKey="produtos" fill="hsl(var(--secondary))" name="Produtos" />
              <Bar dataKey="leiloes" fill="hsl(var(--accent))" name="Leilões" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Produtos Mais Vendidos e Vendas por Região */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Produtos Mais Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {product.category} • {product.sales} vendas
                    </div>
                  </div>
                  <div className="font-semibold text-primary">{product.totalValue}</div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Vendas por Região
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {salesByRegion.map((region) => (
                <div key={region.region} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary font-bold">
                    {region.region}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{region.sales} vendas</div>
                    <div className="text-sm text-muted-foreground">{region.value}</div>
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(region.sales / 45) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pedidos com Reembolso ou Devolução */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5" />
            Pedidos com Reembolso ou Devolução
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Nova seção com listagem (últimos 10 casos ou mais):
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-semibold text-sm">Produto</th>
                  <th className="text-left py-3 px-2 font-semibold text-sm">Comprador</th>
                  <th className="text-left py-3 px-2 font-semibold text-sm">Data</th>
                  <th className="text-left py-3 px-2 font-semibold text-sm">Motivo</th>
                  <th className="text-left py-3 px-2 font-semibold text-sm">Status</th>
                  <th className="text-right py-3 px-2 font-semibold text-sm">Ações</th>
                </tr>
              </thead>
              <tbody>
                {refunds.map((refund, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2 text-sm">{refund.product}</td>
                    <td className="py-3 px-2 text-sm">{refund.buyer}</td>
                    <td className="py-3 px-2 text-sm">{refund.date}</td>
                    <td className="py-3 px-2 text-sm">{refund.reason}</td>
                    <td className="py-3 px-2">
                      <Badge
                        variant={
                          refund.status === "Pendente"
                            ? "secondary"
                            : refund.status === "Reembolsado"
                            ? "default"
                            : "outline"
                        }
                      >
                        {refund.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedRefund(refund)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalhes
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Perfil do Comprador */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Perfil do Comprador - Gênero
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={buyerProfile.gender}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {buyerProfile.gender.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Perfil do Comprador - Faixa Etária
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={buyerProfile.ageRange}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" name="Porcentagem %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recomendações da Plataforma */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recomendações da Plataforma
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium text-sm">Melhore sua taxa de resposta</div>
                <div className="text-sm text-muted-foreground">
                  Responda as mensagens em até 2 horas para aumentar suas vendas em até 25%
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium text-sm">Atualize o preço do anúncio</div>
                <div className="text-sm text-muted-foreground">
                  O produto "Bezerra Holandesa" está com preço 15% acima da média do mercado
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <Package className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium text-sm">Estoque baixo detectado</div>
                <div className="text-sm text-muted-foreground">
                  3 produtos com alta demanda estão com estoque crítico
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exportar Relatório */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <div className="font-semibold">Exportar Relatório Completo</div>
                <div className="text-sm text-muted-foreground">
                  Receita, Vendas, Produtos mais vendidos e Mapa por região
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
              <Button variant="default">
                <FileText className="h-4 w-4 mr-2" />
                Exportar Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalhes do Reembolso */}
      {selectedRefund && (
        <RefundDetailsModal
          open={!!selectedRefund}
          onOpenChange={(open) => !open && setSelectedRefund(null)}
          refund={selectedRefund}
        />
      )}
    </div>
  );
}
