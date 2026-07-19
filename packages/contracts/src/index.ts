import { z } from 'zod';

export function success<T>(data: T) {
  return { ok: true as const, data };
}

export function error(code: string, message: string) {
  return { ok: false as const, error: { code, message } };
}

export type Success<T> = ReturnType<typeof success<T>>;
export type Failure = ReturnType<typeof error>;
export type Result<T> = Success<T> | Failure;

export const paginationParams = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

export const idParam = z.object({
  id: z.string().min(1),
});

export * from './wiki';
