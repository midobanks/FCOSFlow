import { useState } from 'react';
import { formatShoppers } from '@/lib/shift-math';
import { Card } from '@/components/ui/Card';
import { Field, inputClass } from '@/components/ui/Field';

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

function calculate(
  inputs: Inputs,
  availableHoursPerShopper: number,
  inactiveMin: number,
): Results | null {
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

  return {
    remainingOls,
    baseHours,
    estimatedRounds,
    transitionHours,
    adjustedHours,
    shoppersNeeded,
    gap,
    projectedFinish,
  };
}

export function PickingCalculator({
  zoneName,
  availableHoursPerShopper,
  inactiveMinutes,
}: PickingCalculatorProps) {
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
    <Card padded={false} className="overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="text-ink hover:bg-cool-wash flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold transition-colors"
      >
        <span>Picking calculator</span>
        <svg
          className={`text-mid-gray h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="border-hairline space-y-4 border-t px-5 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Total OLS">
              <input
                type="number"
                min="1"
                value={inputs.totalOls}
                onChange={(e) => set('totalOls', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Completed OLS">
              <input
                type="number"
                min="0"
                value={inputs.completedOls}
                onChange={(e) => set('completedOls', e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Target speed (ols/hr)">
              <input
                type="number"
                min="1"
                step="0.1"
                value={inputs.targetSpeed}
                onChange={(e) => set('targetSpeed', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Avg OLS per round">
              <input
                type="number"
                min="1"
                step="0.1"
                value={inputs.avgLinesPerRound}
                onChange={(e) => set('avgLinesPerRound', e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Transition (min/round)">
              <input
                type="number"
                min="0"
                step="0.5"
                value={inputs.transitionMinutes}
                onChange={(e) => set('transitionMinutes', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Inactive time">
              <p className="text-deep-gray text-sm font-medium">{inactiveMinutes} min</p>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Assigned Shoppers">
              <input
                type="number"
                min="0"
                value={inputs.assignedShoppers}
                onChange={(e) => set('assignedShoppers', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Required end time">
              <input
                type="time"
                value={inputs.endTime}
                onChange={(e) => set('endTime', e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          {results && (
            <div className="bg-canvas space-y-1.5 rounded-2xl p-4 text-xs">
              <div className="flex justify-between">
                <span className="text-mid-gray">Remaining OLS</span>
                <span className="text-brand-600 font-medium tabular-nums">
                  {results.remainingOls.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-mid-gray">Base picking hours</span>
                <span className="text-brand-600 font-medium tabular-nums">
                  {results.baseHours.toFixed(1)} h
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-mid-gray">Estimated rounds</span>
                <span className="text-brand-600 font-medium tabular-nums">
                  {results.estimatedRounds}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-mid-gray">Transition hours</span>
                <span className="text-brand-600 font-medium tabular-nums">
                  {results.transitionHours.toFixed(1)} h
                </span>
              </div>
              <div className="border-hairline flex justify-between border-t pt-1.5">
                <span className="text-deep-gray font-medium">Adjusted labour hours</span>
                <span className="text-brand-600 font-semibold tabular-nums">
                  {results.adjustedHours.toFixed(1)} h
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-deep-gray font-medium">Shoppers needed</span>
                <span className="text-brand-600 text-lg font-bold tabular-nums">
                  {results.shoppersNeeded}
                </span>
              </div>
              {results.gap !== 0 && (
                <div
                  className={`flex justify-between rounded px-2 py-1 ${results.gap > 0 ? 'bg-danger-bg text-danger-text' : 'bg-success-bg text-success-text'}`}
                >
                  <span>{results.gap > 0 ? 'Staffing gap' : 'Surplus'}</span>
                  <span className="font-semibold tabular-nums">
                    {results.gap > 0 ? '+' : ''}
                    {results.gap}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-mid-gray">Projected finish</span>
                <span className="text-brand-600 font-medium tabular-nums">
                  {results.projectedFinish}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
