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
      my-8 space-y-4
      md:my-14 md:space-y-6
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
          :while-tap="{ scale: 0.9 }"
          :while-press="{ scale: 0.95 }"
          :transition="{ duration: 0.12 }"
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
        下方内容来自仓库
        <a
          href="https://github.com/xlsama/use"
          target="_blank"
          rel="noopener"
          class="underline"
        >
          xlsama/use
        </a>
        的 README.md。
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
  </UContainer>
</template>
