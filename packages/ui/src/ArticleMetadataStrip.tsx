import { ApprovalBadge, type ApprovalBadgeStatus } from './ApprovalBadge';

type ArticleMetadataStripProps = {
  owner: string;
  version?: number;
  effectiveDate?: string | null;
  reviewDate?: string | null;
  scope?: string | null;
  language?: string;
  status?: ApprovalBadgeStatus;
};

function formatDate(date: string | null | undefined): string {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function ArticleMetadataStrip({
  owner,
  version,
  effectiveDate,
  reviewDate,
  scope,
  language,
  status,
}: ArticleMetadataStripProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
      {status && <ApprovalBadge status={status} />}
      {scope && (
        <span className="inline-flex items-center gap-1">
          <span className="font-medium text-neutral-400">Scope:</span> {scope}
        </span>
      )}
      <span className="inline-flex items-center gap-1">
        <span className="font-medium text-neutral-400">Owner:</span> {owner}
      </span>
      {version !== undefined && (
        <span className="inline-flex items-center gap-1">
          <span className="font-medium text-neutral-400">Version:</span> {version}
        </span>
      )}
      {effectiveDate && (
        <span className="inline-flex items-center gap-1">
          <span className="font-medium text-neutral-400">Effective:</span> {formatDate(effectiveDate)}
        </span>
      )}
      {reviewDate && (
        <span className="inline-flex items-center gap-1">
          <span className="font-medium text-neutral-400">Review:</span> {formatDate(reviewDate)}
        </span>
      )}
      {language && (
        <span className="inline-flex items-center gap-1">
          <span className="font-medium text-neutral-400">Lang:</span> {language.toUpperCase()}
        </span>
      )}
    </div>
  );
}
