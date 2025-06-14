// Dashboard types
export interface DashboardStats {
  organizations: number
  customers: number
  products: number
  suppliers: number
  rawMaterials: number
  origins: number
  riskAssessments: number
  dueDiligenceStatements: number
}

export interface ActivityItem {
  id: string
  title: string
  description: string
  timestamp: string
  type: "create" | "update" | "delete" | "submit" | "approve" | "reject"
  entity: string
  entityId: string
}

export interface ComplianceMetric {
  name: string
  percentage: number
  status: "good" | "warning" | "danger"
  target?: number
  trend?: "up" | "down" | "stable"
}

export interface StatCard {
  title: string
  value: string
  description: string
  icon: any // LucideIcon type
  change?: {
    value: number
    type: "increase" | "decrease"
    period: string
  }
}

export interface ChartData {
  name: string
  value: number
  color?: string
}

export interface TimeSeriesData {
  date: string
  value: number
  category?: string
}
