'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const navLinks = [
  { href: '/shift-steering', label: 'Command Center' },
  { href: '/quick-and-dirty', label: 'Shift Steering' },
  { href: '/companion', label: 'Checklist' },
  { href: '/command-center', label: 'Dashboard' },
  { href: '/incidents', label: 'Incidents' },
  { href: '/processes', label: 'Learn' },
  { href: '/handovers', label: 'Handovers' },
  { href: '/admin/wiki', label: 'Admin' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled || menuOpen
          ? 'border-hairline bg-faded-surface/85 border-b backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-12 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" aria-label="FCOS Flow home" className="flex items-center">
            <Logo width={120} height={32} />
          </Link>
          <nav className="ml-4 hidden items-center gap-0.5 xl:flex" aria-label="App navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-caption rounded-full px-3 py-1.5 font-medium whitespace-nowrap transition-colors ${
                  isActive(link.href)
                    ? 'bg-cool-wash text-ink'
                    : 'text-deep-gray hover:bg-cool-wash/60 hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            aria-label="Search"
            className="text-mid-gray hover:bg-cool-wash hover:text-ink flex h-10 w-10 items-center justify-center rounded-full transition-colors"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link>
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="text-ink hover:bg-cool-wash flex h-10 w-10 items-center justify-center rounded-full transition-colors xl:hidden"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="border-hairline bg-faded-surface/95 border-t px-4 pt-2 pb-4 backdrop-blur-xl xl:hidden"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-caption flex items-center justify-between rounded-xl px-3 py-2.5 font-medium transition-colors ${
                isActive(link.href)
                  ? 'bg-cool-wash text-ink'
                  : 'text-deep-gray hover:bg-cool-wash/60'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
