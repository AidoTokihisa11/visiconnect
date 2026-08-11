import http from 'k6/http';
import { check } from 'k6';

// Test dédié à l'endpoint /health du serveur Express.
// Utilise API_URL (par défaut localhost) — à adapter si le serveur est déployé.
export const options = {
  vus: 10,
  duration: '1m',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<300'],
  },
};

const API_URL = __ENV.API_URL || 'http://localhost:3001';

export default function () {
  const res = http.get(`${API_URL}/api/health`);
  check(res, {
    'health 200': (r) => r.status === 200,
    'body ok': (r) => r.body && r.body.includes('ok'),
  });
}
