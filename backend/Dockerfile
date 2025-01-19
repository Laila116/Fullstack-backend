# Basis-Image
FROM node:20.10.0

# Arbeitsverzeichnis setzen
WORKDIR /app

# Kopiere den Backend-Code
COPY . .

# Installiere Abhängigkeiten
RUN npm install

EXPOSE 3000
# Setze den Befehl
CMD ["npm", "start"]