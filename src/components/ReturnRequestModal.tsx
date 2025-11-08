import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Upload, Image as ImageIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ReturnRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  orderId: string;
}

const ReturnRequestModal = ({ isOpen, onClose, productName, orderId }: ReturnRequestModalProps) => {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const { toast } = useToast();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPhotos(prev => [...prev, ...files].slice(0, 5)); // Max 5 photos
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!reason) {
      toast({
        title: "Erro",
        description: "Por favor, selecione o motivo da devolução",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Solicitação enviada!",
      description: "Analisaremos sua solicitação e retornaremos em até 2 dias úteis.",
    });

    // Reset form
    setReason("");
    setDescription("");
    setPhotos([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-hidden p-0 gap-0 [&>button]:hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-destructive/10 transition-colors z-20 group"
        >
          <X className="h-5 w-5 text-destructive group-hover:text-destructive/80" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 border-b bg-gradient-to-br from-background to-muted/20">
          <div className="pr-8">
            <h2 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
              Solicitar Devolução
            </h2>
            <p className="text-sm text-muted-foreground">
              Pedido #{orderId} - {productName}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6" style={{ maxHeight: 'calc(95vh - 200px)' }}>
          {/* Reason Selection */}
          <div className="space-y-2">
            <Label htmlFor="reason">Motivo da Devolução *</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="reason">
                <SelectValue placeholder="Selecione o motivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="produto-defeituoso">Produto com defeito</SelectItem>
                <SelectItem value="produto-diferente">Produto diferente do anunciado</SelectItem>
                <SelectItem value="nao-atende-expectativas">Não atende às expectativas</SelectItem>
                <SelectItem value="problema-saude-animal">Problema de saúde do animal</SelectItem>
                <SelectItem value="arrependimento">Desistência da compra</SelectItem>
                <SelectItem value="outro">Outro motivo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descreva o problema (opcional)</Label>
            <Textarea
              id="description"
              placeholder="Forneça mais detalhes sobre o motivo da devolução..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Photo Upload */}
          <div className="space-y-3">
            <Label>Fotos do produto (opcional, máx. 5)</Label>
            
            {/* Upload Button */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <input
                type="file"
                id="photo-upload"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                disabled={photos.length >= 5}
              />
              <label 
                htmlFor="photo-upload" 
                className={`cursor-pointer flex flex-col items-center gap-2 ${photos.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground text-center">
                  {photos.length >= 5 
                    ? "Máximo de 5 fotos atingido" 
                    : "Clique para adicionar fotos"}
                </p>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG ou WEBP (até 5MB cada)
                </p>
              </label>
            </div>

            {/* Photo Preview */}
            {photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg border bg-muted overflow-hidden">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-background/80 backdrop-blur-sm">
                      <p className="text-xs font-medium flex items-center gap-1">
                        <ImageIcon className="h-3 w-3" />
                        {photo.name.length > 15 ? photo.name.substring(0, 15) + '...' : photo.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Alert */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-primary dark:text-blue-200">
              <strong>Como funciona:</strong> Após enviar sua solicitação, nossa equipe analisará o pedido 
              e retornará em até <strong>2 dias úteis</strong> com instruções sobre como proceder com a devolução.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-muted/30 p-6 flex gap-3">
          <Button 
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            className="flex-1"
            size="lg"
          >
            Enviar Solicitação
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnRequestModal;