import { prisma } from '@fcos/database';
import { error, success } from '@fcos/contracts';
import type { Result } from '@fcos/contracts';
import type { ArticleSnapshot } from '@fcos/domain';

type AuthContext = {
  userId: string;
  organizationId: string;
  siteId?: string;
  roles: string[];
};

type SearchResult = {
  article: ArticleSnapshot;
  rank: number;
  matchType: 'exact' | 'prefix' | 'fuzzy' | 'fulltext';
};

type SearchOpts = {
  q: string;
  limit?: number;
  cursor?: string;
};

export async function searchArticles(
  ctx: AuthContext,
  opts: SearchOpts,
): Promise<Result<{ results: SearchResult[]; nextCursor?: string }>> {
  const query = opts.q.trim();
  if (!query) {
    return error('invalid_input', 'Search query is required.');
  }

  const limit = opts.limit ?? 20;
  const rawQuery = `
    SELECT
      a.id,
      a."organizationId",
      a."siteId",
      a.title,
      a.slug,
      a.summary,
      a."articleType",
      a."processArea",
      a.status,
      a."governanceLevel",
      a."ownerId",
      a.language,
      a."relatedArticleId",
      a."effectiveDate",
      a."reviewDate",
      a."createdAt",
      a."updatedAt",
      CASE
        WHEN LOWER(a.title) = LOWER($1) THEN 0
        WHEN LOWER(a.title) LIKE LOWER($2) THEN 1
        WHEN a.status = 'PUBLISHED' AND to_tsvector('english', a.title || ' ' || COALESCE(a.summary, '')) @@ plainto_tsquery('english', $1) THEN 2
        WHEN a.status = 'PUBLISHED' AND $3 IS NOT NULL AND similarity(a.title, $1) > 0.2 THEN 3
        ELSE 4
      END as rank,
      CASE
        WHEN LOWER(a.title) = LOWER($1) THEN 'exact'
        WHEN LOWER(a.title) LIKE LOWER($2) THEN 'prefix'
        WHEN a.status = 'PUBLISHED' AND to_tsvector('english', a.title || ' ' || COALESCE(a.summary, '')) @@ plainto_tsquery('english', $1) THEN 'fulltext'
        WHEN similarity(a.title, $1) > 0.2 THEN 'fuzzy'
        ELSE 'fulltext'
      END as "matchType"
    FROM "Article" a
    WHERE a."organizationId" = $4
      AND (
        LOWER(a.title) = LOWER($1)
        OR LOWER(a.title) LIKE LOWER($2)
        OR (a.status = 'PUBLISHED' AND to_tsvector('english', a.title || ' ' || COALESCE(a.summary, '')) @@ plainto_tsquery('english', $1))
        OR similarity(a.title, $1) > 0.2
      )
    ORDER BY rank ASC, a."updatedAt" DESC
    LIMIT $5
    OFFSET $6
  `;

  const cursorOffset = opts.cursor ? Number(opts.cursor) : 0;

  try {
    const rows: any[] = await prisma.$queryRawUnsafe(
      rawQuery,
      query,
      `${query}%`,
      query,
      ctx.organizationId,
      limit + 1,
      cursorOffset,
    );

    const hasMore = rows.length > limit;
    const items = hasMore ? rows.slice(0, -1) : rows;

    const results: SearchResult[] = items.map((row: any) => ({
      article: mapRowToArticle(row),
      rank: Number(row.rank),
      matchType: row.matchType as SearchResult['matchType'],
    }));

    const nextCursor = hasMore ? String(cursorOffset + items.length) : undefined;

    return success({ results, nextCursor });
  } catch (e) {
    return error('search_failed', 'Search query failed. Try simplifying your search terms.');
  }
}

function mapRowToArticle(row: any): ArticleSnapshot {
  return {
    id: row.id,
    organizationId: row.organizationId,
    siteId: row.siteId ?? null,
    title: row.title,
    slug: row.slug,
    summary: row.summary ?? null,
    articleType: row.articleType,
    processArea: row.processArea ?? null,
    status: row.status,
    governanceLevel: row.governanceLevel,
    ownerId: row.ownerId,
    language: row.language,
    relatedArticleId: row.relatedArticleId ?? null,
    effectiveDate: row.effectiveDate ?? null,
    reviewDate: row.reviewDate ?? null,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}
