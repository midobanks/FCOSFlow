import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ApprovalBadge, ArticleMetadataStrip } from '@fcos/ui';
import type { ApprovalBadgeStatus } from '@fcos/ui';
import { RichTextDisplay } from '@/components/RichTextDisplay';

type ArticleData = {
  article: {
    id: string;
    title: string;
    slug: string;
    summary: string | null;
    articleType: string;
    processArea: string | null;
    status: string;
    governanceLevel: string;
    ownerId: string;
    language: string;
    effectiveDate: string | null;
    reviewDate: string | null;
    updatedAt: string;
  };
  version: {
    id: string;
    version: number;
    content: Record<string, unknown>;
    changeNotes: string | null;
    status: string;
    createdById: string;
    createdAt: string;
  };
};

async function getArticle(id: string): Promise<ArticleData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/v1/wiki/articles/${id}`, { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : null;
  } catch {
    return null;
  }
}

function mapStatusToBadge(status: string, governanceLevel: string): ApprovalBadgeStatus {
  if (status === 'PUBLISHED') {
    if (governanceLevel === 'NETWORK') return 'NETWORK';
    if (governanceLevel === 'SITE') return 'SITE';
    return 'PUBLISHED';
  }
  return status as ApprovalBadgeStatus;
}

export default async function WikiArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getArticle(id);

  if (!data) {
    notFound();
  }

  const { article, version } = data;

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-6">
        <Link href="/search" className="text-sm text-brand-500 hover:text-brand-600">
          &larr; Back to search
        </Link>
      </div>

      <div className="mb-4 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">{article.title}</h1>
          {article.summary && (
            <p className="mt-2 text-neutral-600">{article.summary}</p>
          )}
        </div>
      </div>

      <div className="mb-8">
        <ArticleMetadataStrip
          owner={article.ownerId}
          version={version.version}
          effectiveDate={article.effectiveDate}
          reviewDate={article.reviewDate}
          scope={article.processArea}
          language={article.language}
          status={mapStatusToBadge(article.status, article.governanceLevel)}
        />
      </div>

      <article className="prose prose-sm max-w-none">
        <RichTextDisplay content={version.content} />
      </article>
    </div>
  );
}
