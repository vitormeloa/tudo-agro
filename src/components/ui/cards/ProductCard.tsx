'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
    Heart,
    Eye,
    MapPin,
    Star,
    Shield,
    MessageCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFavorites } from '@/hooks/useFavorites'

interface ProductCardProps {
    product: {
        id: string | number
        title: string
        category: string
        price: number
        location: string
        rating: number
        reviews: number
        image: string
        seller: string
        verified: boolean
        featured: boolean
        age?: string
        weight?: string
        breed?: string
        type?: 'animal' | 'product'
    }
    variant?: 'default' | 'compact' | 'detailed'
    showActions?: boolean
    className?: string
    linkTo?: string
}

export default function ProductCard({
                                        product,
                                        variant = 'default',
                                        showActions = true,
                                        className,
                                        linkTo
                                    }: ProductCardProps) {
    const { isFavorite, toggleFavorite, checkIsFavorite } = useFavorites()
    const [favoriteChecked, setFavoriteChecked] = useState(false)

    useEffect(() => {
        if (product && !favoriteChecked) {
            checkIsFavorite(String(product.id)).then(() => {
                setFavoriteChecked(true)
            })
        }
    }, [product, favoriteChecked, checkIsFavorite])

    const handleToggleFavorite = async () => {
        await toggleFavorite(String(product.id))
    }

    const baseClasses = "overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-0"

    const variantClasses = {
        default: "bg-white",
        compact: "bg-white",
        detailed: "bg-gradient-to-br from-white to-gray-50"
    }

    // Função para formatar preço com 2 casas decimais no padrão BR
    const formatPrice = (price: number) => {
        return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }

    return (
        <Card className={cn(baseClasses, variantClasses[variant], className)}>
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {product.featured && (
                        <Badge className="bg-amber-500 text-white font-semibold">
                            DESTAQUE
                        </Badge>
                    )}
                    <Badge className="bg-emerald-600 text-white">
                        {product.category}
                    </Badge>
                </div>

                {/* Verified Badge */}
                {product.verified && (
                    <div className="absolute bottom-4 left-4">
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                            <Shield className="w-3 h-3 mr-1" />
                            VERIFICADO
                        </Badge>
                    </div>
                )}
            </div>

            <CardContent className="p-6">
                {/* Title */}
                <h3 className="font-bold text-lg text-[#101828] mb-2 line-clamp-2">
                    {product.title}
                </h3>

                {/* Location */}
                <div className="flex items-center mb-2 text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{product.location}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${
                                    i < Math.floor(product.rating)
                                        ? 'text-amber-400 fill-current'
                                        : 'text-gray-300'
                                }`}
                            />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
              ({product.rating}) • {product.reviews} avaliações
            </span>
                    </div>
                </div>

                {/* Product Details */}
                {(variant === 'detailed' || variant === 'default') && (
                    <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                        {product.age && (
                            <div>
                                <span className="text-gray-500">Idade:</span>
                                <div className="font-semibold text-[#101828]">{product.age}</div>
                            </div>
                        )}
                        {product.weight && (
                            <div>
                                <span className="text-gray-500">Peso:</span>
                                <div className="font-semibold text-[#101828]">{product.weight}</div>
                            </div>
                        )}
                        {product.breed && (
                            <div>
                                <span className="text-gray-500">Raça:</span>
                                <div className="font-semibold text-[#101828]">{product.breed}</div>
                            </div>
                        )}
                    </div>
                )}

                {/* Price */}
                <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-emerald-600">
            R$ {formatPrice(product.price)}
          </span>
                </div>

                {/* Seller */}
                <div className="text-sm text-gray-600 mb-4">
                    Vendido por: <span className="font-semibold text-[#101828]">{product.seller}</span>
                </div>

                {/* Actions */}
                {showActions && (
                    <div className="flex gap-2">
                        <Link href={linkTo || (product.type === 'animal' ? `/catalogo/${product.id}` : `/produtos/${product.id}`)} className="flex-1">
                            <Button className="w-full bg-emerald-600 hover:bg-[#2E7A5A] text-white">
                                <Eye className="w-4 h-4 mr-2" />
                                Ver Detalhes
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleToggleFavorite}
                            className={`border-gray-300 ${
                                isFavorite(String(product.id)) ? 'text-red-500 border-red-500' : 'text-gray-400'
                            }`}
                        >
                            <Heart className={`w-5 h-5 ${isFavorite(String(product.id)) ? 'fill-current' : ''}`} />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
