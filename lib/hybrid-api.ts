import { mockApi } from "@/lib/mock-api"
import { trpc } from "@/lib/trpc-client"
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
const utils = trpc.useUtils() // Moved hook call to the top level

export const hybridApi = {
  // Organizations
  organization: {
    list: async (): Promise<Organization[]> => {
      if (isOfflineMode()) {
        return mockApi.organization.list()
      }
      // Use tRPC utils for online mode
      return await utils.organization.list.fetch()
    },
    get: async (id: string): Promise<Organization | null> => {
      if (isOfflineMode()) {
        return mockApi.organization.get(id)
      }
      return await utils.organization.get.fetch({ id })
    },
    create: async (data: CreateOrganizationData): Promise<Organization> => {
      if (isOfflineMode()) {
        return mockApi.organization.create(data)
      }
      return await utils.organization.create.mutate(data)
    },
    update: async (id: string, data: Partial<CreateOrganizationData>): Promise<Organization | null> => {
      if (isOfflineMode()) {
        return mockApi.organization.update(id, data)
      }
      return await utils.organization.update.mutate({ id, data })
    },
    delete: async (id: string): Promise<boolean> => {
      if (isOfflineMode()) {
        return mockApi.organization.delete(id)
      }
      const result = await utils.organization.delete.mutate({ id })
      return result.success
    },
  },

  // Customers
  customer: {
    list: async (): Promise<Customer[]> => {
      if (isOfflineMode()) {
        return mockApi.customer.list()
      }
      return await utils.customer.list.fetch()
    },
    get: async (id: string): Promise<Customer | null> => {
      if (isOfflineMode()) {
        return mockApi.customer.get(id)
      }
      return await utils.customer.get.fetch({ id })
    },
    create: async (data: CreateCustomerData): Promise<Customer> => {
      if (isOfflineMode()) {
        return mockApi.customer.create(data)
      }
      return await utils.customer.create.mutate(data)
    },
    update: async (id: string, data: Partial<CreateCustomerData>): Promise<Customer | null> => {
      if (isOfflineMode()) {
        return mockApi.customer.update(id, data)
      }
      return await utils.customer.update.mutate({ id, data })
    },
    delete: async (id: string): Promise<boolean> => {
      if (isOfflineMode()) {
        return mockApi.customer.delete(id)
      }
      const result = await utils.customer.delete.mutate({ id })
      return result.success
    },
  },

  // Products
  product: {
    list: async (): Promise<Product[]> => {
      if (isOfflineMode()) {
        return mockApi.product.list()
      }
      return await utils.product.list.fetch()
    },
    get: async (id: string): Promise<Product | null> => {
      if (isOfflineMode()) {
        return mockApi.product.get(id)
      }
      return await utils.product.get.fetch({ id })
    },
    create: async (data: CreateProductData): Promise<Product> => {
      if (isOfflineMode()) {
        return mockApi.product.create(data)
      }
      return await utils.product.create.mutate(data)
    },
    update: async (id: string, data: Partial<CreateProductData>): Promise<Product | null> => {
      if (isOfflineMode()) {
        return mockApi.product.update(id, data)
      }
      return await utils.product.update.mutate({ id, data })
    },
    delete: async (id: string): Promise<boolean> => {
      if (isOfflineMode()) {
        return mockApi.product.delete(id)
      }
      const result = await utils.product.delete.mutate({ id })
      return result.success
    },
  },

  // Suppliers
  supplier: {
    list: async (): Promise<Supplier[]> => {
      if (isOfflineMode()) {
        return mockApi.supplier.list()
      }
      return await utils.supplier.list.fetch()
    },
    get: async (id: string): Promise<Supplier | null> => {
      if (isOfflineMode()) {
        return mockApi.supplier.get(id)
      }
      return await utils.supplier.get.fetch({ id })
    },
    create: async (data: CreateSupplierData): Promise<Supplier> => {
      if (isOfflineMode()) {
        return mockApi.supplier.create(data)
      }
      return await utils.supplier.create.mutate(data)
    },
    update: async (id: string, data: Partial<CreateSupplierData>): Promise<Supplier | null> => {
      if (isOfflineMode()) {
        return mockApi.supplier.update(id, data)
      }
      return await utils.supplier.update.mutate({ id, data })
    },
    delete: async (id: string): Promise<boolean> => {
      if (isOfflineMode()) {
        return mockApi.supplier.delete(id)
      }
      const result = await utils.supplier.delete.mutate({ id })
      return result.success
    },
  },

  // Raw Materials
  rawMaterial: {
    list: async (): Promise<RawMaterial[]> => {
      if (isOfflineMode()) {
        return mockApi.rawMaterial.list()
      }
      return await utils.rawMaterial.list.fetch()
    },
    get: async (id: string): Promise<RawMaterial | null> => {
      if (isOfflineMode()) {
        return mockApi.rawMaterial.get(id)
      }
      return await utils.rawMaterial.get.fetch({ id })
    },
    create: async (data: CreateRawMaterialData): Promise<RawMaterial> => {
      if (isOfflineMode()) {
        return mockApi.rawMaterial.create(data)
      }
      return await utils.rawMaterial.create.mutate(data)
    },
    update: async (id: string, data: Partial<CreateRawMaterialData>): Promise<RawMaterial | null> => {
      if (isOfflineMode()) {
        return mockApi.rawMaterial.update(id, data)
      }
      return await utils.rawMaterial.update.mutate({ id, data })
    },
    delete: async (id: string): Promise<boolean> => {
      if (isOfflineMode()) {
        return mockApi.rawMaterial.delete(id)
      }
      const result = await utils.rawMaterial.delete.mutate({ id })
      return result.success
    },
  },

  // Origins
  origin: {
    list: async (): Promise<Origin[]> => {
      if (isOfflineMode()) {
        return mockApi.origin.list()
      }
      return await utils.origin.list.fetch()
    },
    get: async (id: string): Promise<Origin | null> => {
      if (isOfflineMode()) {
        return mockApi.origin.get(id)
      }
      return await utils.origin.get.fetch({ id })
    },
    create: async (data: CreateOriginData): Promise<Origin> => {
      if (isOfflineMode()) {
        return mockApi.origin.create(data)
      }
      return await utils.origin.create.mutate(data)
    },
    update: async (id: string, data: Partial<CreateOriginData>): Promise<Origin | null> => {
      if (isOfflineMode()) {
        return mockApi.origin.update(id, data)
      }
      return await utils.origin.update.mutate({ id, data })
    },
    delete: async (id: string): Promise<boolean> => {
      if (isOfflineMode()) {
        return mockApi.origin.delete(id)
      }
      const result = await utils.origin.delete.mutate({ id })
      return result.success
    },
  },

  // Risk Assessments
  riskAssessment: {
    list: async (): Promise<RiskAssessment[]> => {
      if (isOfflineMode()) {
        return mockApi.riskAssessment.list()
      }
      return await utils.riskAssessment.list.fetch()
    },
    get: async (id: string): Promise<RiskAssessment | null> => {
      if (isOfflineMode()) {
        return mockApi.riskAssessment.get(id)
      }
      return await utils.riskAssessment.get.fetch({ id })
    },
    create: async (data: CreateRiskAssessmentData): Promise<RiskAssessment> => {
      if (isOfflineMode()) {
        return mockApi.riskAssessment.create(data)
      }
      return await utils.riskAssessment.create.mutate(data)
    },
    update: async (id: string, data: Partial<CreateRiskAssessmentData>): Promise<RiskAssessment | null> => {
      if (isOfflineMode()) {
        return mockApi.riskAssessment.update(id, data)
      }
      return await utils.riskAssessment.update.mutate({ id, data })
    },
    delete: async (id: string): Promise<boolean> => {
      if (isOfflineMode()) {
        return mockApi.riskAssessment.delete(id)
      }
      const result = await utils.riskAssessment.delete.mutate({ id })
      return result.success
    },
  },

  // Due Diligence Statements
  dueDiligenceStatement: {
    list: async (): Promise<DueDiligenceStatement[]> => {
      if (isOfflineMode()) {
        return mockApi.dueDiligenceStatement.list()
      }
      return await utils.dueDiligenceStatement.list.fetch()
    },
    get: async (id: string): Promise<DueDiligenceStatement | null> => {
      if (isOfflineMode()) {
        return mockApi.dueDiligenceStatement.get(id)
      }
      return await utils.dueDiligenceStatement.get.fetch({ id })
    },
    create: async (data: CreateDueDiligenceStatementData): Promise<DueDiligenceStatement> => {
      if (isOfflineMode()) {
        return mockApi.dueDiligenceStatement.create(data)
      }
      return await utils.dueDiligenceStatement.create.mutate(data)
    },
    update: async (
      id: string,
      data: Partial<CreateDueDiligenceStatementData>,
    ): Promise<DueDiligenceStatement | null> => {
      if (isOfflineMode()) {
        return mockApi.dueDiligenceStatement.update(id, data)
      }
      return await utils.dueDiligenceStatement.update.mutate({ id, data })
    },
    delete: async (id: string): Promise<boolean> => {
      if (isOfflineMode()) {
        return mockApi.dueDiligenceStatement.delete(id)
      }
      const result = await utils.dueDiligenceStatement.delete.mutate({ id })
      return result.success
    },
    submit: async (id: string): Promise<DueDiligenceStatement | null> => {
      if (isOfflineMode()) {
        return mockApi.dueDiligenceStatement.submit(id)
      }
      return await utils.dueDiligenceStatement.submit.mutate({ id })
    },
  },

  // Dashboard
  dashboard: {
    stats: async () => {
      if (isOfflineMode()) {
        return mockApi.dashboard.stats()
      }
      return await utils.dashboard.stats.fetch()
    },
    recentActivity: async () => {
      if (isOfflineMode()) {
        return mockApi.dashboard.recentActivity()
      }
      return await utils.dashboard.recentActivity.fetch()
    },
  },
}
