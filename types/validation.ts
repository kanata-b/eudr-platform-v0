// Validation types
export interface ValidationRule {
  type: "required" | "email" | "min" | "max" | "pattern" | "custom"
  value?: any
  message: string
}

export interface ValidationError {
  field: string
  message: string
  code: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  data?: any
}

export interface ValidationSchema {
  [key: string]: ValidationRule[]
}

export interface ValidationContext {
  data: Record<string, any>
  field: string
  value: any
}

export type ValidatorFunction = (value: any, context: ValidationContext) => boolean | string

export interface CustomValidator {
  name: string
  validator: ValidatorFunction
  message: string
}
