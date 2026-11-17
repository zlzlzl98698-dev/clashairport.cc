import { defineCollection, z } from 'astro:content';

const articleSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  canonical: z.string().optional(),
  date: z.string().optional(),
  updatedDate: z.string().optional(),
  cover: z.string().optional(),
  category: z.string().optional(),
  author: z.string().optional(),
  head: z.any().optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
});

export const collections = {
  airport: defineCollection({ schema: articleSchema }),
  vpn: defineCollection({ schema: articleSchema }),
  clash: defineCollection({ schema: articleSchema }),
  resources: defineCollection({ schema: articleSchema }),
  brands: defineCollection({ schema: articleSchema }),
};
