import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, User, Calendar, DollarSign, MessageSquare, Mail } from "lucide-react";

interface RefundDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refund: {
    product: string;
    buyer: string;
    date: string;
    reason: string;
    status: string;
    value: string;
    message?: string;
  };
}

export const RefundDetailsModal = ({ open, onOpenChange, refund }: RefundDetailsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Detalhes do Pedido - Reembolso/Devolução
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Produto */}
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">Produto Completo</h3>
            <p className="text-foreground">{refund.product}</p>
          </div>

          <Separator />

          {/* Dados do Comprador */}
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <User className="h-4 w-4" />
              Nome e Dados do Comprador
            </h3>
            <p className="text-foreground">{refund.buyer}</p>
          </div>

          <Separator />

          {/* Valor da Compra */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Valor da Compra
              </h3>
              <p className="text-lg font-semibold text-primary">{refund.value}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Data
              </h3>
              <p className="text-foreground">{refund.date}</p>
            </div>
          </div>

          <Separator />

          {/* Motivo */}
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">Motivo da Devolução</h3>
            <p className="text-foreground">{refund.reason}</p>
          </div>

          <Separator />

          {/* Mensagem do Comprador */}
          {refund.message && (
            <>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Mensagem Enviada pelo Comprador
                </h3>
                <p className="text-foreground bg-muted p-3 rounded-md">{refund.message}</p>
              </div>
              <Separator />
            </>
          )}

          {/* Status */}
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">Status</h3>
            <Badge variant={refund.status === "Pendente" ? "secondary" : "default"}>
              {refund.status}
            </Badge>
          </div>

          <Separator />

          {/* Ação */}
          <div className="flex gap-3">
            <Button className="flex-1" variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Entrar em Contato com Comprador
            </Button>
            <Button className="flex-1" variant="default">
              Processar Reembolso
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
