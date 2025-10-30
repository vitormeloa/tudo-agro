'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface BlogTheme {
  id: string
  name: string
  slug: string
  color: string
}

interface ThemeFilterProps {
  themes: BlogTheme[]
  selectedTheme: string | null
  onThemeChange: (themeId: string | null) => void
}

export default function ThemeFilter({ themes, selectedTheme, onThemeChange }: ThemeFilterProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
      <button
        onClick={() => onThemeChange(null)}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
          "hover:scale-105 active:scale-95",
          selectedTheme === null
            ? "bg-emerald-600 text-white shadow-md"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        )}
      >
        Todos
      </button>
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onThemeChange(selectedTheme === theme.id ? null : theme.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            "hover:scale-105 active:scale-95",
            selectedTheme === theme.id
              ? "text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
          style={
            selectedTheme === theme.id
              ? { backgroundColor: theme.color }
              : undefined
          }
        >
          {theme.name}
        </button>
      ))}
    </div>
  )
}
