import { prisma } from '@fcos/database';
import type { NextRequest } from 'next/server';

export type AuthContext = {
  userId: string;
  organizationId: string;
  siteId?: string;
  roles: string[];
};

let cached: AuthContext | null = null;

export async function getAuthContext(_req?: NextRequest): Promise<AuthContext> {
  if (cached) return cached;

  try {
    const [org, user] = await Promise.all([
      prisma.organization.findFirst({ where: { slug: 'fcos-flow' } }),
      prisma.user.findFirst({
        where: { email: 'admin@fcos.app' },
        include: { roles: { include: { role: true } } },
      }),
    ]);

    if (org && user) {
      cached = {
        userId: user.id,
        organizationId: org.id,
        roles: user.roles.map((ur) => ur.role.name),
      };
      return cached;
    }
  } catch (e) {
    console.error('Auth context DB lookup failed, using fallback:', e);
  }

  return {
    userId: 'system',
    organizationId: 'org_placeholder',
    roles: ['ADMIN'],
  };
}
