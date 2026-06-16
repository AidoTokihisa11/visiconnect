# =============================================================
# Dockerfile multi-stage pour le backend VisiConnect
# =============================================================
# Stage 1 : installation des d\u00e9pendances de production uniquement
# Stage 2 : runtime Node.js minimal (alpine)
# =============================================================

FROM node:20-alpine AS deps
WORKDIR /app
COPY server/package.json server/package-lock.json* ./
RUN npm install --omit=dev --no-audit --no-fund

# -------------------------------------------------------------
FROM node:20-alpine AS runtime
WORKDIR /app

# Cr\u00e9ation d'un utilisateur non-root (s\u00e9curit\u00e9 \u00e9l\u00e9mentaire)
RUN addgroup -S app && adduser -S app -G app

ENV NODE_ENV=production \
    PORT=5099

COPY --from=deps /app/node_modules ./node_modules
COPY server/src ./src
COPY server/package.json ./

USER app
EXPOSE 5099
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:5099/health || exit 1

CMD ["node", "src/server.js"]
