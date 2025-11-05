'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { MessageCircle, ThumbsUp, Send, User, CheckCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import type { Question } from '@/lib/mock-questions'

interface QuestionsSectionProps {
  questions: Question[]
  sellerName: string
}

export default function QuestionsSection({ questions, sellerName }: QuestionsSectionProps) {
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [newQuestion, setNewQuestion] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  // Separar perguntas respondidas e não respondidas
  const answeredQuestions = questions.filter(q => q.answer)
  const unansweredQuestions = questions.filter(q => !q.answer)

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Faça login",
        description: "Você precisa estar logado para fazer perguntas.",
        variant: "destructive",
      })
      return
    }

    if (!newQuestion.trim()) {
      toast({
        title: "Pergunta vazia",
        description: "Por favor, escreva sua pergunta antes de enviar.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simular envio
    setTimeout(() => {
      toast({
        title: "Pergunta enviada!",
        description: `Sua pergunta foi enviada para ${sellerName}. Você será notificado quando houver resposta.`,
      })
      setNewQuestion('')
      setShowQuestionForm(false)
      setIsSubmitting(false)
    }, 1000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Hoje'
    if (diffDays === 1) return 'Ontem'
    if (diffDays < 7) return `${diffDays} dias atrás`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`
    return date.toLocaleDateString('pt-BR')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-green-600" />
            Perguntas e Respostas
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {questions.length} {questions.length === 1 ? 'pergunta' : 'perguntas'} sobre este item
          </p>
        </div>

        {!showQuestionForm && (
          <Button
            onClick={() => setShowQuestionForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Fazer uma pergunta
          </Button>
        )}
      </div>

      {/* Formulário de Nova Pergunta */}
      {showQuestionForm && (
        <Card className="border-2 border-green-200 bg-green-50/50">
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmitQuestion} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Sua pergunta para {sellerName}
                </label>
                <Textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Ex: O produto tem garantia? Qual o prazo de entrega?"
                  className="min-h-[100px] border-2 border-gray-200 focus:border-green-500"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-500 mt-2">
                  💡 Dica: Seja específico para receber uma resposta mais precisa
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="submit"
                  disabled={isSubmitting || !newQuestion.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar pergunta
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowQuestionForm(false)
                    setNewQuestion('')
                  }}
                  disabled={isSubmitting}
                  className="border-gray-300"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de Perguntas */}
      {questions.length === 0 ? (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="p-8 text-center">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhuma pergunta ainda
            </h3>
            <p className="text-gray-600 mb-4">
              Seja o primeiro a perguntar sobre este item!
            </p>
            <Button
              onClick={() => setShowQuestionForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Fazer a primeira pergunta
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Perguntas Respondidas */}
          {answeredQuestions.map((question) => (
            <Card key={question.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                {/* Pergunta */}
                <div className="flex gap-3 sm:gap-4 mb-4">
                  <div className="flex-shrink-0">
                    {question.userAvatar ? (
                      <img
                        src={question.userAvatar}
                        alt={question.userName}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{question.userName}</span>
                      <span className="text-xs text-gray-500">{formatDate(question.createdAt)}</span>
                    </div>
                    <p className="text-gray-700">{question.question}</p>
                  </div>
                </div>

                {/* Resposta */}
                {question.answer && (
                  <div className="ml-0 sm:ml-14 pl-4 border-l-4 border-green-500 bg-green-50/50 rounded-r-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-900">{question.answeredBy}</span>
                      <Badge className="bg-green-600 text-white text-xs">Vendedor</Badge>
                      {question.answeredAt && (
                        <span className="text-xs text-gray-600">• {formatDate(question.answeredAt)}</span>
                      )}
                    </div>
                    <p className="text-gray-700">{question.answer}</p>
                  </div>
                )}

                {/* Footer com likes */}
                <div className="flex items-center gap-4 mt-4 ml-0 sm:ml-14">
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{question.likes}</span>
                  </button>
                  <span className="text-xs text-gray-500">
                    {question.likes} {question.likes === 1 ? 'pessoa achou' : 'pessoas acharam'} útil
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Perguntas Não Respondidas */}
          {unansweredQuestions.map((question) => (
            <Card key={question.id} className="border-amber-200 bg-amber-50/30">
              <CardContent className="p-4 sm:p-6">
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex-shrink-0">
                    {question.userAvatar ? (
                      <img
                        src={question.userAvatar}
                        alt={question.userName}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{question.userName}</span>
                      <Badge className="bg-amber-500 text-white text-xs">Aguardando resposta</Badge>
                      <span className="text-xs text-gray-500">{formatDate(question.createdAt)}</span>
                    </div>
                    <p className="text-gray-700">{question.question}</p>

                    {/* Footer com likes */}
                    <div className="flex items-center gap-4 mt-3">
                      <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{question.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
