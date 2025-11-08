import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface RefundPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RefundPolicyModal = ({ open, onOpenChange }: RefundPolicyModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>Política de Pagamento e Reembolso</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">1. Métodos de Pagamento Aceitos</h3>
              <p className="text-sm text-muted-foreground mb-2">
                A TudoAgro aceita os seguintes métodos de pagamento:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>Cartão de Crédito (Visa, Mastercard, Elo, American Express)</li>
                <li>Pix (confirmação instantânea)</li>
                <li>Boleto Bancário (aprovação em até 2 dias úteis)</li>
                <li>Transferência Bancária</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">2. Processamento de Pagamentos</h3>
              <p className="text-sm text-muted-foreground mb-2">
                • <strong>Pix:</strong> Confirmação imediata após o pagamento<br />
                • <strong>Cartão de Crédito:</strong> Aprovação em até 1 hora<br />
                • <strong>Boleto:</strong> Confirmação em até 2 dias úteis após o pagamento<br />
                • <strong>Transferência:</strong> Confirmação em até 1 dia útil
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">3. Política de Reembolso</h3>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>3.1 Prazo para Solicitação:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4 mb-4">
                <li>Animais vivos: até 24 horas após o recebimento</li>
                <li>Produtos e genética: até 7 dias após o recebimento</li>
                <li>Serviços: até 48 horas antes da execução</li>
              </ul>

              <p className="text-sm text-muted-foreground mb-3">
                <strong>3.2 Condições para Reembolso:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4 mb-4">
                <li>Produto com defeito ou não conforme anunciado</li>
                <li>Animal com problemas de saúde não informados</li>
                <li>Atraso na entrega superior a 15 dias sem justificativa</li>
                <li>Cancelamento pelo vendedor</li>
              </ul>

              <p className="text-sm text-muted-foreground mb-3">
                <strong>3.3 Prazo de Processamento:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>Pix: até 3 dias úteis</li>
                <li>Cartão de Crédito: até 2 faturas</li>
                <li>Boleto/Transferência: até 10 dias úteis</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">4. Casos Especiais</h3>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Animais de Genética:</strong> Reembolso parcial ou total mediante laudo veterinário comprovando defeitos genéticos não informados.
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Sêmen e Embriões:</strong> Garantia de fertilidade conforme especificações do vendedor. Reembolso mediante comprovação técnica.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">5. Como Solicitar Reembolso</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>Acesse "Minhas Compras" no painel</li>
                <li>Selecione o pedido desejado</li>
                <li>Clique em "Solicitar Reembolso"</li>
                <li>Preencha o formulário com a justificativa</li>
                <li>Aguarde análise em até 3 dias úteis</li>
              </ol>
            </section>

            <Separator />

            <section className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Dúvidas?</h4>
              <p className="text-sm text-muted-foreground">
                Entre em contato com nossa equipe financeira:<br />
                E-mail: financeiro@tudoagro.com.br<br />
                Telefone: (62) 3333-4444<br />
                WhatsApp: (62) 99999-8888
              </p>
            </section>

            <p className="text-xs text-muted-foreground italic">
              Última atualização: Janeiro de 2025
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
