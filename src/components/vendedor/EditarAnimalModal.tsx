import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, ArrowLeft } from "lucide-react";

interface EditarAnimalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  animal: {
    id: number;
    name: string;
    type: string;
    price: number;
    status: string;
  } | null;
}

const EditarAnimalModal = ({ open, onOpenChange, animal }: EditarAnimalModalProps) => {
  if (!animal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onOpenChange(false)}
              className="p-1 h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle>Editar Animal</DialogTitle>
          </div>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-animal-name">Nome/Descrição do Animal</Label>
            <Input id="edit-animal-name" defaultValue={animal.name} />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-animal-type">Tipo de Animal</Label>
              <Select defaultValue={animal.type.toLowerCase()}>
                <SelectTrigger id="edit-animal-type">
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
              <Label htmlFor="edit-animal-price">Preço (R$)</Label>
              <Input 
                id="edit-animal-price" 
                type="number" 
                defaultValue={animal.price.toFixed(2)} 
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-animal-status">Status</Label>
              <Select defaultValue={animal.status.toLowerCase().replace(" ", "-")}>
                <SelectTrigger id="edit-animal-status">
                  <SelectValue placeholder="Status do anúncio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="pausado">Pausado</SelectItem>
                  <SelectItem value="aguardando-revisao">Aguardando Revisão</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-animal-age">Idade (meses)</Label>
              <Input id="edit-animal-age" type="number" placeholder="18" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-animal-weight">Peso (kg)</Label>
              <Input id="edit-animal-weight" type="number" placeholder="450" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-animal-breed">Raça</Label>
              <Input id="edit-animal-breed" placeholder="Ex: Nelore, Girolando" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-animal-description">Descrição Completa</Label>
            <Textarea 
              id="edit-animal-description" 
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

          <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
            <div className="text-4xl">{animal.id === 1 ? "🐂" : animal.id === 2 ? "🐄" : animal.id === 3 ? "🐴" : "🐑"}</div>
            <div className="flex-1">
              <p className="text-sm font-medium">Imagens Atuais</p>
              <p className="text-xs text-muted-foreground">3 fotos salvas</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditarAnimalModal;
