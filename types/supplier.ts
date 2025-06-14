// Supplier types
import type { FilterOptions } from "./api"
import type { Product } from "./product"
import type { RawMaterial } from "./raw-material"
import type { RiskAssessment } from "./risk-assessment"

export type BusinessType = "producer" | "processor" | "trader" | "manufacturer" | "distributor"

export type VerificationStatus = "verified" | "pending" | "rejected"

export type RiskLevel = "low" | "medium" | "high"

export interface Supplier {
  id: string
  name: string
  company_registration: string
  address: string
  country: string
  contact_person: string
  email: string
  phone: string
  business_type: BusinessType
  verification_status: VerificationStatus
  certifications?: string
  risk_level: RiskLevel
  last_audit_date?: string
  created_at: string
  updated_at?: string
}

export interface CreateSupplierData {
  name: string
  company_registration: string
  address: string
  country: string
  contact_person: string
  email: string
  phone: string
  business_type: BusinessType
  verification_status: VerificationStatus
  certifications?: string
  risk_level: RiskLevel
  last_audit_date?: string
}

export interface UpdateSupplierData extends Partial<CreateSupplierData> {}

export interface SupplierFilters extends FilterOptions {
  business_type?: BusinessType
  verification_status?: VerificationStatus
  risk_level?: RiskLevel
  country?: string
  last_audit_from?: string
  last_audit_to?: string
}

export interface SupplierWithRelations extends Supplier {
  products?: Product[]
  raw_materials?: RawMaterial[]
  risk_assessments?: RiskAssessment[]
}

export interface SupplierVerificationBadge {
  className: string
  icon: string
  text: string
}
