"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { directusService } from "@/lib/services/directus"
import { sessionAuth } from "@/lib/session-auth"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
  avatar?: string
  role?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  const isAuthenticated = !!user

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)

      // Login with Directus
      const loginResult = await directusService.login(email, password)

      // Get user info after successful login
      const currentUser = await directusService.getCurrentUser()

      // Store token in sessionStorage
      if (loginResult?.access_token) {
        sessionAuth.setToken(loginResult.access_token, "directus")
        directusService.setToken(loginResult.access_token);
      }

      // Store user session data
      sessionAuth.setSession(currentUser)

      setUser(currentUser as User)

      toast({
        title: "Success",
        description: "Logged in successfully",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Login error:", error)
      setUser(null)
      sessionAuth.clearTokens()

      toast({
        title: "Error",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)

      // Logout from Directus
      await directusService.logout()
      await directusService.clearToken()

      // Clear session storage
      sessionAuth.clearTokens()
      setUser(null)

      toast({
        title: "Success",
        description: "Logged out successfully",
      })

      // Redirect to signin
      router.push("/auth/signin")
    } catch (error: any) {
      console.error("Logout error:", error)
      // Still clear user state and session even if logout fails
      setUser(null)
      sessionAuth.clearTokens()
      await directusService.clearToken()
      router.push("/auth/signin")
    } finally {
      setIsLoading(false)
    }
  }

  const refresh = async () => {
    try {
      await directusService.refresh()
      const currentUser = await directusService.getCurrentUser()

      // Update session storage with fresh user data
      sessionAuth.setSession(currentUser)
      setUser(currentUser as User)
    } catch (error: any) {
      console.error("Refresh error:", error)
      setUser(null)
      sessionAuth.clearTokens()
      await directusService.clearToken()
    }
  }

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)

        // First, check sessionStorage
        const sessionUser = sessionAuth.getSession()
        const hasToken = sessionAuth.isAuthenticated()

        if (sessionUser && hasToken) {
          console.log("Restored user from session:", sessionUser)
          setUser(sessionUser)

          // Verify the session is still valid with Directus
          try {
            const currentUser = await directusService.getCurrentUser()
            if (currentUser) {
              // Update session with fresh data
              sessionAuth.setSession(currentUser)
              setUser(currentUser as User)
            }
          } catch (error) {
            console.log("Session validation failed, clearing...")
            sessionAuth.clearTokens()
            setUser(null)
          }
          return
        }

        // If no session, check if we have a token in Directus service
        const directusToken = await directusService.getToken()
        console.log("Has Directus token:", !!directusToken)

        if (!directusToken) {
          // No token and no session - user is not authenticated
          setUser(null)
          return
        }

        // We have a token but no session - try to get user data
        try {
          const currentUser = await directusService.getCurrentUser()
          if (currentUser) {
            sessionAuth.setSession(currentUser)
            setUser(currentUser as User)
          } else {
            setUser(null)
          }
        } catch (error) {
          console.error("Failed to get user with existing token:", error)
          // Token is invalid, clear it
          await directusService.clearToken()
          sessionAuth.clearTokens()
          setUser(null)
        }
      } catch (error: any) {
        console.error("Auth check error:", error)
        // Clear any invalid tokens and session
        await directusService.clearToken()
        sessionAuth.clearTokens()
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Auto-refresh token periodically (only if authenticated)
  useEffect(() => {
    if (!isAuthenticated) return

    const interval = setInterval(
      async () => {
        try {
          await refresh()
        } catch (error) {
          console.error("Auto-refresh failed:", error)
          setUser(null)
          sessionAuth.clearTokens()
          await directusService.clearToken()
        }
      },
      15 * 60 * 1000,
    ) // Refresh every 15 minutes

    return () => clearInterval(interval)
  }, [isAuthenticated])

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refresh,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
