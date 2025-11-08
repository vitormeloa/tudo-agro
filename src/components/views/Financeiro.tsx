'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, CreditCard, TrendingUp, DollarSign, CheckCircle, XCircle, Eye, HelpCircle, Trash2, ChevronsRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TransactionDetailsModal } from "@/components/TransactionDetailsModal";
import { AddPaymentMethodModal } from "@/components/AddPaymentMethodModal";
import { HelpCenterModal } from "@/components/HelpCenterModal";
import { RefundPolicyModal } from "@/components/RefundPolicyModal";
import { toast } from "@/hooks/use-toast";

const Financeiro = () => {
  const [period, setPeriod] = useState("30");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<{
    id: string;
    date: string;
    description: string;
    value: string;
    method: string;
    status: string;
  } | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showRefundPolicyModal, setShowRefundPolicyModal] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollHint(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const transactions = [
    {
      id: "001",
      date: "15/01/2025",
      description: "Touro Nelore PO Certificado",
      value: "R$ 12.500,00",
      method: "Pix",
      status: "approved",
    },
    {
      id: "002",
      date: "10/01/2025",
      description: "Égua Mangalarga Marchador",
      value: "R$ 18.000,00",
      method: "Cartão de Crédito",
      status: "approved",
    },
    {
      id: "003",
      date: "08/01/2025",
      description: "Sêmen Touro Angus Premium",
      value: "R$ 450,00",
      method: "Pix",
      status: "approved",
    },
    {
      id: "004",
      date: "05/01/2025",
      description: "Semente Milho BM 3066 - 20kg",
      value: "R$ 890,00",
      method: "Boleto",
      status: "pending",
    },
    {
      id: "005",
      date: "02/01/2025",
      description: "Novilha Girolando",
      value: "R$ 7.200,00",
      method: "Pix",
      status: "cancelled",
    },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const typeMatch = type === "all" || 
      (type === "animais" && (transaction.description.includes("Touro") || transaction.description.includes("Égua") || transaction.description.includes("Novilha"))) ||
      (type === "genetica" && transaction.description.includes("Sêmen")) ||
      (type === "produtos" && transaction.description.includes("Semente"));
    
    const statusMatch = status === "all" || transaction.status === status;
    
    return typeMatch && statusMatch;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: { label: "Aprovado", variant: "status-success" as const },
      pending: { label: "Pendente", variant: "status-warning" as const },
      cancelled: { label: "Cancelado", variant: "status-danger" as const },
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  const approvedCount = transactions.filter(t => t.status === "approved").length;
  const cancelledCount = transactions.filter(t => t.status === "cancelled").length;

  const stats = [
    { icon: DollarSign, label: "Total Gasto", value: "R$ 31.840,00", color: "text-primary" },
    { icon: TrendingUp, label: "Média Mensal", value: "R$ 10.613,33", color: "text-primary" },
    { icon: CheckCircle, label: "Compras Aprovadas", value: String(approvedCount), color: "text-primary" },
    { icon: XCircle, label: "Compras Recusadas", value: String(cancelledCount), color: "text-red-600" },
  ];

  const handleViewDetails = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
  };

  const handleDownloadInvoice = (transaction: any) => {
    toast({
      title: "Download iniciado",
      description: `Nota fiscal do pedido #${transaction.id} está sendo baixada.`,
    });
  };

  const categoryData = [
    { name: "Animais", value: 37700, color: "#2A5C2E" },
    { name: "Genética", value: 450, color: "#4CAF50" },
    { name: "Produtos", value: 890, color: "#81C784" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Financeiro</h1>
        <p className="text-muted-foreground mt-1">Gerencie seus pagamentos e extrato</p>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-accent/50`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Extrato de Transações</CardTitle>
            <div className="flex gap-2">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Últimos 7 dias</SelectItem>
                  <SelectItem value="30">Últimos 30 dias</SelectItem>
                  <SelectItem value="90">Últimos 90 dias</SelectItem>
                  <SelectItem value="all">Todo período</SelectItem>
                </SelectContent>
              </Select>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="animais">Animais</SelectItem>
                  <SelectItem value="genetica">Genética</SelectItem>
                  <SelectItem value="produtos">Produtos</SelectItem>
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="approved">Aprovado</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="cancelled">Recusado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {}
          <div className="lg:hidden mb-3">
            {showScrollHint && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg animate-pulse">
                <ChevronsRight className="h-4 w-4 animate-bounce" />
                <span>Arraste para o lado para ver todas as informações</span>
              </div>
            )}
          </div>
          
          <div className="overflow-x-auto">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    Nenhuma transação encontrada com os filtros selecionados
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">Pedido #{transaction.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.method}</TableCell>
                    <TableCell className="font-semibold">{transaction.value}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(transaction.status).variant}>
                        {getStatusBadge(transaction.status).label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(transaction)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver detalhes
                        </Button>
                        {transaction.status === "approved" && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-primary hover:text-primary hover:bg-primary/10"
                            onClick={() => handleDownloadInvoice(transaction)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Baixar NF
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>

      {}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg lg:text-2xl">Resumo por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8">
            {}
            <div className="h-[280px] lg:h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={{
                      strokeWidth: 1,
                      stroke: "#888"
                    }}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius + (window.innerWidth < 1024 ? 35 : 45);
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      
                      return (
                        <text 
                          x={x} 
                          y={y} 
                          fill="#333" 
                          textAnchor={x > cx ? 'start' : 'end'} 
                          dominantBaseline="central"
                          className="text-xs lg:text-sm font-medium"
                        >
                          {`${name} ${(percent * 100).toFixed(0)}%`}
                        </text>
                      );
                    }}
                    outerRadius={window.innerWidth < 1024 ? 70 : 90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {}
            <div className="space-y-4 lg:space-y-5">
              {categoryData.map((category, i) => {
                const total = categoryData.reduce((sum, cat) => sum + cat.value, 0);
                const percentage = ((category.value / total) * 100).toFixed(1);
                return (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm lg:text-base font-medium">{category.name}</span>
                      <span className="text-sm lg:text-base text-muted-foreground">{percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all"
                        style={{ width: `${percentage}%`, backgroundColor: category.color }}
                      />
                    </div>
                    <p className="text-sm lg:text-base text-muted-foreground mt-2">
                      R$ {category.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Métodos de Pagamento</CardTitle>
            <Button 
              className="bg-[#2A5C2E] hover:bg-[#2A5C2E]/90"
              onClick={() => setShowAddPaymentModal(true)}
            >
              Adicionar Método
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Cartão de Crédito</p>
                <p className="text-sm text-muted-foreground">**** **** **** 1234</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-[#2A5C2E] text-primary">Principal</Badge>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => toast({
                  title: "Método removido",
                  description: "O método de pagamento foi excluído com sucesso.",
                })}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {}
      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Dúvidas sobre seus pagamentos?</p>
                <p className="text-sm text-muted-foreground">Nossa equipe está pronta para ajudar</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => setShowHelpModal(true)}
              >
                Central de Ajuda
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowRefundPolicyModal(true)}
              >
                Política de Reembolso
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {}
      <TransactionDetailsModal
        open={showDetailsModal}
        onOpenChange={setShowDetailsModal}
        transaction={selectedTransaction}
      />
      <AddPaymentMethodModal
        open={showAddPaymentModal}
        onOpenChange={setShowAddPaymentModal}
      />
      <HelpCenterModal
        open={showHelpModal}
        onOpenChange={setShowHelpModal}
      />
      <RefundPolicyModal
        open={showRefundPolicyModal}
        onOpenChange={setShowRefundPolicyModal}
      />
    </div>
  );
};

export default Financeiro;
