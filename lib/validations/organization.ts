import { z } from "zod"

export const createOrganizationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  address: z.string().min(1, "Address is required").max(500, "Address must be less than 500 characters"),
  contact_person: z
    .string()
    .min(1, "Contact person is required")
    .max(100, "Contact person must be less than 100 characters"),
  email: z.string().email("Invalid email format"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^[+]?[1-9][\d]{0,15}$/, "Invalid phone format"),
  registration_number: z
    .string()
    .min(1, "Registration number is required")
    .max(50, "Registration number must be less than 50 characters"),
})

export const updateOrganizationSchema = createOrganizationSchema.partial()

export const organizationIdSchema = z.object({
  id: z.string().uuid("Invalid organization ID"),
})

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>
export type UpdateOrganizationInput = z.infer<typeof updateOrganizationSchema>
export type OrganizationIdInput = z.infer<typeof organizationIdSchema>
