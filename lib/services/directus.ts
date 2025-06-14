import {
  createDirectus,
  rest,
  authentication,
  readItems,
  createItem,
  updateItem,
  deleteItem,
  readItem,
  readMe,
} from "@directus/sdk"
import type { DirectusSchema } from "@/types/directus"
import type {
  Organization,
  Customer,
  Product,
  Supplier,
  RawMaterial,
  Origin,
  RiskAssessment,
  DueDiligenceStatement,
} from "@/types"

// Create Directus client with Railway URL
const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://kong-gateway-production.up.railway.app/dmc"

const directus = createDirectus<DirectusSchema>(directusUrl)
  .with(authentication("cookie", { credentials: "omit" }))
  .with(rest({ credentials: "omit" }))

export class DirectusService {
  private client = directus

  // Authentication methods
  async login(email: string, password: string) {
    try {
      console.log("Attempting login to:", directusUrl)
      const result = await this.client.login(email, password)
      console.log("Login successful")
      return result
    } catch (error: any) {
      console.error("Directus login error:", error)

      // Handle specific Railway/Kong gateway errors
      if (error?.status === 502 || error?.status === 503) {
        throw new Error("Directus service temporarily unavailable")
      }

      if (error?.status === 404) {
        throw new Error("Directus endpoint not found - check URL configuration")
      }

      if (error?.errors?.[0]?.message) {
        throw new Error(error.errors[0].message)
      }

      if (error?.message?.includes("CORS")) {
        throw new Error("CORS error - check Directus CORS settings")
      }

      throw new Error("Authentication failed - check credentials")
    }
  }

  async logout() {
    try {
      await this.client.logout()
    } catch (error: any) {
      console.error("Directus logout error:", error)
      // Don't throw error on logout failure - still clear local state
    }
  }

  async refresh() {
    try {
      const result = await this.client.refresh()
      return result
    } catch (error: any) {
      console.error("Directus refresh error:", error)
      throw new Error("Token refresh failed")
    }
  }

  async getCurrentUser() {
    try {
      // Check if we have a valid token first
      const token = await this.getToken()
      if (!token) {
        throw new Error("No authentication token")
      }

      const user = await this.client.request(readMe())
      return user
    } catch (error: any) {
      console.error("Get current user error:", error)

      // If it's a 401 or token-related error, clear the token
      if (error?.status === 401 || error?.code === "UNAUTHORIZED") {
        await this.clearToken()
      }

      throw error // Re-throw the original error
    }
  }

  async getToken() {
    try {
      const token = await this.client.getToken()
      return token
    } catch (error) {
      console.log("No token available")
      return null
    }
  }

  async clearToken() {
    try {
      // Clear the token from storage
      if (typeof window !== "undefined") {
        document.cookie = "directus_session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie = "directus_refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      }
    } catch (error) {
      console.error("Error clearing token:", error)
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getToken()
      if (!token) return false

      // Try to get current user to verify token is valid
      await this.getCurrentUser()
      return true
    } catch (error) {
      return false
    }
  }

  // Generic CRUD operations
  async getItems<T>(collection: keyof DirectusSchema, query?: any): Promise<T[]> {
    try {
      const items = await this.client.request(readItems(collection, query))
      return items as T[]
    } catch (error: any) {
      console.error(`Error fetching ${collection}:`, error)

      // If unauthorized, clear token
      if (error?.status === 401) {
        await this.clearToken()
      }

      throw new Error(`Failed to fetch ${collection}`)
    }
  }

  async getItem<T>(collection: keyof DirectusSchema, id: string, query?: any): Promise<T> {
    try {
      const item = await this.client.request(readItem(collection, id, query))
      return item as T
    } catch (error: any) {
      console.error(`Error fetching ${collection} item:`, error)

      if (error?.status === 401) {
        await this.clearToken()
      }

      throw new Error(`Failed to fetch ${collection} item`)
    }
  }

  async createItem<T>(collection: keyof DirectusSchema, data: Partial<T>): Promise<T> {
    try {
      const item = await this.client.request(createItem(collection, data))
      return item as T
    } catch (error: any) {
      console.error(`Error creating ${collection} item:`, error)

      if (error?.status === 401) {
        await this.clearToken()
      }

      throw new Error(`Failed to create ${collection} item`)
    }
  }

  async updateItem<T>(collection: keyof DirectusSchema, id: string, data: Partial<T>): Promise<T> {
    try {
      const item = await this.client.request(updateItem(collection, id, data))
      return item as T
    } catch (error: any) {
      console.error(`Error updating ${collection} item:`, error)

      if (error?.status === 401) {
        await this.clearToken()
      }

      throw new Error(`Failed to update ${collection} item`)
    }
  }

  async deleteItem(collection: keyof DirectusSchema, id: string): Promise<void> {
    try {
      await this.client.request(deleteItem(collection, id))
    } catch (error: any) {
      console.error(`Error deleting ${collection} item:`, error)

      if (error?.status === 401) {
        await this.clearToken()
      }

      throw new Error(`Failed to delete ${collection} item`)
    }
  }

  // Specific collection methods
  async getOrganizations(query?: any): Promise<Organization[]> {
    return this.getItems<Organization>("organizations", query)
  }

  async getCustomers(query?: any): Promise<Customer[]> {
    return this.getItems<Customer>("customers", query)
  }

  async getProducts(query?: any): Promise<Product[]> {
    return this.getItems<Product>("products", query)
  }

  async getSuppliers(query?: any): Promise<Supplier[]> {
    return this.getItems<Supplier>("suppliers", query)
  }

  async getRawMaterials(query?: any): Promise<RawMaterial[]> {
    return this.getItems<RawMaterial>("raw_materials", query)
  }

  async getOrigins(query?: any): Promise<Origin[]> {
    return this.getItems<Origin>("origins", query)
  }

  async getRiskAssessments(query?: any): Promise<RiskAssessment[]> {
    return this.getItems<RiskAssessment>("risk_assessments", query)
  }

  async getDueDiligenceStatements(query?: any): Promise<DueDiligenceStatement[]> {
    return this.getItems<DueDiligenceStatement>("due_diligence_statements", query)
  }
}

export const directusService = new DirectusService()
