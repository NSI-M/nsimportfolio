import { defineCollection, z } from '@nuxt/content'

// Export collections
export const collections = {
  // Define collection using `defineCollection` utility
  news: defineCollection({
    // Specify the type of content in this collection
    type: 'page',
    // Load every file matching this pattern
    source: 'news/**/*.md',
    // Define custom schema for this collection
    schema: z.object({
      date: z.date(),
      image: z.object({
        src: z.string(),
        alt: z.string()
      }),
      badge: z.string()
    })
  }),
  diary: defineCollection({
    // Specify the type of content in this collection
    type: 'page',
    // Load every file matching this pattern
    source: 'diary/*.md',
    // Define custom schema for this collection
    schema: z.object({
      price: z.string(),
      date: z.date(),
      image: z.object({
        src: z.string(),
        alt: z.string()
      }),
      image2: z.object({
        src: z.string(),
        alt: z.string()
      }),
      badge: z.string()
    })
  }),
  items: defineCollection({
    // Specify the type of content in this collection
    type: 'page',
    // Load every file matching this pattern
    source: 'items/**/*.md',
    // Define custom schema for this collection
    schema: z.object({
      price: z.string(),
      image: z.object({
        src: z.string(),
        alt: z.string()
      }),
      image2: z.object({
        src: z.string(),
        alt: z.string()
      }),
      badge: z.string()
    })
  }),
  coll: defineCollection({
    // Specify the type of content in this collection
    type: 'page',
    // Load every file matching this pattern
    source: 'items/2027ss/*.md',
    // Define custom schema for this collection
    schema: z.object({
      price: z.string(),
      image: z.object({
        src: z.string(),
        alt: z.string()
      }),
      image2: z.object({
        src: z.string(),
        alt: z.string()
      }),
      badge: z.string()
    })
  })
  
}
