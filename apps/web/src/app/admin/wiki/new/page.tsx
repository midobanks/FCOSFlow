'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const articleTypes = [
  { value: 'SOP', label: 'SOP' },
  { value: 'PROCESS', label: 'Process' },
  { value: 'FAQ', label: 'FAQ' },
  { value: 'TEMPLATE', label: 'Template' },
  { value: 'TRAINING_GUIDE', label: 'Training Guide' },
  { value: 'POLICY', label: 'Policy' },
  { value: 'CHECKLIST', label: 'Checklist' },
  { value: 'TROUBLESHOOTING', label: 'Troubleshooting' },
  { value: 'QUICK_REFERENCE', label: 'Quick Reference' },
];

const processAreas = [
  { value: 'RECEIPT', label: 'Receipt' },
  { value: 'PICKING', label: 'Picking' },
  { value: 'STOCKFLOW', label: 'Stockflow' },
  { value: 'TRUNKING', label: 'Trunking' },
  { value: 'INFLOW', label: 'Inflow' },
];

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [articleType, setArticleType] = useState('SOP');
  const [processArea, setProcessArea] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/v1/wiki/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          summary: summary || undefined,
          articleType,
          processArea: processArea || undefined,
          content: { type: 'doc', content: [] },
        }),
      });

      const json = await res.json();
      if (json.ok) {
        router.push('/admin/wiki');
        router.refresh();
      } else {
        setError(json.error?.message ?? 'Failed to create article.');
      }
    } catch {
      setError('Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="text-2xl font-bold text-neutral-900">New article</h1>
      <p className="mt-1 text-sm text-neutral-600">Create a new warehouse wiki article.</p>

      {error && (
        <div className="mt-4 rounded-md bg-danger-bg p-3 text-sm text-danger-text">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="title" className="text-xs font-medium text-neutral-600">Title</label>
            <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required
              className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="articleType" className="text-xs font-medium text-neutral-600">Article type</label>
            <select id="articleType" value={articleType} onChange={(e) => setArticleType(e.target.value)}
              className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500">
              {articleTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="processArea" className="text-xs font-medium text-neutral-600">Process area</label>
            <select id="processArea" value={processArea} onChange={(e) => setProcessArea(e.target.value)}
              className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500">
              <option value="">— Select process area —</option>
              {processAreas.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="summary" className="text-xs font-medium text-neutral-600">Summary</label>
          <textarea id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} rows={3}
            className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={submitting}
            className="inline-flex h-11 items-center rounded-md bg-brand-500 px-5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50">
            {submitting ? 'Creating...' : 'Create article'}
          </button>
          <a href="/admin/wiki"
            className="inline-flex h-11 items-center rounded-md border border-neutral-200 bg-white px-5 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
