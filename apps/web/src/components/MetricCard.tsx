import Link from 'next/link';

type MetricCardProps = {
  id: string;
  label: string;
  value: number | string;
  subtitle?: string;
  status?: 'healthy' | 'warning' | 'danger' | 'empty';
  trend?: 'up' | 'down' | 'flat';
  link?: string;
};

const statusStyles: Record<string, string> = {
  healthy: 'border-l-success-base',
  warning: 'border-l-warning-base',
  danger: 'border-l-danger-base',
  empty: 'border-l-neutral-200',
};

const trendIcons: Record<string, string> = {
  up: '\u2191',
  down: '\u2193',
  flat: '\u2192',
};

export function MetricCard({ id, label, value, subtitle, status = 'healthy', trend, link }: MetricCardProps) {
  const content = (
    <div
      className={`rounded-lg border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-300 border-l-4 ${statusStyles[status] ?? statusStyles.healthy}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-600">{label}</span>
        {trend && (
          <span className={`text-sm ${trend === 'up' ? 'text-success-base' : trend === 'down' ? 'text-danger-base' : 'text-neutral-400'}`}>
            {trendIcons[trend]}
          </span>
        )}
      </div>
      <p className="mt-1 text-3xl font-bold text-neutral-900">{value}</p>
      {subtitle && <p className="mt-0.5 text-xs text-neutral-400">{subtitle}</p>}
    </div>
  );

  if (link) {
    return <Link href={link} className="block">{content}</Link>;
  }

  return content;
}
