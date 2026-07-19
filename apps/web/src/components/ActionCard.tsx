import Link from 'next/link';

type ActionCardProps = {
  id: string;
  title: string;
  status: 'pending' | 'completed' | 'overdue' | 'in_progress';
  owner: string;
  dueTime?: string;
  source?: string;
  priority?: 'high' | 'medium' | 'low';
  link?: string;
};

const statusStyles: Record<string, string> = {
  pending: 'border-l-neutral-400 bg-neutral-25',
  completed: 'border-l-success-base bg-success-bg',
  overdue: 'border-l-danger-base bg-danger-bg',
  in_progress: 'border-l-brand-500 bg-brand-50',
};

const priorityLabel: Record<string, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export function ActionCard({
  id,
  title,
  status,
  owner,
  dueTime,
  source,
  priority,
  link,
}: ActionCardProps) {
  const content = (
    <div className={`rounded-lg border border-neutral-200 p-4 border-l-4 ${statusStyles[status] ?? statusStyles.pending}`}>
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
            <span>Owner: {owner}</span>
            {dueTime && (
              <span className={status === 'overdue' ? 'text-danger-base font-medium' : ''}>
                Due: {new Date(dueTime).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
            {source && <span>Source: {source}</span>}
          </div>
        </div>
        <div className="ml-4 flex flex-col items-end gap-1.5">
          {priority && (
            <span className={`rounded px-2 py-0.5 text-xs font-medium ${
              priority === 'high' ? 'bg-danger-bg text-danger-text'
              : priority === 'medium' ? 'bg-warning-bg text-warning-text'
              : 'bg-neutral-100 text-neutral-600'
            }`}>
              {priorityLabel[priority]}
            </span>
          )}
          <span className="text-xs capitalize text-neutral-400">{status.replace('_', ' ')}</span>
        </div>
      </div>
    </div>
  );

  if (link) {
    return <Link href={link} className="block">{content}</Link>;
  }

  return content;
}
