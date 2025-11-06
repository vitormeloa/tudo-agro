'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, PackageCheck, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface MarkAsReceivedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (rating: number, comment: string, recommend: boolean) => void;
  productName: string;
}

const MarkAsReceivedModal = ({ isOpen, onClose, onConfirm, productName }: MarkAsReceivedModalProps) => {
  const [step, setStep] = useState<'confirm' | 'review'>('confirm');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [recommend, setRecommend] = useState<boolean | null>(null);

  const handleConfirmReceipt = () => {
    setStep('review');
  };

  const handleSubmitReview = () => {
    if (rating === 0 || recommend === null) return;
    onConfirm(rating, comment, recommend);
    onClose();
    // Reset state
    setStep('confirm');
    setRating(0);
    setComment("");
    setRecommend(null);
  };

  const handleClose = () => {
    setStep('confirm');
    setRating(0);
    setComment("");
    setRecommend(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-0 gap-0 [&>button]:hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-destructive/10 transition-colors z-20 group"
        >
          <X className="h-5 w-5 text-destructive group-hover:text-destructive/80" />
        </button>

        {step === 'confirm' ? (
          <>
            {/* Confirmation Step */}
            <div className="p-6">
              <div className="flex flex-col items-center text-center space-y-6 py-4">
                <div className="rounded-full bg-secondary/10 p-4">
                  <PackageCheck className="h-12 w-12 text-secondary" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Confirmar Recebimento?
                  </h2>
                  <p className="text-muted-foreground leading-relaxed max-w-md">
                    Isso encerrará o pedido e confirmará que você recebeu o item <strong>{productName}</strong> corretamente.
                  </p>
                  <p className="text-muted-foreground mt-4 font-medium">
                    Deseja marcar como entregue?
                  </p>
                </div>

                <div className="flex flex-col w-full gap-3 pt-2">
                  <Button 
                    onClick={handleConfirmReceipt}
                    size="lg"
                    className="w-full"
                  >
                    <PackageCheck className="mr-2 h-5 w-5" />
                    Sim, recebi o pedido
                  </Button>
                  <Button 
                    onClick={handleClose}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Review Step */}
            <div className="p-6 pb-4 border-b bg-gradient-to-br from-background to-muted/20">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Star className="h-6 w-6 text-secondary" />
                Avaliar Compra
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Sua opinião é muito importante!
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Success Badge */}
              <div className="bg-emerald-50 dark:bg-green-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3 text-center">
                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                  ✅ Pedido finalizado com sucesso
                </p>
              </div>

              {/* Rating */}
              <div>
                <label className="font-semibold mb-3 block">Avaliação *</label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform"
                    >
                      <Star
                        className={`h-10 w-10 ${
                          star <= (hoveredRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="font-semibold mb-2 block">Comentário (opcional)</label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Compartilhe sua experiência com este produto..."
                  className="min-h-[100px] resize-none"
                />
              </div>

              {/* Recommend */}
              <div>
                <label className="font-semibold mb-3 block">Recomenda o vendedor? *</label>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setRecommend(true)}
                    variant={recommend === true ? "default" : "outline"}
                    className="flex-1"
                  >
                    Sim
                  </Button>
                  <Button
                    onClick={() => setRecommend(false)}
                    variant={recommend === false ? "default" : "outline"}
                    className="flex-1"
                  >
                    Não
                  </Button>
                </div>
              </div>

              {/* Submit */}
              <Button
                onClick={handleSubmitReview}
                disabled={rating === 0 || recommend === null}
                className="w-full"
                size="lg"
              >
                Enviar Avaliação
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MarkAsReceivedModal;
