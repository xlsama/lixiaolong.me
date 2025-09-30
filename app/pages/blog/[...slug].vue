<script setup lang="ts">
import { Motion } from 'motion-v'

const route = useRoute()

// Use the actual encoded route path to match content entry paths (handles %-encoded chars)
const articlePath = computed(() => route.path)

const { data: article } = await useAsyncData(() => `blog-article:${articlePath.value}`, async () => {
  const entry = await queryCollection('blog').path(articlePath.value).first()
  if (!entry) {
    throw createError({ statusCode: 404, statusMessage: '文章不存在' })
  }
  return entry
}, {
  watch: [articlePath],
})

watch(article, (value) => {
  if (!value) return
  useSeoMeta({
    title: value.title,
    description: value.description,
  })
}, { immediate: true })

// const formatDate = (value?: string | Date | null) =>
//   value ? dayjs(value).format('YYYY 年 MM 月 DD 日') : ''
</script>

<template>
  <UContainer
    class="
      my-14 flex flex-col gap-12
      lg:flex-row
    "
  >
    <article class="min-w-0 flex-1 space-y-6">
      <header
        v-if="article"
        class="space-y-4"
      >
        <Motion
          as="div"
          :initial="{ y: 8, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ duration: 0.25 }"
        >
          <NuxtLink
            to="/blog"
            class="
              text-sm text-gray-500 underline-offset-4
              hover:text-gray-900 hover:underline
            "
          >
            ← 返回文章列表
          </NuxtLink>
        </Motion>
        <!-- <div class="flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span>
            {{ formatDate(article.date) }}
          </span>
        </div>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="tag in article.tags || []"
            :key="tag"
          >
            #{{ tag }}
          </UBadge>
        </div> -->
      </header>

      <Motion
        v-if="article"
        as="div"
        :initial="{ opacity: 0 }"
        :in-view="{ opacity: 1 }"
        :in-view-options="{ once: true }"
        :transition="{ duration: 0.25 }"
        class="space-y-4"
      >
        <ContentRenderer :value="article" />
      </Motion>
      <div v-else>
        <UCard>
          <template #header>
            未找到文章
          </template>
          <p class="text-sm text-gray-500">
            这篇文章可能已下线，可以返回列表看看其它内容。
          </p>
        </UCard>
      </div>
    </article>
  </UContainer>
</template>
