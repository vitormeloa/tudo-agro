'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, SlidersHorizontal, RefreshCw, FileText, HelpCircle, ChevronRight, Grid3x3, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import PurchaseDetailsModal from "@/components/PurchaseDetailsModal";

const MinhasCompras = () => {
  const [activeTab, setActiveTab] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [periodFilter, setPeriodFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>('recente');
  const { toast } = useToast();

  const categoriesConfig = [
    { name: 'animais', label: 'Animais', color: '#B8E8D1' },
    { name: 'semen', label: 'Sêmen', color: '#B8E8D1' },
    { name: 'produtos', label: 'Produtos', color: '#B8E8D1' },
    { name: 'nutricao animal', label: 'Nutrição Animal', color: '#B8E8D1' },
    { name: 'saude e bem-estar animal', color: '#B8E8D1' },
    { name: 'reproducao e genetica', label: 'Reprodução e Genética', color: '#B8E8D1' },
    { name: 'selaria e utilidades', label: 'Selaria e Utilidades', color: '#B8E8D1' },
    { name: 'equipamentos e infraestrutura rural', label: 'Equipamentos e Infraestrutura Rural', color: '#B8E8D1' },
    { name: 'vestuario e lifestyle agro', label: 'Vestuário e Lifestyle Agro', color: '#B8E8D1' },
    { name: 'sementes e mudas', label: 'Sementes e Mudas', color: '#B8E8D1' },
    { name: 'insumos agricolas e fertilizantes', label: 'Insumos Agrícolas e Fertilizantes', color: '#B8E8D1' },
    { name: 'higiene, limpeza e desinfeccao', label: 'Higiene, Limpeza e Desinfecção', color: '#B8E8D1' },
    { name: 'suplementos e aditivos', label: 'Suplementos e Aditivos', color: '#B8E8D1' },
    { name: 'bebidas artesanais e produtos da fazenda', label: 'Bebidas Artesanais e Produtos da Fazenda', color: '#B8E8D1' },
    { name: 'outros', label: 'Outros', color: '#B8E8D1' },
  ];

  const allPurchases = [
    {
      id: 1,
      name: "Touro Nelore PO Certificado",
      date: "15/01/2025",
      time: "10:42",
      status: "Em transporte",
      image: "/fotos/animais/touro-nelore.jpeg",
      category: "animais",
      itemType: "Touro Nelore",
      quantity: 1,
      unitPrice: 12500,
      shippingPrice: 0,
      totalPrice: 12500,
      paymentMethod: "Pix",
      paymentStatus: "Aprovado",
      seller: {
        name: "Fazenda Santa Maria",
        rating: 4.8,
        location: "Uberaba, MG"
      },
      tracking: {
        carrier: "AgroFast",
        code: "AGRO123456789",
        estimatedDelivery: "20/01/2025",
        steps: [
          { label: "Pedido confirmado", completed: true, date: "15/01/2025 10:42" },
          { label: "Preparando envio", completed: true, date: "15/01/2025 14:20" },
          { label: "Em transporte", completed: true, date: "16/01/2025 08:15" },
          { label: "Entregue", completed: false, date: "" }
        ]
      }
    },
    {
      id: 2,
      name: "Égua Mangalarga Marchador",
      date: "10/01/2025",
      time: "15:30",
      status: "Preparando envio",
      image: "/fotos/animais/egua-mangalarga.jpeg",
      category: "animais",
      itemType: "Égua Mangalarga",
      quantity: 1,
      unitPrice: 18000,
      shippingPrice: 0,
      totalPrice: 18000,
      paymentMethod: "Boleto",
      paymentStatus: "Aprovado",
      seller: {
        name: "Haras Vale Verde",
        rating: 4.9,
        location: "Barretos, SP"
      },
      tracking: {
        carrier: "TransAgro",
        code: "TRANS987654321",
        estimatedDelivery: "25/01/2025",
        steps: [
          { label: "Pedido confirmado", completed: true, date: "10/01/2025 15:30" },
          { label: "Preparando envio", completed: true, date: "11/01/2025 09:00" },
          { label: "Em transporte", completed: false, date: "" },
          { label: "Entregue", completed: false, date: "" }
        ]
      }
    },
    {
      id: 3,
      name: "Sêmen Touro Angus Premium - 10 doses",
      date: "08/01/2025",
      time: "11:15",
      status: "Entregue",
      image: "/fotos/animais/angus-premium.jpg",
      category: "semen",
      itemType: "Sêmen Bovino",
      quantity: 10,
      unitPrice: 45,
      shippingPrice: 80,
      totalPrice: 530,
      paymentMethod: "Cartão de Crédito",
      paymentStatus: "Aprovado",
      seller: {
        name: "GenéticaBov",
        rating: 5.0,
        location: "Uberlândia, MG"
      },
      tracking: {
        carrier: "Sedex",
        code: "BR123456789SE",
        estimatedDelivery: "10/01/2025",
        steps: [
          { label: "Pedido confirmado", completed: true, date: "08/01/2025 11:15" },
          { label: "Preparando envio", completed: true, date: "08/01/2025 14:00" },
          { label: "Em transporte", completed: true, date: "09/01/2025 06:30" },
          { label: "Entregue", completed: true, date: "10/01/2025 10:22" }
        ]
      }
    },
    {
      id: 4,
      name: "Semente Milho BM 3066 - 20kg",
      date: "05/01/2025",
      time: "09:20",
      status: "Entregue",
      image: "/fotos/produtos/semente-milho.jpeg",
      category: "produtos",
      itemType: "Sementes",
      quantity: 1,
      unitPrice: 890,
      shippingPrice: 0,
      totalPrice: 890,
      paymentMethod: "Pix",
      paymentStatus: "Aprovado",
      seller: {
        name: "AgroSeeds",
        rating: 4.7,
        location: "Londrina, PR"
      },
      tracking: {
        carrier: "Transportadora ABC",
        code: "ABC789456123",
        estimatedDelivery: "08/01/2025",
        steps: [
          { label: "Pedido confirmado", completed: true, date: "05/01/2025 09:20" },
          { label: "Preparando envio", completed: true, date: "05/01/2025 16:00" },
          { label: "Em transporte", completed: true, date: "06/01/2025 08:00" },
          { label: "Entregue", completed: true, date: "08/01/2025 14:15" }
        ]
      }
    },
    {
      id: 5,
      name: "Ração Premium para Gado - 50kg",
      date: "03/01/2025",
      time: "14:00",
      status: "Entregue",
      image: "/fotos/produtos/racao-1.jpg",
      category: "produtos",
      itemType: "Ração",
      quantity: 10,
      unitPrice: 120,
      shippingPrice: 150,
      totalPrice: 1350,
      paymentMethod: "Boleto",
      paymentStatus: "Aprovado",
      seller: {
        name: "NutriAgro",
        rating: 4.6,
        location: "Goiânia, GO"
      },
      tracking: {
        carrier: "Logística Rural",
        code: "LR456789123",
        estimatedDelivery: "07/01/2025",
        steps: [
          { label: "Pedido confirmado", completed: true, date: "03/01/2025 14:00" },
          { label: "Preparando envio", completed: true, date: "04/01/2025 10:00" },
          { label: "Em transporte", completed: true, date: "05/01/2025 07:00" },
          { label: "Entregue", completed: true, date: "07/01/2025 11:30" }
        ]
      }
    }
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      "Preparando envio": {
        variant: "warning" as const,
        className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 border-amber-200 dark:border-amber-800"
      },
      "Em transporte": {
        variant: "default" as const,
        className: "bg-primary/10 text-primary dark:bg-blue-900/30 dark:text-blue-200 border-blue-200 dark:border-blue-800"
      },
      "Entregue": {
        variant: "success" as const,
        className: "bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary/30 border-primary/20 dark:border-primary"
      },
      "Cancelado": {
        variant: "destructive" as const,
        className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 border-red-200 dark:border-red-800"
      },
    };
    return configs[status as keyof typeof configs] || configs["Preparando envio"];
  };

  const filteredPurchases = allPurchases.filter(purchase => {
    // Filter by category/tab
    if (activeTab !== "todos" && purchase.category !== activeTab) return false;

    // Filter by search query
    if (searchQuery && !purchase.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

    // Filter by status
    if (statusFilter !== "all" && purchase.status !== statusFilter) return false;

    // Filter by price range
    if (priceRange !== "all") {
      const price = purchase.totalPrice;
      if (priceRange === "0-1000" && price > 1000) return false;
      if (priceRange === "1000-5000" && (price < 1000 || price > 5000)) return false;
      if (priceRange === "5000+" && price < 5000) return false;
    }

    // Filter by period
    if (periodFilter !== "all") {
      const purchaseDate = new Date(purchase.date.split('/').reverse().join('-'));
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));

      if (periodFilter === "7days" && diffDays > 7) return false;
      if (periodFilter === "30days" && diffDays > 30) return false;
      if (periodFilter === "90days" && diffDays > 90) return false;
    }

    return true;
  });

  const sortedPurchases = [...filteredPurchases].sort((a, b) => {
    switch (sortBy) {
      case 'preco-menor':
        return a.totalPrice - b.totalPrice;
      case 'preco-maior':
        return b.totalPrice - a.totalPrice;
      case 'recente':
        return new Date(b.date.split('/').reverse().join('-')).getTime() - new Date(a.date.split('/').reverse().join('-')).getTime();
      default:
        return new Date(b.date.split('/').reverse().join('-')).getTime() - new Date(a.date.split('/').reverse().join('-')).getTime();
    }
  });

  const handleBuyAgain = (purchase: any) => {
    toast({
      title: "Redirecionando...",
      description: `Abrindo anúncio de ${purchase.name}`,
    });
  };

  const handleDownloadInvoice = (purchase: any) => {
    toast({
      title: "Download iniciado",
      description: `Nota fiscal do pedido #${purchase.id}`,
    });
  };

  const getCategoryStats = (category: string) => {
    if (category === "todos") return allPurchases.length;
    return allPurchases.filter(p => p.category === category).length;
  };

  const getCategoryColor = (categoryName: string) => {
    const config = categoriesConfig.find(cat => cat.name === categoryName);
    return config ? config.color : '#F5F5F5';
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setPriceRange('all');
    setStatusFilter('all');
    setPeriodFilter('all');
    setActiveTab('todos');
  };

  const hasActiveFilters = !!(searchQuery || priceRange !== 'all' || statusFilter !== 'all' || periodFilter !== 'all' || activeTab !== 'todos');

  const categories = categoriesConfig.map(cat => ({
    ...cat,
    count: getCategoryStats(cat.name)
  })).filter(cat => cat.count > 0);

  const visibleCategories = categories.slice(0, 5);
  const hiddenCategories = categories.slice(5);

  return (
    <>
      <div className="space-y-4 sm:space-y-6 w-full">
        {}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Minhas Compras</h1>
          <p className="text-muted-foreground mt-1">Acompanhe todos os seus pedidos em um só lugar</p>
        </div>

        <Card className="shadow-sm border">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Buscar por nome, ID do pedido..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              <Button
                className="bg-primary hover:bg-[#2E7A5A] text-white px-8 h-12"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filtros
              </Button>
            </div>

            {showFilters && (
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Faixa de Preço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os preços</SelectItem>
                      <SelectItem value="0-1000">Até R$ 1.000</SelectItem>
                      <SelectItem value="1000-5000">R$ 1.000 - R$ 5.000</SelectItem>
                      <SelectItem value="5000+">Acima de R$ 5.000</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="Preparando envio">Preparando envio</SelectItem>
                      <SelectItem value="Em transporte">Em transporte</SelectItem>
                      <SelectItem value="Entregue">Entregue</SelectItem>
                      <SelectItem value="Cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={periodFilter} onValueChange={setPeriodFilter}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todo o período</SelectItem>
                      <SelectItem value="7days">Últimos 7 dias</SelectItem>
                      <SelectItem value="30days">Últimos 30 dias</SelectItem>
                      <SelectItem value="90days">Últimos 90 dias</SelectItem>
                    </SelectContent>
                  </Select>

                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      className="h-10 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                      onClick={clearAllFilters}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Limpar Filtros
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {}
          <h3 className="text-lg font-semibold text-[#101828]">Categorias Populares</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {visibleCategories.map((category) => (
            <Card
              key={category.name}
              onClick={() => setActiveTab(activeTab === category.name ? 'todos' : category.name)}
              className={`hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                activeTab === category.name ? 'ring-2 ring-emerald-500 shadow-lg' : ''
              }`}
            >
              <CardContent className="p-3 text-center">
                <div
                  className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium mb-2 max-w-full break-words leading-tight"
                  style={{
                    backgroundColor: category.color,
                    color: '#1F2937',
                  }}
                >
                  <span className="text-center">{category.label}</span>
                </div>
                <div className="text-xl font-bold text-[#101828]">{category.count}</div>
                <div className="text-xs text-gray-500">compras</div>
              </CardContent>
            </Card>
          ))}

          {hiddenCategories.length > 0 && (
            <Card
              className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 border-dashed border-gray-300 hover:border-primary"
              onClick={() => setShowCategoriesModal(true)}
            >
              <CardContent className="p-3 text-center flex flex-col items-center justify-center min-h-[100px]">
                <Grid3x3 className="w-6 h-6 text-gray-400 mb-2" />
                <div className="text-sm font-semibold text-gray-700 mb-1">Ver Mais</div>
                <div className="text-xs text-gray-500">{hiddenCategories.length} categorias</div>
              </CardContent>
            </Card>
          )}
        </div>

        <Dialog open={showCategoriesModal} onOpenChange={setShowCategoriesModal}>
          <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Todas as Categorias</DialogTitle>
              <DialogDescription>
                Explore todas as {categories.length} categorias disponiveis
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {hiddenCategories.map((category) => (
                  <Card
                    key={category.name}
                    onClick={() => {
                      setActiveTab(activeTab === category.name ? 'todos' : category.name);
                      setShowCategoriesModal(false);
                    }}
                    className={`hover:shadow-lg transition-all duration-200 cursor-pointer ${
                      activeTab === category.name ? 'border-primary ring-2 ring-primary/30' : ''
                    }`}
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className="inline-flex px-4 py-2 rounded-full text-sm font-medium mb-3"
                        style={{
                          backgroundColor: category.color,
                          color: '#1F2937'
                        }}
                      >
                        {category.label}
                      </div>
                      <div className="text-2xl font-bold text-[#101828]">{category.count}</div>
                      <div className="text-sm text-gray-500">compras</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 hidden">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1">
            <TabsTrigger value="todos" className="flex flex-col gap-1 py-3">
              <span className="font-semibold">Todos</span>
              <span className="text-xs text-muted-foreground">{getCategoryStats("todos")}</span>
            </TabsTrigger>
            <TabsTrigger value="animais" className="flex flex-col gap-1 py-3">
              <span className="font-semibold">Animais</span>
              <span className="text-xs text-muted-foreground">{getCategoryStats("animais")}</span>
            </TabsTrigger>
            <TabsTrigger value="semen" className="flex flex-col gap-1 py-3">
              <span className="font-semibold">Sêmen</span>
              <span className="text-xs text-muted-foreground">{getCategoryStats("semen")}</span>
            </TabsTrigger>
            <TabsTrigger value="produtos" className="flex flex-col gap-1 py-3">
              <span className="font-semibold">Produtos</span>
              <span className="text-xs text-muted-foreground">{getCategoryStats("produtos")}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 hidden">
          </TabsContent>
        </Tabs>

        {}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-gray-600">
            Mostrando <span className="font-semibold text-[#101828]">{sortedPurchases.length}</span> de <span className="font-semibold text-[#101828]">{allPurchases.length}</span> resultados
          </div>
          <Select value={sortBy} onValueChange={(value) => { setSortBy(value); }}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recente">Mais Recentes</SelectItem>
              <SelectItem value="preco-menor">Menor Preço</SelectItem>
              <SelectItem value="preco-maior">Maior Preço</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {sortedPurchases.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <p className="text-muted-foreground">Nenhuma compra encontrada</p>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {sortedPurchases.map((purchase) => {
              const isDelivered = purchase.status === "Entregue";
              const shouldShowTracking = ["Pedido confirmado", "Preparando envio", "Em transporte"].includes(purchase.status);

              return (
                <Card 
                  key={purchase.id} 
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border cursor-pointer"
                  onClick={() => setSelectedPurchase(purchase)}
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 relative">
                      <ChevronRight className="absolute top-0 right-0 h-5 w-5 text-muted-foreground sm:hidden" />
                      {}
                      <div className="flex-shrink-0 mx-auto sm:mx-0">
                        <img
                          src={purchase.image}
                          alt={purchase.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-sm"
                        />
                      </div>

                      {}
                      <div className="flex-1 min-w-0 space-y-3">
                        <div>
                          <h3 className="font-semibold text-base sm:text-lg leading-tight">
                            {purchase.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Pedido #{purchase.id} • {purchase.date} às {purchase.time}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <Badge className={getStatusConfig(purchase.status).className}>
                            {purchase.status}
                          </Badge>
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            {purchase.seller.name} • {purchase.seller.location}
                          </span>
                        </div>

                        <div className="text-base sm:text-lg font-bold text-primary">
                          R$ {purchase.totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>

                        {}
                        <div className="hidden sm:flex flex-col sm:flex-row gap-2 pt-2">
                          <Button
                            variant="default"
                            size="sm"
                            className="w-full sm:flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPurchase(purchase);
                            }}
                          >
                            Ver detalhes
                          </Button>
                          
                          {}
                          {isDelivered ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full sm:flex-1 gap-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBuyAgain(purchase);
                                }}
                              >
                                <RefreshCw className="h-4 w-4" />
                                Comprar Novamente
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full sm:flex-1 gap-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDownloadInvoice(purchase);
                                }}
                              >
                                <FileText className="h-4 w-4" />
                                Nota Fiscal
                              </Button>
                            </>
                          ) : shouldShowTracking ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full sm:flex-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(`https://rastreamento.com/${purchase.tracking.code}`, '_blank');
                              }}
                            >
                              Rastrear pedido
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {}
      <Card className="bg-muted/50 mt-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-10 w-10 text-primary" />
              <div>
                <p className="font-medium">Dúvidas sobre suas compras?</p>
                <p className="text-sm text-muted-foreground">Nossa equipe está pronta para ajudar</p>
              </div>
            </div>
            <div className="flex gap-3">
                <Button variant="outline">
                    Fale com Suporte
                </Button>
                <Button variant="outline">
                    Consultar AgroIA
                </Button>
            </div>
          </div>
        </div>
      </Card>

      {}
      {selectedPurchase && (
        <PurchaseDetailsModal
          isOpen={!!selectedPurchase}
          onClose={() => setSelectedPurchase(null)}
          purchase={selectedPurchase}
        />
      )}
    </>
  );
};

export default MinhasCompras;
