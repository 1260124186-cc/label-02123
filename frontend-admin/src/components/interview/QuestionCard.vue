<script setup lang="ts">
import { ref } from 'vue'
import type { Question } from '@/types/interview'

defineProps<{
  question: Question
  index: number
}>()

const showAnswer = ref(false)

function toggleAnswer() {
  showAnswer.value = !showAnswer.value
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    toggleAnswer()
  }
}
</script>

<template>
  <article class="question-card">
    <header
      class="question-header"
      @click="toggleAnswer"
      @keydown="handleKeydown"
      role="button"
      tabindex="0"
      :aria-expanded="showAnswer"
      :aria-label="`问题 ${index + 1}: ${question.content}`"
    >
      <div class="question-info">
        <span class="question-index">Q{{ index + 1 }}</span>
        <el-tag size="small" type="info" effect="plain">{{ question.category }}</el-tag>
      </div>
      <el-icon class="toggle-icon" :class="{ expanded: showAnswer }">
        <ArrowDown />
      </el-icon>
    </header>

    <div class="question-content">
      {{ question.content }}
    </div>

    <el-collapse-transition>
      <div v-show="showAnswer" class="answer-section">
        <div class="answer-label">
          <el-icon><ChatLineSquare /></el-icon>
          <span>参考答案</span>
        </div>
        <div class="answer-content">
          {{ question.answer }}
        </div>
      </div>
    </el-collapse-transition>
  </article>
</template>

<style scoped>
.question-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all var(--transition-normal);
}

.question-card:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-sm);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background: var(--bg-section);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.question-header:hover {
  background: var(--bg-hover);
}

.question-header:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: -2px;
}

.question-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.question-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 var(--spacing-sm);
  background: var(--primary-color);
  color: white;
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
}

.toggle-icon {
  color: var(--text-secondary);
  transition: transform var(--transition-normal);
  font-size: var(--font-size-md);
}

.toggle-icon.expanded {
  transform: rotate(180deg);
}

.question-content {
  padding: var(--spacing-md);
  color: var(--text-primary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  border-bottom: 1px dashed var(--border-light);
}

.answer-section {
  padding: var(--spacing-md);
  background: var(--success-light);
}

.answer-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--success-color);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-sm);
}

.answer-content {
  color: var(--text-regular);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  padding-left: var(--spacing-lg);
}
</style>
