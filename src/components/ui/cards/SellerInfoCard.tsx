import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Shield, MessageSquare, Clock } from 'lucide-react'
import Link from 'next/link'

interface Seller {
  id: string | number;
  name: string;
  location: string;
  rating: number;
  totalSales: number;
  memberSince: string;
  verified: boolean;
  image: string;
}

interface SellerInfoCardProps {
  seller: Seller;
}

// Helper function to determine seller level
const getSellerLevel = (sales: number) => {
  if (sales > 1000) return { level: 5, name: 'Vendedor Mestre' };
  if (sales > 500) return { level: 4, name: 'Vendedor Diamante' };
  if (sales > 100) return { level: 3, name: 'Vendedor Ouro' };
  if (sales > 50) return { level: 2, name: 'Vendedor Prata' };
  return { level: 1, name: 'Vendedor Bronze' };
};

export default function SellerInfoCard({ seller }: SellerInfoCardProps) {
  const sellerLevel = getSellerLevel(seller.totalSales);

  return (
    <Card className="bg-white border-gray-200 shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Informações sobre o vendedor</h2>
        <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="flex-shrink-0">
            <Link href={`/vendedor/${seller.id}`}>
              <img 
                src={seller.image} 
                alt={seller.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            </Link>
          </div>
          
          <div className="flex-1">
            <Link href={`/vendedor/${seller.id}`}>
              <h3 className="text-lg font-bold text-gray-900 hover:text-green-700 transition-colors">
                {seller.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 mb-3">{seller.location}</p>

            <div className="flex items-center mb-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-green-700">{sellerLevel.name}</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-green-600 h-1.5 rounded-full" 
                    style={{ width: `${(sellerLevel.level / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div>
                <p className="font-bold text-lg text-gray-900">{seller.totalSales}</p>
                <p className="text-xs text-gray-500">Vendas nos últimos 60 dias</p>
              </div>
              <div>
                <div className="flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-gray-500 mr-1" />
                  <p className="font-bold text-lg text-gray-900">Ótimo</p>
                </div>
                <p className="text-xs text-gray-500">Presta um bom atendimento</p>
              </div>
              <div>
                <div className="flex items-center justify-center">
                  <Clock className="w-4 h-4 text-gray-500 mr-1" />
                  <p className="font-bold text-lg text-gray-900">No prazo</p>
                </div>
                <p className="text-xs text-gray-500">Entrega os produtos no prazo</p>
              </div>
            </div>
            
            <Link href={`/vendedor/${seller.id}`}>
              <Button variant="outline" className="w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                Ver perfil do vendedor
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
