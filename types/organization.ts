// Organization types
import type { FilterOptions } from "./api"

export interface Organization {
  id: string
  name: string
  address: string
  contact_person: string
  email: string
  phone: string
  registration_number: string
  created_at: string
  updated_at?: string
}

export interface CreateOrganizationData {
  name: string
  address: string
  contact_person: string
  email: string
  phone: string
  registration_number: string
}

export interface UpdateOrganizationData extends Partial<CreateOrganizationData> {}

export interface OrganizationFilters extends FilterOptions {
  registration_number?: string
  country?: string
}
