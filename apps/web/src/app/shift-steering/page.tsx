'use client';

import { useState } from 'react';
import { ShiftSteeringColumn } from '@/components/ShiftSteeringColumn';

export default function ShiftSteeringPage() {
  const [shiftDate] = useState(() => new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }));
  const [siteName] = useState('Main Site');
  const [shiftName] = useState('Morning Shift');
  const [shiftStart, setShiftStart] = useState('06:00');
  const [shiftEnd, setShiftEnd] = useState('14:00');
  const [totalShoppers, setTotalShoppers] = useState('');
  const [breakMinutes, setBreakMinutes] = useState('30');
  const [inactiveMinutes, setInactiveMinutes] = useState('20');
  const [currentTime, setCurrentTime] = useState(() => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
  const [activeTab, setActiveTab] = useState<'all' | 'ambient' | 'chilled' | 'frozen'>('all');

  const shopperCount = parseInt(totalShoppers) || 0;
  const [startH, startM] = shiftStart.split(':').map(Number);
  const [endH, endM] = shiftEnd.split(':').map(Number);
  const shiftDuration = ((endH ?? 0) + (endM ?? 0) / 60) - ((startH ?? 0) + (startM ?? 0) / 60);
  const breakH = (parseFloat(breakMinutes) || 0) / 60;
  const inactiveH = (parseFloat(inactiveMinutes) || 0) / 60;
  const grossHours = shopperCount * Math.max(0, shiftDuration);
  const netHours = shopperCount * Math.max(0, shiftDuration - breakH - inactiveH);

  const zones = [
    { key: 'ambient' as const, label: 'Ambient' as const },
    { key: 'chilled' as const, label: 'Chilled' as const },
    { key: 'frozen' as const, label: 'Frozen' as const },
  ];

  const visibleZones = activeTab === 'all' ? zones : zones.filter((z) => z.key === activeTab);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Shift Header */}
      <div className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-neutral-900">Shift Steering</h1>
            <p className="text-sm text-neutral-500">{siteName} &middot; {shiftDate} &middot; {shiftName}</p>
          </div>
          <div className="text-right text-sm text-neutral-500">
            <p>Current time: <span className="font-medium text-neutral-800">{currentTime}</span></p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs text-neutral-500">Gross hours</p>
            <p className="text-lg font-semibold text-neutral-900">{grossHours.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500">Net productive hours</p>
            <p className="text-lg font-semibold text-neutral-900">{netHours.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500">Shoppers</p>
            <p className="text-lg font-semibold text-neutral-900">{shopperCount || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500">Shift</p>
            <p className="text-lg font-semibold text-neutral-900">{shiftStart} &ndash; {shiftEnd}</p>
          </div>
        </div>
      </div>

      {/* Global Shift Assumptions */}
      <div className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 sm:p-6">
        <h2 className="mb-3 text-sm font-semibold text-neutral-700">Global shift assumptions</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          <div>
            <label className="text-xs text-neutral-500">Shift start</label>
            <input type="time" value={shiftStart} onChange={(e) => setShiftStart(e.target.value)}
              className="mt-0.5 block w-full rounded border border-neutral-200 px-2 py-1 text-sm outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="text-xs text-neutral-500">Shift end</label>
            <input type="time" value={shiftEnd} onChange={(e) => setShiftEnd(e.target.value)}
              className="mt-0.5 block w-full rounded border border-neutral-200 px-2 py-1 text-sm outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="text-xs text-neutral-500">Total Shoppers</label>
            <input type="number" min="0" value={totalShoppers} onChange={(e) => setTotalShoppers(e.target.value)}
              className="mt-0.5 block w-full rounded border border-neutral-200 px-2 py-1 text-sm outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="text-xs text-neutral-500">Break (min)</label>
            <input type="number" min="0" value={breakMinutes} onChange={(e) => setBreakMinutes(e.target.value)}
              className="mt-0.5 block w-full rounded border border-neutral-200 px-2 py-1 text-sm outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="text-xs text-neutral-500">Inactive (min)</label>
            <input type="number" min="0" value={inactiveMinutes} onChange={(e) => setInactiveMinutes(e.target.value)}
              className="mt-0.5 block w-full rounded border border-neutral-200 px-2 py-1 text-sm outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="text-xs text-neutral-500">Break hours</label>
            <p className="mt-0.5 text-sm font-medium text-neutral-800">{(shopperCount * breakH).toFixed(1)}</p>
          </div>
          <div>
            <label className="text-xs text-neutral-500">Inactive hours</label>
            <p className="mt-0.5 text-sm font-medium text-neutral-800">{(shopperCount * inactiveH).toFixed(1)}</p>
          </div>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="mb-4 flex gap-1 sm:hidden">
        {(['all', 'ambient', 'chilled', 'frozen'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize ${activeTab === tab ? 'bg-brand-500 text-white' : 'bg-neutral-100 text-neutral-600'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Three-Column Zone Layout */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleZones.map((zone) => (
          <ShiftSteeringColumn
            key={zone.key}
            zoneName={zone.label}
            shiftStart={shiftStart}
            shiftEnd={shiftEnd}
            totalShoppers={shopperCount}
            breakMinutes={parseFloat(breakMinutes) || 0}
            inactiveMinutes={parseFloat(inactiveMinutes) || 0}
          />
        ))}
      </div>

      {/* Cross-Zone Summary */}
      <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-4 sm:p-6">
        <h2 className="mb-3 text-sm font-semibold text-neutral-700">Cross-zone capacity summary</h2>
        <p className="text-xs text-neutral-500">Available vs. required labour hours per zone.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-left text-xs font-medium text-neutral-500">
                <th className="pb-2 pr-4">Zone</th>
                <th className="pb-2 pr-4">Shoppers</th>
                <th className="pb-2 pr-4">Available h</th>
                <th className="pb-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((zone) => (
                <tr key={zone.key} className="border-b border-neutral-100">
                  <td className="py-2 pr-4 font-medium text-neutral-800">{zone.label}</td>
                  <td className="py-2 pr-4 text-neutral-600">—</td>
                  <td className="py-2 pr-4 text-neutral-600">—</td>
                  <td className="py-2 pr-4">
                    <span className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">Not started</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
