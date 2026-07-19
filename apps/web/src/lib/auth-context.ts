import { prisma } from '@fcos/database';
import type { NextRequest } from 'next/server';

export type AuthContext = {
  userId: string;
  organizationId: string;
  siteId?: string;
  roles: string[];
};

let cachedPromise: Promise<AuthContext> | null = null;

export function getAuthContext(_req?: NextRequest): Promise<AuthContext> {
  if (!cachedPromise) {
    cachedPromise = resolveAuthContext();
  }
  return cachedPromise;
}

async function resolveAuthContext(): Promise<AuthContext> {
  const [org, user] = await Promise.all([
    prisma.organization.findFirst({ where: { slug: 'fcos-flow' } }),
    prisma.user.findFirst({
      where: { email: 'admin@fcos.app' },
      include: { roles: { include: { role: true } } },
    }),
  ]);

  if (!org || !user) {
    return {
      userId: 'system',
      organizationId: 'org_placeholder',
      roles: ['ADMIN'],
    };
  }

  return {
    userId: user.id,
    organizationId: org.id,
    roles: user.roles.map((ur) => ur.role.name),
  };
}
