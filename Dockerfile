# Stage 1: Setup Node.js
FROM node:18-alpine AS node_builder
WORKDIR /website/
COPY public/ /website/public
COPY src/ /website/src
COPY package.json /website/
RUN npm install

# Stage 2: Setup Python
FROM python:3.12-slim AS python_builder
WORKDIR /djangoapp
COPY backend/ ./backend/


# Final stage: Combine Node.js and Django
FROM node:18-alpine
WORKDIR /app
COPY --from=node_builder /website/ /app/website/
COPY --from=python_builder /djangoapp/ /app/djangoapp/
COPY nginx.conf /etc/nginx/http.d/default.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf


#variables d'environnement 
ARG REACT_APP_API_URL
ARG DATABASE_HOST
ARG DATABASE_NAME
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD
ARG DATABASE_PORT
ARG SECRET_KEY

EXPOSE 3002

ENV PYTHONUNBUFFERED=True
ENV PYTHONIOENCODING=UTF-8

WORKDIR /app/djangoapp/backend
RUN apk update
RUN apk add nodejs npm nginx python3-dev mariadb-dev build-base
RUN apk add --no-cache python3 py3-pip build-base libffi-dev openssl-dev cargo supervisor mariadb-connector-c-dev pkgconfig
RUN pip3 install -r requirements.txt --break-system-package
RUN npm install -g serve
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]






