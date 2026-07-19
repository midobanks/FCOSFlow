import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['apps/*/src/**/*.test.ts', 'apps/*/src/**/*.test.tsx', 'packages/*/src/**/*.test.ts'],
    exclude: ['node_modules'],
  },
});
