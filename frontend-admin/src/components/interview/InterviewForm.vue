<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { Interview, Question } from '@/types/interview'

const props = defineProps<{
  visible: boolean
  interview?: Interview | null
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'submit', data: Omit<Interview, 'id'>): void
}>()

const formRef = ref<FormInstance>()
const loading = ref(false)

const defaultForm = () => ({
  company: '',
  position: '',
  date: '',
  result: 'pending' as Interview['result'],
  difficulty: 'medium' as Interview['difficulty'],
  summary: '',
  tags: [] as string[],
  questions: [] as Question[]
})

const form = reactive(defaultForm())

const rules: FormRules = {
  company: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
  position: [{ required: true, message: '请输入面试职位', trigger: 'blur' }],
  date: [{ required: true, message: '请选择面试日期', trigger: 'change' }],
  result: [{ required: true, message: '请选择面试结果', trigger: 'change' }],
  difficulty: [{ required: true, message: '请选择面试难度', trigger: 'change' }],
  summary: [{ required: true, message: '请输入面试总结', trigger: 'blur' }]
}

const resultOptions = [
  { label: '待定', value: 'pending' },
  { label: '已通过', value: 'passed' },
  { label: '未通过', value: 'failed' }
]

const difficultyOptions = [
  { label: '简单', value: 'easy' },
  { label: '中等', value: 'medium' },
  { label: '困难', value: 'hard' }
]

const tagOptions = [
  'Vue', 'React', 'JavaScript', 'TypeScript', 'CSS', 'HTML',
  '算法', '数据结构', '性能优化', 'Node.js', '微前端', '工程化',
  'HTTP', '浏览器', '手写代码', '设计模式', '项目经验'
]

watch(() => props.visible, (val) => {
  if (val && props.interview) {
    Object.assign(form, props.interview)
  } else if (val) {
    Object.assign(form, defaultForm())
  }
})

function addQuestion() {
  form.questions.push({
    id: Date.now(),
    content: '',
    answer: '',
    category: ''
  })
}

function removeQuestion(index: number) {
  form.questions.splice(index, 1)
}

function handleClose() {
  emit('update:visible', false)
  formRef.value?.resetFields()
  Object.assign(form, defaultForm())
}

async function handleSubmit() {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        emit('submit', { ...form })
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="emit('update:visible', $event)"
    title="新增面经"
    width="700px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="55px"
      class="interview-form"
    >
      <div class="form-section">
        <div class="section-title">基本信息</div>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="公司" prop="company">
              <el-input v-model="form.company" placeholder="请输入公司名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位" prop="position">
              <el-input v-model="form.position" placeholder="请输入面试职位" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="日期" prop="date">
              <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="选择面试日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结果" prop="result">
              <el-select v-model="form.result" style="width: 100%">
                <el-option
                  v-for="opt in resultOptions"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="难度" prop="difficulty">
              <el-select v-model="form.difficulty" style="width: 100%">
                <el-option
                  v-for="opt in difficultyOptions"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="标签">
          <el-select
            v-model="form.tags"
            multiple
            filterable
            allow-create
            placeholder="选择或输入标签"
            style="width: 100%"
          >
            <el-option
              v-for="tag in tagOptions"
              :key="tag"
              :label="tag"
              :value="tag"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="总结" prop="summary">
          <el-input
            v-model="form.summary"
            type="textarea"
            :rows="3"
            placeholder="请输入面试总结"
          />
        </el-form-item>
      </div>

      <div class="form-section">
        <div class="section-title">
          <span>面试题目</span>
          <el-button type="primary" size="small" @click="addQuestion">
            <el-icon><Plus /></el-icon>
            添加题目
          </el-button>
        </div>

        <div v-if="form.questions.length === 0" class="empty-questions">
          <el-empty description="暂无面试题目，点击上方按钮添加" :image-size="60" />
        </div>

        <div
          v-for="(question, index) in form.questions"
          :key="question.id"
          class="question-item"
        >
          <div class="question-header">
            <span class="question-index">题目 {{ index + 1 }}</span>
            <el-button
              type="danger"
              size="small"
              text
              @click="removeQuestion(index)"
            >
              <el-icon><Delete /></el-icon>
              删除
            </el-button>
          </div>

          <el-row :gutter="16">
            <el-col :span="16">
              <el-form-item label="题目" :prop="`questions.${index}.content`">
                <el-input
                  v-model="question.content"
                  placeholder="请输入面试题目"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分类">
                <el-input
                  v-model="question.category"
                  placeholder="如：Vue、算法"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="答案">
            <el-input
              v-model="question.answer"
              type="textarea"
              :rows="2"
              placeholder="请输入参考答案"
            />
          </el-form-item>
        </div>
      </div>
    </el-form>

    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.interview-form {
  max-height: 60vh;
  overflow-y: auto;
  padding-right: var(--spacing-sm);
}

.form-section {
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: var(--bg-color);
  border-radius: var(--radius-md);
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--primary-color);
}

:deep(.el-form-item) {
  margin-bottom: var(--spacing-lg);
}

:deep(.el-row) {
  margin-bottom: 0;
}

.empty-questions {
  background: var(--bg-white);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.question-item {
  background: var(--bg-white);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  border: 1px solid var(--border-lighter);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.question-index {
  font-weight: 600;
  color: var(--primary-color);
  font-size: var(--font-size-sm);
}
</style>
