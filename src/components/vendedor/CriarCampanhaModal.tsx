import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Zap, Gift } from "lucide-react";

interface CriarCampanhaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CriarCampanhaModal = ({ open, onOpenChange }: CriarCampanhaModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Destaque/Campanha</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid gap-4 md:grid-cols-3">
            <button className="p-4 border rounded-lg hover:border-primary hover:bg-accent transition-colors text-left">
              <TrendingUp className="h-6 w-6 text-primary mb-2" />
              <p className="font-medium mb-1">Destaque na Home</p>
              <p className="text-xs text-muted-foreground">Apareça em destaque na página inicial</p>
            </button>
            <button className="p-4 border rounded-lg hover:border-primary hover:bg-accent transition-colors text-left">
              <Zap className="h-6 w-6 text-status-warning mb-2" />
              <p className="font-medium mb-1">Campanha Relâmpago</p>
              <p className="text-xs text-muted-foreground">Desconto por tempo limitado</p>
            </button>
            <button className="p-4 border rounded-lg hover:border-primary hover:bg-accent transition-colors text-left">
              <Gift className="h-6 w-6 text-status-success mb-2" />
              <p className="font-medium mb-1">Promoção Combinada</p>
              <p className="text-xs text-muted-foreground">Leve 2, pague 1 ou combos</p>
            </button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign-name">Nome da Campanha</Label>
            <Input id="campaign-name" placeholder="Ex: Black Friday Agro 2024" />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="campaign-start">Data de Início</Label>
              <Input id="campaign-start" type="datetime-local" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="campaign-end">Data de Término</Label>
              <Input id="campaign-end" type="datetime-local" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="campaign-discount">Desconto (%)</Label>
              <Input id="campaign-discount" type="number" placeholder="15" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="campaign-budget">Investimento (R$)</Label>
              <Input id="campaign-budget" type="number" placeholder="500,00" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign-products">Produtos/Animais Incluídos</Label>
            <Select>
              <SelectTrigger id="campaign-products">
                <SelectValue placeholder="Selecione os itens" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os produtos</SelectItem>
                <SelectItem value="animals">Apenas animais</SelectItem>
                <SelectItem value="products">Apenas produtos físicos</SelectItem>
                <SelectItem value="custom">Seleção personalizada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign-description">Descrição</Label>
            <Textarea 
              id="campaign-description" 
              placeholder="Descreva os benefícios e condições da campanha..."
              className="min-h-[80px]"
            />
          </div>

          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm font-medium mb-1">Alcance Estimado</p>
            <p className="text-2xl font-bold text-primary">+2.500 visualizações</p>
            <p className="text-xs text-muted-foreground mt-1">Baseado no seu investimento e histórico</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Criar Campanha
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CriarCampanhaModal;
