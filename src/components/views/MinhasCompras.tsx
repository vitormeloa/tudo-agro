'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, SlidersHorizontal, RefreshCw, FileText, HelpCircle, ChevronRight, Grid3x3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import PurchaseDetailsModal from "@/components/PurchaseDetailsModal";

const MinhasCompras = () => {
  const [activeTab, setActiveTab] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [periodFilter, setPeriodFilter] = useState<string>("all");
  const { toast } = useToast();

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
    const matchesCategory = activeTab === "todos" || purchase.category === activeTab;
    const matchesSearch = purchase.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         purchase.id.toString().includes(searchQuery);
    
    const matchesPrice = priceRange === "all" || 
      (priceRange === "low" && purchase.totalPrice < 1000) ||
      (priceRange === "medium" && purchase.totalPrice >= 1000 && purchase.totalPrice < 10000) ||
      (priceRange === "high" && purchase.totalPrice >= 10000);
    
    const matchesStatus = statusFilter === "all" || purchase.status === statusFilter;
    
    const matchesPeriod = periodFilter === "all" || 
      (periodFilter === "week" && new Date(purchase.date.split('/').reverse().join('-')) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (periodFilter === "month" && new Date(purchase.date.split('/').reverse().join('-')) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    
    return matchesCategory && matchesSearch && matchesPrice && matchesStatus && matchesPeriod;
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

  const getCategoryIcon = (purchase: any) => {
    if (purchase.category === "animais") {
      const isHorse = purchase.itemType.toLowerCase().includes("cavalo") || 
                      purchase.itemType.toLowerCase().includes("égua") ||
                      purchase.itemType.toLowerCase().includes("mangalarga");
      
      return {
        icon: isHorse ? "🐎" : "🐂",
        bgColor: "bg-[hsl(30,40%,85%)]",
        iconColor: "text-white"
      };
    } else if (purchase.category === "semen") {
      return {
        icon: "💉",
        bgColor: "bg-[hsl(211,70%,85%)]",
        iconColor: "text-white"
      };
    } else if (purchase.category === "produtos") {
      return {
        icon: "📦",
        bgColor: "bg-[hsl(142,52%,85%)]",
        iconColor: "text-white"
      };
    }
    
    return {
      icon: "📦",
      bgColor: "bg-muted",
      iconColor: "text-muted-foreground"
    };
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-6 w-full">
        {}
        <div className="flex flex-col gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Minhas Compras</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Acompanhe todos os seus pedidos em um só lugar
            </p>
          </div>
          
          {}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por pedido..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsAdvancedFilterOpen(true)}
              className="gap-2 whitespace-nowrap"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filtros</span>
            </Button>
          </div>
        </div>

        {}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {visibleCategories.map((category) => (
            <Card
              key={category.name}
              onClick={() => setActiveTab(category.name)}
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
                  <span className="text-center">{category.icon} {category.label}</span>
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
        {filteredPurchases.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <p className="text-muted-foreground">Nenhuma compra encontrada</p>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredPurchases.map((purchase) => {
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
              <HelpCircle className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Dúvidas sobre suas compras?</p>
                <p className="text-sm text-muted-foreground">Nossa equipe está pronta para ajudar</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                Central de Ajuda
              </Button>
              <Button variant="outline">
                Política de Devolução
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {}
      <Dialog open={isAdvancedFilterOpen} onOpenChange={setIsAdvancedFilterOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Filtros Avançados</DialogTitle>
            <DialogDescription>
              Refine sua busca por faixa de preço, status e período
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {}
            <div className="space-y-2">
              <Label>Faixa de Preço</Label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar faixa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os preços</SelectItem>
                  <SelectItem value="low">Até R$ 1.000</SelectItem>
                  <SelectItem value="medium">R$ 1.000 - R$ 10.000</SelectItem>
                  <SelectItem value="high">Acima de R$ 10.000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="Preparando envio">Preparando envio</SelectItem>
                  <SelectItem value="Em transporte">Em transporte</SelectItem>
                  <SelectItem value="Entregue">Entregue</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {}
            <div className="space-y-2">
              <Label>Período da Compra</Label>
              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todo o período</SelectItem>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                setPriceRange("all");
                setStatusFilter("all");
                setPeriodFilter("all");
              }}
            >
              Limpar Filtros
            </Button>
            <Button 
              className="flex-1"
              onClick={() => setIsAdvancedFilterOpen(false)}
            >
              Aplicar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
