'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, FileText, AlertCircle } from "lucide-react";
import { useState } from "react";
import ReturnRequestModal from "./ReturnRequestModal";

interface ReturnPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  orderId: string;
}

const ReturnPolicyModal = ({ isOpen, onClose, productName, orderId }: ReturnPolicyModalProps) => {
  const [showReturnRequest, setShowReturnRequest] = useState(false);

  return (
    <>
      <ReturnRequestModal
        isOpen={showReturnRequest}
        onClose={() => setShowReturnRequest(false)}
        productName={productName}
        orderId={orderId}
      />
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[95vh] overflow-hidden p-0 gap-0 [&>button]:hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-destructive/10 transition-colors z-20 group"
        >
          <X className="h-5 w-5 text-destructive group-hover:text-destructive/80" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 border-b bg-gradient-to-br from-background to-muted/20">
          <div className="pr-8">
            <h2 className="text-xl md:text-2xl font-bold mb-2 leading-tight flex items-center gap-2">
              <FileText className="h-6 w-6 text-secondary" />
              Política de Devolução
            </h2>
            <p className="text-sm text-muted-foreground">
              Conheça seus direitos e deveres ao solicitar uma devolução
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6" style={{ maxHeight: 'calc(95vh - 250px)' }}>
          {/* Alert */}
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800 dark:text-amber-200">
                <p className="font-semibold mb-1">Importante:</p>
                <p>Leia atentamente a política antes de solicitar uma devolução. Alguns produtos podem ter restrições específicas.</p>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-5">
            <div>
              <h3 className="font-bold text-lg mb-2">Prazo para Devolução</h3>
              <p className="text-muted-foreground leading-relaxed">
                Você tem até <strong>7 dias corridos</strong> após o recebimento do produto para solicitar a devolução, 
                conforme previsto no Código de Defesa do Consumidor (Art. 49).
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Produtos que NÃO aceitam devolução</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Produtos perecíveis (sêmen, embriões, material genético)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Produtos vendidos em leilões</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Animais vivos (exceto casos de defeito ou problema de saúde comprovado)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Produtos personalizados ou feitos sob encomenda</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Procedimento para Devolução</h3>
              <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                <li>Clique em "Solicitar devolução deste pedido" abaixo</li>
                <li>Preencha o formulário com o motivo da devolução</li>
                <li>Anexe fotos do produto, se necessário</li>
                <li>Aguarde análise do TudoAgro (até 2 dias úteis)</li>
                <li>Se aprovado, você receberá instruções de devolução</li>
                <li>Envie o produto de volta em até 5 dias úteis</li>
                <li>Após recebimento e verificação, o reembolso será processado</li>
              </ol>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Responsabilidades</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl border bg-card p-4">
                  <p className="font-semibold mb-2 text-secondary">Do Comprador:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Devolver produto nas mesmas condições</li>
                    <li>• Embalar adequadamente</li>
                    <li>• Arcar com frete de devolução (se não houver defeito)</li>
                  </ul>
                </div>
                <div className="rounded-xl border bg-card p-4">
                  <p className="font-semibold mb-2 text-secondary">Do Vendedor:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Aceitar produto em caso de defeito</li>
                    <li>• Processar reembolso em até 10 dias úteis</li>
                    <li>• Arcar com frete em caso de defeito</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Reembolso</h3>
              <p className="text-muted-foreground leading-relaxed">
                O reembolso será feito na mesma forma de pagamento utilizada na compra, 
                em até <strong>10 dias úteis</strong> após a confirmação do recebimento do produto devolvido.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-muted/30 p-6">
          <Button 
            onClick={() => {
              onClose();
              setShowReturnRequest(true);
            }}
            className="w-full"
            size="lg"
          >
            Solicitar Devolução deste Pedido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default ReturnPolicyModal;
