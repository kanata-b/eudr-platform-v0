import { z } from "zod"

const statementStatusEnum = z.enum(["draft", "submitted", "approved", "rejected"])
const volumeUnitEnum = z.enum(["kg", "tons", "m3", "liters"])

export const createDueDiligenceStatementSchema = z.object({
  statement_number: z
    .string()
    .min(1, "Statement number is required")
    .max(50, "Statement number must be less than 50 characters"),
  company_name: z.string().min(1, "Company name is required").max(200, "Company name must be less than 200 characters"),
  reporting_period_start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  reporting_period_end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  product_categories: z
    .string()
    .min(1, "Product categories are required")
    .max(500, "Product categories must be less than 500 characters"),
  total_volume: z.number().min(0, "Total volume must be at least 0"),
  volume_unit: volumeUnitEnum,
  countries_of_origin: z
    .string()
    .min(1, "Countries of origin are required")
    .max(500, "Countries of origin must be less than 500 characters"),
  risk_assessment_completed: z.boolean(),
  mitigation_measures: z.string().max(2000, "Mitigation measures must be less than 2000 characters").optional(),
  monitoring_system: z
    .string()
    .min(1, "Monitoring system is required")
    .max(500, "Monitoring system must be less than 500 characters"),
  third_party_verification: z.boolean(),
  declaration_text: z
    .string()
    .min(1, "Declaration text is required")
    .max(5000, "Declaration text must be less than 5000 characters"),
  signatory_name: z
    .string()
    .min(1, "Signatory name is required")
    .max(100, "Signatory name must be less than 100 characters"),
  signatory_position: z
    .string()
    .min(1, "Signatory position is required")
    .max(100, "Signatory position must be less than 100 characters"),
  signature_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  status: statementStatusEnum,
  submission_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .optional(),
})

export const updateDueDiligenceStatementSchema = createDueDiligenceStatementSchema.partial()

export const dueDiligenceStatementIdSchema = z.object({
  id: z.string().uuid("Invalid due diligence statement ID"),
})

export type CreateDueDiligenceStatementInput = z.infer<typeof createDueDiligenceStatementSchema>
export type UpdateDueDiligenceStatementInput = z.infer<typeof updateDueDiligenceStatementSchema>
export type DueDiligenceStatementIdInput = z.infer<typeof dueDiligenceStatementIdSchema>
