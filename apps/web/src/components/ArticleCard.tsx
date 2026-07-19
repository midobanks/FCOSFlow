import Link from 'next/link';
import { ApprovalBadge } from '@fcos/ui';
import type { ApprovalBadgeStatus } from '@fcos/ui';

type ArticleCardProps = {
  id: string;
  title: string;
  summary: string | null;
  articleType: string;
  processArea: string | null;
  status: string;
  governanceLevel: string;
  ownerId: string;
  updatedAt: string;
  matchType?: string;
};

function mapStatusToBadge(status: string, governanceLevel: string): ApprovalBadgeStatus {
  if (status === 'PUBLISHED') {
    if (governanceLevel === 'NETWORK') return 'NETWORK';
    if (governanceLevel === 'SITE') return 'SITE';
    return 'PUBLISHED';
  }
  return status as ApprovalBadgeStatus;
}

export function ArticleCard({
  id,
  title,
  summary,
  articleType,
  processArea,
  status,
  governanceLevel,
  ownerId,
  updatedAt,
  matchType,
}: ArticleCardProps) {
  return (
    <Link
      href={`/wiki/${id}`}
      className="block rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:border-brand-300"
    >
      <div className="mb-2 flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
        <ApprovalBadge status={mapStatusToBadge(status, governanceLevel)} />
      </div>
      {summary && (
        <p className="mb-3 text-sm text-neutral-600 line-clamp-2">{summary}</p>
      )}
      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
        <span className="rounded bg-neutral-100 px-2 py-0.5 font-medium text-neutral-600">
          {articleType}
        </span>
        {processArea && (
          <span className="rounded bg-neutral-100 px-2 py-0.5 font-medium text-neutral-600">
            {processArea}
          </span>
        )}
        <span>Owner: {ownerId}</span>
        <span>Updated: {new Date(updatedAt).toLocaleDateString('en-GB')}</span>
        {matchType && <span className="text-brand-500">Matched: {matchType}</span>}
      </div>
    </Link>
  );
}
