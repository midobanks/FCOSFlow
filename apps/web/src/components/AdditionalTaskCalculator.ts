import { formatShoppers } from '../lib/shift-math';

export type AdditionalTask = {
  id: string;
  name: string;
  hours: string;
  startTime: string;
  endTime: string;
  breakMinutes: string;
};

function timeToHours(time: string): number | null {
  if (!time) return null;
  const [h, m] = time.split(':').map(Number);
  if (h == null || m == null || isNaN(h) || isNaN(m)) return null;
  return h + m / 60;
}

export function calculateTaskShoppers(task: AdditionalTask): number | null {
  const hours = parseFloat(task.hours);
  if (!hours || hours <= 0) return null;

  const start = timeToHours(task.startTime);
  const end = timeToHours(task.endTime);
  if (start == null || end == null) return null;

  const windowHours = end - start;
  if (windowHours <= 0) return null;

  const breakHours = (parseFloat(task.breakMinutes) || 0) / 60;
  const productiveHours = windowHours - breakHours;
  if (productiveHours <= 0) return null;

  return formatShoppers(hours / productiveHours);
}
