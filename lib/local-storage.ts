import {
  mockOrganizations,
  mockCustomers,
  mockProducts,
  mockSuppliers,
  mockRawMaterials,
  mockOrigins,
  mockRiskAssessments,
  mockDueDiligenceStatements,
} from "./mock-data"
import type {
  Organization,
  Customer,
  Product,
  Supplier,
  RawMaterial,
  Origin,
  RiskAssessment,
  DueDiligenceStatement,
} from "@/types"

// Storage keys
const STORAGE_KEYS = {
  organizations: "eudr_organizations",
  customers: "eudr_customers",
  products: "eudr_products",
  suppliers: "eudr_suppliers",
  rawMaterials: "eudr_raw_materials",
  origins: "eudr_origins",
  riskAssessments: "eudr_risk_assessments",
  dueDiligenceStatements: "eudr_due_diligence_statements",
  initialized: "eudr_initialized",
} as const

// Utility functions
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

function getFromStorage<T>(key: string, defaultValue: T[]): T[] {
  if (typeof window === "undefined") return defaultValue
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch {
    return defaultValue
  }
}

function saveToStorage<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Failed to save to localStorage:`, error)
  }
}

// Initialize mock data
export function initializeMockData(): void {
  if (typeof window === "undefined") return

  const isInitialized = localStorage.getItem(STORAGE_KEYS.initialized)
  if (isInitialized) return

  // Initialize with mock data
  saveToStorage(STORAGE_KEYS.organizations, mockOrganizations)
  saveToStorage(STORAGE_KEYS.customers, mockCustomers)
  saveToStorage(STORAGE_KEYS.products, mockProducts)
  saveToStorage(STORAGE_KEYS.suppliers, mockSuppliers)
  saveToStorage(STORAGE_KEYS.rawMaterials, mockRawMaterials)
  saveToStorage(STORAGE_KEYS.origins, mockOrigins)
  saveToStorage(STORAGE_KEYS.riskAssessments, mockRiskAssessments)
  saveToStorage(STORAGE_KEYS.dueDiligenceStatements, mockDueDiligenceStatements)

  localStorage.setItem(STORAGE_KEYS.initialized, "true")
}

// Generic CRUD operations
class LocalStorageService<T extends { id: string; created_at: string; updated_at: string }> {
  constructor(
    private storageKey: string,
    private defaultData: T[],
  ) {}

  list(): T[] {
    return getFromStorage(this.storageKey, this.defaultData)
  }

  get(id: string): T | null {
    const items = this.list()
    return items.find((item) => item.id === id) || null
  }

  create(data: Omit<T, "id" | "created_at" | "updated_at">): T {
    const items = this.list()
    const now = new Date().toISOString()
    const newItem = {
      ...data,
      id: generateId(),
      created_at: now,
      updated_at: now,
    } as T

    items.push(newItem)
    saveToStorage(this.storageKey, items)
    return newItem
  }

  update(id: string, data: Partial<Omit<T, "id" | "created_at">>): T | null {
    const items = this.list()
    const index = items.findIndex((item) => item.id === id)

    if (index === -1) return null

    const updatedItem = {
      ...items[index],
      ...data,
      updated_at: new Date().toISOString(),
    }

    items[index] = updatedItem
    saveToStorage(this.storageKey, items)
    return updatedItem
  }

  delete(id: string): boolean {
    const items = this.list()
    const filteredItems = items.filter((item) => item.id !== id)

    if (filteredItems.length === items.length) return false

    saveToStorage(this.storageKey, filteredItems)
    return true
  }

  clear(): void {
    saveToStorage(this.storageKey, [])
  }

  reset(): void {
    saveToStorage(this.storageKey, this.defaultData)
  }
}

// Service instances
export const organizationStorage = new LocalStorageService<Organization>(STORAGE_KEYS.organizations, mockOrganizations)

export const customerStorage = new LocalStorageService<Customer>(STORAGE_KEYS.customers, mockCustomers)

export const productStorage = new LocalStorageService<Product>(STORAGE_KEYS.products, mockProducts)

export const supplierStorage = new LocalStorageService<Supplier>(STORAGE_KEYS.suppliers, mockSuppliers)

export const rawMaterialStorage = new LocalStorageService<RawMaterial>(STORAGE_KEYS.rawMaterials, mockRawMaterials)

export const originStorage = new LocalStorageService<Origin>(STORAGE_KEYS.origins, mockOrigins)

export const riskAssessmentStorage = new LocalStorageService<RiskAssessment>(
  STORAGE_KEYS.riskAssessments,
  mockRiskAssessments,
)

export const dueDiligenceStatementStorage = new LocalStorageService<DueDiligenceStatement>(
  STORAGE_KEYS.dueDiligenceStatements,
  mockDueDiligenceStatements,
)

// Utility functions for demo
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key)
    }
  })
}

export function resetToMockData(): void {
  clearAllData()
  initializeMockData()
}

export function exportData(): string {
  const data = {
    organizations: organizationStorage.list(),
    customers: customerStorage.list(),
    products: productStorage.list(),
    suppliers: supplierStorage.list(),
    rawMaterials: rawMaterialStorage.list(),
    origins: originStorage.list(),
    riskAssessments: riskAssessmentStorage.list(),
    dueDiligenceStatements: dueDiligenceStatementStorage.list(),
  }
  return JSON.stringify(data, null, 2)
}

export function importData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData)

    if (data.organizations) saveToStorage(STORAGE_KEYS.organizations, data.organizations)
    if (data.customers) saveToStorage(STORAGE_KEYS.customers, data.customers)
    if (data.products) saveToStorage(STORAGE_KEYS.products, data.products)
    if (data.suppliers) saveToStorage(STORAGE_KEYS.suppliers, data.suppliers)
    if (data.rawMaterials) saveToStorage(STORAGE_KEYS.rawMaterials, data.rawMaterials)
    if (data.origins) saveToStorage(STORAGE_KEYS.origins, data.origins)
    if (data.riskAssessments) saveToStorage(STORAGE_KEYS.riskAssessments, data.riskAssessments)
    if (data.dueDiligenceStatements) saveToStorage(STORAGE_KEYS.dueDiligenceStatements, data.dueDiligenceStatements)

    return true
  } catch {
    return false
  }
}
