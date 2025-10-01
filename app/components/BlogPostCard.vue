<script setup lang="ts">
import { Motion } from 'motion-v'

interface Post {
  title?: string
  description?: string
  date?: string | Date | null
  tags?: string[]
  path?: string | null
  _path?: string | null
  stem?: string | null
}

interface Props {
  post: Post
  index?: number
  variant?: 'grid' | 'list'
}

withDefaults(defineProps<Props>(), {
  index: 0,
  variant: 'grid',
})

const formatDate = (value?: string | Date | null) =>
  value ? dayjs(value).format('YYYY 年 MM 月 DD 日') : ''
</script>

<template>
  <Motion
    as-child
    :initial="{ y: variant === 'grid' ? 10 : 12, opacity: 0 }"
    :in-view="{ y: 0, opacity: 1 }"
    :in-view-options="{ once: true }"
    :transition="{
      duration: variant === 'grid' ? 0.2 : 0.3,
      delay: variant === 'grid' ? (index * 0.06) + 0.2 : index * 0.03,
    }"
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
        :while-tap="{ scale: 0.9 }"
        :while-press="{ scale: 0.95 }"
        :transition="{ duration: 0.12 }"
      >
        <!-- Grid 样式 (首页) -->
        <UCard
          v-if="variant === 'grid'"
          class="
            flex max-h-[280px] min-h-[200px] flex-col justify-between transition
            will-change-transform
            md:max-h-[300px] md:min-h-[220px]
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
                line-clamp-2 text-lg leading-tight font-semibold text-gray-900
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
                line-clamp-2 text-xs text-gray-600
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

        <!-- List 样式 (博客页) -->
        <article
          v-else
          class="
            max-h-[200px] min-h-[140px] rounded-2xl border border-gray-200 p-4
            transition will-change-transform
            hover:border-gray-300 hover:bg-gray-50/60
            md:max-h-[220px] md:min-h-[160px] md:p-6
            dark:border-gray-800 dark:hover:border-gray-700
            dark:hover:bg-gray-900/40
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
                line-clamp-2 text-lg font-semibold text-gray-900
                transition-colors
                group-hover:text-gray-600
                md:text-xl
                dark:text-white dark:group-hover:text-gray-300
              "
            >
              {{ post.title }}
            </h2>
            <span
              class="
                shrink-0 text-xs text-gray-400
                md:text-sm
                dark:text-gray-500
              "
            >
              {{ formatDate(post.date) }}
            </span>
          </div>
          <p
            class="
              mt-1.5 line-clamp-2 text-xs text-gray-600
              md:mt-2 md:text-sm
              dark:text-gray-400
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
</template>
