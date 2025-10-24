"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  ArrowLeft,
  Timer, 
  Users, 
  Gavel,
  TrendingUp,
  MessageCircle,
  Send,
  Volume2,
  VolumeX,
  Maximize,
  Play,
  Pause,
  DollarSign,
  Award,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

export default function LeilaoPage({ params }: { params: { id: string } }) {
  const [currentBid, setCurrentBid] = useState(45000)
  const [myBid, setMyBid] = useState('')
  const [autoBidLimit, setAutoBidLimit] = useState('')
  const [timeLeft, setTimeLeft] = useState(135) // seconds
  const [chatMessage, setChatMessage] = useState('')
  const [isLive, setIsLive] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Dados mockados do leilão
  const auction = {
    id: params.id,
    title: "Leilão Fazenda São João - Nelore Elite",
    currentLot: {
      number: 15,
      title: "Touro Nelore PO Reprodutor",
      description: "Touro nelore de excelente genética, com registro genealógico completo",
      age: "5 anos",
      weight: "850kg",
      images: [
        "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=800&h=600&fit=crop"
      ]
    },
    participants: 23,
    totalLots: 25,
    organizer: "Fazenda São João",
    rules: [
      "Lance mínimo: R$ 1.000",
      "Incremento mínimo: R$ 500", 
      "Tempo de arrematação: 30 segundos",
      "Pagamento: 30% entrada, saldo em 30 dias"
    ],
    bidHistory: [
      { bidder: "João S.", amount: 45000, time: "14:35:20" },
      { bidder: "Maria L.", amount: 44500, time: "14:35:15" },
      { bidder: "Carlos M.", amount: 44000, time: "14:35:10" },
      { bidder: "Ana P.", amount: 43500, time: "14:35:05" },
      { bidder: "Pedro R.", amount: 43000, time: "14:35:00" }
    ],
    chatMessages: [
      { user: "Moderador", message: "Lote 15 em leilão! Touro Nelore PO", time: "14:35:25", isSystem: true },
      { user: "João S.", message: "Excelente animal!", time: "14:35:22", isSystem: false },
      { user: "Maria L.", message: "Boa genética", time: "14:35:18", isSystem: false },
      { user: "Moderador", message: "Lance atual: R$ 45.000", time: "14:35:20", isSystem: true }
    ]
  }

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && isLive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, isLive])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleBid = () => {
    if (myBid && parseInt(myBid) > currentBid) {
      setCurrentBid(parseInt(myBid))
      setMyBid('')
      setTimeLeft(30) // Reset timer
      alert(`Lance de R$ ${parseInt(myBid).toLocaleString()} realizado com sucesso!`)
    } else {
      alert('O lance deve ser maior que o valor atual!')
    }
  }

  const handleChatSend = () => {
    if (chatMessage.trim()) {
      // Simular envio de mensagem
      setChatMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/leiloes" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600 font-medium">Voltar aos Leilões</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <img 
                  src="/fotos/tudo-agro-logo.png" 
                  className="h-6 w-auto sm:h-8 md:h-10 lg:h-12" 
                  alt="TudoAgro Logo"
                />
              </Link>
              <Badge className="bg-red-500 animate-pulse text-white">
                AO VIVO
              </Badge>
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                <span>{auction.participants} participantes</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:bg-gray-700"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-white hover:bg-gray-700"
              >
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video/Image Area */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={auction.currentLot.images[0]} 
                    alt={auction.currentLot.title}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Button 
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16"
                    >
                      <Play className="w-8 h-8" />
                    </Button>
                  </div>
                  
                  {/* Live Indicator */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 animate-pulse">
                      🔴 AO VIVO
                    </Badge>
                  </div>

                  {/* Timer */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg">
                    <div className="flex items-center">
                      <Timer className="w-4 h-4 mr-2" />
                      <span className="font-mono text-lg font-bold text-red-400">
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Lote {auction.currentLot.number}: {auction.currentLot.title}
                      </h2>
                      <p className="text-gray-600 mb-4">{auction.currentLot.description}</p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>Idade: {auction.currentLot.age}</span>
                        <span>Peso: {auction.currentLot.weight}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Bid */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    R$ {currentBid.toLocaleString()}
                  </div>
                  <div className="text-gray-500 mb-4">Lance atual</div>
                  
                  {timeLeft <= 10 && (
                    <div className="text-red-600 font-bold animate-pulse">
                      ATENÇÃO: Leilão encerrando em {timeLeft}s!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Bidding Area */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Fazer Lance</h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor do Lance (R$)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        type="number"
                        placeholder={`Mínimo: ${(currentBid + 500).toLocaleString()}`}
                        value={myBid}
                        onChange={(e) => setMyBid(e.target.value)}
                        className="pl-10 bg-white border-gray-300 text-gray-900 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auto-Lance até (R$)
                    </label>
                    <Input
                      type="number"
                      placeholder="Opcional"
                      value={autoBidLimit}
                      onChange={(e) => setAutoBidLimit(e.target.value)}
                      className="bg-white border-gray-300 text-gray-900 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={handleBid}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                  >
                    <Gavel className="w-5 h-5 mr-2" />
                    Dar Lance
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                  >
                    Lance Rápido +R$ 1.000
                  </Button>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <strong>Auto-Lance:</strong> Configure um valor limite e o sistema dará lances 
                      automaticamente por você até esse valor.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Auction Rules */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Regras do Leilão</h3>
                <div className="space-y-2">
                  {auction.rules.map((rule, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Bid History */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Histórico de Lances</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {auction.bidHistory.map((bid, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div>
                        <div className="font-medium text-gray-900">{bid.bidder}</div>
                        <div className="text-sm text-gray-500">{bid.time}</div>
                      </div>
                      <div className="text-green-600 font-bold">
                        R$ {bid.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Chat */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Chat ao Vivo</h3>
                
                <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                  {auction.chatMessages.map((msg, index) => (
                    <div key={index} className={`p-2 rounded-lg ${
                      msg.isSystem ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'
                    }`}>
                      <div className="flex justify-between items-start">
                        <span className={`font-medium ${
                          msg.isSystem ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {msg.user}
                        </span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <div className="text-gray-600 text-sm mt-1">{msg.message}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                    className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <Button 
                    onClick={handleChatSend}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mt-3 text-xs text-gray-500">
                  Chat moderado • Seja respeitoso
                </div>
              </CardContent>
            </Card>

            {/* Auction Info */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Informações</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Organizador:</span>
                    <span className="text-gray-900 font-medium">{auction.organizer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total de Lotes:</span>
                    <span className="text-gray-900 font-medium">{auction.totalLots}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Lote Atual:</span>
                    <span className="text-gray-900 font-medium">{auction.currentLot.number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Participantes:</span>
                    <span className="text-gray-900 font-medium">{auction.participants}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Input
              type="number"
              placeholder={`Mínimo: R$ ${(currentBid + 500).toLocaleString()}`}
              value={myBid}
              onChange={(e) => setMyBid(e.target.value)}
              className="bg-white border-gray-300 text-gray-900 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <Button 
            onClick={handleBid}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            <Gavel className="w-4 h-4 mr-2" />
            Lance
          </Button>
        </div>
      </div>
    </div>
  )
}