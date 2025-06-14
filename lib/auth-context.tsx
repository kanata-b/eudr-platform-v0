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

// Session storage keys
const SESSION_KEYS = {
  USER: "eudr_user",
  TOKEN: "eudr_token",
  EXPIRES_AT: "eudr_expires_at",
} as const

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const isAuthenticated = !!user

  // Helper functions for session storage
  const saveToSession = (user: User, token?: string) => {
    try {
      if (typeof window === "undefined") return

      sessionStorage.setItem(SESSION_KEYS.USER, JSON.stringify(user))
      if (token) {
        sessionStorage.setItem(SESSION_KEYS.TOKEN, token)
        // Set expiration to 24 hours from now
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        sessionStorage.setItem(SESSION_KEYS.EXPIRES_AT, expiresAt)
      }
    } catch (error) {
      console.error("Failed to save to session storage:", error)
    }
  }

  const loadFromSession = (): { user: User | null; isExpired: boolean } => {
    try {
      if (typeof window === "undefined") return { user: null, isExpired: false }

      const userStr = sessionStorage.getItem(SESSION_KEYS.USER)
      const expiresAtStr = sessionStorage.getItem(SESSION_KEYS.EXPIRES_AT)

      if (!userStr) {
        return { user: null, isExpired: false }
      }

      // Check if session is expired
      const isExpired = expiresAtStr ? new Date(expiresAtStr) < new Date() : false

      if (isExpired) {
        clearSession()
        return { user: null, isExpired: true }
      }

      const user = JSON.parse(userStr) as User
      return { user, isExpired: false }
    } catch (error) {
      console.error("Failed to load from session storage:", error)
      return { user: null, isExpired: false }
    }
  }

  const clearSession = () => {
    try {
      if (typeof window === "undefined") return

      sessionStorage.removeItem(SESSION_KEYS.USER)
      sessionStorage.removeItem(SESSION_KEYS.TOKEN)
      sessionStorage.removeItem(SESSION_KEYS.EXPIRES_AT)
    } catch (error) {
      console.error("Failed to clear session storage:", error)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const loginResult = await directusService.login(email, password)

      // Get user info after successful login
      const currentUser = await directusService.getCurrentUser()
      console.log("Login successful:", currentUser)

      // Save to session storage
      saveToSession(currentUser as User, loginResult?.access_token)

      setUser(currentUser as User)

      toast({
        title: "Success",
        description: "Logged in successfully",
      })
    } catch (error: any) {
      console.error("Login error:", error)
      setUser(null)
      clearSession()

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

      // Clear session storage
      clearSession()
      setUser(null)

      toast({
        title: "Success",
        description: "Logged out successfully",
      })
    } catch (error: any) {
      console.error("Logout error:", error)
      // Still clear user state and session even if logout fails
      setUser(null)
      clearSession()
      await directusService.clearToken()
    } finally {
      setIsLoading(false)
    }
  }

  const refresh = async () => {
    try {
      await directusService.refresh()
      const currentUser = await directusService.getCurrentUser()

      // Update session storage with fresh user data
      saveToSession(currentUser as User)
      setUser(currentUser as User)
    } catch (error: any) {
      console.error("Refresh error:", error)
      setUser(null)
      clearSession()
      await directusService.clearToken()
    }
  }

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)

        // First, check session storage
        const { user: sessionUser, isExpired } = loadFromSession()

        if (isExpired) {
          console.log("Session expired, clearing...")
          setUser(null)
          return
        }

        if (sessionUser) {
          console.log("Restored user from session:", sessionUser)
          setUser(sessionUser)

          // Verify the session is still valid with Directus (only if we have a token)
          try {
            const hasToken = await directusService.getToken()
            if (hasToken) {
              const currentUser = await directusService.getCurrentUser()
              if (currentUser) {
                // Update session with fresh data
                saveToSession(currentUser as User)
                setUser(currentUser as User)
              }
            } else {
              // No token but we have session data - session is invalid
              console.log("No token found, clearing session...")
              clearSession()
              setUser(null)
            }
          } catch (error) {
            console.log("Session validation failed, clearing...")
            clearSession()
            setUser(null)
          }
          return
        }

        // If no session, check if we have a token in Directus service
        const hasToken = await directusService.getToken()
        console.log("Has token:", !!hasToken)

        if (!hasToken) {
          // No token and no session - user is not authenticated
          setUser(null)
          return
        }

        // We have a token but no session - try to get user data
        try {
          const currentUser = await directusService.getCurrentUser()
          if (currentUser) {
            saveToSession(currentUser as User)
            setUser(currentUser as User)
          } else {
            setUser(null)
          }
        } catch (error) {
          console.error("Failed to get user with existing token:", error)
          // Token is invalid, clear it
          await directusService.clearToken()
          setUser(null)
        }
      } catch (error: any) {
        console.error("Auth check error:", error)
        // Clear any invalid tokens and session
        await directusService.clearToken()
        clearSession()
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
          clearSession()
          await directusService.clearToken()
        }
      },
      15 * 60 * 1000,
    ) // Refresh every 15 minutes

    return () => clearInterval(interval)
  }, [isAuthenticated])

  // Listen for storage changes (for multi-tab support)
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SESSION_KEYS.USER) {
        if (e.newValue === null) {
          // User was logged out in another tab
          setUser(null)
        } else if (e.newValue) {
          // User was logged in in another tab
          try {
            const newUser = JSON.parse(e.newValue) as User
            setUser(newUser)
          } catch (error) {
            console.error("Failed to parse user from storage event:", error)
          }
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

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
