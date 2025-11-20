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
        city?: string
        rating: number
        reviews: number
        image: string
        seller: string
        verified: boolean
        featured: boolean
        age?: string
        weight?: string
        breed?: string
        sex?: string
        type?: 'animal' | 'product'
        father?: string
        mother?: string
        // Campos específicos para cavalos
        marcha?: string
        // Campos específicos para gado
        classificacao?: string
        tipoGenetico?: string
        producaoLeite?: string
        // Campos específicos para sêmen
        central?: string
        embalagem?: string
        modalidade?: string
        stockStatus?: 'Em estoque' | 'Sob encomenda'
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
            </div>

            <CardContent className="p-6 flex flex-col flex-grow">
                {}
                <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {product.featured && (
                            <Badge variant="default" className="bg-primary text-primary-foreground font-semibold px-2 py-0.5 text-xs">
                                DESTAQUE
                            </Badge>
                        )}
                        {product.verified && (
                            <Badge variant="default" className="bg-primary text-primary-foreground font-semibold px-2 py-0.5 text-xs">
                                VERIFICADO
                            </Badge>
                        )}
                        {product.category === 'Gado de Corte' && (
                            <Badge variant="default" className="bg-primary text-primary-foreground font-semibold px-2 py-0.5 text-xs">
                                {product.category}
                            </Badge>
                        )}
                        {product.category === 'Gado de Leite' && (
                            <Badge variant="default" className="bg-primary text-primary-foreground font-semibold px-2 py-0.5 text-xs">
                                {product.category}
                            </Badge>
                        )}
                        {(product.category === 'Sêmen' || product.category.includes('Sêmen')) && (
                            <Badge variant="default" className="bg-primary text-primary-foreground font-semibold px-2 py-0.5 text-xs">
                                {product.category}
                            </Badge>
                        )}
                        {product.category === 'Cavalos' && (
                            <Badge variant="default" className="bg-primary text-primary-foreground font-semibold px-2 py-0.5 text-xs">
                                {product.category}
                            </Badge>
                        )}
                        {product.stockStatus && (
                            <Badge variant="default" className="bg-primary text-primary-foreground font-semibold px-2 py-0.5 text-xs">
                                {product.stockStatus}
                            </Badge>
                        )}
                    </div>
                    <h3 className="font-bold text-lg text-[#101828] mb-2 line-clamp-2 min-h-[2.5em]"> {/* Added min-h for consistent height */}
                        {product.title}
                    </h3>

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
                      <div className="mb-3">
                        <span className="text-sm text-gray-500">Filho de:</span>
                        <div className="font-semibold text-[#101828] text-sm">{product.father} x {product.mother}</div>
                      </div>
                    )}

                    {(variant === 'detailed' || variant === 'default') && product.type === 'animal' && (
                        <div className="mb-3 min-h-[2.5em]">
                            {(product.category === 'Cavalos' || product.category === 'Gado de Corte' || product.category === 'Gado de Leite') && (
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                                    <span>Idade: <span className="font-semibold text-[#101828]">{product.age || 'Não informado'}</span></span>
                                    <span className="hidden sm:inline">•</span>
                                    <span>Sexo: <span className="font-semibold text-[#101828]">{product.sex || 'Não informado'}</span></span>
                                    <span className="hidden sm:inline">•</span>
                                    <span>Raça: <span className="font-semibold text-[#101828]">{product.breed || 'Não informado'}</span></span>
                                </div>
                            )}
                            {(product.category === 'Sêmen' || product.category.includes('Sêmen')) && (
                                <div className="text-sm text-gray-600 space-y-1">
                                    {product.marcha && <div>Marcha: <span className="font-semibold text-[#101828]">{product.marcha}</span></div>}
                                    {product.tipoGenetico && <div>Tipo Genético: <span className="font-semibold text-[#101828]">{product.tipoGenetico}</span></div>}
                                    {product.modalidade && <div>Modalidade: <span className="font-semibold text-[#101828]">{product.modalidade}</span></div>}
                                    {product.breed && <div>Raça: <span className="font-semibold text-[#101828]">{product.breed}</span></div>}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mb-3">
                        <div className="text-2xl font-bold text-primary">
                            R$ {formatPrice(product.price)}
                            {(product.category === 'Sêmen' || product.category.includes('Sêmen')) && (
                                <span className="text-sm font-normal text-gray-600"> por dose</span>
                            )}
                        </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                        <span className="font-semibold text-[#101828]">{product.seller}</span>
                        {product.city && product.location && (
                            <span> · {product.city}, {product.location}</span>
                        )}
                        {!product.city && product.location && (
                            <span> · {product.location}</span>
                        )}
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
