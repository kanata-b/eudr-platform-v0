import {
  organizationStorage,
  customerStorage,
  productStorage,
  supplierStorage,
  rawMaterialStorage,
  originStorage,
  riskAssessmentStorage,
  dueDiligenceStatementStorage,
  initializeMockData,
} from "./local-storage"
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

// Simulate network delay
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

// Initialize mock data on first load
if (typeof window !== "undefined") {
  initializeMockData()
}

// Mock API functions
export const mockApi = {
  // Organizations
  organization: {
    list: async (): Promise<Organization[]> => {
      await delay()
      return organizationStorage.list()
    },
    get: async (id: string): Promise<Organization | null> => {
      await delay()
      return organizationStorage.get(id)
    },
    create: async (data: CreateOrganizationData): Promise<Organization> => {
      await delay()
      return organizationStorage.create(data)
    },
    update: async (id: string, data: Partial<CreateOrganizationData>): Promise<Organization | null> => {
      await delay()
      return organizationStorage.update(id, data)
    },
    delete: async (id: string): Promise<boolean> => {
      await delay()
      return organizationStorage.delete(id)
    },
  },

  // Customers
  customer: {
    list: async (): Promise<Customer[]> => {
      await delay()
      return customerStorage.list()
    },
    get: async (id: string): Promise<Customer | null> => {
      await delay()
      return customerStorage.get(id)
    },
    create: async (data: CreateCustomerData): Promise<Customer> => {
      await delay()
      return customerStorage.create(data)
    },
    update: async (id: string, data: Partial<CreateCustomerData>): Promise<Customer | null> => {
      await delay()
      return customerStorage.update(id, data)
    },
    delete: async (id: string): Promise<boolean> => {
      await delay()
      return customerStorage.delete(id)
    },
  },

  // Products
  product: {
    list: async (): Promise<Product[]> => {
      await delay()
      return productStorage.list()
    },
    get: async (id: string): Promise<Product | null> => {
      await delay()
      return productStorage.get(id)
    },
    create: async (data: CreateProductData): Promise<Product> => {
      await delay()
      return productStorage.create(data)
    },
    update: async (id: string, data: Partial<CreateProductData>): Promise<Product | null> => {
      await delay()
      return productStorage.update(id, data)
    },
    delete: async (id: string): Promise<boolean> => {
      await delay()
      return productStorage.delete(id)
    },
  },

  // Suppliers
  supplier: {
    list: async (): Promise<Supplier[]> => {
      await delay()
      return supplierStorage.list()
    },
    get: async (id: string): Promise<Supplier | null> => {
      await delay()
      return supplierStorage.get(id)
    },
    create: async (data: CreateSupplierData): Promise<Supplier> => {
      await delay()
      return supplierStorage.create(data)
    },
    update: async (id: string, data: Partial<CreateSupplierData>): Promise<Supplier | null> => {
      await delay()
      return supplierStorage.update(id, data)
    },
    delete: async (id: string): Promise<boolean> => {
      await delay()
      return supplierStorage.delete(id)
    },
  },

  // Raw Materials
  rawMaterial: {
    list: async (): Promise<RawMaterial[]> => {
      await delay()
      return rawMaterialStorage.list()
    },
    get: async (id: string): Promise<RawMaterial | null> => {
      await delay()
      return rawMaterialStorage.get(id)
    },
    create: async (data: CreateRawMaterialData): Promise<RawMaterial> => {
      await delay()
      return rawMaterialStorage.create(data)
    },
    update: async (id: string, data: Partial<CreateRawMaterialData>): Promise<RawMaterial | null> => {
      await delay()
      return rawMaterialStorage.update(id, data)
    },
    delete: async (id: string): Promise<boolean> => {
      await delay()
      return rawMaterialStorage.delete(id)
    },
  },

  // Origins
  origin: {
    list: async (): Promise<Origin[]> => {
      await delay()
      return originStorage.list()
    },
    get: async (id: string): Promise<Origin | null> => {
      await delay()
      return originStorage.get(id)
    },
    create: async (data: CreateOriginData): Promise<Origin> => {
      await delay()
      return originStorage.create(data)
    },
    update: async (id: string, data: Partial<CreateOriginData>): Promise<Origin | null> => {
      await delay()
      return originStorage.update(id, data)
    },
    delete: async (id: string): Promise<boolean> => {
      await delay()
      return originStorage.delete(id)
    },
  },

  // Risk Assessments
  riskAssessment: {
    list: async (): Promise<RiskAssessment[]> => {
      await delay()
      return riskAssessmentStorage.list()
    },
    get: async (id: string): Promise<RiskAssessment | null> => {
      await delay()
      return riskAssessmentStorage.get(id)
    },
    create: async (data: CreateRiskAssessmentData): Promise<RiskAssessment> => {
      await delay()
      return riskAssessmentStorage.create(data)
    },
    update: async (id: string, data: Partial<CreateRiskAssessmentData>): Promise<RiskAssessment | null> => {
      await delay()
      return riskAssessmentStorage.update(id, data)
    },
    delete: async (id: string): Promise<boolean> => {
      await delay()
      return riskAssessmentStorage.delete(id)
    },
  },

  // Due Diligence Statements
  dueDiligenceStatement: {
    list: async (): Promise<DueDiligenceStatement[]> => {
      await delay()
      return dueDiligenceStatementStorage.list()
    },
    get: async (id: string): Promise<DueDiligenceStatement | null> => {
      await delay()
      return dueDiligenceStatementStorage.get(id)
    },
    create: async (data: CreateDueDiligenceStatementData): Promise<DueDiligenceStatement> => {
      await delay()
      return dueDiligenceStatementStorage.create(data)
    },
    update: async (
      id: string,
      data: Partial<CreateDueDiligenceStatementData>,
    ): Promise<DueDiligenceStatement | null> => {
      await delay()
      return dueDiligenceStatementStorage.update(id, data)
    },
    delete: async (id: string): Promise<boolean> => {
      await delay()
      return dueDiligenceStatementStorage.delete(id)
    },
    submit: async (id: string): Promise<DueDiligenceStatement | null> => {
      await delay()
      return dueDiligenceStatementStorage.update(id, {
        status: "submitted",
        submission_date: new Date().toISOString().split("T")[0],
      })
    },
  },

  // Dashboard stats
  dashboard: {
    stats: async () => {
      await delay()
      const organizations = organizationStorage.list()
      const customers = customerStorage.list()
      const products = productStorage.list()
      const suppliers = supplierStorage.list()
      const riskAssessments = riskAssessmentStorage.list()
      const dueDiligenceStatements = dueDiligenceStatementStorage.list()

      return {
        totalOrganizations: organizations.length,
        totalCustomers: customers.length,
        totalProducts: products.length,
        totalSuppliers: suppliers.length,
        highRiskAssessments: riskAssessments.filter((r) => r.deforestation_risk === "high").length,
        pendingStatements: dueDiligenceStatements.filter((s) => s.status === "draft").length,
        complianceRate: Math.round(
          (dueDiligenceStatements.filter((s) => s.status === "approved").length /
            Math.max(dueDiligenceStatements.length, 1)) *
            100,
        ),
        averageRiskScore:
          riskAssessments.length > 0
            ? Math.round(riskAssessments.reduce((sum, r) => sum + r.overall_risk_score, 0) / riskAssessments.length)
            : 0,
      }
    },
    recentActivity: async () => {
      await delay()
      const allItems = [
        ...organizationStorage.list().map((item) => ({ ...item, type: "organization" })),
        ...customerStorage.list().map((item) => ({ ...item, type: "customer" })),
        ...productStorage.list().map((item) => ({ ...item, type: "product" })),
        ...riskAssessmentStorage.list().map((item) => ({ ...item, type: "risk_assessment" })),
        ...dueDiligenceStatementStorage.list().map((item) => ({ ...item, type: "due_diligence" })),
      ]

      return allItems
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        .slice(0, 10)
        .map((item) => ({
          id: item.id,
          type: item.type,
          title:
            "name" in item
              ? item.name
              : "assessment_name" in item
                ? item.assessment_name
                : "statement_number" in item
                  ? item.statement_number
                  : "Unknown",
          description: `${item.type.replace("_", " ")} updated`,
          timestamp: item.updated_at,
        }))
    },
  },
}
