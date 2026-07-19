import { prisma } from '@fcos/database';
import { error, success } from '@fcos/contracts';
import type { Result } from '@fcos/contracts';

type AuthContext = {
  userId: string;
  organizationId: string;
  roles: string[];
};

export async function submitSuggestion(
  ctx: AuthContext,
  articleId: string,
  content: Record<string, unknown>,
): Promise<Result<{ id: string }>> {
  const article = await prisma.article.findUnique({ where: { id: articleId } });
  if (!article || article.organizationId !== ctx.organizationId) {
    return error('not_found', 'Article not found.');
  }

  const suggestion = await prisma.articleSuggestion.create({
    data: {
      articleId,
      userId: ctx.userId,
      content: content as any,
      status: 'OPEN',
    },
  });

  return success({ id: suggestion.id });
}

export async function getArticleSuggestions(
  ctx: AuthContext,
  articleId: string,
): Promise<Result<any[]>> {
  const article = await prisma.article.findUnique({ where: { id: articleId } });
  if (!article || article.organizationId !== ctx.organizationId) {
    return error('not_found', 'Article not found.');
  }

  const suggestions = await prisma.articleSuggestion.findMany({
    where: { articleId },
    include: { user: { select: { id: true, name: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return success(suggestions);
}
