'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PillButton } from '@/components/ui/PillButton';

type DeleteArticleButtonProps = {
  articleId: string;
  articleTitle: string;
};

export function DeleteArticleButton({ articleId, articleTitle }: DeleteArticleButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/wiki/articles/${articleId}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.ok) {
        router.refresh();
      }
    } catch {
      console.error('Delete failed');
    } finally {
      setLoading(false);
      setConfirm(false);
    }
  }

  if (confirm) {
    return (
      <div className="flex items-center gap-2">
        <PillButton
          type="button"
          variant="danger"
          size="sm"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? '...' : 'Confirm'}
        </PillButton>
        <button
          type="button"
          onClick={() => setConfirm(false)}
          className="text-mid-gray hover:text-deep-gray text-sm font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirm(true)}
      className="text-danger-base hover:bg-danger-bg rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
      title={`Delete ${articleTitle}`}
    >
      Delete
    </button>
  );
}
