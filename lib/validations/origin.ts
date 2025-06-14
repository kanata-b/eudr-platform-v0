import { z } from "zod"

const landUseTypeEnum = z.enum(["forest", "agricultural", "plantation", "mixed", "grassland", "wetland"])
const landOwnershipEnum = z.enum(["private", "public", "community", "indigenous", "mixed"])
const riskLevelEnum = z.enum(["low", "medium", "high"])

export const createOriginSchema = z.object({
  location_name: z
    .string()
    .min(1, "Location name is required")
    .max(200, "Location name must be less than 200 characters"),
  country: z.string().min(1, "Country is required").max(100, "Country must be less than 100 characters"),
  region: z.string().min(1, "Region is required").max(100, "Region must be less than 100 characters"),
  coordinates: z.string().min(1, "Coordinates are required").max(50, "Coordinates must be less than 50 characters"),
  land_use_type: landUseTypeEnum,
  forest_coverage: z
    .number()
    .min(0, "Forest coverage must be at least 0")
    .max(100, "Forest coverage must be at most 100"),
  deforestation_risk: riskLevelEnum,
  protected_area: z.boolean(),
  indigenous_territory: z.boolean(),
  land_ownership: landOwnershipEnum,
  monitoring_system: z
    .string()
    .min(1, "Monitoring system is required")
    .max(500, "Monitoring system must be less than 500 characters"),
  satellite_data_available: z.boolean(),
  last_verification_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
})

export const updateOriginSchema = createOriginSchema.partial()

export const originIdSchema = z.object({
  id: z.string().uuid("Invalid origin ID"),
})

export type CreateOriginInput = z.infer<typeof createOriginSchema>
export type UpdateOriginInput = z.infer<typeof updateOriginSchema>
export type OriginIdInput = z.infer<typeof originIdSchema>
