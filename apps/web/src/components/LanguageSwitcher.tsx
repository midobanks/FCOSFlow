'use client';

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
        aria-label={`Language: ${currentLang.label}`}
        aria-expanded={open}
        className="text-deep-gray hover:bg-cool-wash hover:text-ink flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors"
      >
        <span className="text-xs font-semibold uppercase">{currentLang.code}</span>
        <svg
          className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="border-hairline bg-paper absolute top-full right-0 mt-2 w-40 overflow-hidden rounded-2xl border py-1.5 shadow-sm">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setOpen(false)}
              className={`hover:bg-cool-wash flex w-full items-center px-3 py-2 text-left text-sm transition-colors ${
                lang.code === current ? 'text-ink font-semibold' : 'text-deep-gray'
              }`}
            >
              <span className="text-quiet-dot mr-2 w-6 text-xs font-medium">{lang.code}</span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
