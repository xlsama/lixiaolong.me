<script setup lang="ts">
import { zh_cn } from '@nuxt/ui/locale'
</script>

<template>
  <NuxtLayout>
    <UApp :locale="zh_cn">
      <AppHeader />
    </UApp>

    <NuxtPage />
  </NuxtLayout>
</template>
