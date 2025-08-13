# ----------------------
# Base image
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable pnpm

# ----------------------
# 1️⃣ Deps stage: install client workspace dependencies
FROM base AS deps
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY client/package.json client/package.json
RUN pnpm install --frozen-lockfile --filter client...

# ----------------------
# 2️⃣ Builder stage: build Next.js
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY client ./client
WORKDIR /app/client
RUN pnpm build

# ----------------------
# 3️⃣ Runner stage: prod-only image
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

WORKDIR /app
# Copy standalone build from builder
COPY --from=builder /app/client/.next/standalone ./
COPY --from=builder /app/client/.next/static ./.next/static
COPY --from=builder /app/client/public ./public

# Ensure production dependencies exist
COPY --from=builder /app/client/.next/standalone/package.json ./
RUN pnpm install --prod --no-frozen-lockfile

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
