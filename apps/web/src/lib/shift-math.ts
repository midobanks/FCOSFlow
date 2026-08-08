export function formatShoppers(value: number): number {
  return parseFloat(value.toFixed(2));
}

export type ShiftShopperInputs = {
  orderLines: string;
  startTime: string;
  endTime: string;
  breakMinutes: string;
  inactiveMinutes: string;
  targetSpeed: string;
  avgLinesPerRound: string;
  roundsLeftToStart: string;
};

export type ShiftShopperResults = {
  availableHours: number;
  capacityPerShopper: number;
  roundsPerShopper: number;
  totalRoundsNeeded: number;
  newRoundsNeeded: number;
  shoppersNeeded: number;
};

export function calculateShiftShoppers(inputs: ShiftShopperInputs): ShiftShopperResults | null {
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

  const capacityPerShopper = availableHours * targetSpeed;
  const shoppersNeeded = formatShoppers(orderLines / capacityPerShopper);
  const roundsPerShopper = formatShoppers((availableHours * targetSpeed) / avgLinesPerRound);
  const totalRoundsNeeded = formatShoppers(orderLines / avgLinesPerRound);
  const newRoundsNeeded = formatShoppers(Math.max(0, totalRoundsNeeded - roundsLeft));

  return {
    availableHours,
    capacityPerShopper,
    roundsPerShopper,
    totalRoundsNeeded,
    newRoundsNeeded,
    shoppersNeeded,
  };
}
