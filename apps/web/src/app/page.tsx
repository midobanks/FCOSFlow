'use client';

import { useState, useCallback } from 'react';
import { Logo } from '@/components/Logo';

type Inputs = {
  orderLines: string;
  startTime: string;
  endTime: string;
  breakMinutes: string;
  inactiveMinutes: string;
  targetSpeed: string;
  avgLinesPerRound: string;
  roundsLeftToStart: string;
};

type Results = {
  availableHours: number;
  capacityPerShopper: number;
  roundsPerShopper: number;
  totalRoundsNeeded: number;
  newRoundsNeeded: number;
  shoppersNeeded: number;
};

function calculate(inputs: Inputs): Results | null {
  const orderLines = parseFloat(inputs.orderLines);
  const targetSpeed = parseFloat(inputs.targetSpeed);
  const avgLinesPerRound = parseFloat(inputs.avgLinesPerRound);
  const roundsLeft = parseFloat(inputs.roundsLeftToStart) || 0;
  const breakMin = parseFloat(inputs.breakMinutes) || 0;
  const inactiveMin = parseFloat(inputs.inactiveMinutes) || 0;

  if (!orderLines || !targetSpeed || !avgLinesPerRound || !inputs.startTime || !inputs.endTime) {
    return null;
  }

  const startParts = inputs.startTime.split(':').map(Number);
  const endParts = inputs.endTime.split(':').map(Number);
  const startH = startParts[0] ?? 0;
  const startM = startParts[1] ?? 0;
  const endH = endParts[0] ?? 0;
  const endM = endParts[1] ?? 0;
  if (isNaN(startH) || isNaN(endH)) return null;

  const start = startH + startM / 60;
  const end = endH + endM / 60;
  const totalHours = end - start;
  if (totalHours <= 0) return null;

  const availableHours = totalHours - breakMin / 60 - inactiveMin / 60;
  if (availableHours <= 0) return null;

  const capacityPerShopper = Math.round(availableHours * targetSpeed);
  const shoppersNeeded = Math.ceil(orderLines / capacityPerShopper);

  const roundsPerShopper = availableHours * (targetSpeed / avgLinesPerRound);
  const totalRoundsNeeded = Math.ceil(orderLines / avgLinesPerRound);
  const newRoundsNeeded = Math.max(0, totalRoundsNeeded - roundsLeft);

  return {
    availableHours,
    capacityPerShopper,
    roundsPerShopper: Math.round(roundsPerShopper * 10) / 10,
    totalRoundsNeeded,
    newRoundsNeeded,
    shoppersNeeded,
  };
}

export default function HomePage() {
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

  const results = calculate(inputs);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Logo width={160} height={42} className="mx-auto" />
      <h1 className="mt-6 text-center text-lg font-semibold text-neutral-800">Shift picking calculator</h1>
      <p className="mt-1 text-center text-sm text-neutral-500">Calculate shoppers and rounds needed to complete picking</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-neutral-700">Shift parameters</h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-neutral-600">Order lines</label>
              <input type="number" min="1" value={inputs.orderLines} onChange={(e) => set('orderLines', e.target.value)}
                className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-600">Avg lines per round</label>
              <input type="number" min="1" step="0.1" value={inputs.avgLinesPerRound} onChange={(e) => set('avgLinesPerRound', e.target.value)}
                className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-neutral-600">Shift start</label>
              <input type="time" value={inputs.startTime} onChange={(e) => set('startTime', e.target.value)}
                className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-600">Shift end</label>
              <input type="time" value={inputs.endTime} onChange={(e) => set('endTime', e.target.value)}
                className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-neutral-600">Break (min)</label>
              <input type="number" min="0" value={inputs.breakMinutes} onChange={(e) => set('breakMinutes', e.target.value)}
                className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-600">Walking / inactive (min)</label>
              <input type="number" min="0" value={inputs.inactiveMinutes} onChange={(e) => set('inactiveMinutes', e.target.value)}
                className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-neutral-600">Target speed (lines/hr)</label>
              <input type="number" min="1" step="0.1" value={inputs.targetSpeed} onChange={(e) => set('targetSpeed', e.target.value)}
                className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-600">Rounds left to start</label>
              <input type="number" min="0" value={inputs.roundsLeftToStart} onChange={(e) => set('roundsLeftToStart', e.target.value)}
                className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-brand-200 bg-brand-50 p-5">
            <h2 className="text-sm font-semibold text-brand-700">Shoppers needed</h2>
            <p className="mt-1 text-4xl font-bold text-brand-500">
              {results ? results.shoppersNeeded : <span className="text-neutral-300">&mdash;</span>}
            </p>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-neutral-700">Rounds needed</h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Total rounds needed</span>
                <span className="text-lg font-semibold text-neutral-900">{results?.totalRoundsNeeded ?? <span className="text-neutral-300">&mdash;</span>}</span>
              </div>
              <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                <span className="text-sm text-neutral-600">Rounds already planned</span>
                <span className="text-lg font-semibold text-neutral-900">{results ? `-${inputs.roundsLeftToStart || 0}` : <span className="text-neutral-300">&mdash;</span>}</span>
              </div>
              <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                <span className="text-sm font-medium text-neutral-700">New rounds needed</span>
                <span className="text-lg font-semibold text-brand-500">{results?.newRoundsNeeded ?? <span className="text-neutral-300">&mdash;</span>}</span>
              </div>
            </div>
          </div>

          <details className="rounded-lg border border-neutral-200 bg-white">
            <summary className="cursor-pointer px-5 py-3 text-sm font-medium text-neutral-600 hover:text-neutral-800">Show breakdown</summary>
            <div className="border-t border-neutral-100 px-5 py-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-neutral-500">Available hours per shopper</span><span className="font-medium">{results?.availableHours.toFixed(1) ?? '—'} h</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Lines per shopper</span><span className="font-medium">{results?.capacityPerShopper.toLocaleString() ?? '—'}</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Rounds per shopper</span><span className="font-medium">{results?.roundsPerShopper ?? '—'}</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Total shift duration</span><span className="font-medium">{(() => { const s = inputs.startTime.split(':').map(Number); const e = inputs.endTime.split(':').map(Number); const sh = s[0] ?? 0, sm = s[1] ?? 0, eh = e[0] ?? 0, em = e[1] ?? 0; if (!isNaN(sh) && !isNaN(eh)) return `${(eh + em/60 - sh - sm/60).toFixed(1)} h`; return '—'; })()}</span></div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
