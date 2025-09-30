import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    home: defineCollection({
      type: 'page',
      source: 'index.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        hero: z.object({
          title: z.string(),
          subtitle: z.string().optional(),
          cta: z.string().optional(),
        }).optional(),
      }),
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
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
  },
})
