'use client'

import ProtectedRoute from './ProtectedRoute'
import Error403 from './Error403'

interface AdminProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function AdminProtectedRoute({ 
  children, 
  fallback 
}: AdminProtectedRouteProps) {
  return (
    <ProtectedRoute
      fallback={fallback}
      redirectTo="/403"
      showErrorPage={true}
      loadingTimeout={2}
    >
      {children}
    </ProtectedRoute>
  )
}