import { mockInterviews, persistInterviews } from '@/mock/interviews'
import { logger } from '@/utils/logger'
import type {
  Interview,
  PaginationParams,
  PaginatedResponse,
  FilterParams
} from '@/types/interview'

// 模拟网络延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function getInterviews(
  pagination: PaginationParams,
  filters?: FilterParams
): Promise<PaginatedResponse<Interview>> {
  logger.api('GET', '/api/interviews', { pagination, filters })
  await delay(300)

  let filteredData = [...mockInterviews]

  if (filters?.company) {
    filteredData = filteredData.filter(item =>
      item.company.includes(filters.company!)
    )
  }

  if (filters?.position) {
    filteredData = filteredData.filter(item =>
      item.position.includes(filters.position!)
    )
  }

  if (filters?.result) {
    filteredData = filteredData.filter(item =>
      item.result === filters.result
    )
  }

  if (filters?.difficulty) {
    filteredData = filteredData.filter(item =>
      item.difficulty === filters.difficulty
    )
  }

  const total = filteredData.length
  const totalPages = Math.ceil(total / pagination.pageSize)
  const start = (pagination.page - 1) * pagination.pageSize
  const end = start + pagination.pageSize
  const data = filteredData.slice(start, end)

  logger.debug('API', `获取面经列表成功，共 ${total} 条记录`)
  return {
    data,
    total,
    page: pagination.page,
    pageSize: pagination.pageSize,
    totalPages
  }
}

export async function getInterviewById(id: number): Promise<Interview | null> {
  logger.api('GET', `/api/interviews/${id}`)
  await delay(200)
  const interview = mockInterviews.find(item => item.id === id) || null
  if (!interview) {
    logger.warn('API', `面经不存在: id=${id}`)
  }
  return interview
}

export async function getCompanies(): Promise<string[]> {
  logger.api('GET', '/api/companies')
  await delay(100)
  return [...new Set(mockInterviews.map(item => item.company))]
}

export async function getPositions(): Promise<string[]> {
  logger.api('GET', '/api/positions')
  await delay(100)
  return [...new Set(mockInterviews.map(item => item.position))]
}

export async function addInterview(data: Omit<Interview, 'id'>): Promise<Interview> {
  logger.api('POST', '/api/interviews', data)
  await delay(300)
  const newInterview: Interview = {
    ...data,
    id: Date.now()
  }
  mockInterviews.unshift(newInterview)
  // 持久化到 LocalStorage
  persistInterviews()
  logger.info('API', `新增面经成功: ${newInterview.company} - ${newInterview.position}`)
  return newInterview
}
