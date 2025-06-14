type HealthStatus = {
  isOnline: boolean;
  error?: string;
  status?: string;
};

type DirectusHealthResponse = {
  status: string; 
}


export async function checkDirectusHealth(url: string): Promise<HealthStatus> {
  try {
    console.log(url)
    // Add timeout to prevent hanging
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout for external services

    // Try the server health endpoint first
    let response: Response
    let data: DirectusHealthResponse | undefined = undefined
    try {
      response = await fetch(`${url}/server/health`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        cache: "no-cache",
      })
      data = await response.json() as DirectusHealthResponse
    } catch (healthError) {
      // If health endpoint fails, try the root endpoint
      response = await fetch(`${url}/`, {
        method: "GET",
        signal: controller.signal,
        cache: "no-cache",
      })
      try {
        data = await response.json() as DirectusHealthResponse
      } catch {
        data = { status: "error" }
      }
    }

    clearTimeout(timeoutId)
    if (data === undefined) {
      data = { status: "error" }; // Fallback if no data returned
    }
    return {
      isOnline: data.status == "ok",
      status: data.status,
      error: data.status == "ok" ? undefined : `HTTP ${data.status}`,
    }
  } catch (error) {
    console.error("Directus health check failed:", error)

    let errorMessage = "Unknown error"
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        errorMessage = "Request timeout - Directus server may be slow to respond"
      } else if (error.message.includes("fetch")) {
        errorMessage = "Cannot connect to Directus server"
      } else if (error.message.includes("CORS")) {
        errorMessage = "CORS error - check Directus CORS settings"
      } else {
        errorMessage = error.message
      }
    }

    return {
      isOnline: false,
      error: errorMessage,
    }
  }
}

// Alternative health check that tries multiple endpoints
export async function checkDirectusConnection(url: string): Promise<{
  isOnline: boolean
  error?: string
  endpoint?: string
}> {
  const endpoints = ["/server/health", "/server/info", "/", "/admin"]

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch(`${url}${endpoint}`, {
        method: "GET",
        signal: controller.signal,
        cache: "no-cache",
      })

      clearTimeout(timeoutId)

      if (response.ok || response.status === 401) {
        // 401 means server is responding but needs auth - that's good!
        return {
          isOnline: true,
          endpoint,
        }
      }
    } catch (error) {
      // Continue to next endpoint
      continue
    }
  }

  return {
    isOnline: false,
    error: "All health check endpoints failed",
  }
}
