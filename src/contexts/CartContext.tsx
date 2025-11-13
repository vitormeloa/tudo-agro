'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/useAuth'

export interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  image: string
  seller: string
  stock: string
  availableStock: number
  type: 'product' | 'animal'
  location?: string
  city?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getSubtotal: () => number
  getTotal: () => number
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = 'tudoagro_cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { user, initialized } = useAuth()

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY)
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!user && initialized && !isLoading && items.length > 0) {
      setItems([])
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch (error) {
        console.error('Erro ao limpar carrinho:', error)
      }
    }
  }, [user, initialized, isLoading, items.length])

  useEffect(() => {
    if (!isLoading && initialized && user) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      } catch (error) {
        console.error('Erro ao salvar carrinho:', error)
      }
    }
  }, [items, isLoading, initialized, user])

  const addItem = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    if (!user) {
      setTimeout(() => {
        toast({
          title: 'Login necessário',
          description: 'Você precisa estar logado para adicionar itens ao carrinho.',
          variant: 'destructive',
        })
      }, 0)
      return
    }

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id)

      if (existingItem) {
        const newQuantity = (existingItem.quantity || 0) + (newItem.quantity || 1)
        
        if (newQuantity > existingItem.availableStock) {
          setTimeout(() => {
            toast({
              title: 'Estoque insuficiente',
              description: `Apenas ${existingItem.availableStock} unidades disponíveis deste produto.`,
              variant: 'destructive',
            })
          }, 0)
          return prevItems
        }

        setTimeout(() => {
          toast({
            title: 'Quantidade atualizada',
            description: `${newItem.title} - Quantidade: ${newQuantity}`,
          })
        }, 0)

        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: newQuantity }
            : item
        )
      } else {
        const quantity = newItem.quantity || 1
        
        if (quantity > newItem.availableStock) {
          setTimeout(() => {
            toast({
              title: 'Estoque insuficiente',
              description: `Apenas ${newItem.availableStock} unidade(s) disponível(eis) para este produto.`,
              variant: 'destructive',
            })
          }, 0)
          return prevItems
        }

        setTimeout(() => {
          toast({
            title: 'Item adicionado',
            description: `${newItem.title} foi adicionado ao carrinho.`,
          })
        }, 0)

        return [...prevItems, { ...newItem, quantity }]
      }
    })
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => {
      const item = prevItems.find((i) => i.id === id)
      if (item) {
        setTimeout(() => {
          toast({
            title: 'Item removido',
            description: `${item.title} foi removido do carrinho.`,
          })
        }, 0)
      }
      return prevItems.filter((item) => item.id !== id)
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
      return
    }

    setItems((prevItems) => {
      const item = prevItems.find((i) => i.id === id)
      
      if (!item) return prevItems

      if (quantity > item.availableStock) {
        setTimeout(() => {
          toast({
            title: 'Estoque insuficiente',
            description: `Apenas ${item.availableStock} unidade(s) disponível(eis) para este produto.`,
            variant: 'destructive',
          })
        }, 0)
        return prevItems
      }

      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    })
  }

  const clearCart = () => {
    setItems([])
    toast({
      title: 'Carrinho limpo',
      description: 'Todos os itens foram removidos do carrinho.',
    })
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotal = () => {
    return getSubtotal()
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getSubtotal,
        getTotal,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}
