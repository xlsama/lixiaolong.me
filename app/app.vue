<script setup lang="ts">
import { zh_cn } from '@nuxt/ui/locale'
import { motion } from 'motion-v'

const open = (url: string) => {
  window.open(url, '_blank')
}
</script>

<template>
  <UApp :locale="zh_cn">
    <motion.div
      :animate="{ opacity: 1, y: 0 }"
      :initial="{ opacity: 0, y: 10 }"
      :transition="{ ease: 'easeInOut' }"
    >
      <UContainer class="mt-30">
        <h1 class="text-4xl font-semibold">
          李小龙
        </h1>
        <div class="mt-10 space-y-10">
          <div class="flex items-center space-x-4">
            <motion.div
              :while-hover="{ scale: 1.1 }"
              :while-press="{ scale: 0.95 }"
            >
              <UIcon
                name="i-lucide-github"
                class="size-5"
                @click="open('https://github.com/xlsama')"
              />
            </motion.div>
            <motion.div
              :while-hover="{ scale: 1.1 }"
              :while-press="{ scale: 0.95 }"
            >
              <UIcon
                name="i-custom-x"
                class="size-4.5"
                @click="open('https://x.com/xlsama_')"
              />
            </motion.div>
          </div>
        </div>
      </UContainer>
    </motion.div>
  </UApp>
</template>
