<script setup lang="ts">
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
      <h1 class="max-w-2xl text-4xl leading-tight font-semibold text-gray-900">
        嗨，我是小龙
      </h1>
      <p class="max-w-2xl text-lg text-gray-600">
        欢迎来到我的博客。
      </p>
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
        <UCard
          v-for="post in posts"
          :key="getEntryPath(post)"
          class="flex flex-col justify-between"
        >
          <div class="space-y-3">
            <p class="text-xs tracking-wide text-gray-400 uppercase">
              {{ formatDate(post.date) }}
            </p>
            <NuxtLink
              :to="getEntryPath(post)"
              class="
                block text-xl leading-tight font-semibold text-gray-900
                hover:text-gray-600
              "
            >
              {{ post.title }}
            </NuxtLink>
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
