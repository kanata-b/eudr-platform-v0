import { z } from "zod"

const rawMaterialTypeEnum = z.enum([
  "timber",
  "palm_oil",
  "soy_beans",
  "coffee_beans",
  "cocoa_beans",
  "rubber",
  "cattle",
])
const volumeUnitEnum = z.enum(["kg", "tons", "m3", "liters"])
const riskLevelEnum = z.enum(["low", "medium", "high"])

export const createRawMaterialSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  type: rawMaterialTypeEnum,
  origin_location: z
    .string()
    .min(1, "Origin location is required")
    .max(200, "Origin location must be less than 200 characters"),
  coordinates: z.string().min(1, "Coordinates are required").max(50, "Coordinates must be less than 50 characters"),
  harvest_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  supplier_id: z.string().min(1, "Supplier ID is required"),
  volume: z.number().min(0, "Volume must be at least 0"),
  unit: volumeUnitEnum,
  sustainability_certificate: z.string().max(200, "Certificate must be less than 200 characters").optional(),
  risk_assessment: riskLevelEnum,
})

export const updateRawMaterialSchema = createRawMaterialSchema.partial()

export const rawMaterialIdSchema = z.object({
  id: z.string().uuid("Invalid raw material ID"),
})

export type CreateRawMaterialInput = z.infer<typeof createRawMaterialSchema>
export type UpdateRawMaterialInput = z.infer<typeof updateRawMaterialSchema>
export type RawMaterialIdInput = z.infer<typeof rawMaterialIdSchema>
