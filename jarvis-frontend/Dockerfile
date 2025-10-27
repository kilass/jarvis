# === Étape 1 : Build ===
# Utiliser une image Node.js LTS (Long Term Support) comme base pour construire
FROM node:lts-alpine AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de définition des dépendances
COPY package.json ./
COPY package-lock.json ./
# (Si vous utilisiez pnpm ou yarn, vous copieriez pnpm-lock.yaml ou yarn.lock ici)

# Installer UNIQUEMENT les dépendances de production d'abord (optimisation du cache Docker)
RUN npm ci --omit=dev

# Copier le reste du code source de l'application
COPY . .

# Construire l'application Next.JS pour la production
# Cette commande crée un dossier '.next' optimisé
RUN npm run build

# === Étape 2 : Production ===
# Utiliser une image Node.js minimale pour l'exécution
FROM node:lts-alpine AS runner

# Définir le répertoire de travail
WORKDIR /app

# Copier les dépendances de production depuis l'étape 'builder'
COPY --from=builder /app/node_modules ./node_modules
# Copier les fichiers de configuration Next.js et package.json
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/package.json ./
# Copier les assets publics (images, etc.)
COPY --from=builder /app/public ./public
# Copier l'application construite (le dossier .next)
COPY --from=builder /app/.next ./.next

# Exposer le port sur lequel Next.js tourne par défaut
EXPOSE 3000

# Définir la commande pour démarrer l'application en mode production
CMD ["npm", "start"]