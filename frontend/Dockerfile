# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copier les fichiers de dépendances en premier pour optimiser le cache
COPY package.json package-lock.json ./

# Installer toutes les dépendances (y compris devDependencies pour le build)
# NODE_ENV n'est pas défini ici pour permettre l'installation des devDependencies
RUN npm ci && \
    npm cache clean --force

# Copier le reste du code source
COPY . .

# Build de l'application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copier les fichiers buildés depuis le stage de build
COPY --from=build /app/dist /usr/share/nginx/html

# Copier la configuration nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
