'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Download, ArrowUpRight, ArrowDownRight, FileText, CreditCard } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SolicitarSaqueModal from "@/components/vendedor/SolicitarSaqueModal";
import EmitirNotaFiscalModal from "@/components/vendedor/EmitirNotaFiscalModal";

const FinanceiroVendedor = () => {
  const router = useRouter();
  const [saqueModalOpen, setSaqueModalOpen] = useState(false);
  const [notaFiscalModalOpen, setNotaFiscalModalOpen] = useState(false);
  const transactions = [
    {
      id: 1,
      type: "Venda",
      description: "Novilho Nelore 18 meses",
      date: "05/11/2024",
      amount: 8500.00,
      status: "Confirmado",
      buyer: "Fazenda Santa Rita"
    },
    {
      id: 2,
      type: "Venda",
      description: "Ração Premium 50kg",
      date: "04/11/2024",
      amount: 145.00,
      status: "Confirmado",
      buyer: "João Silva"
    },
    {
      id: 3,
      type: "Taxa",
      description: "Taxa da Plataforma - Novembro",
      date: "01/11/2024",
      amount: -425.00,
      status: "Pago",
      buyer: "TudoAgro"
    },
    {
      id: 4,
      type: "Saque",
      description: "Transferência Pix",
      date: "01/11/2024",
      amount: -12000.00,
      status: "Processado",
      buyer: "Banco do Brasil"
    },
    {
      id: 5,
      type: "Venda",
      description: "Bezerra Girolando",
      date: "03/11/2024",
      amount: 4200.00,
      status: "Confirmado",
      buyer: "Sítio Boa Vista"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { variant: "default" | "secondary" | "destructive" | "outline" } } = {
      "Confirmado": { variant: "default" },
      "Pago": { variant: "outline" },
      "Processado": { variant: "secondary" },
      "Pendente": { variant: "destructive" }
    };
    return statusMap[status] || { variant: "outline" };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Financeiro</h1>
          <p className="text-muted-foreground">Gerencie suas finanças e extratos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setNotaFiscalModalOpen(true)}>
            <FileText className="h-4 w-4" />
            Emitir Nota Fiscal
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90" onClick={() => setSaqueModalOpen(true)}>
            <Download className="h-4 w-4" />
            Solicitar Saque
          </Button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm opacity-90">Saldo Disponível</p>
              <DollarSign className="h-5 w-5" />
            </div>
            <p className="text-3xl font-bold">R$ 18.750,00</p>
            <p className="text-xs opacity-75 mt-2">Disponível para saque</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Receita do Mês</p>
              <ArrowUpRight className="h-5 w-5 text-status-success" />
            </div>
            <p className="text-3xl font-bold">R$ 32.450,00</p>
            <p className="text-xs text-status-success mt-2">+15% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Taxas Pagas</p>
              <ArrowDownRight className="h-5 w-5 text-status-danger" />
            </div>
            <p className="text-3xl font-bold">R$ 1.622,50</p>
            <p className="text-xs text-muted-foreground mt-2">5% do total de vendas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select defaultValue="30days">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Últimos 7 dias</SelectItem>
                <SelectItem value="30days">Últimos 30 dias</SelectItem>
                <SelectItem value="90days">Últimos 90 dias</SelectItem>
                <SelectItem value="year">Último ano</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="sale">Vendas</SelectItem>
                <SelectItem value="fee">Taxas</SelectItem>
                <SelectItem value="withdraw">Saques</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 sm:ml-auto">
              <Download className="h-4 w-4" />
              Exportar Extrato
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Extrato de Transações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    transaction.type === "Venda" ? "bg-status-success/10" :
                    transaction.type === "Taxa" ? "bg-status-warning/10" :
                    "bg-status-info/10"
                  }`}>
                    {transaction.type === "Venda" ? (
                      <ArrowUpRight className={`h-5 w-5 ${
                        transaction.type === "Venda" ? "text-status-success" :
                        transaction.type === "Taxa" ? "text-status-warning" :
                        "text-status-info"
                      }`} />
                    ) : (
                      <ArrowDownRight className={`h-5 w-5 ${
                        transaction.type === "Venda" ? "text-status-success" :
                        transaction.type === "Taxa" ? "text-status-warning" :
                        "text-status-info"
                      }`} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.buyer} • {transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${
                    transaction.amount > 0 ? "text-status-success" : "text-muted-foreground"
                  }`}>
                    {transaction.amount > 0 ? "+" : ""}
                    R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <Badge variant={getStatusBadge(transaction.status).variant} className="mt-1">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Método de Recebimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Pix</p>
                <p className="text-sm text-muted-foreground">contato@fazenda.com.br</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/vendedor/minha-conta')}>
              Alterar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Informações sobre Taxas</h3>
              <p className="text-sm text-muted-foreground">
                A plataforma cobra uma taxa de 5% sobre cada venda realizada. 
                As taxas são deduzidas automaticamente do valor total antes de disponibilizar em seu saldo.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <SolicitarSaqueModal open={saqueModalOpen} onOpenChange={setSaqueModalOpen} />
      <EmitirNotaFiscalModal open={notaFiscalModalOpen} onOpenChange={setNotaFiscalModalOpen} />
    </div>
  );
};

export default FinanceiroVendedor;
