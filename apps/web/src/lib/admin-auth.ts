const ADMIN_USERNAME = 'masterclass';
const ADMIN_PASSWORD = 'qwerty@007';
const AUTH_COOKIE = 'admin_session';
const AUTH_VALUE = 'authenticated';

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function getAuthCookie(): string {
  return `${AUTH_COOKIE}=${AUTH_VALUE}; path=/admin; max-age=28800; SameSite=Strict`;
}

export function clearAuthCookie(): string {
  return `${AUTH_COOKIE}=; path=/admin; max-age=0; SameSite=Strict`;
}

export function isAuthenticated(cookies: string | null): boolean {
  if (!cookies) return false;
  return cookies.split(';').some((c) => c.trim() === `${AUTH_COOKIE}=${AUTH_VALUE}`);
}
