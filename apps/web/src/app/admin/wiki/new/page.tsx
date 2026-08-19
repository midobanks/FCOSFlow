'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RichTextEditor } from '@/components/RichTextEditor';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Field, inputClass } from '@/components/ui/Field';
import { PillButton } from '@/components/ui/PillButton';

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
  const [content, setContent] = useState<Record<string, unknown>>({ type: 'doc', content: [] });
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
          content,
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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <PageHeader
        title="New article"
        subtitle="Create a new warehouse wiki article with rich content."
      />

      {error && (
        <div className="bg-danger-bg text-danger-text mb-6 rounded-md p-3 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card padded className="space-y-6">
          <Field label="Title">
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={inputClass}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Article type">
              <select
                id="articleType"
                value={articleType}
                onChange={(e) => setArticleType(e.target.value)}
                className={inputClass}
              >
                {articleTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Process area">
              <select
                id="processArea"
                value={processArea}
                onChange={(e) => setProcessArea(e.target.value)}
                className={inputClass}
              >
                <option value="">— Select process area —</option>
                {processAreas.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Summary">
            <textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={2}
              className={inputClass}
            />
          </Field>

          <Field label="Content">
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Write your article content here..."
            />
          </Field>
        </Card>

        <div className="flex gap-4">
          <PillButton type="submit" size="lg" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create article'}
          </PillButton>
          <a
            href="/admin/wiki"
            className="border-ink/15 bg-paper text-ink hover:bg-cool-wash inline-flex items-center rounded-full border px-6 py-2.5 text-sm font-medium transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
