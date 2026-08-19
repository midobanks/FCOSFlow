import type { ReactNode } from 'react';

type StatCardProps = {
  label: string;
  value: ReactNode;
  note?: string;
  className?: string;
};

export function StatCard({ label, value, note, className = '' }: StatCardProps) {
  return (
    <div className={`border-hairline bg-paper rounded-3xl border p-5 ${className}`}>
      <p className="text-mid-gray text-xs font-medium">{label}</p>
      <p className="text-ink mt-2 text-3xl font-bold tracking-[-0.02em] tabular-nums">{value}</p>
      {note && <p className="text-quiet-dot mt-1 text-xs">{note}</p>}
    </div>
  );
}
