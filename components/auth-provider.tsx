"use client"

import { AuthProvider as AuthContextProvider } from "@/lib/auth-context"
import type { ReactNode } from "react"

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <AuthContextProvider>{children}</AuthContextProvider>
}
