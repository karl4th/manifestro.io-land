// User types
export interface UserResponse {
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

// Auth types
export interface Login {
  email: string
  password: string
}

export interface LoginResponse {
  user: UserResponse
  message?: string
}

export interface LogoutResponse {
  message?: string
}

// Error types
export interface DetailedErrorResponse {
  detail: string
  error_code: string
  timestamp: string
  request_id?: string
  validation_errors?: ValidationErrorDetail[]
}

export interface ValidationErrorDetail {
  field: string
  message: string
  code: string
}

export interface ValidationError {
  loc: (string | number)[]
  msg: string
  type: string
}

// API Response wrapper
export interface ApiError {
  detail: string
  error_code: string
  timestamp: string
  request_id?: string
  validation_errors?: ValidationErrorDetail[]
}

// Waitlist types
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
  waitlist_entry: WlResp
  email_sent: boolean
  email_result: EmailResult
}

export interface WlResp {
  id: string
  email: string
  status: string
  queue_position: number
  created_at: string
}

export interface EmailResult {
  success: boolean
  email_id: string
  message: string
}

// Category types
export interface Category {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export interface CategoryCreate {
  name: string
}

export interface CategoryResponse {
  name: string
}

export interface CategoryList {
  items: Category[]
  total: number
}

// Tag types
export interface Tag {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export interface TagCreate {
  name: string
}

export interface TagResponse {
  name: string
}

export interface TagList {
  items: Tag[]
  total: number
}

// Health check
export interface HealthCheckResponse {
  status: string
  timestamp: string
  version: string
  uptime?: number
}

// Article types
export interface ArticleCreate {
  title: string
  slug?: string
  excerpt?: string
  content: string
  category_id?: string
  tag_ids?: string[]
  status?: 'published' | 'draft'
}

export interface ArticleResponse {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  author_id: string
  category_id?: string
  status: 'published' | 'draft'
  created_at: string
  updated_at: string
  published_at?: string
  views: number
  author?: UserResponse
  category?: Category
  tags?: Tag[]
}

export interface ArticleShortResponse {
  id: string
  title: string
  slug: string
  excerpt?: string
  status: 'published' | 'draft'
  created_at: string
  published_at?: string
  view_count: number
  author?: {
    id: string
    first_name: string
    last_name: string
  }
  category?: {
    id: string
    name: string
  }
  tags?: {
    id: string
    name: string
  }[]
}

export interface ArticleList {
  articles: ArticleShortResponse[]
  total: number
  page: number
  per_page: number
  total_pages: number
}
