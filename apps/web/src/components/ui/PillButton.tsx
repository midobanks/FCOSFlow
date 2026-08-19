import type { ButtonHTMLAttributes } from 'react';

type PillButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'quiet';
  size?: 'sm' | 'md' | 'lg';
};

const variantClasses = {
  primary: 'bg-electric-blue text-paper hover:opacity-90',
  secondary: 'border border-ink/15 bg-paper text-ink hover:bg-cool-wash',
  danger: 'bg-danger-base text-paper hover:opacity-90',
  quiet: 'text-link-blue hover:underline',
};

const sizeClasses = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-10 px-5 text-sm',
  lg: 'h-11 px-6 text-sm',
};

export function PillButton({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}: PillButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
}
