import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
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
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
        },
      },
    },
    experimental: {
      nativeSqlite: true,
    },
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    preset: 'netlify-edge',
    routeRules: {
      '/': { prerender: true },
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
