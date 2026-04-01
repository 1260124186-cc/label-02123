<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInterviewStore } from '@/stores/interview'
import { ElMessage } from 'element-plus'
import QuestionCard from '@/components/interview/QuestionCard.vue'

const route = useRoute()
const router = useRouter()
const store = useInterviewStore()

const interview = computed(() => store.currentInterview)

const resultConfig = computed(() => {
  if (!interview.value) return null
  const configs = {
    passed: { text: '已通过', type: 'success' as const },
    failed: { text: '未通过', type: 'danger' as const },
    pending: { text: '待定', type: 'warning' as const }
  }
  return configs[interview.value.result]
})

const difficultyConfig = computed(() => {
  if (!interview.value) return null
  const configs = {
    easy: { text: '简单', type: 'success' as const },
    medium: { text: '中等', type: 'warning' as const },
    hard: { text: '困难', type: 'danger' as const }
  }
  return configs[interview.value.difficulty]
})

onMounted(async () => {
  const id = Number(route.params.id)
  if (isNaN(id)) {
    ElMessage.error('无效的面经ID')
    router.push('/')
    return
  }
  await store.fetchInterviewDetail(id)
  if (!store.currentInterview) {
    ElMessage.error('面经不存在')
    router.push('/')
  }
})

function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="detail-view">
    <div v-if="store.loading" class="loading-container" aria-busy="true">
      <el-skeleton :rows="10" animated />
    </div>

    <template v-else-if="interview">
      <nav class="back-nav" aria-label="返回导航">
        <el-button
          text
          @click="goBack"
          class="back-btn"
        >
          <el-icon><ArrowLeft /></el-icon>
          返回列表
        </el-button>
      </nav>

      <article class="detail-content">
        <header class="detail-header card">
          <div class="header-main">
            <div class="company-section">
              <div class="company-icon-wrapper">
                <el-icon :size="28">
                  <OfficeBuilding />
                </el-icon>
              </div>
              <div class="company-info">
                <h1 class="company-name">{{ interview.company }}</h1>
                <p class="position">{{ interview.position }}</p>
              </div>
            </div>

            <div class="status-section">
              <el-tag :type="resultConfig?.type" size="large" effect="light">
                {{ resultConfig?.text }}
              </el-tag>
              <el-tag :type="difficultyConfig?.type" size="large" effect="plain">
                难度：{{ difficultyConfig?.text }}
              </el-tag>
            </div>
          </div>

          <div class="meta-info">
            <div class="meta-item">
              <el-icon><Calendar /></el-icon>
              <span>面试日期：{{ interview.date }}</span>
            </div>
            <div class="meta-item">
              <el-icon><ChatDotRound /></el-icon>
              <span>面试题数：{{ interview.questions.length }} 道</span>
            </div>
          </div>

          <div class="tags-section">
            <el-tag
              v-for="tag in interview.tags"
              :key="tag"
              effect="plain"
              type="info"
            >
              {{ tag }}
            </el-tag>
          </div>
        </header>

        <section class="summary-section card" aria-labelledby="summary-title">
          <h2 id="summary-title" class="section-title">
            <el-icon><Document /></el-icon>
            面试总结
          </h2>
          <p class="summary-content">{{ interview.summary }}</p>
        </section>

        <section class="questions-section card" aria-labelledby="questions-title">
          <h2 id="questions-title" class="section-title">
            <el-icon><QuestionFilled /></el-icon>
            面试题目
            <span class="question-count">共 {{ interview.questions.length }} 题</span>
          </h2>
          <div class="questions-list">
            <QuestionCard
              v-for="(question, index) in interview.questions"
              :key="question.id"
              :question="question"
              :index="index"
            />
          </div>
        </section>
      </article>
    </template>
  </div>
</template>

<style scoped>
.detail-view {
  min-height: calc(100vh - 200px);
}

.loading-container {
  background: var(--bg-card);
  padding: var(--spacing-xl);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
}

.back-nav {
  margin-bottom: var(--spacing-lg);
}

.back-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.back-btn:hover {
  background: var(--bg-hover);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.detail-header {
  padding: var(--spacing-xl);
}

.header-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-light);
}

.company-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.company-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: var(--primary-light);
  border-radius: var(--radius-lg);
  color: var(--primary-color);
}

.company-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.company-name {
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0;
  line-height: var(--line-height-tight);
}

.position {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  margin: 0;
  line-height: var(--line-height-normal);
}

.status-section {
  display: flex;
  gap: var(--spacing-sm);
  flex-shrink: 0;
}

.meta-info {
  display: flex;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--bg-section);
  border-radius: var(--radius-md);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-regular);
  font-size: var(--font-size-sm);
}

.meta-item .el-icon {
  color: var(--text-secondary);
  font-size: var(--font-size-md);
}

.tags-section {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.summary-section,
.questions-section {
  padding: var(--spacing-xl);
}

.section-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0 0 var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--primary-color);
  line-height: var(--line-height-tight);
}

.section-title .el-icon {
  color: var(--primary-color);
  font-size: var(--font-size-xl);
}

.question-count {
  margin-left: auto;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  color: var(--text-secondary);
}

.summary-content {
  color: var(--text-regular);
  line-height: var(--line-height-relaxed);
  font-size: var(--font-size-base);
  margin: 0;
  padding: var(--spacing-md);
  background: var(--bg-section);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--primary-color);
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

@media (max-width: 768px) {
  .header-main {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .status-section {
    align-self: flex-start;
  }

  .meta-info {
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .section-title {
    flex-wrap: wrap;
  }

  .question-count {
    width: 100%;
    margin-left: 0;
    margin-top: var(--spacing-xs);
  }
}
</style>
