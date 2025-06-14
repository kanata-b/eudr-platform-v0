// Form types
export interface FormState<T> {
  data: T
  errors: Record<keyof T, string>
  isSubmitting: boolean
  isDirty: boolean
  isValid: boolean
}

export interface FormField {
  name: string
  label: string
  type: "text" | "email" | "password" | "number" | "date" | "textarea" | "select" | "checkbox" | "radio"
  placeholder?: string
  required?: boolean
  disabled?: boolean
  options?: SelectOption[]
  validation?: ValidationRule[]
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ValidationRule {
  type: "required" | "email" | "min" | "max" | "pattern" | "custom"
  value?: any
  message: string
}

export interface FormConfig<T> {
  fields: FormField[]
  initialValues: Partial<T>
  validationSchema?: any
  onSubmit: (data: T) => Promise<void>
  onCancel?: () => void
}
