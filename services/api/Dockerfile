FROM node:20-bookworm-slim AS base
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*
FROM base AS builder
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune api --docker

FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN mkdir -p /app/packages

# Generate Prisma client for api
RUN npx prisma generate --schema=services/api/prisma/schema.prisma

RUN npx turbo run build --filter=api...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs
USER expressjs

# Copy built API app and node_modules
COPY --from=installer --chown=expressjs:nodejs /app/services/api ./services/api
COPY --from=installer --chown=expressjs:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=expressjs:nodejs /app/packages ./packages

EXPOSE 4000
ENV PORT=4000
ENV NODE_ENV=production

# Start the API using the built index.js
WORKDIR /app/services/api
CMD ["node", "dist/index.js"]
