'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
];

type LanguageSwitcherProps = {
  current?: string;
};

export function LanguageSwitcher({ current = 'en' }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === current) ?? { code: 'en', label: 'English' };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-9 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
      >
        <span className="uppercase">{currentLang.code}</span>
        <svg className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-36 overflow-hidden rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setOpen(false)}
              className={`flex w-full items-center px-3 py-2 text-left text-sm hover:bg-neutral-50 ${
                lang.code === current ? 'font-medium text-brand-500' : 'text-neutral-700'
              }`}
            >
              <span className="mr-2 w-6 text-xs uppercase text-neutral-400">{lang.code}</span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
