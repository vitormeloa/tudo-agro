'use client'

import { useEffect, useState } from 'react'
import { BookOpen, Play } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { DashboardSection } from './DashboardSection'

interface TrainingProgress {
  id: string
  title: string
  lesson: string
  progress: number
}

const MOCK_TRAINING: TrainingProgress = {
  id: 'training-gestao',
  title: 'Gestão de Pastagens Sustentáveis',
  lesson: 'Módulo 3 - Manejo rotacionado na seca',
  progress: 62,
}

export function ActiveTrainingSection() {
  const [training, setTraining] = useState<TrainingProgress | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const timer = setTimeout(() => {
      if (active) {
        setTraining(MOCK_TRAINING)
        setLoading(false)
      }
    }, 500)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [])

  return (
    <DashboardSection
      title="Treinamento em andamento"
      description="Continue evoluindo com os conteúdos da Tudo Agro Academy."
      contentClassName="pt-4"
    >
      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-10 w-40" />
        </div>
      ) : training ? (
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 p-6 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                <BookOpen className="h-4 w-4" />
                Conteúdo em progresso
              </div>
              <h3 className="text-xl font-semibold text-[#1F2A1F]">{training.title}</h3>
              <p className="text-sm text-[#3F4D3C]">{training.lesson}</p>
              <div className="space-y-2">
                <Progress value={training.progress} className="h-3" />
                <span className="text-xs font-medium text-[#3F4D3C]">
                  {training.progress}% concluído
                </span>
              </div>
            </div>
            <Button size="lg" className="mt-4 w-full lg:mt-0 lg:w-auto">
              <Play className="mr-2 h-4 w-4" />
              Continuar
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-emerald-200 p-8 text-center text-sm text-[#66735D]">
          Nenhum conteúdo disponível ainda.
        </div>
      )}
    </DashboardSection>
  )
}
