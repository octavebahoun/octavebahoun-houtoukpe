# Site Vite : construit avec Node 22 (pnpm), puis servi par nginx (écrit par Souk.dev).
FROM node:22-slim AS construction
WORKDIR /app
RUN corepack enable
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=construction /app/dist /usr/share/nginx/html
