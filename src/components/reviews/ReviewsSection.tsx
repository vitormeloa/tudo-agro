'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Star, MessageSquare, CheckCircle, ThumbsUp } from 'lucide-react'
import { Review } from '@/lib/mock-reviews'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { useRouter, usePathname } from 'next/navigation'

interface ReviewsSectionProps {
  reviews: Review[]
  itemId: string
  itemType: 'product' | 'animal'
  onAddReview?: (review: Omit<Review, 'id' | 'date'>) => void
}

export default function ReviewsSection({ reviews, itemId, itemType, onAddReview }: ReviewsSectionProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Função para obter iniciais do nome
  const getInitials = (name: string) => {
    const names = name.trim().split(' ')
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase()
    }
    return (names[0][0] + names[names.length - 1][0]).toUpperCase()
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage: reviews.length > 0
      ? (reviews.filter(r => r.rating === stars).length / reviews.length) * 100
      : 0
  }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
      return
    }

    if (rating === 0) {
      toast({
        title: "Avaliação necessária",
        description: "Por favor, selecione uma avaliação com estrelas.",
        variant: "destructive",
      })
      return
    }

    if (comment.trim().length < 10) {
      toast({
        title: "Comentário muito curto",
        description: "Por favor, escreva um comentário com pelo menos 10 caracteres.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (onAddReview) {
        onAddReview({
          userId: user.id || 'current-user',
          userName: user.name || 'Usuário',
          userAvatar: '/placeholder-avatar.jpg',
          rating,
          comment: comment.trim(),
          verifiedPurchase: false,
          helpful: 0
        })
      }

      toast({
        title: "Avaliação enviada",
        description: "Sua avaliação foi publicada com sucesso!",
      })

      setRating(0)
      setComment('')
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua avaliação. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date)
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Average Rating */}
            <div className="flex flex-col items-center justify-center border-r border-gray-200 pr-8">
              <div className="text-5xl font-bold text-[#101828] mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= Math.round(averageRating)
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">
                {reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'}
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="flex-1 space-y-2">
              {ratingDistribution.map(({ stars, count, percentage }) => (
                <div key={stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-20">
                    <span className="text-sm text-gray-600">{stars}</span>
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Review Form */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-[#101828] mb-4">Deixe sua avaliação</h3>
          {!user ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Você precisa estar logado para deixar uma avaliação.</p>
              <Button
                onClick={() => router.push(`/login?redirect=${encodeURIComponent(pathname || '/')}`)}
                className="bg-primary hover:bg-[#2E7A5A] text-white"
              >
                Fazer Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Rating Stars */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Sua avaliação *
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoverRating || rating)
                            ? 'text-yellow-500 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-3 text-sm text-gray-600">
                      {rating === 1 && 'Péssimo'}
                      {rating === 2 && 'Ruim'}
                      {rating === 3 && 'Regular'}
                      {rating === 4 && 'Bom'}
                      {rating === 5 && 'Excelente'}
                    </span>
                  )}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label htmlFor="comment" className="text-sm font-medium text-gray-700 mb-2 block">
                  Seu comentário *
                </label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Compartilhe sua experiência com este item..."
                  rows={4}
                  className="resize-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Mínimo de 10 caracteres
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || rating === 0 || comment.trim().length < 10}
                className="bg-primary hover:bg-[#2E7A5A] text-white"
              >
                {isSubmitting ? 'Enviando...' : 'Publicar Avaliação'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#101828]">
          Últimas avaliações ({reviews.length})
        </h3>

        {reviews.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Ainda não há avaliações para este item.</p>
              <p className="text-sm text-gray-500 mt-2">Seja o primeiro a avaliar!</p>
            </CardContent>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Avatar with Initials */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-lg">
                        {getInitials(review.userName)}
                      </span>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-[#101828]">{review.userName}</h4>
                          {review.verifiedPurchase && (
                            <Badge className="bg-primary/10 text-primary text-xs hidden sm:inline-flex">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Compra verificada
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? 'text-yellow-500 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 mt-1 sm:mt-0">{formatDate(review.date)}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-3">{review.comment}</p>

                    {/* Helpful Button */}
                    {review.helpful !== undefined && (
                      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#101828]">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Útil ({review.helpful})</span>
                      </button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
