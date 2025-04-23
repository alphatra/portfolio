import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    // Optional fields
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    projectUrl: z.string().url().optional(),
    repositoryUrl: z.string().url().optional(),
    image: z.string().optional(), // Path to project image
    tags: z.array(z.string()).optional(),
    pubDate: z.date(), // Date project was published or last updated
  }),
});

export const collections = {
  'blog': blogCollection,
  'projects': projectCollection,
}; 