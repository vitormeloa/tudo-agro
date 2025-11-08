'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, MessageSquare, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const Pedidos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants = {
      "preparando_envio": { label: "Preparando Envio", className: "bg-status-warning text-white" },
      "em_transporte": { label: "Em Transporte", className: "bg-status-info text-white" },
      "entregue": { label: "Entregue", className: "bg-status-success text-white" },
      "cancelado": { label: "Cancelado", className: "bg-status-danger text-white" },
    };
    const variant = variants[status as keyof typeof variants] || variants.preparando_envio;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const getPaymentBadge = (method: string) => {
    const variants = {
      "pix": { label: "PIX", className: "bg-primary/20 text-primary" },
      "boleto": { label: "Boleto", className: "bg-secondary/20 text-secondary-foreground" },
      "cartao": { label: "Cartão", className: "bg-accent/50 text-accent-foreground" },
    };
    const variant = variants[method as keyof typeof variants] || variants.pix;
    return <Badge variant="outline" className={variant.className}>{variant.label}</Badge>;
  };

  const pedidosAnimais = [
    {
      id: "#A001234",
      comprador: "João Silva",
      vendedor: "Fazenda Boa Vista",
      produto: "Touro Nelore Elite PO",
      valor: 5000,
      status: "em_transporte",
      pagamento: "pix",
      dataPedido: "01/11/2025 10:30",
      dataEntrega: "10/11/2025 (previsto)",
    },
    {
      id: "#A001235",
      comprador: "Maria Santos",
      vendedor: "Haras Estrela",
      produto: "Égua Quarto de Milha",
      valor: 30000,
      status: "preparando_envio",
      pagamento: "boleto",
      dataPedido: "02/11/2025 14:15",
      dataEntrega: "15/11/2025 (previsto)",
    },
    {
      id: "#A001236",
      comprador: "Carlos Lima",
      vendedor: "Fazenda São José",
      produto: "Bezerro Desmamado",
      valor: 3000,
      status: "entregue",
      pagamento: "cartao",
      dataPedido: "28/10/2025 09:00",
      dataEntrega: "05/11/2025",
    },
  ];

  const pedidosGenetica = [
    {
      id: "#G001100",
      comprador: "Pedro Costa",
      vendedor: "GenéticaPro",
      produto: "Sêmen Holandês A2A2 (10 doses)",
      valor: 1200,
      status: "entregue",
      pagamento: "pix",
      dataPedido: "30/10/2025 16:45",
      dataEntrega: "04/11/2025",
    },
    {
      id: "#G001101",
      comprador: "Ana Oliveira",
      vendedor: "GenAgro",
      produto: "Sêmen Angus Premium (5 doses)",
      valor: 800,
      status: "em_transporte",
      pagamento: "pix",
      dataPedido: "03/11/2025 11:20",
      dataEntrega: "08/11/2025 (previsto)",
    },
  ];

  const pedidosProdutos = [
    {
      id: "#P002000",
      comprador: "Roberto Alves",
      vendedor: "AgroSuprimentos",
      produto: "Ração Premium 25kg (10 sacos)",
      valor: 850,
      status: "preparando_envio",
      pagamento: "boleto",
      dataPedido: "04/11/2025 08:30",
      dataEntrega: "12/11/2025 (previsto)",
    },
    {
      id: "#P002001",
      comprador: "Fernanda Silva",
      vendedor: "TecnoAgro",
      produto: "Cerca Elétrica Completa",
      valor: 2400,
      status: "entregue",
      pagamento: "cartao",
      dataPedido: "25/10/2025 13:10",
      dataEntrega: "02/11/2025",
    },
  ];

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setOrderDetailsOpen(true);
  };

  const renderOrdersTable = (orders: any[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Comprador</TableHead>
          <TableHead>Vendedor</TableHead>
          <TableHead>Produto</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Pagamento</TableHead>
          <TableHead>Data do Pedido</TableHead>
          <TableHead>Entrega</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.comprador}</TableCell>
            <TableCell>{order.vendedor}</TableCell>
            <TableCell>{order.produto}</TableCell>
            <TableCell className="font-bold">R$ {order.valor.toLocaleString('pt-BR')}</TableCell>
            <TableCell>{getStatusBadge(order.status)}</TableCell>
            <TableCell>{getPaymentBadge(order.pagamento)}</TableCell>
            <TableCell className="text-sm text-muted-foreground">{order.dataPedido}</TableCell>
            <TableCell className="text-sm text-muted-foreground">{order.dataEntrega}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => handleViewOrder(order)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-primary">Gerenciamento de Pedidos</h1>
        <p className="text-muted-foreground">Visualize e gerencie todos os pedidos da plataforma</p>
      </div>

      <Tabs defaultValue="animais" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="animais">Pedidos de Animais</TabsTrigger>
          <TabsTrigger value="genetica">Pedidos de Genética</TabsTrigger>
          <TabsTrigger value="produtos">Pedidos de Produtos Agro</TabsTrigger>
        </TabsList>

        <TabsContent value="animais" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por ID, comprador, vendedor ou produto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="preparando_envio">Preparando Envio</SelectItem>
                    <SelectItem value="em_transporte">Em Transporte</SelectItem>
                    <SelectItem value="entregue">Entregue</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                {renderOrdersTable(pedidosAnimais)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="genetica" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por ID, comprador, vendedor ou produto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="preparando_envio">Preparando Envio</SelectItem>
                    <SelectItem value="em_transporte">Em Transporte</SelectItem>
                    <SelectItem value="entregue">Entregue</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                {renderOrdersTable(pedidosGenetica)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="produtos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por ID, comprador, vendedor ou produto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="preparando_envio">Preparando Envio</SelectItem>
                    <SelectItem value="em_transporte">Em Transporte</SelectItem>
                    <SelectItem value="entregue">Entregue</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                {renderOrdersTable(pedidosProdutos)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {}
      <Dialog open={orderDetailsOpen} onOpenChange={setOrderDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Pedido</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">ID do Pedido</p>
                  <p className="font-bold">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedOrder.status)}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">Informações do Produto</h4>
                <p className="text-sm">{selectedOrder.produto}</p>
                <p className="text-2xl font-bold text-status-success mt-2">
                  R$ {selectedOrder.valor.toLocaleString('pt-BR')}
                </p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Comprador</h4>
                  <p>{selectedOrder.comprador}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Vendedor</h4>
                  <p>{selectedOrder.vendedor}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Forma de Pagamento</p>
                  {getPaymentBadge(selectedOrder.pagamento)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data do Pedido</p>
                  <p className="font-medium">{selectedOrder.dataPedido}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Previsão de Entrega</p>
                <p className="font-medium">{selectedOrder.dataEntrega}</p>
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Acessar Chat
                </Button>
                <Button variant="outline" className="flex-1">
                  Rastrear Pedido
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Pedidos;
