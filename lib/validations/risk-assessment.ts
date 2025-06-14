import { z } from "zod"

const riskLevelEnum = z.enum(["low", "medium", "high"])
const legalComplianceEnum = z.enum(["compliant", "non_compliant", "under_review"])
const assessmentStatusEnum = z.enum(["draft", "completed", "approved", "rejected"])

export const createRiskAssessmentSchema = z.object({
  assessment_name: z
    .string()
    .min(1, "Assessment name is required")
    .max(200, "Assessment name must be less than 200 characters"),
  product_id: z.string().uuid("Invalid product ID"),
  supplier_id: z.string().uuid("Invalid supplier ID"),
  origin_id: z.string().uuid("Invalid origin ID"),
  assessment_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  assessor_name: z
    .string()
    .min(1, "Assessor name is required")
    .max(100, "Assessor name must be less than 100 characters"),
  overall_risk_score: z.number().min(0, "Risk score must be at least 0").max(100, "Risk score must be at most 100"),
  deforestation_risk: riskLevelEnum,
  legal_compliance: legalComplianceEnum,
  environmental_impact: z
    .number()
    .min(0, "Environmental impact must be at least 0")
    .max(10, "Environmental impact must be at most 10"),
  social_impact: z.number().min(0, "Social impact must be at least 0").max(10, "Social impact must be at most 10"),
  mitigation_measures: z.string().max(2000, "Mitigation measures must be less than 2000 characters").optional(),
  follow_up_required: z.boolean(),
  next_review_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .optional(),
  status: assessmentStatusEnum,
})

export const updateRiskAssessmentSchema = createRiskAssessmentSchema.partial()

export const riskAssessmentIdSchema = z.object({
  id: z.string().uuid("Invalid risk assessment ID"),
})

export type CreateRiskAssessmentInput = z.infer<typeof createRiskAssessmentSchema>
export type UpdateRiskAssessmentInput = z.infer<typeof updateRiskAssessmentSchema>
export type RiskAssessmentIdInput = z.infer<typeof riskAssessmentIdSchema>
