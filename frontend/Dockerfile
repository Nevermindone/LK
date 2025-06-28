### базовый слой с зависимостями
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

### dev-stage (по умолчанию)
FROM base AS dev
CMD ["npm", "run", "dev", "--", "--host"]
