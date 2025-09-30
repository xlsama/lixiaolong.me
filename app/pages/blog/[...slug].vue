<script setup lang="ts">
const route = useRoute()

const slugParam = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value.join('/') : value
})

const articlePath = computed(() => `/blog/${slugParam.value || ''}`)

const { data: article } = await useAsyncData('blog-article', async () => {
  const entry = await queryCollection('blog').path(articlePath.value).first()
  if (!entry) {
    throw createError({ statusCode: 404, statusMessage: '文章不存在' })
  }
  return entry
}, {
  watch: [articlePath],
})

const { data: otherPosts } = await useAsyncData('blog-other-posts', async () => {
  const items = await queryCollection('blog')
    .select('title', 'path', 'date')
    .all()

  return items
    .sort((a, b) => {
      const aTime = a.date ? dayjs(a.date).valueOf() : 0
      const bTime = b.date ? dayjs(b.date).valueOf() : 0
      return bTime - aTime
    })
    .slice(0, 6)
})

const suggestions = computed(() => {
  if (!otherPosts.value?.length) return []
  return otherPosts.value
    .filter(post => getEntryPath(post) !== getEntryPath(article.value))
    .slice(0, 3)
})

watch(article, (value) => {
  if (!value) return
  useSeoMeta({
    title: value.title,
    description: value.description,
  })
}, { immediate: true })

const formatDate = (value?: string | Date | null) =>
  value ? dayjs(value).format('YYYY 年 MM 月 DD 日') : ''

const getEntryPath = (entry?: { path?: string | null, _path?: string | null } | null) =>
  entry?.path ?? entry?._path ?? ''
</script>

<template>
  <UContainer
    class="
      my-14 flex flex-col gap-12
      lg:flex-row
    "
  >
    <article class="min-w-0 flex-1 space-y-8">
      <header
        v-if="article"
        class="space-y-4"
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
        <p class="text-sm tracking-widest text-gray-400 uppercase">
          Blog
        </p>
        <h1 class="text-3xl leading-snug font-semibold text-gray-900">
          {{ article.title }}
        </h1>
        <div class="flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span>
            {{ formatDate(article.date) }}
          </span>
          <span v-if="article.readingTime">
            · 预计 {{ article.readingTime }} 分钟
          </span>
        </div>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="tag in article.tags || []"
            :key="tag"
          >
            #{{ tag }}
          </UBadge>
        </div>
      </header>

      <div
        v-if="article"
        class="space-y-4"
      >
        <ContentRenderer :value="article" />
      </div>
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

    <aside class="w-full max-w-xs space-y-6">
      <div class="space-y-4">
        <h2
          class="text-sm font-semibold tracking-widest text-gray-500 uppercase"
        >
          推荐阅读
        </h2>
        <div
          v-if="suggestions.length"
          class="flex flex-col gap-4"
        >
          <UCard
            v-for="post in suggestions"
            :key="getEntryPath(post)"
            class="border-gray-200"
          >
            <NuxtLink
              :to="getEntryPath(post)"
              class="
                block text-base font-semibold text-gray-900
                hover:text-gray-600
              "
            >
              {{ post.title }}
            </NuxtLink>
            <p class="mt-1 text-xs text-gray-400">
              {{ formatDate(post.date) }}
            </p>
          </UCard>
        </div>
        <p
          v-else
          class="text-sm text-gray-500"
        >
          暂无更多文章，稍后再来看看。
        </p>
      </div>
    </aside>
  </UContainer>
</template>
