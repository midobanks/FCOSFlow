import { NextResponse } from 'next/server';
import { prisma } from '@fcos/database';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function GET() {
  try {
    const ctx = getAuthContext(null as any);

    const [totalArticles, publishedArticles, inReviewArticles] = await Promise.all([
      prisma.article.count({ where: { organizationId: ctx.organizationId } }),
      prisma.article.count({ where: { organizationId: ctx.organizationId, status: 'PUBLISHED' } }),
      prisma.article.count({ where: { organizationId: ctx.organizationId, status: 'IN_REVIEW' } }),
    ]).catch(() => [0, 0, 0]);

    const overdueReviews = await prisma.article.count({
      where: {
        organizationId: ctx.organizationId,
        status: 'PUBLISHED',
        reviewDate: { lte: new Date() },
      },
    }).catch(() => 0);

    const pendingAcknowledgements = await prisma.articleAcknowledgement.count({
      where: {
        completedAt: null,
        article: { organizationId: ctx.organizationId },
      },
    }).catch(() => 0);

    return NextResponse.json({
      ok: true,
      data: {
        tiles: [
          {
            id: 'knowledge',
            label: 'Knowledge',
            value: publishedArticles,
            subtitle: 'Published articles',
            status: publishedArticles > 0 ? 'healthy' : 'empty',
            link: '/admin/wiki',
          },
          {
            id: 'reviews',
            label: 'Pending reviews',
            value: inReviewArticles,
            subtitle: 'Articles awaiting review',
            status: inReviewArticles > 0 ? 'warning' : 'healthy',
            link: '/admin/wiki?status=IN_REVIEW',
          },
          {
            id: 'overdue',
            label: 'Overdue reviews',
            value: overdueReviews,
            subtitle: 'Articles past review date',
            status: overdueReviews > 0 ? 'danger' : 'healthy',
            link: '/admin/wiki',
          },
          {
            id: 'acknowledgements',
            label: 'Acknowledgements',
            value: pendingAcknowledgements,
            subtitle: 'Pending acknowledgements',
            status: pendingAcknowledgements > 0 ? 'warning' : 'healthy',
            link: '/acknowledgements',
          },
          {
            id: 'articles',
            label: 'Total articles',
            value: totalArticles,
            subtitle: 'All articles',
            status: 'healthy',
            link: '/admin/wiki',
          },
        ],
        stale: false,
        refreshedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('GET /api/v1/command-center failed', error);
    return apiError(500, 'server_error', 'Failed to load command center.');
  }
}
