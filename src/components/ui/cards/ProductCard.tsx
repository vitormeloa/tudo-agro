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
        father?: string
        mother?: string
        // Campos específicos para cavalos
        marcha?: string
        // Campos específicos para gado
        classificacao?: string
        // Campos específicos para sêmen
        central?: string
        embalagem?: string
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
    
        useEffect(() => {
            if (product) {
                checkIsFavorite(String(product.id))
            }
        }, [product, checkIsFavorite])

    const handleToggleFavorite = async () => {
        await toggleFavorite(String(product.id))
    }

    const baseClasses = "overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-0"

    const variantClasses = {
        default: "bg-white",
        compact: "bg-white",
        detailed: "bg-gradient-to-br from-white to-gray-50"
    }

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

                {}
                <div className="absolute top-4 left-4 flex gap-2">
                    {product.featured && (
                        <Badge variant="default" className="bg-amber-500 text-white font-semibold px-2 py-0.5 text-xs">
                            DESTAQUE
                        </Badge>
                    )}
                    <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                        {product.category}
                    </Badge>
                </div>

                {}

            </div>

            <CardContent className="p-6 flex flex-col flex-grow">
                {}
                <div className="flex-grow">
                    <h3 className="font-bold text-lg text-[#101828] mb-2 line-clamp-2 min-h-[2.5em]"> {/* Added min-h for consistent height */}
                        {product.title}
                    </h3>

                    <div className="flex items-center mb-2 text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{product.location}</span>
                    </div>

                    {product.type === 'product' && (
                        <div className="flex items-center mb-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                            i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-500">({product.reviews} avaliações)</span>
                        </div>
                    )}

                    {product.type === 'animal' && product.father && product.mother && (
                      <div className="hidden md:block mb-4">
                        <span className="text-gray-500">Filho de:</span>
                        <div className="font-semibold text-[#101828]">{product.father} x {product.mother}</div>
                      </div>
                    )}
                    {product.type === 'animal' && product.father && product.mother && (
                      <div className="md:hidden mb-4">
                        <div>
                          <span className="text-gray-500">Pai:</span>
                          <div className="font-semibold text-[#101828]">{product.father}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Mãe:</span>
                          <div className="font-semibold text-[#101828]">{product.mother}</div>
                        </div>
                      </div>
                    )}

                    {(variant === 'detailed' || variant === 'default') && product.type === 'animal' && (
                        <div className="grid grid-cols-3 gap-2 mb-4 text-sm min-h-[4em]"> {/* Added min-h for consistent height */}
                            {product.category === 'Cavalos' ? (
                                <>
                                    {product.age && (
                                        <div>
                                            <span className="text-gray-500">Idade:</span>
                                            <div className="font-semibold text-[#101828]">{product.age}</div>
                                        </div>
                                    )}
                                    {product.marcha && (
                                        <div>
                                            <span className="text-gray-500">Marcha:</span>
                                            <div className="font-semibold text-[#101828]">{product.marcha}</div>
                                        </div>
                                    )}
                                    {product.breed && (
                                        <div>
                                            <span className="text-gray-500">Raça:</span>
                                            <div className="font-semibold text-[#101828]">{product.breed}</div>
                                        </div>
                                    )}
                                </>
                            ) : (product.category === 'Gado de Corte' || product.category === 'Gado de Leite') ? (
                                <>
                                    {product.age && (
                                        <div>
                                            <span className="text-gray-500">Idade:</span>
                                            <div className="font-semibold text-[#101828]">{product.age}</div>
                                        </div>
                                    )}
                                    {product.classificacao && (
                                        <div>
                                            <span className="text-gray-500">Classificação:</span>
                                            <div className="font-semibold text-[#101828]">{product.classificacao}</div>
                                        </div>
                                    )}
                                    {product.breed && (
                                        <div>
                                            <span className="text-gray-500">Raça:</span>
                                            <div className="font-semibold text-[#101828]">{product.breed}</div>
                                        </div>
                                    )}
                                </>
                            ) : product.category === 'Sêmen' ? (
                                <>
                                    {product.central && (
                                        <div>
                                            <span className="text-gray-500">Central:</span>
                                            <div className="font-semibold text-[#101828]">{product.central}</div>
                                        </div>
                                    )}
                                    {product.embalagem && (
                                        <div>
                                            <span className="text-gray-500">Embalagem:</span>
                                            <div className="font-semibold text-[#101828]">{product.embalagem}</div>
                                        </div>
                                    )}
                                    {product.breed && (
                                        <div>
                                            <span className="text-gray-500">Raça:</span>
                                            <div className="font-semibold text-[#101828]">{product.breed}</div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
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
                                </>
                            )}
                        </div>
                    )}

                    <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-primary">
                R$ {formatPrice(product.price)}
              </span>
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                        Vendido por: <span className="font-semibold text-[#101828]">{product.seller}</span>
                    </div>
                </div>

                {}
                {showActions && (
                    <div className="flex gap-2 mt-auto"> {/* mt-auto pushes buttons to bottom */}
                        <Link href={linkTo || (product.type === 'animal' ? `/catalogo/${product.id}` : `/produtos/${product.id}`)} className="flex-1">
                            <Button className="w-full bg-primary hover:bg-[#2E7A5A] text-white">
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
