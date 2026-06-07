# ==========================================
# ETAPA 1: Construcción (Builder)
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN PRISMA_SKIP_POSTINSTALL_GENERATE=true DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate

RUN npx tsc --outDir ./dist --noEmitOnError false

# ==========================================
# ETAPA 2: Producción (Runner)
# ==========================================
FROM node:20-alpine AS runner

RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --only=production

COPY --from=builder /usr/src/app/dist ./dist

RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate

EXPOSE 5000

# 🚨 EL CAMBIO GANADOR: Apuntamos al archivo real de la arquitectura
CMD ["node", "dist/app.js"]