import { prisma } from '@fcos/database';
import { error, success } from '@fcos/contracts';
import type { Result } from '@fcos/contracts';

type AuthContext = {
  userId: string;
  organizationId: string;
  roles: string[];
};

export async function assignAcknowledgement(
  ctx: AuthContext,
  articleId: string,
  userId: string,
  version: number,
): Promise<Result<{ id: string }>> {
  const article = await prisma.article.findUnique({ where: { id: articleId } });
  if (!article || article.organizationId !== ctx.organizationId) {
    return error('not_found', 'Article not found.');
  }

  if (!ctx.roles.includes('ADMIN') && !ctx.roles.includes('FC_LEAD')) {
    return error('forbidden', 'Only admins and FC Leads can assign acknowledgements.');
  }

  const existing = await prisma.articleAcknowledgement.findUnique({
    where: { articleId_userId: { articleId, userId } },
  });

  if (existing) {
    return error('already_exists', 'Acknowledgement already assigned to this user.');
  }

  const record = await prisma.articleAcknowledgement.create({
    data: { articleId, userId, version },
  });

  return success({ id: record.id });
}

export async function completeAcknowledgement(
  ctx: AuthContext,
  articleId: string,
): Promise<Result<{ completedAt: Date }>> {
  const record = await prisma.articleAcknowledgement.findUnique({
    where: { articleId_userId: { articleId, userId: ctx.userId } },
  });

  if (!record) {
    return error('not_found', 'Acknowledgement not found or already completed.');
  }

  if (record.completedAt) {
    return error('already_completed', 'Already acknowledged.');
  }

  const updated = await prisma.articleAcknowledgement.update({
    where: { id: record.id },
    data: { completedAt: new Date() },
  });

  return success({ completedAt: updated.completedAt! });
}

export async function getPendingAcknowledgements(
  ctx: AuthContext,
): Promise<Result<any[]>> {
  const records = await prisma.articleAcknowledgement.findMany({
    where: {
      userId: ctx.userId,
      completedAt: null,
      article: { organizationId: ctx.organizationId },
    },
    include: {
      article: { select: { id: true, title: true, slug: true } },
    },
    orderBy: { id: 'asc' },
  });

  return success(records);
}

export async function getAcknowledgementStatus(
  ctx: AuthContext,
  articleId: string,
): Promise<Result<{ assigned: number; completed: number; users: any[] }>> {
  const article = await prisma.article.findUnique({ where: { id: articleId } });
  if (!article || article.organizationId !== ctx.organizationId) {
    return error('not_found', 'Article not found.');
  }

  const records = await prisma.articleAcknowledgement.findMany({
    where: { articleId },
    include: { user: { select: { id: true, name: true, email: true } } },
  });

  return success({
    assigned: records.length,
    completed: records.filter((r) => r.completedAt).length,
    users: records.map((r) => ({
      id: r.user.id,
      name: r.user.name,
      email: r.user.email,
      completed: r.completedAt !== null,
      completedAt: r.completedAt,
    })),
  });
}
