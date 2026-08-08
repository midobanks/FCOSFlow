import { describe, it, expect } from 'vitest';
import { calculateShiftShoppers } from './shift-math';

function inputs(overrides: Partial<Parameters<typeof calculateShiftShoppers>[0]> = {}) {
  return {
    orderLines: '750',
    startTime: '06:00',
    endTime: '08:00',
    breakMinutes: '0',
    inactiveMinutes: '0',
    targetSpeed: '50',
    avgLinesPerRound: '12',
    roundsLeftToStart: '0',
    ...overrides,
  };
}

describe('calculateShiftShoppers', () => {
  it('returns 7.5 shoppers instead of rounding up to 8', () => {
    const result = calculateShiftShoppers(inputs());
    expect(result).not.toBeNull();
    expect(result?.shoppersNeeded).toBe(7.5);
  });

  it('does not round capacity per shopper', () => {
    const result = calculateShiftShoppers(inputs({ startTime: '06:00', endTime: '13:30', orderLines: '500', targetSpeed: '65' }));
    expect(result).not.toBeNull();
    expect(result?.capacityPerShopper).toBe(487.5);
  });

  it('subtracts break and inactive time from the window', () => {
    const result = calculateShiftShoppers(inputs({ orderLines: '100', breakMinutes: '30', inactiveMinutes: '20' }));
    expect(result).not.toBeNull();
    expect(result?.availableHours).toBeCloseTo(2 - 0.5 - 1 / 3, 5);
  });

  it('returns exact rounds instead of rounding up', () => {
    const result = calculateShiftShoppers(inputs({ orderLines: '100', avgLinesPerRound: '12', roundsLeftToStart: '0' }));
    expect(result).not.toBeNull();
    expect(result?.totalRoundsNeeded).toBe(8.33);
    expect(result?.newRoundsNeeded).toBe(8.33);
  });

  it('subtracts rounds already planned from new rounds needed', () => {
    const result = calculateShiftShoppers(inputs({ orderLines: '100', avgLinesPerRound: '12', roundsLeftToStart: '2' }));
    expect(result).not.toBeNull();
    expect(result?.newRoundsNeeded).toBe(6.33);
  });

  it('does not go below zero for new rounds needed', () => {
    const result = calculateShiftShoppers(inputs({ orderLines: '10', avgLinesPerRound: '12', roundsLeftToStart: '5' }));
    expect(result).not.toBeNull();
    expect(result?.newRoundsNeeded).toBe(0);
  });

  it('returns null when required inputs are missing', () => {
    expect(calculateShiftShoppers(inputs({ orderLines: '' }))).toBeNull();
    expect(calculateShiftShoppers(inputs({ targetSpeed: '' }))).toBeNull();
    expect(calculateShiftShoppers(inputs({ avgLinesPerRound: '' }))).toBeNull();
  });

  it('returns null when the shift window is invalid or zero', () => {
    expect(calculateShiftShoppers(inputs({ startTime: '', endTime: '' }))).toBeNull();
    expect(calculateShiftShoppers(inputs({ startTime: '14:00', endTime: '06:00' }))).toBeNull();
    expect(calculateShiftShoppers(inputs({ startTime: '06:00', endTime: '06:00' }))).toBeNull();
  });

  it('returns null when break and inactive time consume the whole shift', () => {
    expect(calculateShiftShoppers(inputs({ startTime: '06:00', endTime: '06:50', breakMinutes: '30', inactiveMinutes: '20' }))).toBeNull();
  });
});
