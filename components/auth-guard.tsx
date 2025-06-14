"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { sessionAuth } from "@/lib/session-auth"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      // Public routes that don't require authentication
      const publicRoutes = ["/", "/auth/signin", "/auth/signup"]
      const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith("/auth")

      if (isPublicRoute) {
        setIsAuthenticated(true)
        setIsChecking(false)
        return
      }

      // Check sessionStorage for auth token
      const hasValidToken = sessionAuth.isAuthenticated()

      if (!hasValidToken) {
        console.log("No valid token found, redirecting to signin...")
        router.push("/auth/signin")
        return
      }

      setIsAuthenticated(true)
      setIsChecking(false)
    }

    checkAuth()
  }, [pathname, router])

  // Show loading state while checking auth
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // If not authenticated and on protected route, don't render children
  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
