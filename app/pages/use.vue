<script setup lang="ts">
import { Motion } from 'motion-v'

const { data: readme } = await useAsyncData('use-readme', async () => {
  const items = await queryCollection('use').all()
  return items[0] || null
})
</script>

<template>
  <UContainer
    class="
      my-8 flex flex-col gap-8
      md:my-14 md:gap-12
      lg:flex-row
    "
  >
    <main
      class="
        min-w-0 flex-1 space-y-4
        md:space-y-6
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
          </Motion>
          I am using.
        </h1>
        <p
          class="
            max-w-2xl text-xs text-gray-600
            md:text-sm
            dark:text-gray-400
          "
        >
          下方内容来自仓库:
          <a
            href="https://github.com/xlsama/use"
            target="_blank"
            rel="noopener"
            class="underline"
          >
            xlsama/use
          </a>
        </p>
      </header>

      <Motion
        as-child
        :initial="{ y: 12, opacity: 0 }"
        :in-view="{ y: 0, opacity: 1 }"
        :in-view-options="{ once: true }"
        :transition="{ duration: 0.28 }"
      >
        <UCard class="max-w-none transition will-change-transform">
          <template #header>
            <div
              class="
                text-sm text-gray-500
                md:text-base
                dark:text-gray-400
              "
            >
              README.md
            </div>
          </template>
          <ContentRenderer
            v-if="readme"
            :value="readme"
          />
          <p
            v-else
            class="
              text-xs text-gray-500
              md:text-sm
              dark:text-gray-400
            "
          >
            正在加载 README...
          </p>
        </UCard>
      </Motion>
    </main>

    <!-- 目录（仅在大屏显示） -->
    <aside
      v-if="readme?.body?.toc?.links?.length"
      class="
        hidden
        lg:block lg:w-64 lg:shrink-0
      "
    >
      <UContentToc
        :links="readme.body.toc.links"
        title="目录"
        highlight
        class="lg:sticky lg:top-24"
      />
    </aside>
  </UContainer>
</template>
