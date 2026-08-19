'use client';

import { useState, useCallback } from 'react';
import { calculateShiftShoppers, formatShoppers, type ShiftShopperInputs } from '@/lib/shift-math';
import { Card } from '@/components/ui/Card';
import { Field, inputClass } from '@/components/ui/Field';

type Inputs = ShiftShopperInputs;

export function ShiftShopperCalculator() {
  const [inputs, setInputs] = useState<Inputs>({
    orderLines: '',
    startTime: '06:00',
    endTime: '14:00',
    breakMinutes: '30',
    inactiveMinutes: '20',
    targetSpeed: '65',
    avgLinesPerRound: '12',
    roundsLeftToStart: '0',
  });

  const set = useCallback((key: keyof Inputs, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const results = calculateShiftShoppers(inputs);

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <Card>
        <h2 className="text-caption text-ink font-semibold">Shift parameters</h2>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <Field label="Order lines">
            <input
              type="number"
              min="1"
              value={inputs.orderLines}
              onChange={(e) => set('orderLines', e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Avg lines per round">
            <input
              type="number"
              min="1"
              step="0.1"
              value={inputs.avgLinesPerRound}
              onChange={(e) => set('avgLinesPerRound', e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Shift start">
            <input
              type="time"
              value={inputs.startTime}
              onChange={(e) => set('startTime', e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Shift end">
            <input
              type="time"
              value={inputs.endTime}
              onChange={(e) => set('endTime', e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Break (min)">
            <input
              type="number"
              min="0"
              value={inputs.breakMinutes}
              onChange={(e) => set('breakMinutes', e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Walking / inactive (min)">
            <input
              type="number"
              min="0"
              value={inputs.inactiveMinutes}
              onChange={(e) => set('inactiveMinutes', e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Target speed (lines/hr)">
            <input
              type="number"
              min="1"
              step="0.1"
              value={inputs.targetSpeed}
              onChange={(e) => set('targetSpeed', e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Rounds left to start">
            <input
              type="number"
              min="0"
              value={inputs.roundsLeftToStart}
              onChange={(e) => set('roundsLeftToStart', e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </Card>

      <div className="space-y-4">
        <Card className="border-brand-100 bg-brand-50/60">
          <h2 className="text-caption text-brand-700 font-semibold">Shoppers needed</h2>
          <p className="text-brand-500 mt-2 text-4xl font-bold tracking-[-0.02em] tabular-nums">
            {results ? results.shoppersNeeded : <span className="text-neutral-300">&mdash;</span>}
          </p>
        </Card>

        <Card>
          <h2 className="text-caption text-ink font-semibold">Rounds needed</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-deep-gray text-sm">Total rounds needed</span>
              <span className="text-ink text-lg font-semibold tabular-nums">
                {results?.totalRoundsNeeded ?? <span className="text-neutral-300">&mdash;</span>}
              </span>
            </div>
            <div className="border-hairline flex items-center justify-between border-t pt-3">
              <span className="text-deep-gray text-sm">Rounds already planned</span>
              <span className="text-ink text-lg font-semibold tabular-nums">
                {results ? (
                  `-${inputs.roundsLeftToStart || 0}`
                ) : (
                  <span className="text-neutral-300">&mdash;</span>
                )}
              </span>
            </div>
            <div className="border-hairline flex items-center justify-between border-t pt-3">
              <span className="text-ink text-sm font-medium">New rounds needed</span>
              <span className="text-brand-500 text-lg font-semibold tabular-nums">
                {results?.newRoundsNeeded ?? <span className="text-neutral-300">&mdash;</span>}
              </span>
            </div>
          </div>
        </Card>

        <details className="border-hairline bg-paper rounded-3xl border">
          <summary className="text-deep-gray hover:text-ink cursor-pointer px-5 py-3.5 text-sm font-medium transition-colors">
            Show breakdown
          </summary>
          <div className="border-hairline space-y-2 border-t px-5 py-4 text-sm">
            <div className="flex justify-between">
              <span className="text-mid-gray">Available hours per shopper</span>
              <span className="text-ink font-medium">
                {results?.availableHours.toFixed(1) ?? '—'} h
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-mid-gray">Lines per shopper</span>
              <span className="text-ink font-medium">
                {results ? formatShoppers(results.capacityPerShopper).toLocaleString() : '—'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-mid-gray">Rounds per shopper</span>
              <span className="text-ink font-medium">{results?.roundsPerShopper ?? '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-mid-gray">Total shift duration</span>
              <span className="text-ink font-medium">
                {(() => {
                  const s = inputs.startTime.split(':').map(Number);
                  const e = inputs.endTime.split(':').map(Number);
                  const sh = s[0] ?? 0;
                  const sm = s[1] ?? 0;
                  const eh = e[0] ?? 0;
                  const em = e[1] ?? 0;
                  if (!isNaN(sh) && !isNaN(eh))
                    return `${(eh + em / 60 - sh - sm / 60).toFixed(1)} h`;
                  return '—';
                })()}
              </span>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
