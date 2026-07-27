import { useState } from 'react';
import { TaskRow, type Task } from './TaskRow';
import { PickingCalculator } from './PickingCalculator';

export type ZoneName = 'Ambient' | 'Chilled' | 'Frozen';

type ShiftSteeringColumnProps = {
  zoneName: ZoneName;
  shiftStart: string;
  shiftEnd: string;
  totalShoppers: number;
  breakMinutes: number;
  inactiveMinutes: number;
};

const defaultTasks: Task[] = [
  { id: 'replenishment', name: 'Replenishment', allocatedHours: '', assignedShoppers: '', endTime: '' },
  { id: 'picking', name: 'Picking', allocatedHours: '', assignedShoppers: '', endTime: '' },
  { id: 'splitting', name: 'Splitting', allocatedHours: '', assignedShoppers: '', endTime: '' },
  { id: 'return-waste', name: 'Return & Waste', allocatedHours: '', assignedShoppers: '', endTime: '' },
  { id: 'cleaning', name: 'Cleaning', allocatedHours: '', assignedShoppers: '', endTime: '' },
  { id: 'quality', name: 'Quality checks', allocatedHours: '', assignedShoppers: '', endTime: '' },
  { id: 'support', name: 'Support tasks', allocatedHours: '', assignedShoppers: '', endTime: '' },
  { id: 'other', name: 'Other', allocatedHours: '', assignedShoppers: '', endTime: '' },
];

export function ShiftSteeringColumn({
  zoneName,
  shiftStart,
  shiftEnd,
  totalShoppers,
  breakMinutes,
  inactiveMinutes,
}: ShiftSteeringColumnProps) {
  const [assignedShoppers, setAssignedShoppers] = useState('');
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const [startH, startM] = shiftStart.split(':').map(Number);
  const [endH, endM] = shiftEnd.split(':').map(Number);
  const shiftDuration = ((endH ?? 0) + (endM ?? 0) / 60) - ((startH ?? 0) + (startM ?? 0) / 60);
  const productiveHours = Math.max(0, shiftDuration - breakMinutes / 60 - inactiveMinutes / 60);
  const shopperCount = parseFloat(assignedShoppers) || 0;
  const availableHours = shopperCount > 0 ? productiveHours * shopperCount : 0;

  const totalAllocated = tasks.reduce((sum, t) => sum + (parseFloat(t.allocatedHours) || 0), 0);
  const remainingHours = Math.max(0, availableHours - totalAllocated);
  const allocatedShoppers = tasks.reduce((sum, t) => sum + (parseFloat(t.assignedShoppers) || 0), 0);

  const status = (() => {
    if (shopperCount === 0) return 'neutral';
    if (totalAllocated > availableHours) return 'danger';
    if (remainingHours < productiveHours * 0.1) return 'warning';
    return 'healthy';
  })();

  const statusColors: Record<string, string> = {
    healthy: 'bg-success-bg text-success-text border-l-success-base',
    warning: 'bg-warning-bg text-warning-text border-l-warning-base',
    danger: 'bg-danger-bg text-danger-text border-l-danger-base',
    neutral: 'bg-neutral-50 text-neutral-600 border-l-neutral-400',
  };

  function updateTask(updated: Task) {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
      <div className={`border-l-4 px-4 py-3 ${statusColors[status]}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">{zoneName}</h2>
          <span className="rounded px-2 py-0.5 text-xs font-medium capitalize">{status === 'neutral' ? 'Not started' : status.replace('_', ' ')}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          <span>Available: {availableHours.toFixed(1)} h</span>
          <span>Allocated: {totalAllocated.toFixed(1)} h</span>
          <span className={remainingHours < 0 ? 'text-danger-text font-medium' : ''}>
            {remainingHours >= 0 ? `Remaining: ${remainingHours.toFixed(1)} h` : `Overallocated: ${Math.abs(remainingHours).toFixed(1)} h`}
          </span>
          <span>Shoppers: {allocatedShoppers || shopperCount || 0}</span>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-neutral-100">
        <label className="text-xs text-neutral-500">Shoppers assigned to this zone</label>
        <input type="number" min="0" value={assignedShoppers} onChange={(e) => setAssignedShoppers(e.target.value)}
          className="mt-0.5 block w-full rounded border border-neutral-200 px-2 py-1 text-sm outline-none focus:border-brand-500" placeholder="0" />
      </div>

      <div className="px-4 py-3 border-b border-neutral-100">
        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-neutral-500 mb-2">
          <div className="col-span-3">Task</div>
          <div className="col-span-3">Hours</div>
          <div className="col-span-2">Shoppers</div>
          <div className="col-span-2">End time</div>
          <div className="col-span-2">Split</div>
        </div>
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} onChange={updateTask} />
        ))}
      </div>

      <div className="px-4 py-3">
        <PickingCalculator zoneName={zoneName} availableHoursPerShopper={productiveHours} />
      </div>
    </div>
  );
}
