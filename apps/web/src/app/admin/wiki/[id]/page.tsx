import Link from 'next/link';
import { ApprovalBadge, ArticleMetadataStrip } from '@fcos/ui';
import type { ApprovalBadgeStatus } from '@fcos/ui';
import { requireAdmin } from '@/lib/require-admin';

type Version = {
  id: string;
  version: number;
  changeNotes: string | null;
  status: string;
  createdById: string;
  createdAt: string;
};

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
  version: Version;
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

async function getVersions(id: string): Promise<Version[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/v1/wiki/articles/${id}/versions`, { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : [];
  } catch {
    return [];
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

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();

  const { id } = await params;
  const [data, versions] = await Promise.all([getArticle(id), getVersions(id)]);

  if (!data) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-neutral-800">Article not found</h1>
          <Link href="/admin/wiki" className="mt-4 inline-flex h-11 items-center rounded-md bg-brand-500 px-5 text-sm font-medium text-white hover:bg-brand-600">
            Back to Wiki
          </Link>
        </div>
      </div>
    );
  }

  const { article, version } = data;

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-6">
        <Link href="/admin/wiki" className="text-sm text-brand-500 hover:text-brand-600">
          &larr; Back to Wiki
        </Link>
      </div>

      <div className="mb-4 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">{article.title}</h1>
          {article.summary && (
            <p className="mt-1 text-neutral-600">{article.summary}</p>
          )}
        </div>
        <ApprovalBadge status={mapStatusToBadge(article.status, article.governanceLevel)} />
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

      <div className="mb-8 flex gap-3">
        {article.status === 'DRAFT' && (
          <form action={`/api/v1/wiki/articles/${article.id}/submit`} method="POST">
            <button
              type="submit"
              className="inline-flex h-11 items-center rounded-md bg-brand-500 px-5 text-sm font-medium text-white hover:bg-brand-600"
            >
              Submit for review
            </button>
          </form>
        )}
        {article.status === 'IN_REVIEW' && (
          <div className="flex gap-3">
            <form action={`/api/v1/wiki/articles/${article.id}/review`} method="POST">
              <input type="hidden" name="decision" value="approved" />
              <button
                type="submit"
                className="inline-flex h-11 items-center rounded-md bg-success-base px-5 text-sm font-medium text-white hover:opacity-90"
              >
                Approve
              </button>
            </form>
            <form action={`/api/v1/wiki/articles/${article.id}/review`} method="POST">
              <input type="hidden" name="decision" value="changes_requested" />
              <button
                type="submit"
                className="inline-flex h-11 items-center rounded-md border border-warning-base bg-white px-5 text-sm font-medium text-warning-text hover:bg-warning-bg"
              >
                Request changes
              </button>
            </form>
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-neutral-800">Version history</h2>
        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-left text-sm font-medium text-neutral-600">
                <th className="px-4 py-3">Version</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Notes</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {versions.map((v) => (
                <tr key={v.id} className="border-b border-neutral-100 text-sm last:border-b-0">
                  <td className="px-4 py-3 font-medium text-neutral-900">v{v.version}</td>
                  <td className="px-4 py-3">
                    <ApprovalBadge status={v.status as ApprovalBadgeStatus} />
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{v.changeNotes ?? '—'}</td>
                  <td className="px-4 py-3 text-neutral-400">
                    {new Date(v.createdAt).toLocaleDateString('en-GB')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
