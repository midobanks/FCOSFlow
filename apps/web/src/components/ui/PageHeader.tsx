import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-ink text-2xl font-bold tracking-[-0.02em]">{title}</h1>
        {subtitle && <p className="text-mid-gray mt-1.5 text-sm">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
