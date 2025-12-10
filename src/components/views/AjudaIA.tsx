'use client';

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Package,
  Gavel,
  DollarSign,
  BookOpen,
  MessageSquare,
  Send,
  Sparkles,
  RefreshCw,
  ThumbsDown,
  User,
  X,
  HelpCircle,
} from "lucide-react";
import { AgroIAAvatar } from "@/components/AgroIAAvatar";
import { TypingIndicator } from "@/components/TypingIndicator";
import { AudioRecorder } from "@/components/AudioRecorder";
import { MediaUpload } from "@/components/MediaUpload";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
  time: string;
  hasAction?: boolean;
  actionLabel?: string;
  actionLink?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

const AjudaIA = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{file: File, type: 'image' | 'video'} | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    {
      category: "Animais / Genética",
      icon: Sparkles,
      questions: [
        "O que significa um animal PO (Puro de Origem)?",
        "Qual a diferença entre Gado de Corte e Gado de Leite?",
        "Por que a genealogia é importante na hora de comprar um animal?",
        "O que é DEPs no melhoramento genético?",
        "O que é um bezerro desmamado?",
        "Qual a diferença entre bezerro e garrote?",
        "O que é uma vaca parida?",
        "Como funciona o rastreamento de gado no Brasil?",
        "O que é um animal com RGD?",
      ],
    },
    {
      category: "Sêmen e Reprodução",
      icon: Sparkles,
      questions: [
        "Quantas palhetas de sêmen são usadas por cobertura?",
        "Como saber se o sêmen é de qualidade?",
        "Qual a diferença entre sêmen de 0,25ml e 0,5ml?",
        "Posso usar sêmen de cavalos em diferentes éguas?",
        "O que significa sêmen com “livre de IBR e BVD”?",
        "Posso comprar sêmen de um touro premiado mesmo que ele já tenha morrido?",
      ],
    },
    {
      category: "Leilões e Mercado",
      icon: Gavel,
      questions: [
        "Como funciona um leilão virtual de animais?",
        "Qual o risco de negociar fora da plataforma TudoAgro?",
        "Qual o ticket médio de um touro Nelore PO?",
        "Qual é o melhor criador de Mangalarga Marchador no Brasil?",
        "Me fala tudo sobre o Haras Yuri.",
        "Quem é Cláudia Junqueira?",
        "Me fala tudo sobre a Cláudia Junqueira.",
        "Quem é Eduardo Costa?",
        "Quem é Dr. Bernardo Guimarães?",
      ],
    },
    {
      category: "Logística e Documentação",
      icon: Package,
      questions: [
        "Que documentos preciso ao comprar um gado?",
        "Como funciona o transporte de sêmen?",
        "Quais são os principais documentos exigidos para transporte de animais no Brasil?",
      ],
    },
    {
      category: "Cultura e Práticas",
      icon: BookOpen,
      questions: [
        "Quais são os tipos de pelagem mais comuns em cavalos?",
        "Qual a diferença entre marcha batida e picada?",
        "Por que a pelagem é importante na escolha de cavalos?",
        "Como calcular a idade de um cavalo?",
      ],
    },
  ];

  const sendToAI = async (userMessage: Message) => {
    setIsTyping(true);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      }));

      conversationHistory.push({
        role: "user",
        content: userMessage.text
      });

      const response = await fetch('/api/agroia/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversationHistory,
          includeActions: true
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const aiResponse: Message = {
        id: Date.now(),
        sender: "ai",
        text: data.message || "Desculpe, não consegui processar sua mensagem.",
        time: "Agora",
        hasAction: !!data.action,
        actionLabel: data.action?.label,
        actionLink: data.action?.link,
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error: any) {
      console.error("Error calling AgroIA:", error);

      let errorMessage = "Desculpe, houve um erro ao processar sua mensagem. Tente novamente.";

      if (error.message?.includes("429")) {
        errorMessage = "Muitas solicitações. Por favor, aguarde um momento.";
      } else if (error.message?.includes("402")) {
        errorMessage = "Serviço temporariamente indisponível. Tente novamente em breve.";
      }

      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    const newUserMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: question,
      time: "Agora",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    sendToAI(newUserMessage);
  };

  const handleSendMessage = async () => {
    if (!message.trim() && !attachedFile) return;

    let mediaUrl: string | undefined;
    let mediaType: 'image' | 'video' | undefined;

    if (attachedFile) {
      mediaUrl = URL.createObjectURL(attachedFile.file);
      mediaType = attachedFile.type;
    }

    const newUserMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: message || (attachedFile ? `[${attachedFile.type === 'image' ? 'Imagem' : 'Vídeo'} anexado]` : ""),
      time: "Agora",
      mediaUrl,
      mediaType,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    sendToAI(newUserMessage);
    setMessage("");
    setAttachedFile(null);
  };

  const handleAudioRecording = (audioBlob: Blob) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    toast({
      title: "Áudio gravado!",
      description: "Processando sua mensagem...",
    });

    const audioMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: "[Áudio gravado]",
      time: "Agora",
    };

    setMessages((prev) => [...prev, audioMessage]);
    sendToAI(audioMessage);
  };

  const handleFileSelect = (file: File, type: 'image' | 'video') => {
    setAttachedFile({ file, type });
  };

  const handleRetry = (questionText: string) => {
    const retryMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: questionText,
      time: "Agora",
    };
    sendToAI(retryMessage);
  };

  const handleNotHelpful = () => {
    toast({
      title: "Obrigado pelo feedback!",
      description: "Vamos melhorar essa resposta. Gostaria de falar com um atendente?",
    });
  };

  const handleHumanSupport = () => {
    toast({
      title: "Conectando ao suporte...",
      description: "Um atendente entrará em contato em breve!",
    });
  };

  return (
    <div className="space-y-6">
      {}
      <div className="relative">
        {}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A5C2E]/5 via-[#4CAF50]/5 to-[#2A5C2E]/5 rounded-2xl blur-xl animate-pulse" />

        <Card className="relative border-2 border-[#2A5C2E]/20 bg-gradient-to-br from-background to-[#2A5C2E]/5 shadow-lg overflow-hidden">
          {}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #2A5C2E 10px, #2A5C2E 11px)`,
            }} />
          </div>

          <CardContent className="p-6 relative">
            <div className="flex items-center gap-4">
              <div className="relative">
                <AgroIAAvatar size="lg" />
                {}
                <div className="absolute inset-0 rounded-full border-2 border-[#2A5C2E]/30 animate-ping" />
                <div className="absolute inset-0 rounded-full border-2 border-[#4CAF50]/20 animate-pulse" style={{ animationDelay: "0.5s" }} />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#2A5C2E] to-[#4CAF50] bg-clip-text text-transparent">
                    AgroIA
                  </h1>
                  <Sparkles className="h-5 w-5 text-[#3D9970] animate-pulse" />
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <Badge className="bg-gradient-to-r from-[#2A5C2E] to-[#4CAF50] text-white hover:from-[#2A5C2E]/90 hover:to-[#4CAF50]/90 shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse mr-2 shadow-sm" />
                    Online
                  </Badge>
                  <span className="text-xs lg:text-sm text-muted-foreground font-medium">
                    🤖 Inteligência Artificial • Responde em tempo real
                  </span>
                </div>
              </div>
            </div>
          </CardContent>

          {}
          <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4CAF50] to-transparent animate-pulse" />
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2A5C2E] to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
          </div>
        </Card>
      </div>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {}
        <Card className="lg:col-span-2 flex flex-col min-h-[500px] shadow-xl border-2 border-[#2A5C2E]/20 bg-gradient-to-b from-background to-[#2A5C2E]/5 relative overflow-hidden">
          {}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#4CAF50]/10 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#2A5C2E]/10 to-transparent rounded-tr-full" />

          {}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 relative z-10">
            {}
            {messages.length === 0 && (
              <div className="flex gap-3 animate-fade-in">
                <AgroIAAvatar size="md" />
                <div className="max-w-[85%] lg:max-w-[80%]">
                  <div className="bg-muted/50 rounded-2xl rounded-tl-none p-4 shadow-sm">
                    <p className="text-sm lg:text-base">
                      Olá 👋, eu sou a <span className="font-semibold text-primary">AgroIA</span>, sua assistente aqui no TudoAgro.
                    </p>
                    <p className="text-sm lg:text-base mt-2">Como posso te ajudar hoje?</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block ml-2">Agora</span>
                </div>
              </div>
            )}

            {}
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                {msg.sender === "ai" && <AgroIAAvatar size="md" />}

                <div className={`max-w-[85%] lg:max-w-[80%] ${msg.sender === "user" ? "order-first" : ""}`}>
                  <div
                    className={`rounded-2xl p-3 lg:p-4 shadow-sm ${
                      msg.sender === "user"
                        ? "bg-[#2A5C2E] text-white rounded-tr-none ml-auto"
                        : "bg-muted/50 rounded-tl-none"
                    }`}
                  >
                    {msg.mediaUrl && (
                      <div className="mb-2">
                        {msg.mediaType === 'image' ? (
                          <img src={msg.mediaUrl} alt="Anexo" className="max-w-full rounded-lg max-h-48" />
                        ) : (
                          <video src={msg.mediaUrl} controls className="max-w-full rounded-lg max-h-48" />
                        )}
                      </div>
                    )}
                    <p className="text-sm lg:text-base whitespace-pre-wrap">{msg.text}</p>

                    {msg.hasAction && msg.actionLink && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 bg-white hover:bg-gray-50 border-[#2A5C2E] text-primary"
                        onClick={() => window.location.href = msg.actionLink!}
                      >
                        {msg.actionLabel}
                      </Button>
                    )}
                  </div>

                  <div className={`flex items-center gap-2 mt-1 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>

                    {msg.sender === "ai" && (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => handleRetry(messages[index - 1]?.text || "")}
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Refazer
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={handleNotHelpful}
                        >
                          <ThumbsDown className="h-3 w-3 mr-1" />
                          Não ajudou
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {msg.sender === "user" && (
                  <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-[#4CAF50]/20 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                  </div>
                )}
              </div>
            ))}

            {}
            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <AgroIAAvatar size="md" isTyping />
                <TypingIndicator />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {}
          <div className="border-t bg-background p-3 lg:p-4 sticky bottom-0 z-10">
            {attachedFile && (
              <div className="flex items-center gap-2 mb-2 p-2 bg-muted rounded-lg">
                <span className="text-sm text-muted-foreground flex-1">
                  {attachedFile.type === 'image' ? '📷' : '🎥'} {attachedFile.file.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAttachedFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="flex gap-2">
              <MediaUpload onFileSelect={handleFileSelect} />
              <AudioRecorder onRecordingComplete={handleAudioRecording} />

              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua dúvida..."
                className="rounded-full bg-muted/50 border-none flex-1"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="rounded-full bg-[#2A5C2E] hover:bg-[#2A5C2E]/90 h-10 w-10 flex-shrink-0"
                disabled={isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {messages.length >= 3 && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-2 text-xs text-muted-foreground"
                onClick={handleHumanSupport}
              >
                <MessageSquare className="h-3 w-3 mr-1" />
                Falar com atendimento humano
              </Button>
            )}
          </div>
        </Card>

        {}
        <div className="space-y-4">
          <h2 className="font-semibold text-base lg:text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Perguntas Rápidas
          </h2>

          <Accordion type="single" collapsible className="space-y-3">
            {quickQuestions.map((category, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg !border-b">
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent/50 rounded-lg transition-colors">
                  <div className="flex items-center gap-2 text-sm lg:text-base">
                    <category.icon className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                    <span className="font-medium">{category.category}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-2">
                    {category.questions.map((question, qIdx) => (
                      <Button
                        key={qIdx}
                        variant="ghost"
                        className="w-full justify-start text-left h-auto py-2 px-3 hover:bg-primary/10 hover:text-primary transition-colors text-xs lg:text-sm"
                        onClick={() => handleQuickQuestion(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {}
      <Card className="bg-muted/50 mt-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <HelpCircle className="h-10 w-10 text-primary" />
                <div>
                <p className="font-medium">Dúvidas sobre o uso da AgroIA?</p>
                <p className="text-sm text-muted-foreground">Nossa equipe está pronta para ajudar</p>
              </div>
            </div>
            <div className="flex gap-3">
                <Button variant="outline" onClick={() => window.open('https://wa.me/5531971880969?text=Ol%C3%A1%2C%20sou%20usu%C3%A1rio%20e%20preciso%20de%20suporte!%20', '_blank')}>
                    Fale com Suporte
                </Button>
                <Button variant="outline">
                    Conhecer AgroIA
                </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AjudaIA;
