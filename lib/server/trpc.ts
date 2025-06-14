import { initTRPC } from "@trpc/server"
import { z } from "zod"
import superjson from "superjson"
import { directusService } from "@/lib/services/directus"
import {
  createOrganizationSchema,
  updateOrganizationSchema,
  organizationIdSchema,
} from "@/lib/validations/organization"
import { createCustomerSchema, updateCustomerSchema, customerIdSchema } from "@/lib/validations/customer"
import { createProductSchema, updateProductSchema, productIdSchema } from "@/lib/validations/product"
import { createSupplierSchema, updateSupplierSchema, supplierIdSchema } from "@/lib/validations/supplier"
import {
  createRiskAssessmentSchema,
  updateRiskAssessmentSchema,
  riskAssessmentIdSchema,
} from "@/lib/validations/risk-assessment"
import {
  createDueDiligenceStatementSchema,
  updateDueDiligenceStatementSchema,
  dueDiligenceStatementIdSchema,
} from "@/lib/validations/due-diligence"
import { createRawMaterialSchema, updateRawMaterialSchema, rawMaterialIdSchema } from "@/lib/validations/raw-material"
import { createOriginSchema, updateOriginSchema, originIdSchema } from "@/lib/validations/origin"

// Initialize tRPC
const t = initTRPC.create({
  transformer: superjson,
})

// Create router and procedure helpers
export const createTRPCRouter = t.router
export const publicProcedure = t.procedure

// Organization router
const organizationRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z
        .object({
          limit: z.number().optional(),
          offset: z.number().optional(),
          search: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const query: any = {}

      if (input?.limit) query.limit = input.limit
      if (input?.offset) query.offset = input.offset
      if (input?.search) {
        query.filter = {
          _or: [
            { name: { _icontains: input.search } },
            { email: { _icontains: input.search } },
            { contact_person: { _icontains: input.search } },
          ],
        }
      }

      return await directusService.getOrganizations(query)
    }),

  get: publicProcedure.input(organizationIdSchema).query(async ({ input }) => {
    return await directusService.getItem("organizations", input.id)
  }),

  create: publicProcedure.input(createOrganizationSchema).mutation(async ({ input }) => {
    return await directusService.createItem("organizations", {
      ...input,
      created_at: new Date().toISOString(),
    })
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: updateOrganizationSchema,
      }),
    )
    .mutation(async ({ input }) => {
      return await directusService.updateItem("organizations", input.id, input.data)
    }),

  delete: publicProcedure.input(organizationIdSchema).mutation(async ({ input }) => {
    await directusService.deleteItem("organizations", input.id)
    return { success: true }
  }),
})

// Customer router
const customerRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z
        .object({
          limit: z.number().optional(),
          offset: z.number().optional(),
          search: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const query: any = {}

      if (input?.limit) query.limit = input.limit
      if (input?.offset) query.offset = input.offset
      if (input?.search) {
        query.filter = {
          _or: [
            { name: { _icontains: input.search } },
            { company: { _icontains: input.search } },
            { email: { _icontains: input.search } },
          ],
        }
      }

      return await directusService.getCustomers(query)
    }),

  get: publicProcedure.input(customerIdSchema).query(async ({ input }) => {
    return await directusService.getItem("customers", input.id)
  }),

  create: publicProcedure.input(createCustomerSchema).mutation(async ({ input }) => {
    return await directusService.createItem("customers", {
      ...input,
      created_at: new Date().toISOString(),
    })
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: updateCustomerSchema,
      }),
    )
    .mutation(async ({ input }) => {
      return await directusService.updateItem("customers", input.id, input.data)
    }),

  delete: publicProcedure.input(customerIdSchema).mutation(async ({ input }) => {
    await directusService.deleteItem("customers", input.id)
    return { success: true }
  }),
})

// Product router
const productRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z
        .object({
          limit: z.number().optional(),
          offset: z.number().optional(),
          search: z.string().optional(),
          category: z.string().optional(),
          risk_level: z.enum(["low", "medium", "high"]).optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const query: any = {}

      if (input?.limit) query.limit = input.limit
      if (input?.offset) query.offset = input.offset

      const filters: any[] = []

      if (input?.search) {
        filters.push({
          _or: [
            { name: { _icontains: input.search } },
            { description: { _icontains: input.search } },
            { hs_code: { _icontains: input.search } },
          ],
        })
      }

      if (input?.category) {
        filters.push({ category: { _eq: input.category } })
      }

      if (input?.risk_level) {
        filters.push({ risk_level: { _eq: input.risk_level } })
      }

      if (filters.length > 0) {
        query.filter = filters.length === 1 ? filters[0] : { _and: filters }
      }

      return await directusService.getProducts(query)
    }),

  get: publicProcedure.input(productIdSchema).query(async ({ input }) => {
    return await directusService.getItem("products", input.id)
  }),

  create: publicProcedure.input(createProductSchema).mutation(async ({ input }) => {
    return await directusService.createItem("products", {
      ...input,
      created_at: new Date().toISOString(),
    })
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: updateProductSchema,
      }),
    )
    .mutation(async ({ input }) => {
      return await directusService.updateItem("products", input.id, input.data)
    }),

  delete: publicProcedure.input(productIdSchema).mutation(async ({ input }) => {
    await directusService.deleteItem("products", input.id)
    return { success: true }
  }),
})

// Supplier router
const supplierRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z
        .object({
          limit: z.number().optional(),
          offset: z.number().optional(),
          search: z.string().optional(),
          verification_status: z.enum(["verified", "pending", "rejected"]).optional(),
          risk_level: z.enum(["low", "medium", "high"]).optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const query: any = {}

      if (input?.limit) query.limit = input.limit
      if (input?.offset) query.offset = input.offset

      const filters: any[] = []

      if (input?.search) {
        filters.push({
          _or: [
            { name: { _icontains: input.search } },
            { company_registration: { _icontains: input.search } },
            { email: { _icontains: input.search } },
          ],
        })
      }

      if (input?.verification_status) {
        filters.push({ verification_status: { _eq: input.verification_status } })
      }

      if (input?.risk_level) {
        filters.push({ risk_level: { _eq: input.risk_level } })
      }

      if (filters.length > 0) {
        query.filter = filters.length === 1 ? filters[0] : { _and: filters }
      }

      return await directusService.getSuppliers(query)
    }),

  get: publicProcedure.input(supplierIdSchema).query(async ({ input }) => {
    return await directusService.getItem("suppliers", input.id)
  }),

  create: publicProcedure.input(createSupplierSchema).mutation(async ({ input }) => {
    return await directusService.createItem("suppliers", {
      ...input,
      created_at: new Date().toISOString(),
    })
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: updateSupplierSchema,
      }),
    )
    .mutation(async ({ input }) => {
      return await directusService.updateItem("suppliers", input.id, input.data)
    }),

  delete: publicProcedure.input(supplierIdSchema).mutation(async ({ input }) => {
    await directusService.deleteItem("suppliers", input.id)
    return { success: true }
  }),
})

// Risk Assessment router
const riskAssessmentRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z
        .object({
          limit: z.number().optional(),
          offset: z.number().optional(),
          search: z.string().optional(),
          status: z.enum(["draft", "completed", "approved", "rejected"]).optional(),
          risk_level: z.enum(["low", "medium", "high"]).optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const query: any = {}

      if (input?.limit) query.limit = input.limit
      if (input?.offset) query.offset = input.offset

      const filters: any[] = []

      if (input?.search) {
        filters.push({
          _or: [{ assessment_name: { _icontains: input.search } }, { assessor_name: { _icontains: input.search } }],
        })
      }

      if (input?.status) {
        filters.push({ status: { _eq: input.status } })
      }

      if (input?.risk_level) {
        filters.push({ deforestation_risk: { _eq: input.risk_level } })
      }

      if (filters.length > 0) {
        query.filter = filters.length === 1 ? filters[0] : { _and: filters }
      }

      return await directusService.getRiskAssessments(query)
    }),

  get: publicProcedure.input(riskAssessmentIdSchema).query(async ({ input }) => {
    return await directusService.getItem("risk_assessments", input.id)
  }),

  create: publicProcedure.input(createRiskAssessmentSchema).mutation(async ({ input }) => {
    return await directusService.createItem("risk_assessments", {
      ...input,
      created_at: new Date().toISOString(),
    })
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: updateRiskAssessmentSchema,
      }),
    )
    .mutation(async ({ input }) => {
      return await directusService.updateItem("risk_assessments", input.id, input.data)
    }),

  delete: publicProcedure.input(riskAssessmentIdSchema).mutation(async ({ input }) => {
    await directusService.deleteItem("risk_assessments", input.id)
    return { success: true }
  }),
})

// Due Diligence Statement router
const dueDiligenceStatementRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z
        .object({
          limit: z.number().optional(),
          offset: z.number().optional(),
          search: z.string().optional(),
          status: z.enum(["draft", "submitted", "approved", "rejected"]).optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const query: any = {}

      if (input?.limit) query.limit = input.limit
      if (input?.offset) query.offset = input.offset

      const filters: any[] = []

      if (input?.search) {
        filters.push({
          _or: [{ statement_number: { _icontains: input.search } }, { company_name: { _icontains: input.search } }],
        })
      }

      if (input?.status) {
        filters.push({ status: { _eq: input.status } })
      }

      if (filters.length > 0) {
        query.filter = filters.length === 1 ? filters[0] : { _and: filters }
      }

      return await directusService.getDueDiligenceStatements(query)
    }),

  get: publicProcedure.input(dueDiligenceStatementIdSchema).query(async ({ input }) => {
    return await directusService.getItem("due_diligence_statements", input.id)
  }),

  create: publicProcedure.input(createDueDiligenceStatementSchema).mutation(async ({ input }) => {
    return await directusService.createItem("due_diligence_statements", {
      ...input,
      created_at: new Date().toISOString(),
    })
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: updateDueDiligenceStatementSchema,
      }),
    )
    .mutation(async ({ input }) => {
      return await directusService.updateItem("due_diligence_statements", input.id, input.data)
    }),

  delete: publicProcedure.input(dueDiligenceStatementIdSchema).mutation(async ({ input }) => {
    await directusService.deleteItem("due_diligence_statements", input.id)
    return { success: true }
  }),

  submit: publicProcedure.input(dueDiligenceStatementIdSchema).mutation(async ({ input }) => {
    return await directusService.updateItem("due_diligence_statements", input.id, {
      status: "submitted",
      submission_date: new Date().toISOString().split("T")[0],
    })
  }),
})

// Raw Material router
const rawMaterialRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z
        .object({
          limit: z.number().optional(),
          offset: z.number().optional(),
          search: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const query: any = {}

      if (input?.limit) query.limit = input.limit
      if (input?.offset) query.offset = input.offset
      if (input?.search) {
        query.filter = {
          _or: [
            { name: { _icontains: input.search } },
            { type: { _icontains: input.search } },
            { origin_location: { _icontains: input.search } },
          ],
        }
      }

      return await directusService.getRawMaterials(query)
    }),

  get: publicProcedure.input(rawMaterialIdSchema).query(async ({ input }) => {
    return await directusService.getItem("raw_materials", input.id)
  }),

  create: publicProcedure.input(createRawMaterialSchema).mutation(async ({ input }) => {
    return await directusService.createItem("raw_materials", {
      ...input,
      created_at: new Date().toISOString(),
    })
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: updateRawMaterialSchema,
      }),
    )
    .mutation(async ({ input }) => {
      return await directusService.updateItem("raw_materials", input.id, input.data)
    }),

  delete: publicProcedure.input(rawMaterialIdSchema).mutation(async ({ input }) => {
    await directusService.deleteItem("raw_materials", input.id)
    return { success: true }
  }),
})

// Origin router
const originRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z
        .object({
          limit: z.number().optional(),
          offset: z.number().optional(),
          search: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const query: any = {}

      if (input?.limit) query.limit = input.limit
      if (input?.offset) query.offset = input.offset
      if (input?.search) {
        query.filter = {
          _or: [
            { location_name: { _icontains: input.search } },
            { country: { _icontains: input.search } },
            { region: { _icontains: input.search } },
          ],
        }
      }

      return await directusService.getOrigins(query)
    }),

  get: publicProcedure.input(originIdSchema).query(async ({ input }) => {
    return await directusService.getItem("origins", input.id)
  }),

  create: publicProcedure.input(createOriginSchema).mutation(async ({ input }) => {
    return await directusService.createItem("origins", {
      ...input,
      created_at: new Date().toISOString(),
    })
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: updateOriginSchema,
      }),
    )
    .mutation(async ({ input }) => {
      return await directusService.updateItem("origins", input.id, input.data)
    }),

  delete: publicProcedure.input(originIdSchema).mutation(async ({ input }) => {
    await directusService.deleteItem("origins", input.id)
    return { success: true }
  }),
})

// Create the main tRPC router
export const appRouter = createTRPCRouter({
  organization: organizationRouter,
  customer: customerRouter,
  product: productRouter,
  supplier: supplierRouter,
  riskAssessment: riskAssessmentRouter,
  dueDiligenceStatement: dueDiligenceStatementRouter,
  rawMaterial: rawMaterialRouter,
  origin: originRouter,
})

export type AppRouter = typeof appRouter
