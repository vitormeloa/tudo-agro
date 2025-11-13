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

export default function Treinamentos() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all')
  const [showCategoriesModal, setShowCategoriesModal] = useState(false)
  const [showCourseDetailsModal, setShowCourseDetailsModal] = useState(false)
  const [showCoursePurchaseModal, setShowCoursePurchaseModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const mockCourses: Course[] = [
    {
      id: 1,
      title: 'Fundamentos do Agronegócio',
      description: 'Aprenda os conceitos essenciais do agronegócio brasileiro, desde a produção até a comercialização.',
      category: 'Geral',
      instructor: 'Dr. Carlos Silva',
      duration: '40h',
      level: 'Iniciante',
      rating: 4.8,
      students: 1240,
      price: 29.90,
      image: '/fotos/blog/blog-post-1.jpg',
      lessons: 12,
      modules: 12,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Marketing Digital no Agro',
      description: 'Domine estratégias de marketing digital para promover seu negócio agropecuário nas redes sociais.',
      category: 'Marketing',
      instructor: 'Ana Costa',
      duration: '60h',
      level: 'Intermediario',
      rating: 4.9,
      students: 856,
      price: 29.90,
      image: '/fotos/blog/blog-post-2.jpg',
      lessons: 18,
      modules: 18,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 3,
      title: 'Compliance e Regulamentação Rural',
      description: 'Entenda as normas e regulamentações que regem o setor rural e mantenha sua propriedade em conformidade.',
      category: 'Jurídico',
      instructor: 'Roberto Lima',
      duration: '35h',
      level: 'Avancado',
      rating: 4.7,
      students: 634,
      price: 29.90,
      image: '/fotos/blog/blog-post-3.jpg',
      lessons: 10,
      modules: 10,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 4,
      title: 'Gestão de Pessoas no Campo',
      description: 'Desenvolva habilidades de liderança e gestão para formar equipes produtivas no ambiente rural.',
      category: 'Gestão',
      instructor: 'Fernanda Souza',
      duration: '25h',
      level: 'Intermediario',
      rating: 4.5,
      students: 980,
      price: 39.90,
      image: '/fotos/blog/blog-post-4.jpg',
      lessons: 8,
      modules: 8,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 5,
      title: 'Finanças para Produtores Rurais',
      description: 'Aprenda a gerenciar suas finanças, controlar custos e maximizar a rentabilidade da sua propriedade rural.',
      category: 'Finanças',
      instructor: 'Paulo Mendes',
      duration: '50h',
      level: 'Avancado',
      rating: 4.9,
      students: 720,
      price: 49.90,
      image: '/fotos/blog/blog-post-5.jpg',
      lessons: 15,
      modules: 15,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 6,
      title: 'Tecnologias de Irrigação',
      description: 'Conheça as tecnologias modernas de irrigação para otimizar o uso de água e aumentar a produtividade.',
      category: 'Tecnologia',
      instructor: 'Mariana Dias',
      duration: '30h',
      level: 'Intermediario',
      rating: 4.6,
      students: 1100,
      price: 34.90,
      image: '/fotos/blog/blog-post-6.jpg',
      lessons: 10,
      modules: 10,
      color: 'from-teal-500 to-teal-600'
    },
  ];

  const filteredCourses = mockCourses.filter(course => {
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedLevel !== 'all' && course.level !== selectedLevel) return false;
    if (selectedCategory !== 'all' && course.category !== selectedCategory) return false;

    if (selectedPriceRange !== 'all') {
      const price = course.price;
      if (selectedPriceRange === '0-30' && price > 30) return false;
      if (selectedPriceRange === '30-50' && (price < 30 || price > 50)) return false;
      if (selectedPriceRange === '50+' && price < 50) return false;
    }

    return true;
  });

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedLevel('all');
    setSelectedCategory('all');
    setSelectedPriceRange('all');
  };

  const hasActiveFilters = !!(searchQuery || selectedLevel !== 'all' || selectedCategory !== 'all' || selectedPriceRange !== 'all');

  const levels = [
    { name: 'Iniciante', count: mockCourses.filter(c => c.level === 'Iniciante').length },
    { name: 'Intermediario', count: mockCourses.filter(c => c.level === 'Intermediario').length },
    { name: 'Avancado', count: mockCourses.filter(c => c.level === 'Avancado').length },
  ];

  const categories = [
    { name: 'Geral', count: mockCourses.filter(c => c.category === 'Geral').length },
    { name: 'Marketing', count: mockCourses.filter(c => c.category === 'Marketing').length },
    { name: 'Jurídico', count: mockCourses.filter(c => c.category === 'Jurídico').length },
    { name: 'Gestão', count: mockCourses.filter(c => c.category === 'Gestão').length },
    { name: 'Finanças', count: mockCourses.filter(c => c.category === 'Finanças').length },
    { name: 'Tecnologia', count: mockCourses.filter(c => c.category === 'Tecnologia').length },
  ];

  const visibleLevels = levels.slice(0, 5);
  const hiddenLevels = levels.slice(5);

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
                    <SelectItem value="0-30">Até R$ 30</SelectItem>
                    <SelectItem value="30-50">R$ 30 - R$ 50</SelectItem>
                    <SelectItem value="50+">Acima de R$ 50</SelectItem>
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
          {filteredCourses.map((course, index) => (
            <Card key={course.id} className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 h-full min-h-[500px]">
              <div className="p-0 h-full flex flex-col">
                <div className={`aspect-video bg-gradient-to-br ${course.color} rounded-t-lg flex items-center justify-center relative`}>
                  <BookOpen className="h-12 w-12 text-white" />
                  <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-transparent hover:bg-primary/80 absolute top-3 left-3 bg-white/20 text-white border-0">
                    {course.level}
                  </div>
                </div>
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-grow min-h-[200px]">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg leading-tight">{course.title}</h3>
                      <span className="text-lg font-bold text-primary flex-shrink-0 min-w-max">R$ {course.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
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
                  </div>
                  <div className="space-y-2 mt-auto">
                    <Button variant="outline" className="w-full" onClick={() => {
                      setSelectedCourse(course);
                      setShowCourseDetailsModal(true);
                    }}>Ver Detalhes</Button>
                    <Button className="w-full" onClick={() => {
                      setSelectedCourse(course);
                      setShowCoursePurchaseModal(true);
                    }}>Comprar - R$ {course.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

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
          setShowCourseDetailsModal(false); // Close details modal
          setShowCoursePurchaseModal(true); // Open purchase modal
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
