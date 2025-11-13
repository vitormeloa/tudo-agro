import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, CreditCard, QrCode, Banknote } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface Course {
  id: number;
  title: string;
  price: number;
}

interface CoursePurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
}

export const CoursePurchaseModal = ({ isOpen, onClose, course }: CoursePurchaseModalProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('pix');

  if (!course) return null;

  const handleFinalizePayment = () => {
    toast({
      title: "Pagamento Finalizado",
      description: `Você comprou "${course.title}" via ${selectedPaymentMethod.toUpperCase()}.`,
      variant: "default",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4 bg-destructive/10 text-destructive hover:bg-destructive/20">
          <X className="h-5 w-5" />
        </Button>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{course.title}</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Acesso Vitalício
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Valor Total:</span>
            <span className="text-primary">R$ {course.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>

          <h3 className="text-lg font-semibold mt-2">Opções de Pagamento</h3>
          <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="grid gap-3">
            <div className="flex items-center space-x-2 p-3 border rounded-md">
              <RadioGroupItem value="pix" id="pix" />
              <Label htmlFor="pix" className="flex items-center gap-2 flex-grow cursor-pointer">
                <QrCode className="h-5 w-5 text-green-500" />
                <span>Pix</span>
                <span className="ml-auto text-sm text-muted-foreground">Pagamento instantâneo</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-md">
              <RadioGroupItem value="credit_card" id="credit_card" />
              <Label htmlFor="credit_card" className="flex items-center gap-2 flex-grow cursor-pointer">
                <CreditCard className="h-5 w-5 text-blue-500" />
                <span>Cartão de Crédito</span>
                <span className="ml-auto text-sm text-muted-foreground">Em até 12x</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-md">
              <RadioGroupItem value="bank_slip" id="bank_slip" />
              <Label htmlFor="bank_slip" className="flex items-center gap-2 flex-grow cursor-pointer">
                <Banknote className="h-5 w-5 text-yellow-600" />
                <span>Boleto Bancário</span>
                <span className="ml-auto text-sm text-muted-foreground">Confirmação em 1-3 dias úteis</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex justify-end">
          <Button className="w-full" onClick={handleFinalizePayment}>Finalizar Pagamento</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
