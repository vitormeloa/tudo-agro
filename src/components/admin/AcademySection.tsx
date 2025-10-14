'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GraduationCap, BookOpen, Users, TrendingUp, Upload, Eye, Edit, Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function AcademySection() {
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'new' | 'edit' | 'view'>('new')
  const [selectedCourse, setSelectedCourse] = useState<any>(null)

  const courses = [
    {
      id: 1,
      title: 'Manejo de Gado de Corte',
      students: 234,
      completion: 78,
      rating: 4.8,
      status: 'ativo',
      description: 'Curso completo sobre manejo de gado de corte',
      modules: 12,
      duration: '40 horas'
    },
    {
      id: 2,
      title: 'Genética Bovina Avançada',
      students: 156,
      completion: 65,
      rating: 4.9,
      status: 'ativo',
      description: 'Técnicas avançadas de melhoramento genético',
      modules: 8,
      duration: '30 horas'
    }
  ]

  const aiStats = [
    { question: 'Como melhorar a genética do rebanho?', count: 45 },
    { question: 'Qual a melhor época para reprodução?', count: 38 },
    { question: 'Como calcular o valor do animal?', count: 32 }
  ]

  const handleAction = (course: any, action: 'view' | 'edit') => {
    setSelectedCourse(course)
    setModalType(action)
    setShowModal(true)
  }

  const handleNewCourse = () => {
    setSelectedCourse(null)
    setModalType('new')
    setShowModal(true)
  }

  const handleConfirmAction = () => {
    switch (modalType) {
      case 'new':
        console.log('Criando novo curso')
        break
      case 'edit':
        console.log(`Editando curso ${selectedCourse?.id}`)
        break
    }
    
    setShowModal(false)
    setSelectedCourse(null)
  }

  const renderModalContent = () => {
    switch (modalType) {
      case 'view':
        if (!selectedCourse) return null
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-2">Informações do Curso</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Título:</strong> {selectedCourse.title}</p>
                  <p><strong>Descrição:</strong> {selectedCourse.description}</p>
                  <p><strong>Módulos:</strong> {selectedCourse.modules}</p>
                  <p><strong>Duração:</strong> {selectedCourse.duration}</p>
                  <p><strong>Status:</strong> <Badge className="bg-green-100 text-green-800">Ativo</Badge></p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[#2B2E2B] mb-2">Estatísticas</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Alunos:</strong> {selectedCourse.students}</p>
                  <p><strong>Taxa de Conclusão:</strong> {selectedCourse.completion}%</p>
                  <p><strong>Avaliação:</strong> {selectedCourse.rating} ⭐</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'new':
      case 'edit':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2B2E2B] mb-1">Título do Curso:</label>
                <Input defaultValue={selectedCourse?.title || ''} placeholder="Digite o título do curso" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2B2E2B] mb-1">Descrição:</label>
                <Textarea 
                  defaultValue={selectedCourse?.description || ''} 
                  placeholder="Descreva o conteúdo do curso"
                  className="min-h-20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2B2E2B] mb-1">Número de Módulos:</label>
                  <Input type="number" defaultValue={selectedCourse?.modules || ''} placeholder="12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2B2E2B] mb-1">Duração:</label>
                  <Input defaultValue={selectedCourse?.duration || ''} placeholder="40 horas" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={handleConfirmAction} className="bg-blue-600 hover:bg-blue-700">
                <BookOpen className="w-4 h-4 mr-2" />
                {modalType === 'new' ? 'Criar Curso' : 'Salvar Alterações'}
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#1E4D2B]" />
              Academy / IA Agro
            </div>
            <Button variant="outline" size="sm" onClick={handleNewCourse}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Curso
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* Cursos */}
            <div>
              <h3 className="font-semibold text-[#2B2E2B] mb-4">Cursos Publicados</h3>
              <div className="grid gap-4">
                {courses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-[#2B2E2B] mb-2">{course.title}</h4>
                          <div className="grid grid-cols-3 gap-4 text-sm text-[#6E7D5B]">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {course.students} alunos
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {course.completion}% conclusão
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {course.rating} ⭐
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                          <Button variant="outline" size="sm" onClick={() => handleAction(course, 'view')}>
                            <Eye className="w-4 h-4 mr-2" />
                            Ver
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleAction(course, 'edit')}>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* IA Stats */}
            <div>
              <h3 className="font-semibold text-[#2B2E2B] mb-4">Dúvidas Frequentes - IA</h3>
              <div className="space-y-3">
                {aiStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#F7F6F2] rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm text-[#2B2E2B]">{stat.question}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{stat.count} perguntas</Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Respostas
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#1E4D2B]" />
              {modalType === 'view' && 'Detalhes do Curso'}
              {modalType === 'edit' && 'Editar Curso'}
              {modalType === 'new' && 'Novo Curso'}
            </DialogTitle>
          </DialogHeader>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </div>
  )
}