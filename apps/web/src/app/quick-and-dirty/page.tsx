'use client';

import { useState } from 'react';
import { ShiftShopperCalculator } from '@/components/ShiftShopperCalculator';
import {
  AdditionalTaskCard,
  calculateTaskShoppers,
  type AdditionalTask,
} from '@/components/AdditionalTaskCard';
import { formatShoppers } from '@/lib/shift-math';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { PillButton } from '@/components/ui/PillButton';

const DEFAULT_TASKS: AdditionalTask[] = [
  {
    id: 'return-waste',
    name: 'Return & Waste',
    hours: '',
    startTime: '06:00',
    endTime: '14:00',
    breakMinutes: '30',
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    hours: '',
    startTime: '06:00',
    endTime: '14:00',
    breakMinutes: '30',
  },
  {
    id: 'replenishment',
    name: 'Replenishment',
    hours: '',
    startTime: '06:00',
    endTime: '14:00',
    breakMinutes: '30',
  },
  {
    id: 'splitting',
    name: 'Splitting',
    hours: '',
    startTime: '06:00',
    endTime: '14:00',
    breakMinutes: '30',
  },
  {
    id: 'extras',
    name: 'Extras',
    hours: '',
    startTime: '06:00',
    endTime: '14:00',
    breakMinutes: '30',
  },
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
      <PageHeader
        title="Shift Steering"
        subtitle="Plan pick shoppers and additional task staffing for the shift."
      />

      <section>
        <h2 className="text-caption text-ink font-semibold">Shift picking</h2>
        <ShiftShopperCalculator />
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-caption text-ink font-semibold">Additional tasks</h2>
            <p className="text-mid-gray mt-0.5 text-xs">
              Hours needed, task window, and break per task. Shoppers = hours needed &divide;
              (window &minus; break).
            </p>
          </div>
          <div className="border-hairline bg-paper rounded-full border px-5 py-2.5 text-right">
            <p className="text-mid-gray text-xs font-medium">Total shoppers</p>
            <p className="text-brand-500 text-xl font-bold tabular-nums">
              {totalShoppers > 0 ? (
                formatShoppers(totalShoppers)
              ) : (
                <span className="text-neutral-300">&mdash;</span>
              )}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {tasks.map((task) => (
            <AdditionalTaskCard key={task.id} task={task} onChange={updateTask} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <Card>
          <h2 className="text-caption text-ink font-semibold">Task summary</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-hairline text-mid-gray border-b text-left text-xs font-medium">
                  <th className="pr-4 pb-2">Task</th>
                  <th className="pr-4 pb-2">Hours</th>
                  <th className="pr-4 pb-2">Start</th>
                  <th className="pr-4 pb-2">End</th>
                  <th className="pr-4 pb-2">Break (min)</th>
                  <th className="pb-2 text-right">Shoppers</th>
                </tr>
              </thead>
              <tbody>
                {tasksWithShoppers.map(({ task, shoppers }) => (
                  <tr key={task.id} className="border-hairline border-b">
                    <td className="text-ink py-2.5 pr-4 font-medium">{task.name}</td>
                    <td className="text-deep-gray py-2.5 pr-4">{task.hours || '—'}</td>
                    <td className="text-deep-gray py-2.5 pr-4">{task.startTime || '—'}</td>
                    <td className="text-deep-gray py-2.5 pr-4">{task.endTime || '—'}</td>
                    <td className="text-deep-gray py-2.5 pr-4">{task.breakMinutes || '—'}</td>
                    <td className="py-2.5 text-right">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${shoppers ? 'bg-brand-50 text-brand-600' : 'bg-cool-wash text-quiet-dot'}`}
                      >
                        {shoppers != null ? formatShoppers(shoppers) : '—'}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="text-ink py-3 pr-4 font-semibold">Total</td>
                  <td className="text-deep-gray py-3 pr-4">
                    {tasks.reduce((sum, t) => sum + (parseFloat(t.hours) || 0), 0).toFixed(1)} h
                  </td>
                  <td className="py-3 pr-4" />
                  <td className="py-3 pr-4" />
                  <td className="py-3 pr-4" />
                  <td className="text-brand-500 py-3 text-right font-semibold">
                    {totalShoppers > 0 ? formatShoppers(totalShoppers) : '—'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-5">
            <PillButton variant="secondary" size="sm">
              Export summary
            </PillButton>
          </div>
        </Card>
      </section>
    </div>
  );
}
