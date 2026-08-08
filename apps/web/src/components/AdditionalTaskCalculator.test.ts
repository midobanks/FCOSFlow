import { describe, it, expect } from 'vitest';
import { calculateTaskShoppers } from './AdditionalTaskCalculator';

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
  it('returns 5 shoppers for a 9h workload in a 2.5h window with 30min break', () => {
    const result = calculateTaskShoppers(task());
    expect(result).toBe(5);
  });

  it('returns 1 shopper when workload exactly fills productive window', () => {
    const result = calculateTaskShoppers(task({ hours: '2', startTime: '11:00', endTime: '13:30', breakMinutes: '30' }));
    expect(result).toBe(1);
  });

  it('rounds up fractional shopper counts', () => {
    const result = calculateTaskShoppers(task({ hours: '5', startTime: '11:00', endTime: '13:30', breakMinutes: '30' }));
    expect(result).toBe(3);
  });

  it('uses the full window when no break is set', () => {
    const result = calculateTaskShoppers(task({ hours: '5', startTime: '11:00', endTime: '13:30', breakMinutes: '0' }));
    expect(result).toBe(2);
  });

  it('supports decimal hours', () => {
    const result = calculateTaskShoppers(task({ hours: '2.5', startTime: '11:00', endTime: '13:30', breakMinutes: '0' }));
    expect(result).toBe(1);
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
