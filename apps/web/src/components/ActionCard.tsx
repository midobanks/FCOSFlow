import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { StatusPill, type StatusTone } from '@/components/ui/StatusPill';

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

const statusToTone: Record<string, StatusTone> = {
  pending: 'neutral',
  completed: 'success',
  overdue: 'danger',
  in_progress: 'brand',
};

const statusLabel: Record<string, string> = {
  pending: 'Pending',
  completed: 'Completed',
  overdue: 'Overdue',
  in_progress: 'In progress',
};

const priorityLabel: Record<string, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const priorityClasses: Record<string, string> = {
  high: 'bg-danger-bg text-danger-text',
  medium: 'bg-warning-bg text-warning-text',
  low: 'bg-cool-wash text-deep-gray',
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
    <Card className="transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-ink text-sm font-semibold">{title}</h3>
          <div className="text-mid-gray mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span>Owner: {owner}</span>
            {dueTime && (
              <span className={status === 'overdue' ? 'text-danger-base font-medium' : ''}>
                Due:{' '}
                {new Date(dueTime).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            )}
            {source && <span>Source: {source}</span>}
          </div>
        </div>
        <div className="ml-4 flex flex-col items-end gap-1.5">
          {priority && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityClasses[priority] ?? priorityClasses.low}`}
            >
              {priorityLabel[priority]}
            </span>
          )}
          <StatusPill
            tone={statusToTone[status] ?? 'neutral'}
            label={statusLabel[status] ?? status}
          />
        </div>
      </div>
    </Card>
  );

  if (link) {
    return (
      <Link href={link} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
