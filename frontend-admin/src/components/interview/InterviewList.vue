<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useInterviewStore } from '@/stores/interview'
import InterviewCard from './InterviewCard.vue'

const router = useRouter()
const store = useInterviewStore()

function handleCardClick(id: number) {
  router.push(`/interview/${id}`)
}

function handlePageChange(page: number) {
  store.setPage(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <section class="interview-list" aria-label="面经列表">
    <div v-if="store.loading" class="loading-container" aria-busy="true">
      <el-skeleton :rows="5" animated />
      <el-skeleton :rows="5" animated style="margin-top: 16px" />
    </div>

    <template v-else>
      <div v-if="store.hasData" class="list-content">
        <TransitionGroup name="list" tag="div" class="cards-container">
          <InterviewCard
            v-for="interview in store.interviews"
            :key="interview.id"
            :interview="interview"
            @click="handleCardClick"
          />
        </TransitionGroup>

        <nav class="pagination-container" aria-label="分页导航">
          <el-pagination
            v-model:current-page="store.pagination.page"
            :page-size="store.pagination.pageSize"
            :total="store.pagination.total"
            :pager-count="5"
            layout="prev, pager, next, jumper, ->, total"
            background
            @current-change="handlePageChange"
          />
        </nav>
      </div>

      <div v-else class="empty-container">
        <el-empty description="暂无面经记录">
          <template #image>
            <el-icon :size="64" color="var(--text-placeholder)">
              <Document />
            </el-icon>
          </template>
        </el-empty>
      </div>
    </template>
  </section>
</template>

<style scoped>
.interview-list {
  min-height: 400px;
}

.loading-container {
  background: var(--bg-card);
  padding: var(--spacing-xl);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.pagination-container {
  margin-top: var(--spacing-xl);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  display: flex;
  justify-content: center;
}

.empty-container {
  background: var(--bg-card);
  padding: var(--spacing-xxl);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
}

/* 列表动画 */
.list-enter-active,
.list-leave-active {
  transition: all var(--transition-normal);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.list-move {
  transition: transform var(--transition-normal);
}
</style>
