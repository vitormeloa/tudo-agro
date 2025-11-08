export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          phone: string | null
          cpf: string | null
          cnpj: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          phone?: string | null
          cpf?: string | null
          cnpj?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          phone?: string | null
          cpf?: string | null
          cnpj?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      roles: {
        Row: {
          id: string
          name: string
          description: string | null
          permissions: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          permissions: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          permissions?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role_id?: string
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string
          breed: string | null
          gender: string | null
          age: string | null
          weight: number | null
          price: number | null
          negotiable: boolean
          status: string
          featured: boolean
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category: string
          breed?: string | null
          gender?: string | null
          age?: string | null
          weight?: number | null
          price?: number | null
          negotiable?: boolean
          status?: string
          featured?: boolean
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: string
          breed?: string | null
          gender?: string | null
          age?: string | null
          weight?: number | null
          price?: number | null
          negotiable?: boolean
          status?: string
          featured?: boolean
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      product_images: {
        Row: {
          id: string
          url: string
          alt: string | null
          order: number
          product_id: string
          created_at: string
        }
        Insert: {
          id?: string
          url: string
          alt?: string | null
          order?: number
          product_id: string
          created_at?: string
        }
        Update: {
          id?: string
          url?: string
          alt?: string | null
          order?: number
          product_id?: string
          created_at?: string
        }
      }
      auctions: {
        Row: {
          id: string
          title: string
          description: string | null
          start_date: string
          end_date: string
          starting_bid: number
          current_bid: number | null
          status: string
          product_id: string
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          start_date: string
          end_date: string
          starting_bid: number
          current_bid?: number | null
          status?: string
          product_id: string
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          start_date?: string
          end_date?: string
          starting_bid?: number
          current_bid?: number | null
          status?: string
          product_id?: string
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      bids: {
        Row: {
          id: string
          amount: number
          auction_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          amount: number
          auction_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          amount?: number
          auction_id?: string
          user_id?: string
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          amount: number
          status: string
          payment_method: string | null
          payment_id: string | null
          buyer_id: string
          seller_id: string
          product_id: string | null
          auction_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          amount: number
          status?: string
          payment_method?: string | null
          payment_id?: string | null
          buyer_id: string
          seller_id: string
          product_id?: string | null
          auction_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          amount?: number
          status?: string
          payment_method?: string | null
          payment_id?: string | null
          buyer_id?: string
          seller_id?: string
          product_id?: string | null
          auction_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          content: string
          read: boolean
          sender_id: string
          receiver_id: string
          created_at: string
        }
        Insert: {
          id?: string
          content: string
          read?: boolean
          sender_id: string
          receiver_id: string
          created_at?: string
        }
        Update: {
          id?: string
          content?: string
          read?: boolean
          sender_id?: string
          receiver_id?: string
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          rating: number
          comment: string | null
          reviewer_id: string
          reviewee_id: string
          product_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          rating: number
          comment?: string | null
          reviewer_id: string
          reviewee_id: string
          product_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          rating?: number
          comment?: string | null
          reviewer_id?: string
          reviewee_id?: string
          product_id?: string | null
          created_at?: string
        }
      }
      addresses: {
        Row: {
          id: string
          street: string
          city: string
          state: string
          zip_code: string
          country: string
          is_default: boolean
          user_id: string
          product_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          street: string
          city: string
          state: string
          zip_code: string
          country?: string
          is_default?: boolean
          user_id: string
          product_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          street?: string
          city?: string
          state?: string
          zip_code?: string
          country?: string
          is_default?: boolean
          user_id?: string
          product_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          name: string
          url: string
          type: string
          user_id: string
          product_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          url: string
          type: string
          user_id: string
          product_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          url?: string
          type?: string
          user_id?: string
          product_id?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']

export type Role = Database['public']['Tables']['roles']['Row']
export type RoleInsert = Database['public']['Tables']['roles']['Insert']
export type RoleUpdate = Database['public']['Tables']['roles']['Update']

export type UserRole = Database['public']['Tables']['user_roles']['Row']
export type UserRoleInsert = Database['public']['Tables']['user_roles']['Insert']

export type Product = Database['public']['Tables']['products']['Row']
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type ProductUpdate = Database['public']['Tables']['products']['Update']

export type ProductImage = Database['public']['Tables']['product_images']['Row']
export type ProductImageInsert = Database['public']['Tables']['product_images']['Insert']

export type Auction = Database['public']['Tables']['auctions']['Row']
export type AuctionInsert = Database['public']['Tables']['auctions']['Insert']
export type AuctionUpdate = Database['public']['Tables']['auctions']['Update']

export type Bid = Database['public']['Tables']['bids']['Row']
export type BidInsert = Database['public']['Tables']['bids']['Insert']

export type Transaction = Database['public']['Tables']['transactions']['Row']
export type TransactionInsert = Database['public']['Tables']['transactions']['Insert']
export type TransactionUpdate = Database['public']['Tables']['transactions']['Update']

export type Message = Database['public']['Tables']['messages']['Row']
export type MessageInsert = Database['public']['Tables']['messages']['Insert']

export type Review = Database['public']['Tables']['reviews']['Row']
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert']

export type Address = Database['public']['Tables']['addresses']['Row']
export type AddressInsert = Database['public']['Tables']['addresses']['Insert']
export type AddressUpdate = Database['public']['Tables']['addresses']['Update']

export type Document = Database['public']['Tables']['documents']['Row']
export type DocumentInsert = Database['public']['Tables']['documents']['Insert']

export type Permission = 
  | 'admin:read'
  | 'admin:write'
  | 'admin:delete'
  | 'user:read'
  | 'user:write'
  | 'user:delete'
  | 'product:read'
  | 'product:write'
  | 'product:delete'
  | 'auction:read'
  | 'auction:write'
  | 'auction:delete'
  | 'transaction:read'
  | 'transaction:write'
  | 'message:read'
  | 'message:write'
  | 'review:read'
  | 'review:write'

export type UserRole = 'admin' | 'vendedor' | 'comprador'

export interface UserWithRoles extends User {
  roles: (Role & { user_roles: UserRole })[]
}