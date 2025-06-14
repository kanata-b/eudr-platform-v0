// Risk Assessment types
import type { FilterOptions } from "./api"
import type { Product } from "./product"
import type { Supplier } from "./supplier"
import type { Origin } from "./origin"

export type RiskLevel = "low" | "medium" | "high"

export type LegalCompliance = "compliant" | "non_compliant" | "under_review"

export type AssessmentStatus = "draft" | "completed" | "approved" | "rejected"

export interface RiskAssessment {
  id: string
  assessment_name: string
  product_id: string
  supplier_id: string
  origin_id: string
  assessment_date: string
  assessor_name: string
  overall_risk_score: number
  deforestation_risk: RiskLevel
  legal_compliance: LegalCompliance
  environmental_impact: number
  social_impact: number
  mitigation_measures?: string
  follow_up_required: boolean
  next_review_date?: string
  status: AssessmentStatus
  created_at: string
  updated_at?: string
}

export interface CreateRiskAssessmentData {
  assessment_name: string
  product_id: string
  supplier_id: string
  origin_id: string
  assessment_date: string
  assessor_name: string
  overall_risk_score: number
  deforestation_risk: RiskLevel
  legal_compliance: LegalCompliance
  environmental_impact: number
  social_impact: number
  mitigation_measures?: string
  follow_up_required: boolean
  next_review_date?: string
  status: AssessmentStatus
}

export interface UpdateRiskAssessmentData extends Partial<CreateRiskAssessmentData> {}

export interface RiskAssessmentFilters extends FilterOptions {
  status?: AssessmentStatus
  deforestation_risk?: RiskLevel
  legal_compliance?: LegalCompliance
  product_id?: string
  supplier_id?: string
  origin_id?: string
  assessor_name?: string
  assessment_date_from?: string
  assessment_date_to?: string
  follow_up_required?: boolean
}

export interface RiskAssessmentWithRelations extends RiskAssessment {
  product?: Product
  supplier?: Supplier
  origin?: Origin
}

export interface RiskAssessmentStatistics {
  totalAssessments: number
  highRiskCount: number
  approvedCount: number
  averageRiskScore: number
  complianceRate: number
  pendingReviews: number
}

export interface ComplianceBadge {
  className: string
  text: string
}

export interface StatusBadge {
  className: string
  text: string
}
