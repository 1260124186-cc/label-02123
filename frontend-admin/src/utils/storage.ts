/**
 * LocalStorage 持久化存储工具
 */

const STORAGE_KEY = 'interview-blog-data'

import type { Interview } from '@/types/interview'

export interface StorageData {
  interviews: Interview[]
  version: string
}

const CURRENT_VERSION = '1.0.0'

export function saveToStorage(interviews: Interview[]): void {
  try {
    const data: StorageData = {
      interviews,
      version: CURRENT_VERSION
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.warn('保存数据到 LocalStorage 失败:', e)
  }
}

export function loadFromStorage(): Interview[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const data: StorageData = JSON.parse(raw)
    if (data.version !== CURRENT_VERSION) {
      // 版本不匹配，清除旧数据
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return data.interviews
  } catch (e) {
    console.warn('从 LocalStorage 加载数据失败:', e)
    return null
  }
}

export function clearStorage(): void {
  localStorage.removeItem(STORAGE_KEY)
}
