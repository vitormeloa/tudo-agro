import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

interface AdicionarProdutoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdicionarProdutoModal = ({ open, onOpenChange }: AdicionarProdutoModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Produto</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="product-name">Nome do Produto</Label>
            <Input id="product-name" placeholder="Ex: Ração Premium Bovino 50kg" />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="product-category">Categoria</Label>
              <Select>
                <SelectTrigger id="product-category">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Alimentação</SelectItem>
                  <SelectItem value="health">Saúde Animal</SelectItem>
                  <SelectItem value="infra">Infraestrutura</SelectItem>
                  <SelectItem value="equip">Equipamentos</SelectItem>
                  <SelectItem value="genetics">Genética</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="product-price">Preço (R$)</Label>
              <Input id="product-price" type="number" placeholder="0,00" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="product-stock">Estoque (unidades)</Label>
              <Input id="product-stock" type="number" placeholder="100" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="product-sku">SKU/Código</Label>
              <Input id="product-sku" placeholder="PRD-001" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-description">Descrição do Produto</Label>
            <Textarea 
              id="product-description" 
              placeholder="Descreva características, composição, modo de uso..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Fotos do Produto</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Arraste fotos ou clique para fazer upload</p>
              <p className="text-xs text-muted-foreground mt-1">Máximo 8 fotos, até 5MB cada</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Adicionar Produto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdicionarProdutoModal;
