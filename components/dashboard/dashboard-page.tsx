"use client"

import { Building2, Users, Package, Shield } from "lucide-react"
import { useDashboard } from "@/hooks/use-dashboard"
import { DashboardStats } from "./dashboard-stats"
import { RecentActivity } from "./recent-activity"
import { ComplianceOverview } from "./compliance-overview"

export function DashboardPage() {
  const { stats, recentActivity, complianceMetrics, isLoading, getComplianceColor } = useDashboard()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: "Organizations",
      value: stats.organizations.toString(),
      description: "Active organizations",
      icon: Building2,
    },
    {
      title: "Products",
      value: stats.products.toString(),
      description: "Registered products",
      icon: Package,
    },
    {
      title: "Suppliers",
      value: stats.suppliers.toString(),
      description: "Verified suppliers",
      icon: Users,
    },
    {
      title: "Risk Assessments",
      value: stats.riskAssessments.toString(),
      description: "Completed assessments",
      icon: Shield,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your EUDR compliance status</p>
      </div>

      <DashboardStats stats={statCards} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentActivity activities={recentActivity} />
        <ComplianceOverview metrics={complianceMetrics} getComplianceColor={getComplianceColor} />
      </div>
    </div>
  )
}
