'use client';

import { useState } from 'react';

type ScopeKey =
  | 'ambient'
  | 'chilled'
  | 'packaging'
  | 'stockflow'
  | 'receipt'
  | 'inflow'
  | 'onboarding';

type TodoItem = {
  id: string;
  label: string;
  done: boolean;
};

const scopeConfig: Record<ScopeKey, { title: string; borderColor: string; bgColor: string }> = {
  ambient:    { title: 'Ambient Captain',     borderColor: 'border-l-brand-500',  bgColor: 'bg-brand-50' },
  chilled:    { title: 'Chilled Captain',      borderColor: 'border-l-info-base',  bgColor: 'bg-info-bg' },
  packaging:  { title: 'Packaging Captain',    borderColor: 'border-l-unknown-base', bgColor: 'bg-unknown-bg' },
  stockflow:  { title: 'Stockflow Captain',    borderColor: 'border-l-success-base', bgColor: 'bg-success-bg' },
  receipt:    { title: 'Receipt Captain',      borderColor: 'border-l-warning-base', bgColor: 'bg-warning-bg' },
  inflow:     { title: 'Inflow Captain',       borderColor: 'border-l-danger-base', bgColor: 'bg-danger-bg' },
  onboarding: { title: 'Onboarding / SER Captain', borderColor: 'border-l-neutral-400', bgColor: 'bg-neutral-50' },
};

const scopeKeys: ScopeKey[] = ['ambient', 'chilled', 'packaging', 'stockflow', 'receipt', 'inflow', 'onboarding'];

const defaultTodos: Record<ScopeKey, TodoItem[]> = {
  ambient:    [{ id: 'a-1', label: 'Review shift handover from previous shift', done: false }, { id: 'a-2', label: 'Confirm team attendance', done: false }, { id: 'a-3', label: 'Complete start-of-shift checklist', done: false }, { id: 'a-4', label: 'Escalate high-risk exceptions', done: false }, { id: 'a-5', label: 'Prepare end-of-shift handover notes', done: false }],
  chilled:    [{ id: 'c-1', label: 'Review shift handover from previous shift', done: false }, { id: 'c-2', label: 'Confirm team attendance', done: false }, { id: 'c-3', label: 'Complete start-of-shift checklist', done: false }, { id: 'c-4', label: 'Escalate high-risk exceptions', done: false }, { id: 'c-5', label: 'Prepare end-of-shift handover notes', done: false }],
  packaging:  [{ id: 'p-1', label: 'Review shift handover from previous shift', done: false }, { id: 'p-2', label: 'Confirm team attendance', done: false }, { id: 'p-3', label: 'Complete start-of-shift checklist', done: false }, { id: 'p-4', label: 'Escalate high-risk exceptions', done: false }, { id: 'p-5', label: 'Prepare end-of-shift handover notes', done: false }],
  stockflow:  [{ id: 's-1', label: 'Review shift handover from previous shift', done: false }, { id: 's-2', label: 'Confirm team attendance', done: false }, { id: 's-3', label: 'Complete start-of-shift checklist', done: false }, { id: 's-4', label: 'Escalate high-risk exceptions', done: false }, { id: 's-5', label: 'Prepare end-of-shift handover notes', done: false }],
  receipt:    [{ id: 'r-1', label: 'Review shift handover from previous shift', done: false }, { id: 'r-2', label: 'Confirm team attendance', done: false }, { id: 'r-3', label: 'Complete start-of-shift checklist', done: false }, { id: 'r-4', label: 'Escalate high-risk exceptions', done: false }, { id: 'r-5', label: 'Prepare end-of-shift handover notes', done: false }],
  inflow:     [{ id: 'i-1', label: 'Review shift handover from previous shift', done: false }, { id: 'i-2', label: 'Confirm team attendance', done: false }, { id: 'i-3', label: 'Complete start-of-shift checklist', done: false }, { id: 'i-4', label: 'Escalate high-risk exceptions', done: false }, { id: 'i-5', label: 'Prepare end-of-shift handover notes', done: false }],
  onboarding: [{ id: 'o-1', label: 'Review shift handover from previous shift', done: false }, { id: 'o-2', label: 'Confirm team attendance', done: false }, { id: 'o-3', label: 'Complete start-of-shift checklist', done: false }, { id: 'o-4', label: 'Escalate high-risk exceptions', done: false }, { id: 'o-5', label: 'Prepare end-of-shift handover notes', done: false }],
};

export default function CompanionPage() {
  const [todos, setTodos] = useState<Record<ScopeKey, TodoItem[]>>(defaultTodos);
  const [collapsed, setCollapsed] = useState<Record<ScopeKey, boolean>>(() => {
    const c: any = {};
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Captain todo list</h1>
          <p className="mt-0.5 text-sm text-neutral-500">
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <button type="button" onClick={resetAll} className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-500 hover:bg-neutral-50">
          Reset all
        </button>
      </div>

      <div className="mb-8 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-baseline gap-2 text-sm">
            <span className="text-lg font-bold text-brand-500">{doneTotal}</span>
            <span className="text-neutral-400">/ {itemTotal} tasks</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
            <div className="h-full rounded-full bg-brand-500 transition-all duration-300" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {scopeKeys.map((key) => {
          const cfg = scopeConfig[key];
          const items = todos[key];
          const done = items.filter((t) => t.done).length;

          return (
            <div key={key} className={`rounded-lg border border-neutral-200 bg-white border-l-4 ${cfg.borderColor}`}>
              <button
                type="button"
                onClick={() => setCollapsed((p) => ({ ...p, [key]: !p[key] }))}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <div>
                  <h2 className="text-sm font-semibold text-neutral-900">{cfg.title}</h2>
                  <p className="text-xs text-neutral-500">{done}/{items.length}</p>
                </div>
                <svg className={`h-4 w-4 text-neutral-400 transition-transform ${collapsed[key] ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {!collapsed[key] && (
                <div className="border-t border-neutral-100 px-4 py-2">
                  {items.map((item) => (
                    <label key={item.id} className="flex cursor-pointer items-start gap-3 rounded-md px-2 py-2 text-sm hover:bg-neutral-25">
                      <input type="checkbox" checked={item.done} onChange={() => toggle(key, item.id)} className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-brand-500" />
                      <span className={item.done ? 'text-neutral-400 line-through' : 'text-neutral-700'}>{item.label}</span>
                    </label>
                  ))}
                  <button type="button" onClick={() => reset(key)} className="mt-1 w-full rounded-md px-2 py-1.5 text-xs text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600">
                    Reset scope
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
