import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    '@nuxt/content',
  ],
  imports: {
    presets: [{ from: 'dayjs', imports: [{ name: 'default', as: 'dayjs' }] }],
  },
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Li Xiaolong',
    },
  },
  css: ['~/assets/css/main.css'],
  content: {
    experimental: {
      nativeSqlite: true,
    },
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    prerender: {
      // Crawl links starting from entry pages to discover dynamic routes
      crawlLinks: true,
      // Ignore non-page asset links that may appear in content
      ignore: ['/Brewfile'],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: './app/assets/img',
    }],
  },
})
