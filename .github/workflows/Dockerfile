# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root package files and install all dependencies
# This leverages Docker layer caching.
COPY package.json package-lock.json ./
COPY client/package.json ./client/
COPY server/package.json ./server/
RUN npm ci

# Copy client source code and build
COPY ./client/src ./client/src
COPY ./client/public ./client/public
COPY ./client/index.html ./client/
COPY ./client/tsconfig.json ./client/
COPY ./client/vite.config.ts ./client/
COPY ./client/tailwind.config.js ./client/
COPY ./client/postcss.config.js ./client/
RUN npm run build --workspace=client

# Stage 2: Serve the static files with Nginx
FROM nginx:stable-alpine

COPY --from=builder /app/client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]