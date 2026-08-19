'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { PillButton } from '@/components/ui/PillButton';

type ScopeKey =
  'ambient' | 'chilled' | 'packaging' | 'stockflow' | 'receipt' | 'inflow' | 'onboarding';

type TodoItem = {
  id: string;
  label: string;
  done: boolean;
};

const scopeConfig: Record<ScopeKey, { title: string; dot: string }> = {
  ambient: { title: 'Ambient Captain', dot: 'bg-brand-500' },
  chilled: { title: 'Chilled Captain', dot: 'bg-info-base' },
  packaging: { title: 'Packaging Captain', dot: 'bg-unknown-base' },
  stockflow: { title: 'Stockflow Captain', dot: 'bg-success-base' },
  receipt: { title: 'Receipt Captain', dot: 'bg-warning-base' },
  inflow: { title: 'Inflow Captain', dot: 'bg-danger-base' },
  onboarding: { title: 'Onboarding / SER Captain', dot: 'bg-quiet-dot' },
};

const scopeKeys: ScopeKey[] = [
  'ambient',
  'chilled',
  'packaging',
  'stockflow',
  'receipt',
  'inflow',
  'onboarding',
];

const defaultTodos: Record<ScopeKey, TodoItem[]> = {
  ambient: [
    { id: 'a-1', label: 'Review shift handover from previous shift', done: false },
    { id: 'a-2', label: 'Confirm team attendance', done: false },
    { id: 'a-3', label: 'Complete start-of-shift checklist', done: false },
    { id: 'a-4', label: 'Escalate high-risk exceptions', done: false },
    { id: 'a-5', label: 'Prepare end-of-shift handover notes', done: false },
  ],
  chilled: [
    { id: 'c-1', label: 'Review shift handover from previous shift', done: false },
    { id: 'c-2', label: 'Confirm team attendance', done: false },
    { id: 'c-3', label: 'Complete start-of-shift checklist', done: false },
    { id: 'c-4', label: 'Escalate high-risk exceptions', done: false },
    { id: 'c-5', label: 'Prepare end-of-shift handover notes', done: false },
  ],
  packaging: [
    { id: 'p-1', label: 'Review shift handover from previous shift', done: false },
    { id: 'p-2', label: 'Confirm team attendance', done: false },
    { id: 'p-3', label: 'Complete start-of-shift checklist', done: false },
    { id: 'p-4', label: 'Escalate high-risk exceptions', done: false },
    { id: 'p-5', label: 'Prepare end-of-shift handover notes', done: false },
  ],
  stockflow: [
    { id: 's-1', label: 'Review shift handover from previous shift', done: false },
    { id: 's-2', label: 'Confirm team attendance', done: false },
    { id: 's-3', label: 'Complete start-of-shift checklist', done: false },
    { id: 's-4', label: 'Escalate high-risk exceptions', done: false },
    { id: 's-5', label: 'Prepare end-of-shift handover notes', done: false },
  ],
  receipt: [
    { id: 'r-1', label: 'Review shift handover from previous shift', done: false },
    { id: 'r-2', label: 'Confirm team attendance', done: false },
    { id: 'r-3', label: 'Complete start-of-shift checklist', done: false },
    { id: 'r-4', label: 'Escalate high-risk exceptions', done: false },
    { id: 'r-5', label: 'Prepare end-of-shift handover notes', done: false },
  ],
  inflow: [
    { id: 'i-1', label: 'Review shift handover from previous shift', done: false },
    { id: 'i-2', label: 'Confirm team attendance', done: false },
    { id: 'i-3', label: 'Complete start-of-shift checklist', done: false },
    { id: 'i-4', label: 'Escalate high-risk exceptions', done: false },
    { id: 'i-5', label: 'Prepare end-of-shift handover notes', done: false },
  ],
  onboarding: [
    { id: 'o-1', label: 'Review shift handover from previous shift', done: false },
    { id: 'o-2', label: 'Confirm team attendance', done: false },
    { id: 'o-3', label: 'Complete start-of-shift checklist', done: false },
    { id: 'o-4', label: 'Escalate high-risk exceptions', done: false },
    { id: 'o-5', label: 'Prepare end-of-shift handover notes', done: false },
  ],
};

export default function CompanionPage() {
  const [todos, setTodos] = useState<Record<ScopeKey, TodoItem[]>>(defaultTodos);
  const [collapsed, setCollapsed] = useState<Record<ScopeKey, boolean>>(() => {
    const c: Record<ScopeKey, boolean> = {} as Record<ScopeKey, boolean>;
    for (const k of scopeKeys) c[k] = false;
    return c;
  });

  function toggle(scope: ScopeKey, id: string) {
    setTodos((prev) => ({
      ...prev,
      [scope]: prev[scope].map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    }));
  }

  function reset(scope: ScopeKey) {
    setTodos((prev) => ({
      ...prev,
      [scope]: prev[scope].map((t) => ({ ...t, done: false })),
    }));
  }

  function resetAll() {
    setTodos((prev) => {
      const next = { ...prev };
      for (const k of scopeKeys) next[k] = next[k].map((t) => ({ ...t, done: false }));
      return next;
    });
  }

  const doneTotal = scopeKeys.reduce((s, k) => s + todos[k].filter((t) => t.done).length, 0);
  const itemTotal = scopeKeys.reduce((s, k) => s + todos[k].length, 0);
  const pct = itemTotal > 0 ? (doneTotal / itemTotal) * 100 : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Checklist"
        subtitle={new Date().toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
        action={
          <PillButton variant="secondary" size="sm" onClick={resetAll}>
            Reset all
          </PillButton>
        }
      />

      <Card className="mb-8 flex items-center gap-4">
        <div className="flex items-baseline gap-2 text-sm">
          <span className="text-brand-500 text-2xl font-bold tabular-nums">{doneTotal}</span>
          <span className="text-mid-gray">/ {itemTotal} tasks</span>
        </div>
        <div className="bg-cool-wash h-2 flex-1 overflow-hidden rounded-full">
          <div
            className="bg-brand-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {scopeKeys.map((key) => {
          const cfg = scopeConfig[key];
          const items = todos[key];
          const done = items.filter((t) => t.done).length;
          const complete = done === items.length;

          return (
            <Card key={key} padded={false} className="overflow-hidden">
              <button
                type="button"
                onClick={() => setCollapsed((p) => ({ ...p, [key]: !p[key] }))}
                aria-expanded={!collapsed[key]}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${cfg.dot}`} />
                  <div>
                    <h2 className="text-caption text-ink font-semibold">{cfg.title}</h2>
                    <p className="text-mid-gray text-xs">
                      {done}/{items.length}
                    </p>
                  </div>
                </div>
                <svg
                  className={`text-quiet-dot h-4 w-4 transition-transform ${collapsed[key] ? '' : 'rotate-180'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {!collapsed[key] && (
                <div className="border-hairline border-t px-3 py-3">
                  {items.map((item) => (
                    <label
                      key={item.id}
                      className="hover:bg-canvas flex cursor-pointer items-start gap-3 rounded-xl px-2 py-2 text-sm transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => toggle(key, item.id)}
                        className="border-hairline accent-brand-500 mt-0.5 h-4 w-4 rounded-md"
                      />
                      <span
                        className={item.done ? 'text-quiet-dot line-through' : 'text-deep-gray'}
                      >
                        {item.label}
                      </span>
                    </label>
                  ))}
                  <button
                    type="button"
                    onClick={() => reset(key)}
                    className="text-quiet-dot hover:bg-cool-wash hover:text-ink mt-1 w-full rounded-xl px-2 py-2 text-xs font-medium transition-colors"
                  >
                    Reset scope
                  </button>
                </div>
              )}

              {complete && (
                <p className="border-hairline bg-success-bg text-success-text border-t px-5 py-2.5 text-xs font-semibold">
                  Scope complete
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
