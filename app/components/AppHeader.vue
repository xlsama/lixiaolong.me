<script setup lang="ts">
import { Motion } from 'motion-v'

type NavLink = {
  label: string
  to: string
  exact?: boolean
}

const route = useRoute()
const isMenuOpen = ref(false)

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

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header
    class="
      sticky top-0 z-50 bg-white/80 shadow-sm backdrop-blur
      supports-[backdrop-filter]:bg-white/70
      dark:border-gray-800 dark:bg-black/60
    "
  >
    <div
      class="
        mx-auto flex h-16 max-w-7xl items-center justify-between px-4
        sm:px-6
        lg:px-8
      "
    >
      <!-- Left: Mobile menu button + Site title -->
      <div class="flex items-center gap-3">
        <!-- Mobile menu button -->
        <Motion
          as-child
          :while-hover="{ scale: 1.05 }"
          :while-tap="{ scale: 0.95 }"
          :while-press="{ scale: 0.95 }"
          :transition="{ duration: 0.12 }"
        >
          <UButton
            variant="ghost"
            color="neutral"
            size="xs"
            class="sm:hidden"
            aria-label="打开菜单"
            @click="isMenuOpen = true"
          >
            <UIcon
              name="i-lucide-menu"
              class="size-5"
            />
          </UButton>
        </Motion>

        <!-- Site title -->
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
              font-semibold tracking-wide text-gray-900
              hover:text-gray-600
              md:text-lg
              dark:text-white dark:hover:text-gray-300
            "
            aria-label="返回首页"
          >
            Li Xiaolong
          </NuxtLink>
        </Motion>
      </div>

      <!-- Right: Nav buttons + social icons -->
      <div
        class="
          flex items-center gap-4
          md:gap-5
        "
      >
        <!-- Navigation - hidden on mobile -->
        <div
          class="
            hidden items-center gap-2
            sm:flex
            md:gap-4
          "
        >
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
              :variant="isActiveLink(link) ? 'solid' : 'ghost'"
              :color="isActiveLink(link) ? 'neutral' : 'neutral'"
              class="
                w-[3.5rem] justify-center text-base font-medium
                sm:text-sm
              "
            >
              {{ link.label }}
            </UButton>
          </Motion>
        </div>

        <!-- Social icons -->
        <div
          class="
            flex items-center gap-2
            md:gap-4
          "
        >
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
                target="_blank"
                rel="noopener"
                :icon="item.icon"
                :ui="{
                  leadingIcon: item.label === 'X' ? 'size-4' : 'size-5',
                }"
              />
            </Motion>
          </UTooltip>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile navigation slideover -->
  <USlideover
    v-model:open="isMenuOpen"
    side="left"
    title="Li Xiaolong"
    :ui="{
      content: 'w-3/4 max-w-sm',
      wrapper: 'h-[100dvh]',
      body: 'pb-safe',
    }"
  >
    <template #body>
      <nav class="space-y-2">
        <UButton
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :variant="isActiveLink(link) ? 'solid' : 'link'"
          size="xl"
          block
          class="w-full justify-start text-left"
          @click="closeMenu"
        >
          {{ link.label }}
        </UButton>
      </nav>
    </template>
  </USlideover>
</template>
