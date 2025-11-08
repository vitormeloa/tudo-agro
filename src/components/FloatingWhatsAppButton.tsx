'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

export default function FloatingWhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const whatsappLink = "https://wa.me/5531971880969?text=Ol%C3%A1!%20Acabei%20de%20visitar%20a%20plataforma%20Tudo%20Agro%20e%20quero%20entender%20melhor%20como%20funciona%20para%20comprar%20ou%20vender%20produtos%2C%20gen%C3%A9tica%20ou%20animais."

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Fale conosco no WhatsApp"
    >
      {}
      <div
        className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        Fale conosco no WhatsApp
        {}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
          <div className="border-8 border-transparent border-l-gray-900"></div>
        </div>
      </div>

      {}
      <div className="relative">
        {}
        <div
          className="relative hover:bg-primary text-white rounded-full p-4 shadow-2xl transition-all duration-300 transform active:scale-95"
          style={{ backgroundColor: isMounted ? 'var(--primary)' : 'rgba(var(--primary-rgb), 0.5)' }}
        >
          <FaWhatsapp className="w-7 h-7" />
        </div>

        {}
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
          1
        </div>
      </div>
    </a>
  )
}
