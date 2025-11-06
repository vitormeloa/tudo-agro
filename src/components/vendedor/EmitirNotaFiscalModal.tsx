import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";

interface EmitirNotaFiscalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmitirNotaFiscalModal = ({ open, onOpenChange }: EmitirNotaFiscalModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Emitir Nota Fiscal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nf-period">Período</Label>
            <Select>
              <SelectTrigger id="nf-period">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Mês Atual</SelectItem>
                <SelectItem value="last">Mês Anterior</SelectItem>
                <SelectItem value="custom">Período Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nf-start">Data Início</Label>
              <Input id="nf-start" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nf-end">Data Fim</Label>
              <Input id="nf-end" type="date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nf-type">Tipo de Nota</Label>
            <Select>
              <SelectTrigger id="nf-type">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nfe">NF-e (Eletrônica)</SelectItem>
                <SelectItem value="nfse">NFS-e (Serviços)</SelectItem>
                <SelectItem value="nfp">NF Produtor Rural</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-2">Resumo do Período</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total de Vendas:</span>
                    <span className="font-medium">R$ 32.450,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Impostos Estimados:</span>
                    <span className="font-medium">R$ 3.245,00</span>
                  </div>
                  <div className="flex justify-between border-t pt-1 mt-1">
                    <span className="font-medium">Valor Líquido:</span>
                    <span className="font-bold text-primary">R$ 29.205,00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-status-warning/10 border border-status-warning/20 rounded-lg">
            <p className="text-sm text-status-warning">
              <strong>Atenção:</strong> Consulte seu contador para garantir a emissão correta
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Emitir Nota Fiscal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmitirNotaFiscalModal;
