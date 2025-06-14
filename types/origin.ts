import type { FilterOptions } from "./api"
import type { RawMaterial } from "./raw-material"
import type { RiskAssessment } from "./risk-assessment"

export type LandUseType = "forest" | "agricultural" | "plantation" | "mixed" | "grassland" | "wetland"

export type LandOwnership = "private" | "public" | "community" | "indigenous" | "mixed"

export type RiskLevel = "low" | "medium" | "high"

export interface Origin {
  id: string
  location_name: string
  country: string
  region: string
  coordinates: string
  land_use_type: LandUseType
  forest_coverage: number
  deforestation_risk: RiskLevel
  protected_area: boolean
  indigenous_territory: boolean
  land_ownership: LandOwnership
  monitoring_system: string
  satellite_data_available: boolean
  last_verification_date: string
  created_at: string
  updated_at?: string
}

export interface CreateOriginData {
  location_name: string
  country: string
  region: string
  coordinates: string
  land_use_type: LandUseType
  forest_coverage: number
  deforestation_risk: RiskLevel
  protected_area: boolean
  indigenous_territory: boolean
  land_ownership: LandOwnership
  monitoring_system: string
  satellite_data_available: boolean
  last_verification_date: string
}

export interface UpdateOriginData extends Partial<CreateOriginData> {}

export interface OriginFilters extends FilterOptions {
  country?: string
  region?: string
  land_use_type?: LandUseType
  deforestation_risk?: RiskLevel
  land_ownership?: LandOwnership
  protected_area?: boolean
  indigenous_territory?: boolean
  satellite_data_available?: boolean
}

export interface OriginWithRelations extends Origin {
  raw_materials?: RawMaterial[]
  risk_assessments?: RiskAssessment[]
}
