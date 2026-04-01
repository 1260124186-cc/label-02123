<script setup lang="ts">
import { onMounted } from 'vue'
import { useInterviewStore } from '@/stores/interview'
import PageHeader from '@/components/common/PageHeader.vue'
import InterviewFilter from '@/components/interview/InterviewFilter.vue'
import InterviewList from '@/components/interview/InterviewList.vue'

const store = useInterviewStore()

onMounted(() => {
  store.fetchInterviews()
})
</script>

<template>
  <div class="home-view">
    <div class="container">
      <PageHeader
        title="面经记录"
        subtitle="记录每一次面试经历，总结经验，不断进步"
      />
      <InterviewFilter />
      <InterviewList />
    </div>
  </div>
</template>

<style scoped>
.home-view {
  min-height: calc(100vh - 200px);
}
</style>
