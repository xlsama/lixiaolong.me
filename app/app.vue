<script setup lang="ts">
import { zh_cn } from '@nuxt/ui/locale'
import { Motion } from 'motion-v'
</script>

<template>
  <UApp :locale="zh_cn">
    <NuxtLayout>
      <Motion
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 0.12 }"
        as-child
      >
        <AppHeader />
      </Motion>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
