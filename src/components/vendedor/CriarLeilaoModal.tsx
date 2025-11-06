import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface CriarLeilaoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CriarLeilaoModal = ({ open, onOpenChange }: CriarLeilaoModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Leilão</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="auction-title">Título do Leilão</Label>
            <Input id="auction-title" placeholder="Ex: Leilão Elite - Nelore Premium" />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="auction-start">Data/Hora de Início</Label>
              <Input id="auction-start" type="datetime-local" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="auction-end">Data/Hora de Término</Label>
              <Input id="auction-end" type="datetime-local" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="auction-type">Tipo de Lance</Label>
            <Select>
              <SelectTrigger id="auction-type">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Lances Abertos</SelectItem>
                <SelectItem value="auto">Lances Automáticos</SelectItem>
                <SelectItem value="sealed">Lances Fechados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="min-bid">Lance Mínimo (R$)</Label>
              <Input id="min-bid" type="number" placeholder="1000,00" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bid-increment">Incremento do Lance (R$)</Label>
              <Input id="bid-increment" type="number" placeholder="500,00" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="auction-description">Descrição do Leilão</Label>
            <Textarea 
              id="auction-description" 
              placeholder="Descreva os lotes, regras do leilão, forma de pagamento..."
              className="min-h-[100px]"
            />
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Animais Vinculados</p>
            <p className="text-sm text-muted-foreground">
              Você poderá selecionar os animais após criar o leilão
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Criar Leilão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CriarLeilaoModal;
