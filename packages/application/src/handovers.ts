import { prisma } from '@fcos/database';
import { error, success } from '@fcos/contracts';
import type { Result } from '@fcos/contracts';

type AuthContext = {
  userId: string;
  organizationId: string;
  siteId?: string;
  roles: string[];
};

export async function createHandover(
  ctx: AuthContext,
  input: { shiftId: string; notes?: string; riskSummary?: string; priorityActions?: string },
): Promise<Result<{ id: string }>> {
  const shift = await prisma.shift.findUnique({
    where: { id: input.shiftId },
    include: { site: true },
  });

  if (!shift || shift.site.organizationId !== ctx.organizationId) {
    return error('not_found', 'Shift not found.');
  }

  const existing = await prisma.shiftHandover.findFirst({
    where: { shiftId: input.shiftId, outgoingUserId: ctx.userId, status: 'PENDING' },
  });

  if (existing) {
    return error('already_exists', 'You already have a pending handover for this shift.');
  }

  const handover = await prisma.shiftHandover.create({
    data: {
      shiftId: input.shiftId,
      siteId: shift.siteId,
      outgoingUserId: ctx.userId,
      notes: input.notes,
      riskSummary: input.riskSummary,
      priorityActions: input.priorityActions,
      status: 'PENDING',
    },
  });

  return success({ id: handover.id });
}

export async function submitHandover(
  ctx: AuthContext,
  handoverId: string,
): Promise<Result<{ submittedAt: Date }>> {
  const handover = await prisma.shiftHandover.findUnique({ where: { id: handoverId } });
  if (!handover) {
    return error('not_found', 'Handover not found.');
  }
  if (handover.outgoingUserId !== ctx.userId && !ctx.roles.includes('ADMIN')) {
    return error('forbidden', 'Only the handover author can submit.');
  }
  if (handover.status !== 'PENDING') {
    return error('invalid_state', 'Handover is already submitted.');
  }

  const updated = await prisma.shiftHandover.update({
    where: { id: handoverId },
    data: { status: 'SUBMITTED', submittedAt: new Date() },
  });

  return success({ submittedAt: updated.submittedAt! });
}

export async function acknowledgeHandover(
  ctx: AuthContext,
  handoverId: string,
): Promise<Result<{ acknowledgedAt: Date }>> {
  const handover = await prisma.shiftHandover.findUnique({ where: { id: handoverId } });
  if (!handover) {
    return error('not_found', 'Handover not found.');
  }
  if (handover.status !== 'SUBMITTED') {
    return error('invalid_state', 'Handover must be submitted before acknowledgement.');
  }

  const updated = await prisma.shiftHandover.update({
    where: { id: handoverId },
    data: {
      status: 'ACKNOWLEDGED',
      incomingUserId: ctx.userId,
      acknowledgedAt: new Date(),
    },
  });

  return success({ acknowledgedAt: updated.acknowledgedAt! });
}

export async function addAmendment(
  ctx: AuthContext,
  handoverId: string,
  content: string,
): Promise<Result<{ id: string }>> {
  const handover = await prisma.shiftHandover.findUnique({ where: { id: handoverId } });
  if (!handover) {
    return error('not_found', 'Handover not found.');
  }

  const amendment = await prisma.shiftHandoverAmendment.create({
    data: {
      handoverId,
      userId: ctx.userId,
      content,
    },
  });

  return success({ id: amendment.id });
}

export async function getHandover(
  ctx: AuthContext,
  handoverId: string,
): Promise<Result<any>> {
  const handover = await prisma.shiftHandover.findUnique({
    where: { id: handoverId },
    include: {
      outgoingUser: { select: { id: true, name: true } },
      incomingUser: { select: { id: true, name: true } },
      shift: { select: { id: true, name: true, startTime: true } },
      amendments: {
        include: { user: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!handover) {
    return error('not_found', 'Handover not found.');
  }

  return success(handover);
}

export async function getHandoversBySite(
  ctx: AuthContext,
): Promise<Result<any[]>> {
  const siteId = ctx.siteId;
  if (!siteId) {
    return error('no_site', 'User is not assigned to a site.');
  }

  const handovers = await prisma.shiftHandover.findMany({
    where: { siteId },
    include: {
      outgoingUser: { select: { id: true, name: true } },
      shift: { select: { id: true, name: true, startTime: true } },
      _count: { select: { amendments: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return success(handovers);
}
