import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Calendar, CreditCard, MapPin, User } from "lucide-react";

interface TransactionDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: {
    id: string;
    date: string;
    description: string;
    value: string;
    method: string;
    status: string;
  } | null;
}

export const TransactionDetailsModal = ({ open, onOpenChange, transaction }: TransactionDetailsModalProps) => {
  if (!transaction) return null;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: { label: "Aprovado", variant: "status-success" as const },
      pending: { label: "Pendente", variant: "status-warning" as const },
      cancelled: { label: "Cancelado", variant: "status-danger" as const },
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>Detalhes do Pedido #{transaction.id}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Status da Transação</h3>
            <Badge variant={getStatusBadge(transaction.status).variant} className="text-base px-4 py-1">
              {getStatusBadge(transaction.status).label}
            </Badge>
          </div>

          <Separator />

          {/* Informações do Produto */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-emerald-800 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Produto</p>
                <p className="font-medium">{transaction.description}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-emerald-800 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Data da Compra</p>
                <p className="font-medium">{transaction.date}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CreditCard className="h-5 w-5 text-emerald-800 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Método de Pagamento</p>
                <p className="font-medium">{transaction.method}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-emerald-800 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Vendedor</p>
                <p className="font-medium">Fazenda São João</p>
                <p className="text-sm text-muted-foreground">contato@fazendasaojoao.com.br</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-emerald-800 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Endereço de Entrega</p>
                <p className="font-medium">Rua das Flores, 123</p>
                <p className="text-sm text-muted-foreground">Goiânia - GO, 74000-000</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Valor Total */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Valor Total</span>
              <span className="text-2xl font-bold text-emerald-800">{transaction.value}</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <h4 className="font-semibold">Timeline da Transação</h4>
            <div className="space-y-4 ml-4 border-l-2 border-muted pl-4">
              <div className="relative">
                <div className="absolute -left-[1.4rem] top-1 h-3 w-3 rounded-full bg-[#1E4D2B]" />
                <p className="text-sm font-medium">Pedido Realizado</p>
                <p className="text-xs text-muted-foreground">{transaction.date} - 14:30</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[1.4rem] top-1 h-3 w-3 rounded-full bg-[#1E4D2B]" />
                <p className="text-sm font-medium">Pagamento Confirmado</p>
                <p className="text-xs text-muted-foreground">{transaction.date} - 14:35</p>
              </div>
              {transaction.status === "approved" && (
                <div className="relative">
                  <div className="absolute -left-[1.4rem] top-1 h-3 w-3 rounded-full bg-[#1E4D2B]" />
                  <p className="text-sm font-medium">Pedido Aprovado</p>
                  <p className="text-xs text-muted-foreground">{transaction.date} - 15:00</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
