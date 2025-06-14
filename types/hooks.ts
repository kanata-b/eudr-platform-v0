import type React from "react"
// Hook types
export interface UseEntityHookReturn<T, CreateData, UpdateData> {
  // State
  items: T[]
  isLoading: boolean
  error: string | null
  isDialogOpen: boolean
  editingItem: T | null
  formData: CreateData

  // Actions
  loadItems: () => Promise<void>
  handleSubmit: (e: React.FormEvent) => Promise<void>
  handleEdit: (item: T) => void
  handleDelete: (id: string) => Promise<void>
  resetForm: () => void
  openCreateDialog: () => void
  setIsDialogOpen: (open: boolean) => void
  setFormData: (data: CreateData) => void

  // Computed
  isEditing: boolean
}

export interface UseApiHookOptions {
  immediate?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

export interface UseFilterHookReturn<T> {
  filteredItems: T[]
  filters: Record<string, any>
  setFilter: (key: string, value: any) => void
  clearFilters: () => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export interface UsePaginationHookReturn {
  page: number
  limit: number
  offset: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  nextPage: () => void
  previousPage: () => void
  goToFirstPage: () => void
  goToLastPage: () => void
}
