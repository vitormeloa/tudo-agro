'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Users, ShoppingCart, Package, AlertTriangle, DollarSign, TrendingUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const VisaoGeral = () => {
  const [periodFilter, setPeriodFilter] = useState("30");
  const [productFilter, setProductFilter] = useState("todos");
  const [categoryFilter, setCategoryFilter] = useState("todos");
  
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [pendingProductsOpen, setPendingProductsOpen] = useState(false);
  const [problemOrdersOpen, setProblemOrdersOpen] = useState(false);
  const [transactionDetailsOpen, setTransactionDetailsOpen] = useState(false);

  const ordersByType = [
    { type: "Gado", count: 100, icon: "🐂" },
    { type: "Cavalos", count: 300, icon: "🐴" },
    { type: "Genética (Sêmen)", count: 300, icon: "🧬" },
    { type: "Produtos Físicos", count: 85, icon: "📦" },
  ];

  const pendingProducts = [
    { id: 1, name: "Touro Nelore PO", category: "Gado de Corte", seller: "Fazenda São José", date: "05/11/2025 10:30" },
    { id: 2, name: "Égua Quarto de Milha", category: "Cavalos", seller: "Haras Estrela", date: "05/11/2025 09:15" },
    { id: 3, name: "Sêmen Holandês A2A2", category: "Sêmen", seller: "GenéticaPro", date: "04/11/2025 16:45" },
    { id: 4, name: "Ração Premium 25kg", category: "Produtos", seller: "AgroSuprimentos", date: "04/11/2025 14:20" },
  ];

  const problemOrders = [
    { id: "#001234", buyer: "João Silva", seller: "Fazenda Boa Vista", problem: "Atraso na entrega", status: "Em análise" },
    { id: "#001235", buyer: "Maria Santos", seller: "Haras do Sol", problem: "Produto divergente", status: "Pendente" },
    { id: "#001236", buyer: "Pedro Costa", seller: "GenAgro", problem: "Não recebido", status: "Urgente" },
  ];

  const transactionVolume = [
    { type: "Gado", value: 450000 },
    { type: "Cavalos", value: 850000 },
    { type: "Genética", value: 320000 },
    { type: "Produtos", value: 125000 },
  ];

  const topProducts = [
    { rank: 1, name: "Touro Nelore Elite", category: "Gado de Corte", sales: 45, revenue: 225000 },
    { rank: 2, name: "Sêmen Holandês Premium", category: "Genética", sales: 150, revenue: 180000 },
    { rank: 3, name: "Égua Mangalarga", category: "Cavalos", sales: 12, revenue: 360000 },
    { rank: 4, name: "Ração Super Premium", category: "Produtos", sales: 320, revenue: 96000 },
    { rank: 5, name: "Bezerro Desmamado", category: "Gado de Corte", sales: 80, revenue: 240000 },
  ];

  const recentActivity = [
    { id: 1, type: "novo_produto", description: "Novo produto cadastrado: Touro Angus", time: "2 min atrás" },
    { id: 2, type: "pedido_cancelado", description: "Pedido #001240 cancelado pelo vendedor", time: "15 min atrás" },
    { id: 3, type: "novo_vendedor", description: "Novo vendedor cadastrado: Fazenda Horizonte", time: "1 hora atrás" },
    { id: 4, type: "avaliacao", description: "Nova avaliação 5 estrelas recebida", time: "2 horas atrás" },
  ];

  const chartData = [
    { month: "Jan", vendas: 120000 },
    { month: "Fev", vendas: 145000 },
    { month: "Mar", vendas: 180000 },
    { month: "Abr", vendas: 165000 },
    { month: "Mai", vendas: 195000 },
    { month: "Jun", vendas: 220000 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Visão Geral</h1>
          <p className="text-muted-foreground">Painel administrativo da plataforma</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>

          <Select value={productFilter} onValueChange={setProductFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Tipo de Produto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="animais">Animais</SelectItem>
              <SelectItem value="genetica">Genética</SelectItem>
              <SelectItem value="produtos">Produtos</SelectItem>
              <SelectItem value="leiloes">Leilões</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas</SelectItem>
              <SelectItem value="gado-corte">Gado de Corte</SelectItem>
              <SelectItem value="gado-leite">Gado de Leite</SelectItem>
              <SelectItem value="cavalos">Cavalos</SelectItem>
              <SelectItem value="semen">Sêmen</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Compradores Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vendedores Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">+8% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setOrderDetailsOpen(true)}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
            <Eye className="h-4 w-4 text-primary cursor-pointer" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">785</div>
            <p className="text-xs text-muted-foreground">No período selecionado</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setPendingProductsOpen(true)}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aguardando Aprovação</CardTitle>
            <Eye className="h-4 w-4 text-primary cursor-pointer" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-warning">23</div>
            <p className="text-xs text-muted-foreground">Produtos pendentes</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setProblemOrdersOpen(true)}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pedidos com Problemas</CardTitle>
            <Eye className="h-4 w-4 text-primary cursor-pointer" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-danger">8</div>
            <p className="text-xs text-muted-foreground">Requerem atenção</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setTransactionDetailsOpen(true)}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Valor Transacionado</CardTitle>
            <Eye className="h-4 w-4 text-primary cursor-pointer" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-success">R$ 1.745.000</div>
            <p className="text-xs text-muted-foreground">+18% vs mês anterior</p>
          </CardContent>
        </Card>
      </div>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="vendas" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 5 Produtos Mais Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map((product) => (
                <div key={product.rank} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Badge className="h-8 w-8 rounded-full flex items-center justify-center">{product.rank}</Badge>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-status-success">R$ {product.revenue.toLocaleString('pt-BR')}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} vendas</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {}
      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 border-b last:border-0">
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <div className="flex-1">
                  <p className="text-sm">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {}
      <Dialog open={orderDetailsOpen} onOpenChange={setOrderDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Pedidos por Tipo</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {ordersByType.map((item) => (
              <div key={item.type} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-medium">{item.type}</span>
                </div>
                <Badge variant="secondary">{item.count} pedidos</Badge>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={pendingProductsOpen} onOpenChange={setPendingProductsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Produtos Aguardando Aprovação</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>{product.seller}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{product.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="default">Aprovar</Button>
                      <Button size="sm" variant="destructive">Rejeitar</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      <Dialog open={problemOrdersOpen} onOpenChange={setProblemOrdersOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Pedidos com Problemas</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Comprador</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Problema</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problemOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.buyer}</TableCell>
                  <TableCell>{order.seller}</TableCell>
                  <TableCell>{order.problem}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === "Urgente" ? "destructive" : "secondary"}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">Ver Detalhes</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      <Dialog open={transactionDetailsOpen} onOpenChange={setTransactionDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Volume por Categoria</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {transactionVolume.map((item) => (
              <div key={item.type} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{item.type}</span>
                <span className="font-bold text-status-success">R$ {item.value.toLocaleString('pt-BR')}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VisaoGeral;
