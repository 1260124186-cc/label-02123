<script setup lang="ts">
import { computed } from 'vue'
import type { Interview } from '@/types/interview'

const props = defineProps<{
  interview: Interview
}>()

const emit = defineEmits<{
  (e: 'click', id: number): void
}>()

const resultConfig = computed(() => {
  const configs = {
    passed: { text: '已通过', type: 'success' as const },
    failed: { text: '未通过', type: 'danger' as const },
    pending: { text: '待定', type: 'warning' as const }
  }
  return configs[props.interview.result]
})

const difficultyConfig = computed(() => {
  const configs = {
    easy: { text: '简单', type: 'success' as const },
    medium: { text: '中等', type: 'warning' as const },
    hard: { text: '困难', type: 'danger' as const }
  }
  return configs[props.interview.difficulty]
})

function handleClick() {
  emit('click', props.interview.id)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    handleClick()
  }
}
</script>

<template>
  <article
    class="interview-card card"
    @click="handleClick"
    @keydown="handleKeydown"
    role="button"
    tabindex="0"
    :aria-label="`${interview.company} - ${interview.position} 面经`"
  >
    <header class="card-header">
      <div class="company-info">
        <div class="company-icon-wrapper">
          <el-icon :size="18">
            <OfficeBuilding />
          </el-icon>
        </div>
        <h3 class="company-name">{{ interview.company }}</h3>
      </div>
      <div class="status-tags">
        <el-tag :type="resultConfig.type" size="small" effect="light">
          {{ resultConfig.text }}
        </el-tag>
        <el-tag :type="difficultyConfig.type" size="small" effect="plain">
          {{ difficultyConfig.text }}
        </el-tag>
      </div>
    </header>

    <div class="card-body">
      <div class="info-grid">
        <div class="info-row">
          <el-icon><User /></el-icon>
          <span>{{ interview.position }}</span>
        </div>
        <div class="info-row">
          <el-icon><Calendar /></el-icon>
          <span>{{ interview.date }}</span>
        </div>
        <div class="info-row">
          <el-icon><ChatDotRound /></el-icon>
          <span>{{ interview.questions.length }} 道面试题</span>
        </div>
      </div>
      <p class="summary">{{ interview.summary }}</p>
    </div>

    <footer class="card-footer">
      <div class="tags">
        <el-tag
          v-for="tag in interview.tags.slice(0, 4)"
          :key="tag"
          size="small"
          effect="plain"
          type="info"
        >
          {{ tag }}
        </el-tag>
        <el-tag
          v-if="interview.tags.length > 4"
          size="small"
          effect="plain"
          type="info"
        >
          +{{ interview.tags.length - 4 }}
        </el-tag>
      </div>
      <span class="view-detail">
        查看详情
        <el-icon class="arrow-icon"><ArrowRight /></el-icon>
      </span>
    </footer>
  </article>
</template>

<style scoped>
.interview-card {
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
  background: var(--bg-card);
}

.interview-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.interview-card:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.interview-card:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-light);
}

.company-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.company-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--primary-light);
  border-radius: var(--radius-md);
  color: var(--primary-color);
}

.company-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
  line-height: var(--line-height-tight);
}

.status-tags {
  display: flex;
  gap: var(--spacing-sm);
  flex-shrink: 0;
}

.card-body {
  margin-bottom: var(--spacing-md);
}

.info-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.info-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-regular);
  font-size: var(--font-size-sm);
}

.info-row .el-icon {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
}

.summary {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  margin: 0;
  padding: var(--spacing-sm);
  background: var(--bg-section);
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--border-color);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-light);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.view-detail {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--primary-color);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
}

.interview-card:hover .view-detail {
  color: var(--primary-dark);
}

.arrow-icon {
  transition: transform var(--transition-fast);
}

.interview-card:hover .arrow-icon {
  transform: translateX(4px);
}

@media (max-width: 640px) {
  .card-header {
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .status-tags {
    align-self: flex-start;
  }

  .info-grid {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
}
</style>
