# 面经记录博客系统

## How to Run

### 使用 Docker Compose 运行（推荐）

```bash
# 构建并启动所有服务
docker-compose up --build -d

# 查看运行状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 本地开发运行

```bash
cd frontend-admin
npm install
npm run dev
```

## Services

| 服务名称 | 端口 | 说明 |
|---------|------|------|
| frontend-admin | 8081 | 面经记录博客前端管理系统 |

## 测试账号

本项目为纯前端项目，使用 Mock 数据，无需登录账号。

## 题目内容

我最近在面试，想要记录面试过程中的问题。帮我用 Vue 生成一个面经记录博客，功能包含分页查看面经。

### 功能特性

- 📝 面经列表展示（支持分页）
- 🔍 面经详情查看
- ➕ 新增面经（弹窗表单）
- 🏷️ 按公司/职位/结果/难度筛选
- 📱 响应式设计
- 🎨 现代化 UI 设计

### 技术栈

- Vue 3 + TypeScript
- Vite
- Vue Router
- Pinia
- Element Plus

### Mock 数据说明

本项目采用前端 Mock + LocalStorage 持久化方案：

- 数据存储在浏览器 LocalStorage 中，刷新页面数据不丢失
- 首次访问时加载预置的 8 条面经记录
- 新增的面经数据自动保存到 LocalStorage
- 清除浏览器缓存后恢复默认数据

存储结构：
```json
{
  "interviews": [...],
  "version": "1.0.0"
}
```

#### LocalStorage 局限性

| 局限性 | 说明 |
|--------|------|
| 存储容量 | 约 5MB，大量数据可能超限 |
| 单设备 | 数据仅存储在当前浏览器，无法跨设备同步 |
| 无备份 | 清除浏览器数据会丢失所有记录 |
| 无多用户 | 不支持多用户登录和数据隔离 |
| 安全性 | 数据明文存储，无加密保护 |

如需生产环境使用，建议接入后端服务（只需修改 `src/api/interview.ts`）。

### 功能范围说明

#### Prompt 明确要求的功能

- ✅ 分页查看面经

#### 超出 Prompt 要求的额外功能

以下功能是基于"面经记录博客"场景的合理扩展，非 Prompt 明确要求：

| 额外功能 | 扩展原因 |
|----------|----------|
| 面经详情页 | 博客类应用需要详情页展示完整内容 |
| 新增面经 | "记录面试问题"隐含了新增功能需求 |
| 按公司筛选 | 提升列表查找效率 |
| 按职位筛选 | 提升列表查找效率 |
| 按结果筛选 | 提升列表查找效率 |
| 按难度筛选 | 提升列表查找效率 |
| 面试题目展开/收起 | 优化详情页阅读体验 |
| LocalStorage 持久化 | 解决数据刷新丢失问题 |


### 日志系统说明

项目内置了轻量级日志工具（`src/utils/logger.ts`），支持：

- 多级别日志：debug、info、warn、error
- 模块化日志标识
- API 请求日志记录
- 用户操作日志记录
- 开发环境 debug 日志（生产环境自动过滤）

日志输出示例：
```
[Interview-Blog] [2026-02-08T12:00:00.000Z] [INFO] [API] GET: /api/interviews
[Interview-Blog] [2026-02-08T12:00:00.300Z] [INFO] [API] 新增面经成功: 字节跳动 - 前端开发工程师
```

生产环境可扩展对接日志收集服务（如 Sentry、阿里云 SLS 等）。

### 项目结构

```
.
├── frontend-admin/                    # 前端管理系统
│   ├── src/
│   │   ├── api/                       # API 接口
│   │   │   └── interview.ts
│   │   ├── assets/                    # 静态资源
│   │   │   └── styles/
│   │   │       ├── global.css         # 全局样式
│   │   │       └── variables.css      # CSS 变量
│   │   ├── components/                # 公共组件
│   │   │   ├── common/
│   │   │   │   └── PageHeader.vue     # 页面头部
│   │   │   ├── interview/
│   │   │   │   ├── InterviewCard.vue  # 面经卡片
│   │   │   │   ├── InterviewFilter.vue # 筛选组件
│   │   │   │   ├── InterviewForm.vue  # 新增表单
│   │   │   │   ├── InterviewList.vue  # 面经列表
│   │   │   │   └── QuestionCard.vue   # 题目卡片
│   │   │   └── layout/
│   │   │       ├── AppFooter.vue      # 页脚
│   │   │       └── AppHeader.vue      # 页头导航
│   │   ├── composables/               # 组合式函数
│   │   │   └── useMessage.ts
│   │   ├── mock/                      # Mock 数据
│   │   │   └── interviews.ts
│   │   ├── router/                    # 路由配置
│   │   │   └── index.ts
│   │   ├── stores/                    # Pinia 状态管理
│   │   │   └── interview.ts
│   │   ├── types/                     # TypeScript 类型
│   │   │   └── interview.ts
│   │   ├── utils/                     # 工具函数
│   │   │   ├── logger.ts              # 日志工具
│   │   │   └── storage.ts             # LocalStorage 存储
│   │   ├── views/                     # 页面视图
│   │   │   ├── HomeView.vue           # 首页
│   │   │   └── InterviewDetailView.vue # 详情页
│   │   ├── App.vue                    # 根组件
│   │   └── main.ts                    # 入口文件
│   ├── public/
│   │   └── vite.svg
│   ├── Dockerfile                     # Docker 构建文件
│   ├── nginx.conf                     # Nginx 配置
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── docker-compose.yml                 # Docker Compose 配置
├── .gitignore                         # Git 忽略文件
└── README.md                          # 项目说明
```
