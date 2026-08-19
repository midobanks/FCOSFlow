import { formatShoppers } from '@/lib/shift-math';
import { inputClass } from '@/components/ui/Field';

export type Task = {
  id: string;
  name: string;
  allocatedHours: string;
  endTime: string;
};

type TaskRowProps = {
  task: Task;
  productiveHoursPerShopper: number;
  onChange: (task: Task) => void;
};

export function TaskRow({ task, productiveHoursPerShopper, onChange }: TaskRowProps) {
  function update(field: keyof Task, value: string) {
    onChange({ ...task, [field]: value });
  }

  const hours = parseFloat(task.allocatedHours) || 0;
  const shoppersNeeded =
    productiveHoursPerShopper > 0 && hours > 0
      ? formatShoppers(hours / productiveHoursPerShopper)
      : 0;

  return (
    <div className="border-hairline grid grid-cols-11 items-center gap-2 border-b py-2 text-sm last:border-b-0">
      <div className="text-ink col-span-3 font-medium">{task.name}</div>
      <div className="col-span-3">
        <input
          type="number"
          min="0"
          step="0.5"
          value={task.allocatedHours}
          onChange={(e) => update('allocatedHours', e.target.value)}
          className={inputClass}
          placeholder="0"
        />
      </div>
      <div className="col-span-2 flex items-center gap-1.5">
        <span
          className={`h-2 w-2 rounded-full ${shoppersNeeded > 0 ? 'bg-brand-500' : 'bg-quiet-dot'}`}
        />
        <span
          className={`font-semibold tabular-nums ${shoppersNeeded > 0 ? 'text-brand-600' : 'text-quiet-dot'}`}
        >
          {shoppersNeeded > 0 ? shoppersNeeded : '—'}
        </span>
      </div>
      <div className="col-span-3">
        <input
          type="time"
          value={task.endTime}
          onChange={(e) => update('endTime', e.target.value)}
          className={inputClass}
        />
      </div>
    </div>
  );
}
