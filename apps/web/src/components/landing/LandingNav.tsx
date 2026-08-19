'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';

const navLinks = [
  { href: '/shift-steering', label: 'Command Center' },
  { href: '/quick-and-dirty', label: 'Shift Steering' },
  { href: '/companion', label: 'Checklist' },
  { href: '/command-center', label: 'Dashboard' },
  { href: '/incidents', label: 'Incidents' },
  { href: '/processes', label: 'Learn' },
  { href: '/handovers', label: 'Handovers' },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'border-hairline bg-faded-surface/85 border-b backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" aria-label="FCOS Flow home">
          <Logo width={120} height={32} />
        </Link>
        <nav
          className="hidden items-center gap-5 lg:gap-7 xl:flex"
          aria-label="Landing page navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-caption text-deep-gray hover:text-ink font-medium tracking-[-0.01em] whitespace-nowrap transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/login"
            className="text-caption text-ink hover:bg-cool-wash hidden h-11 items-center rounded-full px-4 font-medium transition-colors sm:flex"
          >
            Sign in
          </Link>
          <Link
            href="/quick-and-dirty"
            className="bg-electric-blue text-caption text-paper flex h-11 items-center rounded-full px-5 font-medium transition-opacity hover:opacity-90"
          >
            Steer your shift
          </Link>
        </div>
      </div>
    </header>
  );
}
