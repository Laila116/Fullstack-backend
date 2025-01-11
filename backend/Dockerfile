# Basis-Image von Node.js
FROM node:20.10.0

# Arbeitsverzeichnis im Container festlegen
WORKDIR /app

# Kopiere package.json und package-lock.json aus dem 'backend' Verzeichnis
COPY backend/package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den restlichen Quellcode aus dem 'backend' Verzeichnis
COPY backend/ ./

# Führe das Build-Skript aus
RUN npm run build

# Nutze .env-Variable zur Laufzeit

# Exponiere den Port
EXPOSE 3000

# Startet die Anwendung
CMD ["npm", "start"]
