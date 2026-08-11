# Load tests — k6

Tests de montée en charge du site VisioConnect avec [k6](https://k6.io).

## Installation de k6

### Windows (choco)

```bash
choco install k6
```

### Windows (winget)

```bash
winget install k6 --source winget
```

### macOS

```bash
brew install k6
```

### Docker (sans installation)

```bash
docker run --rm -i grafana/k6 run - < load-tests/smoke.js
```

Vérification :

```bash
k6 version
```

## Scripts disponibles

| Script          | Objectif                      | Durée  | VUs max |
| --------------- | ----------------------------- | ------ | ------- |
| `smoke.js`      | Sanity check quotidien        | 30 s   | 1       |
| `load.js`       | Charge réaliste               | ~5 min | 50      |
| `stress.js`     | Trouver le point de rupture   | ~6 min | 200     |
| `api-health.js` | Endpoint `/health` du serveur | 1 min  | 10      |

## Exécution

Depuis la racine du projet :

```bash
# Smoke test sur la prod
k6 run load-tests/smoke.js

# Load test avec URL custom (ex : preprod)
k6 run --env BASE_URL=https://preprod.visioconnect.pro load-tests/load.js

# Stress test
k6 run load-tests/stress.js

# Test API health sur serveur local
k6 run --env API_URL=http://localhost:3001 load-tests/api-health.js
```

## Générer un rapport HTML

```bash
k6 run --out json=results.json load-tests/load.js
```

Puis convertir avec `k6-reporter` ou importer le JSON dans Grafana.

Rapport terminal intégré : k6 affiche déjà à la fin un résumé complet
(latences p50/p90/p95/p99, taux d'erreur, requêtes/s).

## Thresholds (seuils de validation)

Chaque script définit des seuils bloquants. Si un seuil est dépassé,
k6 retourne un exit code ≠ 0 (utile en CI).

Exemples de seuils utilisés :

- `http_req_failed: rate<0.01` — moins de 1% d'erreurs
- `http_req_duration: p(95)<2000` — 95% des requêtes sous 2s

## Recommandations d'utilisation

- **Ne PAS lancer `stress.js` sur la prod pendant les heures ouvrées.**
- Préférer la **preprod** (`https://preprod.visioconnect.pro`) pour
  les tests intensifs. Elle est protégée par login Vercel — désactiver
  temporairement la protection ou utiliser un bypass token
  (`x-vercel-protection-bypass` header).
- Pour un test de charge réaliste, envisager k6 Cloud ou un runner
  distribué (les VUs locaux sont limités par la bande passante de ta
  machine).

## Interprétation rapide

Après un run, regarder :

1. `http_req_failed` — doit être proche de 0%.
2. `http_req_duration p(95)` — latence sous 2s.
3. `checks` — 100% de checks passants.
4. `iterations` — nombre total de scénarios exécutés.

Un rapport type ressemble à :

```
     ✓ landing 200
     ✓ pricing 200
     checks.........................: 100.00% ✓ 8420  ✗ 0
     http_req_duration..............: avg=412ms p(95)=1.2s
     http_req_failed................: 0.00%   ✓ 0     ✗ 8420
```
