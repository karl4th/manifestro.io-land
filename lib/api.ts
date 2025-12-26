const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  status: number
}

// TypeScript interfaces based on OpenAPI schemas
export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  position: string
  created_at: string
  updated_at: string
}

export interface UserCreate {
  email: string
  first_name: string
  last_name: string
  position: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  message?: string
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  author: {
    first_name: string
    last_name: string
    position: string
  }
  category: {
    name: string
  }
  tags: Array<{
    name: string
  }>
  created_at: string
  updated_at: string
  views?: number
}

export interface ArticleCreate {
  title: string
  slug: string
  excerpt: string
  content: string
  category_id: string
  tag_ids?: string[]
}

export interface ArticleList {
  articles: Article[]
  total: number
  page: number
  per_page: number
  pages: number
}

export interface Category {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export interface CategoryCreate {
  name: string
}

export interface CategoryList {
  items: Category[]
  total: number
}

export interface Tag {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export interface TagCreate {
  name: string
}

export interface TagList {
  items: Tag[]
  total: number
}

export interface WaitlistEntry {
  id: string
  email: string
  status: string
  queue_position: number
  created_at: string
  ip_address?: string
  user_agent?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export interface WaitlistCreate {
  email: string
  ip_address?: string
  user_agent?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export interface WaitlistResponse {
  success: boolean
  message: string
  waitlist_entry: WaitlistEntry
  email_sent: boolean
  email_result: {
    success: boolean
    email_id: string
    message: string
  }
}

export interface WaitlistStatusUpdate {
  status: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  per_page: number
  pages: number
  has_next: boolean
  has_prev: boolean
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`
      
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: 'include', // Important for cookies
        ...options,
      }

      const response = await fetch(url, config)
      const status = response.status

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type')
      if (!contentType?.includes('application/json')) {
        return {
          status,
          error: response.statusText || 'Request failed',
        }
      }

      // Try to parse JSON response
      let data
      try {
        data = await response.json()
      } catch {
        data = null
      }

      // Handle error responses
      if (!response.ok) {
        return {
          status,
          error: data?.detail || data?.message || response.statusText || 'Request failed',
          data,
        }
      }

      return {
        status,
        data,
      }
    } catch (error) {
      return {
        status: 0,
        error: error instanceof Error ? error.message : 'Network error',
      }
    }
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    })
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }
}

export const apiClient = new ApiClient()

// Auth specific methods
export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse<LoginResponse>> => {
    return apiClient.post<LoginResponse>('/api/v1/auth/login', { email, password })
  },
  
  register: async (userData: UserCreate): Promise<ApiResponse<LoginResponse>> => {
    return apiClient.post<LoginResponse>('/api/v1/auth/register', userData)
  },
  
  logout: async (): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.post('/api/v1/auth/logout')
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    return apiClient.get<User>('/api/v1/auth/me')
  }
}

// Articles API
export const articlesApi = {
  getArticles: async (page: number = 1, perPage: number = 10, status?: 'published' | 'draft'): Promise<ApiResponse<ArticleList>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
    })
    if (status) {
      params.append('status', status)
    }
    return apiClient.get<ArticleList>(`/api/v1/public/articles?${params}`)
  },

  getArticle: async (id: string): Promise<ApiResponse<Article>> => {
    return apiClient.get<Article>(`/api/v1/public/articles/${id}`)
  },

  getArticleBySlug: async (slug: string): Promise<ApiResponse<Article>> => {
    return apiClient.get<Article>(`/api/v1/public/articles/${slug}`)
  },

  createArticle: async (article: ArticleCreate): Promise<ApiResponse<Article>> => {
    return apiClient.post<Article>('/api/v1/articles', article)
  },

  updateArticle: async (id: string, article: Partial<ArticleCreate>): Promise<ApiResponse<Article>> => {
    return apiClient.put<Article>(`/api/v1/articles/${id}`, article)
  },

  deleteArticle: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/api/v1/articles/${id}`)
  }
}

// Categories API
export const categoriesApi = {
  getCategories: async (): Promise<ApiResponse<CategoryList>> => {
    return apiClient.get<CategoryList>('/api/v1/categories')
  },

  createCategory: async (category: CategoryCreate): Promise<ApiResponse<Category>> => {
    return apiClient.post<Category>('/api/v1/categories', category)
  },

  updateCategory: async (id: string, category: CategoryCreate): Promise<ApiResponse<Category>> => {
    return apiClient.put<Category>(`/api/v1/categories/${id}`, category)
  },

  deleteCategory: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/api/v1/categories/${id}`)
  }
}

// Tags API
export const tagsApi = {
  getTags: async (): Promise<ApiResponse<TagList>> => {
    return apiClient.get<TagList>('/api/v1/tags')
  },

  createTag: async (tag: TagCreate): Promise<ApiResponse<Tag>> => {
    return apiClient.post<Tag>('/api/v1/tags', tag)
  },

  updateTag: async (id: string, tag: TagCreate): Promise<ApiResponse<Tag>> => {
    return apiClient.put<Tag>(`/api/v1/tags/${id}`, tag)
  },

  deleteTag: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/api/v1/tags/${id}`)
  }
}

// Waitlist API
export const waitlistApi = {
  join: async (data: WaitlistCreate, sendEmail: boolean = true): Promise<ApiResponse<WaitlistResponse>> => {
    const params = new URLSearchParams({
      send_email: sendEmail.toString()
    })
    return apiClient.post<WaitlistResponse>(`/api/v1/public/waitlist/join?${params}`, data)
  },

  getWaitlistEntries: async (page: number = 1, limit: number = 50): Promise<ApiResponse<PaginatedResponse<WaitlistEntry>>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    return apiClient.get<PaginatedResponse<WaitlistEntry>>(`/api/v1/waitlist/admin/list?${params}`)
  },

  updateWaitlistStatus: async (email: string, status: string): Promise<ApiResponse<{ success: boolean; message: string }>> => {
    return apiClient.patch(`/api/v1/waitlist/admin/${encodeURIComponent(email)}/status`, { status })
  }
}

// General API
export const generalApi = {
  healthCheck: async (): Promise<ApiResponse<{ status: string; timestamp: string; version: string; uptime?: number }>> => {
    return apiClient.get('/health')
  },

  getApiInfo: async (): Promise<ApiResponse<any>> => {
    return apiClient.get('/')
  }
}
