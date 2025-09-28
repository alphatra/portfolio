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
    // Per-locale overrides (optional)
    title_en: z.string().optional(),
    description_en: z.string().optional(),
    title_de: z.string().optional(),
    description_de: z.string().optional(),
    title_it: z.string().optional(),
    description_it: z.string().optional(),
    title_zh: z.string().optional(),
    description_zh: z.string().optional(),
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

const profileCollection = defineCollection({
  type: 'data',
  schema: z.object({
    // Active CV variant key, e.g., "mobile" or "ai"
    variant: z.string().default('mobile'),
    // Map of variant -> URL
    cv: z.record(z.string().url()),
  }),
});

const profileAboutCollection = defineCollection({
  type: 'data',
  schema: z.object({
    view: z.enum(['classic', 'cv']).default('classic'),
    name: z.string(),
    specialty: z.record(z.string()).optional(),
    aboutMe: z.record(z.string()).optional(),
    links: z.object({
      github: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      facebook: z.string().url().optional(),
      website: z.string().url().optional(),
    }).optional(),
    contact: z.object({
      email: z.string().email().optional(),
      phone: z.string().optional(),
      address: z.string().optional(),
    }).optional(),
    experience: z.array(z.object({
      title: z.string(),
      company: z.string(),
      years: z.string(),
      desc: z.record(z.string()).optional(),
      icon: z.string().optional(),
    })).optional(),
    education: z.array(z.object({
      title: z.string(),
      institution: z.string(),
      degree: z.string().optional(),
      years: z.string(),
      icon: z.string().optional(),
    })).optional(),
    skills: z.array(z.string()).optional(),
    languages: z.array(z.object({
      name: z.record(z.string()).optional(),
      level: z.record(z.string()).optional(),
    })).optional(),
    projects: z.array(z.object({
      title: z.string(),
      stage: z.string().optional(),
      stack: z.array(z.string()).optional(),
      desc: z.record(z.string()).optional(),
      link: z.string().url().optional(),
    })).optional(),
    certificates: z.array(z.object({
      title: z.string(),
      issuer: z.string(),
      date: z.string(),
    })).optional(),
    softSkills: z.array(z.string()).optional(),
    interests: z.array(z.object({
      title: z.string(),
      desc: z.record(z.string()).optional(),
    })).optional(),
    gdpr: z.record(z.string()).optional(),
    achievements: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'projects': projectCollection,
  'profile': profileCollection,
  'profileAbout': profileAboutCollection,
}; 