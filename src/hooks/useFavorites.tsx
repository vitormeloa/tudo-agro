'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from './useAuth'
import { useToast } from './use-toast'

interface Favorite {
  id: string
  created_at: string
  product: {
    id: string
    title: string
    description: string | null
    category: string
    breed: string | null
    gender: string | null
    age: string | null
    weight: number | string | null
    price: number | null
    negotiable: boolean
    status: string
    featured: boolean
    user_id: string | null
    created_at: string | null
    updated_at: string | null
    product_images: Array<{
      id: string
      url: string
      alt: string | null
      order: number
    }>
    item_type?: 'animal' | 'product' | 'unknown'
  }
}

export function useFavorites() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(false)
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())
  const loadingRef = useRef(false)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const loadFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([])
      setFavoriteIds(new Set())
      return
    }

    if (loadingRef.current) {
      return
    }

    try {
      loadingRef.current = true
      setLoading(true)
      
      const response = await fetch('/api/favorites', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!mountedRef.current) return

      if (response.ok) {
        try {
          const data = await response.json()
          const favoritesList = data.favorites || []
          
          setFavorites(favoritesList)
          
          const ids = new Set(
            favoritesList
              .map((f: Favorite) => f.product?.id || (f as any).product_id)
              .filter(Boolean)
              .map(String)
          )
          setFavoriteIds(ids)
        } catch (jsonError) {
          console.error('Error parsing favorites response:', jsonError)
          if (mountedRef.current) {
            setFavorites([])
            setFavoriteIds(new Set())
          }
        }
      } else if (response.status === 401) {
        if (mountedRef.current) {
          setFavorites([])
          setFavoriteIds(new Set())
        }
      } else {
        if (mountedRef.current && user) {
          let errorMessage = `Erro ${response.status}: ${response.statusText || 'Erro desconhecido'}`
          let shouldShowToast = false
          
          try {
            const clonedResponse = response.clone()
            const text = await clonedResponse.text()
            if (text) {
              try {
                const errorData = JSON.parse(text)
                errorMessage = errorData.error || errorData.message || errorMessage
                
                if (
                  errorMessage.includes('tabela') ||
                  errorMessage.includes('migração') ||
                  errorMessage.includes('migration') ||
                  errorMessage.includes('schema cache') ||
                  errorMessage.includes('Could not find the table') ||
                  response.status === 503
                ) {
                  shouldShowToast = false
                } else if (response.status === 500) {
                  shouldShowToast = true
                }
              } catch {
                shouldShowToast = response.status === 500
              }
            }
          } catch {
            shouldShowToast = response.status === 500
          }

          if (shouldShowToast) {
            toast({
              title: "Erro ao carregar favoritos",
              description: errorMessage,
              variant: "destructive",
            })
          }

          setFavorites([])
          setFavoriteIds(new Set())
        }
      }
    } catch (error) {
      if (mountedRef.current && user) {
        console.error('Network error loading favorites:', error)
        setFavorites([])
        setFavoriteIds(new Set())
      }
    } finally {
      if (mountedRef.current) {
        loadingRef.current = false
        setLoading(false)
      }
    }
  }, [user, toast])

  const checkIsFavorite = useCallback(async (productId: string): Promise<boolean> => {
    if (!user) return false

    const productIdStr = String(productId)
    
    if (favoriteIds.has(productIdStr)) return true

    try {
      const response = await fetch(`/api/favorites/check?product_id=${encodeURIComponent(productIdStr)}`, {
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        const isFav = data.isFavorite || false
        
        if (isFav && mountedRef.current) {
          setFavoriteIds(prev => new Set(prev).add(productIdStr))
        }
        
        return isFav
      }
    } catch (error) {
      console.error('Error checking favorite:', error)
    }

    return false
  }, [user, favoriteIds])

  const addFavorite = useCallback(async (productId: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Autenticação necessária",
        description: "Você precisa fazer login para adicionar produtos aos favoritos.",
        variant: "destructive",
      })
      return false
    }

    const productIdStr = String(productId)

    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ product_id: productIdStr }),
      })

      if (response.ok) {
        if (mountedRef.current) {
          setFavoriteIds(prev => new Set(prev).add(productIdStr))
          await loadFavorites()
        }
        toast({
          title: "Adicionado aos favoritos",
          description: "O produto foi adicionado à sua lista de favoritos.",
        })
        return true
      } else {
        const data = await response.json().catch(() => ({ error: 'Erro desconhecido' }))
        const errorMessage = data.error || 'Não foi possível adicionar o produto aos favoritos.'
        
        if (response.status === 401) {
          toast({
            title: "Autenticação necessária",
            description: "Você precisa fazer login para adicionar produtos aos favoritos.",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Erro ao favoritar",
            description: errorMessage,
            variant: "destructive",
          })
        }
        return false
      }
    } catch (error) {
      console.error('Error adding favorite:', error)
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.",
        variant: "destructive",
      })
      return false
    }
  }, [user, toast, loadFavorites])

  const removeFavorite = useCallback(async (productId: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Autenticação necessária",
        description: "Você precisa fazer login para remover produtos dos favoritos.",
        variant: "destructive",
      })
      return false
    }

    const productIdStr = String(productId)

    try {
      const response = await fetch(`/api/favorites?product_id=${encodeURIComponent(productIdStr)}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (response.ok) {
        if (mountedRef.current) {
          setFavoriteIds(prev => {
            const newSet = new Set(prev)
            newSet.delete(productIdStr)
            return newSet
          })
          await loadFavorites()
        }
        toast({
          title: "Removido dos favoritos",
          description: "O produto foi removido da sua lista de favoritos.",
        })
        return true
      } else {
        const data = await response.json().catch(() => ({ error: 'Erro desconhecido' }))
        const errorMessage = data.error || 'Não foi possível remover o produto dos favoritos.'
        
        if (response.status === 401) {
          toast({
            title: "Autenticação necessária",
            description: "Você precisa fazer login para remover produtos dos favoritos.",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Erro ao remover",
            description: errorMessage,
            variant: "destructive",
          })
        }
        return false
      }
    } catch (error) {
      console.error('Error removing favorite:', error)
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.",
        variant: "destructive",
      })
      return false
    }
  }, [user, toast, loadFavorites])

  const toggleFavorite = useCallback(async (productId: string): Promise<boolean> => {
    const productIdStr = String(productId)
    const isFavorite = favoriteIds.has(productIdStr)
    
    if (isFavorite) {
      return await removeFavorite(productIdStr)
    } else {
      return await addFavorite(productIdStr)
    }
  }, [favoriteIds, addFavorite, removeFavorite])

  useEffect(() => {
    loadFavorites()
  }, [loadFavorites])

  return {
    favorites,
    favoriteIds,
    loading,
    isFavorite: (productId: string) => favoriteIds.has(String(productId)),
    addFavorite,
    removeFavorite,
    toggleFavorite,
    checkIsFavorite,
    reload: loadFavorites,
  }
}
