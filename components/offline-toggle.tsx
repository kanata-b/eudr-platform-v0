"use client"

import { useOfflineMode } from "@/lib/offline-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { resetToMockData } from "@/lib/local-storage"

export function OfflineToggle() {
  const { isOffline, toggleOfflineMode } = useOfflineMode()
  const { toast } = useToast()

  const handleToggle = () => {
    toggleOfflineMode()
    toast({
      title: isOffline ? "Switched to Online Mode" : "Switched to Offline Mode",
      description: isOffline ? "Now using live API data" : "Now using local demo data",
    })
  }

  const handleResetData = () => {
    if (isOffline) {
      resetToMockData()
      toast({
        title: "Demo Data Reset",
        description: "All data has been reset to default demo values",
      })
      // Refresh the page to reload the data
      window.location.reload()
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Badge variant={isOffline ? "secondary" : "default"} className="flex items-center gap-1">
        {isOffline ? <WifiOff className="h-3 w-3" /> : <Wifi className="h-3 w-3" />}
        {isOffline ? "Demo Mode" : "Live Mode"}
      </Badge>

      <Button variant="outline" size="sm" onClick={handleToggle} className="flex items-center gap-1">
        {isOffline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
        {isOffline ? "Go Online" : "Go Offline"}
      </Button>

      {isOffline && (
        <Button variant="outline" size="sm" onClick={handleResetData} className="flex items-center gap-1">
          <RotateCcw className="h-4 w-4" />
          Reset Demo
        </Button>
      )}
    </div>
  )
}
