// Customer types
import type { FilterOptions } from "./api"

export interface Customer {
  id: string
  name: string
  company: string
  address: string
  email: string
  phone: string
  country: string
  created_at: string
  updated_at?: string
}

export interface CreateCustomerData {
  name: string
  company: string
  address: string
  email: string
  phone: string
  country: string
}

export interface UpdateCustomerData extends Partial<CreateCustomerData> {}

export interface CustomerFilters extends FilterOptions {
  country?: string
  company?: string
}
