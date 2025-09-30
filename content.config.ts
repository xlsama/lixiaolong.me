import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      // Pull blog posts from the external GitHub repository `xlsama/notes`
      // See: https://content.nuxt.com/docs/collections/define#source
      source: {
        repository: 'https://github.com/xlsama/notes',
        include: 'blog/**/*.md',
        authToken: process.env.GITHUB_TOKEN,
      },
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string().or(z.date()).optional(),
        tags: z.array(z.string()).default([]),
        readingTime: z.number().optional(),
        cover: z.object({
          src: z.string(),
          alt: z.string().optional(),
        }).optional(),
      }),
    }),
    use: defineCollection({
      type: 'page',
      // Pull README.md from the external GitHub repository `xlsama/use`
      source: {
        repository: 'https://github.com/xlsama/use',
        include: 'README.md',
        authToken: process.env.GITHUB_TOKEN,
      },
    }),
  },
})
