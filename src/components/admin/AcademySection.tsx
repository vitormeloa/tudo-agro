'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, BookOpen, Users, TrendingUp, Upload } from 'lucide-react'

export default function AcademySection() {
  const courses = [
    {
      id: 1,
      title: 'Manejo de Gado de Corte',
      students: 234,
      completion: 78,
      rating: 4.8,
      status: 'ativo'
    },
    {
      id: 2,
      title: 'Genética Bovina Avançada',
      students: 156,
      completion: 65,
      rating: 4.9,
      status: 'ativo'
    }
  ]

  const aiStats = [
    { question: 'Como melhorar a genética do rebanho?', count: 45 },
    { question: 'Qual a melhor época para reprodução?', count: 38 },
    { question: 'Como calcular o valor do animal?', count: 32 }
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#1E4D2B]" />
              Academy / IA Agro
            </div>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Novo Módulo
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
                  <Card key={course.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-[#2B2E2B]">{course.title}</h4>
                          <div className="grid grid-cols-3 gap-4 mt-2 text-sm text-[#6E7D5B]">
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
                        <Badge className="bg-green-100 text-green-800">Ativo</Badge>
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
                  <div key={index} className="flex items-center justify-between p-3 bg-[#F7F6F2] rounded-lg">
                    <span className="text-sm text-[#2B2E2B]">{stat.question}</span>
                    <Badge variant="outline">{stat.count} perguntas</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}