import http from 'k6/http';
import { check, sleep } from 'k6';

// Smoke test — 1 VU, 30s. Vérifie que les endpoints publics répondent.
export const options = {
  vus: 1,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1500'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'https://www.visioconnect.pro';

export default function () {
  const routes = ['/', '/pricing', '/features', '/about', '/robots.txt', '/sitemap.xml'];

  routes.forEach((route) => {
    const res = http.get(`${BASE_URL}${route}`);
    check(res, {
      [`${route} status 200`]: (r) => r.status === 200,
      [`${route} < 2s`]: (r) => r.timings.duration < 2000,
    });
  });

  sleep(1);
}
