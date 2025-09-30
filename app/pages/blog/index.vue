<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-posts', async () => {
  const items = await queryCollection('blog')
    .select('title', 'description', 'path', 'date', 'tags', 'readingTime')
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
  <UContainer class="my-14 space-y-10">
    <header class="space-y-3">
      <h1 class="text-3xl font-semibold text-gray-900">
        所有文章
      </h1>
      <p class="max-w-2xl text-gray-600">
        按时间排序的文章列表，涵盖前端开发、效率提升以及个人随笔。
      </p>
    </header>

    <div
      v-if="posts?.length"
      class="space-y-6"
    >
      <article
        v-for="post in posts"
        :key="getEntryPath(post)"
        class="
          rounded-2xl border border-gray-200 p-6 transition
          hover:border-gray-300 hover:bg-gray-50/60
        "
      >
        <div
          class="
            flex flex-col gap-2
            md:flex-row md:items-center md:justify-between
          "
        >
          <NuxtLink
            :to="getEntryPath(post)"
            class="
              text-xl font-semibold text-gray-900
              hover:text-gray-600
            "
          >
            {{ post.title }}
          </NuxtLink>
          <span class="text-sm text-gray-400">
            {{ formatDate(post.date) }}
          </span>
        </div>
        <p class="mt-2 text-sm text-gray-600">
          {{ post.description }}
        </p>
        <div class="mt-4 flex flex-wrap items-center gap-2">
          <UBadge
            v-for="tag in post.tags || []"
            :key="tag"
            color="neutral"
            variant="soft"
          >
            #{{ tag }}
          </UBadge>
          <span
            v-if="post.readingTime"
            class="text-xs text-gray-400"
          >
            预计 {{ post.readingTime }} 分钟
          </span>
        </div>
      </article>
    </div>

    <p
      v-else
      class="text-sm text-gray-500"
    >
      暂时还没有文章，敬请期待。
    </p>
  </UContainer>
</template>
