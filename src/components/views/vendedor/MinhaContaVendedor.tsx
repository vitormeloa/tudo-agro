'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Building2, MapPin, CreditCard, Bell, Upload } from "lucide-react";

const MinhaContaVendedor = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Minha Conta</h1>
        <p className="text-muted-foreground">Gerencie suas informações e preferências</p>
      </div>

      {/* Company Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Dados Empresariais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="razao">Razão Social</Label>
              <Input id="razao" defaultValue="Fazenda Santa Cruz Ltda" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fantasia">Nome Fantasia</Label>
              <Input id="fantasia" defaultValue="Fazenda Santa Cruz" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input id="cnpj" defaultValue="12.345.678/0001-90" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inscricao">Inscrição Estadual</Label>
              <Input id="inscricao" defaultValue="123.456.789" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail Empresarial</Label>
              <Input id="email" type="email" defaultValue="contato@fazenda.com.br" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" defaultValue="(11) 98765-4321" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Store Branding */}
      <Card>
        <CardHeader>
          <CardTitle>Identidade Visual da Loja</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Logo da Loja</Label>
              <div className="mt-2 flex items-center gap-4">
                <div className="h-24 w-24 rounded-lg bg-muted flex items-center justify-center border-2 border-dashed">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    Carregar Logo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    Recomendado: 500x500px, PNG ou JPG
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Label>Banner da Loja</Label>
              <div className="mt-2 flex items-center gap-4">
                <div className="h-24 w-48 rounded-lg bg-muted flex items-center justify-center border-2 border-dashed">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    Carregar Banner
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    Recomendado: 1920x400px, PNG ou JPG
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição da Loja</Label>
              <Textarea 
                id="description" 
                placeholder="Conte um pouco sobre sua loja e produtos..."
                className="min-h-[100px]"
                defaultValue="Fazenda tradicional com mais de 30 anos de experiência na criação de gado de corte e leiteiro. Oferecemos animais de alta qualidade genética e produtos agropecuários selecionados."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-url">URL da sua Loja</Label>
              <div className="flex gap-2">
                <Input 
                  id="store-url" 
                  defaultValue="tudoagro.com.br/loja/fazenda-santa-cruz"
                  readOnly
                  className="bg-muted"
                />
                <Button variant="outline">Copiar</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Endereço da Propriedade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input id="endereco" defaultValue="Rodovia BR-153, Km 45" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade</Label>
              <Input id="cidade" defaultValue="Goiânia" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Input id="estado" defaultValue="GO" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input id="cep" defaultValue="74000-000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complemento">Complemento</Label>
              <Input id="complemento" defaultValue="Fazenda Santa Cruz" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Dados para Recebimento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pix-type">Tipo de Chave Pix</Label>
              <Input id="pix-type" defaultValue="E-mail" readOnly className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pix-key">Chave Pix</Label>
              <Input id="pix-key" defaultValue="contato@fazenda.com.br" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bank">Banco (Backup)</Label>
              <Input id="bank" defaultValue="Banco do Brasil - Ag: 1234-5 / CC: 12345-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Preferências de Notificação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Novas vendas</p>
                <p className="text-sm text-muted-foreground">Receba notificações quando realizar uma venda</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mensagens de clientes</p>
                <p className="text-sm text-muted-foreground">Seja notificado sobre novas mensagens</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Avaliações</p>
                <p className="text-sm text-muted-foreground">Receba alertas sobre novas avaliações</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dicas e atualizações</p>
                <p className="text-sm text-muted-foreground">Novidades da plataforma e dicas de vendas</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Resumo semanal</p>
                <p className="text-sm text-muted-foreground">Receba um resumo das suas vendas semanalmente</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancelar</Button>
        <Button className="bg-primary hover:bg-primary/90">
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
};

export default MinhaContaVendedor;
