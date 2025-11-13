'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    Search,
    Filter,
    SlidersHorizontal,
    BookOpen,
    Clock,
    Users,
    Star
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { CourseDetailsModal } from '@/components/CourseDetailsModal'
import { CoursePurchaseModal } from '@/components/CoursePurchaseModal'

interface Course {
  id: number
  title: string
  description: string
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
  modules: number
  color: string
}

const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Reprodução e genética animal',
    description: 'Aprenda os fundamentos da reprodução e melhoramento genético animal para otimizar a produtividade do seu rebanho.',
    category: 'Pecuaria',
    instructor: 'Dr. Carlos Silva',
    duration: '8 horas',
    level: 'Intermediario',
    rating: 4.8,
    students: 1250,
    price: 299,
    image: '/fotos/treinamentos/reproducaoegenetica.png',
    progress: 65,
    enrolled: true,
    featured: true,
    lessons: 24,
    modules: 6,
    color: 'from-emerald-400 to-emerald-600'
  },
  {
    id: 2,
    title: 'Como escolher e comprar sêmen de qualidade',
    description: 'Descubra os critérios essenciais para selecionar sêmen de alta qualidade e garantir melhores resultados na reprodução.',
    category: 'Tecnologia',
    instructor: 'Eng. Maria Santos',
    duration: '12 horas',
    level: 'Avancado',
    rating: 4.9,
    students: 850,
    price: 499,
    image: '/fotos/treinamentos/comoescolherecomprar.png',
    progress: 30,
    enrolled: true,
    featured: true,
    lessons: 36,
    modules: 8,
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 3,
    title: 'Como avaliar e comprar cavalos e gado com segurança',
    description: 'Técnicas profissionais de avaliação de animais para fazer compras seguras e rentáveis no agronegócio.',
    category: 'Agricultura',
    instructor: 'Dr. João Oliveira',
    duration: '6 horas',
    level: 'Iniciante',
    rating: 4.7,
    students: 2100,
    price: 199,
    image: '/fotos/treinamentos/comoavaliarecomprar.png',
    featured: true,
    lessons: 18,
    modules: 5,
    color: 'from-amber-400 to-amber-600'
  },
  {
    id: 4,
    title: 'Avaliação de custo benefício em compras agro',
    description: 'Aprenda a analisar o custo-benefício de suas aquisições e maximize o retorno dos seus investimentos no agro.',
    category: 'Pecuaria',
    instructor: 'Dra. Ana Costa',
    duration: '10 horas',
    level: 'Avancado',
    rating: 4.9,
    students: 680,
    price: 399,
    image: '/fotos/treinamentos/avaliacaodecusto.png',
    lessons: 30,
    modules: 7,
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: 5,
    title: 'Sanidade animal',
    description: 'Conheça as principais práticas de manejo sanitário para manter seu rebanho saudável e produtivo.',
    category: 'Gestao',
    instructor: 'Prof. Roberto Lima',
    duration: '15 horas',
    level: 'Intermediario',
    rating: 4.6,
    students: 1580,
    price: 349,
    image: '/fotos/treinamentos/sanidadeanimal.png',
    lessons: 42,
    modules: 10,
    color: 'from-red-400 to-red-600'
  },
  {
    id: 6,
    title: 'Planejamento de pastagem e capacidade de suporte',
    description: 'Estratégias avançadas para planejar e gerenciar pastagens, otimizando a capacidade de suporte do seu sistema.',
    category: 'Agricultura',
    instructor: 'Eng. Pedro Alves',
    duration: '7 horas',
    level: 'Intermediario',
    rating: 4.7,
    students: 920,
    price: 249,
    image: '/fotos/treinamentos/planejamentodepastagem.png',
    lessons: 21,
    modules: 6,
    color: 'from-green-400 to-green-600'
  }
]

export default function Treinamentos() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all')
  const [showCourseDetailsModal, setShowCourseDetailsModal] = useState(false)
  const [showCoursePurchaseModal, setShowCoursePurchaseModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const getLevelBadgeStyles = (level: string) => {
    switch (level) {
      case 'Iniciante':
        return { backgroundColor: '#FFF5D9', color: '#333333' }
      case 'Intermediario':
        return { backgroundColor: '#FFEBD2', color: '#333333' }
      case 'Avancado':
        return { backgroundColor: '#DDEAFD', color: '#004B87' }
      default:
        return { backgroundColor: '#F3F4F6', color: '#333333' }
    }
  }

  const filteredCourses = mockCourses.filter(course => {
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !course.category.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (selectedLevel !== 'all' && course.level !== selectedLevel) return false
    if (selectedCategory !== 'all' && course.category !== selectedCategory) return false

    if (selectedPriceRange !== 'all') {
      const price = course.price
      if (selectedPriceRange === '0-200' && price > 200) return false
      if (selectedPriceRange === '200-400' && (price < 200 || price > 400)) return false
      if (selectedPriceRange === '400+' && price < 400) return false
    }

    return true
  })

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedLevel('all')
    setSelectedCategory('all')
    setSelectedPriceRange('all')
  }

  const hasActiveFilters = !!(searchQuery || selectedLevel !== 'all' || selectedCategory !== 'all' || selectedPriceRange !== 'all')

  const levels = [
    { name: 'Iniciante', count: mockCourses.filter(c => c.level === 'Iniciante').length },
    { name: 'Intermediario', count: mockCourses.filter(c => c.level === 'Intermediario').length },
    { name: 'Avancado', count: mockCourses.filter(c => c.level === 'Avancado').length },
  ]

  const categories = [
    { name: 'Pecuaria', count: mockCourses.filter(c => c.category === 'Pecuaria').length },
    { name: 'Agricultura', count: mockCourses.filter(c => c.category === 'Agricultura').length },
    { name: 'Tecnologia', count: mockCourses.filter(c => c.category === 'Tecnologia').length },
    { name: 'Gestao', count: mockCourses.filter(c => c.category === 'Gestao').length },
  ].filter(cat => cat.count > 0)

  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-full">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Treinamentos</h1>
          <p className="text-muted-foreground">Desenvolva suas habilidades no agronegócio com nossos cursos especializados</p>
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Categorias</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat.name} value={cat.name}>{cat.name} ({cat.count})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os níveis</SelectItem>
                    {levels.map(level => (
                      <SelectItem key={level.name} value={level.name}>{level.name} ({level.count})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Preço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os preços</SelectItem>
                    <SelectItem value="0-200">Até R$ 200</SelectItem>
                    <SelectItem value="200-400">R$ 200 - R$ 400</SelectItem>
                    <SelectItem value="400+">Acima de R$ 400</SelectItem>
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    className="h-10 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    onClick={clearAllFilters}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Limpar Filtros
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="rounded-lg border bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-300 h-full min-h-[500px]">
              <div className="p-0 h-full flex flex-col">
                <div className="aspect-video rounded-t-lg overflow-hidden relative">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                      <BookOpen className="h-12 w-12 text-white" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-grow min-h-[200px]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <Badge
                          style={getLevelBadgeStyles(course.level)}
                          className="mb-2 text-xs"
                        >
                          {course.level}
                        </Badge>
                        <h3 className="font-bold text-lg leading-tight">{course.title}</h3>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">{course.description}</p>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <BookOpen className="h-4 w-4" />
                          {course.modules} módulos
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {course.students} alunos
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Instrutor: {course.instructor}</p>
                    </div>
                    <div className="text-left my-4">
                        <p className="text-xl font-bold text-gray-800">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(course.price)} à vista
                        </p>
                        <p className="text-sm text-gray-600">
                            💳 ou em até 12x de {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((course.price * 1.2) / 12)}
                        </p>
                    </div>
                  </div>
                  <div className="space-y-2 mt-auto">
                    <Button variant="outline" className="w-full" onClick={() => {
                      setSelectedCourse(course);
                      setShowCourseDetailsModal(true);
                    }}>Ver Detalhes</Button>
                    <Button className="w-full" onClick={() => {
                      setSelectedCourse(course);
                      setShowCoursePurchaseModal(true);
                    }}>Comprar</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#101828] mb-2">Nenhum curso encontrado</h3>
            <p className="text-gray-600 mb-6">
              Não encontramos cursos que correspondam aos seus filtros.
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

        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 text-center">
          <h3 className="font-bold text-xl mb-2">Não encontrou o que procura?</h3>
          <p className="text-muted-foreground mb-4">Nossa equipe está sempre criando novos conteúdos. Sugira uma trilha!</p>
          <Button variant="outline">Sugerir Trilha</Button>
        </div>
      </div>

      <CourseDetailsModal
        isOpen={showCourseDetailsModal}
        onClose={() => setShowCourseDetailsModal(false)}
        course={selectedCourse}
        onPurchaseClick={(courseToPurchase) => {
          setSelectedCourse(courseToPurchase);
          setShowCourseDetailsModal(false);
          setShowCoursePurchaseModal(true);
        }}
      />

      <CoursePurchaseModal
        isOpen={showCoursePurchaseModal}
        onClose={() => setShowCoursePurchaseModal(false)}
        course={selectedCourse}
      />
    </div>
  );
}
