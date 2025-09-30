<script setup lang="ts">
import { Motion } from 'motion-v'

const { data: posts } = await useAsyncData('recent-posts', async () => {
  const items = await queryCollection('blog')
    .select('title', 'description', 'path', 'date', 'tags', 'cover')
    .all()

  return items.sort((a, b) => {
    const aTime = a.date ? dayjs(a.date).valueOf() : 0
    const bTime = b.date ? dayjs(b.date).valueOf() : 0
    return bTime - aTime
  })
})

const formatDate = (value?: string | Date | null) =>
  value ? dayjs(value).format('YYYY 年 MM 月 DD 日') : ''

const getEntryPath = (entry?: { path?: string | null, _path?: string | null } | null) =>
  entry?.path ?? entry?._path ?? ''
</script>

<template>
  <UContainer class="my-14 space-y-14">
    <section class="space-y-6">
      <Motion
        :initial="{ y: 8, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 0.3 }"
        as="div"
        class="space-y-3"
      >
        <h1 class="max-w-2xl text-4xl leading-tight font-semibold text-gray-900">
          嗨，我是小龙
        </h1>
        <p class="max-w-2xl text-lg text-gray-600">
          欢迎来到我的博客。
        </p>
      </Motion>
    </section>

    <section class="space-y-6">
      <header class="flex items-center justify-between">
        <h2 class="text-2xl font-semibold text-gray-900">
          最新文章
        </h2>
        <NuxtLink
          to="/blog"
          class="
            text-sm font-medium text-gray-500 underline-offset-4
            hover:text-gray-900 hover:underline
          "
        >
          所有文章
        </NuxtLink>
      </header>

      <div
        v-if="posts?.length"
        class="
          grid gap-6
          md:grid-cols-2
        "
      >
        <Motion
          v-for="(post, i) in posts"
          :key="getEntryPath(post)"
          as-child
          :initial="{ y: 10, opacity: 0 }"
          :in-view="{ y: 0, opacity: 1 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.28, delay: i * 0.04 }"
        >
          <NuxtLink
            :to="getEntryPath(post)"
            class="
              group block rounded-2xl
              focus-visible:ring-2 focus-visible:ring-gray-300
              focus-visible:outline-none
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
                <div class="space-y-3">
                  <p class="text-xs tracking-wide text-gray-400 uppercase">
                    {{ formatDate(post.date) }}
                  </p>
                  <h3
                    class="
                      text-xl leading-tight font-semibold text-gray-900
                      transition-colors
                      group-hover:text-gray-600
                    "
                  >
                    {{ post.title }}
                  </h3>
                  <p class="text-sm text-gray-600">
                    {{ post.description }}
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <UBadge
                      v-for="tag in post.tags || []"
                      :key="tag"
                    >
                      {{ tag }}
                    </UBadge>
                  </div>
                </div>
              </UCard>
            </Motion>
          </NuxtLink>
        </Motion>
      </div>
      <p
        v-else
        class="text-sm text-gray-500"
      >
        文章准备中，敬请期待。
      </p>
    </section>
  </UContainer>
</template>
