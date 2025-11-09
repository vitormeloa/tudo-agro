'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import {
    Search,
    Filter,
    SlidersHorizontal,
    BookOpen,
    Clock,
    Users,
    Star,
    Award,
    TrendingUp,
    PlayCircle,
    CheckCircle,
    BarChart, HelpCircle
} from 'lucide-react'

interface Course {
  id: number
  title: string
  category: string
  instructor: string
  duration: string
  level: 'Iniciante' | 'Intermediario' | 'Avancado'
  rating: number
  students: number
  price: number
  image: string
  progress?: number
  enrolled?: boolean
  featured?: boolean
  lessons: number
}

const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Gestao de Pastagens e Nutrição Bovina',
    category: 'Pecuaria',
    instructor: 'Dr. Carlos Silva',
    duration: '8 horas',
    level: 'Intermediario',
    rating: 4.8,
    students: 1250,
    price: 299,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80',
    progress: 65,
    enrolled: true,
    featured: true,
    lessons: 24
  },
  {
    id: 2,
    title: 'Agricultura de Precisão com Drones',
    category: 'Tecnologia',
    instructor: 'Eng. Maria Santos',
    duration: '12 horas',
    level: 'Avancado',
    rating: 4.9,
    students: 850,
    price: 499,
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80',
    progress: 30,
    enrolled: true,
    featured: true,
    lessons: 36
  },
  {
    id: 3,
    title: 'Manejo Integrado de Pragas',
    category: 'Agricultura',
    instructor: 'Dr. João Oliveira',
    duration: '6 horas',
    level: 'Iniciante',
    rating: 4.7,
    students: 2100,
    price: 199,
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
    featured: true,
    lessons: 18
  },
  {
    id: 4,
    title: 'Reproducao e Genetica Animal',
    category: 'Pecuaria',
    instructor: 'Dra. Ana Costa',
    duration: '10 horas',
    level: 'Avancado',
    rating: 4.9,
    students: 680,
    price: 399,
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80',
    lessons: 30
  },
  {
    id: 5,
    title: 'Administracao Rural e Gestao Financeira',
    category: 'Gestao',
    instructor: 'Prof. Roberto Lima',
    duration: '15 horas',
    level: 'Intermediario',
    rating: 4.6,
    students: 1580,
    price: 349,
    image: 'https://images.unsplash.com/photo-1554224311-beee415c201f?w=800&q=80',
    lessons: 42
  },
  {
    id: 6,
    title: 'Irrigacao Eficiente e Sustentavel',
    category: 'Agricultura',
    instructor: 'Eng. Pedro Alves',
    duration: '7 horas',
    level: 'Intermediario',
    rating: 4.7,
    students: 920,
    price: 249,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    lessons: 21
  }
]

export default function Treinamentos() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedLevel, setSelectedLevel] = useState<string>('')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('relevancia')
  const [viewMode, setViewMode] = useState<'all' | 'enrolled'>('all')

  const filteredCourses = mockCourses.filter(course => {
    if (viewMode === 'enrolled' && !course.enrolled) return false

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch = (
        course.title.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query)
      )
      if (!matchesSearch) return false
    }

    if (selectedCategory && course.category !== selectedCategory) return false
    if (selectedLevel && course.level !== selectedLevel) return false

    if (selectedPriceRange) {
      const price = course.price
      switch (selectedPriceRange) {
        case '0-200':
          if (price > 200) return false
          break
        case '200-400':
          if (price < 200 || price > 400) return false
          break
        case '400+':
          if (price < 400) return false
          break
      }
    }

    return true
  })

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'preco-menor':
        return a.price - b.price
      case 'preco-maior':
        return b.price - a.price
      case 'avaliacao':
        return b.rating - a.rating
      case 'popular':
        return b.students - a.students
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating
    }
  })

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedLevel('')
    setSelectedPriceRange('')
    setSortBy('relevancia')
  }

  const hasActiveFilters = !!(searchQuery || selectedCategory || selectedLevel || selectedPriceRange)

  const categories = [
    { name: 'Pecuaria', count: mockCourses.filter(c => c.category === 'Pecuaria').length },
    { name: 'Agricultura', count: mockCourses.filter(c => c.category === 'Agricultura').length },
    { name: 'Tecnologia', count: mockCourses.filter(c => c.category === 'Tecnologia').length },
    { name: 'Gestao', count: mockCourses.filter(c => c.category === 'Gestao').length }
  ]

  const enrolledCourses = mockCourses.filter(c => c.enrolled)
  const completedCount = enrolledCourses.filter(c => (c.progress || 0) === 100).length
  const inProgressCount = enrolledCourses.filter(c => (c.progress || 0) > 0 && (c.progress || 0) < 100).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#101828] mb-2">Treinamentos e Cursos</h1>
        <p className="text-gray-600">Desenvolva suas habilidades no agronegocio com nossos cursos especializados</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="shadow-sm border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cursos Matriculados</p>
                <p className="text-2xl font-bold text-primary">{enrolledCourses.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Em Andamento</p>
                <p className="text-2xl font-bold text-amber-600">{inProgressCount}</p>
              </div>
              <PlayCircle className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Concluidos</p>
                <p className="text-2xl font-bold text-emerald-600">{completedCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Horas de Estudo</p>
                <p className="text-2xl font-bold text-primary">42h</p>
              </div>
              <BarChart className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button
          variant={viewMode === 'all' ? 'default' : 'outline'}
          onClick={() => setViewMode('all')}
          className={viewMode === 'all' ? 'bg-primary' : 'border-primary text-primary'}
        >
          Todos os Cursos
        </Button>
        <Button
          variant={viewMode === 'enrolled' ? 'default' : 'outline'}
          onClick={() => setViewMode('enrolled')}
          className={viewMode === 'enrolled' ? 'bg-primary' : 'border-primary text-primary'}
        >
          Meus Cursos
        </Button>
      </div>

      <Card className="shadow-sm border">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar por curso, instrutor, categoria..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <Button
              className="bg-primary hover:bg-[#2E7A5A] text-white px-8 h-12"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filtros
            </Button>
          </div>

          {showFilters && (
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat.name} value={cat.name}>{cat.name} ({cat.count})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Iniciante">Iniciante</SelectItem>
                    <SelectItem value="Intermediario">Intermediario</SelectItem>
                    <SelectItem value="Avancado">Avancado</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Preco" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="0-200">Ate R$ 200</SelectItem>
                    <SelectItem value="200-400">R$ 200 - R$ 400</SelectItem>
                    <SelectItem value="400+">Acima de R$ 400</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Ordenar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevancia">Mais Relevantes</SelectItem>
                    <SelectItem value="preco-menor">Menor Preco</SelectItem>
                    <SelectItem value="preco-maior">Maior Preco</SelectItem>
                    <SelectItem value="avaliacao">Melhor Avaliacao</SelectItem>
                    <SelectItem value="popular">Mais Popular</SelectItem>
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    className="h-10 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    onClick={clearAllFilters}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Limpar
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${
              selectedCategory === category.name ? 'ring-2 ring-emerald-500 shadow-lg' : ''
            }`}
          >
            <CardContent className="p-4 text-center">
              <div className="inline-flex px-3 py-1 rounded-full text-sm font-medium mb-2 bg-primary/10 text-primary">
                {category.name}
              </div>
              <div className="text-2xl font-bold text-[#101828]">{category.count}</div>
              <div className="text-sm text-gray-500">cursos</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 font-medium">Filtros ativos:</span>
          {searchQuery && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Busca: "{searchQuery}"
            </Badge>
          )}
          {selectedCategory && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Categoria: {selectedCategory}
            </Badge>
          )}
          {selectedLevel && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Nivel: {selectedLevel}
            </Badge>
          )}
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0">
            <div className="relative">
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              {course.featured && (
                <Badge className="absolute top-4 left-4 bg-amber-500 text-white font-semibold">
                  <Award className="w-3 h-3 mr-1" />
                  Destaque
                </Badge>
              )}
              {course.enrolled && (
                <Badge className="absolute top-4 right-4 bg-primary text-white font-semibold">
                  Matriculado
                </Badge>
              )}
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">{course.category}</Badge>
                <Badge variant="outline" className="text-xs">{course.level}</Badge>
              </div>

              <h3 className="font-bold text-lg text-[#101828] mb-3 line-clamp-2">{course.title}</h3>

              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Users className="w-4 h-4 mr-1" />
                {course.instructor}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {course.lessons} aulas
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({course.students})</span>
                </div>
                <div className="font-bold text-primary text-xl">
                  R$ {course.price}
                </div>
              </div>

              {course.enrolled && typeof course.progress === 'number' && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progresso</span>
                    <span className="font-semibold text-primary">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              )}

              <Link href={`/dashboard/treinamentos/${course.id}`}>
                <Button className="w-full bg-primary hover:bg-[#2E7A5A] text-white">
                  {course.enrolled ? (
                    <>
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Continuar Curso
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Ver Detalhes
                    </>
                  )}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedCourses.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#101828] mb-2">Nenhum curso encontrado</h3>
          <p className="text-gray-600 mb-6">
            Nao encontramos cursos que correspondam aos seus filtros.
          </p>
          {hasActiveFilters && (
            <Button
              onClick={clearAllFilters}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Limpar todos os filtros
            </Button>
          )}
        </div>
      )}

        <div className="border-t pt-6 mt-8">
            <Card className="bg-muted/50">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <HelpCircle className="h-5 w-5 text-primary" />
                            <div>
                                <p className="font-medium">Dúvidas sobre os treinamentos?</p>
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
