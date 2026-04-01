/**
 * 日志工具 - 用于记录系统日志
 * 生产环境可对接日志收集服务
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  timestamp: string
  level: LogLevel
  module: string
  message: string
  data?: unknown
}

const LOG_PREFIX = '[Interview-Blog]'

function formatTimestamp(): string {
  return new Date().toISOString()
}

function createLogEntry(level: LogLevel, module: string, message: string, data?: unknown): LogEntry {
  return {
    timestamp: formatTimestamp(),
    level,
    module,
    message,
    data
  }
}

function formatLog(entry: LogEntry): string {
  const dataStr = entry.data ? ` | Data: ${JSON.stringify(entry.data)}` : ''
  return `${LOG_PREFIX} [${entry.timestamp}] [${entry.level.toUpperCase()}] [${entry.module}] ${entry.message}${dataStr}`
}

const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost'

export const logger = {
  debug(module: string, message: string, data?: unknown) {
    if (isDev) {
      const entry = createLogEntry('debug', module, message, data)
      console.debug(formatLog(entry))
    }
  },

  info(module: string, message: string, data?: unknown) {
    const entry = createLogEntry('info', module, message, data)
    console.info(formatLog(entry))
  },

  warn(module: string, message: string, data?: unknown) {
    const entry = createLogEntry('warn', module, message, data)
    console.warn(formatLog(entry))
  },

  error(module: string, message: string, data?: unknown) {
    const entry = createLogEntry('error', module, message, data)
    console.error(formatLog(entry))
    // 生产环境可在此处上报错误到监控服务
  },

  // API 请求日志
  api(action: string, url: string, data?: unknown) {
    this.info('API', `${action}: ${url}`, data)
  },

  // 用户操作日志
  action(action: string, details?: unknown) {
    this.info('UserAction', action, details)
  }
}

export default logger
