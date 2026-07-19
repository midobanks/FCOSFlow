import { describe, it, expect } from 'vitest';
import { logger } from './index';

describe('@fcos/observability', () => {
  it('exports a logger with expected methods', () => {
    expect(logger).toBeDefined();
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.error).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.debug).toBe('function');
  });
});
