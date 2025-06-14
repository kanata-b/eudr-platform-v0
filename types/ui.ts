import type React from "react"
// UI Component types
export interface DialogState {
  isOpen: boolean
  mode: "create" | "edit" | "view"
  data?: any
}

export interface TableColumn<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: any, row: T) => React.ReactNode
  width?: string
  align?: "left" | "center" | "right"
}

export interface TableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  loading?: boolean
  pagination?: PaginationProps
  onRowClick?: (row: T) => void
  onEdit?: (row: T) => void
  onDelete?: (id: string) => void
  emptyMessage?: string
}

export interface PaginationProps {
  page: number
  limit: number
  total: number
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
}

export interface FormFieldProps {
  name: string
  label: string
  type?: "text" | "email" | "password" | "number" | "date" | "textarea" | "select"
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  validation?: any
}

export interface BadgeProps {
  variant: "default" | "secondary" | "destructive" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  children: React.ReactNode
}

export interface LoadingState {
  isLoading: boolean
  error?: string | null
  data?: any
}
