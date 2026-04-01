<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-content">
        <p class="copyright">
          © {{ currentYear }} 面经博客 - 记录每一次面试经历
        </p>
        <p class="tech-stack">
          Built with
          <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">Vue 3</a>
          +
          <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">TypeScript</a>
          +
          <a href="https://element-plus.org/" target="_blank" rel="noopener noreferrer">Element Plus</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: var(--bg-white);
  border-top: 1px solid var(--border-light);
  padding: var(--spacing-xl) 0;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.footer-content {
  text-align: center;
}

.copyright {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
  line-height: var(--line-height-normal);
}

.tech-stack {
  color: var(--text-placeholder);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-normal);
}

.tech-stack a {
  color: var(--text-secondary);
  transition: color var(--transition-fast);
}

.tech-stack a:hover {
  color: var(--primary-color);
}
</style>
