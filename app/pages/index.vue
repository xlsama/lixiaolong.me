<script setup lang="ts">
import { Motion, motion } from 'motion-v'

const {
  data: posts,
  status: postsStatus,
  error: postsError,
} = await useLazyAsyncData('recent-posts', async () => {
  const items = await queryCollection('blog')
    .all()

  return items
    .sort((a, b) => {
      const aTime = a.date ? dayjs(a.date).valueOf() : 0
      const bTime = b.date ? dayjs(b.date).valueOf() : 0
      return bTime - aTime
    })
    .slice(0, 2) // 只显示最新的 2 篇文章
})
</script>

<template>
  <UContainer
    class="
      my-8 space-y-10
      md:my-14 md:space-y-20
    "
  >
    <section
      class="
        space-y-4
        md:space-y-6
      "
    >
      <div
        class="
          space-y-2
          md:space-y-3
        "
      >
        <h1
          class="
            max-w-2xl text-3xl leading-tight font-medium text-gray-900
            md:text-4xl
            dark:text-white
          "
        >
          嗨，我是小龙
        </h1>
        <p
          class="
            max-w-2xl text-base text-gray-600
            md:text-lg
            dark:text-gray-300
          "
        >
          欢迎来到我的博客。
        </p>
      </div>
    </section>

    <section
      class="
        space-y-4
        md:space-y-6
      "
    >
      <header class="flex items-center justify-between">
        <h2
          class="
            text-xl font-medium text-gray-900
            md:text-2xl
            dark:text-white
          "
        >
          最新文章
        </h2>
        <Motion
          as-child
          :while-hover="{ scale: 1.05 }"
          :while-tap="{ scale: 0.8 }"
          :while-press="{ scale: 0.95 }"
          :transition="{ duration: 0.08 }"
        >
          <NuxtLink
            to="/blog"
            class="
              text-xs font-medium text-gray-500 underline-offset-4
              hover:text-gray-900 hover:underline
              md:text-sm
              dark:text-gray-400 dark:hover:text-white
            "
          >
            所有文章
          </NuxtLink>
        </Motion>
      </header>

      <motion.div
        v-if="postsStatus === 'success' && posts?.length"
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.08, delay: 0.2 }"
        class="
          grid gap-4
          md:grid-cols-2 md:gap-6
        "
      >
        <BlogPostCard
          v-for="(post, i) in posts"
          :key="useContentPath(post)"
          :post="post"
          :index="i"
          variant="grid"
        />
      </motion.div>
      <div
        v-else-if="postsStatus === 'pending'"
        class="
          grid gap-4
          md:grid-cols-2 md:gap-6
        "
      >
        <div
          v-for="i in 2"
          :key="i"
          class="
            h-36 rounded-3xl border border-gray-200/20 bg-gray-100/60
            animate-pulse
            dark:border-gray-700/40 dark:bg-gray-800/40
          "
        />
      </div>
      <p
        v-else-if="postsError"
        class="
          text-sm text-red-500
          dark:text-red-400
        "
      >
        文章加载失败，请稍后重试。
      </p>
      <p
        v-else
        class="
          text-sm text-gray-500
          dark:text-gray-400
        "
      >
        文章准备中，敬请期待。
      </p>
    </section>
  </UContainer>
</template>
