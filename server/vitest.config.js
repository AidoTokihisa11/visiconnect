/**
 * Tests serveur — Vitest configuration.
 *
 * Charge un .env.test (variables mock\u00e9es) AVANT que les modules de
 * production ne lisent process.env.
 */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: false,
    setupFiles: ['./tests/setup.js'],
    coverage: {
      reporter: ['text', 'lcov'],
      include: ['src/**/*.js'],
    },
  },
});
