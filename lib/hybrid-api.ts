import { mockApi } from "@/lib/mock-api"
import { api } from "@/lib/trpc-client"
import type {
  Organization,
  Customer,
  Product,
  Supplier,
  RawMaterial,
  Origin,
  RiskAssessment,
  DueDiligenceStatement,
  CreateOrganizationData,
  CreateCustomerData,
  CreateProductData,
  CreateSupplierData,
  CreateRawMaterialData,
  CreateOriginData,
  CreateRiskAssessmentData,
  CreateDueDiligenceStatementData,
} from "@/types"

// Helper to check if we're in offline mode
function isOfflineMode(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("eudr_offline_mode") === "true"
}

// Hybrid API that switches between mock and real API based on offline mode
export const hybridApi = {
  // Organizations
  organization: {
    list: async (): Promise<Organization[]> => {
      if (isOfflineMode()) {
        return mockApi.organization.list()
      }
      try {
        const result = await api.organization.list.query()
        return result
      } catch (error) {
        console.error("Failed to fetch organizations:", error)
        // Fallback to mock data on error
        return mockApi.organization.list()
      }
    },
    get: async (id: string): Promise<Organization | null> => {
      if (isOfflineMode()) {
        return mockApi.organization.get(id)
      }
      try {
        const result = await api.organization.get.query({ id })
        return result
      } catch (error) {
        console.error("Failed to fetch organization:", error)
        return mockApi.organization.get(id)
      }
    },
    create: async (data: CreateOrganizationData): Promise<Organization> => {
      if (isOfflineMode()) {
        return mockApi.organization.create(data)
      }
      try {
        const result = await api.organization.create.mutate(data)
        return result
      } catch (error) {
        console.error("Failed to create organization:", error)
        return mockApi.organization.create(data)
      }
    },
    update: async (id: string, data: Partial<CreateOrganizationData>): Promise<Organization | null> => {
      if (isOfflineMode()) {
        return mockApi.organization.update(id, data)
      }
      try {
        const result = await api.organization.update.mutate({ id, data })
        return result
      } catch (error) {
        console.error("Failed to update organization:", error)
        return mockApi.organization.update(id, data)
      }
    },
    delete: async (id: string): Promise<boolean> => {
      if (isOfflineMode()) {
        return mockApi.organization.delete(id)
      }
      try {
        const result = await api.organization.delete.mutate({ id })
        return result.success
      } catch (error) {
        console.error("Failed to delete organization:", error)
        return mockApi.organization.delete(id)
      }
    },
  },

  // Customers
  customer: {
    list: async (): Promise<Customer[]> => {
      if (isOfflineMode()) {
        return mockApi.customer.list()
      }
      try {
        const result = await api.customer.list.query()
        return result
      } catch (error) {
        console.error("Failed to fetch customers:", error)
        return mockApi.customer.list()
      }
    },
    get: async (id: string): Promise<Customer | null> => {
      if (isOfflineMode()) {
        return mockApi.customer.get(id)
      }
      try {
        const result = await api.customer.get.query({ id })
        return result
      } catch (error) {
        console.error("Failed to fetch customer:", error)
        return mockApi.customer.get(id)
      }
    },
    create: async (data: CreateCustomerData): Promise<Customer> => {
      if (isOfflineMode()) {
        return mockApi.customer.create(data)
      }
      try {
        const result = await api.customer.create.mutate(data)
        return result
      } catch (error) {
        console.error("Failed to create customer:", error)
        return mockApi.customer.create(data)
      }
    },
    update: async (id: string, data: Partial<CreateCustomerData>): Promise<Customer | null> => {
      if (isOfflineMode()) {
        return mockApi.customer.update(id, data)
      }
      try {
        const result = await api.customer.update.mutate({ id, data })
        return result
      } catch (error) {
        console.error("Failed to update customer:", error)
        return mockApi.customer.update(id, data)
      }
    },
    delete: async (id: string): Promise<boolean> => {
      if (isOfflineMode()) {
        return mockApi.customer.delete(id)
      }
      try {
        const result = await api.customer.delete.mutate({ id })
        return result.success
      } catch (error) {
        console.error("Failed to delete customer:", error)
        return mockApi.customer.delete(id)
      }
    },
  },

  // Products
  product: {
    list: async (): Promise<Product[]> => {
      if (isOfflineMode()) {
        return mockApi.product.list()
      }
      try {
        const result = await api.product.list.query()
        return result
      } catch (error) {
        console.error("Failed to fetch products:", error)
        return mockApi.product.list()
      }
    },
    get: async (id: string): Promise<Product | null> => {
      if (isOfflineMode()) {
        return mockApi.product.get(id)
      }
      try {
        const result = await api.product.get.query({ id })
        return result
      } catch (error) {
        console.error("Failed to fetch product:", error)
        return mockApi.product.get(id)
      }
    },
    create: async (data: CreateProductData): Promise<Product> => {
      if (isOfflineMode()) {
        return mockApi.product.create(data)
      }
      try {
        const result = await api.product.create.mutate(data)
        return result
      } catch (error) {
        console.error("Failed to create product:", error)
        return mockApi.product.create(data)
      }
    },
    update: async (id: string, data: Partial<CreateProductData>): Promise<Product | null> => {
      if (isOfflineMode()) {
        return mockApi.product.update(id, data)
      }
      try {
        const result = await api.product.update.mutate({ id, data })
        return result
      } catch (error) {
        console.error("Failed to update product:", error)
        return mockApi.product.update(id, data)
      }
    },
    delete: async (id: string): Promise<boolean> => {
      if (isOfflineMode()) {
        return mockApi.product.delete(id)
      }
      try {
        const result = await api.product.delete.mutate({ id })
        return result.success
      } catch (error) {
        console.error("Failed to delete product:", error)
        return mockApi.product.delete(id)
      }
    },
  },

  // Suppliers
  supplier: {
    list: async (): Promise<Supplier[]> => {
      if (isOfflineMode()) {
        return mockApi.supplier.list()
      }
      try {
        const result = await api.supplier.list.query()
        return result
      } catch (error) {
        console.error("Failed to fetch suppliers:", error)
        return mockApi.supplier.list()
      }
    },
    get: async (id: string): Promise<Supplier | null> => {
      if (isOfflineMode()) {
        return mockApi.supplier.get(id)
      }
      try {
        const result = await api.supplier.get.query({ id })
        return result
      } catch (error) {
        console.error("Failed to fetch supplier:", error)
        return mockApi.supplier.get(id)
      }
    },
    create: async (data: CreateSupplierData): Promise<Supplier> => {
      if (isOfflineMode()) {
        return mockApi.supplier.create(data)
      }
      try {
        const result = await api.supplier.create.mutate(data)
        return result
      } catch (error) {
        console.error("Failed to create supplier:", error)
        return mockApi.supplier.create(data)
      }
    },
    update: async (id: string, data: Partial<CreateSupplierData>): Promise<Supplier | null> => {
      if (isOfflineMode()) {
        return mockApi.supplier.update(id, data)
      }
      try {
        const result = await api.supplier.update.mutate({ id, data })
        return result
      } catch (error) {
        console.error("Failed to update supplier:", error)
        return mockApi.supplier.update(id, data)
      }
    },
    delete: async (id: string): Promise<boolean> => {
      if (isOfflineMode()) {
        return mockApi.supplier.delete(id)
      }
      try {
        const result = await api.supplier.delete.mutate({ id })
        return result.success
      } catch (error) {
        console.error("Failed to delete supplier:", error)
        return mockApi.supplier.delete(id)
      }
    },
  },

  // Raw Materials
  rawMaterial: {
    list: async (): Promise<RawMaterial[]> => {
      if (isOfflineMode()) {
        return mockApi.rawMaterial.list()
      }
      try {
        const result = await api.rawMaterial.list.query()
        return result
      } catch (error) {
        console.error("Failed to fetch raw materials:", error)
        return mockApi.rawMaterial.list()
      }
    },
    get: async (id: string): Promise<RawMaterial | null> => {
      if (isOfflineMode()) {
        return mockApi.rawMaterial.get(id)
      }
      try {
        const result = await api.rawMaterial.get.query({ id })
        return result
      } catch (error) {
        console.error("Failed to fetch raw material:", error)
        return mockApi.rawMaterial.get(id)
      }
    },
    create: async (data: CreateRawMaterialData): Promise<RawMaterial> => {
      if (isOfflineMode()) {
        return mockApi.rawMaterial.create(data)
      }
      try {
        const result = await api.rawMaterial.create.mutate(data)
        return result
      } catch (error) {
        console.error("Failed to create raw material:", error)
        return mockApi.rawMaterial.create(data)
      }
    },
    update: async (id: string, data: Partial<CreateRawMaterialData>): Promise<RawMaterial | null> => {
      if (isOfflineMode()) {
        return mockApi.rawMaterial.update(id, data)
      }
      try {
        const result = await api.rawMaterial.update.mutate({ id, data })
        return result
      } catch (error) {
        console.error("Failed to update raw material:", error)
        return mockApi.rawMaterial.update(id, data)
      }
    },
    delete: async (id: string): Promise<boolean> => {
      if (isOfflineMode()) {
        return mockApi.rawMaterial.delete(id)
      }
      try {
        const result = await api.rawMaterial.delete.mutate({ id })
        return result.success
      } catch (error) {
        console.error("Failed to delete raw material:", error)
        return mockApi.rawMaterial.delete(id)
      }
    },
  },

  // Origins
  origin: {
    list: async (): Promise<Origin[]> => {
      if (isOfflineMode()) {
        return mockApi.origin.list()
      }
      try {
        const result = await api.origin.list.query()
        return result
      } catch (error) {
        console.error("Failed to fetch origins:", error)
        return mockApi.origin.list()
      }
    },
    get: async (id: string): Promise<Origin | null> => {
      if (isOfflineMode()) {
        return mockApi.origin.get(id)
      }
      try {
        const result = await api.origin.get.query({ id })
        return result
      } catch (error) {
        console.error("Failed to fetch origin:", error)
        return mockApi.origin.get(id)
      }
    },
    create: async (data: CreateOriginData): Promise<Origin> => {
      if (isOfflineMode()) {
        return mockApi.origin.create(data)
      }
      try {
        const result = await api.origin.create.mutate(data)
        return result
      } catch (error) {
        console.error("Failed to create origin:", error)
        return mockApi.origin.create(data)
      }
    },
    update: async (id: string, data: Partial<CreateOriginData>): Promise<Origin | null> => {
      if (isOfflineMode()) {
        return mockApi.origin.update(id, data)
      }
      try {
        const result = await api.origin.update.mutate({ id, data })
        return result
      } catch (error) {
        console.error("Failed to update origin:", error)
        return mockApi.origin.update(id, data)
      }
    },
    delete: async (id: string): Promise<boolean> => {
      if (isOfflineMode()) {
        return mockApi.origin.delete(id)
      }
      try {
        const result = await api.origin.delete.mutate({ id })
        return result.success
      } catch (error) {
        console.error("Failed to delete origin:", error)
        return mockApi.origin.delete(id)
      }
    },
  },

  // Risk Assessments
  riskAssessment: {
    list: async (): Promise<RiskAssessment[]> => {
      if (isOfflineMode()) {
        return mockApi.riskAssessment.list()
      }
      try {
        const result = await api.riskAssessment.list.query()
        return result
      } catch (error) {
        console.error("Failed to fetch risk assessments:", error)
        return mockApi.riskAssessment.list()
      }
    },
    get: async (id: string): Promise<RiskAssessment | null> => {
      if (isOfflineMode()) {
        return mockApi.riskAssessment.get(id)
      }
      try {
        const result = await api.riskAssessment.get.query({ id })
        return result
      } catch (error) {
        console.error("Failed to fetch risk assessment:", error)
        return mockApi.riskAssessment.get(id)
      }
    },
    create: async (data: CreateRiskAssessmentData): Promise<RiskAssessment> => {
      if (isOfflineMode()) {
        return mockApi.riskAssessment.create(data)
      }
      try {
        const result = await api.riskAssessment.create.mutate(data)
        return result
      } catch (error) {
        console.error("Failed to create risk assessment:", error)
        return mockApi.riskAssessment.create(data)
      }
    },
    update: async (id: string, data: Partial<CreateRiskAssessmentData>): Promise<RiskAssessment | null> => {
      if (isOfflineMode()) {
        return mockApi.riskAssessment.update(id, data)
      }
      try {
        const result = await api.riskAssessment.update.mutate({ id, data })
        return result
      } catch (error) {
        console.error("Failed to update risk assessment:", error)
        return mockApi.riskAssessment.update(id, data)
      }
    },
    delete: async (id: string): Promise<boolean> => {
      if (isOfflineMode()) {
        return mockApi.riskAssessment.delete(id)
      }
      try {
        const result = await api.riskAssessment.delete.mutate({ id })
        return result.success
      } catch (error) {
        console.error("Failed to delete risk assessment:", error)
        return mockApi.riskAssessment.delete(id)
      }
    },
  },

  // Due Diligence Statements
  dueDiligenceStatement: {
    list: async (): Promise<DueDiligenceStatement[]> => {
      if (isOfflineMode()) {
        return mockApi.dueDiligenceStatement.list()
      }
      try {
        const result = await api.dueDiligenceStatement.list.query()
        return result
      } catch (error) {
        console.error("Failed to fetch due diligence statements:", error)
        return mockApi.dueDiligenceStatement.list()
      }
    },
    get: async (id: string): Promise<DueDiligenceStatement | null> => {
      if (isOfflineMode()) {
        return mockApi.dueDiligenceStatement.get(id)
      }
      try {
        const result = await api.dueDiligenceStatement.get.query({ id })
        return result
      } catch (error) {
        console.error("Failed to fetch due diligence statement:", error)
        return mockApi.dueDiligenceStatement.get(id)
      }
    },
    create: async (data: CreateDueDiligenceStatementData): Promise<DueDiligenceStatement> => {
      if (isOfflineMode()) {
        return mockApi.dueDiligenceStatement.create(data)
      }
      try {
        const result = await api.dueDiligenceStatement.create.mutate(data)
        return result
      } catch (error) {
        console.error("Failed to create due diligence statement:", error)
        return mockApi.dueDiligenceStatement.create(data)
      }
    },
    update: async (
      id: string,
      data: Partial<CreateDueDiligenceStatementData>,
    ): Promise<DueDiligenceStatement | null> => {
      if (isOfflineMode()) {
        return mockApi.dueDiligenceStatement.update(id, data)
      }
      try {
        const result = await api.dueDiligenceStatement.update.mutate({ id, data })
        return result
      } catch (error) {
        console.error("Failed to update due diligence statement:", error)
        return mockApi.dueDiligenceStatement.update(id, data)
      }
    },
    delete: async (id: string): Promise<boolean> => {
      if (isOfflineMode()) {
        return mockApi.dueDiligenceStatement.delete(id)
      }
      try {
        const result = await api.dueDiligenceStatement.delete.mutate({ id })
        return result.success
      } catch (error) {
        console.error("Failed to delete due diligence statement:", error)
        return mockApi.dueDiligenceStatement.delete(id)
      }
    },
    submit: async (id: string): Promise<DueDiligenceStatement | null> => {
      if (isOfflineMode()) {
        return mockApi.dueDiligenceStatement.submit(id)
      }
      try {
        const result = await api.dueDiligenceStatement.submit.mutate({ id })
        return result
      } catch (error) {
        console.error("Failed to submit due diligence statement:", error)
        return mockApi.dueDiligenceStatement.submit(id)
      }
    },
  },

  // Dashboard
  dashboard: {
    stats: async () => {
      if (isOfflineMode()) {
        return mockApi.dashboard.stats()
      }
      try {
        const result = await api.dashboard.stats.query()
        return result
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error)
        return mockApi.dashboard.stats()
      }
    },
    recentActivity: async () => {
      if (isOfflineMode()) {
        return mockApi.dashboard.recentActivity()
      }
      try {
        const result = await api.dashboard.recentActivity.query()
        return result
      } catch (error) {
        console.error("Failed to fetch recent activity:", error)
        return mockApi.dashboard.recentActivity()
      }
    },
  },
}
