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

// Helper function to determine seller level with Mercado Livre style
const getSellerLevel = (sales: number) => {
  // Define thresholds for each level
  const levels = [
    { threshold: 0, name: 'Novo', color: '#ef4444', textColor: 'text-red-600' }, // Vermelho - Ruim
    { threshold: 50, name: 'Bronze', color: '#f97316', textColor: 'text-orange-600' }, // Laranja - Regular
    { threshold: 100, name: 'Prata', color: '#eab308', textColor: 'text-yellow-600' }, // Amarelo - Bom
    { threshold: 500, name: 'Ouro', color: '#22c55e', textColor: 'text-[#3D9970]' }, // Verde claro - Muito bom
    { threshold: 1000, name: 'Diamante', color: '#10b981', textColor: 'text-primary' }, // Verde - Excelente
  ];

  // Find current level
  let currentLevel = 0;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (sales >= levels[i].threshold) {
      currentLevel = i;
      break;
    }
  }

  // Calculate progress within current level
  const current = levels[currentLevel];
  const next = levels[currentLevel + 1];
  let progress = 0;

  if (next) {
    const levelRange = next.threshold - current.threshold;
    const salesInLevel = sales - current.threshold;
    progress = (salesInLevel / levelRange) * 100;
  } else {
    // Max level reached
    progress = 100;
  }

  return {
    level: currentLevel,
    name: current.name,
    color: current.color,
    textColor: current.textColor,
    progress: Math.min(progress, 100),
    levels: levels,
  };
};

export default function SellerInfoCard({ seller }: SellerInfoCardProps) {
  const sellerLevel = getSellerLevel(seller.totalSales);

  return (
    <Card className="bg-white border-gray-200 shadow-lg">
      <CardContent className="p-6 relative">
        <div className="absolute top-6 right-6 hidden sm:block">
          <Link href={`/vendedor/${seller.id}`}>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Ver perfil do vendedor
            </Button>
          </Link>
        </div>
        <h2 className="text-xl font-bold text-[#101828] mb-4">Vendedor</h2>
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
              <h3 className="text-lg font-bold text-[#101828] hover:text-primary transition-colors">
                {seller.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 mb-3">{seller.location}</p>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <p className={`text-sm font-bold ${sellerLevel.textColor}`}>
                  {sellerLevel.name}
                </p>
                <span className="text-xs text-gray-500">
                  {seller.totalSales} vendas
                </span>
              </div>

              {/* Mercado Livre style segmented progress bar */}
              <div className="flex gap-0.5">
                {sellerLevel.levels.map((levelBar, index) => {
                  const isActive = index <= sellerLevel.level;
                  const isCurrent = index === sellerLevel.level;

                  return (
                    <div
                      key={index}
                      className="flex-1 h-2 rounded-sm overflow-hidden"
                      style={{
                        backgroundColor: isActive ? levelBar.color : '#e5e7eb',
                        opacity: isCurrent ? 1 : (isActive ? 0.9 : 1)
                      }}
                    >
                      {isCurrent && sellerLevel.progress < 100 && (
                        <div
                          className="h-full bg-gray-200"
                          style={{
                            width: `${100 - sellerLevel.progress}%`,
                            marginLeft: `${sellerLevel.progress}%`
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div>
                <p className="font-bold text-lg text-[#101828]">{seller.totalSales}</p>
                <p className="text-xs text-gray-500">Vendas nos últimos 60 dias</p>
              </div>
              <div>
                <div className="flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-gray-500 mr-1" />
                  <p className="font-bold text-lg text-[#101828]">Ótimo</p>
                </div>
                <p className="text-xs text-gray-500">Presta um bom atendimento</p>
              </div>
              <div>
                <div className="flex items-center justify-center">
                  <Clock className="w-4 h-4 text-gray-500 mr-1" />
                  <p className="font-bold text-lg text-[#101828]">No prazo</p>
                </div>
                <p className="text-xs text-gray-500">Entrega os produtos no prazo</p>
              </div>
            </div>
            
            <div className="sm:hidden">
              <Link href={`/vendedor/${seller.id}`}>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                  Ver perfil do vendedor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
