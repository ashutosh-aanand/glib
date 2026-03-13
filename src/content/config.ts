import { defineCollection, z } from 'astro:content';

const difficultyEnum = z.enum(['Beginner', 'Intermediate', 'Advanced']);

const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    key: z.string().optional(),
    difficulty: difficultyEnum.optional(),
    tags: z.array(z.string()).default([]),
    videoUrl: z.string().url().optional()
  })
});

export const collections = {
  docs: docsCollection
};
