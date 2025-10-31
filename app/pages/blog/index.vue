<script setup lang="ts">
import { Motion } from 'motion-v'

const { data: posts } = await useAsyncData('blog-posts', async () => {
  const items = await queryCollection('blog')
    .all()

  return items.sort((a, b) => {
    const aTime = a.date ? dayjs(a.date).valueOf() : 0
    const bTime = b.date ? dayjs(b.date).valueOf() : 0
    return bTime - aTime
  })
})
</script>

<template>
  <UContainer
    class="
      my-8 space-y-8
      md:my-14 md:space-y-10
    "
  >
    <header
      class="
        space-y-2
        md:space-y-3
      "
    >
      <h1
        class="
          text-2xl font-semibold text-gray-900
          md:text-3xl
          dark:text-white
        "
      >
        <Motion
          as-child
          :while-hover="{ scale: 1.05 }"
          :while-tap="{ scale: 0.8 }"
          :while-press="{ scale: 0.95 }"
          :transition="{ duration: 0.08 }"
        >
          <UButton
            variant="ghost"
            color="neutral"
            to="/"
            icon="i-lucide-arrow-left"
          />
          所有文章
        </Motion>
      </h1>
    </header>

    <div
      v-if="posts?.length"
      class="
        space-y-4
        md:space-y-6
      "
    >
      <BlogPostCard
        v-for="(post, i) in posts"
        :key="useContentPath(post)"
        :post="post"
        :index="i"
        variant="list"
      />
    </div>

    <p
      v-else
      class="
        text-sm text-gray-500
        dark:text-gray-400
      "
    >
      暂时还没有文章，敬请期待。
    </p>
  </UContainer>
</template>
