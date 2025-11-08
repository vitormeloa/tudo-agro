'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Package, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    category: string;
    images: string[];
    description: string;
    characteristics: string[];
    certifications?: string[];
    pricePaid: number;
    productCode: string;
    originalListingUrl?: string;
  };
}

const ProductDetailsModal = ({ isOpen, onClose, product }: ProductDetailsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden p-0 gap-0 [&>button]:hidden">
        {}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-destructive/10 transition-colors z-20 group"
        >
          <X className="h-5 w-5 text-destructive group-hover:text-destructive/80" />
        </button>

        {}
        <div className="p-6 pb-4 border-b bg-gradient-to-br from-background to-muted/20">
          <div className="flex items-start justify-between gap-8 pr-8">
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
                {product.name}
              </h2>
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              <p className="text-sm text-muted-foreground">
                Código: {product.productCode}
              </p>
            </div>
          </div>
        </div>

        {}
        <div className="overflow-y-auto flex-1" style={{ maxHeight: 'calc(95vh - 200px)' }}>
          <div className="p-6 space-y-6">
            {}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-secondary" />
                Fotos do Produto
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product.images.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-xl overflow-hidden border bg-muted">
                    <img 
                      src={img} 
                      alt={`${product.name} - ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {}
            <div>
              <h3 className="font-bold text-lg mb-3">Descrição Técnica</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {}
            <div>
              <h3 className="font-bold text-lg mb-3">Características Principais</h3>
              <ul className="space-y-2">
                {product.characteristics.map((char, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span className="text-muted-foreground">{char}</span>
                  </li>
                ))}
              </ul>
            </div>

            {}
            {product.certifications && product.certifications.length > 0 && (
              <div>
                <h3 className="font-bold text-lg mb-3">Certificações</h3>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert, idx) => (
                    <Badge key={idx} variant="secondary">{cert}</Badge>
                  ))}
                </div>
              </div>
            )}

            {}
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Preço Pago:</span>
                <span className="text-2xl font-bold text-secondary">
                  R$ {product.pricePaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {}
            {product.originalListingUrl && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.open(product.originalListingUrl, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver Anúncio Original
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
