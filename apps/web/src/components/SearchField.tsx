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
          className={`text-quiet-dot pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 ${large ? 'h-5 w-5' : 'h-4 w-4'}`}
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
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={`border-hairline bg-paper text-ink placeholder:text-quiet-dot focus:border-electric-blue focus:ring-electric-blue/15 block w-full rounded-full border transition-colors outline-none focus:ring-2 ${
            large ? 'py-3.5 pr-11 pl-12 text-lg' : 'py-2.5 pr-10 pl-11 text-sm'
          }`}
        />
        {value && (
          <button
            type="button"
            onClick={() => setValue('')}
            className="text-quiet-dot hover:text-ink absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 transition-colors"
            aria-label="Clear search"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
