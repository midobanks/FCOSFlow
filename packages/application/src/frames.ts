import { prisma } from '@fcos/database';
import { error, success } from '@fcos/contracts';
import type { Result } from '@fcos/contracts';

type AuthContext = { userId: string; organizationId: string; roles: string[] };

export async function createFrameCount(ctx: AuthContext, input: any): Promise<Result<any>> {
  const count = await prisma.frameCount.create({
    data: {
      organizationId: ctx.organizationId,
      frameTypeId: input.frameTypeId,
      fullCount: input.fullCount ?? 0,
      looseCount: input.looseCount ?? 0,
      damagedCount: input.damagedCount ?? 0,
      reservedCount: input.reservedCount ?? 0,
      unavailableCount: input.unavailableCount ?? 0,
      demand: input.demand,
      safetyBuffer: input.safetyBuffer,
      notes: input.notes,
      countedById: ctx.userId,
    },
  });
  return success(count);
}

export async function getLatestFrameCounts(ctx: AuthContext): Promise<Result<any>> {
  const types = await prisma.frameType.findMany({ where: { isActive: true } });
  const counts = await Promise.all(
    types.map(async (type: any) => {
      const latest = await prisma.frameCount.findFirst({
        where: { organizationId: ctx.organizationId, frameTypeId: type.id },
        orderBy: { countedAt: 'desc' },
      });
      return { ...type, latestCount: latest };
    }),
  );
  return success(counts);
}

export async function listFrameTypes(_ctx: AuthContext): Promise<Result<any>> {
  const types = await prisma.frameType.findMany({ where: { isActive: true } });
  return success(types);
}
