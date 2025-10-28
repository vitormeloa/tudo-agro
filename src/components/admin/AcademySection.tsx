'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  GraduationCap, BookOpen, Users, TrendingUp, Upload, Search, Filter,
  Plus, Eye, Edit, Trash2, Star, Play, Pause, CheckCircle, XCircle,
  Clock, AlertTriangle, DollarSign, Calendar, User, Tag, BarChart3,
  Download, Brain, MessageSquare, Award, Target, Zap, Shield, Archive
} from 'lucide-react'
import { useAdminPermissions } from '@/hooks/useAdminPermissions'

interface Course {
  id: string
  title: string
  description: string
  category: string
  instructor: string
  duration: number
  students: number
  completion: number
  rating: number
  status: 'active' | 'draft' | 'archived' | 'pending'
  featured: boolean
  createdAt: string
  updatedAt: string
  price: number
  tags: string[]
}

interface AIQuestion {
  id: string
  question: string
  category: string
  count: number
  lastAsked: string
  status: 'trending' | 'popular' | 'new'
}

export default function AcademySection() {
  const { isAdmin, isSeller, isBuyer, canExecuteAction } = useAdminPermissions()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Dados mockados - em produção viria da API
  const courses: Course[] = [
    {
      id: '1',
      title: 'Manejo de Gado de Corte - Fundamentos',
      description: 'Aprenda as técnicas essenciais para o manejo eficiente de gado de corte, incluindo nutrição, reprodução e sanidade.',
      category: 'Pecuária',
      instructor: 'Dr. João Silva',
      duration: 8,
      students: 1234,
      completion: 78,
      rating: 4.8,
      status: 'active',
      featured: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      price: 199,
      tags: ['gado', 'corte', 'manejo', 'nutrição']
    },
    {
      id: '2',
      title: 'Genética Bovina Avançada',
      description: 'Domine os conceitos de genética bovina e melhore a qualidade genética do seu rebanho.',
      category: 'Genética',
      instructor: 'Dra. Maria Santos',
      duration: 12,
      students: 856,
      completion: 65,
      rating: 4.9,
      status: 'active',
      featured: false,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
      price: 299,
      tags: ['genética', 'bovino', 'melhoramento', 'reprodução']
    },
    {
      id: '3',
      title: 'Gestão Financeira Rural',
      description: 'Aprenda a administrar as finanças da sua propriedade rural de forma eficiente e sustentável.',
      category: 'Gestão',
      instructor: 'Carlos Mendes',
      duration: 6,
      students: 642,
      completion: 82,
      rating: 4.7,
      status: 'active',
      featured: false,
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15',
      price: 149,
      tags: ['gestão', 'finanças', 'rural', 'administração']
    },
    {
      id: '4',
      title: 'Tecnologia no Campo',
      description: 'Descubra como a tecnologia pode revolucionar sua produção rural.',
      category: 'Tecnologia',
      instructor: 'Ana Costa',
      duration: 10,
      students: 423,
      completion: 45,
      rating: 4.6,
      status: 'draft',
      featured: false,
      createdAt: '2024-01-20',
      updatedAt: '2024-01-22',
      price: 0,
      tags: ['tecnologia', 'agricultura', 'digital', 'inovação']
    }
  ]

  const aiQuestions: AIQuestion[] = [
    {
      id: '1',
      question: 'Como melhorar a genética do rebanho?',
      category: 'Genética',
      count: 145,
      lastAsked: '2024-01-22',
      status: 'trending'
    },
    {
      id: '2',
      question: 'Qual a melhor época para reprodução?',
      category: 'Reprodução',
      count: 98,
      lastAsked: '2024-01-21',
      status: 'popular'
    },
    {
      id: '3',
      question: 'Como calcular o valor do animal?',
      category: 'Vendas',
      count: 76,
      lastAsked: '2024-01-20',
      status: 'popular'
    },
    {
      id: '4',
      question: 'Qual a melhor ração para gado de corte?',
      category: 'Nutrição',
      count: 54,
      lastAsked: '2024-01-19',
      status: 'new'
    },
    {
      id: '5',
      question: 'Como prevenir doenças no rebanho?',
      category: 'Sanidade',
      count: 43,
      lastAsked: '2024-01-18',
      status: 'new'
    }
  ]

  const getStatusBadge = (status: Course['status']) => {
    const statusConfig = {
      active: { label: 'Ativo', variant: 'default' as const, icon: CheckCircle },
      draft: { label: 'Rascunho', variant: 'secondary' as const, icon: Edit },
      archived: { label: 'Arquivado', variant: 'outline' as const, icon: Archive },
      pending: { label: 'Pendente', variant: 'outline' as const, icon: Clock }
    }
    
    const config = statusConfig[status]
    const Icon = config.icon
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  const getQuestionStatusBadge = (status: AIQuestion['status']) => {
    const statusConfig = {
      trending: { label: 'Em Alta', variant: 'default' as const, color: 'text-red-600' },
      popular: { label: 'Popular', variant: 'secondary' as const, color: 'text-blue-600' },
      new: { label: 'Novo', variant: 'outline' as const, color: 'text-green-600' }
    }
    
    const config = statusConfig[status]
    
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.label}
      </Badge>
    )
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const filteredQuestions = aiQuestions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleAction = (action: string, courseId: string) => {
    console.log(`Ação: ${action} no curso: ${courseId}`)
    // Implementar lógica de ação
  }

  const canManageCourses = isAdmin || canExecuteAction('course:write')
  const canApproveCourses = isAdmin && canExecuteAction('course:approve')
  const canFeatureCourses = isAdmin && canExecuteAction('course:feature')

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header e Filtros */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E4D2B]" />
                    <span className="text-base sm:text-lg font-semibold">Gerenciamento de Academy</span>
                </CardTitle>
            </div>
            
            {canManageCourses && (
              <Button className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Novo Curso
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6E7D5B] w-4 h-4" />
                <Input
                  placeholder="Buscar cursos ou perguntas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="draft">Rascunhos</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="archived">Arquivados</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Pecuária">Pecuária</SelectItem>
                  <SelectItem value="Genética">Genética</SelectItem>
                  <SelectItem value="Gestão">Gestão</SelectItem>
                  <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cursos */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E4D2B]" />
                    <span className="text-base sm:text-lg font-semibold">Cursos Disponíveis</span>
                </CardTitle>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg font-semibold text-[#2B2E2B] line-clamp-2">
                        {course.title}
                      </CardTitle>
                      <p className="text-sm text-[#6E7D5B] mt-1 line-clamp-2">
                        {course.description}
                      </p>
                    </div>
                    {course.featured && (
                      <Star className="w-5 h-5 text-yellow-500 fill-current flex-shrink-0 ml-2" />
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {getStatusBadge(course.status)}
                    <Badge variant="outline" className="text-xs">
                      {course.category}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {/* Informações do Instrutor */}
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-[#6E7D5B]" />
                      <span className="text-[#2B2E2B] font-medium">{course.instructor}</span>
                    </div>
                    
                    {/* Preço */}
                    <div className="flex items-center gap-2 text-lg font-bold text-[#1E4D2B]">
                      <DollarSign className="w-4 h-4" />
                      {course.price === 0 ? 'Gratuito' : `R$ ${course.price}`}
                    </div>
                    
                    {/* Estatísticas */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-[#6E7D5B]">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students} alunos
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}h
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {course.completion}% conclusão
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {course.rating} ⭐
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {course.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {course.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{course.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Ações */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      
                      {canManageCourses && (
                        <>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          
                          {course.status === 'active' ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAction('pause', course.id)}
                            >
                              <Pause className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAction('activate', course.id)}
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                        </>
                      )}
                      
                      {canApproveCourses && course.status === 'pending' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAction('approve', course.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAction('reject', course.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      
                      {canFeatureCourses && !course.featured && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAction('feature', course.id)}
                          className="text-yellow-600 hover:text-yellow-700"
                        >
                          <Star className="w-4 h-4" />
                        </Button>
                      )}
                      
                      {canManageCourses && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAction('delete', course.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* IA Agro - Perguntas Frequentes */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E4D2B]" />
                    <span className="text-base sm:text-lg font-semibold">IA Agro - Perguntas Frequentes</span>
                </CardTitle>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            {filteredQuestions.map((question) => (
              <Card key={question.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-[#6E7D5B] flex-shrink-0" />
                        <span className="text-sm font-medium text-[#2B2E2B]">{question.question}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#6E7D5B]">
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {question.category}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(question.lastAsked).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {question.count} perguntas
                      </Badge>
                      {getQuestionStatusBadge(question.status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resumo */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1E4D2B]">
                {courses.filter(course => course.status === 'active').length}
              </div>
              <div className="text-sm text-[#6E7D5B]">Cursos Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {courses.filter(course => course.status === 'draft').length}
              </div>
              <div className="text-sm text-[#6E7D5B]">Rascunhos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {courses.reduce((sum, course) => sum + course.students, 0).toLocaleString()}
              </div>
              <div className="text-sm text-[#6E7D5B]">Total Alunos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1E4D2B]">
                {aiQuestions.length}
              </div>
              <div className="text-sm text-[#6E7D5B]">Perguntas IA</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}