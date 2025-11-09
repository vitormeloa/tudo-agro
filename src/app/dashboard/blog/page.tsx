'use client'

import { Suspense } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import BlogDashboard from '@/components/views/BlogDashboard'
import { Loader2 } from 'lucide-react'

function BlogContent() {
  return <BlogDashboard />
}

export default function BlogPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }>
        <BlogContent />
      </Suspense>
    </DashboardLayout>
  )
}
