import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, AlertCircle } from "lucide-react";

interface SolicitarSaqueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SolicitarSaqueModal = ({ open, onOpenChange }: SolicitarSaqueModalProps) => {
  const saldoDisponivel = 18750.00;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Solicitar Saque</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium">Saldo Disponível</p>
            </div>
            <p className="text-2xl font-bold text-primary">
              R$ {saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="withdraw-amount">Valor do Saque (R$)</Label>
            <Input 
              id="withdraw-amount" 
              type="number" 
              placeholder="0,00"
              max={saldoDisponivel}
            />
            <p className="text-xs text-muted-foreground">
              Valor mínimo: R$ 50,00
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="withdraw-method">Método de Recebimento</Label>
            <Select defaultValue="pix">
              <SelectTrigger id="withdraw-method">
                <SelectValue placeholder="Selecione o método" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pix">Pix (Instantâneo)</SelectItem>
                <SelectItem value="ted">TED (1-2 dias úteis)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1">Informações Importantes</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Saques via Pix são processados instantaneamente</li>
                  <li>• TEDs podem levar até 2 dias úteis</li>
                  <li>• Não há taxa para saques acima de R$ 100</li>
                  <li>• Taxas de 5% já foram descontadas do saldo</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 bg-accent rounded-lg">
            <p className="text-sm font-medium mb-1">Destino</p>
            <p className="text-sm">Pix: contato@fazenda.com.br</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Solicitar Saque
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SolicitarSaqueModal;
