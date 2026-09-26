import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Vite inlines these at build time: a wrong value is baked into the bundle and
// ships to production, so the build must fail instead of producing a poisoned artifact.
const REQUIRED_BUILD_ENV = ['VITE_CONVEX_URL', 'VITE_CLERK_PUBLISHABLE_KEY'];
const PLACEHOLDER = /prerender\.|your[-_]|votre[-_]|remplacez|xxx|changeme|placeholder|todo/i;

function assertBuildEnv(mode) {
  const env = loadEnv(mode, process.cwd(), '');
  const problems = REQUIRED_BUILD_ENV.flatMap((key) => {
    const value = env[key]?.trim();
    if (!value) return [`${key} is missing`];
    if (PLACEHOLDER.test(value)) return [`${key} still holds a placeholder value ("${value}")`];
    return [];
  });

  if (problems.length) {
    throw new Error(
      `Invalid build environment:\n  - ${problems.join('\n  - ')}\n` +
        `Set them in client/.env.local (see client/.env.example) or in your host's env settings.`
    );
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'build') assertBuildEnv(mode);

  return {
    plugins: [react()],
    define: {
      'process.env': {},
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      strictPort: true,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: 'build',
    },
  };
});
