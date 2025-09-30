<script setup lang="ts">
import { Motion } from 'motion-v'

type NavLink = {
  label: string
  to: string
  exact?: boolean
}

const route = useRoute()

const navLinks: NavLink[] = [
  { label: 'Home', to: '/', exact: true },
  { label: 'Blog', to: '/blog' },
  { label: 'Use', to: '/use' },
]

const socialLinks = [
  {
    icon: 'i-lucide-github',
    label: 'GitHub',
    href: 'https://github.com/xlsama',
  },
  {
    icon: 'i-custom-x',
    label: 'X',
    href: 'https://x.com/xlsama_',
  },
]

const isActiveLink = (link: NavLink) => (
  link.exact ? route.path === link.to : route.path.startsWith(link.to)
)
</script>

<template>
  <UHeader
    class="
      sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur
      supports-[backdrop-filter]:bg-white/70
      dark:border-gray-800 dark:bg-black/60
    "
  >
    <!-- Left: Clickable site title -->
    <template #left>
      <Motion
        as-child
        :while-hover="{ scale: 1.05 }"
        :while-tap="{ scale: 0.95 }"
        :while-press="{ scale: 0.95 }"
        :transition="{ duration: 0.12 }"
      >
        <NuxtLink
          to="/"
          class="
            text-base font-semibold tracking-wide text-gray-900
            hover:text-gray-600
            md:text-lg
          "
          aria-label="返回首页"
        >
          Li Xiaolong
        </NuxtLink>
      </Motion>
    </template>

    <!-- Right: Nav buttons with equal width + social icons -->
    <template #right>
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1">
          <Motion
            v-for="link in navLinks"
            :key="link.to"
            as-child
            :while-hover="{ scale: 1.05 }"
            :while-tap="{ scale: 0.95 }"
            :while-press="{ scale: 0.95 }"
            :transition="{ duration: 0.12 }"
          >
            <UButton
              :to="link.to"
              size="md"
              :variant="isActiveLink(link) ? 'solid' : 'ghost'"
              :color="isActiveLink(link) ? 'neutral' : 'neutral'"
              class="w-[4.5rem] justify-center font-medium"
            >
              {{ link.label }}
            </UButton>
          </Motion>
        </div>

        <div class="flex items-center gap-1">
          <UTooltip
            v-for="item in socialLinks"
            :key="item.label"
            :text="item.label"
          >
            <Motion
              as-child
              :while-hover="{ scale: 1.05 }"
              :while-tap="{ scale: 0.95 }"
              :while-press="{ scale: 0.95 }"
              :transition="{ duration: 0.12 }"
            >
              <UButton
                :to="item.href"
                variant="ghost"
                color="neutral"
                size="md"
                target="_blank"
                rel="noopener"
              >
                <UIcon
                  :name="item.icon"
                  class="size-4"
                />
              </UButton>
            </Motion>
          </UTooltip>
        </div>
      </div>
    </template>
  </UHeader>
</template>
