FROM node:22 as builder
WORKDIR /usr/app

COPY . .

RUN npm ci
RUN npm run build

#=======================================
FROM nginx:1.24.0 as final

WORKDIR /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/app/node_modules/ ./node_modules/
COPY --from=builder /usr/app/dist/open-adoption-front/browser .