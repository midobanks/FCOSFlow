export type StatusTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand';

const toneClasses: Record<StatusTone, { pill: string; dot: string }> = {
  success: { pill: 'bg-success-bg text-success-text', dot: 'bg-success-base' },
  warning: { pill: 'bg-warning-bg text-warning-text', dot: 'bg-warning-base' },
  danger: { pill: 'bg-danger-bg text-danger-text', dot: 'bg-danger-base' },
  info: { pill: 'bg-info-bg text-info-text', dot: 'bg-info-base' },
  neutral: { pill: 'bg-cool-wash text-deep-gray', dot: 'bg-quiet-dot' },
  brand: { pill: 'bg-brand-50 text-brand-700', dot: 'bg-brand-500' },
};

type StatusPillProps = {
  tone?: StatusTone;
  label: string;
  dot?: boolean;
  className?: string;
};

export function StatusPill({
  tone = 'neutral',
  label,
  dot = true,
  className = '',
}: StatusPillProps) {
  const t = toneClasses[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${t.pill} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />}
      {label}
    </span>
  );
}
