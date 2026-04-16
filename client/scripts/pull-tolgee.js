const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { loadEnv } = require('vite');

// Safely load env from multiple locations
const loadAllEnv = () => {
  let env = process.env;
  try {
    // Try Vite's loadEnv in client/ first
    env = { ...env, ...loadEnv('production', process.cwd(), '') };
    env = { ...env, ...loadEnv('development', process.cwd(), '') };
  } catch(e) {}
  
  // Custom fallback: read .env.local from parent directory (visiconnect root)
  const rootEnvLocal = path.resolve(process.cwd(), '..', '.env.local');
  if (fs.existsSync(rootEnvLocal)) {
    const content = fs.readFileSync(rootEnvLocal, 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        env[match[1]] = match[2];
      }
    });
  }
  return env;
};

const env = loadAllEnv();

const apiKey = env.VITE_TOLGEE_API_KEY || env.TOLGEE_API_KEY || env.VITE_APP_TOLGEE_API_KEY;
const apiUrl = env.VITE_TOLGEE_API_URL || env.TOLGEE_API_URL || env.VITE_APP_TOLGEE_API_URL || 'https://app.tolgee.io';

if (!apiKey) {
  console.warn("⚠️ No VITE_TOLGEE_API_KEY found in environment. Skipping translation pull to allow build to continue.");
  process.exit(0);
}

try {
  console.log('⬇️ Pulling translations from Tolgee...');
  execSync(`npx tolgee pull --path ./src/i18n --format JSON_TOLGEE --languages fr,en,es,de,ru --api-key ${apiKey} --api-url ${apiUrl}`, { stdio: 'inherit' });
} catch (e) {
  console.error('❌ Tolgee pull failed. Ensure your API Key is correct.');
  process.exit(1);
}
