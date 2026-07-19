import { prisma } from '@fcos/database';
import { error, success } from '@fcos/contracts';
import type { Result } from '@fcos/contracts';

type AuthContext = { userId: string; organizationId: string; roles: string[] };

export async function listWorkflows(ctx: AuthContext): Promise<Result<any>> {
  const workflows = await prisma.coldChainWorkflow.findMany({
    where: { organizationId: ctx.organizationId, isActive: true },
    include: { steps: { orderBy: { stepOrder: 'asc' } } },
  });
  return success(workflows);
}

export async function recordScan(ctx: AuthContext, input: any): Promise<Result<any>> {
  const scan = await prisma.coldChainScan.create({
    data: {
      organizationId: ctx.organizationId,
      stepId: input.stepId,
      userId: ctx.userId,
      deviceId: input.deviceId,
      shipmentRef: input.shipmentRef,
      location: input.location,
      temperature: input.temperature,
      isManual: input.isManual ?? false,
      notes: input.notes,
    },
  });
  return success(scan);
}

export async function getScanHistory(ctx: AuthContext, opts: any = {}): Promise<Result<any>> {
  const where: any = { organizationId: ctx.organizationId };
  const scans = await prisma.coldChainScan.findMany({
    where,
    orderBy: { scannedAt: 'desc' },
    take: opts.limit ?? 50,
  });
  return success(scans);
}
