// Due Diligence types
export type StatementStatus = "draft" | "submitted" | "approved" | "rejected"

export type VolumeUnit = "kg" | "tons" | "m3" | "liters"

export interface DueDiligenceStatement {
  id: string
  statement_number: string
  company_name: string
  reporting_period_start: string
  reporting_period_end: string
  product_categories: string
  total_volume: number
  volume_unit: VolumeUnit
  countries_of_origin: string
  risk_assessment_completed: boolean
  mitigation_measures?: string
  monitoring_system: string
  third_party_verification: boolean
  declaration_text: string
  signatory_name: string
  signatory_position: string
  signature_date: string
  status: StatementStatus
  submission_date?: string
  created_at: string
  updated_at?: string
}

export interface CreateDueDiligenceStatementData {
  statement_number: string
  company_name: string
  reporting_period_start: string
  reporting_period_end: string
  product_categories: string
  total_volume: number
  volume_unit: VolumeUnit
  countries_of_origin: string
  risk_assessment_completed: boolean
  mitigation_measures?: string
  monitoring_system: string
  third_party_verification: boolean
  declaration_text: string
  signatory_name: string
  signatory_position: string
  signature_date: string
  status: StatementStatus
  submission_date?: string
}

export interface UpdateDueDiligenceStatementData extends Partial<CreateDueDiligenceStatementData> {}

export interface DueDiligenceFilters {
  status?: StatementStatus
  company_name?: string
  reporting_period_start?: string
  reporting_period_end?: string
  risk_assessment_completed?: boolean
  third_party_verification?: boolean
  submission_date_from?: string
  submission_date_to?: string
}

export interface DueDiligenceStatistics {
  totalStatements: number
  submittedCount: number
  approvedCount: number
  draftCount: number
  rejectedCount: number
  complianceRate: number
}

export interface StatementStatusBadge {
  className: string
  icon: string
  text: string
}
