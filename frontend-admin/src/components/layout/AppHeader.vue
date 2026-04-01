<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <header class="app-header">
    <div class="header-container">
      <div
        class="logo"
        @click="goHome"
        role="button"
        tabindex="0"
        @keydown.enter="goHome"
        aria-label="返回首页"
      >
        <div class="logo-icon">
          <el-icon :size="24">
            <Document />
          </el-icon>
        </div>
        <span class="logo-text">面经博客</span>
      </div>
      <nav class="nav-menu" aria-label="主导航">
        <router-link to="/" class="nav-item" aria-current="page">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: var(--bg-white);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border-light);
  height: var(--header-height);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  padding: var(--spacing-sm);
  margin: calc(var(--spacing-sm) * -1);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.logo:hover {
  background: var(--bg-hover);
}

.logo:active {
  transform: scale(0.98);
}

.logo:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--primary-light);
  border-radius: var(--radius-md);
  color: var(--primary-color);
}

.logo-text {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  color: var(--text-regular);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
  text-decoration: none;
}

.nav-item:hover {
  background: var(--bg-hover);
  color: var(--primary-color);
  text-decoration: none;
}

.nav-item:active {
  background: var(--bg-active);
  transform: scale(0.98);
}

.nav-item.router-link-active {
  color: var(--primary-color);
  background: var(--primary-light);
}

.nav-item .el-icon {
  font-size: var(--font-size-md);
}
</style>
