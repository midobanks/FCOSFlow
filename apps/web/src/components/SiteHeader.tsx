import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function SiteHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-neutral-200 bg-neutral-0 px-4 sm:px-6">
      <div className="flex items-center gap-6">
        <Link href="/">
          <Logo width={140} height={38} />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/companion" className="rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900">
            Operate
          </Link>
          <Link href="/command-center" className="rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900">
            Command
          </Link>
          <Link href="/incidents" className="rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900">
            Incidents
          </Link>
          <Link href="/processes" className="rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900">
            Learn
          </Link>
          <Link href="/handovers" className="rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900">
            Handovers
          </Link>
          <Link href="/admin/wiki" className="rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900">
            Admin
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/search" className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </Link>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
