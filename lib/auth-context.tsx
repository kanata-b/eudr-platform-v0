"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { directusService } from "@/lib/services/directus"
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
  const { toast } = useToast()

  const isAuthenticated = !!user

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      await directusService.login(email, password)

      // Get user info after successful login
      const currentUser = await directusService.getCurrentUser()
      console.log(currentUser)
      setUser(currentUser as User)

      toast({
        title: "Success",
        description: "Logged in successfully",
      })
    } catch (error: any) {
      console.error("Login error:", error)
      setUser(null)

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
      await directusService.logout()
      await directusService.clearToken()
      setUser(null)

      toast({
        title: "Success",
        description: "Logged out successfully",
      })
    } catch (error: any) {
      console.error("Logout error:", error)
      // Still clear user state even if logout fails
      setUser(null)
      await directusService.clearToken()
    } finally {
      setIsLoading(false)
    }
  }

  const refresh = async () => {
    try {
      await directusService.refresh()
      const currentUser = await directusService.getCurrentUser()
      setUser(currentUser as User)
    } catch (error: any) {
      console.error("Refresh error:", error)
      setUser(null)
      await directusService.clearToken()
    }
  }

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)

        // Check if we have a token first
        const hasToken = await directusService.getToken()
        console.log(hasToken)
        if (!hasToken) {
          setUser(null)
          return
        }

        // Try to get current user
        const currentUser = await directusService.getCurrentUser()
        setUser(currentUser as User)
      } catch (error: any) {
        console.error("Auth check error:", error)
        // Clear any invalid tokens
        await directusService.clearToken()
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
