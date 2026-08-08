'use client';

import { calculateTaskShoppers, type AdditionalTask } from './AdditionalTaskCalculator';

export { calculateTaskShoppers, type AdditionalTask };

type AdditionalTaskCardProps = {
  task: AdditionalTask;
  onChange: (task: AdditionalTask) => void;
};

const inputClass =
  'mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500';

function timeToHours(time: string): number | null {
  if (!time) return null;
  const [h, m] = time.split(':').map(Number);
  if (h == null || m == null || isNaN(h) || isNaN(m)) return null;
  return h + m / 60;
}

export function AdditionalTaskCard({ task, onChange }: AdditionalTaskCardProps) {
  function update(field: keyof AdditionalTask, value: string) {
    onChange({ ...task, [field]: value });
  }

  const shoppers = calculateTaskShoppers(task);
  const start = timeToHours(task.startTime);
  const end = timeToHours(task.endTime);
  const breakHours = (parseFloat(task.breakMinutes) || 0) / 60;
  const windowHours = start != null && end != null ? end - start : null;
  const productiveHours = windowHours != null ? windowHours - breakHours : null;
  const showBreakdown = shoppers != null && windowHours != null && productiveHours != null;

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-neutral-700">{task.name}</h3>
        <span className={`rounded-md px-2.5 py-1 text-base font-bold ${shoppers ? 'bg-brand-50 text-brand-500' : 'bg-neutral-50 text-neutral-300'}`}>
          {shoppers ? `${shoppers} shopper${shoppers === 1 ? '' : 's'}` : '—'}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <label className="text-xs font-medium text-neutral-600">Hours needed</label>
          <input type="number" min="0" step="0.5" value={task.hours} placeholder="0" onChange={(e) => update('hours', e.target.value)}
            className={inputClass} />
        </div>
        <div>
          <label className="text-xs font-medium text-neutral-600">Start time</label>
          <input type="time" value={task.startTime} onChange={(e) => update('startTime', e.target.value)}
            className={`${inputClass} min-w-0`} />
        </div>
        <div>
          <label className="text-xs font-medium text-neutral-600">End time</label>
          <input type="time" value={task.endTime} onChange={(e) => update('endTime', e.target.value)}
            className={`${inputClass} min-w-0`} />
        </div>
        <div>
          <label className="text-xs font-medium text-neutral-600">Break (min)</label>
          <input type="number" min="0" value={task.breakMinutes} onChange={(e) => update('breakMinutes', e.target.value)}
            className={inputClass} />
        </div>
      </div>

      {showBreakdown && (
        <p className="mt-3 text-xs text-neutral-500">
          {windowHours.toFixed(1)} h window &minus; {breakHours > 0 ? `${(breakHours * 60).toFixed(0)} min break = ${productiveHours.toFixed(1)} h` : `${productiveHours.toFixed(1)} h`} per shopper &rarr; {shoppers}
        </p>
      )}
    </div>
  );
}
