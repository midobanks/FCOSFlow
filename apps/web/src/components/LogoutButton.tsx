'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PillButton } from '@/components/ui/PillButton';

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch('/api/v1/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <PillButton
      type="button"
      variant="secondary"
      size="sm"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? 'Signing out...' : 'Sign out'}
    </PillButton>
  );
}
