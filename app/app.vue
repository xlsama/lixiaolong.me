<script setup lang="ts">
import { zh_cn } from '@nuxt/ui/locale'
import { Motion } from 'motion-v'
</script>

<template>
  <UApp :locale="zh_cn">
    <NuxtLayout>
      <Motion
        :initial="{ y: -8, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 0.25 }"
        as-child
      >
        <AppHeader />
      </Motion>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
