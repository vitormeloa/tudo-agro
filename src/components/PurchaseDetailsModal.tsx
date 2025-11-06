'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, MessageSquare, Star, FileText, Store, MapPin, Truck, CheckCircle, Clock, X, PackageCheck } from "lucide-react";
import { useState } from "react";
import ProductDetailsModal from "./ProductDetailsModal";
import SupportChatModal from "./SupportChatModal";
import ReturnPolicyModal from "./ReturnPolicyModal";
import MarkAsReceivedModal from "./MarkAsReceivedModal";
import { useToast } from "@/hooks/use-toast";

interface PurchaseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchase: {
    id: number;
    name: string;
    date: string;
    time?: string;
    status: string;
    image: string;
    itemType?: string;
    quantity?: number;
    unitPrice?: number;
    shippingPrice?: number;
    totalPrice?: number;
    paymentMethod?: string;
    paymentStatus?: string;
    seller?: {
      name: string;
      location: string;
      rating: number;
    };
    tracking?: {
      carrier: string;
      code: string;
      estimatedDelivery: string;
      steps: {
        label: string;
        completed: boolean;
        current: boolean;
      }[];
    };
  };
}

const PurchaseDetailsModal = ({ isOpen, onClose, purchase }: PurchaseDetailsModalProps) => {
  const { toast } = useToast();
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [showSupportChat, setShowSupportChat] = useState(false);
  const [showReturnPolicy, setShowReturnPolicy] = useState(false);
  const [showMarkAsReceived, setShowMarkAsReceived] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      preparing: {
        label: "🔄 Preparando envio",
        variant: "status-warning" as const,
      },
      transit: {
        label: "🚚 Em transporte",
        variant: "status-info" as const,
      },
      delivered: {
        label: "✅ Entregue",
        variant: "status-success" as const,
      },
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.preparing;
  };

  const statusInfo = getStatusBadge(purchase.status);

  // Default values
  const itemType = purchase.itemType || "Animal / Genética / Produto físico";
  const quantity = purchase.quantity || 1;
  const unitPrice = purchase.unitPrice || 25000.00;
  const shippingPrice = purchase.shippingPrice || 350.00;
  const totalPrice = purchase.totalPrice || 25350.00;
  const paymentMethod = purchase.paymentMethod || "Pix / Boleto / Cartão / Transferência";
  const paymentStatus = purchase.paymentStatus || "Confirmado / Aguardando / Cancelado";
  
  const seller = purchase.seller || {
    name: "Fazenda Santa Helena",
    location: "Ribeirão Preto, SP",
    rating: 4.8
  };

  const tracking = purchase.tracking || {
    carrier: "AgroFast",
    code: "AGRO123456789",
    estimatedDelivery: "Até 20/01/2025",
    steps: [
      { label: "Pedido confirmado", completed: true, current: false },
      { label: "Preparando envio", completed: purchase.status !== "preparing", current: purchase.status === "preparing" },
      { label: "Em transporte", completed: purchase.status === "delivered", current: purchase.status === "transit" },
      { label: "Entregue", completed: purchase.status === "delivered", current: false }
    ]
  };

  const getStepIcon = (index: number, step: { completed: boolean; current: boolean }) => {
    if (index === 0) return <CheckCircle className="h-4 w-4 text-white" />;
    if (index === 1) return <Clock className="h-4 w-4 text-white" />;
    if (index === 2) return <Truck className="h-4 w-4 text-white" />;
    if (index === 3) return <PackageCheck className="h-4 w-4 text-white" />;
    return <div className="h-4 w-4" />;
  };

  const handleMarkAsReceived = (rating: number, comment: string, recommend: boolean) => {
    console.log("Review submitted:", { rating, comment, recommend });
    toast({
      title: "Avaliação enviada!",
      description: "Obrigado pelo seu feedback. Sua avaliação foi registrada com sucesso.",
    });
  };

  const handleRequestReturn = () => {
    setShowReturnPolicy(false);
    toast({
      title: "Solicitação registrada",
      description: "Sua solicitação de devolução está sendo analisada. Em breve você receberá um retorno.",
    });
  };

  // Mock product data
  const productDetails = {
    name: purchase.name,
    category: itemType,
    images: [purchase.image, purchase.image, purchase.image],
    description: "Este é um produto de alta qualidade com características excepcionais para o agronegócio. Certificado e com todas as documentações necessárias.",
    characteristics: [
      "Certificado de origem e qualidade",
      "Genética superior comprovada",
      "Documentação completa incluída",
      "Garantia de procedência"
    ],
    certifications: ["ABCZ", "MAPA", "Certificado Sanitário"],
    pricePaid: totalPrice,
    productCode: `PROD-${purchase.id}`,
    originalListingUrl: "#"
  };

  const orderInfo = {
    orderId: purchase.id.toString(),
    productName: purchase.name,
    trackingCode: tracking.code,
    status: statusInfo.label,
    buyerName: "Comprador"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[95vh] md:max-h-[90vh] overflow-hidden p-0 gap-0 [&>button]:hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-destructive/10 transition-colors z-20 group"
        >
          <X className="h-5 w-5 text-destructive group-hover:text-destructive/80" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 border-b bg-gradient-to-br from-background to-muted/20">
          <div className="flex items-start justify-between gap-8 pr-8">
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
                {purchase.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                Comprado em {purchase.date} {purchase.time && `às ${purchase.time}`}
              </p>
            </div>
            <Badge variant={statusInfo.variant} className="shrink-0 px-4 py-1.5 text-sm font-medium">
              {statusInfo.label}
            </Badge>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1" style={{ maxHeight: 'calc(95vh - 280px)' }}>
          <div className="p-6 space-y-8">
            {/* 2. Resumo do Pedido */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-secondary" />
                Resumo do Pedido
              </h3>
              <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <div className="bg-muted/50 px-4 py-3 border-b">
                  <div className="flex justify-between text-sm font-semibold">
                    <span>Campo</span>
                    <span>Informação</span>
                  </div>
                </div>
                <div className="divide-y">
                  <div className="flex justify-between px-4 py-3 text-sm hover:bg-muted/30 transition-colors">
                    <span className="text-muted-foreground">Tipo de item</span>
                    <span className="font-medium text-right max-w-[60%]">{itemType}</span>
                  </div>
                  <div className="flex justify-between px-4 py-3 text-sm hover:bg-muted/30 transition-colors">
                    <span className="text-muted-foreground">Quantidade</span>
                    <span className="font-medium">{quantity} unidade{quantity > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between px-4 py-3 text-sm hover:bg-muted/30 transition-colors">
                    <span className="text-muted-foreground">Preço unitário</span>
                    <span className="font-medium">R$ {unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between px-4 py-3 text-sm hover:bg-muted/30 transition-colors">
                    <span className="text-muted-foreground">Frete</span>
                    <span className="font-medium text-right">
                      R$ {shippingPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      <span className="text-muted-foreground ml-1">via {tracking.carrier}</span>
                    </span>
                  </div>
                  <div className="flex justify-between px-4 py-4 text-base font-bold bg-secondary/10">
                    <span>Total pago</span>
                    <span className="text-primary">R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between px-4 py-3 text-sm hover:bg-muted/30 transition-colors">
                    <span className="text-muted-foreground">Forma de pagamento</span>
                    <span className="font-medium text-right max-w-[60%]">{paymentMethod}</span>
                  </div>
                  <div className="flex justify-between px-4 py-3 text-sm hover:bg-muted/30 transition-colors">
                    <span className="text-muted-foreground">Status do pagamento</span>
                    <span className="font-medium">{paymentStatus}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Informações do Vendedor */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Store className="h-5 w-5 text-secondary" />
                Informações do Vendedor
              </h3>
              <div className="rounded-xl border bg-card shadow-sm p-5 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-secondary/10 p-3 shrink-0">
                    <Store className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-base mb-1">{seller.name}</p>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{seller.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{seller.rating.toFixed(1)}</span>
                      <span className="text-xs text-muted-foreground ml-1">avaliação</span>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                  <p className="text-xs md:text-sm text-amber-800 dark:text-amber-200 flex items-start gap-2">
                    <span className="text-base shrink-0">⚠️</span>
                    <span>Por motivos de segurança, o contato direto com vendedores não é permitido. Para dúvidas, use o suporte do TudoAgro.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Rastreamento / Entrega */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5 text-secondary" />
                Rastreamento / Entrega
              </h3>
              <div className="rounded-xl border bg-card shadow-sm p-5 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground font-medium">Transportadora:</span>
                    <p className="font-semibold">{tracking.carrier}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground font-medium">Previsão de entrega:</span>
                    <p className="font-semibold">{tracking.estimatedDelivery}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground font-medium">Código de rastreio:</span>
                  <code className="block font-mono text-sm bg-muted px-3 py-2 rounded-lg font-semibold">{tracking.code}</code>
                </div>
                
                <div className="h-px bg-border my-4" />
                
                {/* Progress Steps */}
                <div className="space-y-4">
                  {tracking.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4 relative">
                      {/* Connector Line */}
                      {index < tracking.steps.length - 1 && (
                        <div 
                          className={`absolute left-5 top-9 w-0.5 h-6 ${
                            step.completed ? 'bg-emerald-500' : 'bg-muted'
                          }`}
                        />
                      )}
                      
                      {/* Icon */}
                      <div className={`rounded-full p-2 shrink-0 z-10 ${
                        step.completed ? 'bg-emerald-500' : 
                        step.current ? 'bg-yellow-500' : 
                        'bg-muted'
                      }`}>
                        {getStepIcon(index, step)}
                      </div>
                      
                      {/* Label */}
                      <div className="flex-1 pt-1.5">
                        <span className={`text-sm ${
                          step.completed || step.current ? 'font-semibold text-foreground' : 'text-muted-foreground'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Botões de Ação (Footer) */}
        <div className="border-t bg-muted/30 p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="w-full hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all"
              onClick={() => setShowProductDetails(true)}
            >
              <Package className="mr-2 h-4 w-4" />
              Ver Produto
            </Button>
            <Button 
              variant="outline" 
              className="w-full hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all"
              onClick={() => setShowSupportChat(true)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat com Suporte
            </Button>
            <Button 
              variant="outline" 
              className="w-full hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all"
              onClick={() => setShowReturnPolicy(true)}
            >
              <FileText className="mr-2 h-4 w-4" />
              Política de Devolução
            </Button>
            <Button 
              variant="outline" 
              className="w-full hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all"
              onClick={() => setShowMarkAsReceived(true)}
            >
              <PackageCheck className="mr-2 h-4 w-4" />
              Marcar como Recebido
            </Button>
          </div>
        </div>
      </DialogContent>

      {/* Nested Modals */}
      <ProductDetailsModal 
        isOpen={showProductDetails}
        onClose={() => setShowProductDetails(false)}
        product={productDetails}
      />

      <SupportChatModal 
        isOpen={showSupportChat}
        onClose={() => setShowSupportChat(false)}
        orderInfo={orderInfo}
      />

      <ReturnPolicyModal
        isOpen={showReturnPolicy}
        onClose={() => setShowReturnPolicy(false)}
        productName={purchase.name}
        orderId={purchase.id.toString()}
      />

      <MarkAsReceivedModal 
        isOpen={showMarkAsReceived}
        onClose={() => setShowMarkAsReceived(false)}
        onConfirm={handleMarkAsReceived}
        productName={purchase.name}
      />
    </Dialog>
  );
};

export default PurchaseDetailsModal;
