'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Eye, TrendingUp, Star, Search, Filter } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PublicarAnimalModal from "@/components/vendedor/PublicarAnimalModal";
import CriarCampanhaModal from "@/components/vendedor/CriarCampanhaModal";
import EditarAnimalModal from "@/components/vendedor/EditarAnimalModal";
import DetalhesAnimalModal from "@/components/vendedor/DetalhesAnimalModal";

const MeusAnimais = () => {
  const router = useRouter();
  const [publicarModalOpen, setPublicarModalOpen] = useState(false);
  const [campanhaModalOpen, setCampanhaModalOpen] = useState(false);
  const [editarModalOpen, setEditarModalOpen] = useState(false);
  const [detalhesModalOpen, setDetalhesModalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const animals = [
    {
      id: 1,
      name: "Novilho Nelore 18 meses",
      type: "Bovino",
      price: 8500.00,
      status: "Ativo",
      views: 145,
      rating: 4.8,
      reviews: 12,
      image: "/fotos/animais/touro-nelore.jpeg"
    },
    {
      id: 2,
      name: "Bezerra Girolando",
      type: "Bovino",
      price: 4200.00,
      status: "Ativo",
      views: 89,
      rating: 5.0,
      reviews: 8,
      image: "/fotos/animais/novilha-brahman.jpg"
    },
    {
      id: 3,
      name: "Cavalo Quarto de Milha",
      type: "Equino",
      price: 15000.00,
      status: "Pausado",
      views: 234,
      rating: 4.5,
      reviews: 15,
      image: "/fotos/animais/garanhao-quarto-de-milha.jpg"
    },
    {
      id: 4,
      name: "Ovelha Dorper",
      type: "Ovino",
      price: 1200.00,
      status: "Aguardando Revisão",
      views: 45,
      rating: 0,
      reviews: 0,
      image: "/fotos/animais/vaca-holandesa.jpeg"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { variant: "default" | "secondary" | "destructive" | "outline" } } = {
      "Ativo": { variant: "default" },
      "Pausado": { variant: "secondary" },
      "Aguardando Revisão": { variant: "outline" }
    };
    return statusMap[status] || { variant: "outline" };
  };

  return (
    <div className="space-y-6">
      {}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Meus Animais</h1>
          <p className="text-muted-foreground">Gerencie seus anúncios de animais</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => window.open('/loja/fazenda-santa-cruz', '_blank')}>
            <Eye className="h-4 w-4" />
            Ver Vitrine
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90" onClick={() => setPublicarModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Publicar Novo Animal
          </Button>
        </div>
      </div>

      {}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Anúncios</p>
                <p className="text-2xl font-bold">{animals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-status-success/10 rounded-lg">
                <Eye className="h-6 w-6 text-status-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Visualizações</p>
                <p className="text-2xl font-bold">{animals.reduce((sum, a) => sum + a.views, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-status-warning/10 rounded-lg">
                <Star className="h-6 w-6 text-status-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avaliação Média</p>
                <p className="text-2xl font-bold">4.8⭐</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar animais..." className="pl-10" />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="paused">Pausado</SelectItem>
                <SelectItem value="review">Em Revisão</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-types">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">Todos Tipos</SelectItem>
                <SelectItem value="bovino">Bovino</SelectItem>
                <SelectItem value="equino">Equino</SelectItem>
                <SelectItem value="ovino">Ovino</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {animals.map((animal) => (
          <Card key={animal.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="flex items-start justify-between mt-3">
                <CardTitle className="text-lg">{animal.name}</CardTitle>
                <Badge variant={getStatusBadge(animal.status).variant}>
                  {animal.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tipo:</span>
                  <span className="font-medium">{animal.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Preço:</span>
                  <span className="font-bold text-primary">
                    R$ {animal.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Visualizações:</span>
                  <span className="font-medium">{animal.views}</span>
                </div>
                {animal.reviews > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avaliação:</span>
                    <span className="font-medium">{animal.rating}⭐ ({animal.reviews})</span>
                  </div>
                )}
                <div className="pt-2 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedAnimal(animal);
                      setEditarModalOpen(true);
                    }}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedAnimal(animal);
                      setDetalhesModalOpen(true);
                    }}
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg mb-1">Destaque seus Animais!</h3>
              <p className="text-sm text-muted-foreground">
                Crie campanhas e aumente suas vendas em até 300%
              </p>
            </div>
            <Button className="gap-2 bg-primary hover:bg-primary/90" onClick={() => setCampanhaModalOpen(true)}>
              <TrendingUp className="h-4 w-4" />
              Criar Destaque/Campanha
            </Button>
          </div>
        </CardContent>
      </Card>

      <PublicarAnimalModal open={publicarModalOpen} onOpenChange={setPublicarModalOpen} />
      <CriarCampanhaModal open={campanhaModalOpen} onOpenChange={setCampanhaModalOpen} />
      <EditarAnimalModal open={editarModalOpen} onOpenChange={setEditarModalOpen} animal={selectedAnimal} />
      <DetalhesAnimalModal open={detalhesModalOpen} onOpenChange={setDetalhesModalOpen} animal={selectedAnimal} />
    </div>
  );
};

export default MeusAnimais;
