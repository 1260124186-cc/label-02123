import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { Interview, FilterParams, PaginatedResponse } from '@/types/interview'
import { getInterviews, getInterviewById, getCompanies, getPositions, addInterview as apiAddInterview } from '@/api/interview'
import { logger } from '@/utils/logger'

export const useInterviewStore = defineStore('interview', () => {
  const interviews = ref<Interview[]>([])
  const currentInterview = ref<Interview | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    page: 1,
    pageSize: 5,
    total: 0,
    totalPages: 0
  })
  const filters = ref<FilterParams>({})
  const companies = ref<string[]>([])
  const positions = ref<string[]>([])

  const hasData = computed(() => interviews.value.length > 0)
  const hasError = computed(() => error.value !== null)

  function handleError(err: unknown, message: string) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    error.value = message
    logger.error('Store', message, { error: errorMsg })
    ElMessage.error(message)
  }

  function clearError() {
    error.value = null
  }

  async function fetchInterviews() {
    loading.value = true
    clearError()
    try {
      const response: PaginatedResponse<Interview> = await getInterviews(
        { page: pagination.value.page, pageSize: pagination.value.pageSize },
        filters.value
      )
      interviews.value = response.data
      pagination.value.total = response.total
      pagination.value.totalPages = response.totalPages
    } catch (err) {
      handleError(err, '获取面经列表失败，请稍后重试')
      interviews.value = []
    } finally {
      loading.value = false
    }
  }

  async function fetchInterviewDetail(id: number) {
    loading.value = true
    clearError()
    try {
      currentInterview.value = await getInterviewById(id)
      if (!currentInterview.value) {
        handleError(new Error('Not found'), '面经不存在或已被删除')
      }
    } catch (err) {
      handleError(err, '获取面经详情失败，请稍后重试')
      currentInterview.value = null
    } finally {
      loading.value = false
    }
  }

  async function fetchCompanies() {
    try {
      companies.value = await getCompanies()
    } catch (err) {
      logger.warn('Store', '获取公司列表失败', err)
      companies.value = []
    }
  }

  async function fetchPositions() {
    try {
      positions.value = await getPositions()
    } catch (err) {
      logger.warn('Store', '获取职位列表失败', err)
      positions.value = []
    }
  }

  async function addInterview(data: Omit<Interview, 'id'>) {
    loading.value = true
    clearError()
    try {
      await apiAddInterview(data)
      await fetchInterviews()
      await fetchCompanies()
      await fetchPositions()
      return true
    } catch (err) {
      handleError(err, '新增面经失败，请稍后重试')
      return false
    } finally {
      loading.value = false
    }
  }

  function setPage(page: number) {
    pagination.value.page = page
    fetchInterviews()
  }

  function setFilters(newFilters: FilterParams) {
    filters.value = newFilters
    pagination.value.page = 1
    fetchInterviews()
  }

  function resetFilters() {
    filters.value = {}
    pagination.value.page = 1
    fetchInterviews()
  }

  return {
    interviews,
    currentInterview,
    loading,
    error,
    pagination,
    filters,
    companies,
    positions,
    hasData,
    hasError,
    clearError,
    fetchInterviews,
    fetchInterviewDetail,
    fetchCompanies,
    fetchPositions,
    addInterview,
    setPage,
    setFilters,
    resetFilters
  }
})
