import type { Interview } from '@/types/interview'
import { loadFromStorage, saveToStorage } from '@/utils/storage'

// 默认预置数据
const defaultInterviews: Interview[] = [
  {
    id: 1,
    company: '字节跳动',
    position: '前端开发工程师',
    date: '2026-02-01',
    result: 'passed',
    difficulty: 'hard',
    summary: '整体面试体验不错，面试官很专业，问题由浅入深。',
    tags: ['Vue', 'React', '算法', '性能优化'],
    questions: [
      {
        id: 1,
        content: 'Vue3 的响应式原理是什么？和 Vue2 有什么区别？',
        answer: 'Vue3 使用 Proxy 实现响应式，相比 Vue2 的 Object.defineProperty，可以监听数组变化和新增属性，性能更好。',
        category: 'Vue'
      },
      {
        id: 2,
        content: '说说你对虚拟 DOM 的理解？',
        answer: '虚拟 DOM 是用 JS 对象描述真实 DOM 结构，通过 diff 算法比较新旧虚拟 DOM，最小化真实 DOM 操作，提升性能。',
        category: 'Vue'
      },
      {
        id: 3,
        content: '实现一个 LRU 缓存',
        answer: '使用 Map 数据结构，利用其有序性实现 LRU。get 时将元素移到末尾，set 时检查容量，超出则删除第一个元素。',
        category: '算法'
      }
    ]
  },
  {
    id: 2,
    company: '阿里巴巴',
    position: '高级前端工程师',
    date: '2026-01-28',
    result: 'pending',
    difficulty: 'hard',
    summary: '阿里的面试非常注重项目经验和技术深度，需要对原理有深入理解。',
    tags: ['React', 'Node.js', '微前端', '工程化'],
    questions: [
      {
        id: 4,
        content: 'React Fiber 架构的原理是什么？',
        answer: 'Fiber 是 React 16 引入的新协调引擎，将渲染工作分割成小单元，支持中断和恢复，实现时间切片和优先级调度。',
        category: 'React'
      },
      {
        id: 5,
        content: '微前端的实现方案有哪些？各有什么优缺点？',
        answer: '主要有 iframe、Web Components、qiankun、Module Federation 等方案。qiankun 基于 single-spa，支持 JS 沙箱和样式隔离。',
        category: '微前端'
      }
    ]
  },
  {
    id: 3,
    company: '腾讯',
    position: '前端开发工程师',
    date: '2026-01-25',
    result: 'passed',
    difficulty: 'medium',
    summary: '腾讯的面试比较注重基础和编码能力，手写代码环节较多。',
    tags: ['JavaScript', 'CSS', '手写代码', '浏览器'],
    questions: [
      {
        id: 6,
        content: '手写 Promise.all 实现',
        answer: '接收 Promise 数组，返回新 Promise。所有 Promise 成功则返回结果数组，任一失败则立即 reject。',
        category: 'JavaScript'
      },
      {
        id: 7,
        content: 'CSS 实现垂直居中的方式有哪些？',
        answer: 'flex 布局、grid 布局、absolute + transform、table-cell、line-height 等多种方式。',
        category: 'CSS'
      }
    ]
  },
  {
    id: 4,
    company: '美团',
    position: '前端开发工程师',
    date: '2026-01-20',
    result: 'failed',
    difficulty: 'medium',
    summary: '美团面试偏向业务场景和实际问题解决，需要有丰富的项目经验。',
    tags: ['Vue', '性能优化', '业务场景', 'HTTP'],
    questions: [
      {
        id: 8,
        content: '如何优化首屏加载速度？',
        answer: '路由懒加载、代码分割、图片懒加载、CDN 加速、Gzip 压缩、缓存策略、SSR 等。',
        category: '性能优化'
      },
      {
        id: 9,
        content: 'HTTP 缓存机制是怎样的？',
        answer: '分为强缓存（Expires、Cache-Control）和协商缓存（Last-Modified、ETag）。强缓存优先级高于协商缓存。',
        category: 'HTTP'
      }
    ]
  },
  {
    id: 5,
    company: '京东',
    position: '前端开发工程师',
    date: '2026-01-15',
    result: 'passed',
    difficulty: 'easy',
    summary: '京东面试整体难度适中，注重基础知识和项目经验。',
    tags: ['Vue', 'JavaScript', 'CSS', '项目经验'],
    questions: [
      {
        id: 10,
        content: 'Vue 组件通信方式有哪些？',
        answer: 'props/emit、provide/inject、EventBus、Vuex/Pinia、ref/expose 等。',
        category: 'Vue'
      }
    ]
  },
  {
    id: 6,
    company: '网易',
    position: '前端开发工程师',
    date: '2026-01-10',
    result: 'passed',
    difficulty: 'medium',
    summary: '网易面试氛围轻松，面试官会引导思考，注重解决问题的思路。',
    tags: ['JavaScript', 'TypeScript', '设计模式'],
    questions: [
      {
        id: 11,
        content: 'TypeScript 中 type 和 interface 的区别？',
        answer: 'interface 可以声明合并，type 可以使用联合类型和交叉类型。interface 更适合定义对象结构，type 更灵活。',
        category: 'TypeScript'
      }
    ]
  },
  {
    id: 7,
    company: '小红书',
    position: '前端开发工程师',
    date: '2026-01-05',
    result: 'pending',
    difficulty: 'medium',
    summary: '小红书面试注重用户体验和产品思维，会问一些产品相关的问题。',
    tags: ['React', '用户体验', '移动端', '性能优化'],
    questions: [
      {
        id: 12,
        content: '如何实现图片懒加载？',
        answer: '使用 IntersectionObserver API 监听图片是否进入视口，进入时再加载真实图片。也可以使用 loading="lazy" 属性。',
        category: '性能优化'
      }
    ]
  },
  {
    id: 8,
    company: '拼多多',
    position: '前端开发工程师',
    date: '2025-12-28',
    result: 'failed',
    difficulty: 'hard',
    summary: '拼多多面试难度较大，算法题较多，需要扎实的数据结构基础。',
    tags: ['算法', 'JavaScript', '数据结构'],
    questions: [
      {
        id: 13,
        content: '实现一个深拷贝函数，需要处理循环引用',
        answer: '使用 WeakMap 记录已拷贝的对象，递归处理对象和数组，需要考虑 Date、RegExp 等特殊对象。',
        category: '算法'
      }
    ]
  }
]

// 从 LocalStorage 加载数据，如果没有则使用默认数据
function initInterviews(): Interview[] {
  const stored = loadFromStorage()
  if (stored && stored.length > 0) {
    return stored
  }
  // 首次使用，保存默认数据到 LocalStorage
  saveToStorage(defaultInterviews)
  return [...defaultInterviews]
}

// 导出可变的面经数据（支持持久化）
export const mockInterviews: Interview[] = initInterviews()

// 保存数据到 LocalStorage
export function persistInterviews(): void {
  saveToStorage(mockInterviews)
}
