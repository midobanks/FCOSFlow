import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
  padded?: boolean;
};

export function Card({ children, className = '', padded = true }: CardProps) {
  return (
    <div
      className={`border-hairline bg-paper rounded-3xl border ${padded ? 'p-5 sm:p-6' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
