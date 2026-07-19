import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
      <div className="text-center">
        <Logo width={160} height={42} className="mx-auto" />
        <h1 className="mt-6 text-2xl font-bold text-neutral-800">Page not found</h1>
        <p className="mt-2 text-neutral-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center rounded-md bg-brand-500 px-6 text-sm font-medium text-neutral-0 hover:bg-brand-600"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
