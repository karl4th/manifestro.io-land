import type { UserResponse } from './types'

// Auth utilities for client-side state management
export const authUtils = {
  // Check if user is authenticated (client-side check)
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('isAuthenticated') === 'true'
  },

  // Get stored user data
  getUser(): UserResponse | null {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  // Store authentication state
  setAuth(user: UserResponse): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('isAuthenticated', 'true')
  },

  // Clear authentication state
  clearAuth(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
  },

  // Get user display name
  getDisplayName(): string {
    const user = this.getUser()
    if (!user) return ''
    return `${user.first_name} ${user.last_name}`.trim()
  }
}

// For Next.js middleware or server-side checks
export const serverAuth = {
  // Note: Actual JWT validation happens on server side via cookies
  // This is just for client-side state management
}
