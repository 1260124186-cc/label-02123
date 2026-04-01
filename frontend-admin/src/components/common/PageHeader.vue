<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineProps<{
  title: string
  subtitle?: string
}>()

const stats = ref([
  { icon: 'Document', label: '面经记录', value: 8, color: '#409eff' },
  { icon: 'OfficeBuilding', label: '面试公司', value: 8, color: '#67c23a' },
  { icon: 'CircleCheck', label: '通过率', value: '50%', color: '#e6a23c' }
])

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section class="page-header" :class="{ visible: isVisible }">
    <div class="header-bg">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
    </div>

    <div class="header-content">
      <div class="title-section">
        <div class="icon-wrapper">
          <el-icon :size="36"><Notebook /></el-icon>
        </div>
        <h1 class="title">{{ title }}</h1>
        <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
      </div>

      <div class="stats-section">
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="stat-card"
          :style="{ '--delay': `${index * 0.1}s`, '--accent-color': stat.color }"
        >
          <div class="stat-icon" :style="{ background: stat.color + '15', color: stat.color }">
            <el-icon :size="24">
              <component :is="stat.icon" />
            </el-icon>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <div class="tags-section">
        <el-tag effect="plain" round>Vue 3</el-tag>
        <el-tag effect="plain" round type="success">TypeScript</el-tag>
        <el-tag effect="plain" round type="warning">前端面试</el-tag>
        <el-tag effect="plain" round type="danger">算法</el-tag>
        <el-tag effect="plain" round type="info">性能优化</el-tag>
      </div>
    </div>

    <slot />
  </section>
</template>

<style scoped>
.page-header {
  position: relative;
  text-align: center;
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-xl) var(--spacing-lg);
  background: linear-gradient(135deg, #409eff 0%, #36cfc9 100%);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.header-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: -50px;
  right: -50px;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  bottom: -30px;
  left: 10%;
  animation-delay: 2s;
}

.circle-3 {
  width: 100px;
  height: 100px;
  top: 50%;
  left: 60%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}

.header-content {
  position: relative;
  z-index: 1;
}

.title-section {
  margin-bottom: var(--spacing-lg);
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin-bottom: var(--spacing-md);
  color: white;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin: 0 0 var(--spacing-sm);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 2px;
}

.subtitle {
  font-size: var(--font-size-md);
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  max-width: 500px;
  margin: 0 auto;
}

.stats-section {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin: var(--spacing-xl) 0;
  flex-wrap: wrap;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  background: rgba(255, 255, 255, 0.95);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-width: 160px;
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.5s ease forwards;
  animation-delay: var(--delay);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
}

.stat-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.stat-value {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--text-primary);
}

.stat-label {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.tags-section {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.tags-section .el-tag {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: var(--spacing-xs) var(--spacing-md);
  font-weight: 500;
}

@media (max-width: 768px) {
  .page-header {
    padding: var(--spacing-lg);
  }

  .title {
    font-size: 24px;
  }

  .stats-section {
    gap: var(--spacing-md);
  }

  .stat-card {
    min-width: 140px;
    padding: var(--spacing-sm) var(--spacing-md);
  }
}
</style>
