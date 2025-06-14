import { z } from "zod"

const productCategoryEnum = z.enum(["wood", "palm_oil", "soy", "coffee", "cocoa", "rubber", "cattle"])
const riskLevelEnum = z.enum(["low", "medium", "high"])

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().max(1000, "Description must be less than 1000 characters").optional(),
  category: productCategoryEnum,
  hs_code: z.string().min(1, "HS Code is required").max(20, "HS Code must be less than 20 characters"),
  origin_country: z
    .string()
    .min(1, "Origin country is required")
    .max(100, "Origin country must be less than 100 characters"),
  supplier_id: z.string().uuid("Invalid supplier ID"),
  risk_level: riskLevelEnum,
  certification: z.string().max(200, "Certification must be less than 200 characters").optional(),
})

export const updateProductSchema = createProductSchema.partial()

export const productIdSchema = z.object({
  id: z.string().uuid("Invalid product ID"),
})

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
export type ProductIdInput = z.infer<typeof productIdSchema>
