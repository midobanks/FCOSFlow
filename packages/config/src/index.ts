import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string().min(32),
  AUTH_URL: z.string().url().optional(),
  REDIS_URL: z.string().url().optional(),
  STORAGE_BUCKET: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
});

export type Env = z.infer<typeof envSchema>;

let parsed: Env | undefined;

export function getEnv(): Env {
  if (!parsed) {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
      console.error('Invalid environment variables:', result.error.flatten());
      throw new Error('Invalid environment variables');
    }
    parsed = result.data;
  }
  return parsed;
}
