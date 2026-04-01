<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useInterviewStore } from '@/stores/interview'
import { ElMessage } from 'element-plus'
import type { FilterParams, Interview } from '@/types/interview'
import InterviewForm from './InterviewForm.vue'

const store = useInterviewStore()

const localFilters = ref<FilterParams>({
  company: '',
  position: '',
  result: undefined,
  difficulty: undefined
})

const showFormDialog = ref(false)

const resultOptions = [
  { label: '全部状态', value: '' },
  { label: '已通过', value: 'passed' },
  { label: '未通过', value: 'failed' },
  { label: '待定', value: 'pending' }
]

const difficultyOptions = [
  { label: '全部难度', value: '' },
  { label: '简单', value: 'easy' },
  { label: '中等', value: 'medium' },
  { label: '困难', value: 'hard' }
]

onMounted(() => {
  store.fetchCompanies()
  store.fetchPositions()
})

function handleSearch() {
  const filters: FilterParams = {}
  if (localFilters.value.company) filters.company = localFilters.value.company
  if (localFilters.value.position) filters.position = localFilters.value.position
  if (localFilters.value.result) filters.result = localFilters.value.result as FilterParams['result']
  if (localFilters.value.difficulty) filters.difficulty = localFilters.value.difficulty as FilterParams['difficulty']
  store.setFilters(filters)
  ElMessage.success('筛选条件已应用')
}

function handleReset() {
  localFilters.value = {
    company: '',
    position: '',
    result: undefined,
    difficulty: undefined
  }
  store.resetFilters()
  ElMessage.info('筛选条件已重置')
}

function handleAdd() {
  showFormDialog.value = true
}

async function handleFormSubmit(data: Omit<Interview, 'id'>) {
  const success = await store.addInterview(data)
  if (success) {
    ElMessage.success('面经添加成功')
  }
}
</script>

<template>
  <section class="filter-card card" aria-label="筛选条件">
    <header class="filter-header">
      <div class="header-left">
        <el-icon :size="18"><Filter /></el-icon>
        <span>筛选条件</span>
      </div>
      <el-button type="success" @click="handleAdd">
        <el-icon><Plus /></el-icon>
        新增面经
      </el-button>
    </header>
    <div class="filter-body">
      <div class="filter-row">
        <div class="filter-item">
          <label class="filter-label">公司</label>
          <el-select
            v-model="localFilters.company"
            placeholder="选择公司"
            clearable
            filterable
          >
            <el-option
              v-for="company in store.companies"
              :key="company"
              :label="company"
              :value="company"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">职位</label>
          <el-select
            v-model="localFilters.position"
            placeholder="选择职位"
            clearable
            filterable
          >
            <el-option
              v-for="position in store.positions"
              :key="position"
              :label="position"
              :value="position"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">结果</label>
          <el-select
            v-model="localFilters.result"
            placeholder="面试结果"
            clearable
          >
            <el-option
              v-for="option in resultOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">难度</label>
          <el-select
            v-model="localFilters.difficulty"
            placeholder="面试难度"
            clearable
          >
            <el-option
              v-for="option in difficultyOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </div>

        <div class="filter-actions">
          <el-button type="primary" @click="handleSearch" :loading="store.loading">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
          <el-button @click="handleReset" :disabled="store.loading">
            <el-icon><RefreshRight /></el-icon>
            重置
          </el-button>
        </div>
      </div>
    </div>

    <InterviewForm
      v-model:visible="showFormDialog"
      @submit="handleFormSubmit"
    />
  </section>
</template>

<style scoped>
.filter-card {
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-light);
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
}

.header-left .el-icon {
  color: var(--primary-color);
}

.filter-body {
  background: var(--bg-color);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
}

.filter-row {
  display: flex;
  align-items: flex-end;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  min-width: 160px;
}

.filter-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

.filter-item :deep(.el-select) {
  width: 100%;
}

.filter-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-left: auto;
}

:deep(.el-button) {
  transition: all var(--transition-fast);
}

:deep(.el-button:not(:disabled):hover) {
  transform: translateY(-1px);
}

@media (max-width: 992px) {
  .filter-row {
    gap: var(--spacing-md);
  }

  .filter-item {
    min-width: 140px;
    flex: 1;
  }

  .filter-actions {
    margin-left: 0;
    width: 100%;
    justify-content: flex-end;
    margin-top: var(--spacing-sm);
  }
}

@media (max-width: 576px) {
  .filter-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }

  .filter-item {
    width: 100%;
  }

  .filter-actions {
    flex-direction: column;
  }

  .filter-actions .el-button {
    width: 100%;
  }
}
</style>
