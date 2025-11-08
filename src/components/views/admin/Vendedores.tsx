'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Search, TrendingUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Vendedores = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productFilter, setProductFilter] = useState("todos");
  const [salesInProgressOpen, setSalesInProgressOpen] = useState(false);
  const [salesCanceledOpen, setSalesCanceledOpen] = useState(false);
  const [salesCompletedOpen, setSalesCompletedOpen] = useState(false);
  const [salesValueOpen, setSalesValueOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedVendedor, setSelectedVendedor] = useState<any>(null);
  const [actionsModalOpen, setActionsModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants = {
      ativo: { label: "Ativo", className: "bg-[#34A853] text-white" },
      inativo: { label: "Inativo", className: "bg-[#BDBDBD] text-white" },
      suspenso: { label: "Suspenso", className: "bg-[#EA4335] text-white" },
    };
    const variant = variants[status as keyof typeof variants] || variants.ativo;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const salesByType = [
    { type: "Gado", count: 100, icon: "🐂" },
    { type: "Cavalos", count: 300, icon: "🐴" },
    { type: "Genética (Sêmen)", count: 300, icon: "🧬" },
    { type: "Produtos Físicos", count: 85, icon: "📦" },
  ];

  const salesValue = [
    { type: "Gado", value: 200000 },
    { type: "Cavalos", value: 300000 },
    { type: "Sêmen", value: 400000 },
    { type: "Produtos", value: 500000 },
  ];

  const vendedores = [
    { 
      id: 1, 
      nome: "Fazenda Boa Vista", 
      email: "contato@boavista.com", 
      telefone: "(16) 98888-7777", 
      status: "ativo", 
      gados: 45, 
      cavalos: 12, 
      semen: 230, 
      produtos: 18, 
      emAndamento: 12,
      canceladas: 3,
      realizadas: 156, 
      reclamacoes: 2, 
      cadastro: "01/10/2025 às 08:00" 
    },
    { 
      id: 2, 
      nome: "Haras Estrela", 
      email: "haras@estrela.com", 
      telefone: "(19) 97777-6666", 
      status: "ativo", 
      gados: 5, 
      cavalos: 38, 
      semen: 0, 
      produtos: 5,
      emAndamento: 8,
      canceladas: 1,
      realizadas: 89, 
      reclamacoes: 0, 
      cadastro: "15/09/2025 às 14:20" 
    },
    { 
      id: 3, 
      nome: "GenéticaPro", 
      email: "vendas@geneticapro.com", 
      telefone: "(17) 96666-5555", 
      status: "ativo", 
      gados: 0, 
      cavalos: 0, 
      semen: 450, 
      produtos: 25,
      emAndamento: 25,
      canceladas: 8,
      realizadas: 234, 
      reclamacoes: 12, 
      cadastro: "20/08/2025 às 11:45" 
    },
  ];

  const performanceData = [
    { month: "Jan", vendas: 15 },
    { month: "Fev", vendas: 22 },
    { month: "Mar", vendas: 28 },
    { month: "Abr", vendas: 35 },
    { month: "Mai", vendas: 42 },
    { month: "Jun", vendas: 48 },
  ];

  const handleViewProfile = (vendedor: any) => {
    setSelectedVendedor(vendedor);
    setProfileModalOpen(true);
  };

  const handleActionsClick = (vendedor: any) => {
    setSelectedVendedor(vendedor);
    setActionsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-primary">Gerenciamento de Vendedores</h1>
        <p className="text-muted-foreground">Acompanhe vendas e desempenho dos vendedores</p>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSalesInProgressOpen(true)}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vendas Em Andamento</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Transações ativas</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSalesCanceledOpen(true)}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vendas Canceladas</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-danger">12</div>
            <p className="text-xs text-muted-foreground">No período</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSalesCompletedOpen(true)}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vendas Realizadas</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-success">479</div>
            <p className="text-xs text-muted-foreground">Total concluído</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSalesValueOpen(true)}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Valor em Vendas</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-success">R$ 1.4M</div>
            <p className="text-xs text-muted-foreground">Receita total</p>
          </CardContent>
        </Card>
      </div>

      {}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, e-mail ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={productFilter} onValueChange={setProductFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tipo de Produto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="gados">Gados</SelectItem>
                <SelectItem value="cavalos">Cavalos</SelectItem>
                <SelectItem value="semen">Sêmen</SelectItem>
                <SelectItem value="produtos">Produtos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Gados</TableHead>
                  <TableHead>Cavalos</TableHead>
                  <TableHead>Sêmen</TableHead>
                  <TableHead>Produtos</TableHead>
                  <TableHead>Em Andamento</TableHead>
                  <TableHead>Canceladas</TableHead>
                  <TableHead>Realizadas</TableHead>
                  <TableHead>Reclamações</TableHead>
                  <TableHead>Cadastro</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendedores.map((vendedor) => (
                  <TableRow key={vendedor.id} className={vendedor.reclamacoes >= 10 ? "bg-destructive/10" : ""}>
                    <TableCell className="font-medium">#{vendedor.id}</TableCell>
                    <TableCell>{vendedor.nome}</TableCell>
                    <TableCell>{vendedor.email}</TableCell>
                    <TableCell>{vendedor.telefone}</TableCell>
                    <TableCell>{getStatusBadge(vendedor.status)}</TableCell>
                    <TableCell>{vendedor.gados}</TableCell>
                    <TableCell>{vendedor.cavalos}</TableCell>
                    <TableCell>{vendedor.semen}</TableCell>
                    <TableCell>{vendedor.produtos}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{vendedor.emAndamento}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive">{vendedor.canceladas}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-status-success text-white">{vendedor.realizadas}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={vendedor.reclamacoes >= 10 ? "destructive" : "outline"}>
                        {vendedor.reclamacoes}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{vendedor.cadastro}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" onClick={() => handleActionsClick(vendedor)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {}
      <Dialog open={salesInProgressOpen} onOpenChange={setSalesInProgressOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Vendas Em Andamento por Tipo</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {salesByType.map((item) => (
              <div key={item.type} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-medium">{item.type}</span>
                </div>
                <Badge variant="secondary">{item.count} vendas</Badge>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={salesCanceledOpen} onOpenChange={setSalesCanceledOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Vendas Canceladas por Tipo</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {salesByType.map((item) => (
              <div key={item.type} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-medium">{item.type}</span>
                </div>
                <Badge variant="destructive">{Math.floor(item.count * 0.1)} vendas</Badge>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={salesCompletedOpen} onOpenChange={setSalesCompletedOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Vendas Realizadas por Tipo</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {salesByType.map((item) => (
              <div key={item.type} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-medium">{item.type}</span>
                </div>
                <Badge className="bg-status-success text-white">{item.count} vendas</Badge>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={salesValueOpen} onOpenChange={setSalesValueOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Valor em Vendas por Categoria</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {salesValue.map((item) => (
              <div key={item.type} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{item.type}</span>
                <span className="font-bold text-status-success">R$ {item.value.toLocaleString('pt-BR')}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {}
      <Dialog open={actionsModalOpen} onOpenChange={setActionsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ações Administrativas</DialogTitle>
          </DialogHeader>
          {selectedVendedor && (
            <div className="space-y-3">
              <div className="p-3 bg-accent/20 rounded-lg">
                <p className="font-medium">{selectedVendedor.nome}</p>
                <p className="text-sm text-muted-foreground">{selectedVendedor.email}</p>
              </div>
              <Separator />
              <div className="grid gap-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => {
                  handleViewProfile(selectedVendedor);
                  setActionsModalOpen(false);
                }}>
                  Ver Perfil Completo
                </Button>
                <Button variant="outline" className="w-full justify-start">Editar Dados</Button>
                <Button variant="outline" className="w-full justify-start">Resetar Senha</Button>
                <Button variant="outline" className="w-full justify-start text-destructive">Suspender Conta</Button>
                <Button variant="outline" className="w-full justify-start">Ver Histórico de Transações</Button>
                <Button variant="outline" className="w-full justify-start">Ver Histórico de Reclamações</Button>
                <Button variant="outline" className="w-full justify-start">Acessar Chat</Button>
                <Button variant="outline" className="w-full justify-start">Acessar Conta (Modo Visualização)</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {}
      <Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Perfil Completo do Vendedor</DialogTitle>
          </DialogHeader>
          {selectedVendedor && (
            <div className="space-y-6">
              {}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total de Vendas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{selectedVendedor.realizadas}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Canceladas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-destructive">{selectedVendedor.canceladas}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Em Andamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-status-warning">{selectedVendedor.emAndamento}</p>
                  </CardContent>
                </Card>
              </div>

              {}
              <Card>
                <CardHeader>
                  <CardTitle>Desempenho nos Últimos 30 Dias</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="vendas" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {}
              <div>
                <h3 className="text-lg font-semibold mb-3">Produtos Ativos</h3>
                <div className="grid grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Gados</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xl font-bold">{selectedVendedor.gados}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Cavalos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xl font-bold">{selectedVendedor.cavalos}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Sêmen</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xl font-bold">{selectedVendedor.semen}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Produtos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xl font-bold">{selectedVendedor.produtos}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {}
              <Card>
                <CardHeader>
                  <CardTitle>Reputação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold">4.8</div>
                    <div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-yellow-500">★</span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">245 avaliações</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {}
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">Editar Dados</Button>
                <Button variant="outline">Resetar Senha</Button>
                <Button variant="outline" className="text-destructive">Suspender Conta</Button>
                <Button variant="outline">Modo Visualização</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Vendedores;
