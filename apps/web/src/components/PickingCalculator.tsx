import { useState } from 'react';
import { formatShoppers } from '@/lib/shift-math';

type PickingCalculatorProps = {
  zoneName: string;
  availableHoursPerShopper: number;
  inactiveMinutes: number;
};

type Inputs = {
  totalOls: string;
  completedOls: string;
  targetSpeed: string;
  avgLinesPerRound: string;
  transitionMinutes: string;
  endTime: string;
  assignedShoppers: string;
};

type Results = {
  remainingOls: number;
  baseHours: number;
  estimatedRounds: number;
  transitionHours: number;
  adjustedHours: number;
  shoppersNeeded: number;
  gap: number;
  projectedFinish: string;
};

function calculate(inputs: Inputs, availableHoursPerShopper: number, inactiveMin: number): Results | null {
  const totalOls = parseFloat(inputs.totalOls);
  const completedOls = parseFloat(inputs.completedOls) || 0;
  const speed = parseFloat(inputs.targetSpeed);
  const avgLines = parseFloat(inputs.avgLinesPerRound);
  const transitionMin = parseFloat(inputs.transitionMinutes) || 0;
  const assigned = parseFloat(inputs.assignedShoppers) || 0;

  if (!totalOls || !speed || !avgLines) return null;

  const remainingOls = totalOls - completedOls;
  const baseHours = remainingOls / speed;
  const estimatedRounds = formatShoppers(remainingOls / avgLines);
  const transitionHours = (estimatedRounds * transitionMin) / 60;
  const adjustedHours = baseHours + transitionHours + inactiveMin / 60;

  const effectiveHours = availableHoursPerShopper;
  const shoppersNeeded = effectiveHours > 0 ? formatShoppers(adjustedHours / effectiveHours) : 0;
  const gap = formatShoppers(assigned > 0 ? shoppersNeeded - assigned : shoppersNeeded);

  const projectedFinish = (() => {
    if (assigned <= 0) return '—';
    const hoursPerShopper = adjustedHours / assigned;
    const now = new Date();
    now.setHours(now.getHours() + hoursPerShopper);
    return now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  })();

  return { remainingOls, baseHours, estimatedRounds, transitionHours, adjustedHours, shoppersNeeded, gap, projectedFinish };
}

export function PickingCalculator({ zoneName, availableHoursPerShopper, inactiveMinutes }: PickingCalculatorProps) {
  const [inputs, setInputs] = useState<Inputs>({
    totalOls: '',
    completedOls: '0',
    targetSpeed: '65',
    avgLinesPerRound: '12',
    transitionMinutes: '2',
    endTime: '14:00',
    assignedShoppers: '',
  });

  const results = calculate(inputs, availableHoursPerShopper, inactiveMinutes);
  const [expanded, setExpanded] = useState(false);

  function set(field: keyof Inputs, value: string) {
    setInputs((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-white">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-neutral-800 hover:bg-neutral-25"
      >
        <span>Picking calculator</span>
        <svg className={`h-4 w-4 text-neutral-400 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="border-t border-neutral-100 px-4 py-3 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-neutral-500">Total OLS</label>
              <input type="number" min="1" value={inputs.totalOls} onChange={(e) => set('totalOls', e.target.value)}
                className="mt-0.5 block w-full rounded border border-neutral-200 px-2 py-1 text-xs outline-none focus:border-brand-500" />
            </div>
            <div>
              <label className="text-xs text-neutral-500">Completed OLS</label>
              <input type="number" min="0" value={inputs.completedOls} onChange={(e) => set('completedOls', e.target.value)}
                className="mt-0.5 block w-full rounded border border-neutral-200 px-2 py-1 text-xs outline-none focus:border-brand-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-neutral-500">Target speed (ols/hr)</label>
              <input type="number" min="1" step="0.1" value={inputs.targetSpeed} onChange={(e) => set('targetSpeed', e.target.value)}
                className="mt-0.5 block w-full rounded border border-neutral-200 px-2 py-1 text-xs outline-none focus:border-brand-500" />
            </div>
            <div>
              <label className="text-xs text-neutral-500">Avg OLS per round</label>
              <input type="number" min="1" step="0.1" value={inputs.avgLinesPerRound} onChange={(e) => set('avgLinesPerRound', e.target.value)}
                className="mt-0.5 block w-full rounded border border-neutral-200 px-2 py-1 text-xs outline-none focus:border-brand-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-neutral-500">Transition (min/round)</label>
              <input type="number" min="0" step="0.5" value={inputs.transitionMinutes} onChange={(e) => set('transitionMinutes', e.target.value)}
                className="mt-0.5 block w-full rounded border border-neutral-200 px-2 py-1 text-xs outline-none focus:border-brand-500" />
            </div>
            <div>
              <label className="text-xs text-neutral-500">Inactive time</label>
              <p className="mt-0.5 text-sm font-medium text-neutral-800">{inactiveMinutes} min</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-neutral-500">Assigned Shoppers</label>
              <input type="number" min="0" value={inputs.assignedShoppers} onChange={(e) => set('assignedShoppers', e.target.value)}
                className="mt-0.5 block w-full rounded border border-neutral-200 px-2 py-1 text-xs outline-none focus:border-brand-500" />
            </div>
            <div>
              <label className="text-xs text-neutral-500">Required end time</label>
              <input type="time" value={inputs.endTime} onChange={(e) => set('endTime', e.target.value)}
                className="mt-0.5 block w-full rounded border border-neutral-200 px-2 py-1 text-xs outline-none focus:border-brand-500" />
            </div>
          </div>

          {results && (
            <div className="rounded-md bg-neutral-50 p-3 space-y-1.5 text-xs">
              <div className="flex justify-between"><span className="text-neutral-500">Remaining OLS</span><span className="font-medium">{results.remainingOls.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Base picking hours</span><span className="font-medium">{results.baseHours.toFixed(1)} h</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Estimated rounds</span><span className="font-medium">{results.estimatedRounds}</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Transition hours</span><span className="font-medium">{results.transitionHours.toFixed(1)} h</span></div>
              <div className="flex justify-between border-t border-neutral-200 pt-1.5"><span className="font-medium text-neutral-700">Adjusted labour hours</span><span className="font-semibold">{results.adjustedHours.toFixed(1)} h</span></div>
              <div className="flex justify-between"><span className="font-medium text-neutral-700">Shoppers needed</span><span className="text-lg font-bold text-brand-500">{results.shoppersNeeded}</span></div>
              {results.gap !== 0 && (
                <div className={`flex justify-between rounded px-2 py-1 ${results.gap > 0 ? 'bg-danger-bg text-danger-text' : 'bg-success-bg text-success-text'}`}>
                  <span>{results.gap > 0 ? 'Staffing gap' : 'Surplus'}</span>
                  <span className="font-semibold">{results.gap > 0 ? '+' : ''}{results.gap}</span>
                </div>
              )}
              <div className="flex justify-between"><span className="text-neutral-500">Projected finish</span><span className="font-medium">{results.projectedFinish}</span></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
