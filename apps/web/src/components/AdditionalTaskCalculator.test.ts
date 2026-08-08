import { describe, it, expect } from 'vitest';
import { calculateTaskShoppers, formatShoppers } from './AdditionalTaskCalculator';

function task(overrides: Partial<Parameters<typeof calculateTaskShoppers>[0]> = {}) {
  return {
    id: 'test',
    name: 'Test',
    hours: '9',
    startTime: '11:00',
    endTime: '13:30',
    breakMinutes: '30',
    ...overrides,
  };
}

describe('calculateTaskShoppers', () => {
  it('returns 4.5 shoppers for a 9h workload in a 2.5h window with 30min break', () => {
    const result = calculateTaskShoppers(task());
    expect(result).toBe(4.5);
  });

  it('returns 1 shopper when workload exactly fills productive window', () => {
    const result = calculateTaskShoppers(task({ hours: '2', startTime: '11:00', endTime: '13:30', breakMinutes: '30' }));
    expect(result).toBe(1);
  });

  it('returns exact fractional shopper counts instead of rounding up', () => {
    const result = calculateTaskShoppers(task({ hours: '5', startTime: '11:00', endTime: '13:30', breakMinutes: '30' }));
    expect(result).toBe(2.5);
  });

  it('returns 1.5 shoppers for a 3h workload in a 2h productive window', () => {
    const result = calculateTaskShoppers(task({ hours: '3', startTime: '11:00', endTime: '13:30', breakMinutes: '30' }));
    expect(result).toBe(1.5);
  });

  it('uses the full window when no break is set', () => {
    const result = calculateTaskShoppers(task({ hours: '5', startTime: '11:00', endTime: '13:30', breakMinutes: '0' }));
    expect(result).toBe(2);
  });

  it('supports decimal hours', () => {
    const result = calculateTaskShoppers(task({ hours: '2.5', startTime: '11:00', endTime: '13:30', breakMinutes: '0' }));
    expect(result).toBe(1);
  });

  it('rounds results to two decimal places', () => {
    const result = calculateTaskShoppers(task({ hours: '1', startTime: '11:00', endTime: '14:00', breakMinutes: '0' }));
    expect(result).toBe(0.33);
  });

  it('returns null when hours are missing or zero', () => {
    expect(calculateTaskShoppers(task({ hours: '' }))).toBeNull();
    expect(calculateTaskShoppers(task({ hours: '0' }))).toBeNull();
  });

  it('returns null when the window is invalid or zero', () => {
    expect(calculateTaskShoppers(task({ startTime: '', endTime: '' }))).toBeNull();
    expect(calculateTaskShoppers(task({ startTime: '14:00', endTime: '11:00' }))).toBeNull();
    expect(calculateTaskShoppers(task({ startTime: '11:00', endTime: '11:00' }))).toBeNull();
  });

  it('returns null when break consumes the whole window', () => {
    const result = calculateTaskShoppers(task({ hours: '1', startTime: '11:00', endTime: '11:30', breakMinutes: '30' }));
    expect(result).toBeNull();
  });
});

describe('formatShoppers', () => {
  it('strips trailing zeros and preserves integers', () => {
    expect(formatShoppers(4.5)).toBe(4.5);
    expect(formatShoppers(1)).toBe(1);
    expect(formatShoppers(1.5)).toBe(1.5);
    expect(formatShoppers(2)).toBe(2);
  });

  it('rounds to two decimal places', () => {
    expect(formatShoppers(1 / 3)).toBe(0.33);
    expect(formatShoppers(2.345)).toBe(2.35);
  });
});
