// Authentication types
export interface User {
  id: string
  email: string
  name?: string
  image?: string
  role?: string
  created_at: string
  updated_at?: string
}

export interface Session {
  user: User
  expires: string
  accessToken?: string
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
  expiresIn: number
}
