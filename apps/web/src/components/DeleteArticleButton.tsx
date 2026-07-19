'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="rounded px-2 py-1 text-xs font-medium text-white bg-danger-base hover:opacity-90 disabled:opacity-50"
        >
          {loading ? '...' : 'Confirm'}
        </button>
        <button
          type="button"
          onClick={() => setConfirm(false)}
          className="rounded px-2 py-1 text-xs text-neutral-500 hover:text-neutral-700"
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
      className="rounded px-2 py-1 text-xs font-medium text-danger-text hover:bg-danger-bg"
      title={`Delete ${articleTitle}`}
    >
      Delete
    </button>
  );
}
