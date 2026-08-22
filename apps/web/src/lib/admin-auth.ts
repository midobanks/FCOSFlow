import { createHmac, timingSafeEqual } from 'node:crypto';
import { z } from 'zod';

const AUTH_COOKIE = 'admin_session';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

const envSchema = z.object({
  ADMIN_USERNAME: z.string().min(1, 'ADMIN_USERNAME is required'),
  ADMIN_PASSWORD: z.string().min(8, 'ADMIN_PASSWORD must be at least 8 characters'),
  ADMIN_SESSION_SECRET: z.string().min(16, 'ADMIN_SESSION_SECRET must be at least 16 characters'),
});

type AdminConfig = z.infer<typeof envSchema>;

let cachedConfig: AdminConfig | null = null;
let configErrorLogged = false;

function getConfig(): AdminConfig {
  if (cachedConfig) return cachedConfig;

  const parsed = envSchema.safeParse({
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_SESSION_SECRET: process.env.ADMIN_SESSION_SECRET,
  });

  if (!parsed.success) {
    if (!configErrorLogged) {
      console.error(
        '[admin-auth] Missing or invalid admin auth configuration:',
        parsed.error.issues.map((i) => i.path.join('.')).join(', '),
      );
      configErrorLogged = true;
    }
    throw new Error('Admin auth is not configured.');
  }

  cachedConfig = parsed.data;
  return parsed.data;
}

function sign(payload: string): string {
  return createHmac('sha256', getConfig().ADMIN_SESSION_SECRET).update(payload).digest('base64url');
}

export function validateCredentials(username: string, password: string): boolean {
  try {
    const config = getConfig();
    return username === config.ADMIN_USERNAME && password === config.ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

export function getAuthCookie(): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = String(expiresAt);
  const token = `${payload}.${sign(payload)}`;
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${AUTH_COOKIE}=${token}; path=/admin; max-age=${Math.floor(SESSION_TTL_MS / 1000)}; HttpOnly; SameSite=Strict${secure}`;
}

export function clearAuthCookie(): string {
  return `${AUTH_COOKIE}=; path=/admin; max-age=0; HttpOnly; SameSite=Strict`;
}

export function isAuthenticated(cookiesHeader: string | null): boolean {
  if (!cookiesHeader) return false;

  const match = cookiesHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${AUTH_COOKIE}=`));
  if (!match) return false;

  const token = match.slice(AUTH_COOKIE.length + 1);
  const separator = token.lastIndexOf('.');
  if (separator <= 0) return false;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return false;

  let expected: Buffer;
  let provided: Buffer;
  try {
    expected = Buffer.from(sign(payload), 'base64url');
    provided = Buffer.from(signature, 'base64url');
  } catch {
    return false;
  }

  if (expected.length !== provided.length) return false;
  return timingSafeEqual(expected, provided);
}
