import { z } from "zod"

export const createCustomerSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  company: z.string().min(1, "Company is required").max(100, "Company must be less than 100 characters"),
  address: z.string().min(1, "Address is required").max(500, "Address must be less than 500 characters"),
  email: z.string().email("Invalid email format"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^[+]?[1-9][\d]{0,15}$/, "Invalid phone format"),
  country: z.string().min(1, "Country is required").max(100, "Country must be less than 100 characters"),
})

export const updateCustomerSchema = createCustomerSchema.partial()

export const customerIdSchema = z.object({
  id: z.string().uuid("Invalid customer ID"),
})

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>
export type CustomerIdInput = z.infer<typeof customerIdSchema>
