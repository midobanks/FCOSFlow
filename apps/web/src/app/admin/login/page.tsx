'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { Card } from '@/components/ui/Card';
import { Field, inputClass } from '@/components/ui/Field';
import { PillButton } from '@/components/ui/PillButton';

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
        <h1 className="text-ink mt-6 text-center text-lg font-semibold">Admin sign in</h1>
        <Card padded className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-danger-bg text-danger-text rounded-md p-3 text-sm">{error}</div>
            )}
            <Field label="Username">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                className={inputClass}
              />
            </Field>
            <Field label="Password">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputClass}
              />
            </Field>
            <PillButton type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </PillButton>
          </form>
        </Card>
      </div>
    </div>
  );
}
