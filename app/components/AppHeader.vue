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

// Touch gesture support with VueUse
const { direction, lengthX, coordsStart } = useSwipe(document, {
  passive: true,
  onSwipe() {
    // Swipe from left edge (< 50px) to right with at least 50px movement
    if (
      direction.value === 'right'
      && coordsStart.x < 50
      && lengthX.value > 50
    ) {
      isMenuOpen.value = true
    }
  },
})
</script>

<template>
  <header
    class="
      sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur
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
          flex items-center gap-1
          md:gap-2
        "
      >
        <!-- Navigation - hidden on mobile -->
        <div
          class="
            hidden items-center gap-0.5
            sm:flex
            md:gap-1
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
                w-[3rem] justify-center text-[0.6875rem] font-medium
                md:w-[4.5rem] md:text-sm
              "
              size="xs"
            >
              {{ link.label }}
            </UButton>
          </Motion>
        </div>

        <!-- Social icons -->
        <div
          class="
            flex items-center gap-0.5
            md:gap-1
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
                size="xs"
                target="_blank"
                rel="noopener"
              >
                <UIcon
                  :name="item.icon"
                  class="
                    size-3
                    md:size-4
                  "
                />
              </UButton>
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
    :ui="{ content: 'w-3/4 max-w-sm' }"
  >
    <template #body>
      <nav class="space-y-2">
        <UButton
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :variant="isActiveLink(link) ? 'solid' : 'soft'"
          :color="isActiveLink(link) ? 'neutral' : 'neutral'"
          size="lg"
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
