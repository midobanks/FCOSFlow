'use client';

import { calculateTaskShoppers, type AdditionalTask } from './AdditionalTaskCalculator';
import { formatShoppers } from '@/lib/shift-math';
import { Card } from '@/components/ui/Card';
import { Field, inputClass } from '@/components/ui/Field';

export { calculateTaskShoppers, type AdditionalTask };

type AdditionalTaskCardProps = {
  task: AdditionalTask;
  onChange: (task: AdditionalTask) => void;
};

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
  const formattedShoppers = shoppers != null ? formatShoppers(shoppers) : null;

  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-caption text-ink font-semibold">{task.name}</h3>
        <span
          className={`rounded-full px-3 py-1 text-sm font-bold tabular-nums ${
            shoppers ? 'bg-brand-50 text-brand-600' : 'bg-cool-wash text-quiet-dot'
          }`}
        >
          {formattedShoppers != null
            ? `${formattedShoppers} shopper${formattedShoppers === 1 ? '' : 's'}`
            : '—'}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Field label="Hours needed">
          <input
            type="number"
            min="0"
            step="0.5"
            value={task.hours}
            placeholder="0"
            onChange={(e) => update('hours', e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Start time">
          <input
            type="time"
            value={task.startTime}
            onChange={(e) => update('startTime', e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="End time">
          <input
            type="time"
            value={task.endTime}
            onChange={(e) => update('endTime', e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Break (min)">
          <input
            type="number"
            min="0"
            value={task.breakMinutes}
            onChange={(e) => update('breakMinutes', e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      {showBreakdown && (
        <p className="text-mid-gray mt-4 text-xs">
          {windowHours.toFixed(1)} h window &minus;{' '}
          {breakHours > 0
            ? `${(breakHours * 60).toFixed(0)} min break = ${productiveHours.toFixed(1)} h`
            : `${productiveHours.toFixed(1)} h`}{' '}
          per shopper &rarr; {formattedShoppers}
        </p>
      )}
    </Card>
  );
}
