'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Landmark } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface AddPaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddPaymentMethodModal = ({ open, onOpenChange }: AddPaymentMethodModalProps) => {
  const [paymentType, setPaymentType] = useState<"card" | "pix" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Método adicionado com sucesso!",
      description: "Seu novo método de pagamento foi cadastrado.",
    });
    onOpenChange(false);
    setPaymentType(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>Adicionar Método de Pagamento</DialogTitle>
        </DialogHeader>

        {!paymentType ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Escolha o tipo de pagamento que deseja adicionar:</p>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentType("card")}
                className="flex flex-col items-center gap-3 p-6 border-2 rounded-lg hover:border-[#1E4D2B] hover:bg-accent transition-all"
              >
                <CreditCard className="h-8 w-8 text-emerald-800" />
                <span className="font-medium">Cartão de Crédito</span>
              </button>

              <button
                onClick={() => setPaymentType("pix")}
                className="flex flex-col items-center gap-3 p-6 border-2 rounded-lg hover:border-[#1E4D2B] hover:bg-accent transition-all"
              >
                <Landmark className="h-8 w-8 text-emerald-800" />
                <span className="font-medium">Pix</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {paymentType === "card" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número do Cartão</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Nome no Cartão</Label>
                  <Input
                    id="cardName"
                    placeholder="NOME COMPLETO"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Validade</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/AA"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="pixKey">Chave Pix</Label>
                  <Input
                    id="pixKey"
                    placeholder="CPF, e-mail, telefone ou chave aleatória"
                    required
                  />
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setPaymentType(null)}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#1E4D2B] hover:bg-[#1E4D2B]/90"
              >
                Adicionar
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
