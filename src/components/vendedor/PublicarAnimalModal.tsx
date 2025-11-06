import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

interface PublicarAnimalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PublicarAnimalModal = ({ open, onOpenChange }: PublicarAnimalModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Publicar Novo Animal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="animal-name">Nome/Descrição do Animal</Label>
            <Input id="animal-name" placeholder="Ex: Novilho Nelore 18 meses" />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="animal-type">Tipo de Animal</Label>
              <Select>
                <SelectTrigger id="animal-type">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bovino">Bovino</SelectItem>
                  <SelectItem value="equino">Equino</SelectItem>
                  <SelectItem value="ovino">Ovino</SelectItem>
                  <SelectItem value="suino">Suíno</SelectItem>
                  <SelectItem value="caprino">Caprino</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="animal-price">Preço (R$)</Label>
              <Input id="animal-price" type="number" placeholder="0,00" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="animal-age">Idade (meses)</Label>
              <Input id="animal-age" type="number" placeholder="18" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="animal-weight">Peso (kg)</Label>
              <Input id="animal-weight" type="number" placeholder="450" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="animal-description">Descrição Completa</Label>
            <Textarea 
              id="animal-description" 
              placeholder="Descreva características, genética, histórico de vacinas..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Fotos do Animal</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Arraste fotos ou clique para fazer upload</p>
              <p className="text-xs text-muted-foreground mt-1">Máximo 10 fotos, até 5MB cada</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Publicar Animal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublicarAnimalModal;
