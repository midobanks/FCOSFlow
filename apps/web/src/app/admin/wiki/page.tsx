import Link from 'next/link';
import { ApprovalBadge } from '@fcos/ui';
import type { ApprovalBadgeStatus } from '@fcos/ui';
import { requireAdmin } from '@/lib/require-admin';
import { LogoutButton } from '@/components/LogoutButton';
import { DeleteArticleButton } from '@/components/DeleteArticleButton';
import { getArticlesByOrganization } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';

type Article = {
  id: string;
  title: string;
  slug: string;
  articleType: string;
  processArea: string | null;
  status: string;
  governanceLevel: string;
  ownerId: string;
  language: string;
  updatedAt: Date | string;
};

function mapStatusToBadge(status: string, governanceLevel: string): ApprovalBadgeStatus {
  if (status === 'PUBLISHED') {
    if (governanceLevel === 'NETWORK') return 'NETWORK';
    if (governanceLevel === 'SITE') return 'SITE';
    return 'PUBLISHED';
  }
  return status as ApprovalBadgeStatus;
}

export default async function AdminWikiPage() {
  await requireAdmin();
  const ctx = await getAuthContext();
  const result = await getArticlesByOrganization(ctx, { limit: 100 });
  const articles: any[] = result.ok ? result.data.articles : [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Admin — Articles</h1>
          <p className="mt-1 text-sm text-neutral-500">{articles.length} article{articles.length === 1 ? '' : 's'}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/wiki/new"
            className="inline-flex h-11 items-center rounded-md bg-brand-500 px-5 text-sm font-medium text-white hover:bg-brand-600">
            New article
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 text-left text-sm font-medium text-neutral-600">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Process area</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Language</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article: any) => (
              <tr key={article.id} className="border-b border-neutral-100 text-sm last:border-b-0 hover:bg-neutral-25">
                <td className="px-4 py-3">
                  <Link href={`/admin/wiki/${article.id}`} className="font-medium text-neutral-900 hover:text-brand-500">
                    {article.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-neutral-600">{article.processArea ?? '—'}</td>
                <td className="px-4 py-3">
                  <ApprovalBadge status={mapStatusToBadge(article.status, article.governanceLevel)} />
                </td>
                <td className="px-4 py-3 uppercase text-neutral-600">{article.language}</td>
                <td className="px-4 py-3 text-neutral-400">
                  {new Date(article.updatedAt).toLocaleDateString('en-GB')}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/wiki/${article.id}`}
                      className="rounded px-2 py-1 text-xs font-medium text-brand-500 hover:bg-brand-50"
                    >
                      Edit
                    </Link>
                    <DeleteArticleButton articleId={article.id} articleTitle={article.title} />
                  </div>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-neutral-400">
                  No articles yet. Click &quot;New article&quot; to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
