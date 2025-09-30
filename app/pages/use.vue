<script setup lang="ts">
const { data: readme } = await useAsyncData('use-readme', async () => {
  const items = await queryCollection('use').all()
  return items[0] || null
})
</script>

<template>
  <UContainer class="my-14 space-y-6">
    <header class="space-y-3">
      <h1 class="text-3xl font-semibold text-gray-900">
        我的工具与设备
      </h1>
      <p class="max-w-2xl text-sm text-gray-600">
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

    <UCard class="max-w-none">
      <template #header>
        <div class="text-base text-gray-500">
          README.md
        </div>
      </template>
      <ContentRenderer
        v-if="readme"
        :value="readme"
      />
      <p
        v-else
        class="text-sm text-gray-500"
      >
        正在加载 README...
      </p>
    </UCard>
  </UContainer>
</template>
