'use client';

import { useState } from 'react';
import { ShiftSteeringColumn } from '@/components/ShiftSteeringColumn';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { Field, inputClass } from '@/components/ui/Field';
import { StatusPill } from '@/components/ui/StatusPill';

export default function ShiftSteeringPage() {
  const [shiftDate] = useState(() =>
    new Date().toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
  );
  const [siteName] = useState('Main Site');
  const [shiftName] = useState('Morning Shift');
  const [shiftStart, setShiftStart] = useState('06:00');
  const [shiftEnd, setShiftEnd] = useState('14:00');
  const [totalShoppers, setTotalShoppers] = useState('');
  const [breakMinutes, setBreakMinutes] = useState('30');
  const [inactiveMinutes, setInactiveMinutes] = useState('20');
  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  );
  const [activeTab, setActiveTab] = useState<'all' | 'ambient' | 'chilled' | 'frozen'>('all');

  const shopperCount = parseInt(totalShoppers) || 0;
  const [startH, startM] = shiftStart.split(':').map(Number);
  const [endH, endM] = shiftEnd.split(':').map(Number);
  const shiftDuration = (endH ?? 0) + (endM ?? 0) / 60 - ((startH ?? 0) + (startM ?? 0) / 60);
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Command Center"
        subtitle={`${siteName} · ${shiftDate} · ${shiftName}`}
        action={
          <div className="text-mid-gray text-sm">
            Current time: <span className="text-ink font-medium">{currentTime}</span>
          </div>
        }
      />

      {/* Shift Summary */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Gross hours" value={grossHours.toFixed(1)} />
        <StatCard label="Net productive hours" value={netHours.toFixed(1)} />
        <StatCard label="Shoppers" value={shopperCount || '—'} />
        <StatCard label="Shift" value={`${shiftStart} – ${shiftEnd}`} />
      </div>

      {/* Global Shift Assumptions */}
      <Card className="mt-6">
        <h2 className="text-caption text-ink font-semibold">Global shift assumptions</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          <Field label="Shift start">
            <input
              type="time"
              value={shiftStart}
              onChange={(e) => setShiftStart(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Shift end">
            <input
              type="time"
              value={shiftEnd}
              onChange={(e) => setShiftEnd(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Total Shoppers">
            <input
              type="number"
              min="0"
              value={totalShoppers}
              onChange={(e) => setTotalShoppers(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Break (min)">
            <input
              type="number"
              min="0"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Inactive (min)">
            <input
              type="number"
              min="0"
              value={inactiveMinutes}
              onChange={(e) => setInactiveMinutes(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Break hours">
            <p className="text-ink text-sm font-medium">{(shopperCount * breakH).toFixed(1)}</p>
          </Field>
          <Field label="Inactive hours">
            <p className="text-ink text-sm font-medium">{(shopperCount * inactiveH).toFixed(1)}</p>
          </Field>
        </div>
      </Card>

      {/* Mobile Tabs */}
      <div className="mt-6 mb-4 flex gap-1 sm:hidden">
        {(['all', 'ambient', 'chilled', 'frozen'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize ${activeTab === tab ? 'bg-brand-500 text-paper' : 'bg-cool-wash text-deep-gray'}`}
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
      <Card className="mt-6">
        <h2 className="text-caption text-ink font-semibold">Cross-zone capacity summary</h2>
        <p className="text-mid-gray mt-1 text-xs">Available vs. required labour hours per zone.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-hairline text-mid-gray border-b text-left text-xs font-medium">
                <th className="py-2.5 pr-4">Zone</th>
                <th className="py-2.5 pr-4">Shoppers</th>
                <th className="py-2.5 pr-4">Available h</th>
                <th className="py-2.5 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((zone) => (
                <tr key={zone.key} className="border-hairline border-b">
                  <td className="text-ink py-2.5 pr-4 font-medium">{zone.label}</td>
                  <td className="text-deep-gray py-2.5 pr-4 tabular-nums">—</td>
                  <td className="text-deep-gray py-2.5 pr-4 tabular-nums">—</td>
                  <td className="py-2.5 pr-4">
                    <StatusPill tone="neutral" label="Not started" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
