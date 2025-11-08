'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, MessageCircle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HelpCenterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HelpCenterModal = ({ open, onOpenChange }: HelpCenterModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>Central de Ajuda - Financeiro</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-muted-foreground">
            Escolha a melhor forma de entrar em contato conosco. Nossa equipe está pronta para ajudar!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Chat ao Vivo</h3>
                  <p className="text-sm text-muted-foreground">
                    Fale com nosso time em tempo real
                  </p>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Iniciar Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">E-mail</h3>
                  <p className="text-sm text-muted-foreground">
                    financeiro@tudoagro.com.br
                  </p>
                  <Button variant="outline" className="w-full">
                    Enviar E-mail
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Telefone</h3>
                  <p className="text-sm text-muted-foreground">
                    (62) 3333-4444
                  </p>
                  <Button variant="outline" className="w-full">
                    Ligar Agora
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <HelpCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">FAQ</h3>
                  <p className="text-sm text-muted-foreground">
                    Perguntas frequentes sobre pagamentos
                  </p>
                  <Button variant="outline" className="w-full">
                    Ver FAQ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Horário de Atendimento</h4>
            <p className="text-sm text-muted-foreground">
              Segunda a Sexta: 8h às 18h<br />
              Sábado: 8h às 12h
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
