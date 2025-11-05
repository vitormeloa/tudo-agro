import React from 'react'
import { AlertCircle } from 'lucide-react'

interface InputErrorProps {
  error?: string
}

export const InputError: React.FC<InputErrorProps> = ({ error }) => {
  if (!error) return null

  return (
    <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
      <AlertCircle className="w-4 h-4" />
      <span>{error}</span>
    </div>
  )
}
