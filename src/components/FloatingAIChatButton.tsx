'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send, Sparkles, User, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { AgroIAAvatar } from '@/components/AgroIAAvatar'
import { TypingIndicator } from '@/components/TypingIndicator'
import { toast } from '@/hooks/use-toast'

interface Message {
  id: number
  sender: 'user' | 'ai'
  text: string
  time: string
  hasAction?: boolean
  actionLabel?: string
  actionLink?: string
}

export default function FloatingAIChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const sendToAI = async (userMessage: Message) => {
    setIsTyping(true)

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }))

      conversationHistory.push({
        role: 'user',
        content: userMessage.text
      })

      const response = await fetch('/api/agroia/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversationHistory,
          includeActions: true
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      const aiResponse: Message = {
        id: Date.now(),
        sender: 'ai',
        text: data.message || 'Desculpe, não consegui processar sua mensagem.',
        time: 'Agora',
        hasAction: !!data.action,
        actionLabel: data.action?.label,
        actionLink: data.action?.link,
      }

      setMessages(prev => [...prev, aiResponse])
    } catch (error: any) {
      console.error('Error calling AgroIA:', error)

      let errorMessage = 'Desculpe, houve um erro ao processar sua mensagem. Tente novamente.'

      if (error.message?.includes('429')) {
        errorMessage = 'Muitas solicitações. Por favor, aguarde um momento.'
      } else if (error.message?.includes('402')) {
        errorMessage = 'Serviço temporariamente indisponível. Tente novamente em breve.'
      }

      toast({
        title: 'Erro',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setIsTyping(false)
    }
  }

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newUserMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: message,
      time: 'Agora',
    }

    setMessages(prev => [...prev, newUserMessage])
    sendToAI(newUserMessage)
    setMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div
          className="absolute bottom-20 right-0 w-[360px] sm:w-[400px] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden animate-in slide-in-from-bottom-5 duration-300"
          style={{ maxHeight: 'calc(100vh - 160px)' }}
        >
          {/* Header */}
          <div className="relative border-b bg-gradient-to-br from-background to-primary/5 overflow-hidden">
            {/* Pattern Background */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #0A9965 10px, #0A9965 11px)`,
                }}
              />
            </div>

            <div className="p-4 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <AgroIAAvatar size="md" />
                    <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        AgroIA
                      </h2>
                      <Sparkles className="h-4 w-4 text-primary/70 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white text-[10px] px-1.5 py-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse mr-1" />
                        Online
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Animated Border */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent animate-pulse" />
          </div>

          {/* Messages */}
          <div className="h-[350px] overflow-y-auto p-4 space-y-4">
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="flex gap-3 animate-fade-in">
                <AgroIAAvatar size="sm" />
                <div className="max-w-[85%]">
                  <div className="bg-muted/50 rounded-2xl rounded-tl-none p-3 shadow-sm">
                    <p className="text-sm">
                      Olá 👋, eu sou a <span className="font-semibold text-primary">AgroIA</span>!
                    </p>
                    <p className="text-sm mt-2">
                      Estou aqui para ajudar com suas dúvidas sobre o TudoAgro. Como posso te ajudar hoje?
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block ml-2">Agora</span>
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                {msg.sender === 'ai' && <AgroIAAvatar size="sm" />}

                <div className={`max-w-[85%] ${msg.sender === 'user' ? 'order-first' : ''}`}>
                  <div
                    className={`rounded-2xl p-3 shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-tr-none ml-auto'
                        : 'bg-muted/50 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>

                    {msg.hasAction && msg.actionLink && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-white hover:bg-gray-50 border-primary text-primary text-xs"
                        onClick={() => window.location.href = msg.actionLink!}
                      >
                        {msg.actionLabel}
                      </Button>
                    )}
                  </div>

                  <span className={`text-xs text-muted-foreground mt-1 block ${msg.sender === 'user' ? 'text-right' : 'ml-2'}`}>
                    {msg.time}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <User className="h-3.5 w-3.5 text-primary" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <AgroIAAvatar size="sm" isTyping />
                <TypingIndicator />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t bg-background p-3">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua pergunta..."
                className="rounded-full bg-muted/50 border-none text-sm"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="rounded-full bg-primary hover:bg-primary/90 h-10 w-10 flex-shrink-0"
                disabled={isTyping || !message.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative"
        aria-label="Abrir chat com AgroIA"
      >
        {/* Tooltip */}
        <div
          className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg transition-all duration-300 ${
            isHovered && !isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
          }`}
        >
          Fale com a AgroIA
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
            <div className="border-8 border-transparent border-l-gray-900"></div>
          </div>
        </div>

        {/* Button */}
        <div className="relative">
          {/* Pulse Effect */}
          {!isOpen && (
            <div
              className="absolute inset-0 rounded-full bg-primary/40 animate-ping"
              style={{ animationDuration: '2s' }}
            />
          )}

          {/* Main Button */}
          <div
            className={`relative rounded-full p-4 shadow-2xl transition-all duration-300 transform ${
              isOpen
                ? 'bg-destructive hover:bg-destructive/90 rotate-0'
                : 'bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70'
            } ${!isOpen ? 'hover:scale-110' : ''}`}
            style={{
              backgroundColor: isOpen ? undefined : (isMounted ? undefined : 'rgba(var(--primary-rgb), 0.5)')
            }}
          >
            {isOpen ? (
              <X className="w-7 h-7 text-white" />
            ) : (
              <Sparkles className="w-7 h-7 text-white" />
            )}
          </div>

          {/* Notification Badge */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
              1
            </div>
          )}
        </div>
      </button>
    </div>
  )
}
