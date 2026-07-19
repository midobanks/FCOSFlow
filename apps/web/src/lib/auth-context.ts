import type { NextRequest } from 'next/server';

export type AuthContext = {
  userId: string;
  organizationId: string;
  siteId?: string;
  roles: string[];
};

export function getAuthContext(_req: NextRequest): AuthContext {
  return {
    userId: 'system',
    organizationId: 'org_placeholder',
    roles: ['ADMIN'],
  };
}
