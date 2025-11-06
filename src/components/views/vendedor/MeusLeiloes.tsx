'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Eye, TrendingUp, Clock, Users, Gavel, Search } from "lucide-react";
import { useState } from "react";
import CriarLeilaoModal from "@/components/vendedor/CriarLeilaoModal";
import CriarCampanhaModal from "@/components/vendedor/CriarCampanhaModal";

const MeusLeiloes = () => {
  const [leilaoModalOpen, setLeilaoModalOpen] = useState(false);
  const [campanhaModalOpen, setCampanhaModalOpen] = useState(false);
  const auctions = [
    {
      id: 1,
      title: "Leilão Elite - Nelore Premium",
      status: "Ativo",
      startDate: "08/11/2024 14:00",
      endDate: "08/11/2024 18:00",
      animals: 12,
      participants: 45,
      currentBid: 125000,
      views: 890,
      image: "🐂"
    },
    {
      id: 2,
      title: "Leilão Genética Girolando",
      status: "Agendado",
      startDate: "15/11/2024 10:00",
      endDate: "15/11/2024 16:00",
      animals: 8,
      participants: 23,
      currentBid: 0,
      views: 234,
      image: "🐄"
    },
    {
      id: 3,
      title: "Leilão Equinos de Trabalho",
      status: "Encerrado",
      startDate: "01/11/2024 15:00",
      endDate: "01/11/2024 19:00",
      animals: 15,
      participants: 67,
      currentBid: 185000,
      views: 1234,
      image: "🐴"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { variant: "default" | "secondary" | "destructive" | "outline" } } = {
      "Ativo": { variant: "default" },
      "Agendado": { variant: "secondary" },
      "Encerrado": { variant: "outline" }
    };
    return statusMap[status] || { variant: "outline" };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Meus Leilões</h1>
          <p className="text-muted-foreground">Gerencie e acompanhe seus leilões</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => window.open('/leiloes', '_blank')}>
            <Eye className="h-4 w-4" />
            Ver como Comprador
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90" onClick={() => setLeilaoModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Criar Novo Leilão
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Gavel className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Leilões</p>
                <p className="text-2xl font-bold">{auctions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-status-success/10 rounded-lg">
                <Users className="h-6 w-6 text-status-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Participantes</p>
                <p className="text-2xl font-bold">{auctions.reduce((sum, a) => sum + a.participants, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-status-warning/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-status-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold">R$ 310k</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-status-info/10 rounded-lg">
                <Eye className="h-6 w-6 text-status-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Visualizações</p>
                <p className="text-2xl font-bold">{auctions.reduce((sum, a) => sum + a.views, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar leilões..." className="pl-10" />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="scheduled">Agendado</SelectItem>
                <SelectItem value="finished">Encerrado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Auctions List */}
      <div className="space-y-4">
        {auctions.map((auction) => (
          <Card key={auction.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Auction Image */}
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="text-8xl">{auction.image}</div>
                </div>

                {/* Auction Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{auction.title}</h3>
                      <Badge variant={getStatusBadge(auction.status).variant}>
                        {auction.status}
                      </Badge>
                    </div>
                    {auction.status === "Ativo" && (
                      <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span className="font-bold">Ao vivo</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Início</p>
                      <p className="font-medium">{auction.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Término</p>
                      <p className="font-medium">{auction.endDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Animais</p>
                      <p className="font-medium">{auction.animals} lotes</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Participantes</p>
                      <p className="font-medium">{auction.participants}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Lance Atual</p>
                      <p className="text-2xl font-bold text-primary">
                        {auction.currentBid > 0 
                          ? `R$ ${auction.currentBid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                          : "Sem lances"
                        }
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                      <Button variant="outline" size="sm">
                        Gerenciar
                      </Button>
                      {auction.status === "Ativo" && (
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Acompanhar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Highlight Button */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg mb-1">Turbine seu Leilão!</h3>
              <p className="text-sm text-muted-foreground">
                Destaque seu leilão e atraia mais compradores
              </p>
            </div>
            <Button className="gap-2 bg-primary hover:bg-primary/90" onClick={() => setCampanhaModalOpen(true)}>
              <TrendingUp className="h-4 w-4" />
              Criar Destaque/Campanha
            </Button>
          </div>
        </CardContent>
      </Card>

      <CriarLeilaoModal open={leilaoModalOpen} onOpenChange={setLeilaoModalOpen} />
      <CriarCampanhaModal open={campanhaModalOpen} onOpenChange={setCampanhaModalOpen} />
    </div>
  );
};

export default MeusLeiloes;
