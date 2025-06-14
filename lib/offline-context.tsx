"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface OfflineContextType {
  isOffline: boolean
  toggleOfflineMode: () => void
  setOfflineMode: (offline: boolean) => void
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined)

const OFFLINE_MODE_KEY = "eudr_offline_mode"

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOffline, setIsOffline] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize offline mode from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem(OFFLINE_MODE_KEY)
      setIsOffline(savedMode === "true")
      setIsInitialized(true)
    }
  }, [])

  // Save offline mode preference to localStorage
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      localStorage.setItem(OFFLINE_MODE_KEY, isOffline.toString())
    }
  }, [isOffline, isInitialized])

  const toggleOfflineMode = () => {
    setIsOffline((prev) => !prev)
  }

  const setOfflineMode = (offline: boolean) => {
    setIsOffline(offline)
  }

  return (
    <OfflineContext.Provider
      value={{
        isOffline,
        toggleOfflineMode,
        setOfflineMode,
      }}
    >
      {children}
    </OfflineContext.Provider>
  )
}

export function useOfflineMode() {
  const context = useContext(OfflineContext)
  if (context === undefined) {
    throw new Error("useOfflineMode must be used within an OfflineProvider")
  }
  return context
}
