import Link from 'next/link';
import { ApprovalBadge, ArticleMetadataStrip } from '@fcos/ui';
import type { ApprovalBadgeStatus } from '@fcos/ui';
import { requireAdmin } from '@/lib/require-admin';
import { getBaseUrl } from '@/lib/base-url';
import { RichTextDisplay } from '@/components/RichTextDisplay';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { PillButton } from '@/components/ui/PillButton';

type Version = {
  id: string;
  version: number;
  content: Record<string, unknown>;
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
    const res = await fetch(`${getBaseUrl()}/api/v1/wiki/articles/${id}`, { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : null;
  } catch {
    return null;
  }
}

async function getVersions(id: string): Promise<Version[]> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/v1/wiki/articles/${id}/versions`, {
      cache: 'no-store',
    });
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

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();

  const { id } = await params;
  const [data, versions] = await Promise.all([getArticle(id), getVersions(id)]);

  if (!data) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <h1 className="text-ink text-xl font-bold">Article not found</h1>
          <Link
            href="/admin/wiki"
            className="bg-electric-blue text-paper mt-4 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors hover:opacity-90"
          >
            Back to Wiki
          </Link>
        </div>
      </div>
    );
  }

  const { article, version } = data;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <Link href="/admin/wiki" className="text-link-blue text-sm hover:underline">
          &larr; Back to Wiki
        </Link>
      </div>

      <PageHeader
        title={article.title}
        subtitle={article.summary ?? undefined}
        action={
          <ApprovalBadge status={mapStatusToBadge(article.status, article.governanceLevel)} />
        }
      />

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
            <PillButton type="submit" size="lg">
              Submit for review
            </PillButton>
          </form>
        )}
        {article.status === 'IN_REVIEW' && (
          <div className="flex gap-3">
            <form action={`/api/v1/wiki/articles/${article.id}/review`} method="POST">
              <input type="hidden" name="decision" value="approved" />
              <button
                type="submit"
                className="bg-success-base text-paper inline-flex h-11 items-center rounded-full px-6 text-sm font-medium transition-opacity hover:opacity-90"
              >
                Approve
              </button>
            </form>
            <form action={`/api/v1/wiki/articles/${article.id}/review`} method="POST">
              <input type="hidden" name="decision" value="changes_requested" />
              <button
                type="submit"
                className="border-warning-base bg-paper text-warning-text hover:bg-warning-bg inline-flex h-11 items-center rounded-full border px-6 text-sm font-medium transition-colors"
              >
                Request changes
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="mb-10">
        <h2 className="text-ink mb-3 text-lg font-semibold">Content</h2>
        <Card padded className="prose prose-sm max-w-none">
          <RichTextDisplay content={version.content as Record<string, unknown>} />
        </Card>
      </div>

      <div>
        <h2 className="text-ink mb-3 text-lg font-semibold">Version history</h2>
        <Card padded={false} className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-hairline bg-cool-wash text-deep-gray border-b text-left text-sm font-medium">
                <th className="px-4 py-3">Version</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Notes</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {versions.map((v) => (
                <tr key={v.id} className="border-hairline border-b text-sm last:border-b-0">
                  <td className="text-ink px-4 py-3 font-medium">v{v.version}</td>
                  <td className="px-4 py-3">
                    <ApprovalBadge status={v.status as ApprovalBadgeStatus} />
                  </td>
                  <td className="text-deep-gray px-4 py-3">{v.changeNotes ?? '—'}</td>
                  <td className="text-quiet-dot px-4 py-3">
                    {new Date(v.createdAt).toLocaleDateString('en-GB')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
