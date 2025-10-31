<script setup lang="ts">
import { Motion } from 'motion-v'

// 使用 VueUse 的 useWindowScroll 来监听滚动
const { y } = useWindowScroll()

// 当滚动超过 300px 时显示按钮
const isVisible = computed(() => y.value > 300)

// 平滑滚动到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'instant',
  })
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-4 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-4 opacity-0"
  >
    <div
      v-if="isVisible"
      class="
        fixed right-4 bottom-8 z-40
        sm:right-8
      "
    >
      <Motion
        as-child
        :while-hover="{ scale: 1.1 }"
        :while-tap="{ scale: 0.9 }"
        :transition="{ duration: 0.08 }"
      >
        <UButton
          color="neutral"
          variant="solid"
          size="xl"
          square
          icon="i-lucide-arrow-up"
          aria-label="回到顶部"
          class="
            flex items-center justify-center rounded-full text-center shadow-lg
          "
          @click="scrollToTop"
        />
      </Motion>
    </div>
  </Transition>
</template>
