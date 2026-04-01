export interface Interview {
  id: number
  company: string
  position: string
  date: string
  result: 'pending' | 'passed' | 'failed'
  difficulty: 'easy' | 'medium' | 'hard'
  questions: Question[]
  summary: string
  tags: string[]
}

export interface Question {
  id: number
  content: string
  answer: string
  category: string
}

export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface FilterParams {
  company?: string
  position?: string
  result?: Interview['result']
  difficulty?: Interview['difficulty']
}
