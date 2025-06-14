import type {
  Organization,
  Customer,
  Product,
  Supplier,
  RawMaterial,
  Origin,
  RiskAssessment,
  DueDiligenceStatement,
} from "./index"

// Directus-specific types
export interface DirectusSchema {
  organizations: Organization[]
  customers: Customer[]
  products: Product[]
  suppliers: Supplier[]
  raw_materials: RawMaterial[]
  origins: Origin[]
  risk_assessments: RiskAssessment[]
  due_diligence_statements: DueDiligenceStatement[]
  users: any[]
}

export interface DirectusQuery {
  fields?: string[]
  filter?: Record<string, any>
  sort?: string[]
  limit?: number
  offset?: number
  page?: number
  search?: string
  deep?: Record<string, any>
}

export interface DirectusResponse<T> {
  data: T
  meta?: {
    total_count: number
    filter_count: number
  }
}

export interface DirectusError {
  message: string
  extensions: {
    code: string
    exception?: any
  }
}

export interface DirectusFile {
  id: string
  storage: string
  filename_disk: string
  filename_download: string
  title?: string
  type: string
  folder?: string
  uploaded_by: string
  uploaded_on: string
  modified_by?: string
  modified_on?: string
  charset?: string
  filesize: number
  width?: number
  height?: number
  duration?: number
  embed?: string
  description?: string
  location?: string
  tags?: string[]
  metadata?: Record<string, any>
}
