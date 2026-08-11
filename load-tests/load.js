import http from 'k6/http';
import { check, group, sleep } from 'k6';

// Load test — montée progressive à 50 VUs, palier 3 min, redescente.
// Simule un trafic réaliste sur les pages publiques.
export const options = {
  stages: [
    { duration: '1m', target: 20 },
    { duration: '3m', target: 50 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.02'],
    http_req_duration: ['p(95)<2000', 'p(99)<3500'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'https://www.visioconnect.pro';

export default function () {
  group('landing', () => {
    const res = http.get(`${BASE_URL}/`);
    check(res, {
      'landing 200': (r) => r.status === 200,
      'landing p95 ok': (r) => r.timings.duration < 2500,
    });
  });

  sleep(Math.random() * 2 + 1);

  group('pricing', () => {
    const res = http.get(`${BASE_URL}/pricing`);
    check(res, { 'pricing 200': (r) => r.status === 200 });
  });

  sleep(Math.random() * 2 + 1);

  group('static assets', () => {
    const robots = http.get(`${BASE_URL}/robots.txt`);
    const sitemap = http.get(`${BASE_URL}/sitemap.xml`);
    check(robots, { 'robots 200': (r) => r.status === 200 });
    check(sitemap, { 'sitemap 200': (r) => r.status === 200 });
  });

  sleep(Math.random() * 3 + 1);
}
