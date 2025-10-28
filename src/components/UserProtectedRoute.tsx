'use client'

import ProtectedRoute from './ProtectedRoute'

interface UserProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function UserProtectedRoute({ 
  children, 
  fallback 
}: UserProtectedRouteProps) {
  return (
    <ProtectedRoute
      fallback={fallback}
      redirectTo="/login"
      showErrorPage={false}
      loadingTimeout={3}
    >
      {children}
    </ProtectedRoute>
  )
}