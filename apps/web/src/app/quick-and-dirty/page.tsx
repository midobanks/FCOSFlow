'use client';

import { useState } from 'react';
import { ShiftShopperCalculator } from '@/components/ShiftShopperCalculator';
import { AdditionalTaskCard, calculateTaskShoppers, type AdditionalTask } from '@/components/AdditionalTaskCard';
import { formatShoppers } from '@/lib/shift-math';

const DEFAULT_TASKS: AdditionalTask[] = [
  { id: 'return-waste', name: 'Return & Waste', hours: '', startTime: '06:00', endTime: '14:00', breakMinutes: '30' },
  { id: 'cleaning', name: 'Cleaning', hours: '', startTime: '06:00', endTime: '14:00', breakMinutes: '30' },
  { id: 'replenishment', name: 'Replenishment', hours: '', startTime: '06:00', endTime: '14:00', breakMinutes: '30' },
  { id: 'splitting', name: 'Splitting', hours: '', startTime: '06:00', endTime: '14:00', breakMinutes: '30' },
  { id: 'extras', name: 'Extras', hours: '', startTime: '06:00', endTime: '14:00', breakMinutes: '30' },
];

export default function QuickAndDirtyPage() {
  const [tasks, setTasks] = useState<AdditionalTask[]>(DEFAULT_TASKS);

  function updateTask(updated: AdditionalTask) {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  const totalShoppers = tasks.reduce((sum, t) => sum + (calculateTaskShoppers(t) ?? 0), 0);
  const tasksWithShoppers = tasks.map((t) => ({ task: t, shoppers: calculateTaskShoppers(t) }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-neutral-900">Shift Steering</h1>
      <p className="mt-1 text-sm text-neutral-600">Plan pick shoppers and additional task staffing for the shift.</p>

      <section className="mt-6">
        <h2 className="text-sm font-semibold text-neutral-700">Shift picking</h2>
        <ShiftShopperCalculator />
      </section>

      <section className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-neutral-700">Additional tasks</h2>
            <p className="mt-0.5 text-xs text-neutral-500">Hours needed, task window, and break per task. Shoppers = hours needed &divide; (window &minus; break).</p>
          </div>
          <div className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-right">
            <p className="text-xs font-medium text-brand-700">Total shoppers</p>
            <p className="text-xl font-bold text-brand-500">{totalShoppers > 0 ? formatShoppers(totalShoppers) : <span className="text-neutral-300">&mdash;</span>}</p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {tasks.map((task) => (
            <AdditionalTaskCard key={task.id} task={task} onChange={updateTask} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-neutral-700">Task summary</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-left text-xs font-medium text-neutral-500">
                  <th className="pb-2 pr-4">Task</th>
                  <th className="pb-2 pr-4">Hours</th>
                  <th className="pb-2 pr-4">Start</th>
                  <th className="pb-2 pr-4">End</th>
                  <th className="pb-2 pr-4">Break (min)</th>
                  <th className="pb-2 text-right">Shoppers</th>
                </tr>
              </thead>
              <tbody>
                {tasksWithShoppers.map(({ task, shoppers }) => (
                  <tr key={task.id} className="border-b border-neutral-100">
                    <td className="py-2 pr-4 font-medium text-neutral-800">{task.name}</td>
                    <td className="py-2 pr-4 text-neutral-600">{task.hours || '—'}</td>
                    <td className="py-2 pr-4 text-neutral-600">{task.startTime || '—'}</td>
                    <td className="py-2 pr-4 text-neutral-600">{task.endTime || '—'}</td>
                    <td className="py-2 pr-4 text-neutral-600">{task.breakMinutes || '—'}</td>
                    <td className="py-2 text-right">
                      <span className={`rounded px-2 py-0.5 text-xs font-semibold ${shoppers ? 'bg-brand-50 text-brand-500' : 'bg-neutral-50 text-neutral-300'}`}>
                        {shoppers != null ? formatShoppers(shoppers) : '—'}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="py-2 pr-4 font-semibold text-neutral-900">Total</td>
                  <td className="py-2 pr-4 text-neutral-600">{tasks.reduce((sum, t) => sum + (parseFloat(t.hours) || 0), 0).toFixed(1)} h</td>
                  <td className="py-2 pr-4" />
                  <td className="py-2 pr-4" />
                  <td className="py-2 pr-4" />
                  <td className="py-2 text-right font-semibold text-brand-500">{totalShoppers > 0 ? formatShoppers(totalShoppers) : '—'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
