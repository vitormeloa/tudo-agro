'use client'

import { useEffect, useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const SUGGESTED_MESSAGE = 'Qual o melhor suplemento para recria de bezerros?'

export function AgroCopilotChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [placeholder, setPlaceholder] = useState(SUGGESTED_MESSAGE)

  useEffect(() => {
    if (!isOpen) {
      setInputValue('')
      setPlaceholder(SUGGESTED_MESSAGE)
    }
  }, [isOpen])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {isOpen ? (
        <div className="w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-emerald-200 bg-white/95 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between rounded-t-2xl bg-emerald-600 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Agro Copiloto</p>
              <span className="text-xs opacity-90">Estamos aqui para responder suas dúvidas.</span>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-emerald-700"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </Button>
          </div>
          <div className="flex max-h-72 flex-col gap-3 overflow-y-auto px-4 py-3 text-sm text-[#1F2A1F]">
            <div className="rounded-xl bg-emerald-50 px-3 py-2">
              Olá! Sou o AgroBot. Posso ajudar com produtos, leilões ou treinamentos.
            </div>
            <div className="rounded-xl bg-white px-3 py-2 text-[#3F4D3C]">
              Sugestão: {SUGGESTED_MESSAGE}
            </div>
          </div>
          <div className="space-y-3 px-4 pb-4">
            <Textarea
              value={inputValue}
              onChange={event => setInputValue(event.target.value)}
              placeholder={placeholder}
              className="min-h-[80px] resize-none border-emerald-200 focus-visible:ring-emerald-600"
            />
            <Button className="w-full gap-2" disabled={!inputValue.trim()}>
              Enviar
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : null}
      <Button size="lg" className="gap-2 shadow-2xl" onClick={() => setIsOpen(true)}>
        <MessageCircle className="h-5 w-5" />
        Fale com o AgroBot
      </Button>
    </div>
  )
}
