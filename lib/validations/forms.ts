import { z } from "zod"

// Customer validation schema
export const customerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  address: z.string().min(10, "Address must be at least 10 characters"),
})

// Organization validation schema
export const organizationSchema = z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters"),
  registration_number: z.string().min(5, "Registration number must be at least 5 characters"),
  contact_person: z.string().min(2, "Contact person name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().min(10, "Address must be at least 10 characters"),
})

// Origin validation schema
export const originSchema = z.object({
  location_name: z.string().min(2, "Location name must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  region: z.string().min(2, "Region must be at least 2 characters"),
  coordinates: z.string().regex(/^-?\d+\.?\d*,-?\d+\.?\d*$/, "Invalid coordinates format (lat,lng)"),
  land_use_type: z.enum(["forest", "agricultural", "plantation", "mixed", "grassland", "wetland"]),
  forest_coverage: z.number().min(0).max(100),
  deforestation_risk: z.enum(["low", "medium", "high"]),
  land_ownership: z.enum(["private", "public", "community", "indigenous", "mixed"]),
  monitoring_system: z.string().min(2, "Monitoring system must be specified"),
  last_verification_date: z.string().min(1, "Verification date is required"),
  protected_area: z.boolean(),
  indigenous_territory: z.boolean(),
  satellite_data_available: z.boolean(),
})

// Product validation schema
export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  sku: z.string().min(3, "SKU must be at least 3 characters"),
  category: z.enum(["wood", "palm_oil", "soy", "coffee", "cocoa", "rubber", "cattle"]),
  description: z.string().optional(),
  weight: z.number().min(0.01, "Weight must be greater than 0"),
  weight_unit: z.enum(["kg", "g", "tons", "lbs"]),
  origin_country: z.string().min(2, "Origin country must be specified"),
  harvest_date: z.string().min(1, "Harvest date is required"),
  certification: z.string().optional(),
  eudr_compliant: z.boolean(),
})

// Raw Material validation schema
export const rawMaterialSchema = z.object({
  name: z.string().min(2, "Material name must be at least 2 characters"),
  type: z.enum(["wood", "palm_oil", "soy", "coffee", "cocoa", "rubber", "cattle"]),
  description: z.string().optional(),
  quantity: z.number().min(0.01, "Quantity must be greater than 0"),
  unit: z.enum(["kg", "tons", "m3", "liters"]),
  origin_country: z.string().min(2, "Origin country must be specified"),
  harvest_date: z.string().min(1, "Harvest date is required"),
  risk_level: z.enum(["low", "medium", "high"]),
  sustainability_certificate: z.boolean(),
})

// Risk Assessment validation schema
export const riskAssessmentSchema = z.object({
  assessment_name: z.string().min(2, "Assessment name must be at least 2 characters"),
  assessment_date: z.string().min(1, "Assessment date is required"),
  risk_category: z.enum([
    "deforestation",
    "human_rights",
    "environmental",
    "supply_chain",
    "compliance",
    "operational",
  ]),
  risk_level: z.enum(["low", "medium", "high"]),
  overall_risk_score: z.number().min(1).max(100),
  assessor_name: z.string().min(2, "Assessor name must be at least 2 characters"),
  findings: z.string().min(10, "Findings must be at least 10 characters"),
  mitigation_measures: z.string().optional(),
  status: z.enum(["pending", "in_progress", "completed", "requires_action"]),
  follow_up_date: z.string().optional(),
})

// Supplier validation schema
export const supplierSchema = z.object({
  name: z.string().min(2, "Supplier name must be at least 2 characters"),
  contact_person: z.string().min(2, "Contact person name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  country: z.string().min(2, "Country must be specified"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  supplier_type: z.enum(["primary", "secondary", "premium", "standard"]),
  products_supplied: z.string().min(5, "Products supplied must be specified"),
  verification_status: z.enum(["pending", "in_progress", "verified", "rejected"]),
  certification: z.string().optional(),
})

// Due Diligence validation schema
export const dueDiligenceSchema = z.object({
  reference_number: z.string().min(5, "Reference number must be at least 5 characters"),
  product_category: z.enum(["wood", "palm_oil", "soy", "coffee", "cocoa", "rubber", "cattle"]),
  supplier_name: z.string().min(2, "Supplier name must be specified"),
  origin_country: z.string().min(2, "Origin country must be specified"),
  risk_assessment: z.enum(["low", "medium", "high"]),
  compliance_status: z.enum(["compliant", "non_compliant", "pending"]),
  documentation_complete: z.boolean(),
  verification_date: z.string().min(1, "Verification date is required"),
  notes: z.string().optional(),
})

// Export types
export type CustomerFormData = z.infer<typeof customerSchema>
export type OrganizationFormData = z.infer<typeof organizationSchema>
export type OriginFormData = z.infer<typeof originSchema>
export type ProductFormData = z.infer<typeof productSchema>
export type RawMaterialFormData = z.infer<typeof rawMaterialSchema>
export type RiskAssessmentFormData = z.infer<typeof riskAssessmentSchema>
export type SupplierFormData = z.infer<typeof supplierSchema>
export type DueDiligenceFormData = z.infer<typeof dueDiligenceSchema>
