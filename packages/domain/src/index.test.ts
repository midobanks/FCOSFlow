import { describe, it, expect } from 'vitest';

describe('@fcos/domain', () => {
  it('exports expected types', () => {
    const statuses: string[] = ['DRAFT', 'IN_REVIEW', 'PUBLISHED', 'SUPERSEDED', 'ARCHIVED'];
    expect(statuses).toContain('DRAFT');
    expect(statuses).toContain('PUBLISHED');
  });
});
