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
      className="border-hairline bg-paper hover:border-brand-300 block rounded-3xl border p-5 transition-colors"
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        <h3 className="text-ink text-base font-semibold">{title}</h3>
        <ApprovalBadge status={mapStatusToBadge(status, governanceLevel)} />
      </div>
      {summary && <p className="text-deep-gray mb-4 line-clamp-2 text-sm">{summary}</p>}
      <div className="text-mid-gray flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
        <span className="bg-cool-wash text-deep-gray rounded-full px-2.5 py-0.5 font-medium">
          {articleType}
        </span>
        {processArea && (
          <span className="bg-cool-wash text-deep-gray rounded-full px-2.5 py-0.5 font-medium">
            {processArea}
          </span>
        )}
        <span>Owner: {ownerId}</span>
        <span>Updated: {new Date(updatedAt).toLocaleDateString('en-GB')}</span>
        {matchType && <span className="text-brand-600">Matched: {matchType}</span>}
      </div>
    </Link>
  );
}
