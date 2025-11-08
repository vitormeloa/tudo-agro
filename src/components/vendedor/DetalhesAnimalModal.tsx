import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Star, TrendingUp, Calendar, Weight, Ruler, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface DetalhesAnimalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  animal: {
    id: number;
    name: string;
    type: string;
    price: number;
    status: string;
    views: number;
    rating: number;
    reviews: number;
    image: string;
  } | null;
}

const DetalhesAnimalModal = ({ open, onOpenChange, animal }: DetalhesAnimalModalProps) => {
  if (!animal) return null;

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { variant: "default" | "secondary" | "destructive" | "outline" } } = {
      "Ativo": { variant: "default" },
      "Pausado": { variant: "secondary" },
      "Aguardando Revisão": { variant: "outline" }
    };
    return statusMap[status] || { variant: "outline" };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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
            <DialogTitle>Detalhes do Animal</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="text-9xl text-center">{animal.image}</div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{animal.name}</h3>
                  <Badge variant={getStatusBadge(animal.status).variant}>
                    {animal.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Preço</p>
                  <p className="text-3xl font-bold text-primary">
                    R$ {animal.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {}
          <div>
            <h4 className="font-bold text-lg mb-4">Informações do Animal</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="p-2 bg-primary/10 rounded">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Idade</p>
                  <p className="font-medium">18 meses</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="p-2 bg-primary/10 rounded">
                  <Weight className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Peso Aprox.</p>
                  <p className="font-medium">450 kg</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="p-2 bg-primary/10 rounded">
                  <Ruler className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tipo</p>
                  <p className="font-medium">{animal.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="p-2 bg-primary/10 rounded">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Raça</p>
                  <p className="font-medium">Nelore</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {}
          <div>
            <h4 className="font-bold text-lg mb-4">Performance do Anúncio</h4>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-accent rounded-lg">
                <Eye className="h-6 w-6 mx-auto mb-2 text-status-info" />
                <p className="text-2xl font-bold">{animal.views}</p>
                <p className="text-sm text-muted-foreground">Visualizações</p>
              </div>
              <div className="text-center p-4 bg-accent rounded-lg">
                <Star className="h-6 w-6 mx-auto mb-2 text-status-warning" />
                <p className="text-2xl font-bold">{animal.rating}⭐</p>
                <p className="text-sm text-muted-foreground">Avaliação</p>
              </div>
              <div className="text-center p-4 bg-accent rounded-lg">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-status-success" />
                <p className="text-2xl font-bold">{animal.reviews}</p>
                <p className="text-sm text-muted-foreground">Avaliações</p>
              </div>
            </div>
          </div>

          <Separator />

          {}
          <div>
            <h4 className="font-bold text-lg mb-3">Descrição</h4>
            <p className="text-muted-foreground leading-relaxed">
              Animal de excelente genética, criado em sistema de pastagem rotacionada. 
              Totalmente vacinado e com documentação completa. Ideal para reprodução ou engorda. 
              Manso e acostumado com manejo diário. Procedência garantida.
            </p>
          </div>

          <Separator />

          {}
          <div>
            <h4 className="font-bold text-lg mb-3">Histórico Sanitário</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Vacina Aftosa</span>
                <Badge variant="outline">Em dia</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Vermifugação</span>
                <Badge variant="outline">Em dia</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Brucelose/Tuberculose</span>
                <Badge variant="outline">Negativo</Badge>
              </div>
            </div>
          </div>

          {}
          <div>
            <h4 className="font-bold text-lg mb-3">Localização</h4>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium">Fazenda Santa Cruz</p>
              <p className="text-sm text-muted-foreground">Goiânia - GO</p>
              <p className="text-sm text-muted-foreground">CEP: 74000-000</p>
            </div>
          </div>

          {}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Voltar
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90">
              Editar Anúncio
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetalhesAnimalModal;
