import { prisma } from '@fcos/database';
import { error, success } from '@fcos/contracts';
import type { Result } from '@fcos/contracts';

type AuthContext = { userId: string; organizationId: string; roles: string[] };

export async function createIncident(ctx: AuthContext, input: any): Promise<Result<any>> {
  if (!input.incidentType || !['LTI', 'NM', 'PHI', 'MI'].includes(input.incidentType)) {
    return error('invalid_input', 'Invalid incident type.');
  }
  if (!input.submittedBy) {
    return error('invalid_input', 'Submitted by is required.');
  }

  try {
    const incident = await prisma.incident.create({
      data: {
        organizationId: ctx.organizationId,
        incidentType: input.incidentType,
        submittedBy: input.submittedBy,
        injuredPersonName: input.injuredPersonName ?? null,
        description: input.description ?? null,
        ambulanceOnSite: input.ambulanceOnSite ?? false,
        finishedShift: input.finishedShift ?? null,
        status: 'OPEN',
        ownerId: ctx.userId,
        dueTime: input.dueTime ? new Date(input.dueTime) : null,
      },
    });
    return success(incident);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to save incident.';
    return error('db_error', message);
  }
}

export async function getIncident(ctx: AuthContext, id: string): Promise<Result<any>> {
  const incident = await prisma.incident.findUnique({
    where: { id },
    include: { actions: true, qualityObservations: true },
  });
  if (!incident || incident.organizationId !== ctx.organizationId) return error('not_found', 'Incident not found.');
  return success(incident);
}

export async function updateIncidentStatus(ctx: AuthContext, id: string, status: string, notes?: string): Promise<Result<any>> {
  const incident = await prisma.incident.findUnique({ where: { id } });
  if (!incident || incident.organizationId !== ctx.organizationId) return error('not_found', 'Incident not found.');

  const updated = await prisma.incident.update({
    where: { id },
    data: { status: status as any, closureNotes: notes },
  });
  return success(updated);
}

export async function listIncidents(ctx: AuthContext, opts: any = {}): Promise<Result<any>> {
  const where: any = { organizationId: ctx.organizationId };
  if (opts.status) where.status = opts.status;
  if (opts.incidentType) where.incidentType = opts.incidentType;

  const incidents = await prisma.incident.findMany({
    where,
    include: { actions: true, owner: { select: { id: true, name: true } } },
    orderBy: { createdAt: 'desc' },
    take: opts.limit ?? 50,
  });
  return success(incidents);
}

export async function getIncidentDashboard(ctx: AuthContext): Promise<Result<any>> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [total, byType, byStatus] = await Promise.all([
    prisma.incident.count({ where: { organizationId: ctx.organizationId, createdAt: { gte: startOfMonth } } }),
    prisma.incident.groupBy({
      by: ['incidentType'],
      where: { organizationId: ctx.organizationId, createdAt: { gte: startOfMonth } },
      _count: { id: true },
    }),
    prisma.incident.groupBy({
      by: ['status'],
      where: { organizationId: ctx.organizationId, createdAt: { gte: startOfMonth } },
      _count: { id: true },
    }),
  ]);

  const types: Record<string, number> = { LTI: 0, NM: 0, PHI: 0, MI: 0 };
  for (const row of byType) {
    types[row.incidentType] = row._count.id;
  }

  const statuses: Record<string, number> = {};
  for (const row of byStatus) {
    statuses[row.status] = row._count.id;
  }

  return success({ total, types, statuses, month: now.toLocaleString('en-GB', { month: 'long', year: 'numeric' }) });
}

export async function createQualityObservation(ctx: AuthContext, input: any): Promise<Result<any>> {
  const obs = await prisma.qualityObservation.create({
    data: {
      organizationId: ctx.organizationId,
      sku: input.sku,
      location: input.location,
      issueType: input.issueType,
      severity: input.severity,
      quantity: input.quantity ?? 1,
      description: input.description,
      observedById: ctx.userId,
    },
  });
  return success(obs);
}

export async function listQualityObservations(ctx: AuthContext, opts: any = {}): Promise<Result<any>> {
  const where: any = { organizationId: ctx.organizationId };
  if (opts.issueType) where.issueType = opts.issueType;
  if (opts.sku) where.sku = opts.sku;

  const obs = await prisma.qualityObservation.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: opts.limit ?? 50,
  });
  return success(obs);
}

export async function getTopOffenders(ctx: AuthContext): Promise<Result<any>> {
  const obs = await prisma.qualityObservation.groupBy({
    by: ['sku'],
    where: { organizationId: ctx.organizationId },
    _count: { sku: true },
    _sum: { quantity: true },
    orderBy: { _count: { sku: 'desc' } },
    take: 10,
  });
  return success(obs);
}
