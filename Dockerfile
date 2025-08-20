# Stage 1: build the app
FROM node:18-alpine AS build
WORKDIR /app

# install deps
COPY package.json package-lock.json* ./
RUN npm ci --silent

# copy source
COPY . .

# build
RUN npm run build

# Stage 2: serve with a minimal web server
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
