<script setup lang="ts">
import { Motion, motion } from 'motion-v'

const { data: posts } = await useAsyncData('recent-posts', async () => {
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

const formatDate = (value?: string | Date | null) =>
  value ? dayjs(value).format('YYYY 年 MM 月 DD 日') : ''
</script>

<template>
  <UContainer
    class="
      my-8 space-y-10
      md:my-14 md:space-y-14
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
            max-w-2xl text-3xl leading-tight font-semibold text-gray-900
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
            text-xl font-semibold text-gray-900
            md:text-2xl
            dark:text-white
          "
        >
          最新文章
        </h2>
        <Motion
          as-child
          :while-hover="{ scale: 1.05 }"
          :while-tap="{ scale: 0.95 }"
          :while-press="{ scale: 0.95 }"
          :transition="{ duration: 0.12 }"
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
        v-if="posts?.length"
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.12, delay: 0.2 }"
        class="
          grid gap-4
          md:grid-cols-2 md:gap-6
        "
      >
        <Motion
          v-for="(post, i) in posts"
          :key="useContentPath(post)"
          as-child
          :initial="{ y: 10, opacity: 0 } "
          :in-view="{ y: 0, opacity: 1 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.2, delay: (i * 0.06) + 0.2 }"
        >
          <NuxtLink
            :to="useContentPath(post)"
            class="
              group block rounded-2xl
              focus-visible:ring-2 focus-visible:ring-gray-300
              focus-visible:outline-none
              dark:focus-visible:ring-gray-700
            "
            aria-label="查看文章"
          >
            <Motion
              as-child
              :while-hover="{ scale: 1.05 }"
              :while-tap="{ scale: 0.95 }"
              :while-press="{ scale: 0.95 }"
              :transition="{ duration: 0.12 }"
            >
              <UCard
                class="
                  flex flex-col justify-between transition will-change-transform
                "
              >
                <div
                  class="
                    space-y-2
                    md:space-y-3
                  "
                >
                  <p
                    class="
                      text-xs tracking-wide text-gray-400 uppercase
                      dark:text-gray-500
                    "
                  >
                    {{ formatDate(post.date) }}
                  </p>
                  <h3
                    class="
                      text-lg leading-tight font-semibold text-gray-900
                      transition-colors
                      group-hover:text-gray-600
                      md:text-xl
                      dark:text-white dark:group-hover:text-gray-300
                    "
                  >
                    {{ post.title }}
                  </h3>
                  <p
                    class="
                      text-xs text-gray-600
                      md:text-sm
                      dark:text-gray-400
                    "
                  >
                    {{ post.description }}
                  </p>
                  <div
                    class="
                      flex flex-wrap gap-1.5
                      md:gap-2
                    "
                  >
                    <UBadge
                      v-for="tag in post.tags || []"
                      :key="tag"
                      class="text-xs"
                    >
                      {{ tag }}
                    </UBadge>
                  </div>
                </div>
              </UCard>
            </Motion>
          </NuxtLink>
        </Motion>
      </motion.div>
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
