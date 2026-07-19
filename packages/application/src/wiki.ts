import { prisma } from '@fcos/database';
import { Prisma } from '@prisma/client';
import { canTransition, type ArticleSnapshot, type ArticleVersionSnapshot } from '@fcos/domain';
import type { CreateArticleInput, UpdateArticleInput } from '@fcos/contracts';
import type { Result } from '@fcos/contracts';
import { error, success } from '@fcos/contracts';

function toJsonValue(content: Record<string, unknown>): Prisma.InputJsonValue {
  return content as Prisma.InputJsonValue;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 200);
}

type AuthContext = {
  userId: string;
  organizationId: string;
  siteId?: string;
  roles: string[];
};

function canCreateArticle(_ctx: AuthContext, _input: CreateArticleInput): boolean {
  return true;
}

function canUpdateArticle(ctx: AuthContext, article: ArticleSnapshot): boolean {
  if (article.organizationId !== ctx.organizationId) return false;
  if (article.status === 'PUBLISHED' || article.status === 'SUPERSEDED' || article.status === 'ARCHIVED') return false;
  if (article.ownerId === ctx.userId) return true;
  return ctx.roles.includes('ADMIN') || ctx.roles.includes('FC_LEAD');
}

function canReadArticle(ctx: AuthContext, article: ArticleSnapshot): boolean {
  if (article.organizationId !== ctx.organizationId) return false;
  if (article.status === 'PUBLISHED') return true;
  if (article.ownerId === ctx.userId) return true;
  return ctx.roles.includes('ADMIN') || ctx.roles.includes('FC_LEAD');
}

function canReviewArticle(ctx: AuthContext, article: ArticleSnapshot): boolean {
  if (article.organizationId !== ctx.organizationId) return false;
  if (article.status !== 'IN_REVIEW') return false;
  return ctx.roles.includes('ADMIN') || ctx.roles.includes('FC_LEAD') || ctx.roles.includes('PROCESS_OWNER');
}

export async function createArticle(
  ctx: AuthContext,
  input: CreateArticleInput,
): Promise<Result<ArticleSnapshot>> {
  if (!canCreateArticle(ctx, input)) {
    return error('forbidden', 'You do not have permission to create articles.');
  }

  const slug = slugify(input.title);
  const existing = await prisma.article.findUnique({
    where: { organizationId_slug: { organizationId: ctx.organizationId, slug } },
  });
  if (existing) {
    return error('slug_conflict', 'An article with this title already exists.');
  }

  const article = await prisma.article.create({
    data: {
      organizationId: ctx.organizationId,
      siteId: input.siteId ?? ctx.siteId,
      title: input.title,
      slug,
      summary: input.summary ?? null,
      articleType: input.articleType,
      processArea: input.processArea ?? null,
      governanceLevel: input.governanceLevel ?? 'LOCAL',
      ownerId: ctx.userId,
      language: input.language ?? 'en',
      versions: {
        create: {
          version: 1,
          content: toJsonValue(input.content),
          status: 'DRAFT',
          createdById: ctx.userId,
        },
      },
    },
    include: { versions: false },
  });

  return success(mapArticle(article));
}

export async function updateArticle(
  ctx: AuthContext,
  articleId: string,
  input: UpdateArticleInput,
): Promise<Result<ArticleSnapshot>> {
  const article = await prisma.article.findUnique({ where: { id: articleId } });
  if (!article) {
    return error('not_found', 'Article not found.');
  }

  if (!canUpdateArticle(ctx, mapArticle(article))) {
    return error('forbidden', 'You do not have permission to update this article.');
  }

  const latestVersion = await prisma.articleVersion.findFirst({
    where: { articleId },
    orderBy: { version: 'desc' },
  });

  const nextVersion = (latestVersion?.version ?? 0) + 1;

  const updated = await prisma.article.update({
    where: { id: articleId },
    data: {
      title: input.title,
      summary: input.summary,
      articleType: input.articleType,
      processArea: input.processArea,
      governanceLevel: input.governanceLevel,
      language: input.language,
      versions: {
        create: {
          version: nextVersion,
          content: input.content ? toJsonValue(input.content) : (latestVersion?.content ?? {}),
          changeNotes: input.changeNotes ?? null,
          status: 'DRAFT',
          createdById: ctx.userId,
        },
      },
    },
  });

  return success(mapArticle(updated));
}

export async function getArticle(
  ctx: AuthContext,
  articleId: string,
  version?: number,
): Promise<Result<{ article: ArticleSnapshot; version: ArticleVersionSnapshot }>> {
  const article = await prisma.article.findUnique({ where: { id: articleId } });
  if (!article) {
    return error('not_found', 'Article not found.');
  }

  if (!canReadArticle(ctx, mapArticle(article))) {
    return error('forbidden', 'You do not have permission to view this article.');
  }

  const versionRecord = version
    ? await prisma.articleVersion.findUnique({
        where: { articleId_version: { articleId, version } },
      })
    : await prisma.articleVersion.findFirst({
        where: { articleId },
        orderBy: { version: 'desc' },
      });

  if (!versionRecord) {
    return error('not_found', 'Version not found.');
  }

  return success({
    article: mapArticle(article),
    version: mapArticleVersion(versionRecord),
  });
}

export async function submitForReview(
  ctx: AuthContext,
  articleId: string,
  changeNotes?: string,
): Promise<Result<ArticleSnapshot>> {
  const article = await prisma.article.findUnique({ where: { id: articleId } });
  if (!article) {
    return error('not_found', 'Article not found.');
  }

  if (!canTransition(article.status as any, 'IN_REVIEW')) {
    return error('invalid_state', `Cannot submit an article in status ${article.status} for review.`);
  }

  if (!canUpdateArticle(ctx, mapArticle(article))) {
    return error('forbidden', 'You do not have permission to submit this article.');
  }

  const updated = await prisma.article.update({
    where: { id: articleId },
    data: { status: 'IN_REVIEW' },
  });

  return success(mapArticle(updated));
}

export async function reviewArticle(
  ctx: AuthContext,
  articleId: string,
  decision: 'approved' | 'changes_requested' | 'rejected',
  notes?: string,
): Promise<Result<ArticleSnapshot>> {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    include: {
      versions: {
        orderBy: { version: 'desc' },
        take: 1,
      },
    },
  });

  if (!article) {
    return error('not_found', 'Article not found.');
  }

  if (!canReviewArticle(ctx, mapArticle(article))) {
    return error('forbidden', 'You do not have permission to review this article.');
  }

  const latestVersion = article.versions[0];

  if (decision === 'approved') {
    if (!canTransition(article.status as any, 'PUBLISHED')) {
      return error('invalid_state', `Cannot approve an article in status ${article.status}.`);
    }

    const previousPublished = await prisma.article.findFirst({
      where: { id: articleId },
      include: {
        versions: {
          where: { status: 'PUBLISHED' },
          orderBy: { version: 'desc' },
          take: 1,
        },
      },
    });

    const prevPubVersion = previousPublished?.versions[0];
    if (prevPubVersion) {
      await prisma.articleVersion.update({
        where: { id: prevPubVersion.id },
        data: { status: 'SUPERSEDED' },
      });
    }

    const now = new Date();
    const reviewDate = new Date(now);
    reviewDate.setFullYear(reviewDate.getFullYear() + 1);

    if (latestVersion) {
      await prisma.articleVersion.update({
        where: { id: latestVersion.id },
        data: { status: 'PUBLISHED' },
      });
    }

    const updated = await prisma.article.update({
      where: { id: articleId },
      data: {
        status: 'PUBLISHED',
        effectiveDate: now,
        reviewDate: reviewDate,
      },
    });

    return success(mapArticle(updated));
  }

  if (decision === 'changes_requested' || decision === 'rejected') {
    if (!canTransition(article.status as any, 'DRAFT')) {
      return error('invalid_state', `Cannot send an article in status ${article.status} back to draft.`);
    }

    const updated = await prisma.article.update({
      where: { id: articleId },
      data: { status: 'DRAFT' },
    });

    return success(mapArticle(updated));
  }

  return error('invalid_input', `Unknown decision: ${decision}`);
}

export async function deleteArticle(
  ctx: AuthContext,
  articleId: string,
): Promise<Result<{ id: string }>> {
  const article = await prisma.article.findUnique({ where: { id: articleId } });
  if (!article) {
    return error('not_found', 'Article not found.');
  }

  if (article.organizationId !== ctx.organizationId) {
    return error('forbidden', 'You do not have permission to delete this article.');
  }

  if (!ctx.roles.includes('ADMIN') && !ctx.roles.includes('FC_LEAD')) {
    return error('forbidden', 'Only admins and FC Leads can delete articles.');
  }

  await prisma.article.delete({ where: { id: articleId } });
  return success({ id: articleId });
}

export async function getArticleVersions(
  ctx: AuthContext,
  articleId: string,
): Promise<Result<ArticleVersionSnapshot[]>> {
  const article = await prisma.article.findUnique({ where: { id: articleId } });
  if (!article) {
    return error('not_found', 'Article not found.');
  }

  if (!canReadArticle(ctx, mapArticle(article))) {
    return error('forbidden', 'You do not have permission to view this article.');
  }

  const versions = await prisma.articleVersion.findMany({
    where: { articleId },
    orderBy: { version: 'desc' },
  });

  return success(versions.map(mapArticleVersion));
}

export async function diffVersions(
  ctx: AuthContext,
  articleId: string,
  fromVersion: number,
  toVersion: number,
): Promise<Result<{ from: ArticleVersionSnapshot; to: ArticleVersionSnapshot; diff: Record<string, { from: unknown; to: unknown }> }>> {
  const article = await prisma.article.findUnique({ where: { id: articleId } });
  if (!article) {
    return error('not_found', 'Article not found.');
  }

  if (!canReadArticle(ctx, mapArticle(article))) {
    return error('forbidden', 'You do not have permission to view this article.');
  }

  const [from, to] = await Promise.all([
    prisma.articleVersion.findUnique({
      where: { articleId_version: { articleId, version: fromVersion } },
    }),
    prisma.articleVersion.findUnique({
      where: { articleId_version: { articleId, version: toVersion } },
    }),
  ]);

  if (!from || !to) {
    return error('not_found', 'One or both versions not found.');
  }

  const fromContent = from.content as Record<string, unknown>;
  const toContent = to.content as Record<string, unknown>;
  const diff: Record<string, { from: unknown; to: unknown }> = {};

  const allKeys = new Set([...Object.keys(fromContent), ...Object.keys(toContent)]);
  for (const key of allKeys) {
    const fromVal = fromContent[key];
    const toVal = toContent[key];
    if (JSON.stringify(fromVal) !== JSON.stringify(toVal)) {
      diff[key] = { from: fromVal, to: toVal };
    }
  }

  return success({
    from: mapArticleVersion(from),
    to: mapArticleVersion(to),
    diff,
  });
}

export async function getArticlesByOrganization(
  ctx: AuthContext,
  opts: { status?: string; limit?: number; cursor?: string },
): Promise<Result<{ articles: ArticleSnapshot[]; nextCursor?: string }>> {
  const where: any = { organizationId: ctx.organizationId };
  if (opts.status) where.status = opts.status;

  const articles = await prisma.article.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    take: (opts.limit ?? 20) + 1,
    ...(opts.cursor ? { skip: 1, cursor: { id: opts.cursor } } : {}),
  });

  const hasMore = articles.length > (opts.limit ?? 20);
  const items = hasMore ? articles.slice(0, -1) : articles;

  return success({
    articles: items.map(mapArticle),
    nextCursor: hasMore ? items[items.length - 1]?.id : undefined,
  });
}

function mapArticle(a: any): ArticleSnapshot {
  return {
    id: a.id,
    organizationId: a.organizationId,
    siteId: a.siteId ?? null,
    title: a.title,
    slug: a.slug,
    summary: a.summary ?? null,
    articleType: a.articleType,
    processArea: a.processArea ?? null,
    status: a.status,
    governanceLevel: a.governanceLevel,
    ownerId: a.ownerId,
    language: a.language,
    relatedArticleId: a.relatedArticleId ?? null,
    effectiveDate: a.effectiveDate ?? null,
    reviewDate: a.reviewDate ?? null,
    createdAt: a.createdAt,
    updatedAt: a.updatedAt,
  };
}

function mapArticleVersion(v: any): ArticleVersionSnapshot {
  return {
    id: v.id,
    articleId: v.articleId,
    version: v.version,
    content: v.content as Record<string, unknown>,
    changeNotes: v.changeNotes ?? null,
    status: v.status,
    createdById: v.createdById,
    createdAt: v.createdAt,
  };
}
