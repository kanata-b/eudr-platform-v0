"use client"

// Utility functions for managing auth tokens in sessionStorage
export const sessionAuth = {
  // Set auth token in sessionStorage
  setToken: (token: string, type: "auth" | "directus" = "directus") => {
    if (typeof window !== "undefined") {
      const key = type === "auth" ? "auth_token" : "directus_session_token"
      sessionStorage.setItem(key, token)

      // Also set expiration
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      sessionStorage.setItem("auth_expires_at", expiresAt)
    }
  },

  // Get auth token from sessionStorage
  getToken: (type: "auth" | "directus" = "directus"): string | null => {
    if (typeof window !== "undefined") {
      // Check if token is expired
      const expiresAt = sessionStorage.getItem("auth_expires_at")
      if (expiresAt && new Date(expiresAt) < new Date()) {
        sessionAuth.clearTokens()
        return null
      }

      const key = type === "auth" ? "auth_token" : "directus_session_token"
      return sessionStorage.getItem(key)
    }
    return null
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    if (typeof window !== "undefined") {
      // Check if token exists and is not expired
      const token = sessionAuth.getToken("directus") || sessionAuth.getToken("auth")
      return !!token
    }
    return false
  },

  // Clear all auth tokens
  clearTokens: () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("auth_token")
      sessionStorage.removeItem("directus_session_token")
      sessionStorage.removeItem("auth_expires_at")
      sessionStorage.removeItem("user_session")

      // Also clear localStorage as fallback
      localStorage.removeItem("auth_token")
      localStorage.removeItem("directus_session_token")
    }
  },

  // Set user session data
  setSession: (sessionData: any) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("user_session", JSON.stringify(sessionData))
    }
  },

  // Get user session data
  getSession: () => {
    if (typeof window !== "undefined") {
      const session = sessionStorage.getItem("user_session")
      return session ? JSON.parse(session) : null
    }
    return null
  },

  // Check if session is expired
  isExpired: (): boolean => {
    if (typeof window !== "undefined") {
      const expiresAt = sessionStorage.getItem("auth_expires_at")
      return expiresAt ? new Date(expiresAt) < new Date() : false
    }
    return true
  },
}
