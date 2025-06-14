"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { hybridApi } from "@/lib/hybrid-api"
import { useOfflineMode } from "@/lib/offline-context"

export function useDashboard() {
  const [stats, setStats] = useState({
    totalOrganizations: 0,
    totalCustomers: 0,
    totalProducts: 0,
    totalSuppliers: 0,
    highRiskAssessments: 0,
    pendingStatements: 0,
    complianceRate: 0,
    averageRiskScore: 0,
  })
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { isOffline } = useOfflineMode()

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      const [statsData, activityData] = await Promise.all([
        hybridApi.dashboard.stats(),
        hybridApi.dashboard.recentActivity(),
      ])
      setStats(statsData)
      setRecentActivity(activityData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Reload data when switching between offline/online modes
  useEffect(() => {
    loadDashboardData()
  }, [isOffline])

  useEffect(() => {
    loadDashboardData()
  }, [])

  return {
    stats,
    recentActivity,
    isLoading,
    refresh: loadDashboardData,
  }
}

// Individual hooks for granular usage
export function useDashboardStats() {
  const { stats, isLoading } = useDashboard()
  return { stats, isLoading }
}

export function useRecentActivity() {
  const { recentActivity, isLoading } = useDashboard()
  return { recentActivity, isLoading }
}
