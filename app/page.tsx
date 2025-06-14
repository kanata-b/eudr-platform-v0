"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react"
import { checkDirectusHealth, checkDirectusConnection } from "@/lib/directus-health"
import Link from "next/link"

type DirectusStatus = {
  status: "checking" | "online" | "offline"
  error?: string
  lastChecked?: Date
}

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const [directusStatus, setDirectusStatus] = useState<DirectusStatus>({
    status: "checking",
  })
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  const checkDirectusStatus = async () => {
    setDirectusStatus({ status: "checking" })

    const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055"

    // Try primary health check first
    const healthResult = await checkDirectusHealth(directusUrl)

    if (healthResult.isOnline) {
      setDirectusStatus({
        status: "online",
        lastChecked: new Date(),
      })
      return
    }

    // If primary fails, try alternative connection check
    const connectionResult = await checkDirectusConnection(directusUrl)

    setDirectusStatus({
      status: connectionResult.isOnline ? "online" : "offline",
      error: healthResult.error || connectionResult.error,
      lastChecked: new Date(),
    })
  }

  useEffect(() => {
    checkDirectusStatus()
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null // Will redirect to dashboard
  }

  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055"

  return (
    <div className="min-h-svh">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex min-h-svh items-center justify-center">
        <div className="flex flex-col items-center gap-4 max-w-md">
          <h1 className="text-4xl font-bold">EUDR Platform</h1>
          <p className="text-muted-foreground text-center">
            European Union Deforestation Regulation compliance platform for exporters
          </p>

          {/* Directus Status */}
          <div className="w-full">
            {directusStatus.status === "checking" && (
              <Alert>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                <AlertDescription>Checking Directus connection...</AlertDescription>
              </Alert>
            )}

            {directusStatus.status === "online" && (
              <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Directus is online and ready
                  {directusStatus.lastChecked && (
                    <div className="text-xs mt-1 opacity-70">
                      Last checked: {directusStatus.lastChecked.toLocaleTimeString()}
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {directusStatus.status === "offline" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <div>Cannot connect to Directus</div>
                    <div className="text-xs">
                      <strong>URL:</strong> <code>{directusUrl}</code>
                    </div>
                    {directusStatus.error && (
                      <div className="text-xs">
                        <strong>Error:</strong> {directusStatus.error}
                      </div>
                    )}
                    <div className="text-xs mt-2">
                      <strong>Troubleshooting:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Make sure Directus is running on {directusUrl}</li>
                        <li>Check if the URL in your .env.local is correct</li>
                        <li>Verify CORS settings in Directus</li>
                      </ul>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Retry button for offline status */}
            {directusStatus.status === "offline" && (
              <div className="flex justify-center mt-2">
                <Button variant="outline" size="sm" onClick={checkDirectusStatus} className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Retry Connection
                </Button>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-6">
            <Button asChild disabled={directusStatus.status === "offline"}>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button variant="outline" asChild disabled={directusStatus.status === "offline"}>
              <Link href="/auth/signin">Get Started</Link>
            </Button>
          </div>

          {/* Development helper */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-3 bg-muted rounded-lg text-xs">
              <div className="font-medium mb-2">Development Info:</div>
              <div>
                Directus URL: <code>{directusUrl}</code>
              </div>
              <div>
                Status: <code>{directusStatus.status}</code>
              </div>
              {directusStatus.error && (
                <div>
                  Error: <code>{directusStatus.error}</code>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
