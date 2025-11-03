'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import ProtectedRoute from '@/components/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'
import { 
  BookOpen, 
  Play, 
  Clock, 
  Users, 
  Star, 
  Award,
  Search,
  Filter,
  CheckCircle,
  Lock,
  TrendingUp
} from 'lucide-react'

interface Training {
  id: string
  title: string
  description: string
  image: string
  duration: string
  level: 'iniciante' | 'intermediario' | 'avancado'
  category: string
  instructor: string
  rating: number
  students: number
  price: number
  isFree: boolean
  isEnrolled: boolean
  isCompleted: boolean
  progress?: number
}

const mockTrainings: Training[] = [
  {
    id: '1',
    title: 'Gestão de Pastagens para Gado de Corte',
    description: 'Aprenda técnicas avançadas de manejo de pastagens para maximizar a produtividade do seu rebanho.',
    image: '/images/trainings/pastagens.jpg',
    duration: '8 horas',
    level: 'intermediario',
    category: 'Pecuária',
    instructor: 'Dr. João Silva',
    rating: 4.8,
    students: 1250,
    price: 299,
    isFree: false,
    isEnrolled: true,
    isCompleted: false,
    progress: 45
  },
  {
    id: '2',
    title: 'Introdução à Agricultura de Precisão',
    description: 'Conceitos fundamentais de agricultura de precisão e uso de tecnologias no campo.',
    image: '/images/trainings/agricultura-precisao.jpg',
    duration: '6 horas',
    level: 'iniciante',
    category: 'Agricultura',
    instructor: 'Eng. Maria Santos',
    rating: 4.9,
    students: 2340,
    price: 0,
    isFree: true,
    isEnrolled: true,
    isCompleted: true,
    progress: 100
  },
  {
    id: '3',
    title: 'Nutrição Animal: Ração e Suplementação',
    description: 'Domine os fundamentos da nutrição animal e aprenda a formular rações balanceadas.',
    image: '/images/trainings/nutricao-animal.jpg',
    duration: '10 horas',
    level: 'avancado',
    category: 'Pecuária',
    instructor: 'Dr. Carlos Mendes',
    rating: 4.7,
    students: 890,
    price: 449,
    isFree: false,
    isEnrolled: false,
    isCompleted: false
  },
  {
    id: '4',
    title: 'Reprodução e Genética Animal',
    description: 'Técnicas avançadas de melhoramento genético e reprodução assistida.',
    image: '/images/trainings/genetica.jpg',
    duration: '12 horas',
    level: 'avancado',
    category: 'Genética',
    instructor: 'Dr. Ana Costa',
    rating: 5.0,
    students: 560,
    price: 599,
    isFree: false,
    isEnrolled: false,
    isCompleted: false
  },
  {
    id: '5',
    title: 'Gestão Financeira Rural',
    description: 'Aprenda a gerenciar as finanças da sua propriedade rural de forma eficiente.',
    image: '/images/trainings/gestao-financeira.jpg',
    duration: '5 horas',
    level: 'iniciante',
    category: 'Gestão',
    instructor: 'Cont. Roberto Lima',
    rating: 4.6,
    students: 1800,
    price: 199,
    isFree: false,
    isEnrolled: true,
    isCompleted: false,
    progress: 20
  }
]

export default function TreinamentosPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('todos')
  const [filterLevel, setFilterLevel] = useState<string>('todos')

  const categories = ['todos', 'Pecuária', 'Agricultura', 'Genética', 'Gestão']
  const levels = ['todos', 'iniciante', 'intermediario', 'avancado']

  const filteredTrainings = mockTrainings.filter(training => {
    if (searchQuery && !training.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (filterCategory !== 'todos' && training.category !== filterCategory) {
      return false
    }
    if (filterLevel !== 'todos' && training.level !== filterLevel) {
      return false
    }
    return true
  })

  const getLevelBadge = (level: string) => {
    const colors = {
      iniciante: 'bg-green-100 text-green-800',
      intermediario: 'bg-blue-100 text-blue-800',
      avancado: 'bg-purple-100 text-purple-800'
    }
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getLevelLabel = (level: string) => {
    const labels = {
      iniciante: 'Iniciante',
      intermediario: 'Intermediário',
      avancado: 'Avançado'
    }
    return labels[level as keyof typeof labels] || level
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Treinamentos</h1>
            <p className="text-gray-600">Aprimore seus conhecimentos com nossos cursos especializados</p>
          </div>

          {/* Busca e Filtros */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Buscar treinamentos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filterCategory === 'todos' ? 'default' : 'outline'}
                  onClick={() => setFilterCategory('todos')}
                  size="sm"
                >
                  Todas as Categorias
                </Button>
                {categories.slice(1).map(cat => (
                  <Button
                    key={cat}
                    variant={filterCategory === cat ? 'default' : 'outline'}
                    onClick={() => setFilterCategory(cat)}
                    size="sm"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Grid de Treinamentos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainings.map((training) => (
              <Card key={training.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center">
                    <BookOpen className="w-20 h-20 text-white opacity-50" />
                  </div>
                  {training.isEnrolled && (
                    <Badge className="absolute top-4 left-4 bg-emerald-600 text-white">
                      {training.isCompleted ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Concluído
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 mr-1" />
                          Em Andamento
                        </>
                      )}
                    </Badge>
                  )}
                  {training.isFree && (
                    <Badge className="absolute top-4 right-4 bg-blue-600 text-white">
                      Grátis
                    </Badge>
                  )}
                  <Badge className={`absolute bottom-4 right-4 ${getLevelBadge(training.level)}`}>
                    {getLevelLabel(training.level)}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {training.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {training.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {training.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {training.students.toLocaleString()} alunos
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 mr-2 text-amber-400 fill-current" />
                      {training.rating} ({training.instructor})
                    </div>
                  </div>

                  {training.isEnrolled && training.progress !== undefined && !training.isCompleted && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progresso</span>
                        <span className="font-semibold text-gray-900">{training.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full transition-all"
                          style={{ width: `${training.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      {training.isFree ? (
                        <span className="text-lg font-bold text-emerald-600">Grátis</span>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          R$ {training.price.toLocaleString('pt-BR')}
                        </span>
                      )}
                    </div>
                    {training.isEnrolled ? (
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        {training.isCompleted ? (
                          <>
                            <Award className="w-4 h-4 mr-2" />
                            Ver Certificado
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Continuar
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                        Inscrever-se
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <Card className="mt-8 bg-gradient-to-br from-emerald-600 to-green-700 text-white">
            <CardContent className="p-8 text-center">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-80" />
              <h2 className="text-2xl font-bold mb-2">Quer criar seu próprio treinamento?</h2>
              <p className="text-emerald-100 mb-6">
                Compartilhe seu conhecimento e ajude outros produtores a crescerem
              </p>
              <Button className="bg-white text-emerald-600 hover:bg-emerald-50">
                Criar Treinamento
              </Button>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
