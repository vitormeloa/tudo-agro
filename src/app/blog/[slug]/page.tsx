'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Eye, Heart, Bookmark, Share2, User } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { mockBlogPosts } from '@/lib/mock-blog-posts'

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
  content: string
  featured_image: string | null
  views: number
  likes: number
  published_at: string
  blog_themes: BlogTheme | null
  users: PostAuthor
}

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (params.slug) {
      fetchPost()
      fetchSavedStatus()
    }
  }, [params.slug])

  const fetchPost = async () => {
    setLoading(true)
    try {
      const mockPost = mockBlogPosts.find((p) => p.slug === params.slug)
      
      if (mockPost) {
        const formattedPost: BlogPost = {
          id: mockPost.id,
          title: mockPost.title,
          slug: mockPost.slug,
          excerpt: mockPost.excerpt,
          content: mockPost.content,
          featured_image: mockPost.featured_image,
          views: mockPost.views,
          likes: mockPost.likes,
          published_at: mockPost.published_at,
          blog_themes: {
            id: mockPost.theme_id,
            name: mockPost.theme_name,
            slug: mockPost.theme_slug,
            color: mockPost.theme_color,
          },
          users: {
            id: mockPost.author_id,
            name: mockPost.author_name,
            email: mockPost.author_email,
          },
        }
        setPost(formattedPost)
      } else {
        setPost(null)
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      setPost(null)
    } finally {
      setLoading(false)
    }
  }

  const fetchSavedStatus = async () => {
    if (!user) return
    
    try {
      const response = await fetch('/api/blog/saved')
      if (response.ok) {
        const data = await response.json()
        if (data.savedPosts) {
          const savedIds = data.savedPosts.map((sp: any) => sp.blog_posts?.id).filter(Boolean)
        }
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    if (post && user) {
      checkSavedStatus()
    }
  }, [post, user])

  const checkSavedStatus = async () => {
    if (!post || !user) return
    
    try {
      const response = await fetch('/api/blog/saved')
      if (response.ok) {
        const data = await response.json()
        if (data.savedPosts) {
          const isPostSaved = data.savedPosts.some(
            (sp: any) => sp.blog_posts?.id === post.id
          )
          setIsSaved(isPostSaved)
        }
      }
    } catch (error) {
    }
  }

  const handleSaveClick = async () => {
    if (!user) {
      toast({
        title: 'Login necessário',
        description: 'Faça login para salvar posts',
        variant: 'default',
      })
      return
    }

    if (!post) return

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

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || '',
          url: window.location.href,
        })
      } catch (error) {
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: 'Link copiado!',
        description: 'O link do post foi copiado para a área de transferência',
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`
    }
    return views.toString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/5">
        <Header />
        <div className="flex items-center justify-center py-40">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold text-[#101828] mb-4">Post não encontrado</h1>
          <p className="text-gray-600 mb-8">O post que você está procurando não existe.</p>
          <Link href="/blog">
            <Button>Voltar para o blog</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-primary hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Voltar para o blog</span>
        </Link>

        {}
        {post.featured_image && (
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden mb-8 shadow-lg">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
              unoptimized
            />
          </div>
        )}

        {}
        <header className="mb-8">
          {}
          {post.blog_themes && (
            <Link
              href={`/blog?theme=${post.blog_themes.slug}`}
              className="inline-block mb-4"
            >
              <span
                className="px-4 py-2 rounded-full text-sm font-semibold text-white shadow-md hover:shadow-lg transition-shadow"
                style={{ backgroundColor: post.blog_themes.color }}
              >
                {post.blog_themes.name}
              </span>
            </Link>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#101828] mb-4">
            {post.title}
          </h1>

          {}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-medium">{post.users.name || post.users.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.published_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{formatViews(post.views)} visualizações</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>{post.likes} curtidas</span>
            </div>
          </div>

          {}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleSaveClick}
              disabled={isSaving}
              variant="outline"
              size="sm"
              className={cn(
                "gap-2",
                isSaved && "bg-primary/5 border-primary/20"
              )}
            >
              <Bookmark
                className={cn(
                  "w-4 h-4",
                  isSaved && "fill-primary text-primary"
                )}
              />
              {isSaved ? 'Salvo' : 'Salvar'}
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Compartilhar
            </Button>
          </div>
        </header>

        {}
        {post.excerpt && (
          <div className="bg-primary/5 border-l-4 border-primary p-4 mb-8 rounded-r-lg">
            <p className="text-lg text-gray-700 italic">{post.excerpt}</p>
          </div>
        )}

        {}
        <div
          className="blog-content mb-12 text-base sm:text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <Footer />
    </div>
  )
}
