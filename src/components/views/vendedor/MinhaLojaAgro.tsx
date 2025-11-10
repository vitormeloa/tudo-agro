'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, TrendingUp, Star, Search, Package, ShoppingBag, BarChart3, ClipboardList, ExternalLink, Edit, Eye } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AdicionarProdutoModal from "@/components/vendedor/AdicionarProdutoModal";
import CriarCampanhaModal from "@/components/vendedor/CriarCampanhaModal";
import ProductDetailsModal from "@/components/ProductDetailsModal";
import { Skeleton } from "@/components/ui/skeleton";
const MinhaLojaAgro = () => {
  const router = useRouter();
  const [produtoModalOpen, setProdutoModalOpen] = useState(false);
  const [campanhaModalOpen, setCampanhaModalOpen] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all-status");
  const [categoryFilter, setCategoryFilter] = useState("all-cat");
  const [orderFilter, setOrderFilter] = useState("mais-vendidos");
  const [isLoading, setIsLoading] = useState(false);
  const products = [{
    id: 1,
    name: "Ração Premium Bovino 50kg",
    category: "Alimentação",
    price: 145.00,
    stock: 50,
    status: "Ativo",
    rating: 4.9,
    reviews: 28,
    image: "/fotos/produtos/racao-1.jpg",
    totalSales: 180
  }, {
    id: 2,
    name: "Vermífugo Ivermectina",
    category: "Saúde Animal",
    price: 89.90,
    stock: 120,
    status: "Ativo",
    rating: 5.0,
    reviews: 45,
    image: "/fotos/produtos/verme.png",
    totalSales: 250
  }, {
    id: 3,
    name: "Cerca Elétrica 500m",
    category: "Infraestrutura",
    price: 450.00,
    stock: 15,
    status: "Ativo",
    rating: 4.7,
    reviews: 12,
    image: "/fotos/produtos/cerca.png",
    totalSales: 60
  }, {
    id: 4,
    name: "Bebedouro Automático",
    category: "Equipamentos",
    price: 320.00,
    stock: 0,
    status: "Sem Estoque",
    rating: 4.8,
    reviews: 19,
    image: "/fotos/produtos/bebedouro.png",
    totalSales: 45
  }, {
    id: 5,
    name: "Suplemento Mineral",
    category: "Alimentação",
    price: 78.50,
    stock: 80,
    status: "Ativo",
    rating: 4.6,
    reviews: 34,
    image: "/fotos/produtos/salcorte.png",
    totalSales: 200
  }, {
    id: 6,
    name: "Kit Ferramentas Veterinárias",
    category: "Equipamentos",
    price: 890.00,
    stock: 8,
    status: "Ativo",
    rating: 4.9,
    reviews: 7,
    image: "/fotos/produtos/kit.png",
    totalSales: 25
  }];
  const getStatusBadge = (status: string) => {
    const statusMap: {
      [key: string]: {
        variant: "default" | "secondary" | "destructive" | "outline";
      };
    } = {
      "Ativo": {
        variant: "default"
      },
      "Sem Estoque": {
        variant: "destructive"
      },
      "Pausado": {
        variant: "secondary"
      }
    };
    return statusMap[status] || {
      variant: "outline"
    };
  };
  const handleViewPublicStore = () => {
    window.open('/loja/minha-fazenda', '_blank');
  };
  const handleViewProductPublic = (productId: number) => {
    window.open(`/loja/minha-fazenda/produto/${productId}`, '_blank');
  };
  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };
  const handleEditProduct = (product: any) => {
    console.log("Editar produto:", product);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all-status" || statusFilter === "active" && product.status === "Ativo" || statusFilter === "out" && product.status === "Sem Estoque" || statusFilter === "paused" && product.status === "Pausado";
    const matchesCategory = categoryFilter === "all-cat" || categoryFilter === "food" && product.category === "Alimentação" || categoryFilter === "health" && product.category === "Saúde Animal" || categoryFilter === "infra" && product.category === "Infraestrutura" || categoryFilter === "equip" && product.category === "Equipamentos";
    return matchesSearch && matchesStatus && matchesCategory;
  }).sort((a, b) => {
    if (orderFilter === "mais-vendidos") return b.totalSales - a.totalSales;
    if (orderFilter === "maior-estoque") return b.stock - a.stock;
    if (orderFilter === "avaliacao") return b.rating - a.rating;
    return 0;
  });
  return <div className="space-y-6">
      {}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Minha Loja Agro</h1>
          <p className="text-muted-foreground mt-1">Gerencie seus produtos e estoque</p>
        </div>
        
        {}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2" onClick={() => router.push('/dashboard/vendedor/dashboard')}>
            <BarChart3 className="h-4 w-4" />
            Dashboard de Vendas
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleViewPublicStore}>
            <ExternalLink className="h-4 w-4" />
            Ver Vitrine Pública
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90" onClick={() => setProdutoModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Adicionar Produto
          </Button>
        </div>
      </div>

      {}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Produtos na Vitrine</p>
                <p className="text-2xl font-bold">{products.filter(p => p.status === "Ativo").length}</p>
                <p className="text-xs text-muted-foreground">publicados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-status-success/10 rounded-lg">
                <BarChart3 className="h-6 w-6 text-status-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pedidos no Mês</p>
                <p className="text-2xl font-bold">87</p>
                <p className="text-xs text-muted-foreground">aprovados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-status-info/10 rounded-lg">
                <ClipboardList className="h-6 w-6 text-status-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vendas Totais</p>
                <p className="text-2xl font-bold">825</p>
                <p className="text-xs text-muted-foreground">pedidos realizados</p>
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
                <p className="text-sm text-muted-foreground">Avaliação da Loja</p>
                <p className="text-2xl font-bold">4.8⭐</p>
                <p className="text-xs text-muted-foreground">245 avaliações</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estoque Total</p>
                <p className="text-2xl font-bold">{products.reduce((sum, p) => sum + p.stock, 0)}</p>
                <p className="text-xs text-muted-foreground">unidades</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar produtos..." className="pl-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">Todos Status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="out">Sem Estoque</SelectItem>
                <SelectItem value="paused">Pausado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-cat">Todas Categorias</SelectItem>
                <SelectItem value="food">Alimentação</SelectItem>
                <SelectItem value="health">Saúde Animal</SelectItem>
                <SelectItem value="infra">Infraestrutura</SelectItem>
                <SelectItem value="equip">Equipamentos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={orderFilter} onValueChange={setOrderFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mais-vendidos">Mais Vendidos</SelectItem>
                <SelectItem value="maior-estoque">Maior Estoque</SelectItem>
                <SelectItem value="avaliacao">Melhor Avaliação</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {}
      {isLoading ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-20 w-20 rounded-lg mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>)}
        </div> : filteredProducts.length === 0 ? <Card className="py-12">
          <CardContent className="text-center">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Nenhum produto encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || statusFilter !== "all-status" || categoryFilter !== "all-cat" ? "Tente ajustar os filtros de busca" : "Você ainda não adicionou produtos. Clique em 'Adicionar Produto' para começar."}
            </p>
            {!searchQuery && statusFilter === "all-status" && categoryFilter === "all-cat" && <Button onClick={() => setProdutoModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Primeiro Produto
              </Button>}
          </CardContent>
        </Card> : <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map(product => <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-start justify-between mt-3">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant={getStatusBadge(product.status).variant}>
                    {product.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Categoria:</span>
                    <span className="font-medium text-sm">{product.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Preço:</span>
                    <span className="font-bold text-primary">
                      R$ {product.price.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2
                })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Estoque:</span>
                    <span className={`font-medium ${product.stock === 0 ? 'text-destructive font-bold' : ''}`}>
                      {product.stock === 0 ? "Sem Estoque" : `${product.stock} un.`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avaliação:</span>
                    <span className="font-medium flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  
                  {}
                  <div className="pt-3 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(product)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Detalhes
                      </Button>
                    </div>
                    
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>}

      {}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg mb-1">Impulsione suas Vendas!</h3>
              <p className="text-sm text-muted-foreground">
                Crie campanhas relâmpago e descontos programados
              </p>
            </div>
            <Button className="gap-2 bg-primary hover:bg-primary/90" onClick={() => setCampanhaModalOpen(true)}>
              <TrendingUp className="h-4 w-4" />
              Criar Destaque/Campanha
            </Button>
          </div>
        </CardContent>
      </Card>

      {}
      <AdicionarProdutoModal open={produtoModalOpen} onOpenChange={setProdutoModalOpen} />
      <CriarCampanhaModal open={campanhaModalOpen} onOpenChange={setCampanhaModalOpen} />
      {selectedProduct && <ProductDetailsModal isOpen={showProductDetails} onClose={() => setShowProductDetails(false)} product={{
      ...selectedProduct,
      images: ["/placeholder.svg"],
      description: `${selectedProduct.name} - Produto de alta qualidade para sua propriedade rural.`,
      characteristics: [`Categoria: ${selectedProduct.category}`, `Estoque disponível: ${selectedProduct.stock} unidades`, `Avaliação: ${selectedProduct.rating} estrelas (${selectedProduct.reviews} avaliações)`],
      pricePaid: selectedProduct.price,
      productCode: `PROD-${selectedProduct.id}`
    }} />}
    </div>;
};
export default MinhaLojaAgro;