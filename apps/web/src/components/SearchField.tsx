'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

type SearchFieldProps = {
  large?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  initialValue?: string;
  basePath?: string;
};

export function SearchField({
  large = false,
  placeholder = 'Search articles, SKUs, processes...',
  autoFocus = false,
  initialValue = '',
  basePath = '/search',
}: SearchFieldProps) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (q) {
      router.push(`${basePath}?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <svg
          className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 ${large ? 'h-5 w-5' : 'h-4 w-4'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={`block w-full rounded-lg border border-neutral-200 bg-white text-neutral-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 ${
            large ? 'py-3.5 pl-11 pr-4 text-lg' : 'py-2.5 pl-10 pr-3 text-sm'
          }`}
        />
        {value && (
          <button
            type="button"
            onClick={() => setValue('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            aria-label="Clear search"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
