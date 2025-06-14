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
} from "@/types"

// This file provides a simplified API interface that wraps tRPC calls
// It maintains the same interface as the previous oRPC client for easier migration

export const api = {
  // Organization procedures
  organization: {
    list: async (params?: { limit?: number; offset?: number; search?: string }): Promise<Organization[]> => {
      const utils = trpc.useUtils()
      return await utils.organization.list.fetch(params)
    },
    get: async (id: string): Promise<Organization> => {
      const utils = trpc.useUtils()
      return await utils.organization.get.fetch({ id })
    },
    create: async (data: any): Promise<Organization> => {
      const utils = trpc.useUtils()
      return await utils.organization.create.mutate(data)
    },
    update: async (id: string, data: any): Promise<Organization> => {
      const utils = trpc.useUtils()
      return await utils.organization.update.mutate({ id, data })
    },
    delete: async (id: string): Promise<{ success: boolean }> => {
      const utils = trpc.useUtils()
      return await utils.organization.delete.mutate({ id })
    },
  },

  // Customer procedures
  customer: {
    list: async (params?: { limit?: number; offset?: number; search?: string }): Promise<Customer[]> => {
      const utils = trpc.useUtils()
      return await utils.customer.list.fetch(params)
    },
    get: async (id: string): Promise<Customer> => {
      const utils = trpc.useUtils()
      return await utils.customer.get.fetch({ id })
    },
    create: async (data: any): Promise<Customer> => {
      const utils = trpc.useUtils()
      return await utils.customer.create.mutate(data)
    },
    update: async (id: string, data: any): Promise<Customer> => {
      const utils = trpc.useUtils()
      return await utils.customer.update.mutate({ id, data })
    },
    delete: async (id: string): Promise<{ success: boolean }> => {
      const utils = trpc.useUtils()
      return await utils.customer.delete.mutate({ id })
    },
  },

  // Product procedures
  product: {
    list: async (params?: {
      limit?: number
      offset?: number
      search?: string
      category?: string
      risk_level?: "low" | "medium" | "high"
    }): Promise<Product[]> => {
      const utils = trpc.useUtils()
      return await utils.product.list.fetch(params)
    },
    get: async (id: string): Promise<Product> => {
      const utils = trpc.useUtils()
      return await utils.product.get.fetch({ id })
    },
    create: async (data: any): Promise<Product> => {
      const utils = trpc.useUtils()
      return await utils.product.create.mutate(data)
    },
    update: async (id: string, data: any): Promise<Product> => {
      const utils = trpc.useUtils()
      return await utils.product.update.mutate({ id, data })
    },
    delete: async (id: string): Promise<{ success: boolean }> => {
      const utils = trpc.useUtils()
      return await utils.product.delete.mutate({ id })
    },
  },

  // Supplier procedures
  supplier: {
    list: async (params?: {
      limit?: number
      offset?: number
      search?: string
      verification_status?: "verified" | "pending" | "rejected"
      risk_level?: "low" | "medium" | "high"
    }): Promise<Supplier[]> => {
      const utils = trpc.useUtils()
      return await utils.supplier.list.fetch(params)
    },
    get: async (id: string): Promise<Supplier> => {
      const utils = trpc.useUtils()
      return await utils.supplier.get.fetch({ id })
    },
    create: async (data: any): Promise<Supplier> => {
      const utils = trpc.useUtils()
      return await utils.supplier.create.mutate(data)
    },
    update: async (id: string, data: any): Promise<Supplier> => {
      const utils = trpc.useUtils()
      return await utils.supplier.update.mutate({ id, data })
    },
    delete: async (id: string): Promise<{ success: boolean }> => {
      const utils = trpc.useUtils()
      return await utils.supplier.delete.mutate({ id })
    },
  },

  // Risk Assessment procedures
  riskAssessment: {
    list: async (params?: {
      limit?: number
      offset?: number
      search?: string
      status?: "draft" | "completed" | "approved" | "rejected"
      risk_level?: "low" | "medium" | "high"
    }): Promise<RiskAssessment[]> => {
      const utils = trpc.useUtils()
      return await utils.riskAssessment.list.fetch(params)
    },
    get: async (id: string): Promise<RiskAssessment> => {
      const utils = trpc.useUtils()
      return await utils.riskAssessment.get.fetch({ id })
    },
    create: async (data: any): Promise<RiskAssessment> => {
      const utils = trpc.useUtils()
      return await utils.riskAssessment.create.mutate(data)
    },
    update: async (id: string, data: any): Promise<RiskAssessment> => {
      const utils = trpc.useUtils()
      return await utils.riskAssessment.update.mutate({ id, data })
    },
    delete: async (id: string): Promise<{ success: boolean }> => {
      const utils = trpc.useUtils()
      return await utils.riskAssessment.delete.mutate({ id })
    },
  },

  // Due Diligence Statement procedures
  dueDiligenceStatement: {
    list: async (params?: {
      limit?: number
      offset?: number
      search?: string
      status?: "draft" | "submitted" | "approved" | "rejected"
    }): Promise<DueDiligenceStatement[]> => {
      const utils = trpc.useUtils()
      return await utils.dueDiligenceStatement.list.fetch(params)
    },
    get: async (id: string): Promise<DueDiligenceStatement> => {
      const utils = trpc.useUtils()
      return await utils.dueDiligenceStatement.get.fetch({ id })
    },
    create: async (data: any): Promise<DueDiligenceStatement> => {
      const utils = trpc.useUtils()
      return await utils.dueDiligenceStatement.create.mutate(data)
    },
    update: async (id: string, data: any): Promise<DueDiligenceStatement> => {
      const utils = trpc.useUtils()
      return await utils.dueDiligenceStatement.update.mutate({ id, data })
    },
    delete: async (id: string): Promise<{ success: boolean }> => {
      const utils = trpc.useUtils()
      return await utils.dueDiligenceStatement.delete.mutate({ id })
    },
    submit: async (id: string): Promise<DueDiligenceStatement> => {
      const utils = trpc.useUtils()
      return await utils.dueDiligenceStatement.submit.mutate({ id })
    },
  },

  // Raw Material procedures
  rawMaterial: {
    list: async (params?: { limit?: number; offset?: number; search?: string }): Promise<RawMaterial[]> => {
      const utils = trpc.useUtils()
      return await utils.rawMaterial.list.fetch(params)
    },
    get: async (id: string): Promise<RawMaterial> => {
      const utils = trpc.useUtils()
      return await utils.rawMaterial.get.fetch({ id })
    },
    create: async (data: any): Promise<RawMaterial> => {
      const utils = trpc.useUtils()
      return await utils.rawMaterial.create.mutate(data)
    },
    update: async (id: string, data: any): Promise<RawMaterial> => {
      const utils = trpc.useUtils()
      return await utils.rawMaterial.update.mutate({ id, data })
    },
    delete: async (id: string): Promise<{ success: boolean }> => {
      const utils = trpc.useUtils()
      return await utils.rawMaterial.delete.mutate({ id })
    },
  },

  // Origin procedures
  origin: {
    list: async (params?: { limit?: number; offset?: number; search?: string }): Promise<Origin[]> => {
      const utils = trpc.useUtils()
      return await utils.origin.list.fetch(params)
    },
    get: async (id: string): Promise<Origin> => {
      const utils = trpc.useUtils()
      return await utils.origin.get.fetch({ id })
    },
    create: async (data: any): Promise<Origin> => {
      const utils = trpc.useUtils()
      return await utils.origin.create.mutate(data)
    },
    update: async (id: string, data: any): Promise<Origin> => {
      const utils = trpc.useUtils()
      return await utils.origin.update.mutate({ id, data })
    },
    delete: async (id: string): Promise<{ success: boolean }> => {
      const utils = trpc.useUtils()
      return await utils.origin.delete.mutate({ id })
    },
  },
}
