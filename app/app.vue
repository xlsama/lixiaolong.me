<script setup lang="ts">
import { zh_cn } from '@nuxt/ui/locale'
import { Motion } from 'motion-v'
</script>

<template>
  <UApp :locale="zh_cn">
    <NuxtLoadingIndicator color="hsl(210, 100%, 70%)" :height="2" />
    <NuxtLayout>
      <Motion
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 0.08 }"
        as-child
      >
        <AppHeader />
      </Motion>
      <NuxtPage />
      <BackToTop />
    </NuxtLayout>
  </UApp>
</template>
