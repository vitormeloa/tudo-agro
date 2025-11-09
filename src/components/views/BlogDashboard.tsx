'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import PostCard from '@/components/blog/PostCard'
import ThemeFilter from '@/components/blog/ThemeFilter'
import { Button } from '@/components/ui/button'
import {HelpCircle, Loader2} from 'lucide-react'
import { mockBlogPosts, mockThemes } from '@/lib/mock-blog-posts'
import {Card} from "@/components/ui/card";

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

export default function BlogDashboard() {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [themes] = useState<BlogTheme[]>(mockThemes)
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [savedPostIds, setSavedPostIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const themeParam = searchParams.get('theme')
    if (themeParam) {
      const theme = themes.find((t) => t.slug === themeParam)
      if (theme) {
        setSelectedTheme(theme.id)
      }
    }
  }, [searchParams, themes])

  useEffect(() => {
    fetchSavedPosts()
    loadPosts()
  }, [])

  useEffect(() => {
    loadPosts()
  }, [selectedTheme])

  const loadPosts = () => {
    setLoading(true)
    setTimeout(() => {
      let filteredPosts = mockBlogPosts.filter((post) => post.published)

      if (selectedTheme) {
        filteredPosts = filteredPosts.filter((post) => post.theme_id === selectedTheme)
      }

      const formattedPosts: BlogPost[] = filteredPosts.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        featured_image: post.featured_image,
        views: post.views,
        likes: post.likes,
        published_at: post.published_at,
        blog_themes: {
          id: post.theme_id,
          name: post.theme_name,
          slug: post.theme_slug,
          color: post.theme_color,
        },
        users: {
          id: post.author_id,
          name: post.author_name,
          email: post.author_email,
        },
      }))

      setPosts(formattedPosts)
      setLoading(false)
    }, 300)
  }

  const fetchSavedPosts = async () => {
    try {
      const response = await fetch('/api/blog/saved')
      if (response.ok) {
        const data = await response.json()
        if (data.savedPosts) {
          const savedIds = new Set<string>(
            data.savedPosts.map((sp: any) => String(sp.blog_posts?.id)).filter(Boolean) as string[]
          )
          setSavedPostIds(savedIds)
        }
      }
    } catch (error) {
      // Silent fail
    }
  }

  const handleThemeChange = (themeId: string | null) => {
    setSelectedTheme(themeId)
  }

  const handleSaveToggle = () => {
    fetchSavedPosts()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#101828] mb-2">Blog do Agro</h1>
        <p className="text-gray-600">Fique por dentro das ultimas noticias, tendencias e dicas do agronegocio</p>
      </div>

      {themes.length > 0 && (
        <ThemeFilter
          themes={themes}
          selectedTheme={selectedTheme}
          onThemeChange={handleThemeChange}
        />
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20">
          <div className="flex justify-center mb-4">
            <Image
              src="/fotos/tudo-agro-logo.png"
              alt="TudoAgro Logo"
              width={120}
              height={120}
              className="opacity-60"
              unoptimized
            />
          </div>
          <h3 className="text-xl font-semibold text-[#101828] mb-2">
            Nenhum post encontrado
          </h3>
          <p className="text-gray-600">
            {selectedTheme
              ? 'Nao ha posts neste tema ainda.'
              : 'Ainda nao ha posts publicados.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isSaved={savedPostIds.has(post.id)}
              onSaveToggle={handleSaveToggle}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-12">
        <div className="flex items-center space-x-2">
          <Button variant="outline" disabled className="border-gray-300 text-gray-400">
            Anterior
          </Button>
          <Button className="bg-primary text-white">1</Button>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">2</Button>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">3</Button>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            Proximo
          </Button>
        </div>
      </div>

        <div className="border-t pt-6 mt-8">
            <Card className="bg-muted/50">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <HelpCircle className="h-5 w-5 text-primary" />
                            <div>
                                <p className="font-medium">Dúvidas sobre o blog?</p>
                                <p className="text-sm text-muted-foreground">Nossa equipe está pronta para ajudar</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline">
                                Central de Ajuda
                            </Button>
                            <Button>
                                Falar com Suporte
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </div>
  )
}
