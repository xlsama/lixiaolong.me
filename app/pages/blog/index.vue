<script setup lang="ts">
import { Motion } from 'motion-v'

const { data: posts } = await useAsyncData('blog-posts', async () => {
  const items = await queryCollection('blog')
    .select('title', 'description', 'path', 'date', 'tags')
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
        "
      >
        所有文章
      </h1>
    </header>

    <div
      v-if="posts?.length"
      class="
        space-y-4
        md:space-y-6
      "
    >
      <Motion
        v-for="(post, i) in posts"
        :key="getEntryPath(post)"
        as-child
        :initial="{ y: 12, opacity: 0 }"
        :in-view="{ y: 0, opacity: 1 }"
        :in-view-options="{ once: true }"
        :transition="{ duration: 0.3, delay: i * 0.03 }"
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
            <article
              class="
                rounded-2xl border border-gray-200 p-4 transition
                will-change-transform
                hover:border-gray-300 hover:bg-gray-50/60
                md:p-6
              "
            >
              <div
                class="
                  flex flex-col gap-1.5
                  md:flex-row md:items-center md:justify-between md:gap-2
                "
              >
                <h2
                  class="
                    text-lg font-semibold text-gray-900 transition-colors
                    group-hover:text-gray-600
                    md:text-xl
                  "
                >
                  {{ post.title }}
                </h2>
                <span
                  class="
                    text-xs text-gray-400
                    md:text-sm
                  "
                >
                  {{ formatDate(post.date) }}
                </span>
              </div>
              <p
                class="
                  mt-1.5 text-xs text-gray-600
                  md:mt-2 md:text-sm
                "
              >
                {{ post.description }}
              </p>
              <div
                class="
                  mt-3 flex flex-wrap items-center gap-1.5
                  md:mt-4 md:gap-2
                "
              >
                <UBadge
                  v-for="tag in post.tags || []"
                  :key="tag"
                  color="neutral"
                  variant="soft"
                  class="text-xs"
                >
                  #{{ tag }}
                </UBadge>
              </div>
            </article>
          </Motion>
        </NuxtLink>
      </Motion>
    </div>

    <p
      v-else
      class="text-sm text-gray-500"
    >
      暂时还没有文章，敬请期待。
    </p>
  </UContainer>
</template>
