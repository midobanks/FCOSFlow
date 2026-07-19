export type ApprovalBadgeStatus =
  | 'DRAFT'
  | 'IN_REVIEW'
  | 'PUBLISHED'
  | 'SUPERSEDED'
  | 'ARCHIVED'
  | 'LOCAL'
  | 'SITE'
  | 'NETWORK';

const statusConfig: Record<ApprovalBadgeStatus, { label: string; className: string }> = {
  DRAFT: { label: 'Local Draft', className: 'bg-unknown-bg text-unknown-text' },
  IN_REVIEW: { label: 'In Review', className: 'bg-warning-bg text-warning-text' },
  PUBLISHED: { label: 'Published', className: 'bg-success-bg text-success-text' },
  SUPERSEDED: { label: 'Superseded', className: 'bg-neutral-100 text-neutral-600' },
  ARCHIVED: { label: 'Archived', className: 'bg-neutral-100 text-neutral-400' },
  LOCAL: { label: 'Local Draft', className: 'bg-unknown-bg text-unknown-text' },
  SITE: { label: 'Site Approved', className: 'bg-info-bg text-info-text' },
  NETWORK: { label: 'Network Approved', className: 'bg-success-bg text-success-text' },
};

type ApprovalBadgeProps = {
  status: ApprovalBadgeStatus;
};

export function ApprovalBadge({ status }: ApprovalBadgeProps) {
  const config = statusConfig[status] ?? statusConfig.DRAFT;
  return (
    <span
      className={`inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
