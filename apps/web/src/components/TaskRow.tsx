export type Task = {
  id: string;
  name: string;
  allocatedHours: string;
  assignedShoppers: string;
  endTime: string;
};

type TaskRowProps = {
  task: Task;
  onChange: (task: Task) => void;
};

export function TaskRow({ task, onChange }: TaskRowProps) {
  function update(field: keyof Task, value: string) {
    onChange({ ...task, [field]: value });
  }

  return (
    <div className="grid grid-cols-12 gap-2 items-center text-sm py-2 border-b border-neutral-100 last:border-b-0">
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
        <input
          type="number"
          min="0"
          value={task.assignedShoppers}
          onChange={(e) => update('assignedShoppers', e.target.value)}
          className="w-full rounded border border-neutral-200 px-2 py-1 text-xs outline-none focus:border-brand-500"
          placeholder="0"
        />
      </div>
      <div className="col-span-2">
        <input
          type="time"
          value={task.endTime}
          onChange={(e) => update('endTime', e.target.value)}
          className="w-full rounded border border-neutral-200 px-2 py-1 text-xs outline-none focus:border-brand-500"
        />
      </div>
      <div className="col-span-2 text-xs text-neutral-500">
        {calculateShoppersNeeded(task)}
      </div>
    </div>
  );
}

function calculateShoppersNeeded(task: Task): string {
  const hours = parseFloat(task.allocatedHours);
  const shoppers = parseFloat(task.assignedShoppers);
  if (!hours || hours <= 0) return '—';

  if (!shoppers || shoppers <= 0) return `${Math.ceil(hours)} needed`;
  return `${Math.ceil(hours / shoppers)} h each`;
}
