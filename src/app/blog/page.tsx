'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import PostCard from '@/components/blog/PostCard'
import ThemeFilter from '@/components/blog/ThemeFilter'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { mockBlogPosts, mockThemes } from '@/lib/mock-blog-posts'

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

export default function BlogPage() {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [themes] = useState<BlogTheme[]>(mockThemes)
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [savedPostIds, setSavedPostIds] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

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
    setCurrentPage(1) // Reset para primeira página quando muda o tema
  }, [selectedTheme])

  useEffect(() => {
    loadPosts()
  }, [selectedTheme, currentPage])

  const loadPosts = () => {
    setLoading(true)
    setTimeout(() => {
      let filteredPosts = mockBlogPosts.filter((post) => post.published)
      
      if (selectedTheme) {
        filteredPosts = filteredPosts.filter((post) => post.theme_id === selectedTheme)
      }
      
      // Transformar para o formato esperado
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
          const savedIds = new Set(
            data.savedPosts.map((sp: any) => sp.blog_posts?.id).filter(Boolean)
          )
          setSavedPostIds(savedIds)
        }
      }
    } catch (error) {
      // User not logged in, ignore
    }
  }

  const handleThemeChange = (themeId: string | null) => {
    setSelectedTheme(themeId)
  }

  const handleSaveToggle = () => {
    fetchSavedPosts()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
            Blog do Agro
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-0 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Fique por dentro das últimas notícias, tendências e dicas do agronegócio brasileiro
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Theme Filters */}
        {themes.length > 0 && (
          <ThemeFilter
            themes={themes}
            selectedTheme={selectedTheme}
            onThemeChange={handleThemeChange}
          />
        )}

        {/* Posts Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum post encontrado
            </h3>
            <p className="text-gray-600">
              {selectedTheme
                ? 'Não há posts neste tema ainda.'
                : 'Ainda não há posts publicados.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <Button variant="outline" disabled className="border-gray-300 text-gray-400">
              Anterior
            </Button>
            <Button className="bg-emerald-600 text-white">1</Button>
            <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">2</Button>
            <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">3</Button>
            <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
              Próximo
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
