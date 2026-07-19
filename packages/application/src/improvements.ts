import { prisma } from '@fcos/database';
import { error, success } from '@fcos/contracts';
import type { Result } from '@fcos/contracts';

type AuthContext = { userId: string; organizationId: string; roles: string[] };

export async function createImprovement(ctx: AuthContext, input: any): Promise<Result<any>> {
  const imp = await prisma.improvement.create({
    data: {
      organizationId: ctx.organizationId,
      title: input.title,
      problem: input.problem,
      proposedChange: input.proposedChange,
      expectedImpact: input.expectedImpact,
      ownerId: ctx.userId,
      baseline: input.baseline,
      target: input.target,
    },
  });
  return success(imp);
}

export async function listImprovements(ctx: AuthContext, opts: any = {}): Promise<Result<any>> {
  const where: any = { organizationId: ctx.organizationId };
  if (opts.status) where.status = opts.status;

  const items = await prisma.improvement.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    take: opts.limit ?? 50,
  });
  return success(items);
}

export async function updateImprovementResult(ctx: AuthContext, id: string, result: string, verified: boolean): Promise<Result<any>> {
  const imp = await prisma.improvement.findUnique({ where: { id } });
  if (!imp || imp.organizationId !== ctx.organizationId) return error('not_found', 'Improvement not found.');

  const updated = await prisma.improvement.update({
    where: { id },
    data: { result, benefitVerified: verified, status: 'CLOSED' },
  });
  return success(updated);
}
