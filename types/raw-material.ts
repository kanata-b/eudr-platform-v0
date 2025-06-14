import type { FilterOptions } from "./api"
import type { Supplier } from "./supplier"
import type { Origin } from "./origin"

export type RawMaterialType = "timber" | "palm_oil" | "soy_beans" | "coffee_beans" | "cocoa_beans" | "rubber" | "cattle"

export type VolumeUnit = "kg" | "tons" | "m3" | "liters"

export type RiskLevel = "low" | "medium" | "high"

export interface RawMaterial {
  id: string
  name: string
  type: RawMaterialType
  origin_location: string
  coordinates: string
  harvest_date: string
  supplier_id: string
  volume: number
  unit: VolumeUnit
  sustainability_certificate?: string
  risk_assessment: RiskLevel
  created_at: string
  updated_at?: string
}

export interface CreateRawMaterialData {
  name: string
  type: RawMaterialType
  origin_location: string
  coordinates: string
  harvest_date: string
  supplier_id: string
  volume: number
  unit: VolumeUnit
  sustainability_certificate?: string
  risk_assessment: RiskLevel
}

export interface UpdateRawMaterialData extends Partial<CreateRawMaterialData> {}

export interface RawMaterialFilters extends FilterOptions {
  type?: RawMaterialType
  risk_assessment?: RiskLevel
  supplier_id?: string
  origin_location?: string
  harvest_date_from?: string
  harvest_date_to?: string
}

export interface RawMaterialWithRelations extends RawMaterial {
  supplier?: Supplier
  origin?: Origin
}
