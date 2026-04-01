import { ElMessage } from 'element-plus'

export function useMessage() {
  function success(message: string) {
    ElMessage({
      message,
      type: 'success',
      duration: 2000
    })
  }

  function error(message: string) {
    ElMessage({
      message,
      type: 'error',
      duration: 3000
    })
  }

  function warning(message: string) {
    ElMessage({
      message,
      type: 'warning',
      duration: 2500
    })
  }

  function info(message: string) {
    ElMessage({
      message,
      type: 'info',
      duration: 2000
    })
  }

  return {
    success,
    error,
    warning,
    info
  }
}
