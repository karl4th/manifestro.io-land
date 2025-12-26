"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authUtils } from "@/lib/auth"
import { authApi } from "@/lib/api"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check client-side auth state
        if (authUtils.isAuthenticated()) {
          setIsAuthenticated(true)
          setIsLoading(false)
          return
        }

        // If no client state, try to verify with server
        const response = await authApi.getCurrentUser()
        
        if (response.data) {
          // Server confirms authentication, update client state
          authUtils.setAuth(response.data as any)
          setIsAuthenticated(true)
        } else {
          // Not authenticated, redirect to login
          router.push('/login')
        }
      } catch (error) {
        // Error checking auth, redirect to login
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect
  }

  return <>{children}</>
}
