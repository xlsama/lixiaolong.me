<script setup lang="ts">
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
    title="Li Xiaolong"
    class="
      sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur
      supports-[backdrop-filter]:bg-white/70
      dark:border-gray-800 dark:bg-black/60
    "
  >
    <template #left>
      <div class="flex items-center gap-1">
        <UButton
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          size="md"
          :variant="isActiveLink(link) ? 'solid' : 'ghost'"
          :color="isActiveLink(link) ? 'neutral' : 'neutral'"
          class="font-medium"
        >
          {{ link.label }}
        </UButton>
      </div>
    </template>
    <template #right>
      <div class="flex items-center gap-1">
        <UTooltip
          v-for="item in socialLinks"
          :key="item.label"
          :text="item.label"
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
        </UTooltip>
      </div>
    </template>
  </UHeader>
</template>
