<script setup lang="ts">
type Tool = {
  name: string
  description: string
  link: string
  category: string
  badge?: string
}

const tools: Tool[] = [
  {
    name: 'Raycast',
    description: '我在 macOS 上的启动器，用来聚合常用工作流、AI 搜索与自动化脚本。',
    link: 'https://www.raycast.com/',
    category: '效率工具',
    badge: 'Daily Driver',
  },
  {
    name: 'Linear',
    description: '团队项目管理与个人任务整理的中心，配合自定义视图追踪产品迭代。',
    link: 'https://linear.app/',
    category: '效率工具',
  },
  {
    name: 'Obsidian',
    description: '写作与知识管理的主力，使用 Markdown + Git 同步，方便与博客内容联动。',
    link: 'https://obsidian.md/',
    category: '写作与知识库',
  },
  {
    name: 'Cursor',
    description: 'AI 辅助的代码编辑器，用来快速搭建原型和调试 Nuxt 项目。',
    link: 'https://cursor.sh/',
    category: '开发工具',
    badge: 'AI 支持',
  },
  {
    name: 'Figma',
    description: '产品与视觉设计的协同工具，所有组件库与动效稿都在这里打磨。',
    link: 'https://www.figma.com/',
    category: '设计工具',
  },
  {
    name: 'Cron',
    description: '跨平台的日程管理，让会议与深度工作时间一目了然。',
    link: 'https://cron.com/',
    category: '效率工具',
  },
]

const categories = computed(() => Array.from(new Set(tools.map(tool => tool.category))))

const toolsByCategory = computed(() =>
  categories.value.map(category => ({
    category,
    items: tools.filter(tool => tool.category === category),
  })),
)
</script>

<template>
  <UContainer class="my-14 space-y-12">
    <header class="space-y-4">
      <p class="text-sm tracking-widest text-gray-500 uppercase">
        Use
      </p>
      <h1 class="text-3xl font-semibold text-gray-900">
        我的工具清单
      </h1>
      <p class="max-w-2xl text-sm text-gray-600">
        这里整理了我日常创作与工作中常用的服务与应用，覆盖开发、设计、写作和效率管理。后续会持续更新使用心得。
      </p>
    </header>

    <section
      v-for="section in toolsByCategory"
      :key="section.category"
      class="space-y-5"
    >
      <h2 class="text-2xl font-semibold text-gray-900">
        {{ section.category }}
      </h2>
      <div
        class="
          grid gap-5
          md:grid-cols-2
        "
      >
        <UCard
          v-for="tool in section.items"
          :key="tool.name"
          class="flex flex-col justify-between border border-gray-200"
        >
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ tool.name }}
              </h3>
              <UBadge
                v-if="tool.badge"
                color="neutral"
                variant="soft"
              >
                {{ tool.badge }}
              </UBadge>
            </div>
            <p class="text-sm text-gray-600">
              {{ tool.description }}
            </p>
          </div>
          <div class="mt-6">
            <UButton
              :to="tool.link"
              target="_blank"
              rel="noopener"
              color="neutral"
            >
              访问官网
            </UButton>
          </div>
        </UCard>
      </div>
    </section>
  </UContainer>
</template>
