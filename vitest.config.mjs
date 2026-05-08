import { defineConfig } from 'vitest/config';

const ci = !!process.env.CI;

console.info('CI:', ci);

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    test: {
      globals: true,
      environment: 'node',
      include: ['test/**/*.test.js'],
      reporters: ci
        ? [['default', { summary: false }], 'github-actions', 'junit']
        : ['default', 'junit'],
      outputFile: {
        junit: 'coverage/junit.xml',
      },
      coverage: {
        ignoreEmptyLines: true,
        provider: 'v8',
        reporter: ci
          ? ['text-summary', 'cobertura']
          : ['text-summary', 'html', 'cobertura'],
        enabled: ci ? true : undefined,
        include: ['lib/**/*.js'],
        watermarks: {
          statements: 100,
          functions: 100,
          branches: 100,
          lines: 100,
        },
      },
    },
  };
});
