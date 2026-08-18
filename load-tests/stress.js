import http from 'k6/http';
import { check, sleep } from 'k6';

// Stress test — pousse jusqu'à 200 VUs pour trouver le point de rupture.
// À exécuter en connaissance de cause : peut faire tomber le service.
export const options = {
  stages: [
    { duration: '1m', target: 50 },
    { duration: '2m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.10'],
    http_req_duration: ['p(95)<5000'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'https://www.visioconnect.pro';

export default function () {
  const res = http.get(`${BASE_URL}/`);
  check(res, {
    'status 200': (r) => r.status === 200,
  });
  sleep(Math.random() * 2);
}
