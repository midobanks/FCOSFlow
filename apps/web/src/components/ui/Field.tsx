import type { ReactNode } from 'react';

type FieldProps = {
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
};

export const inputClass =
  'block w-full rounded-lg border border-hairline bg-paper px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-quiet-dot focus:border-electric-blue';

export function Field({ label, hint, className = '', children }: FieldProps) {
  return (
    <div className={className}>
      <label className="text-deep-gray block text-xs font-medium">{label}</label>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="text-quiet-dot mt-1 text-xs">{hint}</p>}
    </div>
  );
}
