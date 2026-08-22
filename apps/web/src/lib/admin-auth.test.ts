import { describe, it, expect, beforeAll } from 'vitest';
import { createHmac } from 'node:crypto';

process.env.ADMIN_USERNAME = 'testadmin';
process.env.ADMIN_PASSWORD = 'testpassword123';
process.env.ADMIN_SESSION_SECRET = 'test-secret-at-least-16-chars';

import { validateCredentials, getAuthCookie, clearAuthCookie, isAuthenticated } from './admin-auth';

describe('admin-auth', () => {
  beforeAll(() => {
    process.env.ADMIN_USERNAME = 'testadmin';
    process.env.ADMIN_PASSWORD = 'testpassword123';
    process.env.ADMIN_SESSION_SECRET = 'test-secret-at-least-16-chars';
  });

  it('validates credentials from env', () => {
    expect(validateCredentials('testadmin', 'testpassword123')).toBe(true);
    expect(validateCredentials('testadmin', 'wrong')).toBe(false);
    expect(validateCredentials('other', 'testpassword123')).toBe(false);
  });

  it('issues a signed cookie that authenticates', () => {
    const cookie = getAuthCookie();
    expect(cookie).toMatch(/^admin_session=.*max-age=28800.*HttpOnly.*SameSite=Strict/);
    expect(isAuthenticated(cookie)).toBe(true);
  });

  it('rejects tampered signatures', () => {
    const cookie = getAuthCookie();
    const token = cookie.split(';')[0]!.split('=')[1]!;
    const [payload] = token.split('.');
    const forged = `admin_session=${payload}.${'A'.repeat(43)}`;
    expect(isAuthenticated(forged)).toBe(false);
  });

  it('rejects expired sessions', () => {
    const secret = process.env.ADMIN_SESSION_SECRET!;
    const expiredPayload = String(Date.now() - 3600000);
    const sig = createHmac('sha256', secret).update(expiredPayload).digest('base64url');
    expect(isAuthenticated(`admin_session=${expiredPayload}.${sig}`)).toBe(false);
  });

  it('rejects empty cookie header', () => {
    expect(isAuthenticated(null)).toBe(false);
    expect(isAuthenticated('')).toBe(false);
  });

  it('clears the cookie', () => {
    expect(clearAuthCookie()).toMatch(/max-age=0/);
  });
});
