import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
      <div className="text-center">
        <Logo width={160} height={42} className="mx-auto" />
        <h1 className="text-ink mt-8 text-4xl font-bold tracking-[-0.02em]">Page not found</h1>
        <p className="text-mid-gray mt-3">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="text-link-blue mt-6 inline-flex items-center hover:underline">
          Go home
        </Link>
      </div>
    </div>
  );
}
