import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { StatusPill, type StatusTone } from '@/components/ui/StatusPill';

type MetricCardProps = {
  id: string;
  label: string;
  value: number | string;
  subtitle?: string;
  status?: 'healthy' | 'warning' | 'danger' | 'empty';
  trend?: 'up' | 'down' | 'flat';
  link?: string;
};

const statusToTone: Record<string, StatusTone> = {
  healthy: 'success',
  warning: 'warning',
  danger: 'danger',
  empty: 'neutral',
};

const statusLabel: Record<string, string> = {
  healthy: 'Healthy',
  warning: 'Warning',
  danger: 'Danger',
  empty: 'Empty',
};

const trendIcons: Record<string, string> = {
  up: '\u2191',
  down: '\u2193',
  flat: '\u2192',
};

export function MetricCard({
  id,
  label,
  value,
  subtitle,
  status = 'healthy',
  trend,
  link,
}: MetricCardProps) {
  const content = (
    <Card className="transition-colors">
      <div className="flex items-center justify-between gap-3">
        <span className="text-mid-gray text-xs font-medium">{label}</span>
        <div className="flex items-center gap-2">
          {trend && (
            <span
              className={`text-sm ${trend === 'up' ? 'text-success-base' : trend === 'down' ? 'text-danger-base' : 'text-quiet-dot'}`}
            >
              {trendIcons[trend]}
            </span>
          )}
          <StatusPill
            tone={statusToTone[status] ?? 'neutral'}
            label={statusLabel[status] ?? 'Unknown'}
          />
        </div>
      </div>
      <p className="text-ink mt-2 text-3xl font-bold tracking-[-0.02em] tabular-nums">{value}</p>
      {subtitle && <p className="text-quiet-dot mt-1 text-xs">{subtitle}</p>}
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
