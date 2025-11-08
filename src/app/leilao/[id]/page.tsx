"use client"

import { useState, useEffect, use, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
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
import { mockAuctions, convertToEmbedUrl } from '@/lib/mock-auctions'
import Footer from '@/components/layout/Footer'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function LeilaoPage({ params }: { params: Promise<{ id: string }> }) {
  const [currentBid, setCurrentBid] = useState(45000)
  const [myBid, setMyBid] = useState('')
  const [autoBidLimit, setAutoBidLimit] = useState('')
  const [timeLeft, setTimeLeft] = useState(135) // seconds
  const [chatMessage, setChatMessage] = useState('')
  const [isLive, setIsLive] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [volume, setVolume] = useState(50) // Volume de 0 a 100
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [videoSrc, setVideoSrc] = useState<string>('')
  const [mounted, setMounted] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  
  const resolvedParams = use(params)
  const auctionId = resolvedParams.id
  
  // Buscar leilão pelo ID (UUID)
  const auction = mockAuctions.find(a => a.id === auctionId)
  
  // Se não encontrar, mostrar erro
  if (!auction) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#101828] mb-4">Leilão não encontrado</h1>
          <Link href="/leiloes">
            <Button>Voltar para Leilões</Button>
          </Link>
        </div>
      </div>
    )
  }
  
  // Marcar componente como montado no cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Inicializar lance atual com o primeiro lance do histórico ou currentBid
  useEffect(() => {
    if (auction.status === 'live') {
      if (auction.currentBid) {
        setCurrentBid(auction.currentBid)
      } else if (auction.bidHistory && auction.bidHistory.length > 0) {
        setCurrentBid(auction.bidHistory[0].amount)
      }
      setIsLive(true)
      
      // Configurar URL do vídeo com autoplay
      if (auction.videoUrl) {
        const embedUrl = convertToEmbedUrl(auction.videoUrl)
        setVideoSrc(embedUrl)
      }
    } else {
      setIsLive(false)
    }
  }, [auction])

  // Função para tentar iniciar o vídeo
  const tryPlayVideo = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'playVideo',
            args: []
          }),
          'https://www.youtube.com'
        )
      } catch (error) {
        // Ignorar erros silenciosamente
      }
    }
  }

  // Função para ajustar volume do vídeo
  const handleVolumeChange = (newVolume: number[]) => {
    const vol = newVolume[0]
    setVolume(vol)
    
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        if (vol > 0 && isMuted) {
          setIsMuted(false)
        }
        
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'setVolume',
            args: [vol]
          }),
          'https://www.youtube.com'
        )
      } catch (error) {
        console.log('Error setting volume:', error)
      }
    }
  }

  // Função para controlar mute/unmute do vídeo
  const handleToggleMute = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        const newMutedState = !isMuted
        setIsMuted(newMutedState)
        
        if (newMutedState) {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({
              event: 'command',
              func: 'mute',
              args: []
            }),
            'https://www.youtube.com'
          )
        } else {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({
              event: 'command',
              func: 'unMute',
              args: []
            }),
            'https://www.youtube.com'
          )
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({
              event: 'command',
              func: 'setVolume',
              args: [volume > 0 ? volume : 50]
            }),
            'https://www.youtube.com'
          )
          if (volume === 0) {
            setVolume(50)
          }
        }
      } catch (error) {
        console.log('Error toggling mute:', error)
      }
    }
  }

  // Função para colocar vídeo em fullscreen
  const handleFullscreen = () => {
    const videoContainer = iframeRef.current?.parentElement
    if (videoContainer) {
      try {
        if (videoContainer.requestFullscreen) {
          videoContainer.requestFullscreen()
        } else if ((videoContainer as any).webkitRequestFullscreen) {
          (videoContainer as any).webkitRequestFullscreen()
        } else if ((videoContainer as any).mozRequestFullScreen) {
          (videoContainer as any).mozRequestFullScreen()
        } else if ((videoContainer as any).msRequestFullscreen) {
          (videoContainer as any).msRequestFullscreen()
        }
        setIsFullscreen(true)
      } catch (error) {
        console.log('Error entering fullscreen:', error)
      }
    }
  }

  // Listener para detectar quando sai do fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && 
          !(document as any).webkitFullscreenElement && 
          !(document as any).mozFullScreenElement && 
          !(document as any).msFullscreenElement) {
        setIsFullscreen(false)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
    }
  }, [])

  // Forçar autoplay do vídeo quando o componente montar
  useEffect(() => {
    if (videoSrc && iframeRef.current && auction.status === 'live') {
      const timers: NodeJS.Timeout[] = []
      const delays = [500, 1000, 2000, 3000]
      
      delays.forEach((delay) => {
        const timer = setTimeout(() => {
          tryPlayVideo()
          if (iframeRef.current && iframeRef.current.contentWindow) {
            try {
              iframeRef.current.contentWindow.postMessage(
                JSON.stringify({
                  event: 'command',
                  func: 'unMute',
                  args: []
                }),
                'https://www.youtube.com'
              )
              setTimeout(() => {
                if (iframeRef.current && iframeRef.current.contentWindow) {
                  iframeRef.current.contentWindow.postMessage(
                    JSON.stringify({
                      event: 'command',
                      func: 'setVolume',
                      args: [volume > 0 ? volume : 50]
                    }),
                    'https://www.youtube.com'
                  )
                }
              }, 100)
            } catch (error) {
              // Ignorar erros silenciosamente
            }
          }
        }, delay)
        timers.push(timer)
      })

      const handleUserInteraction = () => {
        tryPlayVideo()
        if (iframeRef.current && iframeRef.current.contentWindow) {
          try {
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({
                event: 'command',
                func: 'unMute',
                args: []
              }),
              'https://www.youtube.com'
            )
          } catch (error) {
            // Ignorar erros silenciosamente
          }
        }
      }

      document.addEventListener('click', handleUserInteraction, { once: true })
      document.addEventListener('scroll', handleUserInteraction, { once: true })
      document.addEventListener('touchstart', handleUserInteraction, { once: true })

      return () => {
        timers.forEach(timer => clearTimeout(timer))
        document.removeEventListener('click', handleUserInteraction)
        document.removeEventListener('scroll', handleUserInteraction)
        document.removeEventListener('touchstart', handleUserInteraction)
      }
    }
  }, [videoSrc, auction.status, volume])

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

  // Função para formatar valor monetário brasileiro
  const formatCurrency = (value: string): string => {
    const numbers = value.replace(/\D/g, '')
    
    if (!numbers) return ''
    
    const amount = parseInt(numbers) / 100
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  // Função para remover formatação e retornar apenas números
  const unformatCurrency = (value: string): number => {
    const numbers = value.replace(/\D/g, '')
    return numbers ? parseInt(numbers) / 100 : 0
  }

  // Handler para mudança no input de lance
  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value)
    setMyBid(formatted)
  }

  // Handler para mudança no input de auto-lance
  const handleAutoBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value)
    setAutoBidLimit(formatted)
  }

  const handleBid = () => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(`/leilao/${auctionId}`)}`)
      return
    }
    const bidValue = unformatCurrency(myBid)
    if (bidValue > currentBid) {
      setCurrentBid(bidValue)
      setMyBid('')
      setTimeLeft(30) // Reset timer
      alert(`Lance de R$ ${bidValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} realizado com sucesso!`)
    } else {
      alert('O lance deve ser maior que o valor atual!')
    }
  }

  const handleChatSend = () => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(`/leilao/${auctionId}`)}`)
      return
    }
    if (chatMessage.trim()) {
      // Simular envio de mensagem
      setChatMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-[#101828]">
      {/* Header exclusivo do leilão */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 gap-2">
            {/* Left: Back Button */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/leiloes" className="flex items-center space-x-1 sm:space-x-2 hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span className="text-gray-600 font-medium text-xs sm:text-sm">
                  <span className="hidden sm:inline">Voltar aos Leilões</span>
                  <span className="sm:hidden">Voltar</span>
                </span>
              </Link>
            </div>

            {/* Center: Logo and Info */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-1 justify-center min-w-0">
              <Link href="/" className="flex items-center flex-shrink-0">
                <img 
                  src="/fotos/tudo-agro-logo.png" 
                  className="h-14 w-auto sm:h-20 md:h-24 lg:h-28" 
                  alt="TudoAgro Logo"
                />
              </Link>
              <Badge className="bg-red-500 animate-pulse text-white text-xs sm:text-sm whitespace-nowrap hidden sm:inline-flex">
                AO VIVO
              </Badge>
              <div className="flex items-center text-gray-600 text-xs sm:text-sm whitespace-nowrap hidden md:flex">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span>{auction.participants} participantes</span>
              </div>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              <div className="hidden sm:flex items-center space-x-1 sm:space-x-2">
                {auction.status === 'live' && auction.videoUrl && (
                  <>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-gray-600 hover:bg-gray-100 h-8 w-8 sm:h-9 sm:w-9 p-0"
                        >
                          {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48 p-4" align="end">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Volume</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleToggleMute}
                              className="h-7 w-7 p-0"
                            >
                              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </Button>
                          </div>
                          <div className="px-2">
                            <Slider
                              value={[volume]}
                              onValueChange={handleVolumeChange}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>
                          <div className="text-center text-xs text-gray-500">
                            {volume}%
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleFullscreen}
                      className="text-gray-600 hover:bg-gray-100 h-8 w-8 sm:h-9 sm:w-9 p-0"
                    >
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
              {/* Mobile: Show badge and participants */}
              <Badge className="bg-red-500 animate-pulse text-white text-xs sm:hidden">
                AO VIVO
              </Badge>
            </div>
          </div>
          {/* Mobile: Show participants and controls row */}
          <div className="sm:hidden flex items-center justify-between pb-2 pt-1 border-t border-gray-100">
            <div className="flex items-center text-gray-600 text-xs">
              <Users className="w-3 h-3 mr-1" />
              <span>{auction.participants} participantes</span>
            </div>
            {auction.status === 'live' && auction.videoUrl && (
              <div className="flex items-center space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-gray-600 hover:bg-gray-100 h-8 w-8 p-0"
                    >
                      {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-4" align="end">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Volume</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleToggleMute}
                          className="h-7 w-7 p-0"
                        >
                          {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </Button>
                      </div>
                      <div className="px-2">
                        <Slider
                          value={[volume]}
                          onValueChange={handleVolumeChange}
                          min={0}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div className="text-center text-xs text-gray-500">
                        {volume}%
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleFullscreen}
                  className="text-gray-600 hover:bg-gray-100 h-8 w-8 p-0"
                >
                  <Maximize className="w-4 h-4" />
                </Button>
              </div>
            )}
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
                  {mounted && auction.status === 'live' && videoSrc ? (
                    <div className="w-full h-96 bg-black relative overflow-hidden rounded-t-lg">
                      <iframe
                        ref={iframeRef}
                        src={videoSrc}
                        className="w-full h-full absolute inset-0 pointer-events-none"
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowFullScreen
                        style={{ border: 'none', pointerEvents: 'none' }}
                        title={`Vídeo ao vivo - ${auction.title}`}
                        key={videoSrc}
                      />
                      {/* Live Indicator */}
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-red-500 animate-pulse">
                          🔴 AO VIVO
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img 
                        src={auction.image} 
                        alt={auction.title}
                        className="w-full h-96 object-cover rounded-t-lg"
                      />
                      {auction.status === 'live' && (
                        <>
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-red-500 animate-pulse">
                              🔴 AO VIVO
                            </Badge>
                          </div>
                        </>
                      )}
                      {auction.status === 'scheduled' && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-blue-500 text-white">
                            Agendado
                          </Badge>
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-[#101828] mb-2">
                        {auction.currentLot ? `Lote ${auction.currentLot.number}: ${auction.currentLot.title}` : auction.title}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {auction.currentLot?.description || `Leilão agendado com ${auction.totalLots} lotes.`}
                      </p>
                      {auction.currentLot && (
                        <div className="flex gap-4 text-sm text-gray-500">
                          {auction.currentLot.age && <span>Idade: {auction.currentLot.age}</span>}
                          {auction.currentLot.weight && <span>Peso: {auction.currentLot.weight}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Bid / Scheduled Info */}
            {auction.status === 'live' ? (
              <>
                <Card className="bg-white border-gray-200 shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">
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
                    <h3 className="text-xl font-bold text-[#101828] mb-4">Fazer Lance</h3>
                
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor do Lance (R$)
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <Input
                            type="text"
                            placeholder={`Mínimo: R$ ${(currentBid + 500).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                            value={myBid ? `R$ ${myBid}` : ''}
                            onChange={handleBidChange}
                            className="pl-10 bg-white border-gray-300 text-[#101828] focus:border-primary focus:ring-primary"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Auto-Lance até (R$)
                        </label>
                        <Input
                          type="text"
                          placeholder="Opcional"
                          value={autoBidLimit ? `R$ ${autoBidLimit}` : ''}
                          onChange={handleAutoBidChange}
                          className="bg-white border-gray-300 text-[#101828] focus:border-primary focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={handleBid}
                        className="flex-1 bg-primary hover:bg-[#2E7A5A] text-white py-3 text-lg"
                      >
                        <Gavel className="w-5 h-5 mr-2" />
                        Dar Lance
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                        onClick={() => {
                          if (!user) {
                            router.push(`/login?redirect=${encodeURIComponent(`/leilao/${auctionId}`)}`)
                            return
                          }
                          const quickBid = currentBid + 1000
                          setCurrentBid(quickBid)
                          setMyBid('')
                          setTimeLeft(30)
                          alert(`Lance rápido de R$ ${quickBid.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} realizado!`)
                        }}
                      >
                        Lance Rápido +R$ 1.000
                      </Button>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-primary mr-2 mt-0.5" />
                        <div className="text-sm text-primary">
                          <strong>Auto-Lance:</strong> Configure um valor limite e o sistema dará lances 
                          automaticamente por você até esse valor.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {auction.startTime?.toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <div className="text-gray-500 mb-4">Data e hora de início</div>
                    {auction.estimatedValue && (
                      <div className="text-xl font-semibold text-gray-700 mt-4">
                        Valor estimado: R$ {auction.estimatedValue.toLocaleString()}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Auction Rules */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[#101828] mb-4">Regras do Leilão</h3>
                <div className="space-y-2">
                  {auction.rules.map((rule, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
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
            {auction.status === 'live' && auction.bidHistory && auction.bidHistory.length > 0 && (
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#101828] mb-4">Histórico de Lances</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {auction.bidHistory.map((bid, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div>
                          <div className="font-medium text-[#101828]">{bid.bidder}</div>
                          <div className="text-sm text-gray-500">{bid.time}</div>
                        </div>
                        <div className="text-primary font-bold">
                          R$ {bid.amount.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Live Chat */}
            {auction.status === 'live' && auction.chatMessages && auction.chatMessages.length > 0 && (
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#101828] mb-4">Chat ao Vivo</h3>
                  
                  <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                    {auction.chatMessages.map((msg, index) => (
                      <div key={index} className={`p-2 rounded-lg ${
                        msg.isSystem ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'
                      }`}>
                        <div className="flex justify-between items-start">
                          <span className={`font-medium ${
                            msg.isSystem ? 'text-primary' : 'text-[#101828]'
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
                      className="bg-white border-gray-300 text-[#101828] focus:border-blue-500 focus:ring-blue-500"
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
            )}

            {/* Auction Info */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[#101828] mb-4">Informações</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Organizador:</span>
                    <span className="text-[#101828] font-medium">{auction.organizer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total de Lotes:</span>
                    <span className="text-[#101828] font-medium">{auction.totalLots}</span>
                  </div>
                  {auction.currentLotNumber && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Lote Atual:</span>
                      <span className="text-[#101828] font-medium">{auction.currentLotNumber}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Participantes:</span>
                    <span className="text-[#101828] font-medium">{auction.participants}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar (Mobile) */}
      {auction.status === 'live' && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder={`Mínimo: R$ ${(currentBid + 500).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                value={myBid ? `R$ ${myBid}` : ''}
                onChange={handleBidChange}
                className="bg-white border-gray-300 text-[#101828] focus:border-primary focus:ring-primary"
              />
            </div>
            <Button 
              onClick={handleBid}
              className="bg-primary hover:bg-[#2E7A5A] text-white px-6"
            >
              <Gavel className="w-4 h-4 mr-2" />
              Lance
            </Button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}
