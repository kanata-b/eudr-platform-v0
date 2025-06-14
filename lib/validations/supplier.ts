import { z } from "zod"

const businessTypeEnum = z.enum(["producer", "processor", "trader", "manufacturer", "distributor"])
const verificationStatusEnum = z.enum(["verified", "pending", "rejected"])
const riskLevelEnum = z.enum(["low", "medium", "high"])

export const createSupplierSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  company_registration: z
    .string()
    .min(1, "Company registration is required")
    .max(50, "Company registration must be less than 50 characters"),
  address: z.string().min(1, "Address is required").max(500, "Address must be less than 500 characters"),
  country: z.string().min(1, "Country is required").max(100, "Country must be less than 100 characters"),
  contact_person: z
    .string()
    .min(1, "Contact person is required")
    .max(100, "Contact person must be less than 100 characters"),
  email: z.string().email("Invalid email format"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^[+]?[1-9][\d]{0,15}$/, "Invalid phone format"),
  business_type: businessTypeEnum,
  verification_status: verificationStatusEnum,
  certifications: z.string().max(500, "Certifications must be less than 500 characters").optional(),
  risk_level: riskLevelEnum,
  last_audit_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .optional(),
})

export const updateSupplierSchema = createSupplierSchema.partial()

export const supplierIdSchema = z.object({
  id: z.string().uuid("Invalid supplier ID"),
})

export type CreateSupplierInput = z.infer<typeof createSupplierSchema>
export type UpdateSupplierInput = z.infer<typeof updateSupplierSchema>
export type SupplierIdInput = z.infer<typeof supplierIdSchema>
