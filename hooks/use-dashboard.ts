"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { trpc } from "@/lib/trpc-client"
import type { DashboardStats, ActivityItem, ComplianceMetric } from "@/types/dashboard"

export function useDashboard() {
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([])
  const [complianceMetrics, setComplianceMetrics] = useState<ComplianceMetric[]>([])
  const { toast } = useToast()

  // tRPC queries
  const { data: organizations = [], isLoading: orgsLoading } = trpc.organization.list.useQuery()
  const { data: products = [], isLoading: productsLoading } = trpc.product.list.useQuery()
  const { data: suppliers = [], isLoading: suppliersLoading } = trpc.supplier.list.useQuery()
  const { data: assessments = [], isLoading: assessmentsLoading } = trpc.riskAssessment.list.useQuery()

  const isLoading = orgsLoading || productsLoading || suppliersLoading || assessmentsLoading

  const stats: DashboardStats = {
    organizations: organizations.length,
    customers: 0, // Add when customer API is implemented
    products: products.length,
    suppliers: suppliers.length,
    rawMaterials: 0, // Add when raw materials API is implemented
    origins: 0, // Add when origins API is implemented
    riskAssessments: assessments.length,
    dueDiligenceStatements: 0, // Add when due diligence API is implemented
  }

  const loadDashboardData = async () => {
    try {
      // Mock recent activity data
      setRecentActivity([
        {
          id: "1",
          title: "New risk assessment completed",
          description: "Risk assessment for Product ABC completed",
          timestamp: "2 hours ago",
          type: "create",
          entity: "risk_assessment",
          entityId: "1",
        },
        {
          id: "2",
          title: "Supplier verification updated",
          description: "Supplier XYZ verification status updated",
          timestamp: "5 hours ago",
          type: "update",
          entity: "supplier",
          entityId: "2",
        },
        {
          id: "3",
          title: "New product registered",
          description: "Product DEF added to catalog",
          timestamp: "1 day ago",
          type: "create",
          entity: "product",
          entityId: "3",
        },
      ])

      // Mock compliance metrics
      setComplianceMetrics([
        { name: "Due Diligence Statements", percentage: 85, status: "good" },
        { name: "Risk Assessments", percentage: 72, status: "warning" },
        { name: "Supplier Verification", percentage: 91, status: "good" },
      ])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    }
  }

  const getComplianceColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "danger":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  return {
    // State
    stats,
    recentActivity,
    complianceMetrics,
    isLoading,

    // Actions
    loadDashboardData,

    // Utilities
    getComplianceColor,
  }
}

// Additional hooks for more granular usage
export function useDashboardStats() {
  const organizationsQuery = trpc.organization.list.useQuery({ limit: 1000 })
  const customersQuery = trpc.customer.list.useQuery({ limit: 1000 })
  const productsQuery = trpc.product.list.useQuery({ limit: 1000 })
  const suppliersQuery = trpc.supplier.list.useQuery({ limit: 1000 })
  const riskAssessmentsQuery = trpc.riskAssessment.list.useQuery({ limit: 1000 })
  const dueDiligenceQuery = trpc.dueDiligenceStatement.list.useQuery({ limit: 1000 })

  const isLoading =
    organizationsQuery.isLoading ||
    customersQuery.isLoading ||
    productsQuery.isLoading ||
    suppliersQuery.isLoading ||
    riskAssessmentsQuery.isLoading ||
    dueDiligenceQuery.isLoading

  const error =
    organizationsQuery.error ||
    customersQuery.error ||
    productsQuery.error ||
    suppliersQuery.error ||
    riskAssessmentsQuery.error ||
    dueDiligenceQuery.error

  const stats = {
    totalOrganizations: organizationsQuery.data?.length || 0,
    totalCustomers: customersQuery.data?.length || 0,
    totalProducts: productsQuery.data?.length || 0,
    totalSuppliers: suppliersQuery.data?.length || 0,
    pendingRiskAssessments: riskAssessmentsQuery.data?.filter((ra) => ra.status === "draft").length || 0,
    completedDueDiligence: dueDiligenceQuery.data?.filter((dd) => dd.status === "approved").length || 0,
  }

  return {
    data: stats,
    isLoading,
    error,
  }
}

export function useRecentActivity() {
  // Get recent items from various entities
  const recentOrganizations = trpc.organization.list.useQuery({ limit: 5 })
  const recentCustomers = trpc.customer.list.useQuery({ limit: 5 })
  const recentProducts = trpc.product.list.useQuery({ limit: 5 })

  const isLoading = recentOrganizations.isLoading || recentCustomers.isLoading || recentProducts.isLoading

  const error = recentOrganizations.error || recentCustomers.error || recentProducts.error

  // Combine and sort recent activities
  const activities = [
    ...(recentOrganizations.data?.map((org) => ({
      id: org.id,
      type: "organization" as const,
      title: org.name,
      timestamp: org.created_at,
    })) || []),
    ...(recentCustomers.data?.map((customer) => ({
      id: customer.id,
      type: "customer" as const,
      title: customer.name,
      timestamp: customer.created_at,
    })) || []),
    ...(recentProducts.data?.map((product) => ({
      id: product.id,
      type: "product" as const,
      title: product.name,
      timestamp: product.created_at,
    })) || []),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  return {
    data: activities,
    isLoading,
    error,
  }
}
