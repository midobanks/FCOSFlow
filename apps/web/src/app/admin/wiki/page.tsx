import Link from 'next/link';
import { ApprovalBadge } from '@fcos/ui';
import type { ApprovalBadgeStatus } from '@fcos/ui';
import { requireAdmin } from '@/lib/require-admin';
import { LogoutButton } from '@/components/LogoutButton';
import { DeleteArticleButton } from '@/components/DeleteArticleButton';
import { getArticlesByOrganization } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';

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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Admin — Articles"
        subtitle={`${articles.length} article${articles.length === 1 ? '' : 's'}`}
        action={
          <div className="flex items-center gap-3">
            <Link
              href="/admin/wiki/new"
              className="bg-electric-blue text-paper inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors hover:opacity-90"
            >
              New article
            </Link>
            <LogoutButton />
          </div>
        }
      />

      <Card padded={false} className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-hairline bg-cool-wash text-deep-gray border-b text-left text-sm font-medium">
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
              <tr
                key={article.id}
                className="border-hairline hover:bg-cool-wash border-b text-sm last:border-b-0"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/wiki/${article.id}`}
                    className="text-ink hover:text-link-blue font-medium"
                  >
                    {article.title}
                  </Link>
                </td>
                <td className="text-deep-gray px-4 py-3">{article.processArea ?? '—'}</td>
                <td className="px-4 py-3">
                  <ApprovalBadge
                    status={mapStatusToBadge(article.status, article.governanceLevel)}
                  />
                </td>
                <td className="text-deep-gray px-4 py-3 uppercase">{article.language}</td>
                <td className="text-quiet-dot px-4 py-3">
                  {new Date(article.updatedAt).toLocaleDateString('en-GB')}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/wiki/${article.id}`}
                      className="text-link-blue hover:bg-cool-wash rounded px-2 py-1 text-xs font-medium"
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
                <td colSpan={6} className="text-quiet-dot px-4 py-12 text-center">
                  No articles yet. Click &quot;New article&quot; to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
