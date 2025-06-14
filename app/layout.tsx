import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { TRPCProvider } from "@/lib/trpc-provider"
import { OfflineProvider } from "@/lib/offline-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EUDR Platform - Exporter Management",
  description: "European Union Deforestation Regulation compliance platform for exporters",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationOnChange>
      <body className={inter.className}>
        <OfflineProvider>
          <TRPCProvider>
            <AuthProvider>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                {children}
                <Toaster />
              </ThemeProvider>
            </AuthProvider>
          </TRPCProvider>
        </OfflineProvider>
      </body>
    </html>
  )
}
