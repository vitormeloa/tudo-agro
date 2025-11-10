'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [actionsModalOpen, setActionsModalOpen] = useState(false);
  const [selectedUserForActions, setSelectedUserForActions] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    const variants = {
      ativo: { label: "Ativo", className: "bg-[#34A853] text-white" },
      inativo: { label: "Inativo", className: "bg-[#BDBDBD] text-white" },
      suspenso: { label: "Suspenso", className: "bg-[#EA4335] text-white" },
    };
    const variant = variants[status as keyof typeof variants] || variants.ativo;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const compradores = [
    { id: 1, nome: "João Silva", email: "joao@email.com", telefone: "(11) 98765-4321", status: "ativo", compras: 12, reclamacoes: 0, cadastro: "05/11/2025 às 10:01" },
    { id: 2, nome: "Maria Santos", email: "maria@email.com", telefone: "(21) 97654-3210", status: "ativo", compras: 8, reclamacoes: 1, cadastro: "04/11/2025 às 15:30" },
    { id: 3, nome: "Pedro Costa", email: "pedro@email.com", telefone: "(31) 96543-2109", status: "suspenso", compras: 3, reclamacoes: 5, cadastro: "03/11/2025 às 09:15" },
  ];

  const vendedores = [
    { id: 1, nome: "Fazenda Boa Vista", email: "contato@boavista.com", telefone: "(16) 98888-7777", status: "ativo", gados: 45, cavalos: 12, semen: 230, produtos: 18, vendas: 156, reclamacoes: 2, cadastro: "01/10/2025 às 08:00" },
    { id: 2, nome: "Haras Estrela", email: "haras@estrela.com", telefone: "(19) 97777-6666", status: "ativo", gados: 5, cavalos: 38, semen: 0, produtos: 5, vendas: 89, reclamacoes: 0, cadastro: "15/09/2025 às 14:20" },
    { id: 3, nome: "GenéticaPro", email: "vendas@geneticapro.com", telefone: "(17) 96666-5555", status: "ativo", gados: 0, cavalos: 0, semen: 450, produtos: 25, vendas: 234, reclamacoes: 1, cadastro: "20/08/2025 às 11:45" },
  ];

  const handleViewProfile = (user: any, type: "comprador" | "vendedor") => {
    setSelectedUser({ ...user, type });
    setUserDetailsOpen(true);
  };

  const handleActionsClick = (user: any, type: "comprador" | "vendedor") => {
    setSelectedUserForActions({ ...user, type });
    setActionsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gerenciamento de Usuários</h1>
        <p className="text-muted-foreground mt-1">Gerencie compradores e vendedores da plataforma</p>
      </div>

      <Tabs defaultValue="compradores" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="compradores">Compradores (PF)</TabsTrigger>
          <TabsTrigger value="vendedores">Vendedores (PJ)</TabsTrigger>
        </TabsList>

        <TabsContent value="compradores" className="space-y-4">
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                    <SelectItem value="suspenso">Suspenso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Compras</TableHead>
                    <TableHead>Reclamações</TableHead>
                    <TableHead>Cadastro</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {compradores.map((comprador) => (
                    <TableRow key={comprador.id}>
                      <TableCell className="font-medium">#{comprador.id}</TableCell>
                      <TableCell>{comprador.nome}</TableCell>
                      <TableCell>{comprador.email}</TableCell>
                      <TableCell>{comprador.telefone}</TableCell>
                      <TableCell>{getStatusBadge(comprador.status)}</TableCell>
                      <TableCell>{comprador.compras}</TableCell>
                      <TableCell>
                        <Badge variant={comprador.reclamacoes > 0 ? "destructive" : "secondary"}>
                          {comprador.reclamacoes}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{comprador.cadastro}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleActionsClick(comprador, "comprador")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendedores" className="space-y-4">
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                    <SelectItem value="suspenso">Suspenso</SelectItem>
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
                      <TableHead>Vendas</TableHead>
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
                        <TableCell>{vendedor.vendas}</TableCell>
                        <TableCell>
                          <Badge variant={vendedor.reclamacoes >= 10 ? "destructive" : vendedor.reclamacoes > 0 ? "secondary" : "outline"}>
                            {vendedor.reclamacoes}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{vendedor.cadastro}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleActionsClick(vendedor, "vendedor")}
                          >
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
        </TabsContent>
      </Tabs>

      {}
      <Dialog open={actionsModalOpen} onOpenChange={setActionsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ações Administrativas</DialogTitle>
          </DialogHeader>
          {selectedUserForActions && (
            <div className="space-y-3">
              <div className="p-3 bg-accent/20 rounded-lg">
                <p className="font-medium">{selectedUserForActions.nome}</p>
                <p className="text-sm text-muted-foreground">{selectedUserForActions.email}</p>
              </div>
              <Separator />
              <div className="grid gap-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => {
                  handleViewProfile(selectedUserForActions, selectedUserForActions.type);
                  setActionsModalOpen(false);
                }}>
                  Ver Perfil Completo
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Editar Dados
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Resetar Senha
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  Suspender Conta
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Ver Histórico de Transações
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Ver Histórico de Reclamações
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Acessar Chat
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Acessar Conta (Modo Visualização)
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {}
      <Dialog open={userDetailsOpen} onOpenChange={setUserDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Perfil Completo</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              {}
              <div>
                <h3 className="text-lg font-semibold mb-3">Dados Cadastrais</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p className="font-medium">{selectedUser.nome}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <p className="font-medium">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <p className="font-medium">{selectedUser.telefone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    {getStatusBadge(selectedUser.status)}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data de Cadastro</p>
                    <p className="font-medium">{selectedUser.cadastro}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Último Acesso</p>
                    <p className="font-medium">Hoje às 14:23</p>
                  </div>
                </div>
              </div>

              <Separator />

              {}
              <div>
                <h3 className="text-lg font-semibold mb-3">Atividades</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedUser.type === "comprador" ? (
                    <>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Compras</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{selectedUser.compras}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Reclamações</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{selectedUser.reclamacoes}</p>
                        </CardContent>
                      </Card>
                    </>
                  ) : (
                    <>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Gados</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{selectedUser.gados}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Cavalos</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{selectedUser.cavalos}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Sêmen</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{selectedUser.semen}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Produtos</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{selectedUser.produtos}</p>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>

              <Separator />

              {}
              <div>
                <h3 className="text-lg font-semibold mb-3">Ações Administrativas</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline">Editar Dados</Button>
                  <Button variant="outline">Resetar Senha</Button>
                  <Button variant="outline" className="text-destructive hover:text-destructive">Suspender Conta</Button>
                  <Button variant="outline">Modo Visualização</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Usuarios;
