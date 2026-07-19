'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/v1/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const json = await res.json();
      if (json.ok) {
        router.push('/admin/wiki');
        router.refresh();
      } else {
        setError(json.error?.message ?? 'Invalid credentials.');
      }
    } catch {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Logo width={160} height={42} className="mx-auto" />
        <h1 className="mt-6 text-center text-lg font-semibold text-neutral-800">Admin sign in</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="rounded-md bg-danger-bg p-3 text-sm text-danger-text">{error}</div>
          )}
          <div>
            <label htmlFor="username" className="text-xs font-medium text-neutral-600">Username</label>
            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus
              className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
          </div>
          <div>
            <label htmlFor="password" className="text-xs font-medium text-neutral-600">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
          </div>
          <button type="submit" disabled={loading}
            className="flex h-11 w-full items-center justify-center rounded-md bg-brand-500 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
