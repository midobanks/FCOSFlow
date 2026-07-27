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
  const shoppersNeeded = productiveHoursPerShopper > 0 && hours > 0
    ? Math.ceil(hours / productiveHoursPerShopper)
    : 0;

  return (
    <div className="grid grid-cols-11 gap-2 items-center text-sm py-2 border-b border-neutral-100 last:border-b-0">
      <div className="col-span-3 font-medium text-neutral-800">{task.name}</div>
      <div className="col-span-3">
        <input
          type="number"
          min="0"
          step="0.5"
          value={task.allocatedHours}
          onChange={(e) => update('allocatedHours', e.target.value)}
          className="w-full rounded border border-neutral-200 px-2 py-1 text-xs outline-none focus:border-brand-500"
          placeholder="0"
        />
      </div>
      <div className="col-span-2">
        <span className={`font-semibold ${shoppersNeeded > 0 ? 'text-brand-500' : 'text-neutral-300'}`}>
          {shoppersNeeded > 0 ? shoppersNeeded : '—'}
        </span>
      </div>
      <div className="col-span-3">
        <input
          type="time"
          value={task.endTime}
          onChange={(e) => update('endTime', e.target.value)}
          className="w-full rounded border border-neutral-200 px-2 py-1 text-xs outline-none focus:border-brand-500"
        />
      </div>
    </div>
  );
}
