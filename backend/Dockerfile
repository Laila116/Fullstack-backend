# Node.js als basis für Docker-Image 
FROM node:20.10.0

# Arbeitsverzeichnis im Container festlegen
WORKDIR /app

# Kopiert package.json und installiert die abhängigkeiten davon
#COPY package*.json ./
COPY . .

RUN npm install

# Kopiert gesamte Quellcode ins Arbeitsverzeichnis im Container
#COPY . .
#RUN npm install
#RUN npm install -g typescript
#RUN npm install --save-dev @types/express
# führt den skript aus um den ts in js zu kompilieren


RUN npm run build

ENV DATABASE_HOST=postgres-db


# Öffnet den Port für die Anwendung
EXPOSE 3000

# Startet die Anwendung mit dem skript
CMD ["npm", "run", "start"]
