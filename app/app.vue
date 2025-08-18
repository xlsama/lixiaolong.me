<script setup lang="ts">
import { zh_cn } from '@nuxt/ui/locale'

const open = (url: string) => {
  window.open(url, '_blank')
}
</script>

<template>
  <UApp :locale="zh_cn">
    <UContainer class="mt-30">
      <h1 class="text-4xl font-semibold">
        李小龙
      </h1>
      <div class="mt-10 space-y-10">
        <div class="flex items-center space-x-4">
          <UIcon
            name="i-lucide-github"
            class="
              size-5 text-black transition-all
              hover:scale-110
              active:scale-95
            "
            @click="open('https://github.com/xlsama')"
          />
          <UIcon
            name="i-custom-x"
            class="
              size-4.5 text-black transition-all
              hover:scale-110
              active:scale-95
            "
            @click="open('https://x.com/xlsama_')"
          />
        </div>
      </div>
    </UContainer>
  </UApp>
</template>
