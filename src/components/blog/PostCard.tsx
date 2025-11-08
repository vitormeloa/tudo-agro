'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Eye, Bookmark, Calendar } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

interface BlogTheme {
  id: string
  name: string
  slug: string
  color: string
}

interface PostAuthor {
  id: string
  name: string | null
  email: string
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featured_image: string | null
  views: number
  likes: number
  published_at: string
  blog_themes: BlogTheme | null
  users: PostAuthor
}

interface PostCardProps {
  post: BlogPost
  isSaved?: boolean
  onSaveToggle?: () => void
}

export default function PostCard({ post, isSaved: initialSaved, onSaveToggle }: PostCardProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isSaved, setIsSaved] = useState(initialSaved || false)
  const [isSaving, setIsSaving] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date)
  }

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`
    }
    return views.toString()
  }

  const handleSaveClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast({
        title: 'Login necessário',
        description: 'Faça login para salvar posts',
        variant: 'default',
      })
      return
    }

    setIsSaving(true)
    try {
      const method = isSaved ? 'DELETE' : 'POST'
      const url = isSaved
        ? `/api/blog/saved?post_id=${post.id}`
        : '/api/blog/saved'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: method === 'POST' ? JSON.stringify({ post_id: post.id }) : undefined,
      })

      if (response.ok) {
        setIsSaved(!isSaved)
        onSaveToggle?.()
        toast({
          title: isSaved ? 'Post removido' : 'Post salvo',
          description: isSaved
            ? 'Post removido dos salvos'
            : 'Post salvo com sucesso',
        })
      }
    } catch (error) {
      console.error('Error saving post:', error)
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o post',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Image */}
        <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-gradient-to-br from-primary/5 to-primary/5">
          {post.featured_image ? (
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-100 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-primary/30 text-4xl">🌾</div>
            </div>
          )}
          
          {/* Theme Badge */}
          {post.blog_themes && (
            <div
              className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md"
              style={{ backgroundColor: post.blog_themes.color }}
            >
              {post.blog_themes.name}
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={handleSaveClick}
            disabled={isSaving}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md transition-all duration-200",
              "hover:bg-white hover:scale-110",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isSaved && "bg-primary/10"
            )}
            aria-label={isSaved ? 'Remover dos salvos' : 'Salvar post'}
          >
            <Bookmark
              className={cn(
                "w-5 h-5 transition-colors",
                isSaved ? "fill-primary text-primary" : "text-gray-600"
              )}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 md:p-6">
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-[#101828] mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">
              {post.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.published_at)}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{formatViews(post.views)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{post.likes}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
