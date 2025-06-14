// Product types
import type { FilterOptions } from "./api"
import type { Supplier } from "./supplier"
import type { RawMaterial } from "./raw-material"
import type { RiskAssessment } from "./risk-assessment"

export type ProductCategory = "wood" | "palm_oil" | "soy" | "coffee" | "cocoa" | "rubber" | "cattle"

export type RiskLevel = "low" | "medium" | "high"

export interface Product {
  id: string
  name: string
  description?: string
  category: ProductCategory
  hs_code: string
  origin_country: string
  supplier_id: string
  risk_level: RiskLevel
  certification?: string
  created_at: string
  updated_at?: string
}

export interface CreateProductData {
  name: string
  description?: string
  category: ProductCategory
  hs_code: string
  origin_country: string
  supplier_id: string
  risk_level: RiskLevel
  certification?: string
}

export interface UpdateProductData extends Partial<CreateProductData> {}

export interface ProductFilters extends FilterOptions {
  category?: ProductCategory
  risk_level?: RiskLevel
  origin_country?: string
  supplier_id?: string
  certification?: string
}

export interface ProductWithRelations extends Product {
  supplier?: Supplier
  raw_materials?: RawMaterial[]
  risk_assessments?: RiskAssessment[]
}
